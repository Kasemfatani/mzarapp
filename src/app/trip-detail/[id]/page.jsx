import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/apiConfig";

import { HeroWithInfo } from "@/components/trip-detail/HeroWithInfo";
import { SummaryCard } from "@/components/trip-detail/SummaryCard";

import LazyTopSections from "@/components/trip-detail/LazyTopSections";

import LazyBottomSections from "@/components/trip-detail/LazyBottomSections";

import { API_BASE_URL_NEW } from "@/lib/apiConfig";

import { cache } from "react";

import { getIsSaudiFromHeaders } from "@/lib/apiConfig";
import { getServerLocale } from "@/lib/localeServer";
import HaramPromoSaver from "@/components/common/HaramPromoSaver";
import WhatsAppBookingRedirect from "@/components/common/WhatsAppBookingRedirect";
import BusTripDetailPage from "@/components/trip-detail/bus/BusTripDetailPage";
import { getBusAdultGroup, getBusTripQuote } from "@/components/trip-detail/bus/busTripPricing";
import PrivateTourPage from "@/components/private-tour/PrivateTourPage";
import TripDetailJsonLd from "@/components/trip-detail/TripDetailJsonLd";
import HaramTripDetailPage from "@/components/trip-detail/haram/HaramTripDetailPage";
import { formatHaramDate, formatHaramTime, getHaramSchedule } from "@/components/trip-detail/haram/haramTripSchedule";
import { getHaramOfferPrices } from "@/components/trip-detail/haram/haramTripPricing";

// 2. Wrap the fetch function with cache()
const getData = cache(async (id, lang) => {
	// Remove the redundant 'cache: "no-store"' unless you explicitly
	// need to revalidate on every request (which would prevent caching/deduplication).
	// If you need revalidation, use 'next: { revalidate: N }' instead of 'no-store'
	const res = await fetch(
		`${API_BASE_URL_NEW}/landing/packages/show?package_id=${id}`,
		{
			headers: { lang },
		}
	);

	if (!res.ok) return null;
	const json = await res.json();
	return json?.data || null;
});

const getBusBookingData = cache(async (lang) => {
	try {
		const res = await fetch(
			`${API_BASE_URL_NEW}/landing/landing-bus-trip/booking-data?package_id=96`,
			{
				headers: { lang },
				signal: AbortSignal.timeout(8000),
				next: { revalidate: 300 },
			},
		);

		if (!res.ok) return null;
		const json = await res.json();
		return json?.status === true ? json?.data || null : null;
	} catch (error) {
		console.error("Failed to load bus trip booking data:", error);
		return null;
	}
});

const getHaramBookingData = cache(async (lang) => {
	try {
		const res = await fetch(
			`${API_BASE_URL_NEW}/landing/landing-guided-tour/booking-data?package_id=88`,
			{
				headers: { lang },
				signal: AbortSignal.timeout(8000),
				cache: "no-store",
			},
		);
		if (!res.ok) return null;
		const json = await res.json();
		return json?.status === true ? json?.data || null : null;
	} catch (error) {
		console.error("Failed to load Haram trip booking data:", error);
		return null;
	}
});

const getPrivateTourBookingData = cache(async (lang) => {
	try {
		const res = await fetch(
			`${API_BASE_URL_NEW}/landing/trip/booking-data?package_id=45`,
			{ headers: { lang }, cache: "no-store" },
		);
		if (!res.ok) return null;
		const json = await res.json();
		return json?.data || null;
	} catch (error) {
		console.error("Failed to load private tour booking data:", error);
		return null;
	}
});

// Helper to determine language (keep this logic centralized)
function determineLang() {
	return getServerLocale();
}

const SITE_ORIGIN = "https://www.mzarapp.com";
const TRIP_SHARE_ASSETS = {
	45: {
		image: "/private-tour/hero.jpg",
		width: 1200,
		height: 1200,
		alt: {
			ar: "معالم المشاعر المقدسة في مكة",
			en: "Sacred sites in Makkah",
		},
	},
	88: {
		image: "/trip-detail/88/haram.jpg",
		width: 600,
		height: 474,
		alt: {
			ar: "الكعبة المشرفة في المسجد الحرام",
			en: "The Holy Kaaba at Al-Masjid Al-Haram",
		},
	},
	96: {
		image: "/trip-detail/96/tour.jpg",
		width: 4898,
		height: 3265,
		alt: {
			ar: "حافلة مزار للجولات الإثرائية في مكة",
			en: "Mzar enrichment tour bus in Makkah",
		},
	},
};

