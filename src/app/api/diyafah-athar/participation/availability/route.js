import { NextResponse } from "next/server";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const defaultBase = process.env.NODE_ENV === "development" ? "http://mzar.test/api" : API_BASE_URL_NEW;
    const apiBase = (process.env.DIYAFAH_ATHAR_BACKEND_URL || defaultBase).replace(/\/$/, "");
    const response = await fetch(`${apiBase}/landing/diyafah-athar/participation/availability`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !Array.isArray(result?.busy)) {
      return NextResponse.json({ error: "تعذر تحميل المواعيد." }, { status: 502 });
    }
    return NextResponse.json({ busy: result.busy, canManage: false }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "تعذر تحميل المواعيد." }, { status: 502 });
  }
}
