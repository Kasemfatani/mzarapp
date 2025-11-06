import { NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

export async function POST(req) {
	try {
		const {
			amount,
			lang = "en",
			flow = "default",
			successPath = "/book-tour-success",
			failPath = "/book-tour",
		} = await req.json();

		if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
			return NextResponse.json(
				{ error: "Valid amount is required" },
				{ status: 400 }
			);
		}

		const terminalId = process.env.URWAY_TERMINAL_ID;
		const password = process.env.URWAY_PASSWORD;
		const merchantKey = process.env.URWAY_MERCHANT_KEY;
		const urwayUrl = process.env.URWAY_URL;
		const appUrl = process.env.APP_URL || "http://localhost:3000";
		const currency = "SAR";

		if (!terminalId || !password || !merchantKey || !urwayUrl) {
			return NextResponse.json(
				{ error: "URWAY env vars missing" },
				{ status: 500 }
			);
		}

		const trackId = crypto.randomBytes(8).toString("hex");
		const forwarded = req.headers.get("x-forwarded-for") || "";
		const merchantIp =
			process.env.MERCHANT_IP || forwarded.split(",")[0].trim() || "127.0.0.1";
		const customerEmail = "guest@mzarapp.com";
		const amountStr = Number(amount).toFixed(2);
		// Hash variant commonly accepted by URWAY:
		const base = `${trackId}|${terminalId}|${password}|${merchantKey}|${amountStr}|${currency}`;
		const requestHash = crypto
			.createHash("sha256")
			.update(base, "utf8")
			.digest("hex");

		const returnUrl = `${appUrl}/api/pay/urway/callback?flow=${encodeURIComponent(
			flow
		)}&success=${encodeURIComponent(successPath)}&fail=${encodeURIComponent(
			failPath
		)}`;

		const body = {
			trackid: trackId,
			terminalId,
			password,
			action: "1", // Purchase
			country: "SA",
			currency,
			amount: amountStr,
			merchantIp,
			customerEmail,
			requestHash,
			// UDF metadata
			udf1: "", // reserved
			udf2: returnUrl, // callback URL
			udf3: lang === "ar" ? "AR" : "EN",
			udf4: "",
			udf5: "",
		};

		const resp = await axios.post(urwayUrl, body, {
			headers: { "Content-Type": "application/json" },
			timeout: 15000,
		});

		const data = resp?.data || {};
		// Payment redirect URL keys used by URWAY
		let paymentUrl =
			data?.targetUrl ||
			data?.redirectURL ||
			data?.paymentURL ||
			data?.linkBasedUrl;
		if (data?.targetUrl && data?.payid) {
			const sep = data.targetUrl.includes("?") ? "&" : "?";
			paymentUrl = `${data.targetUrl}${sep}paymentid=${encodeURIComponent(
				data.payid
			)}`;
		}

		if (!paymentUrl) {
			return NextResponse.json(
				{ error: "Missing payment URL from URWAY", raw: data },
				{ status: 502 }
			);
		}

		return NextResponse.json({
			paymentUrl,
			trackId,
			responseCode: data?.responseCode,
		});
	} catch (e) {
		console.error("/api/pay/urway/init error", e?.response?.data || e.message);
		return NextResponse.json(
			{ error: "Failed to init payment" },
			{ status: 500 }
		);
	}
}
