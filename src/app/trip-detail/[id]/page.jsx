import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";

import { HeroWithInfo } from "@/components/trip-detail/HeroWithInfo";
import { SummaryCard } from "@/components/trip-detail/SummaryCard";
import { HighlightsSection } from "@/components/trip-detail/HighlightsSection";
import { AboutSection } from "@/components/trip-detail/AboutSection";
import { InclusionsSection } from "@/components/trip-detail/InclusionsSection";
import { TimelineSection } from "@/components/trip-detail/TimelineSection";
import { MapSection } from "@/components/trip-detail/MapSection";
import Destinations from "@/components/trip-detail/Destinations";
import BusStops from "@/components/trip-detail/BusStops";

export const revalidate = 300;

const PATH_IMPORTS = {
	45: () => import("@/components/data/paths/mashair").then((m) => m.default),
  2 : () => import("@/components/data/history/revelation").then((m) => m.default),
  8 : () => import("@/components/data/tour/haram").then((m) => m.default),
  10 : () => import("@/components/data/tour/bus").then((m) => m.default),
	// Add more: 12: () => import("@/components/data/paths/another").then(m => m.default),
};

export default async function TourPage({ params }) {
	const { id } = params;
	if (!id) return notFound();

	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");
	const isAr = lang === "ar";

	const loader = PATH_IMPORTS[Number(id)];
	if (!loader) return notFound();

	const getData = await loader(); // dynamically load the function
	const data = getData(isAr);
	if (!data) return notFound();

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<HeroWithInfo lang={lang} data={data} />
			<SummaryCard lang={lang} data={data} />
			<HighlightsSection lang={lang} data={data} />
			<AboutSection lang={lang} data={data} />
			<InclusionsSection lang={lang} data={data} />
      {data.busStops && <BusStops lang={lang}  />}
      {data.locations && <Destinations lang={lang} data={data} />}
      {data.timeline && <TimelineSection lang={lang} data={data} />}
			<MapSection lang={lang} data={data} />
		</div>
	);
}
