import { cookies, headers } from "next/headers";
// import { notFound } from "next/navigation";
// import { API_BASE_URL } from "@/lib/apiConfig";

import { Hero } from "@/components/about-us/Hero";
import { OurStory } from "@/components/about-us/OurStory";
import { MissionVision } from "@/components/about-us/MissionVision";
import { WhyMazah } from "@/components/about-us/WhyMazah";
import { Stats } from "@/components/about-us/Stats";
import { Values } from "@/components/about-us/Values";
import { TrustCompliance } from "@/components/about-us/TrustCompliance";
import { CTA } from "@/components/about-us/CTA";

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
			title: "من نحن",
			
		};
	}
	return {
		title: "about us",
		
	};
}

export default async function TourPage() {
	

	const lang = determineLang();


	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero lang={lang} />
			<OurStory lang={lang} />
			<MissionVision lang={lang} />
			<WhyMazah lang={lang} />
			<Stats lang={lang} />
			<Values lang={lang} />
			<TrustCompliance lang={lang} />
			<CTA lang={lang} />
		</div>
	);
}
