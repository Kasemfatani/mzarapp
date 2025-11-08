import { cookies, headers } from "next/headers";
import Hero from "@/components/hotel/Hero";
import Trips from "@/components/hotel/Trips";
import TopSection from "@/components/hotel/TopSection";
import PartnerSection from "@/components/hotel/PartnerSection";
// import TourStory from "@/components/haram/TourStory";
// import LazyHaramSections from "@/components/haram/LazyHaramSections";
// import LazyPreviewSection from "@/components/haram/LazyPreviewSection";
// import LazyTestimonials from "@/components/haram/LazyTestimonials";

export const revalidate = 300;

export default function HotelPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero initialLang={lang} />
			<Trips />
			<TopSection lang={lang} />
			<PartnerSection lang={lang} hotelName="HHH" />
			{/* <TourStory initialLang={lang} />
			<LazyHaramSections initialLang={lang} />
			<LazyPreviewSection initialLang={lang} />
			<LazyTestimonials initialLang={lang} /> */}
		</div>
	);
}
