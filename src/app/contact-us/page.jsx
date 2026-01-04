import { cookies, headers } from "next/headers";
// import { notFound } from "next/navigation";
// import { API_BASE_URL } from "@/lib/apiConfig";

import { Hero } from "@/components/contact-us/Hero";
import { ContactOptions } from "@/components/contact-us/ContactOptions";
import ContactFormWithCaptcha from "@/components/contact-us/ContactFormWithCaptcha";
import { CompanyInfo } from "@/components/contact-us/CompanyInfo";
import { Map } from "@/components/contact-us/Map";
import { FAQShortcut } from "@/components/contact-us/FAQShortcut";
import { FinalCTA } from "@/components/contact-us/FinalCTA";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";

import { cache } from "react";

const getData = cache(async (lang) => {
	const res = await fetch(`${API_BASE_URL_NEW}/landing/inquiry-types`, {
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
			title: "اتصل بنا",
		};
	}
	return {
		title: "Contact Us",
	};
}

export default async function ContactUsPage() {
	const lang = determineLang();
	const isAr = lang === "ar";

	const data = await getData(lang);
	// console.log("Trip Detail Data:", data);
	// if (!data) data = null;

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero isAr={isAr} />
			<ContactOptions isAr={isAr} />
			<ContactFormWithCaptcha isAr={isAr} InquiryType={data} />
			<CompanyInfo isAr={isAr} />
			<Map isAr={isAr} />
			<FAQShortcut isAr={isAr} />
			<FinalCTA isAr={isAr} />
		</div>
	);
}
