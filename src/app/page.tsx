import { headers } from "next/headers";
import HeroSection from "@/components/new-home/HeroSection";
import MzarServicesSection from "@/components/new-home/MzarServicesSection";
import FeaturedToursSection from "@/components/new-home/FeaturedToursSection";
import AudioGuideSection from "@/components/new-home/AudioGuideSection";
import CustomerStoriesSection from "@/components/new-home/CustomerStoriesSection";
import HomeBlogInsightsSection from "@/components/new-home/HomeBlogInsightsSection";
import HomeFaqSection from "@/components/new-home/HomeFaqSection";
import SuccessPartnersSection from "@/components/new-home/SuccessPartnersSection";
import DownloadAppSection from "@/components/new-home/DownloadAppSection";
import HomeBottomCtaSection from "@/components/new-home/HomeBottomCtaSection";
import WhatsAppCampaignModal from "@/components/common/WhatsAppCampaignModal";

import { notFound } from "next/navigation";
import { API_BASE_URL_NEW, BLOG_URL } from "@/lib/apiConfig";
import { getIsSaudiFromHeaders } from "@/lib/apiConfig";
import { getServerLocale } from "@/lib/localeServer";

export const revalidate = 300;

export async function generateMetadata() {
	const lang = getServerLocale();
	const isAr = lang === "ar";
	const siteUrl = "https://www.mzarapp.com";

	const title = isAr
		? "مزار | منصة الجولات الإثرائية وباقات العمرة والتنقل في الحرمين"
		: "Mzar | Heritage Tours, Umrah Packages & Holy Mosques Transportation";

	const description = isAr
		? "استكشف مكة المكرمة والمدينة المنورة عبر جولات الحرمين الإثرائية وباقات العمرة المتكاملة وخدمات الاستقبال والتنقل مع تطبيق ومرشدي مزار."
		: "Explore Makkah and Madinah with Mzar's enriching heritage tours, comprehensive Umrah packages, and premium airport transportation.";

	return {
		title,
		description,
		alternates: {
			canonical: `${siteUrl}/${lang}`,
			languages: {
				ar: `${siteUrl}/ar`,
				en: `${siteUrl}/en`,
			},
		},
		openGraph: {
			title,
			description,
			url: `${siteUrl}/${lang}`,
			siteName: isAr ? "مزار" : "Mzar",
			images: [
				{
					url: `${siteUrl}/share.png`,
					width: 1200,
					height: 630,
					alt: isAr ? "مزار - رحلتك إلى أعماق التاريخ والروحانية" : "Mzar - A Destination and Path",
				},
			],
			locale: isAr ? "ar_SA" : "en_US",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [`${siteUrl}/share.png`],
		},
	};
}

export default async function TourPage() {
	const requestHeaders = headers();
	const resolvedLocale = getServerLocale();
	const lang = resolvedLocale === "ar" ? "ar" : "en";
	const isAr = lang === "ar";

	// --- IP Geolocation Logic ---
	const { isSaudi } = await getIsSaudiFromHeaders(requestHeaders);

	const [toursRes, blogsRes] = await Promise.all([
		fetch(`${API_BASE_URL_NEW}/landing/home/top-packages`, {
			headers: { lang },
		}).catch(() => null),
		fetch(`${BLOG_URL}/api/blogs`, {
			headers: { lang },
		}).catch(() => null),
	]);

	if (!toursRes || !toursRes.ok) return null;
	const toursJson = await toursRes.json();
	const topData = toursJson?.data || null;

	if (!topData) notFound();

	const blogsJson = blogsRes?.ok ? await blogsRes.json().catch(() => null) : null;
	const initialBlogs = blogsJson?.data || null;

	// Structured Data (JSON-LD) Schemas
	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "مزار | Mzar",
		url: "https://www.mzarapp.com",
		logo: "https://www.mzarapp.com/Home/header-logo.png",
		description: isAr
			? "منصة سعودية رائدة للجولات الإثرائية وباقات العمرة المتكاملة وخدمات التنقل في مكة المكرمة والمدينة المنورة."
			: "Leading Saudi platform for heritage tours, comprehensive Umrah packages, and holy cities transportation in Makkah and Madinah.",
		contactPoint: {
			"@type": "ContactPoint",
			telephone: "+966920005785",
			contactType: "customer service",
			availableLanguage: ["Arabic", "English"],
		},
		sameAs: [
			"https://wa.me/966580121025",
			// "https://twitter.com/mzarapp",
			// "https://www.instagram.com/mzarapp",
		],
	};

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "مزار",
		alternateName: "MzarApp",
		url: "https://www.mzarapp.com",
	};

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: isAr ? "هل يمكن تخصيص الباقة أو الجولة؟" : "Can packages or tours be customized?",
				acceptedAnswer: {
					"@type": "Answer",
					text: isAr
						? "نعم، يمكن تعديل النقل والجولات وعدد الضيوف وبعض الخدمات الإضافية بحسب توفرها بالتواصل المباشر مع فريق الدعم."
						: "Yes, transportation, guided tours, group sizes, and optional add-ons can be customized based on availability by contacting our support team.",
				},
			},
			{
				"@type": "Question",
				name: isAr ? "ما هي سياسة الإلغاء والاسترجاع؟" : "What is the cancellation and refund policy?",
				acceptedAnswer: {
					"@type": "Answer",
					text: isAr
						? "تختلف حسب التجربة المختارة، وتظهر السياسة بوضوح كامل قبل تأكيد الحجز. معظم الجولات تتيح الإلغاء المجاني حتى 24 ساعة قبل الموعد."
						: "Cancellation policies vary by experience and are clearly displayed before booking. Most tours offer free cancellation up to 24 hours prior.",
				},
			},
			{
				"@type": "Question",
				name: isAr ? "هل المرشد الصوتي متاح بعدة لغات؟" : "Is the audio guide available in multiple languages?",
				acceptedAnswer: {
					"@type": "Answer",
					text: isAr
						? "نعم، يتوفر المحتوى بسبع لغات عالمية تشمل العربية، والإنجليزية، والفرنسية، والتركية، والأردية، والملايو، والروسية."
						: "Yes, our audio guide content is available in 7 global languages including Arabic, English, French, Turkish, Urdu, Malay, and Russian.",
				},
			},
			{
				"@type": "Question",
				name: isAr ? "كيف أحصل على تأكيد الحجز وتفاصيل النقطة؟" : "How do I receive my booking confirmation and meeting details?",
				acceptedAnswer: {
					"@type": "Answer",
					text: isAr
						? "يصلك التأكيد فورًا عبر البريد الإلكتروني ورسائل الواتساب، وتظهر جميع تفاصيل الرحلة ونقطة اللقاء داخل تطبيق مزار."
						: "You will receive an instant confirmation via email and WhatsApp, with complete meeting points and trip details stored directly in the Mzar app.",
				},
			},
		],
	};

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			{/* Structured Data JSON-LD */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>

			<HeroSection lang={lang} />
			<WhatsAppCampaignModal />
			<MzarServicesSection lang={lang} />
			<FeaturedToursSection lang={lang} topData={topData} isSaudi={isSaudi} />
			<AudioGuideSection lang={lang} />
			<CustomerStoriesSection lang={lang} />
			<HomeBlogInsightsSection lang={lang} initialBlogs={initialBlogs} />
			<HomeFaqSection lang={lang} />
			<SuccessPartnersSection lang={lang} />
			<DownloadAppSection lang={lang} />
			<HomeBottomCtaSection lang={lang} />
		</div>
	);
}
