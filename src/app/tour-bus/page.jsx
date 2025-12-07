import { cookies, headers } from "next/headers";
import Hero from "@/components/tour-bus/Hero";
import WhatTour from "@/components/tour-bus/WhatTour";
// import BusStops from "@/components/tour-bus/BusStops";
// import PackagePrice from "@/components/tour-bus/PackagePrice";
// import StepsSection from "@/components/tour-bus/StepsSection";
// import ComparisonTable from "@/components/tour-bus/ComparisonTable";
// import Testimonials from "@/components/tour-bus/Testimonials";
// import FAQ from "@/components/tour-bus/FAQ";
// import Confirmed from "@/components/tour-bus/Confirmed";
import LazyTopBusSections from "@/components/tour-bus/LazyTopBusSections";
import LazyBottomBusSections from "@/components/tour-bus/LazyBottomBusSections";
import Script from "next/script"; // ADD

export const revalidate = 300;

export function generateMetadata() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	if (lang === "ar") {
		return {
			title: "حافلة الجولات الإثرائية في مكة المكرمة | مزار",
			description:
				"انضم إلى حافلة مزار الإثرائية في رحلة عبر معالم مكة التاريخية ، استمع إلى القصص بلغتك وشاهدها تنبض بالحياة من خلال الواقع المعزز ودليلنا الصوتي الذكي",
		};
	}
	return {
		title: "Enriching Bus Tours in Makkah | Mzar",
		description:
			"Join the Mzar Enrichment Bus for a historical journey through Makkah’s historic landmarks. Hear the stories in your language and watch them come alive through AR and our smart audio guide",
	};
}

export default function TourPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	// Structured Data (JSON-LD)
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "TouristTrip",
		name:
			lang === "ar"
				? "حافلة الجولات الإثرائية في مكة المكرمة"
				: "Enriching Bus Tours in Makkah",
		description:
			lang === "ar"
				? "انضم إلى حافلة مزار الإثرائية في رحلة عبر معالم مكة التاريخية. استمع إلى القصص بلغتك وشاهدها تنبض بالحياة من خلال الواقع المعزز ودليلنا الصوتي الذكي."
				: "Join the Mzar Enrichment Bus for a historical journey through Makkah’s historic landmarks. Hear the stories in your language and watch them come alive through AR and our smart audio guide.",
		image: [
			"https://mzarapp.com/tour-bus/hero-bg.webp",
			"https://mzarapp.com/tour-bus/bus-tour.webp",
			"https://mzarapp.com/tour-bus/map-en.webp",
			"https://mzarapp.com/tour-bus/map-ar.webp",
		],
		touristType: lang === "ar" ? "زائر" : "Visitor",
		itinerary: {
			"@type": "ItemList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: lang === "ar" ? "بئر طوى" : "Tuwa Well",
				},
				{
					"@type": "ListItem",
					position: 2,
					name: lang === "ar" ? "مسجد الجن" : "Al-Jinn Mosque",
				},
				{
					"@type": "ListItem",
					position: 3,
					name: lang === "ar" ? "القصور الملكية" : "Royal Palaces",
				},
				{
					"@type": "ListItem",
					position: 4,
					name: lang === "ar" ? "مسجد البيعة" : "Bay’ah Mosque",
				},
				{
					"@type": "ListItem",
					position: 5,
					name: lang === "ar" ? "جبل الرحمة" : "Jabal Al-Rahmah",
				},
				{
					"@type": "ListItem",
					position: 6,
					name: lang === "ar" ? "حي حراء الثقافي" : "Hira Cultural District",
				},
			],
		},
		offers: {
			"@type": "Offer",
			price: "69",
			priceCurrency: "SAR",
			availability: "https://schema.org/InStock",
			url: "https://mzarapp.com/book-tour", // booking URL
			validFrom: new Date().toISOString(),
			// Optional: cancellation policy
			// "hasMerchantReturnPolicy": {
			//   "@type": "MerchantReturnPolicy",
			//   "refundType": "https://schema.org/ExchangeRefund"
			// }
		},
		provider: {
			"@type": "Organization",
			name: "MZAR",
			url: "https://mzarapp.com",
			logo: "https://mzarapp.com/Home/header-logo.png",
		},
		duration: "PT5H", // 5 hours
		areaServed: {
			"@type": "City",
			name: lang === "ar" ? "مكة المكرمة" : "Makkah",
			address: {
				"@type": "PostalAddress",
				addressCountry: "SA",
				addressRegion: "Makkah",
			},
		},
		potentialAction: {
			"@type": "ReserveAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: "https://mzarapp.com/book-tour",
				actionPlatform: [
					"http://schema.org/DesktopWebPlatform",
					"http://schema.org/MobileWebPlatform",
				],
			},
			result: {
				"@type": "Reservation",
				name: lang === "ar" ? "احجز جولتك الآن" : "Book your tour now",
			},
		},
	};

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			{/* JSON-LD for Google Rich Results */}
			<script
				id="schema-tour-bus" // ADD ID
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<Hero initialLang={lang} />
			<WhatTour initialLang={lang} />
			<LazyTopBusSections initialLang={lang} />
			<LazyBottomBusSections initialLang={lang} />
		</div>
	);
}
