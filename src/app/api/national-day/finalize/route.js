import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { NATIONAL_DAY_PRICE_SAR } from "@/lib/nationalDayBookingConstants";

export const dynamic = "force-dynamic";

const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const FINALIZATION_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const cacheKey = "__mzarNationalDayFinalizationCache";
const finalizationCache =
	globalThis[cacheKey] || (globalThis[cacheKey] = new Map());

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

function response(body, status = 200) {
	return { body, status };
}

async function verifyPaymentAndBook(session, requestUrl) {
	let verificationResponse;
	try {
		verificationResponse = await fetch(
			new URL("/api/pay/clickpay/query", requestUrl),
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ cart_id: session.cart_id }),
				cache: "no-store",
				signal: AbortSignal.timeout(15000),
			},
		);
	} catch {
		return response({ status: false, code: "payment_verification_unavailable" }, 502);
	}

	const verification = await verificationResponse.json().catch(() => null);
	if (!verificationResponse.ok || !verification) {
		return response({ status: false, code: "payment_verification_unavailable" }, 502);
	}

	const transaction = verification.data;
	const paymentStatus = transaction?.payment_result?.response_status;
	if (verification.status !== "success") {
		if (paymentStatus === "P" || !paymentStatus) {
			return response({ status: false, code: "payment_pending" }, 202);
		}
		return response({
			status: false,
			code: "payment_failed",
			message: transaction?.payment_result?.response_message || "Payment was not authorized",
		}, 402);
	}

	const transactionId = String(transaction?.tran_ref || "");
	const paidCartId = String(transaction?.cart_id || "");
	const currency = String(transaction?.cart_currency || "").toUpperCase();
	const paidAmount = Number(transaction?.cart_amount);

	if (
		paymentStatus !== "A" ||
		!transactionId ||
		paidCartId !== session.cart_id ||
		currency !== "SAR" ||
		!Number.isFinite(paidAmount) ||
		Math.round(paidAmount * 100) !== Math.round(session.amount * 100)
	) {
		return response({ status: false, code: "payment_details_mismatch" }, 409);
	}

	let bookingResponse;
	let bookingResult;
	try {
		bookingResponse = await fetch(
			`${API_BASE_URL_NEW}/landing/haram-offer/booking`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					name: session.name,
					whatsapp: session.whatsapp,
					whatsapp_country_code: session.whatsapp_country_code,
					...(session.country_name ? { country_name: session.country_name } : {}),
					quantity: session.quantity,
					transaction_id: transactionId,
				}),
				cache: "no-store",
				signal: AbortSignal.timeout(20000),
			},
		);
		bookingResult = await bookingResponse.json().catch(() => null);
	} catch {
		return response({
			status: false,
			code: "booking_confirmation_unknown",
			transaction_id: transactionId,
		}, 502);
	}

	if (!bookingResponse.ok || bookingResult?.status !== true) {
		return response({
			status: false,
			code: "booking_confirmation_failed",
			transaction_id: transactionId,
			message: bookingResult?.message || "The payment was received, but the booking was not confirmed.",
		}, 502);
	}

	return response({
		status: true,
		code: "booking_confirmed",
		transaction_id: transactionId,
		data: bookingResult.data || null,
		message: bookingResult.message || "Booking confirmed",
	});
}

export async function POST(request) {
	let input;
	try {
		input = await request.json();
	} catch {
		return NextResponse.json({ status: false, code: "invalid_request" }, { status: 400 });
	}

	const session = canonicalizeSession(input?.session);
	const signature = input?.signature;
	const secret = process.env.CLICKPAY_SERVER_KEY;
	if (!secret || !verifySignature(session, signature, secret)) {
		return NextResponse.json({ status: false, code: "invalid_booking_session" }, { status: 400 });
	}

	const now = Date.now();
	const validSession =
		typeof session.cart_id === "string" &&
		session.cart_id.startsWith("national-day-") &&
		typeof session.name === "string" &&
		session.name.length > 0 &&
		/^\d{6,15}$/.test(session.whatsapp) &&
		/^\+\d{1,4}$/.test(session.whatsapp_country_code) &&
		Number.isSafeInteger(session.quantity) &&
		session.quantity >= 1 &&
		Number.isSafeInteger(session.quantity * NATIONAL_DAY_PRICE_SAR) &&
		session.amount === session.quantity * NATIONAL_DAY_PRICE_SAR &&
		Number.isSafeInteger(session.created_at) &&
		session.created_at <= now + 60_000 &&
		now - session.created_at <= SESSION_MAX_AGE_MS;

	if (!validSession) {
		return NextResponse.json({ status: false, code: "invalid_or_expired_booking_session" }, { status: 400 });
	}

	for (const [key, entry] of finalizationCache.entries()) {
		if (entry.expiresAt <= now) finalizationCache.delete(key);
	}

	const existing = finalizationCache.get(session.cart_id);
	if (existing && existing.expiresAt > now) {
		const cached = await existing.promise;
		return NextResponse.json(cached.body, { status: cached.status });
	}

	const promise = verifyPaymentAndBook(session, request.url);
	finalizationCache.set(session.cart_id, {
		promise,
		expiresAt: now + FINALIZATION_CACHE_TTL_MS,
	});
	const result = await promise;

	if (result.body.code === "payment_pending" || result.body.code === "payment_failed") {
		finalizationCache.delete(session.cart_id);
	}

	return NextResponse.json(result.body, { status: result.status });
}
