import { cookies, headers } from "next/headers";

import { HeroWithInfo } from "@/components/trip-detail/HeroWithInfo";
import { SummaryCard } from "@/components/trip-detail/SummaryCard";
import { HighlightsSection } from "@/components/trip-detail/HighlightsSection";
import { AboutSection } from "@/components/trip-detail/AboutSection";
import { InclusionsSection } from "@/components/trip-detail/InclusionsSection";
import { TimelineSection } from "@/components/trip-detail/TimelineSection";
import { MapSection } from "@/components/trip-detail/MapSection";


export const revalidate = 300;


export default function TourPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			
			<HeroWithInfo  lang={lang} />
			<SummaryCard lang={lang} />
			<HighlightsSection lang={lang} />
			<AboutSection lang={lang} />
			<InclusionsSection lang={lang} />
			<TimelineSection lang={lang} />
			<MapSection lang={lang} />

		</div>
	);
}
