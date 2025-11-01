import { cookies, headers } from "next/headers";
import Hero from "@/components/madinah/Hero";
// import WhatTour from "@/components/madinah/WhatTour";
import TourStory from "@/components/madinah/TourStory";
import AboutTour from "@/components/madinah/AboutTour";
import Stations from "@/components/madinah/Stations";
import AppFeatures from "@/components/madinah/AppFeatures";
import PreviewSection from "@/components/madinah/PreviewSection";
import DownloadAppSection from "@/components/madinah/DownloadAppSection";
import Testimonials from "@/components/madinah/Testimonials";
import FAQ from "@/components/madinah/FAQ"; 
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
