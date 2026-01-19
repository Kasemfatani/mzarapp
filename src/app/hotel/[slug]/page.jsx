import { cookies, headers } from "next/headers";
// import Trips from "@/components/hotel/Trips";
import LazyTopSections from "@/components/hotel/LazyTopSections";
import { notFound } from "next/navigation";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import HotelClientShell from "@/components/hotel/HotelClientShell";
import FeaturedToursSection from "@/components/new-home/FeaturedToursSection";
import HotelWrapper from "@/components/hotel/HotelWrapper";
import { cache } from "react";


export const revalidate = 300;

const getData = cache(async (lang) => {
	
	const res = await fetch(
		`${API_BASE_URL_NEW}/landing/home/top-packages`,
		{
			headers: { lang },
		}
	);

	if (!res.ok) return null;
	const json = await res.json();
	return json?.data || null;
});

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

	// Fetch top packages data
	// const topPackagesData = await getData(lang);
	



	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>

			<HotelWrapper lang={lang} partner={partner} />
			{/* <HotelClientShell lang={lang} partner={partner}>
				<FeaturedToursSection lang={lang} topData={topPackagesData} />
				<LazyTopSections
					lang={lang}
					audio={partner.audios}
					hotelName={partner.name}
					promo_code={partner.promo_code}
					hotelLogoSrc={partner.logo2}
				/>
			</HotelClientShell> */}
		</div>
	);
}
