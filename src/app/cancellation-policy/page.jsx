import { cookies, headers } from "next/headers";
// import { notFound } from "next/navigation";
// import { API_BASE_URL } from "@/lib/apiConfig";

import { Hero } from "@/components/cancellation-policy/Hero";
import { QuickSummary } from "@/components/cancellation-policy/QuickSummary";
// import { DetailedPolicy } from "@/components/cancellation-policy/DetailedPolicy";
// import { HowToCancel } from "@/components/cancellation-policy/HowToCancel";
// import { SupportCTA } from "@/components/cancellation-policy/SupportCTA";

import LazyBottomSections from "@/components/cancellation-policy/LazyBottomSections";

// import { API_BASE_URL_NEW } from "@/lib/apiConfig";

// import { cache } from "react";



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
			title: "سياسة الإلغاء",
			
		};
	}
	return {
		title: "Cancellation Policy",
		
	};
}

export default async function CancellationPolicyPage() {
	

	const lang = determineLang();

	const isAr = lang === "ar";


	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero isAr={isAr} />
			<QuickSummary isAr={isAr} />
			<LazyBottomSections isAr={isAr} />
			{/* <DetailedPolicy isAr={isAr} />
			<HowToCancel isAr={isAr} />
			<SupportCTA isAr={isAr} /> */}
			
		</div>
	);
}
