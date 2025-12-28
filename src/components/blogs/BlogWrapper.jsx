"use client";

import { useState } from "react";
import { Hero } from "./Hero";
import { articles } from './articles';

import { FeaturedArticles } from './FeaturedArticles';
import { CategoriesFilter } from './CategoriesFilter';
import { ArticlesGrid } from './ArticlesGrid';
import { ConversionBanner } from './ConversionBanner';
import { TrendingArticles } from './TrendingArticles';
// import { Newsletter } from './Newsletter';
import { FinalCTA } from './FinalCTA';

export default function BlogWrapper({ lang }) {
	const isAr = lang === "ar";

	const [activeCategory, setActiveCategory] = useState("all");

	const filteredArticles = articles.filter((article) => {
		if (activeCategory === "all") return true;
		const categoryMap = {
			"mecca-history": "تاريخ مكة",
			"medina-history": "تاريخ المدينة",
			haramain: "الحرمين",
			"umrah-hajj": "العمرة والحج",
			"islamic-landmarks": "معالم إسلامية",
			"visitor-tips": "نصائح الزائر",
			"mzar-experiences": "تجارب مزار",
		};
		return article.category === categoryMap[activeCategory];
	});

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero isAr={isAr} />
			<FeaturedArticles isAr={isAr} articles={articles} />
			<CategoriesFilter 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
				isAr={isAr}
      />
			<ArticlesGrid articles={filteredArticles} isAr={isAr} />
			<ConversionBanner isAr={isAr} />
			<TrendingArticles isAr={isAr} />
			{/* <Newsletter isAr={isAr} /> */}
			<FinalCTA isAr={isAr} />
		</div>
	);
}
