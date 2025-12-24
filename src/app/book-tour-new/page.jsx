import { cookies, headers } from "next/headers";
import BookWrapper from "./BookWrapper";
import { notFound } from "next/navigation";
import { cache } from "react";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { API_BETA_URL } from "@/lib/apiConfig";


// 2. Wrap the fetch function with cache()
const getData = cache(async (lang) => {
	// Remove the redundant 'cache: "no-store"' unless you explicitly
	// need to revalidate on every request (which would prevent caching/deduplication).
	// If you need revalidation, use 'next: { revalidate: N }' instead of 'no-store'
	const res = await fetch(
		`${API_BASE_URL_NEW}/landing/landing-bus-trip/booking-data?package_id=96`,
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
			title: "حجز حافلة الجولات الإثرائية",
			
		};
	}
	return {
		title: "Booking Enriching Bus Tours",
		
	};
}

export default async function Page() {
	
	const lang = determineLang();

	// Call the cached function again—it will reuse the result from generateMetadata
			const data = await getData(lang);
			// console.log("Trip Detail Data:", data);
			if (!data) notFound();


	const tripData = {
    imageUrl: "https://images.unsplash.com/photo-1649459304452-5a3e5d217102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNjYSUyMGhhamolMjBwaWxncmltc3xlbnwxfHx8fDE3NjU2MTYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "مكة المكرمة",
    rating: 4.9,
    reviewCount: 512,
    title: "جولة المسجد الحرام الشاملة",
    subtitle: "تجربة روحانية فريدة مع مرشد متخصص ومعتمد",
    duration: "7 ساعات",
    maxPeople: "12 شخص",
    price: 99,
    minPeople: 5,
  };

	return (
		<BookWrapper tripData={tripData} lang={lang} busData={data}/>
	);
}
