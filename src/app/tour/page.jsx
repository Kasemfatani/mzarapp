import { cookies, headers } from "next/headers";
import Hero from "@/components/tour/Hero";
import WhatTour from "@/components/tour/WhatTour";
import LazyTourSections from "@/components/tour/LazyTourSections";
import LazyTestimonials from "@/components/tour/LazyTestimonials";


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
			<LazyTourSections initialLang={lang} />
			<br /> <br />
			<LazyTestimonials initialLang={lang} />
		</div>
	);
}
