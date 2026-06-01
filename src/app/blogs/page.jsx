import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
// import { API_BASE_URL } from "@/lib/apiConfig";
import BlogWrapper from "@/components/blogs/BlogWrapper";

import { BLOG_URL } from "@/lib/apiConfig";

import { cache } from "react";

import { getServerLocale } from "@/lib/localeServer";


const getData = cache(async (lang) => {
	
	const res = await fetch(
		`${BLOG_URL}/api/blogs`,
		{
			headers: { lang },
		}
	);

	if (!res.ok) return null;
	const json = await res.json();
	return json?.data || null;
});


// Helper to determine language (keep this logic centralized)
function determineLang() {
	return getServerLocale();
}

export function generateMetadata() {
	
	const lang = determineLang();

	if (lang === "ar") {
		return {
			title: "مقالات | مزار",
			
		};
	}
	return {
		title: "Blogs | Mzar",
		
	};
}

export default async function Page() {
	

	const lang = determineLang();

	const blogsData = await getData(lang);

	if (!blogsData) {
		notFound();
	} 


	return (
		<BlogWrapper lang={lang} blogsData={blogsData} BLOG_URL={BLOG_URL} />
	);
}
