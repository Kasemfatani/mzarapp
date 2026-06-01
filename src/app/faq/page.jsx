import { cookies, headers } from "next/headers";
// import { notFound } from "next/navigation";
// import { API_BASE_URL } from "@/lib/apiConfig";
import FaqWrapper from "./FaqWrapper";

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
			title: "الأسئلة الشائعة | مزار",
			
		};
	}
	return {
		title: "FAQ | Mzar",
		
	};
}

export default async function TourPage() {
	

	const lang = determineLang();


	return (
		<FaqWrapper lang={lang} />
	);
}
