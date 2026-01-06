"use client";

import { useState, useEffect, useRef } from "react";
import { ArticleHeader } from "./ArticleHeader";
import { sampleArticle } from "./sampleArticle";
import { FeaturedImage } from "./FeaturedImage";
import { ArticleContent } from "./ArticleContent";
import { InlineCTA } from "./InlineCTA";
// import { AuthorCard } from './AuthorCard';
import { ShareSave } from "./ShareSave";
import { RelatedArticles } from "./RelatedArticles";
import { RelatedTrips } from "./RelatedTrips";
import { Newsletter } from "./Newsletter";
import { FinalCTA } from "./FinalCTA";

import { format, parseISO } from "date-fns";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";

export default function SingleBlogWrapper({ lang, blog, BLOG_URL, slug }) {
	const isAr = lang === "ar";
	const incrementedRef = useRef(false);

	// increment views when blog data exists (client-side)
	useEffect(() => {
		if (incrementedRef.current) return;
		if (!blog?.slug || !BLOG_URL) return;
		incrementedRef.current = true;
		(async () => {
			try {
				await fetch(
					`${BLOG_URL.replace(/\/$/, "")}/api/blogs/${blog.slug}/view`,
					{
						method: "POST",
						headers: { lang },
					}
				);
			} catch (e) {
				// ignore
			}
		})();
	}, []);

	const firstHalfContent = sampleArticle.content.slice(0, 3);
	const secondHalfContent = sampleArticle.content.slice(3);

	const formattedDate = format(parseISO(blog.createdAt), "dd/MM/yyyy");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<ArticleHeader
				// category={blog.category}
				title={blog.title}
				subtitle={blog.subtitle}
				readTime={blog.readTime}
				publishDate={formattedDate}
				views={blog.views}
				isAr={isAr}
			/>
			<FeaturedImage
				image={blog.featuredImage}
				caption={blog.caption ? blog.caption : ""}
				BLOG_URL={BLOG_URL}
			/>
			{/* First half of content */}
			<ArticleContent
				content={blog.contentFirst}
				isAr={isAr}
				BLOG_URL={BLOG_URL}
			/>

			{/* Inline CTA after ~30% of content */}
			<InlineCTA isAr={isAr} />

			{/* Second half of content */}
			<ArticleContent
				content={blog.contentSecond}
				isAr={isAr}
				BLOG_URL={BLOG_URL}
			/>

			{/* <AuthorCard
        name={sampleArticle.author.name}
        avatar={sampleArticle.author.avatar}
        description={sampleArticle.author.description}
        isAr={isAr}
      /> */}

			<ShareSave isAr={isAr} />
			<RelatedArticles isAr={isAr} BLOG_URL={BLOG_URL} slug={slug} />
			<RelatedTrips
				isAr={isAr}
				blog={blog}
				API_BASE_URL_NEW={API_BASE_URL_NEW}
			/>
			{/* <Newsletter isAr={isAr} /> */}
			<FinalCTA isAr={isAr} />
		</div>
	);
}
