import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
// import { API_BASE_URL } from "@/lib/apiConfig";
import SingleBlogWrapper from "@/components/blog-new/SingleBlogWrapper";

import { BLOG_URL } from "@/lib/apiConfig";

import { cache } from "react";

import { getIsSaudiFromHeaders } from "@/lib/apiConfig";

const getData = cache(async (lang, slug) => {
	const res = await fetch(`${BLOG_URL}/api/blogs/${slug}`, {
		headers: { lang },
	});

	if (!res.ok) return null;
	const json = await res.json();
	// Laravel Resource responses are wrapped in `data`
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

export async function generateMetadata({ params }) {
	const lang = determineLang();
	const slug = params?.slug;
	if (!slug) return { title: "Blog" };

	const data = await getData(lang, slug);
	if (!data) return { title: "Blog" };

	const SITE_URL = ("https://www.mzarapp.com").replace(
		/\/$/,
		""
	);
	const title = data.title || "Blog";
	const description = data.subtitle || "";
	const canonical = `${SITE_URL}/blog/${slug}`;
	const image = data.featuredImage
		? `${BLOG_URL.replace(/\/$/, "")}${data.featuredImage}`
		: undefined;

	return {
		title,
		description,
		alternates: { canonical },
		openGraph: {
			title,
			description,
			url: canonical,
			images: image ? [{ url: image }] : [],
		},
	};
}

export default async function Page({ params }) {
	const { slug } = params;

	const lang = determineLang();

	const blogsData = await getData(lang, slug);

	if (!blogsData) {
		notFound();
	}

	// reuseable geo helper
	const { isSaudi } = await getIsSaudiFromHeaders(headers());

	// prepare JSON-LD (build BlogPosting + BreadcrumbList here, merge with existing schema from backend (FAQPage etc.))
	const userSchema = Array.isArray(blogsData?.schemaMarkup)
		? blogsData.schemaMarkup
		: [];

	// Build BlogPosting
	const blogPosting = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: blogsData.title || "",
		image: BLOG_URL + blogsData.featuredImage || null,
		publisher: {
			"@type": "Organization",
			name: "Mzar",
			logo: {
				"@type": "ImageObject",
				url: "https://www.mzarapp.com/Home/header-logo.png",
			},
		},
		datePublished: blogsData.createdAt || null,
	};

	// Build BreadcrumbList (position 3 points to this blog)
	const breadcrumb = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: "https://www.mzarapp.com",
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Blogs",
				item: "https://www.mzarapp.com/blogs",
			},
			{
				"@type": "ListItem",
				position: 3,
				name: blogsData.title || "Blog",
				item: `https://www.mzarapp.com/blog/${slug}`,
			},
		],
	};

	// Keep only non-BlogPosting/BreadcrumbList entries from backend (e.g. FAQPage)
	const preserved = userSchema.filter((s) => {
		const t = s && s["@type"] ? s["@type"] : null;
		return t !== "BlogPosting" && t !== "BreadcrumbList";
	});

	const finalSchema = [blogPosting, breadcrumb, ...preserved];
	const jsonLdString = finalSchema.length ? JSON.stringify(finalSchema) : null;
	// console.log("JSON-LD for blog:", jsonLdString);

	return (
		<>
			{jsonLdString ? (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: jsonLdString }}
				/>
			) : null}
			<SingleBlogWrapper
				lang={lang}
				blog={blogsData}
				BLOG_URL={BLOG_URL}
				slug={slug}
				isSaudi={isSaudi}
			/>
		</>
	);
}
