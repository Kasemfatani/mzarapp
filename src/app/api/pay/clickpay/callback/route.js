import { NextResponse } from "next/server";

/**
 * This function handles the server-to-server POST callback from ClickPay.
 */
async function handleServerCallback(req) {
	let params = {};

	try {
		const contentType = req.headers.get("content-type") || "";

		if (contentType.includes("application/json")) {
			params = await req.json().catch(() => ({}));
		} else if (contentType.includes("application/x-www-form-urlencoded")) {
			const formData = await req.formData().catch(() => null);
			if (formData) {
				params = Object.fromEntries(formData.entries());
			}
		} else {
			const text = await req.text().catch(() => "");
			console.log("Raw callback body:", text);

			try {
				params = JSON.parse(text);
			} catch {
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

	// If params is empty, this might be a browser request, not ClickPay's callback
	if (!params || Object.keys(params).length === 0) {
		console.log("Empty POST callback - treating as browser redirect");
		return handleBrowserReturn(req);
	}

	// FIX: Detect if this is a browser POST redirect
	// ClickPay sends a POST request to the return URL with camelCase params (respStatus)
	// The server-to-server callback uses snake_case params (payment_result)
	// If it has 'respStatus' (camelCase) and NO 'payment_result', it's the browser redirect.
	const isBrowserRedirect =
		params.respStatus !== undefined && params.payment_result === undefined;

	if (isBrowserRedirect) {
		console.log("Detected browser POST redirect - redirecting to success page");
		return handleBrowserReturn(req);
	}

	// FIX: ClickPay uses camelCase field names in callbacks
	const tranRef = params.tranRef || params.tran_ref;
	const cartId = params.cartId || params.cart_id;
	const respStatus =
		params.respStatus || params?.payment_result?.response_status;
	const isSuccess = respStatus === "A";

	if (isSuccess) {
		console.log(
			`ClickPay SERVER callback SUCCESS for cartId: ${cartId}, tranRef: ${tranRef}`
		);
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
 */
function handleBrowserReturn(req) {
	const { searchParams } = new URL(req.url);
	const appBase = process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: process.env.APP_URL || "http://localhost:3000";

	const successPath = searchParams.get("successPath") || "/book-tour-success";
	const failPath = searchParams.get("failPath") || "/book-tour";

	console.log(
		"ClickPay callback - browser redirect with params:",
		JSON.stringify(Object.fromEntries(searchParams), null, 2)
	);
	console.log("App base URL:", appBase);

	const url = new URL(successPath, appBase);
	url.searchParams.set("status", "pending");

	console.log("Redirecting browser to:", url.toString());
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
