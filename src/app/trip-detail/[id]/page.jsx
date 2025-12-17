import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/apiConfig";

import { HeroWithInfo } from "@/components/trip-detail/HeroWithInfo";
import { SummaryCard } from "@/components/trip-detail/SummaryCard";
import { HighlightsSection } from "@/components/trip-detail/HighlightsSection";
import { AboutSection } from "@/components/trip-detail/AboutSection";
import { InclusionsSection } from "@/components/trip-detail/InclusionsSection";
import { TimelineSection } from "@/components/trip-detail/TimelineSection";
import { TimelineImg } from "@/components/trip-detail/TimelineImg";
import { MapSection } from "@/components/trip-detail/MapSection";
import { MultipleMap } from "@/components/trip-detail/MultipleMap";
import Destinations from "@/components/trip-detail/Destinations";
import BusStops from "@/components/trip-detail/BusStops";

export const revalidate = 300;

const PATH_IMPORTS = {
	45: () => import("@/components/data/paths/mashair").then((m) => m.default),
	49: () =>
		import("@/components/data/history/revelation").then((m) => m.default),
	47: () =>
		import("@/components/data/paths/tuwa").then((m) => m.default),
	73: () =>
		import("@/components/data/paths/quba").then((m) => m.default),
	74: () =>
		import("@/components/data/paths/uhud").then((m) => m.default),
	8: () => import("@/components/data/tour/haram").then((m) => m.default),
	9: () => import("@/components/data/tour/madinah").then((m) => m.default),
	10: () => import("@/components/data/tour/bus").then((m) => m.default),
	11: () => import("@/components/data/tour/show").then((m) => m.default),
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

	///////////////
	if (id == 45 || id == 49 || id == 47 ||  id == 73 || id == 74 || id == 100) {
		const res = await fetch(
			`${API_BASE_URL}/landing/home/packages/details?package_id=${id}`,
			{
				headers: { lang },
				next: { revalidate: 300 },
			}
		);

		if (!res.ok) notFound();
		const pathData = await res.json();
		if (!pathData) notFound();
		
		// Merge API data into local data
		data.locations = pathData.locations;
		data.mapLocations = pathData.locations;
	}

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<HeroWithInfo lang={lang} data={data} />
			<SummaryCard lang={lang} data={data} />
			<HighlightsSection lang={lang} data={data} />
			<AboutSection lang={lang} data={data} />
			<InclusionsSection lang={lang} data={data} />
			{data.busStops && <BusStops lang={lang} />}
			{data.locations && <Destinations lang={lang} data={data} />}
			{data.timeline && <TimelineSection lang={lang} data={data} />}
			{data.timelineImg && <TimelineImg lang={lang} data={data} />}
			{data.mapLocation && <MapSection lang={lang} data={data} />}
			{(data.mapLocations ) && <MultipleMap lang={lang} data={data} />}
		</div>
	);
}
