import { NextResponse } from "next/server";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "بيانات الطلب غير صالحة." }, { status: 400 });
  }

  try {
    const defaultBase = process.env.NODE_ENV === "development" ? "http://mzar.test/api" : API_BASE_URL_NEW;
    const apiBase = (process.env.DIYAFAH_ATHAR_BACKEND_URL || defaultBase).replace(/\/$/, "");
    const response = await fetch(`${apiBase}/landing/diyafah-athar/participation`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json().catch(() => null);

    if (!response.ok) {
      const status = response.status === 409 ? 409 : response.status === 422 ? 422 : 502;
      return NextResponse.json({
        error: status === 409
          ? (result?.error || "هذا الموعد محجوز. يرجى اختيار موعد آخر.")
          : status === 422
            ? (result?.error || "يرجى مراجعة بيانات المشاركة والموعد المختار.")
            : "تعذر تأكيد المشاركة. يرجى المحاولة مجددًا.",
      }, { status });
    }
    if (typeof result?.reference !== "string") {
      return NextResponse.json({ error: "تعذر تأكيد المشاركة." }, { status: 502 });
    }
    return NextResponse.json({ reference: result.reference });
  } catch {
    return NextResponse.json({ error: "تعذر الاتصال بخدمة المشاركة." }, { status: 502 });
  }
}
