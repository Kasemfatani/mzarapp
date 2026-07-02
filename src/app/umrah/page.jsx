import UmrahHero from "@/components/umrah/UmrahHero";
import UmrahTrustSection from "@/components/umrah/UmrahTrustSection";
import UmrahWhyChooseSection from "@/components/umrah/UmrahWhyChooseSection";

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
		</div>
	);
}
