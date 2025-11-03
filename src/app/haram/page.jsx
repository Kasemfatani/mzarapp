import { cookies, headers } from "next/headers";
import Hero from "@/components/haram/Hero";
// import WhatTour from "@/components/haram/WhatTour";
import TourStory from "@/components/haram/TourStory";
import AboutTour from "@/components/haram/AboutTour";
import Stations from "@/components/haram/Stations";
import AppFeatures from "@/components/haram/AppFeatures";
import PreviewSection from "@/components/haram/PreviewSection";
import DownloadAppSection from "@/components/haram/DownloadAppSection";
import Testimonials from "@/components/haram/Testimonials";
import FAQ from "@/components/haram/FAQ"; 
export const revalidate = 300;

export default function TourPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero initialLang={lang} />
			<TourStory initialLang={lang} />
			<AboutTour initialLang={lang} />
			<Stations initialLang={lang} />
			<AppFeatures initialLang={lang} />
			<PreviewSection initialLang={lang} />
			<DownloadAppSection initialLang={lang} />
			<Testimonials lang={lang} />
			<FAQ initialLang={lang} /> 
			{/* <WhatTour initialLang={lang} />
			<TourStory initialLang={lang} />
			<DownloadAppSection initialLang={lang} />
			<TopTextSection initialLang={lang} />
			<br /> <br />
			*/}
		</div>
	);
}
