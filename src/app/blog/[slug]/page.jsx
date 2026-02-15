import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import SingleBlogWrapper from "@/components/blog-new/SingleBlogWrapper";
import { BLOG_URL, getIsSaudiFromHeaders } from "@/lib/apiConfig";
import { cache } from "react";
import SyncLangFromSlug from "@/components/blog-new/SyncLangFromSlug";

const getData = cache(async (lang, slug) => {
	const res = await fetch(`${BLOG_URL}/api/blogs/${slug}`, {
		headers: { lang },
		// TEMP: bypass any Next/edge cache while debugging
		cache: "no-store",
	});
	if (!res.ok) return null;
	const json = await res.json();
	return json?.data || null;
});

// Helper: detect language from slug (Arabic chars => "ar", else "en")
function getLangFromSlug(slug) {
	const decoded = decodeURIComponent(slug || "");
	const hasArabic = /[\u0600-\u06FF]/.test(decoded);
	return hasArabic ? "ar" : "en";
}

export async function generateMetadata({ params }) {
	const slug = params?.slug;
	if (!slug) return { title: "Blog" };

	const lang = getLangFromSlug(slug);
	const data = await getData(lang, slug);
	if (!data) return { title: "Blog" };

	const SITE_URL = "https://www.mzarapp.com".replace(/\/$/, "");
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
	const lang = getLangFromSlug(slug); // "ar" or "en"

	// Fetch blog data using this lang
	const blogsData = await getData(lang, slug);
	if (!blogsData) {
		notFound();
	}

	const { isSaudi } = await getIsSaudiFromHeaders(headers());

	const userSchema = Array.isArray(blogsData?.schemaMarkup)
		? blogsData.schemaMarkup
		: [];

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

	const preserved = userSchema.filter((s) => {
		const t = s && s["@type"] ? s["@type"] : null;
		return t !== "BlogPosting" && t !== "BreadcrumbList";
	});

	const finalSchema = [blogPosting, breadcrumb, ...preserved];
	const jsonLdString = finalSchema.length ? JSON.stringify(finalSchema) : null;

	return (
		<>
			{/*  Sync lang to localStorage / <html> on the client */}
			<SyncLangFromSlug lang={lang} />

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
