import { createHmac, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { API_BETA_URL } from "@/lib/apiConfig";
import {
	NATIONAL_DAY_MAX_QUANTITY,
	NATIONAL_DAY_PRICE_SAR,
} from "@/lib/nationalDayBookingConstants";

export const dynamic = "force-dynamic";

async function isAvailable() {
	const response = await fetch(
		`${API_BETA_URL}/landing/haram-offer/check-availability`,
		{ cache: "no-store", signal: AbortSignal.timeout(10000) },
	);
	const result = await response.json().catch(() => null);
	return response.ok && result?.status === true;
}

function signSession(session, secret) {
	return createHmac("sha256", secret)
		.update(JSON.stringify(session))
		.digest("base64url");
}

export async function POST(request) {
	try {
		const body = await request.json();
		const name = String(body?.name || "").trim();
		const whatsapp = String(body?.whatsapp || "").replace(/\D/g, "");
		const whatsappCountryCode = String(body?.whatsapp_country_code || "").trim();
		const countryName = String(body?.country_name || "").trim().slice(0, 100);
		const quantity = Number(body?.quantity);

		if (!name || name.length > 100) {
			return NextResponse.json(
				{ status: false, code: "invalid_name" },
				{ status: 400 },
			);
		}
		if (!/^\d{6,15}$/.test(whatsapp)) {
			return NextResponse.json(
				{ status: false, code: "invalid_whatsapp" },
				{ status: 400 },
			);
		}
		if (!/^\+\d{1,4}$/.test(whatsappCountryCode)) {
			return NextResponse.json(
				{ status: false, code: "invalid_country_code" },
				{ status: 400 },
			);
		}
		if (
			!Number.isInteger(quantity) ||
			quantity < 1 ||
			quantity > NATIONAL_DAY_MAX_QUANTITY
		) {
			return NextResponse.json(
				{ status: false, code: "invalid_quantity" },
				{ status: 400 },
			);
		}

		const signingSecret = process.env.CLICKPAY_SERVER_KEY;
		if (!signingSecret) {
			return NextResponse.json(
				{ status: false, code: "payment_configuration_missing" },
				{ status: 500 },
			);
		}

		if (!(await isAvailable())) {
			return NextResponse.json(
				{ status: false, code: "unavailable" },
				{ status: 409 },
			);
		}

		const session = {
			cart_id: `national-day-${randomUUID()}`,
			name,
			whatsapp,
			whatsapp_country_code: whatsappCountryCode,
			country_name: countryName,
			quantity,
			amount: NATIONAL_DAY_PRICE_SAR * quantity,
			created_at: Date.now(),
		};

		return NextResponse.json({
			status: true,
			data: { session, signature: signSession(session, signingSecret) },
		});
	} catch (error) {
		const unavailable = error?.name === "TimeoutError" || error?.name === "AbortError";
		return NextResponse.json(
			{
				status: false,
				code: unavailable ? "availability_unavailable" : "request_failed",
			},
			{ status: unavailable ? 502 : 400 },
		);
	}
}
