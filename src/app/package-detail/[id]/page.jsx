import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { API_BASE_URL_NEW } from "@/lib/apiConfig";

import { cache } from "react";

import { getIsSaudiFromHeaders } from "@/lib/apiConfig";
import { getServerLocale } from "@/lib/localeServer";

import PackageDetailContent from "@/components/package-detail/PackageDetailContent";
import { getPackageDetailMockData } from "@/components/package-detail/mockData";

// 2. Wrap the fetch function with cache()
const getData = cache(async (id, lang) => {
	// Remove the redundant 'cache: "no-store"' unless you explicitly
	// need to revalidate on every request (which would prevent caching/deduplication).
	// If you need revalidation, use 'next: { revalidate: N }' instead of 'no-store'
	const res = await fetch(
		`${API_BASE_URL_NEW}/landing/packages/show?package_id=${id}`,
		{
			headers: { lang },
		},
	);

	if (!res.ok) return null;
	const json = await res.json();
	return json?.data || null;
});

// Helper to determine language (keep this logic centralized)
function determineLang() {
	return getServerLocale();
}

// Add: use API data for page metadata
// export async function generateMetadata({ params }) {
// 	const { id } = params || {};
// 	if (!id) return {};
// 	const lang = determineLang();
// 	const data = await getData(id, lang);
// 	if (!data) return {};
// 	return {
// 		title: data.meta_title || "",
// 		description: data.meta_description || "",
// 	};
// }

export const revalidate = 300;

export default async function PackageDetailPage({ params }) {
	const { id } = params;
	if (!id) return notFound();

	const lang = determineLang();
	const isAr = lang === "ar";

	// Call the cached function again—it will reuse the result from generateMetadata
	// const data = await getData(id, lang);
	// console.log("Trip Detail Data:", data);
	// if (!data) notFound();

  const mockData = getPackageDetailMockData(isAr);
	// reuseable geo helper
	const { isSaudi } = await getIsSaudiFromHeaders(headers());

	return <div className={lang === "en" ? "ltr" : "rtl"}>
		 <PackageDetailContent isAr={isAr} data={mockData} />
	</div>;
}
