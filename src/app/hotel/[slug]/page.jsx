import { cookies, headers } from "next/headers";
import Hero from "@/components/hotel/Hero";
import Trips from "@/components/hotel/Trips";
import LazyTopSections from "@/components/hotel/LazyTopSections";
import LazyBottomSections from "@/components/hotel/LazyBottomSections";
import { notFound } from "next/navigation";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";

export const revalidate = 300;

export default async function HotelPage({ params }) {
	const { slug } = params;

	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	// Fetch partner by slug
	const res = await fetch(
		`${API_BASE_URL_NEW}/landing/partners/show?partner_slug=${encodeURIComponent(
			slug
		)}`,
		{
			headers: { lang },
			next: { revalidate: 300 },
		}
	);

	if (!res.ok) notFound();

	const json = await res.json();
	if (!json?.status || !json?.data) notFound();

	const partner = json.data;

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero initialLang={lang} partner_id={partner.id} hotelLogoSrc={partner.logo} promo_code={partner.promo_code}/>
			<Trips />
			<LazyTopSections
				lang={lang}
				audio={partner.audios}
				hotelName={partner.name}
				promo_code={partner.promo_code}
				hotelLogoSrc={partner.logo}
			/>
			<LazyBottomSections lang={lang} hotelLogoSrc={partner.logo}/>
		</div>
	);
}
