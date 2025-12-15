import { NextResponse } from "next/server";

/**
 * This function handles the server-to-server POST callback from ClickPay.
 * ClickPay sends the payment result here, and we store it temporarily
 * so the success page can retrieve it.
 */
async function handleServerCallback(req) {
	let params = {};

	// Try to parse as JSON first
	try {
		const contentType = req.headers.get("content-type") || "";

		if (contentType.includes("application/json")) {
			params = await req.json().catch(() => ({}));
		} else if (contentType.includes("application/x-www-form-urlencoded")) {
			// Parse form data
			const formData = await req.formData().catch(() => null);
			if (formData) {
				params = Object.fromEntries(formData.entries());
			}
		} else {
			// Try reading as text and parse
			const text = await req.text().catch(() => "");
			console.log("Raw callback body:", text);

			// Try parsing as JSON
			try {
				params = JSON.parse(text);
			} catch {
				// Try parsing as URL-encoded
				const urlParams = new URLSearchParams(text);
				params = Object.fromEntries(urlParams.entries());
			}
		}
	} catch (error) {
		console.error("Error parsing callback body:", error);
	}

	console.log(
		"ClickPay SERVER POST callback received:",
		JSON.stringify(params, null, 2)
	);

	const tranRef = params.tran_ref;
	const cartId = params.cart_id;
	const isSuccess = params?.payment_result?.response_status === "A";

	if (isSuccess) {
		console.log(
			`ClickPay SERVER callback SUCCESS for cartId: ${cartId}, tranRef: ${tranRef}`
		);

		// Store the result in a way the frontend can retrieve it
		// Option 1: Use a database/Redis (recommended for production)
		// Option 2: For now, we'll rely on the query endpoint
	} else {
		console.warn(
			`ClickPay SERVER callback FAILED for cartId: ${cartId}, tranRef: ${tranRef}`,
			params
		);
	}

	// Always respond with 200 OK to acknowledge receipt
	return NextResponse.json({ status: "ok" });
}

/**
 * This function handles the user's browser being redirected back.
 * ClickPay doesn't send payment details here, so we redirect to a waiting page
 * that will poll the payment status using the query endpoint.
 */
async function handleBrowserReturn(req) {
	const { searchParams } = new URL(req.url);
	const appBase = process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: process.env.APP_URL || "http://localhost:3000";

	// Get the success/fail paths from the callback URL
	const successPath = searchParams.get("successPath") || "/book-tour-success";
	const failPath = searchParams.get("failPath") || "/book-tour";

	console.log(
		"ClickPay GET callback (browser return) received with params:",
		JSON.stringify(Object.fromEntries(searchParams), null, 2)
	);
	console.log("App base URL:", appBase);

	// Since ClickPay doesn't send transaction details in the GET request,
	// we redirect to the success page which will verify the payment
	// using the cart_id from localStorage
	const url = new URL(successPath, appBase);
	url.searchParams.set("status", "pending");

	console.log("Redirecting to:", url.toString());
	return NextResponse.redirect(url.toString());
}

// Handles server-to-server notifications
export async function POST(req) {
	return handleServerCallback(req);
}

// Handles the user's browser return
export async function GET(req) {
	return handleBrowserReturn(req);
}
