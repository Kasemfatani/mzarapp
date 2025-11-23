import { cookies, headers } from "next/headers";
import Hero from "@/components/tour/Hero";
import WhatTour from "@/components/tour/WhatTour";
import LazyTourSections from "@/components/tour/LazyTourSections";
import LazyTestimonials from "@/components/tour/LazyTestimonials";


export const revalidate = 300;

export function generateMetadata() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	if (lang === "ar") {
		return {
			title: "جولات الحرمين الشريفين | مزار",
			description:
				"استكشف أقدس بقاع الأرض عبر تجربة إيمانية ومعرفية فريدة، تسمع فيها القصص بلغتك وتشاهد المعالم بعينك، في جولات ذكية تجمع بين الأصالة والتقنية. ",
		};
	}
	return {
		title: "The Enriching Haramain Tours | Mzar ",
		description:
			"Explore the holiest places on earth through a tour , where you listen to stories in your own language and witness sacred landmarks in smart tours that blend authenticity with technology.",
	};
}



export default function TourPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero initialLang={lang} />
			<WhatTour initialLang={lang} />
			<LazyTourSections initialLang={lang} />
			<br /> <br />
			<LazyTestimonials initialLang={lang} />
		</div>
	);
}