function getAbsoluteShareImageUrl(imagePath) {
	const fallback = new URL("/share.png", SITE_ORIGIN).toString();
	if (typeof imagePath !== "string" || !imagePath.trim()) return fallback;

	try {
		const imageUrl = new URL(imagePath.trim(), SITE_ORIGIN);
		if (imageUrl.protocol !== "https:" && imageUrl.protocol !== "http:") {
			return fallback;
		}
		if (imageUrl.protocol === "http:") imageUrl.protocol = "https:";
		return imageUrl.toString();
	} catch {
		return fallback;
	}
}

function getTripDetailUrl(lang, id) {
	return new URL(`/${lang}/trip-detail/${encodeURIComponent(id)}`, SITE_ORIGIN).toString();
}

function getMetadataText(value) {
	return typeof value === "string" ? value.trim() : "";
}

function formatMetadataPrice(amountSAR, lang) {
	const amount = Number(amountSAR);
	if (!Number.isFinite(amount) || amount <= 0) return "";
	if (lang === "ar") {
		const amountText = new Intl.NumberFormat("ar-SA", { maximumFractionDigits: 0 }).format(amount);
		return `${amountText} ريالًا`;
	}
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount / 3.75);
}

function getBusMetadataDescription(busData, lang) {
	const adultGroup = getBusAdultGroup(busData?.group_age_prices || []);
	const personPrice = getBusTripQuote({
		adultUnitPrice: adultGroup?.price,
		taxRate: busData?.tax,
	}).unitGrossSAR;
	const priceText = formatMetadataPrice(personPrice, lang);

	return lang === "ar"
		? `اكتشف ١٠ معالم في مكة مع مزار وإرشاد سياحي صوتي بلغتك. انطلق من فندق أنجم مكة في الجولات الصباحية ٧ صباحًا أو المسائية ٤ عصرًا، واحجز بخطوة واحدة${priceText ? ` ابتداءً من ${priceText} للشخص` : ""}. الأطفال دون ١٢ سنة مجانًا، والدفع أونلاين أو نقدًا.`
		: `Explore 10 Makkah landmarks with Mzar and multilingual audio guidance. Depart from Anjum Hotel Makkah at 7 AM or 4 PM and book in one step${priceText ? `, from ${priceText} per paying adult` : ""}. Children under 12 are free; pay online or in cash.`;
}

function getHaramMetadataDescription(bookingData, lang, schedule) {
	const time = formatHaramTime(schedule?.time?.time || "20:30:00", lang, { longPeriod: true });
	const dateText = schedule ? formatHaramDate(schedule.date, lang) : "";
	const personPrice = getHaramOfferPrices({
		price: bookingData?.price,
		taxRate: bookingData?.tax,
	}).currentPrice;
	const priceText = formatMetadataPrice(personPrice, lang);

	return lang === "ar"
		? `اكتشف قصص الكعبة ومعالم المسجد الحرام مع مرشد معتمد. ${dateText ? `موعد الجولة القادمة ${dateText}، ` : ""}الساعة ${time} بتوقيت السعودية، لمدة 90 دقيقة${priceText ? `. ${priceText} للشخص شامل الضريبة` : ""}. احجز بثلاث بيانات فقط.`
		: `Discover the stories of the Kaaba and the Grand Mosque with a certified guide. ${dateText ? `Next tour: ${dateText} at ` : "Tours depart at "}${time} Saudi time (UTC+3), for 90 minutes${priceText ? `. ${priceText} per person, VAT included` : ""}. Book in three details.`;
}

function getHaramMetadataTitle(bookingData, lang) {
	const currentPrice = getHaramOfferPrices({
		price: bookingData?.price,
		taxRate: bookingData?.tax,
	}).currentPrice;
	const priceText = formatMetadataPrice(currentPrice, lang);
	if (lang === "ar") {
		const titlePrice = priceText ? priceText.replace(/ ريالًا$/, " ريال") : "";
		return `جولة معالم المسجد الحرام${titlePrice ? ` | عرض ${titlePrice}` : ""} | مزار`;
	}
	return `Grand Mosque Guided Tour${priceText ? ` | ${priceText} Special Offer` : ""} | Mzar`;
}

function getPrivateTourMetadataDescription(data, bookingData, lang) {
	const minGuests = Math.max(1, Number(data?.min_people_count) || 4);
	const priceText = formatMetadataPrice(
		bookingData?.price_per_person ?? data?.price_with_ticket,
		lang,
	);
	return lang === "ar"
		? `جولة خاصة لمدة ٤ ساعات في مكة، مع الاستقبال من مقر الإقامة، وإرشاد صوتي ونصي بست لغات، وتذكرة معرض الوحي لكل مشارك${priceText ? `. ابتداءً من ${priceText} للفرد` : ""}. الحد الأدنى ${new Intl.NumberFormat("ar-SA").format(minGuests)} أشخاص.`
		: `Private 4-hour Makkah tour with accommodation pickup, audio and text guidance in six languages, and a Revelation Exhibition ticket for every guest${priceText ? `. From ${priceText} per person` : ""}. Minimum ${minGuests} guests.`;
}

