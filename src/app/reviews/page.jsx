import { cookies, headers } from "next/headers";
// import { notFound } from "next/navigation";
// import { API_BASE_URL } from "@/lib/apiConfig";
import ReviewsWrapper from "./ReviewsWrapper";

// import { API_BASE_URL_NEW } from "@/lib/apiConfig";

// import { cache } from "react";

import { getServerLocale } from "@/lib/localeServer";

// Helper to determine language (keep this logic centralized)
function determineLang() {
	return getServerLocale();
}

export function generateMetadata() {
	
	const lang = determineLang();

	if (lang === "ar") {
		return {
			title: "المراجعات | مزار",
			
		};
	}
	return {
		title: "Reviews | Mzar",
		
	};
}

export default async function ReviewsPage() {
	

	const lang = determineLang();


	return (
		<ReviewsWrapper lang={lang} />
	);
}
