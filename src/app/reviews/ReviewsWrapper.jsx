"use client";

import {
	reviews,
	reviewsEn,
	ratingFilters,
} from "@/components/reviews/reviews";
import { useState, useCallback } from "react";

import { PageHeader } from "@/components/reviews/PageHeader";
import { ReviewsSummary } from "@/components/reviews/ReviewsSummary";
import { FilterBar } from "@/components/reviews/FilterBar";
// import { ReviewsList } from "@/components/reviews/ReviewsList";
// import { VisualProof } from "@/components/reviews/VisualProof";
// import { ConversionCTA } from "@/components/reviews/ConversionCTA";

import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import LazyLoader from "@/components/LazyLoader";

const ReviewsList = dynamic(
	() => import("@/components/reviews/ReviewsList"),
	{
		ssr: false,
		loading: () => <Loading />,
	}
);

const ConversionCTA = dynamic(
	() => import("@/components/reviews/ConversionCTA"),
	{
		ssr: false,
		loading: () => <Loading />,
	}
);

const VisualProof = dynamic(
	() => import("@/components/reviews/VisualProof"),
	{
		ssr: false,
		loading: () => <Loading />,
	}
);


export default function FaqWrapper({ lang }) {
	const isAr = lang === "ar";

	const [filters, setFilters] = useState({
		rating: "all",
		city: "all",
		tourType: "all",
		sortBy: "newest",
	});

	const handleFiltersChange = useCallback((newFilters) => {
		setFilters(newFilters);
	}, []);

	// Filter reviews based on selected filters
	const filteredReviews = (isAr ? reviews : reviewsEn).filter((review) => {
		// Rating filter
		if (filters.rating !== "all") {
			const ratingFilter = ratingFilters.find((f) => f.id === filters.rating);
			if (ratingFilter && review.rating < ratingFilter.minRating) {
				return false;
			}
		}

		// City filter
		if (filters.city !== "all") {
			const cityMap = {
				makkah: ["مكة المكرمة", "مكة", "makkah"],
				madinah: ["المدينة المنورة", "المدينة", "madinah"],
			};
			const cityNames = cityMap[filters.city] || [];
			if (!cityNames.some((name) => review.city.includes(name))) {
				return false;
			}
		}

		// Tour type filter (new)
		if (filters.tourType !== "all") {
			if ((review.tourType || "").toString() !== filters.tourType.toString()) {
				return false;
			}
		}

		return true;
	});

	// Sort reviews
	const sortedReviews = [...filteredReviews].sort((a, b) => {
		if (filters.sortBy === "newest") {
			// Simple date comparison (in real app, parse dates properly)
			return b.id.localeCompare(a.id);
		} else if (filters.sortBy === "highest") {
			return b.rating - a.rating;
		} else if (filters.sortBy === "helpful") {
			return b.helpfulCount - a.helpfulCount;
		}
		return 0;
	});

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<PageHeader isAr={isAr} />
			<ReviewsSummary isAr={isAr} />
			<FilterBar
				onFiltersChange={handleFiltersChange}
				totalResults={sortedReviews.length}
				isAr={isAr}
			/>
			<LazyLoader rootMargin="50px">
				<ReviewsList reviews={sortedReviews} isAr={isAr} />
				<VisualProof isAr={isAr} />
				<ConversionCTA isAr={isAr} />
			</LazyLoader>
		</div>
	);
}
