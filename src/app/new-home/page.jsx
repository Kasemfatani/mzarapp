import { cookies, headers } from "next/headers";
import HeroSection from "@/components/new-home/HeroSection";
import FeaturedToursSection from "@/components/new-home/FeaturedToursSection";
import QuickCategories from "@/components/new-home/QuickCategories";
import HowItWorks from "@/components/new-home/HowItWorks";
import { SpecialOffers } from "@/components/new-home/SpecialOffers";
import { WhyChooseUs } from "@/components/new-home/WhyChooseUs";
import { CustomerReviews } from "@/components/new-home/CustomerReviews";
import BannerCta from "@/components/new-home/BannerCta";
import DownloadAppSection from "@/components/new-home/DownloadAppSection";

import { notFound } from "next/navigation";

import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { API_BETA_URL } from "@/lib/apiConfig";

export const revalidate = 300;


export default async function TourPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

		const res = await fetch(
		`${API_BETA_URL}/landing/home/top-packages`,
		{
			headers: { lang },
		}
	);

	if (!res.ok) return null;
	const json = await res.json();
	const topData = json?.data || null;

	if (!topData) notFound();

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<HeroSection lang={lang} />
			<FeaturedToursSection lang={lang} topData={topData} />
			<QuickCategories lang={lang} />
			<BannerCta lang={lang} />
			<HowItWorks lang={lang} />
			<SpecialOffers lang={lang} />
			<WhyChooseUs lang={lang} />
			<CustomerReviews lang={lang} />
			<DownloadAppSection lang={lang} />
			
		</div>
	);
}
