import HeroSection from "./HeroSection";
import DescriptionSection from "./DescriptionSection";
import IncludedExperiences from "./IncludedExperiences";
import JourneyTimeline from "./JourneyTimeline";
import AccommodationsSection from "./AccommodationsSection";
import WhatsIncludedGrid from "./WhatsIncludedGrid";
import DesktopBookingSidebar from "./DesktopBookingSidebar";
import MobileBookingBar from "./MobileBookingBar";
import StickyDebugProbe from "./StickyDebugProbe";
import StickyViewportFix from "./StickyViewportFix";

export default function PackageDetailContent({ isAr, data }) {
	return (
		<main className="mx-auto max-w-7xl px-4 pb-28 pt-6 md:px-6 md:pb-8 lg:px-8">
			<StickyViewportFix />
			<HeroSection isAr={isAr} data={data} />

			<div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
				<div className="space-y-10 lg:col-span-8">
					<DescriptionSection isAr={isAr} data={data} />
					<IncludedExperiences isAr={isAr} data={data} />
					<JourneyTimeline isAr={isAr} data={data} />
					<AccommodationsSection isAr={isAr} data={data} />
					<WhatsIncludedGrid isAr={isAr} data={data} />
				</div>

				<div className="lg:col-span-4">
					<DesktopBookingSidebar isAr={isAr} data={data} />
				</div>
			</div>

			<MobileBookingBar isAr={isAr} data={data} />
			{/* <StickyDebugProbe /> */}
		</main>
	);
}
