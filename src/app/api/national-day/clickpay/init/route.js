import { createHmac, timingSafeEqual } from "node:crypto";
import axios from "axios";
import { NextResponse } from "next/server";
import {
	NATIONAL_DAY_MAX_QUANTITY,
	NATIONAL_DAY_PRICE_SAR,
} from "@/lib/nationalDayBookingConstants";

export const dynamic = "force-dynamic";

const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function canonicalizeSession(input) {
	return {
		cart_id: input?.cart_id,
		name: input?.name,
		whatsapp: input?.whatsapp,
		whatsapp_country_code: input?.whatsapp_country_code,
		country_name: input?.country_name || "",
		quantity: input?.quantity,
		amount: input?.amount,
		created_at: input?.created_at,
	};
}

function verifySignature(session, signature, secret) {
	if (typeof signature !== "string" || !signature) return false;
	const expected = createHmac("sha256", secret)
		.update(JSON.stringify(session))
		.digest();
	let supplied;
	try {
		supplied = Buffer.from(signature, "base64url");
	} catch {
		return false;
	}
	return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

function getAppBaseUrl() {
	const configuredUrl =
		process.env.APP_URL ||
		(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
	return new URL(configuredUrl);
}

function isLocalhost(hostname) {
	return (
		hostname === "localhost" ||
		hostname.endsWith(".localhost") ||
		hostname === "127.0.0.1" ||
		hostname === "0.0.0.0" ||
		hostname === "[::1]"
	);
}

function isPublicHttpsUrl(url) {
	return url.protocol === "https:" && !url.port && !isLocalhost(url.hostname);
}

export async function POST(request) {
	let input;
	try {
		input = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}

	const session = canonicalizeSession(input?.session);
	const signingSecret = process.env.CLICKPAY_SERVER_KEY;
	if (!signingSecret || !verifySignature(session, input?.signature, signingSecret)) {
		return NextResponse.json({ error: "Invalid booking session" }, { status: 400 });
	}

	const now = Date.now();
	const validSession =
		typeof session.cart_id === "string" &&
		session.cart_id.startsWith("national-day-") &&
		typeof session.name === "string" &&
		session.name.length > 0 &&
		/^\d{6,15}$/.test(session.whatsapp) &&
		/^\+\d{1,4}$/.test(session.whatsapp_country_code) &&
		Number.isInteger(session.quantity) &&
		session.quantity >= 1 &&
		session.quantity <= NATIONAL_DAY_MAX_QUANTITY &&
		session.amount === session.quantity * NATIONAL_DAY_PRICE_SAR &&
		Number.isSafeInteger(session.created_at) &&
		session.created_at <= now + 60_000 &&
		now - session.created_at <= SESSION_MAX_AGE_MS;

	if (!validSession || !["ar", "en"].includes(input?.lang)) {
		return NextResponse.json({ error: "Invalid booking details" }, { status: 400 });
	}

	const profileId = Number.parseInt(process.env.CLICKPAY_PROFILE_ID || "", 10);
	const serverKey = process.env.CLICKPAY_SERVER_KEY;
	const gatewayUrl = process.env.CLICKPAY_BASE_URL;
	if (!Number.isInteger(profileId) || !serverKey || !gatewayUrl) {
		return NextResponse.json({ error: "ClickPay configuration is missing" }, { status: 500 });
	}

	let appBaseUrl;
	try {
		appBaseUrl = getAppBaseUrl();
	} catch {
		return NextResponse.json({ error: "APP_URL is invalid" }, { status: 500 });
	}

	if (appBaseUrl.protocol !== "https:" && !isLocalhost(appBaseUrl.hostname)) {
		return NextResponse.json(
			{ error: "APP_URL must use HTTPS for ClickPay returns" },
			{ status: 500 },
		);
	}

	const successPath = `/${input.lang}/national-day-success?cart_id=${encodeURIComponent(session.cart_id)}`;
	const failPath = `/${input.lang}/national-day#booking`;
	const returnUrl = new URL("/api/pay/clickpay/callback", appBaseUrl);
	returnUrl.searchParams.set("successPath", successPath);
	returnUrl.searchParams.set("failPath", failPath);

	// ClickPay rejects server callbacks on localhost or with a port. A local dev
	// payment can still return the customer to localhost, but omits the optional
	// server-to-server callback. Deployed HTTPS environments use their public URL.
	const callbackUrl = isPublicHttpsUrl(appBaseUrl)
		? new URL("/api/pay/clickpay/callback", appBaseUrl).toString()
		: null;

	const payload = {
		profile_id: profileId,
		tran_type: "sale",
		tran_class: "ecom",
		cart_id: session.cart_id,
		cart_description: "Saudi National Day Grand Mosque Tour",
		cart_currency: "SAR",
		cart_amount: session.amount,
		return: returnUrl.toString(),
		...(callbackUrl ? { callback: callbackUrl } : {}),
		customer_details: {
			name: session.name,
			email: "national-day-booking@mzarapp.com",
			phone: `${session.whatsapp_country_code}${session.whatsapp}`,
			city: "Makkah",
			street1: "Makkah",
			zip: "12345",
			country: "SA",
		},
		paypage_lang: input.lang,
	};

	try {
		const result = await axios.post(`${gatewayUrl}/payment/request`, payload, {
			headers: {
				"Content-Type": "application/json",
				authorization: serverKey,
			},
			timeout: 15000,
		});
		const paymentUrl = result?.data?.redirect_url;
		if (!paymentUrl || !result?.data?.tran_ref) {
			return NextResponse.json({ error: "ClickPay did not return a payment URL" }, { status: 502 });
		}
		return NextResponse.json({ paymentUrl });
	} catch (error) {
		console.error("/api/national-day/clickpay/init error:", {
			message: error?.message,
			response: error?.response?.data,
			status: error?.response?.status,
		});
		return NextResponse.json(
			{ error: "Failed to initialize National Day payment" },
			{ status: error?.response?.status >= 400 ? error.response.status : 502 },
		);
	}
}
