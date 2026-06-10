import { headers } from "next/headers";
import HeroSection from "@/components/new-home/HeroSection";
import FeaturedToursSection from "@/components/new-home/FeaturedToursSection";
import FullPackageSection from "@/components/new-home/FullPackageSection";

import LazyTopSections from "@/components/new-home/LazyTopSections";
import LazyBottomSections from "@/components/new-home/LazyBottomSections";
import LazyLoader from "@/components/LazyLoader";
import RamadanSection from "@/components/new-home/RamadanSection";

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
			<FullPackageSection lang={lang} isSaudi={isSaudi} />
			<FeaturedToursSection lang={lang} topData={topData} isSaudi={isSaudi} />
	
			<LazyLoader>
				<RamadanSection lang={lang} isSaudi={isSaudi} />
			</LazyLoader>

			{/* <QuickCategories lang={lang} />
				<BannerCta lang={lang} />
				<HowItWorks lang={lang} /> */}
			<LazyTopSections lang={lang} />

			{/* <SpecialOffers lang={lang} />
				<WhyChooseUs lang={lang} />
				<CustomerReviews lang={lang} />
				<DownloadAppSection lang={lang} /> */}

			<LazyBottomSections lang={lang} />
		</div>
	);
}
