"use client";

import { reviews, ratingFilters } from "@/components/reviews/reviews";
import { useState, useCallback } from 'react';


import { PageHeader } from "@/components/reviews/PageHeader";
import { ReviewsSummary } from "@/components/reviews/ReviewsSummary";
import { FilterBar } from "@/components/reviews/FilterBar";
import { ReviewsList } from "@/components/reviews/ReviewsList";
import { VisualProof } from "@/components/reviews/VisualProof";
import { ConversionCTA } from "@/components/reviews/ConversionCTA";

export default function FaqWrapper({ lang }) {
	const isAr = lang === "ar";

	const [filters, setFilters] = useState({
    rating: 'all',
    city: 'all',
    tourType: 'all',
    sortBy: 'newest',
  });

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Filter reviews based on selected filters
  const filteredReviews = reviews.filter((review) => {
    // Rating filter
    if (filters.rating !== 'all') {
      const ratingFilter = ratingFilters.find((f) => f.id === filters.rating);
      if (ratingFilter && review.rating < ratingFilter.minRating) {
        return false;
      }
    }

    // City filter
    if (filters.city !== 'all') {
      const cityMap = {
        makkah: ['مكة المكرمة', 'مكة'],
        madinah: ['المدينة المنورة', 'المدينة'],
        taif: ['الطائف'],
      };
      const cityNames = cityMap[filters.city] || [];
      if (!cityNames.some((name) => review.city.includes(name))) {
        return false;
      }
    }

    return true;
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (filters.sortBy === 'newest') {
      // Simple date comparison (in real app, parse dates properly)
      return b.id.localeCompare(a.id);
    } else if (filters.sortBy === 'highest') {
      return b.rating - a.rating;
    } else if (filters.sortBy === 'helpful') {
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
			<ReviewsList reviews={sortedReviews} isAr={isAr} />
			<VisualProof isAr={isAr} />
			<ConversionCTA isAr={isAr} />
		</div>
	);
}
