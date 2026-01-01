import { cookies, headers } from "next/headers";
import HeroSection from "@/components/new-home/HeroSection";
import FeaturedToursSection from "@/components/new-home/FeaturedToursSection";

import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import LazySections from "@/components/new-home/LazySections";

import { notFound } from "next/navigation";

import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { API_BETA_URL } from "@/lib/apiConfig";

export const revalidate = 300;

const QuickCategories = dynamic(
	() => import("@/components/new-home/QuickCategories"),
	{ ssr: false, loading: () => <Loading /> }
);
const BannerCta = dynamic(() => import("@/components/new-home/BannerCta"), {
	ssr: false,
	loading: () => <Loading />,
});
const HowItWorks = dynamic(() => import("@/components/new-home/HowItWorks"), {
	ssr: false,
	loading: () => <Loading />,
});

const SpecialOffers = dynamic(
	() => import("@/components/new-home/SpecialOffers"),
	{
		ssr: false,
		loading: () => <Loading />,
	}
);

const WhyChooseUs = dynamic(() => import("@/components/new-home/WhyChooseUs"), {
	ssr: false,
	loading: () => <Loading />,
});

const CustomerReviews = dynamic(
	() => import("@/components/new-home/CustomerReviews"),
	{
		ssr: false,
		loading: () => <Loading />,
	}
);

const DownloadAppSection = dynamic(
	() => import("@/components/new-home/DownloadAppSection"),
	{
		ssr: false,
		loading: () => <Loading />,
	}
);

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
			<LazySections>
				<QuickCategories lang={lang} />
				<BannerCta lang={lang} />
				<HowItWorks lang={lang} />
			</LazySections>

			<LazySections>
				<SpecialOffers lang={lang} />
				<WhyChooseUs lang={lang} />
				<CustomerReviews lang={lang} />
				<DownloadAppSection lang={lang} />
			</LazySections>
		</div>
	);
}
