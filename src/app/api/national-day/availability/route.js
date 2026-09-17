import { NextResponse } from "next/server";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";

export const dynamic = "force-dynamic";

export async function GET() {
	try {
		const response = await fetch(
			`${API_BASE_URL_NEW}/landing/haram-offer/check-availability`,
			{ cache: "no-store", signal: AbortSignal.timeout(10000) },
		);
		const result = await response.json().catch(() => null);

		if (!response.ok || typeof result?.status !== "boolean") {
			return NextResponse.json(
				{ status: false, code: "availability_unavailable" },
				{ status: 502 },
			);
		}

		return NextResponse.json({
			status: result.status,
			message: result.message || (result.status ? "Available" : "Unavailable"),
		});
	} catch {
		return NextResponse.json(
			{ status: false, code: "availability_unavailable" },
			{ status: 502 },
		);
	}
}
