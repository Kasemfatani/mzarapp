import { cookies, headers } from "next/headers";
import HeroSection from "@/components/new-home/HeroSection";
import FeaturedToursSection from "@/components/new-home/FeaturedToursSection";

import LazyTopSections from "@/components/new-home/LazyTopSections";
import LazyBottomSections from "@/components/new-home/LazyBottomSections";

import { notFound } from "next/navigation";

import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { API_BETA_URL } from "@/lib/apiConfig";

export const revalidate = 300;

export default async function TourPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

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
			<FeaturedToursSection lang={lang} topData={topData} />
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
