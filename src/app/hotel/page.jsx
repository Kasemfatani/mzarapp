import { cookies, headers } from "next/headers";
import Hero from "@/components/hotel/Hero";
import Trips from "@/components/hotel/Trips";
import TopSection from "@/components/hotel/TopSection";
import PartnerSection from "@/components/hotel/PartnerSection";
import KnowledgeBanner from "@/components/hotel/KnowledgeBanner";
import WhyMzarSection from "@/components/hotel/WhyMzarSection";
import HiraSection from "@/components/hotel/HiraSection";
import HotelFooter from "@/components/hotel/HotelFooter";
import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/apiConfig";


export const revalidate = 300;

export default async function HotelPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	const res = await fetch(
			`${API_BASE_URL}/landing/home/packages/details?package_id=45`,
			{
				headers: { lang },
				next: { revalidate: 300 },
			}
		);
	
		if (!res.ok) notFound();
		const data = await res.json();
		if (!data) notFound();

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero initialLang={lang} />
			<Trips />
			<TopSection lang={lang} audio={data.short_audio}/>
			<PartnerSection lang={lang} hotelName="HHH" />
			<KnowledgeBanner lang={lang} />
			<WhyMzarSection lang={lang} />
			<HiraSection lang={lang} />
			<HotelFooter lang={lang} />
			
		</div>
	);
}
