"use client";

import HeroSection from "@/components/all-trips/HeroSection";
import { FiltersBar } from "@/components/all-trips/FiltersBar";
// import { TripsGrid } from "@/components/all-trips/TripsGrid";
import { SeoContent } from "@/components/all-trips/SeoContent";
import LazyBottomSections from "@/components/all-trips/LazyBottomSections";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AllTripPageWrapper({ lang, data }) {
	const isAr = lang === "ar";
	const router = useRouter();
	const searchParams = useSearchParams();

	// Derive filters from current URL query (server-driven)
	const filters = useMemo(() => {
		const sp = searchParams;
		return {
			search_text: sp.get("search_text") || "",
			city_id: sp.get("city_id") ? Number(sp.get("city_id")) : null,
			type: sp.get("type") ? Number(sp.get("type")) : null,
			duration: sp.get("duration") || "", // e.g., "1-2"
			rating: sp.get("rating") ? Number(sp.get("rating")) : null,
			start_price: sp.get("start_price") ? Number(sp.get("start_price")) : null,
			seats: sp.get("seats") ? Number(sp.get("seats")) : 1,
		};
	}, [searchParams]);

	// Push new filters to the URL to trigger server re-fetch
	const onFiltersChange = (next) => {
		const params = new URLSearchParams();
		if (next.search_text) params.set("search_text", next.search_text);
		if (next.city_id) params.set("city_id", String(next.city_id));
		if (next.type) params.set("type", String(next.type));
		if (next.duration) params.set("duration", next.duration);
		if (next.rating != null) params.set("rating", String(next.rating));
		if (next.start_price != null)
			params.set("start_price", String(next.start_price));
		if (next.seats && next.seats !== 1) params.set("seats", String(next.seats));

		router.push(`?${params.toString()}`, { scroll: false });
	};

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<HeroSection lang={lang} totalResults={Array.isArray(data) ? data.length : 0} />
			<FiltersBar
				totalResults={Array.isArray(data) ? data.length : 0}
				lang={lang}
				filters={filters}
				onFiltersChange={onFiltersChange}
			/>
			<LazyBottomSections lang={lang} trips={Array.isArray(data) ? data : []} />
			{/* <TripsGrid
				lang={lang}
				trips={Array.isArray(data) ? data : []}
				
			/> */}
			<SeoContent lang={lang} />
		</div>
	);
}
