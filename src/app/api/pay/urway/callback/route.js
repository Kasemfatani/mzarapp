import { NextResponse } from "next/server";

function isUrwaySuccess(resp) {
	const code = (
		resp?.responseCode ||
		resp?.ResponseCode ||
		resp?.code ||
		""
	).toString();
	const result = (resp?.result || resp?.Result || "").toString().toUpperCase();
	if (code === "000") return true;
	if (result.includes("CAPTURED") || result.includes("SUCCESS")) return true;
	return false;
}

function pickTranId(params) {
	return (
		params.TranId ||
		params.tranid ||
		params.trackId ||
		params.trackid ||
		params.TRACKID ||
		params.trackID ||
		""
	);
}

async function finalize(req, method, params) {
	const appBase = process.env.APP_URL || "http://localhost:3000";
	const successPath = params.success || "/book-tour-success";
	const failPath = params.fail || "/book-tour";

	const ok = isUrwaySuccess(params);
	const tranId = pickTranId(params);
	if (ok && tranId) {
		const url = new URL(successPath, appBase);
		url.searchParams.set("status", "success");
		url.searchParams.set("tranid", tranId);
		return NextResponse.redirect(url.toString());
	}

	// Failed
	const url = new URL(failPath, appBase);
	url.searchParams.set("status", "failed");
	return NextResponse.redirect(url.toString());
}

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const params = Object.fromEntries(searchParams.entries());
	return finalize(req, "GET", params);
}

export async function POST(req) {
	// Some configurations POST form-data or JSON
	const form = await req.formData().catch(() => null);
	let params = {};
	if (form) {
		form.forEach((v, k) => (params[k] = v));
	} else {
		try {
			params = await req.json();
		} catch {}
	}
	return finalize(req, "POST", params);
}
