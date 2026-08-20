import { headers } from "next/headers";
import HeroSection from "@/components/new-home/HeroSection";
import MzarServicesSection from "@/components/new-home/MzarServicesSection";
import FeaturedToursSection from "@/components/new-home/FeaturedToursSection";
import AudioGuideSection from "@/components/new-home/AudioGuideSection";
import CustomerStoriesSection from "@/components/new-home/CustomerStoriesSection";
import HomeBlogInsightsSection from "@/components/new-home/HomeBlogInsightsSection";
import HomeFaqSection from "@/components/new-home/HomeFaqSection";
import SuccessPartnersSection from "@/components/new-home/SuccessPartnersSection";
import HomeAppBannerSection from "@/components/new-home/HomeAppBannerSection";
import HomeBottomCtaSection from "@/components/new-home/HomeBottomCtaSection";
import WhatsAppCampaignModal from "@/components/common/WhatsAppCampaignModal";

import { notFound } from "next/navigation";

import { API_BASE_URL_NEW, BLOG_URL } from "@/lib/apiConfig";
import { API_BETA_URL } from "@/lib/apiConfig";
import { getIsSaudiFromHeaders } from "@/lib/apiConfig";
import { getServerLocale } from "@/lib/localeServer";

export const revalidate = 300;

export default async function TourPage() {
	const requestHeaders = headers();
	const resolvedLocale = getServerLocale();
	const lang = resolvedLocale === "ar" ? "ar" : "en";

	// --- IP Geolocation Logic ---
	// reuseable geo helper
	const { isSaudi } = await getIsSaudiFromHeaders(requestHeaders);
	// --- End IP Geolocation Logic ---

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

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<HeroSection lang={lang} />
			<WhatsAppCampaignModal />
			<MzarServicesSection lang={lang} />
			<FeaturedToursSection lang={lang} topData={topData} isSaudi={isSaudi} />
			<AudioGuideSection lang={lang} />
			<CustomerStoriesSection lang={lang} />
			<HomeBlogInsightsSection lang={lang} initialBlogs={initialBlogs} />
			<HomeFaqSection lang={lang} />
			<SuccessPartnersSection lang={lang} />
			<HomeAppBannerSection lang={lang} />
			<HomeBottomCtaSection lang={lang} />
			
		</div>
	);
}
