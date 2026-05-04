import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
	try {
		const { tran_ref, cart_id } = await req.json();

		console.log("ClickPay query request received:", { tran_ref, cart_id });

		if (!tran_ref && !cart_id) {
			return NextResponse.json(
				{ error: "Either transaction reference or cart ID is required" },
				{ status: 400 }
			);
		}

		const profileId = process.env.CLICKPAY_PROFILE_ID;
		const serverKey = process.env.CLICKPAY_SERVER_KEY;
		const baseUrl = process.env.CLICKPAY_BASE_URL;

		console.log("ClickPay query environment variables:", {
			profileId,
			serverKey: serverKey ? "SET" : "NOT SET",
			baseUrl,
		});

		if (!profileId || !serverKey || !baseUrl) {
			return NextResponse.json(
				{ error: "ClickPay environment variables are missing" },
				{ status: 500 }
			);
		}

		const payload = {
			profile_id: parseInt(profileId),
			...(tran_ref ? { tran_ref } : { cart_id: String(cart_id) }),
		};

		console.log(
			"ClickPay query payload being sent:",
			JSON.stringify(payload, null, 2)
		);

		const response = await axios.post(`${baseUrl}/payment/query`, payload, {
			headers: {
				"Content-Type": "application/json",
				authorization: serverKey,
			},
		});

		let data = response.data;

		console.log(
			"ClickPay query response received:",
			JSON.stringify(data, null, 2)
		);

		// FIX: ClickPay returns an array, get the first element
		if (Array.isArray(data) && data.length > 0) {
			data = data[0];
			console.log(
				"Extracted first transaction from array:",
				JSON.stringify(data, null, 2)
			);
		}

		// Check if payment was successful ('A' for Authorised)
		const isSuccess = data?.payment_result?.response_status === "A";

		console.log("Payment success status:", isSuccess);
		console.log(
			"Response status value:",
			data?.payment_result?.response_status
		);

		if (!isSuccess) {
			console.warn("Payment verification failed:", {
				status: data?.payment_result?.response_status,
				message: data?.payment_result?.response_message,
			});

			return NextResponse.json(
				{
					status: "failed",
					message:
						data?.payment_result?.response_message || "Payment not successful",
					data,
				},
				{ status: 200 }
			);
		}

		// Return the full, verified transaction data
		console.log("Payment verification SUCCESS");
		return NextResponse.json({ status: "success", data });
	} catch (e) {
		console.error("/api/pay/clickpay/query error:", {
			message: e.message,
			response: e?.response?.data,
			status: e?.response?.status,
			stack: e.stack,
		});

		return NextResponse.json(
			{
				error: "Failed to query ClickPay transaction",
				details: e?.response?.data || e.message,
			},
			{ status: 500 }
		);
	}
}
