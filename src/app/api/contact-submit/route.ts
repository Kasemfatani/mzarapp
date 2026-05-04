import { NextResponse } from "next/server";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { captcha_token, ...form } = body;

		if (!captcha_token) {
			return NextResponse.json(
				{ status: false, message: "Missing captcha token" },
				{ status: 400 }
			);
		}

		const params = new URLSearchParams();
		params.append("secret", process.env.RECAPTCHA_SECRET_KEY || "");
		params.append("response", captcha_token);

		const verifyRes = await fetch(
			"https://www.google.com/recaptcha/api/siteverify",
			{
				method: "POST",
				body: params,
			}
		);
		const verifyJson = await verifyRes.json();

		const ok = verifyJson?.success === true && (verifyJson?.score ?? 0) >= 0.5;
		if (!ok) {
			return NextResponse.json(
				{
					status: false,
					message: "Captcha failed",
					score: verifyJson?.score ?? 0,
				},
				{ status: 400 }
			);
		}

		// Forward to your backend API
		const forwardRes = await fetch(`${API_BASE_URL_NEW}/landing/form/store`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				lang: form?.lang === "ar" ? "ar" : "en",
			},
			body: JSON.stringify({
				name: form.name,
				email: form.email,
				mobile: form.phone,
				message: form.message,
				inquiry_type_id: Number(form.inquiryType),
			}),
			cache: "no-store",
		});

		const forwardJson = await forwardRes.json();
		return NextResponse.json(forwardJson, { status: forwardRes.status });
	} catch (e) {
		return NextResponse.json(
			{ status: false, message: "Server error" },
			{ status: 500 }
		);
	}
}
