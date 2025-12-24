import { cookies, headers } from "next/headers";

import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { API_BETA_URL } from "@/lib/apiConfig";
import { notFound } from "next/navigation";
import { cache } from "react";

import BookWrapper from "@/components/book-path-new/BookWrapper";

// 2. Wrap the fetch function with cache()
const getData = cache(async (lang , id) => {
	// Remove the redundant 'cache: "no-store"' unless you explicitly
	// need to revalidate on every request (which would prevent caching/deduplication).
	// If you need revalidation, use 'next: { revalidate: N }' instead of 'no-store'
	const res = await fetch(
		`${API_BASE_URL_NEW}/landing/trip/booking-data?package_id=${id}`,
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
			title: "حجز ",
			
		};
	}
	return {
		title: "Booking ",
		
	};
}

export default async function Page({ params }) {
	
	const { id } = params;
	if (!id) return notFound();

	const lang = determineLang();
	
	
		// Call the cached function again—it will reuse the result from generateMetadata
		const data = await getData(lang, id);
		// console.log("Trip Detail Data:", data);
		if (!data) notFound();



	// console.log("BookTourNew Page busData:", data);

	return (
		<BookWrapper lang={lang} busData={data} disabledDays={[]}/>
	);
}
