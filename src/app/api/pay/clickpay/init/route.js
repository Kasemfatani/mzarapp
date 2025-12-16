import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
	try {
		const {
			amount,
			lang = "en",
			customer_details,
			cart_id,
			successPath = "/book-tour-success",
			failPath = "/book-tour",
		} = await req.json();

		console.log("ClickPay init request received:", {
			amount,
			lang,
			cart_id,
			customer_details,
			successPath,
			failPath,
		});

		if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
			return NextResponse.json(
				{ error: "Valid amount is required" },
				{ status: 400 }
			);
		}
		if (!cart_id) {
			return NextResponse.json(
				{ error: "cart_id is required" },
				{ status: 400 }
			);
		}

		const profileId = process.env.CLICKPAY_PROFILE_ID;
		const serverKey = process.env.CLICKPAY_SERVER_KEY;
		const baseUrl = process.env.CLICKPAY_BASE_URL;

		// Use VERCEL_URL if available, otherwise APP_URL
		let appUrl =  process.env.APP_URL || "http://localhost:3000";

		// Remove trailing slash to avoid double slashes in URLs
		appUrl = appUrl.replace(/\/+$/, "");

		console.log("ClickPay environment variables:", {
			profileId,
			serverKey: serverKey ? "SET" : "NOT SET",
			baseUrl,
			appUrl,
		});

		if (!profileId || !serverKey || !baseUrl) {
			return NextResponse.json(
				{ error: "ClickPay environment variables are missing" },
				{ status: 500 }
			);
		}

		// Encode the paths in the callback URL so we know where to redirect
		const callbackUrl = `${appUrl}/api/pay/clickpay/callback?successPath=${encodeURIComponent(
			successPath
		)}&failPath=${encodeURIComponent(failPath)}`;
		const returnUrl = callbackUrl;

		const payload = {
			profile_id: parseInt(profileId),
			tran_type: "sale",
			tran_class: "ecom",
			cart_id: String(cart_id),
			cart_description: "Mzar Bus Tour Booking",
			cart_currency: "SAR",
			cart_amount: amount,
			callback: callbackUrl,
			return: returnUrl,
			customer_details: {
				name: customer_details.name,
				email: customer_details.email,
				phone: customer_details.whatsapp,
				country: "SA",
			},
			paypage_lang: lang,
		};

		console.log(
			"ClickPay payload being sent:",
			JSON.stringify(payload, null, 2)
		);

		const resp = await axios.post(`${baseUrl}/payment/request`, payload, {
			headers: {
				"Content-Type": "application/json",
				authorization: serverKey,
			},
			timeout: 15000,
		});

		console.log("ClickPay response:", resp.data);

		const data = resp?.data || {};
		const paymentUrl = data.redirect_url;
		const tran_ref = data.tran_ref;

		if (!paymentUrl || !tran_ref) {
			console.error("ClickPay init error response:", data);
			return NextResponse.json(
				{ error: "Missing payment URL or tran_ref from ClickPay", raw: data },
				{ status: 502 }
			);
		}

		return NextResponse.json({
			paymentUrl,
			tran_ref,
		});
	} catch (e) {
		console.error("/api/pay/clickpay/init error:", {
			message: e.message,
			response: e?.response?.data,
			status: e?.response?.status,
			stack: e.stack,
		});

		return NextResponse.json(
			{
				error: "Failed to initialize ClickPay payment",
				details: e?.response?.data || e.message,
			},
			{ status: 500 }
		);
	}
}
