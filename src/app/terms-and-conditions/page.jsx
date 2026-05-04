import { cookies, headers } from "next/headers";
// import { notFound } from "next/navigation";
// import { API_BASE_URL } from "@/lib/apiConfig";

import { Hero } from "@/components/terms-and-conditions/Hero";
import { PlatformRole } from "@/components/terms-and-conditions/PlatformRole";
// import { UserResponsibilities } from "@/components/terms-and-conditions/UserResponsibilities";
// import { BookingsPayments } from "@/components/terms-and-conditions/BookingsPayments";
// import { LimitationLiability } from "@/components/terms-and-conditions/LimitationLiability";
// import { Updates } from "@/components/terms-and-conditions/Updates";
// import { FinalCTA } from "@/components/terms-and-conditions/FinalCTA";
import LazyBottomSections from "@/components/terms-and-conditions/LazyBottomSections";
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
			title: "الشروط والأحكام",
			
		};
	}
	return {
		title: "Terms and Conditions",
		
	};
}

export default async function TermsAndConditionsPage() {
	

	const lang = determineLang();

	const isAr = lang === "ar";


	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero isAr={isAr} />
			<PlatformRole isAr={isAr} />
			<LazyBottomSections isAr={isAr} />
			{/* <UserResponsibilities isAr={isAr} />
			<BookingsPayments isAr={isAr} />
			<LimitationLiability isAr={isAr} /> */}
			{/* <Updates isAr={isAr} /> */}
			{/* <FinalCTA isAr={isAr} /> */}
			
			
		</div>
	);
}
