import { cookies, headers } from "next/headers";
import BookWrapper from "./BookWrapper";
import { notFound } from "next/navigation";
import { cache } from "react";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { API_BETA_URL } from "@/lib/apiConfig";
import { getServerLocale } from "@/lib/localeServer";
import { getIsSaudiFromHeaders } from "@/lib/apiConfig";

// 2. Wrap the fetch function with cache()
const getData = cache(async (lang , id) => {
	// Remove the redundant 'cache: "no-store"' unless you explicitly
	// need to revalidate on every request (which would prevent caching/deduplication).
	// If you need revalidation, use 'next: { revalidate: N }' instead of 'no-store'
	const res = await fetch(
		`${API_BASE_URL_NEW}/landing/landing-bus-trip/booking-data?package_id=${id}`,
		{
			headers: { lang },
		}
	);

	if (!res.ok) return null;
	const json = await res.json();
	return json?.data || null;
});

// Helper to determine language (keep this logic centralized)
function determineLang() {
	return getServerLocale();
}



export function generateMetadata() {
	
	const lang = determineLang();

	if (lang === "ar") {
		return {
			title: "حجز حافلة الجولات الإثرائية | مزار",
		};
	}
	return {
		title: "Booking Enriching Bus Tours | Mzar",
	};
}

export default async function Page({ params }) {
	
	const { id } = params;
	if (!id) return notFound();

	const lang = determineLang();

	// Call the cached function again—it will reuse the result from generateMetadata
			const data = await getData(lang , id);
			// console.log("Trip Detail Data:", data);
			if (!data) notFound();

   // reuseable geo helper
  const { isSaudi , countryCode } = await getIsSaudiFromHeaders(headers());


	return (
		<BookWrapper lang={lang} busData={data} isSaudi={isSaudi} countryCode={countryCode} />
	);
}
