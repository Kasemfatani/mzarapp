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

export default function SingleBlogWrapper({
	lang,
	blog,
	BLOG_URL,
	slug,
	isSaudi = true,
}) {
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

	// --- Generate TOC from heading2 blocks and attach ids to content blocks ---
	const slugify = (s) =>
		String(s || "")
			.toLowerCase()
			.replace(/[^\w\s-]/g, "")
			.trim()
			.replace(/\s+/g, "-");

	const first = Array.isArray(blog.contentFirst) ? blog.contentFirst : [];
	const second = Array.isArray(blog.contentSecond) ? blog.contentSecond : [];

	// collect heading2 texts in order and generate unique ids
	const seen = new Map();
	const tocItems = [];
	let headingCounter = 0;

	const attachIds = (arr) =>
		arr.map((block) => {
			if (block?.type === "heading2") {
				headingCounter += 1;
				const base = slugify(block.content) || `heading-${headingCounter}`;
				const count = seen.get(base) || 0;
				seen.set(base, count + 1);
				const id = count === 0 ? base : `${base}-${count + 1}`;
				tocItems.push({
					id,
					label: block.content,
					number: tocItems.length + 1,
				});
				return { ...block, id };
			}
			return block;
		});

	const contentFirst = attachIds(first);
	const contentSecond = attachIds(second);
	// --- end TOC generation ---

	const formattedDate = format(parseISO(blog.createdAt), "dd/MM/yyyy");

	return (
		<article className={lang === "en" ? "ltr" : "rtl"}>
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
				isAr={isAr}
				tocItems={tocItems} // pass generated TOC
			/>
			{/* First half of content */}
			<ArticleContent content={contentFirst} isAr={isAr} BLOG_URL={BLOG_URL} />

			{/* Inline CTA after ~30% of content */}
			<InlineCTA isAr={isAr} />

			{/* Second half of content */}
			<ArticleContent content={contentSecond} isAr={isAr} BLOG_URL={BLOG_URL} />

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
				isSaudi={isSaudi}
			/>
			{/* <Newsletter isAr={isAr} /> */}
			<FinalCTA isAr={isAr} />
		</article>
	);
}