export async function generateMetadata({ params }) {
	const id = String(params?.id || "");
	if (!id) return {};
	const lang = determineLang();
	const isArabic = lang === "ar";
	let data = null;
	let title;
	let description;

	if (id === "96") {
		const busData = await getBusBookingData(lang);
		title = isArabic
			? "جولة معالم مكة بإرشاد سياحي صوتي بلغتك | مزار"
			: "Makkah Landmarks Tour with Multilingual Audio Guidance | Mzar";
		description = getBusMetadataDescription(busData, lang);
	} else if (id === "88") {
		const bookingData = await getHaramBookingData(lang);
		const schedule = getHaramSchedule(bookingData, new Date());
		title = getHaramMetadataTitle(bookingData, lang);
		description = getHaramMetadataDescription(bookingData, lang, schedule);
	} else {
		data = await getData(id, lang);
		if (!data) return {};
		if (id === "45") {
			const bookingData = await getPrivateTourBookingData(lang);
			title = isArabic
				? "جولة خاصة في المشاعر المقدسة ومعرض الوحي | مزار"
				: "Private Makkah Sacred Sites Tour & Revelation Exhibition | Mzar";
			description = getPrivateTourMetadataDescription(data, bookingData, lang);
		} else {
			title = getMetadataText(data.meta_title) || getMetadataText(data.name) || (isArabic ? "تجارب مزار السياحية" : "Mzar Experiences");
			description = getMetadataText(data.meta_description) || getMetadataText(data.short_description) || (
				isArabic
					? "اكتشف تجربة مزار واحجز جولتك في مكة المكرمة والمدينة المنورة."
					: "Discover a Mzar experience and book your tour in Makkah and Madinah."
			);
		}
	}

	const asset = TRIP_SHARE_ASSETS[id];
	const canonicalUrl = getTripDetailUrl(lang, id);
	const imageUrl = getAbsoluteShareImageUrl(asset?.image || data?.image);
	const imageAlt = asset?.alt?.[lang] || getMetadataText(data?.name) || title;
	const englishUrl = getTripDetailUrl("en", id);
	const arabicUrl = getTripDetailUrl("ar", id);

	return {
		title,
		description,
		alternates: {
			canonical: canonicalUrl,
			languages: {
				en: englishUrl,
				ar: arabicUrl,
			},
		},
		openGraph: {
			title,
			description,
			url: canonicalUrl,
			siteName: isArabic ? "تطبيق مزار" : "MzarApp",
			locale: isArabic ? "ar_SA" : "en_US",
			alternateLocale: isArabic ? "en_US" : "ar_SA",
			type: "website",
			images: [{
				url: imageUrl,
				alt: imageAlt,
				width: asset?.width,
				height: asset?.height,
			}],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [imageUrl],
		},
	};
}

export const revalidate = 300;

// const PATH_IMPORTS = {
// 	45: () => import("@/components/data/paths/mashair").then((m) => m.default),
// 	49: () =>
// 		import("@/components/data/history/revelation").then((m) => m.default),
// 	47: () => import("@/components/data/paths/tuwa").then((m) => m.default),
// 	73: () => import("@/components/data/paths/quba").then((m) => m.default),
// 	74: () => import("@/components/data/paths/uhud").then((m) => m.default),
// 	8: () => import("@/components/data/tour/haram").then((m) => m.default),
// 	9: () => import("@/components/data/tour/madinah").then((m) => m.default),
// 	10: () => import("@/components/data/tour/bus").then((m) => m.default),
// 	11: () => import("@/components/data/tour/show").then((m) => m.default),
// 	6: () => import("@/components/data/tour/fullMakkah").then((m) => m.default),
// 	7: () => import("@/components/data/tour/fullMadinnah").then((m) => m.default),
// 	// Add more: 12: () => import("@/components/data/paths/another").then(m => m.default),
// };

