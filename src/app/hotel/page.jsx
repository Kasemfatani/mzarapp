import { cookies, headers } from "next/headers";
import Hero from "@/components/hotel/Hero";
import Trips from "@/components/hotel/Trips";
import TopSection from "@/components/hotel/TopSection";
import PartnerSection from "@/components/hotel/PartnerSection";
import KnowledgeBanner from "@/components/hotel/KnowledgeBanner";
import WhyMzarSection from "@/components/hotel/WhyMzarSection";
import HiraSection from "@/components/hotel/HiraSection";
import HotelFooter from "@/components/hotel/HotelFooter";



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
			<KnowledgeBanner lang={lang} />
			<WhyMzarSection lang={lang} />
			<HiraSection lang={lang} />
			<HotelFooter lang={lang} />
			
		</div>
	);
}
