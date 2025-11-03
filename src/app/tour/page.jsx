import { cookies, headers } from "next/headers";
import Hero from "@/components/tour/Hero";
import WhatTour from "@/components/tour/WhatTour";
import TourStory from "@/components/tour/TourStory";
import DownloadAppSection from "@/components/tour/DownloadAppSection";
import TopTextSection from "@/components/tour/TopTextSection";
import Testimonials from "@/components/tour/Testimonials";

export const revalidate = 300;

export default function TourPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero initialLang={lang} />
			<WhatTour initialLang={lang} />
			<TourStory initialLang={lang} />
			<DownloadAppSection initialLang={lang} />
			<TopTextSection initialLang={lang} />
			<br /> <br />
			<Testimonials lang={lang} />
		</div>
	);
}
