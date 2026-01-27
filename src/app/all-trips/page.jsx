import { cookies, headers } from "next/headers";
import PageWrapper from "./PageWrapper";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getIsSaudiFromHeaders } from "@/lib/apiConfig";

export const revalidate = 300;

// Server fetch that accepts lang and a query string
const getData = cache(async (lang, qs) => {
	const url = `${API_BASE_URL_NEW}/landing/packages/list${qs ? `?${qs}` : ""}`;
	const res = await fetch(url, {
		headers: { lang },
	});

	if (!res.ok) return null;
	const json = await res.json();
	return json?.data || null;
});

function determineLang() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	return (
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en")
	);
}

export function generateMetadata() {
	const lang = determineLang();

	if (lang === "ar") {
		return {
			title: "جميع التجارب | مزار",
		};
	}
	return {
		title: "All Experiences | Mzar",
	};
}

export default async function AllTrip({ searchParams }) {
	const lang = determineLang();

	// Build query string from searchParams (server-driven)
	const qs = new URLSearchParams();
	if (searchParams?.search_text)
		qs.set("search_text", searchParams.search_text);
	if (searchParams?.city_id) qs.set("city_id", searchParams.city_id);
	if (searchParams?.type) qs.set("type", searchParams.type);
	if (searchParams?.duration) qs.set("duration", searchParams.duration); // e.g., "1-2"
	if (searchParams?.seats) qs.set("seats", searchParams.seats);
	if (searchParams?.rating) qs.set("rating", searchParams.rating);
	if (searchParams?.start_price)
		qs.set("start_price", searchParams.start_price);

	const data = await getData(lang, qs.toString());
	if (!data) notFound();

	// reuseable geo helper
  const { isSaudi } = await getIsSaudiFromHeaders(headers());

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<PageWrapper lang={lang} data={data} isSaudi={isSaudi} />
		</div>
	);
}
