import UmrahHero from "@/components/umrah/UmrahHero";
import UmrahTrustSection from "@/components/umrah/UmrahTrustSection";
import UmrahWhyChooseSection from "@/components/umrah/UmrahWhyChooseSection";
import UmrahHolyMosquesSection from "@/components/umrah/UmrahHolyMosquesSection";
import UmrahWatchJourneySection from "@/components/umrah/UmrahWatchJourneySection";
import UmrahFeaturedExperiencesSection from "@/components/umrah/UmrahFeaturedExperiencesSection";
import UmrahPackagesSection from "@/components/umrah/UmrahPackagesSection";
import UmrahPackagesComparisonSection from "@/components/umrah/UmrahPackagesComparisonSection";
import UmrahHotelsSection from "@/components/umrah/UmrahHotelsSection";
import UmrahTestimonialsSection from "@/components/umrah/UmrahTestimonialsSection";
import UmrahFaqSection from "@/components/umrah/UmrahFaqSection";
import UmrahFinalCtaSection from "@/components/umrah/UmrahFinalCtaSection";
import UmrahFooterSection from "@/components/umrah/UmrahFooterSection";
import UmrahSectionReveal from "@/components/umrah/UmrahSectionReveal";
import WhatsAppCampaignModal from "@/components/common/WhatsAppCampaignModal";
import { Cormorant_Garamond, DM_Sans, Noto_Naskh_Arabic } from "next/font/google";

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	variable: "--umrah-font-body",
	display: "swap",
});

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	style: ["normal", "italic"],
	variable: "--umrah-font-heading",
	display: "swap",
});

const notoNaskh = Noto_Naskh_Arabic({
	subsets: ["arabic"],
	weight: ["400", "600"],
	variable: "--umrah-font-arabic",
	display: "swap",
});

export function generateMetadata() {
	return {
		title: "Umrah | Mzar",
		description:
			"Plan your Umrah trip with Mzar. Find the best packages, hotels, and services for a seamless pilgrimage experience.",
	};
}

export default async function UmrahPage() {
	return (
		<div
			className={`${dmSans.variable} ${cormorant.variable} ${notoNaskh.variable} umrah-font-scope bg-[#FAF8F2]`}
		>
			<UmrahHero />
			<UmrahTrustSection />
			<UmrahWhyChooseSection />
			<UmrahHolyMosquesSection />
			<UmrahWatchJourneySection />
			<UmrahFeaturedExperiencesSection />
			<UmrahPackagesSection />
			<UmrahPackagesComparisonSection />
			<UmrahHotelsSection />
			<UmrahTestimonialsSection />
			<UmrahFaqSection />
			<UmrahFinalCtaSection />
			<UmrahFooterSection />
			<WhatsAppCampaignModal />
		</div>
	);
}
