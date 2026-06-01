import { cookies, headers } from "next/headers";
// import { notFound } from "next/navigation";
// import { API_BASE_URL } from "@/lib/apiConfig";

import { Hero } from "@/components/privacy-policy/Hero";
import { WhatWeCollect } from "@/components/privacy-policy/WhatWeCollect";
// import { HowWeUseData } from "@/components/privacy-policy/HowWeUseData";
// import { DataSecurity } from "@/components/privacy-policy/DataSecurity";
// import { UserRights } from "@/components/privacy-policy/UserRights";
import LazyBottomSections from "@/components/privacy-policy/LazyBottomSections";
import { getServerLocale } from "@/lib/localeServer";
// import { ContactCTA } from "@/components/privacy-policy/ContactCTA";

// import { API_BASE_URL_NEW } from "@/lib/apiConfig";

// import { cache } from "react";



// Helper to determine language (keep this logic centralized)
function determineLang() {
	return getServerLocale();
}

export function generateMetadata() {
	
	const lang = determineLang();

	if (lang === "ar") {
		return {
			title: "سياسة الخصوصية | مزار",
			
		};
	}
	return {
		title: "Privacy Policy | Mzar",
		
	};
}

export default async function PrivacyPolicyPage() {
	

	const lang = determineLang();

	const isAr = lang === "ar";


	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero isAr={isAr} />
			<WhatWeCollect isAr={isAr} />
			{/* <HowWeUseData isAr={isAr} /> */}
			<LazyBottomSections isAr={isAr} />
			{/* <DataSecurity isAr={isAr} />
			<UserRights isAr={isAr} /> */}
			{/* <ContactCTA isAr={isAr} /> */}
		</div>
	);
}
