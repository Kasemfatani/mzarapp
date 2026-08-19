import { headers } from "next/headers";
import HeroSection from "@/components/new-home/HeroSection";
import MzarServicesSection from "@/components/new-home/MzarServicesSection";
import FeaturedToursSection from "@/components/new-home/FeaturedToursSection";
import AudioGuideSection from "@/components/new-home/AudioGuideSection";

import { notFound } from "next/navigation";

import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { API_BETA_URL } from "@/lib/apiConfig";
import { getIsSaudiFromHeaders } from "@/lib/apiConfig";
import { getServerLocale } from "@/lib/localeServer";

export const revalidate = 300;

export default async function TourPage() {
	const requestHeaders = headers();
	const resolvedLocale = getServerLocale();
	const lang = resolvedLocale === "ar" ? "ar" : "en";

	// --- IP Geolocation Logic ---
	// reuseable geo helper
	const { isSaudi } = await getIsSaudiFromHeaders(requestHeaders);
	// --- End IP Geolocation Logic ---

	const res = await fetch(`${API_BASE_URL_NEW}/landing/home/top-packages`, {
		headers: { lang },
	});

	if (!res.ok) return null;
	const json = await res.json();
	const topData = json?.data || null;

	if (!topData) notFound();

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<HeroSection lang={lang} />
			<MzarServicesSection lang={lang} />
			<FeaturedToursSection lang={lang} topData={topData} isSaudi={isSaudi} />
			<AudioGuideSection lang={lang} />
		</div>
	);
}
