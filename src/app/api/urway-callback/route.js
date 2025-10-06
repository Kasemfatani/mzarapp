import { NextResponse } from "next/server";
import { getJson, setJson, delKey } from "@/lib/redisClient";
import axios from "axios";
import { buildUrwayResponseHash, isUrwaySuccess } from "@/lib/urwayHelpers";

// TTL (seconds) for storing orphaned successful payments where internal session/draft missing
const ORPHAN_SUCCESS_TTL = 24 * 60 * 60; // 24h

// Finalizes booking after (fake) payment success. Replace logic with real URWAY verification.

async function finalize(req, method, bodyOrParams) {
	const params = bodyOrParams;
	// session passed in returnUrl
	let sessionId = params.session;
	const trackId =
		params.trackId ||
		params.trackid ||
		params.TrackId ||
		params.TRACKID ||
		params.trackID ||
		params.tranid ||
		"";
	// Real URWAY won't send explicit status=success; we deduce from response code/result
	const status = params.status; // fallback for mock

	// Determine early if gateway indicates success (even before we locate session/draft)
	const paymentIndicatesSuccess =
		status === "success" || isUrwaySuccess(params);
	const tranIdEarly =
		params.TranId ||
		params.tranid ||
		params.trackId ||
		params.trackid ||
		trackId ||
		"";
	const appBase = process.env.APP_URL || "http://localhost:3000";

	if (sessionId && sessionId.startsWith("prep_")) {
		// Remove trailing _1, _2, etc.
		const base = sessionId.replace(/^prep_/, "").replace(/_[0-9]+$/, "");
		const derived = `pay_${base}`;
		const paySession = await getJson(`payment:${derived}`);
		if (paySession) sessionId = derived;
	}

	if (!sessionId) {
		// No session param recognized. Decide user-facing path.
		if (paymentIndicatesSuccess) {
			// Store orphan for reconciliation
			if (tranIdEarly) {
				await setJson(
					`orphan:${tranIdEarly}`,
					{ reason: "missing_session_param", params, at: Date.now() },
					ORPHAN_SUCCESS_TTL
				);
			}
			return NextResponse.redirect(
				`${appBase}/payment?status=processing-issue&ref=${encodeURIComponent(
					tranIdEarly
				)}&session=1`
			);
		}
		return NextResponse.redirect(`${appBase}/payment?status=failed`);
	}

	const paymentSession = await getJson(`payment:${sessionId}`);
	if (!paymentSession) {
		if (paymentIndicatesSuccess) {
			if (tranIdEarly) {
				await setJson(
					`orphan:${tranIdEarly}`,
					{ reason: "payment_session_missing", params, at: Date.now() },
					ORPHAN_SUCCESS_TTL
				);
			}
			return NextResponse.redirect(
				`${appBase}/payment?status=processing-issue&ref=${encodeURIComponent(
					tranIdEarly
				)}&paymentSession=1`
			);
		}
		return NextResponse.redirect(`${appBase}/payment?status=failed`);
	}

	const draft = await getJson(`draft:${paymentSession.draftId}`);
	if (!draft) {
		if (paymentIndicatesSuccess) {
			if (tranIdEarly) {
				await setJson(
					`orphan:${tranIdEarly}`,
					{ reason: "draft_missing", paymentSession, params, at: Date.now() },
					ORPHAN_SUCCESS_TTL
				);
			}
			return NextResponse.redirect(
				`${appBase}/payment?status=processing-issue&ref=${encodeURIComponent(
					tranIdEarly
				)}&draft=1`
			);
		}
		return NextResponse.redirect(`${appBase}/payment?status=failed`);
	}

	// Response verification (hash optional depending on configuration)
	const terminalId = process.env.URWAY_TERMINAL_ID;
	const password = process.env.URWAY_PASSWORD;
	const merchantKey = process.env.URWAY_MERCHANT_KEY;
	const currency = "SAR";
	if (terminalId && password && merchantKey && trackId) {
		const expected = buildUrwayResponseHash({
			terminalId,
			password,
			trackId,
			amount: paymentSession.amount.toFixed(2),
			currency,
			merchantKey,
		});
		// Some URWAY responses include a field called responseHash or hash to compare.
		if (params.responseHash && params.responseHash !== expected) {
			console.warn("URWAY hash mismatch", params.responseHash, expected);
		}
	}

	const success = paymentIndicatesSuccess; // Already computed earlier
	if (!success) {
		draft.payment.status = "failed";
		await setJson(`draft:${paymentSession.draftId}`, draft, 300);
		const failRedirect = `${
			process.env.APP_URL || "http://localhost:3000"
		}/payment?status=failed`;
		return NextResponse.redirect(failRedirect);
	}

	// Mark payment success
	draft.payment.status = "success";
	draft.payment.transaction_id =
		params.TranId ||
		params.tranid ||
		params.trackId ||
		params.trackid ||
		trackId ||
		null;
	draft.payment.amount = paymentSession.amount;

	// Build payload for booking-pt2 (must match backend expectations)
	const bookingPayload = {
		address_name: draft.address_name,
		visit_date: draft.visit_date,
		lat: draft.lat,
		lng: draft.lng,
		transportation_type_id: draft.transportation_type_id,
		visit_time_id: draft.visit_time_id,
		seats: draft.seats,
		booking_id: draft.booking_id,
		add_ons: Array.isArray(draft.add_ons)
			? draft.add_ons.map((a) => (typeof a === "object" && a.id ? a.id : a))
			: [],
		payment_type: "online",
		transaction_id: draft.payment.transaction_id || null,
	};

	try {
		// Call external booking API
		const apiBase = process.env.API_BASE_URL;
		if (!apiBase) throw new Error("API_BASE_URL env not set");

		const resp = await axios.post(
			`${apiBase}/landing/home/booking-pt2`,
			bookingPayload,
			{
				headers: { lang: draft.lang || "en" },
			}
		);

		// Extract values for congrats page
		const refNo = resp?.data?.data?.ref_no || "";
		const qName = encodeURIComponent(draft.contact_name || "");
		const qPhone = encodeURIComponent(draft.contact_phone || "");
		const qEmail = encodeURIComponent(draft.contact_email || "");
		const qPackage = encodeURIComponent(draft.package_name || "");

		// Cleanup draft & session
		await delKey(`draft:${paymentSession.draftId}`);
		await delKey(`payment:${sessionId}`);

		const successUrl = `${
			process.env.APP_URL || "http://localhost:3000"
		}/congats?name=${qName}&phone=${qPhone}&package=${qPackage}&email=${qEmail}&refNo=${encodeURIComponent(
			refNo
		)}`;
		return NextResponse.redirect(successUrl);
	} catch (e) {
		console.error("Finalize booking error", e?.response?.data || e.message);
		// keep draft for troubleshooting
		await setJson(`draft:${paymentSession.draftId}`, draft, 600);
		// Get transaction reference (TranId or fallback)
		const tranId =
			params.TranId ||
			params.tranid ||
			params.trackId ||
			params.trackid ||
			trackId ||
			"";
		// Redirect to processing-issue page with ref
		const issueRedirect = `${
			process.env.APP_URL || "http://localhost:3000"
		}/payment?status=processing-issue&ref=${encodeURIComponent(tranId)}&apiError=1`;
		return NextResponse.redirect(issueRedirect);
	}
	// No explicit return needed; all code paths above return a Response
}

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const params = Object.fromEntries(searchParams.entries());
	return finalize(req, "GET", params);
}

export async function POST(req) {
	// Handle URWAY POST callback (some configurations use POST)
	const formData = await req.formData().catch(() => null);
	let params = {};
	if (formData) {
		formData.forEach((v, k) => {
			params[k] = v;
		});
	} else {
		// fallback json
		try {
			params = await req.json();
		} catch (_) {}
	}
	return finalize(req, "POST", params);
}
