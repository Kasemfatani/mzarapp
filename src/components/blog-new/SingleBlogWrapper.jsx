"use client";

import { useState } from "react";
import { ArticleHeader } from "./ArticleHeader";
import { sampleArticle } from './sampleArticle';
import { FeaturedImage } from './FeaturedImage';
import { ArticleContent } from './ArticleContent';
import { InlineCTA } from './InlineCTA';
// import { AuthorCard } from './AuthorCard';
import { ShareSave } from './ShareSave';
import { RelatedArticles } from './RelatedArticles';
import { RelatedTrips } from './RelatedTrips';
import { Newsletter } from './Newsletter';
import { FinalCTA } from './FinalCTA';

export default function SingleBlogWrapper({ lang }) {
	const isAr = lang === "ar";

	const firstHalfContent = sampleArticle.content.slice(0, 3);
  const secondHalfContent = sampleArticle.content.slice(3);



	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			  <ArticleHeader
        category={sampleArticle.category}
        title={sampleArticle.title}
        subtitle={sampleArticle.subtitle}
        readTime={sampleArticle.readTime}
        publishDate={sampleArticle.publishDate}
        views={sampleArticle.views}
        isAr={isAr}
      />
			<FeaturedImage
        image={sampleArticle.featuredImage}
        caption="المسجد الحرام في مكة المكرمة - قلب العالم الإسلامي"
      />
			{/* First half of content */}
      <ArticleContent content={firstHalfContent} isAr={isAr} />

			{/* Inline CTA after ~30% of content */}
      <InlineCTA isAr={isAr} />

			{/* Second half of content */}
      <ArticleContent content={secondHalfContent} />

			{/* <AuthorCard
        name={sampleArticle.author.name}
        avatar={sampleArticle.author.avatar}
        description={sampleArticle.author.description}
        isAr={isAr}
      /> */}

			<ShareSave isAr={isAr} />
			<RelatedArticles isAr={isAr} />
			<RelatedTrips isAr={isAr} />
			<Newsletter isAr={isAr} />
			<FinalCTA isAr={isAr} />

		</div>
	);
}
