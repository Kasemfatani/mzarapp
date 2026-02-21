import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/apiConfig";

import { HeroWithInfo } from "@/components/trip-detail/HeroWithInfo";
import { SummaryCard } from "@/components/trip-detail/SummaryCard";

import LazyTopSections from "@/components/trip-detail/LazyTopSections";

import LazyBottomSections from "@/components/trip-detail/LazyBottomSections";

import { API_BASE_URL_NEW } from "@/lib/apiConfig";

import { cache } from "react";

import { getIsSaudiFromHeaders } from "@/lib/apiConfig";

import HaramPromoSaver from "@/components/common/HaramPromoSaver";

// 2. Wrap the fetch function with cache()
const getData = cache(async (id, lang) => {
	// Remove the redundant 'cache: "no-store"' unless you explicitly
	// need to revalidate on every request (which would prevent caching/deduplication).
	// If you need revalidation, use 'next: { revalidate: N }' instead of 'no-store'
	const res = await fetch(
		`${API_BASE_URL_NEW}/landing/packages/show?package_id=${id}`,
		{
			headers: { lang },
		}
	);

	if (!res.ok) return null;
	const json = await res.json();
	return json?.data || null;
});

// Helper to determine language (keep this logic centralized)
function determineLang() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	return (
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en")
	);
}

// Add: use API data for page metadata
export async function generateMetadata({ params }) {
	const { id } = params || {};
	if (!id) return {};
	const lang = determineLang();
	const data = await getData(id, lang);
	if (!data) return {};
	return {
		title: data.meta_title || "",
		description: data.meta_description || "",
	};
}

export const revalidate = 300;

// const PATH_IMPORTS = {
// 	45: () => import("@/components/data/paths/mashair").then((m) => m.default),
// 	49: () =>
// 		import("@/components/data/history/revelation").then((m) => m.default),
// 	47: () => import("@/components/data/paths/tuwa").then((m) => m.default),
// 	73: () => import("@/components/data/paths/quba").then((m) => m.default),
// 	74: () => import("@/components/data/paths/uhud").then((m) => m.default),
// 	8: () => import("@/components/data/tour/haram").then((m) => m.default),
// 	9: () => import("@/components/data/tour/madinah").then((m) => m.default),
// 	10: () => import("@/components/data/tour/bus").then((m) => m.default),
// 	11: () => import("@/components/data/tour/show").then((m) => m.default),
// 	6: () => import("@/components/data/tour/fullMakkah").then((m) => m.default),
// 	7: () => import("@/components/data/tour/fullMadinnah").then((m) => m.default),
// 	// Add more: 12: () => import("@/components/data/paths/another").then(m => m.default),
// };

export default async function TourPage({ params }) {
	const { id } = params;
	if (!id) return notFound();

	const lang = determineLang();
	const isAr = lang === "ar";

	// Call the cached function again—it will reuse the result from generateMetadata
	const data = await getData(id, lang);
	// console.log("Trip Detail Data:", data);
	if (!data) notFound();

	// const loader = PATH_IMPORTS[Number(id)];
	// if (!loader) return notFound();

	// const getData = await loader(); // dynamically load the function
	// const data = getData(isAr);
	// if (!data) return notFound();

	///////////////
	// if (id == 45 || id == 49 || id == 47 ||  id == 73 || id == 74 || id == 100) {
	// 	const res = await fetch(
	// 		`${API_BASE_URL}/landing/home/packages/details?package_id=${id}`,
	// 		{
	// 			headers: { lang },
	// 			next: { revalidate: 300 },
	// 		}
	// 	);

	// 	if (!res.ok) notFound();
	// 	const pathData = await res.json();
	// 	if (!pathData) notFound();

	// 	// Merge API data into local data
	// 	data.locations = pathData.locations;
	// 	data.mapLocations = pathData.locations;
	// }

	// reuseable geo helper
  const { isSaudi } = await getIsSaudiFromHeaders(headers());

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			{/* Save promo_code (if present) to localStorage on client */}
			{data.id === 88 && <HaramPromoSaver />}
			<HeroWithInfo lang={lang} data={data} isSaudi={isSaudi} />
			<SummaryCard lang={lang} data={data} />
			{/* <HighlightsSection lang={lang} data={data} />
			<AboutSection lang={lang} data={data} />
			{data.consists > 0 && data.unconsists > 0 && (
				<InclusionsSection lang={lang} data={data} />
			)} */}
			<LazyTopSections lang={lang} data={data} />

			<LazyBottomSections lang={lang} data={data} />

			{/* {data.locations && <Destinations lang={lang} data={data} />}
			{data.tentatives && data.tentatives.length > 0 && (
				<TimelineSection lang={lang} data={data} />
			)} */}
			{/* 			
			{data.map_image && <MapSection lang={lang} data={data} />}
			{Array.isArray(data.assimply_points) &&
				data.assimply_points.length > 0 && (
					<MultipleMap lang={lang} data={data} />
				)} */}
		</div>
	);
}
