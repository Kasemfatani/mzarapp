import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { setJson } from "@/lib/redisClient";

// TTL 1 hour in seconds
const DRAFT_TTL = 60 * 60;

export async function POST(req) {
	try {
		const body = await req.json();

		// Basic shape validation (required fields) - keep same keys user backend expects later
		const required = [
			"address_name",
			"visit_date",
			"lat",
			"lng",
			"transportation_type_id",
			"visit_time_id",
			"seats",
			"booking_id",
		];

		const missing = required.filter(
			(k) => body[k] === undefined || body[k] === ""
		);
		if (missing.length) {
			return NextResponse.json(
				{ error: `Missing fields: ${missing.join(",")}` },
				{ status: 400 }
			);
		}

		const draftId = uuidv4();

		// Normalize pricing meta: we expect client to send grand_total (already calculated) & tax_rate.
		// Server STILL treats client grand_total as a hint. (Real integration: recompute server-side. we trust client for now. we can calculate again on the server to avoid tampering)
		const draftPayload = {
			...body,
			add_ons: Array.isArray(body.add_ons) ? body.add_ons : [],
			grand_total: Number(body.grand_total || 0),
			tax_rate: body.tax_rate !== undefined ? Number(body.tax_rate) : undefined,
			payment: {
				status: "pending", // pending | success | failed
				provider: "urway",
				attempt_count: 0,
			},
			meta: {
				draftId,
				createdAt: Date.now(),
			},
		};

		await setJson(`draft:${draftId}`, draftPayload, DRAFT_TTL);

		return NextResponse.json({ draftId });
	} catch (e) {
		console.error("/api/bookings/draft error", e);
		return NextResponse.json(
			{ error: "Failed to create draft" },
			{ status: 500 }
		);
	}
}
