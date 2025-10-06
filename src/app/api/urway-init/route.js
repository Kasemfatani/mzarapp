import { NextResponse } from "next/server";
import { getJson, setJson } from "@/lib/redisClient";
import crypto from "crypto";
import axios from "axios";
import { buildUrwayRequestHash } from "@/lib/urwayHelpers";

// NOTE: Integrate actual URWAY init API here. For now we emulate returning a redirect URL.
// We store a short-lived payment session referencing the draft for callback verification.

const PAYMENT_SESSION_TTL = 60 * 60; // 1 hour

export async function POST(req) {
	try {
		const { draftId } = await req.json();
		if (!draftId) {
			return NextResponse.json({ error: "draftId required" }, { status: 400 });
		}
		const draft = await getJson(`draft:${draftId}`);
		if (!draft) {
			return NextResponse.json(
				{ error: "Draft not found or expired" },
				{ status: 404 }
			);
		}

		// For now rely on draft.grand_total (already computed client side).
		// NOTE: For production you should recompute server-side to avoid tampering.
		const amount = Number(draft.grand_total || 0);

		const terminalId = process.env.URWAY_TERMINAL_ID;
		const password = process.env.URWAY_PASSWORD;
		const merchantKey = process.env.URWAY_MERCHANT_KEY;
		const urwayUrl = process.env.URWAY_URL;
		const appUrl = process.env.APP_URL || "http://localhost:3000";
		const currency = "SAR"; // adjust if needed
		if (!terminalId || !password || !merchantKey || !urwayUrl) {
			return NextResponse.json(
				{ error: "Urway env vars missing" },
				{ status: 500 }
			);
		}
		const trackId = crypto.randomBytes(8).toString("hex");
		// Acquire merchant IP (fallback to env or 127.0.0.1 for dev)
		const forwarded = req.headers.get("x-forwarded-for") || "";
		const merchantIp =
			process.env.MERCHANT_IP || forwarded.split(",")[0].trim() || "127.0.0.1";
		const customerEmail = draft.contact_email || "test@example.com";
		// Two possible hash sequences (since docs sometimes vary). We'll try primary then fallback if 659.
		const amountStr = amount.toFixed(2);
		const buildHashVariant = (variant) => {
			// if (variant === 1) {
			// 	// current helper order terminalId|password|trackId|amount|currency|merchantKey
			// 	return buildUrwayRequestHash({
			// 		terminalId,
			// 		password,
			// 		trackId,
			// 		amount: amountStr,
			// 		currency,
			// 		merchantKey,
			// 	});
			// }
			// alternative commonly used: trackid|terminalId|password|merchantKey|amount|currency|
			const base = `${trackId}|${terminalId}|${password}|${merchantKey}|${amountStr}|${currency}`;
			// console.log(`[Urway Hash Base 2]`, base);
			return crypto.createHash("sha256").update(base, "utf8").digest("hex");
		};

		async function attempt(hash, attemptNo) {
			const tempSessionId = `prep_${trackId}_${attemptNo}`;
			const returnUrl = `${appUrl}/api/urway-callback?session=${tempSessionId}`;
			const body = {
				trackid: trackId, // NOTE lowercase per docs
				terminalId,
				password,
				action: "1", // Purchase
				country: "SA",
				currency,
				amount: amountStr,
				merchantIp,
				customerEmail,
				requestHash: hash,
				// metadata / udf mapping: udf2 is callback URL, udf3 language code
				udf1: draft.meta?.draftId || draftId,
				udf2: returnUrl,
				udf3: draft.lang === "ar" ? "AR" : "EN",
				udf4: "",
				udf5: "",
			};
			console.log("[Urway Request Body]", body);

			let resp;
			try {
				resp = await axios.post(urwayUrl, body, {
					headers: { "Content-Type": "application/json" },
					timeout: 15000,
				});
			} catch (err) {
				return { error: err?.response?.data || err.message, data: null };
			}
			return { data: resp.data, tempSessionId };
		}

		// First attempt with variant 1
		let hash1 = buildHashVariant(1);
		let first = await attempt(hash1, 1);
		if (first.error) {
			console.error("Urway init network error", first.error);
			return NextResponse.json(
				{ error: "Urway init failed", detail: first.error },
				{ status: 502 }
			);
		}
		let data = first.data || {};
		// If authentication failed (659) try alternate ordering
		if (data?.responseCode === "659") {
			const hash2 = buildHashVariant(2);
			let second = await attempt(hash2, 2);
			if (second.error) {
				return NextResponse.json(
					{ error: "Urway auth failed", raw: data },
					{ status: 502 }
				);
			}
			if (second.data?.responseCode !== "659") {
				data = second.data;
				first.tempSessionId = second.tempSessionId; // use session from second attempt
			}
		}

		console.log("Urway init response", data);
		// Payment redirect URL possibilities in docs: targetUrl / redirectURL / paymentURL / linkBasedUrl
		let paymentUrl =
			data?.targetUrl ||
			data?.redirectURL ||
			data?.paymentURL ||
			data?.linkBasedUrl;

		
		// If payid and targetUrl exist, append ?paymentid=payid (per Laravel example)
		if (data?.targetUrl && data?.payid) {
			const sep = data.targetUrl.includes("?") ? "&" : "?";
			paymentUrl = `${data.targetUrl}${sep}paymentid=${encodeURIComponent(
				data.payid
			)}`;
		}
		

		if (!paymentUrl) {
			return NextResponse.json(
				{ error: "Missing payment URL from Urway", raw: data },
				{ status: 502 }
			);
		}
		// Create payment session
		const paymentSessionId = `pay_${trackId}`;
		await setJson(
			`payment:${paymentSessionId}`,
			{ draftId, trackId, amount, createdAt: Date.now() },
			PAYMENT_SESSION_TTL
		);
		// Replace any temp session id substring if present
		const finalUrl = paymentUrl.replace(/prep_[^&?]+/g, paymentSessionId);
		return NextResponse.json({
			paymentUrl: finalUrl,
			amount,
			trackId,
			responseCode: data?.responseCode,
		});
	} catch (e) {
		console.error("/api/urway-init error", e);
		return NextResponse.json(
			{ error: "Failed to init payment" },
			{ status: 500 }
		);
	}
}
