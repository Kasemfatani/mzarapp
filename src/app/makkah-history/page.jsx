import { cookies, headers } from "next/headers";
import Hero from "@/components/makkah-history/Hero";
import StepsSection from "@/components/makkah-history/StepsSection";

import LazyTopSections from "@/components/makkah-history/LazyTopSections";
import LazyBottomSections from "@/components/makkah-history/LazyBottomSections";

// import BusStops from "@/components/makkah-history/BusStops";
// import PricingSection from "@/components/makkah-history/PricingSection";
// import Gallery from "@/components/makkah-history/Gallery";
// import WhyMzarSection from "@/components/makkah-history/WhyMzarSection";


// import FAQ from "@/components/makkah-history/FAQ";
// import BannerSection from "@/components/makkah-history/BannerSection";

export const revalidate = 300;

export default function Page() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero lang={lang} />
			<StepsSection lang={lang} />
			<LazyTopSections lang={lang} />
			<LazyBottomSections lang={lang} />
			
		</div>
	);
}