export default async function TourPage({ params }) {
	const { id } = params;
	if (!id) return notFound();

	const lang = determineLang();
	const isAr = lang === "ar";

	if (id === "88") {
		const [{ countryCode }, bookingData] = await Promise.all([
			getIsSaudiFromHeaders(headers()),
			getHaramBookingData(lang),
		]);
		const initialSchedule = getHaramSchedule(bookingData, new Date());
		const tripTitle = getHaramMetadataTitle(bookingData, lang);
		return (
			<>
				<TripDetailJsonLd
					id="88"
					lang={lang}
					url={getTripDetailUrl(lang, id)}
					name={tripTitle}
					description={getHaramMetadataDescription(bookingData, lang, initialSchedule)}
					imageUrl={getAbsoluteShareImageUrl(TRIP_SHARE_ASSETS["88"].image)}
					bookingData={bookingData}
					schedule={initialSchedule}
				/>
				<div className={isAr ? "rtl" : "ltr"}>
					<HaramPromoSaver />
					<HaramTripDetailPage
						lang={lang}
						bookingData={bookingData}
						initialSchedule={initialSchedule}
						countryCode={countryCode || "SA"}
					/>
				</div>
			</>
		);
	}

	if (id === "96") {
		const [{ isSaudi, countryCode }, busData] = await Promise.all([
			getIsSaudiFromHeaders(headers()),
			getBusBookingData(lang),
		]);
		const tripTitle = isAr
			? "جولة معالم مكة بإرشاد سياحي صوتي بلغتك | مزار"
			: "Makkah Landmarks Tour with Multilingual Audio Guidance | Mzar";

		return (
			<>
				<TripDetailJsonLd
					id="96"
					lang={lang}
					url={getTripDetailUrl(lang, id)}
					name={tripTitle}
					description={getBusMetadataDescription(busData, lang)}
					imageUrl={getAbsoluteShareImageUrl(TRIP_SHARE_ASSETS["96"].image)}
					busData={busData}
				/>
				<div className={isAr ? "rtl" : "ltr"}>
					<BusTripDetailPage
						lang={lang}
						busData={busData}
						isSaudi={isSaudi}
						countryCode={countryCode || "SA"}
					/>
				</div>
			</>
		);
	}

	// Call the cached function again—it will reuse the result from generateMetadata
	const data = await getData(id, lang);
	// console.log("Trip Detail Data:", data);
	if (!data) notFound();

	if (String(id) === "45") {
		const privateBookingData = await getPrivateTourBookingData(lang);
		const tripTitle = isAr
			? "جولة خاصة في المشاعر المقدسة ومعرض الوحي | مزار"
			: "Private Makkah Sacred Sites Tour & Revelation Exhibition | Mzar";
		return (
			<>
				<TripDetailJsonLd
					id="45"
					lang={lang}
					url={getTripDetailUrl(lang, id)}
					name={tripTitle}
					description={getPrivateTourMetadataDescription(data, privateBookingData, lang)}
					imageUrl={getAbsoluteShareImageUrl(TRIP_SHARE_ASSETS["45"].image)}
					tripData={data}
					bookingData={privateBookingData}
				/>
				<PrivateTourPage
					lang={lang}
					trip={data}
					bookingData={privateBookingData}
				/>
			</>
		);
	}

	// const loader = PATH_IMPORTS[Number(id)];
	// if (!loader) return notFound();

	// const getData = await loader(); // dynamically load the function
	// const data = getData(isAr);
	// if (!data) return notFound();

	///////////////
	// if (id == 45 || id == 49 || id == 47 ||  id == 73 || id == 74 || id == 100) {
	// 	const res = await fetch(
	// 		`${API_BASE_URL}/landing/home/packages/details?package_id=${id}`,
	// 		{
	// 			headers: { lang },
	// 			next: { revalidate: 300 },
	// 		}
	// 	);

	// 	if (!res.ok) notFound();
	// 	const pathData = await res.json();
	// 	if (!pathData) notFound();

	// 	// Merge API data into local data
	// 	data.locations = pathData.locations;
	// 	data.mapLocations = pathData.locations;
	// }

	// reuseable geo helper
  const { isSaudi } = await getIsSaudiFromHeaders(headers());

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			{/* Save promo_code (if present) to localStorage on client */}
			{data.id === 88 && <HaramPromoSaver />}
			{/* <WhatsAppBookingRedirect /> */}
			<HeroWithInfo lang={lang} data={data} isSaudi={isSaudi} />
			<SummaryCard lang={lang} data={data} />
			{/* <HighlightsSection lang={lang} data={data} />
			<AboutSection lang={lang} data={data} />
			{data.consists > 0 && data.unconsists > 0 && (
				<InclusionsSection lang={lang} data={data} />
			)} */}
			<LazyTopSections lang={lang} data={data} />

			<LazyBottomSections lang={lang} data={data} />

			{/* {data.locations && <Destinations lang={lang} data={data} />}
			{data.tentatives && data.tentatives.length > 0 && (
				<TimelineSection lang={lang} data={data} />
			)} */}
			{/* 			
			{data.map_image && <MapSection lang={lang} data={data} />}
			{Array.isArray(data.assimply_points) &&
				data.assimply_points.length > 0 && (
					<MultipleMap lang={lang} data={data} />
				)} */}
		</div>
	);
}
