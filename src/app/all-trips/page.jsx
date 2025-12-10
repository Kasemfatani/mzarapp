import { cookies, headers } from "next/headers";
import HeroSection from "@/components/all-trips/HeroSection";
import { FiltersBar } from "@/components/all-trips/FiltersBar";
import { TripsGrid } from "@/components/all-trips/TripsGrid";
import { SeoContent } from "@/components/all-trips/SeoContent";

export const revalidate = 300;


export default function TourPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<HeroSection lang={lang} />
			<FiltersBar  totalResults={34} lang={lang} />
			<TripsGrid lang={lang} />
			<SeoContent lang={lang} />
			
		</div>
	);
}
