import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
// import { API_BASE_URL } from "@/lib/apiConfig";
import SingleBlogWrapper from "@/components/blog-new/SingleBlogWrapper";

import { BLOG_URL } from "@/lib/apiConfig";

import { cache } from "react";

const getData = cache(async (lang, slug) => {
	const res = await fetch(`${BLOG_URL}/api/blogs/${slug}`, {
		headers: { lang },
	});

	if (!res.ok) return null;
	const json = await res.json();
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

export function generateMetadata() {
	const lang = determineLang();

	if (lang === "ar") {
		return {
			title: "مقال",
		};
	}
	return {
		title: "Blog",
	};
}

export default async function Page({ params }) {
	const { slug } = params;

	const lang = determineLang();

	const blogsData = await getData(lang, slug);

	if (!blogsData) {
		notFound();
	}

	return (
		<SingleBlogWrapper
			lang={lang}
			blog={blogsData}
			BLOG_URL={BLOG_URL}
			slug={slug}
		/>
	);
}
