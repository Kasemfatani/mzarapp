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

export const revalidate = 300;


export default function TourPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<HeroSection lang={lang} />
			<FeaturedToursSection lang={lang} />
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
