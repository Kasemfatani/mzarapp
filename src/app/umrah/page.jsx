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

export function generateMetadata() {
	return {
		title: "Umrah | Mzar",
		description:
			"Plan your Umrah trip with Mzar. Find the best packages, hotels, and services for a seamless pilgrimage experience.",
	};
}

export default async function UmrahPage() {
	return (
		<div className="bg-[#FAF8F2]">
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
		</div>
	);
}
