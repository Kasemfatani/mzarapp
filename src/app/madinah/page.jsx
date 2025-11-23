import { cookies, headers } from "next/headers";
import Hero from "@/components/madinah/Hero";
// import WhatTour from "@/components/madinah/WhatTour";
import TourStory from "@/components/madinah/TourStory";

import LazyMadinaSections from "@/components/madinah/LazyMadinaSections";
import LazyPreviewSection from "@/components/madinah/LazyPreviewSection";
import LazyTestimonials from "@/components/madinah/LazyTestimonials";

export const revalidate = 300;

export function generateMetadata() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	if (lang === "ar") {
		return {
			title: "جولة المسجد النبوي الإثرائية",
			description:
				"جولة تأخذك إلى حيث خطت أقدام النبي ﷺ وصحابته الكرام، لتتعرف على المعالم التاريخية في المسجد النبوي، وتشاهدها كما رآها التاريخ، في تجربة تجمع بين التأمل، والعلم، والتقنية الحديثة.",
		};
	}
	return {
		title: "The Enriching Al-Masjid An-Nabawi Tour",
		description:
			"Walk where the Prophet ﷺ once stood and explore Al-Masjid An-Nabawi’s sacred landmarks , in an experience that blends reflection, learning, and modern technology.",
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
			<TourStory initialLang={lang} />
			<LazyMadinaSections initialLang={lang} />
			<LazyPreviewSection initialLang={lang} />
			<LazyTestimonials initialLang={lang} />

		</div>
	);
}
