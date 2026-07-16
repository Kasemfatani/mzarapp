import UmrahHero from "@/components/saira/UmrahHero";
import UmrahTrustSection from "@/components/saira/UmrahTrustSection";
import UmrahSairaEndorsement from "@/components/saira/UmrahSairaEndorsement";
import UmrahWhyChooseSection from "@/components/saira/UmrahWhyChooseSection";
import UmrahHolyMosquesSection from "@/components/saira/UmrahHolyMosquesSection";
import UmrahWatchJourneySection from "@/components/saira/UmrahWatchJourneySection";
import UmrahFeaturedExperiencesSection from "@/components/saira/UmrahFeaturedExperiencesSection";
import UmrahPackagesSection from "@/components/saira/UmrahPackagesSection";
import UmrahPackagesComparisonSection from "@/components/saira/UmrahPackagesComparisonSection";
import UmrahHotelsSection from "@/components/saira/UmrahHotelsSection";
import UmrahTestimonialsSection from "@/components/saira/UmrahTestimonialsSection";
import UmrahFaqSection from "@/components/saira/UmrahFaqSection";
import UmrahFinalCtaSection from "@/components/saira/UmrahFinalCtaSection";
import UmrahFooterSection from "@/components/saira/UmrahFooterSection";
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
			<UmrahSairaEndorsement />
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
