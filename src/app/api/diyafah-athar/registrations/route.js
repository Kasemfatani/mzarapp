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
    const defaultApiBase = process.env.NODE_ENV === "development" ? "http://mzar.test/api" : API_BASE_URL_NEW;
    const apiBase = (process.env.DIYAFAH_ATHAR_BACKEND_URL || defaultApiBase).replace(/\/$/, "");
    const response = await fetch(`${apiBase}/landing/diyafah-athar/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { error: response.status === 422 ? "يرجى مراجعة بيانات التسجيل." : "تعذر حفظ التسجيل. يرجى المحاولة مجددًا." },
        { status: response.status === 422 ? 422 : 502 },
      );
    }
    if (typeof result?.reference !== "string") {
      return NextResponse.json({ error: "تعذر تأكيد التسجيل." }, { status: 502 });
    }
    return NextResponse.json({ reference: result.reference });
  } catch {
    return NextResponse.json({ error: "تعذر الاتصال بخدمة التسجيل." }, { status: 502 });
  }
}
