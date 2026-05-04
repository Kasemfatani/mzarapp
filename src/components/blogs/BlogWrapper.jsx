"use client";

import { useState } from "react";
import { Hero } from "./Hero";
import { FeaturedArticles } from "./FeaturedArticles";
import { CategoriesFilter } from "./CategoriesFilter";
import { ArticlesGrid } from "./ArticlesGrid";
import { ConversionBanner } from "./ConversionBanner";
import { TrendingArticles } from "./TrendingArticles";
// import { Newsletter } from './Newsletter';
import { FinalCTA } from "./FinalCTA";

export default function BlogWrapper({ lang, blogsData, BLOG_URL }) {
	const isAr = lang === "ar";

	console.log("Blogs  in BlogWrapper:", blogsData.blogs);

	const [activeCategory, setActiveCategory] = useState("all");

	const filteredArticles = (blogsData.blogs || []).filter((blog) => {
		if (activeCategory === "all") return true;
		// activeCategory may be number or string; compare as string
		return (blog.tags || []).some(
			(t) => String(t.id) === String(activeCategory)
		);
	});

	// top 4 blogs by views
	const trendingArticles = [...(blogsData.blogs || [])]
		.sort((a, b) => (b.views || 0) - (a.views || 0))
		.slice(0, 4);

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero isAr={isAr} />
			<FeaturedArticles
				isAr={isAr}
				articles={blogsData.featured}
				BLOG_URL={BLOG_URL}
			/>
			<CategoriesFilter
				activeCategory={activeCategory}
				onCategoryChange={setActiveCategory}
				isAr={isAr}
				tags={blogsData.tags || []}
			/>
			<ArticlesGrid
				articles={filteredArticles}
				isAr={isAr}
				BLOG_URL={BLOG_URL}
			/>
			<ConversionBanner isAr={isAr} />
			<TrendingArticles isAr={isAr} articles={trendingArticles} />
			{/* <Newsletter isAr={isAr} /> */}
			<FinalCTA isAr={isAr} />
		</div>
	);
}
