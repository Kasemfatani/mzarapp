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

// 2. Wrap the fetch function with cache()
const getData = cache(async (lang) => {
	// Remove the redundant 'cache: "no-store"' unless you explicitly
	// need to revalidate on every request (which would prevent caching/deduplication).
	// If you need revalidation, use 'next: { revalidate: N }' instead of 'no-store'
	const res = await fetch(
		`${API_BASE_URL_NEW}/landing/packages/show?package_id=45`,
		{
			headers: { lang },
		},
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
export async function generateMetadata() {
	const lang = determineLang();
	const data = await getData(lang);
	if (!data) return {};
	return {
		title: data.meta_title || "",
		description: data.meta_description || "",
		robots: {
			index: false,
			follow: false,
			googleBot: {
				index: false,
				follow: false,
			},
		},
	};
}

export const revalidate = 300;

export default async function TourPage() {
	const lang = determineLang();
	const isAr = lang === "ar";

	// Call the cached function again—it will reuse the result from generateMetadata
	const data = await getData(lang);
	// console.log("Trip Detail Data:", data);
	if (!data) notFound();

	// reuseable geo helper
	const { isSaudi } = await getIsSaudiFromHeaders(headers());

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
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
