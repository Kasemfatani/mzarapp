import { busTripCopy, busTripStops } from "./bus/busTripContent";
import { getBusAdultGroup, getBusTripQuote } from "./bus/busTripPricing";
import { haramTripCopy } from "./haram/haramTripContent";
import { getHaramTripFaqItems } from "./haram/haramTripFaqData";
import { getHaramOfferPrices } from "./haram/haramTripPricing";
import { getPrivateTourFaqItems } from "../private-tour/privateTourFaqData";
import { content as privateTourContent } from "../private-tour/reference-content";

const SITE_ORIGIN = "https://www.mzarapp.com";
const ORGANIZATION_ID = `${SITE_ORIGIN}#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}#website`;

function getItinerary(id, lang) {
	if (id === "88") {
		return haramTripCopy[lang].route.map(([, name, description]) => ({ name, description }));
	}
	if (id === "96") {
		return busTripStops.map((stop) => ({ name: stop[lang] }));
	}
	return privateTourContent[lang].route.map(([name, description], index, route) => ({
		name,
		description,
		itemType: index === 0 || index === route.length - 1 ? "Place" : "TouristAttraction",
	}));
}

function getFaqItems({ id, lang, bookingData, schedule, tripData }) {
	if (id === "88") return getHaramTripFaqItems({ lang, bookingData, schedule });
	if (id === "96") {
		return busTripCopy[lang].faqs
			.filter(({ answer }) => !/^(view|عرض) .*(policy|سياسة)/i.test(answer.trim()))
			.map(({ question, answer }) => [question, answer]);
	}
	const minGuests = Number(tripData?.min_people_count) || 4;
	const maxGuests = Number(tripData?.max_people_count) || 7;
	const price = Number(bookingData?.price_per_person ?? tripData?.price_with_ticket) || 0;
	return getPrivateTourFaqItems({ lang, minGuests, maxGuests, price });
}

function getOffer({ id, lang, bookingData, busData, tripData, url }) {
	let priceSAR = 0;
	let description;
	let minGuests;
	let maxGuests;

	if (id === "88") {
		priceSAR = getHaramOfferPrices({
			price: bookingData?.price,
			taxRate: bookingData?.tax,
		}).currentPrice;
		description = lang === "ar"
			? "السعر للشخص شامل ضريبة القيمة المضافة. الدفع أونلاين دون رسوم إضافية، أو نقدًا مع رسوم ٥ ريالات مرة واحدة على الحجز."
			: "Per-person price includes VAT. Online payment has no additional fee; cash adds SAR 5 once per booking.";
		minGuests = Number(bookingData?.min_people_count);
		maxGuests = Number(bookingData?.max_people_count);
	} else if (id === "96") {
		const adultGroup = getBusAdultGroup(busData?.group_age_prices || []);
		priceSAR = getBusTripQuote({
			adultUnitPrice: adultGroup?.price,
			taxRate: busData?.tax,
		}).unitGrossSAR;
		description = lang === "ar"
			? "السعر للبالغ شامل ضريبة القيمة المضافة. الأطفال دون ١٢ سنة مجانًا. الدفع أونلاين دون رسوم إضافية، أو نقدًا مع رسوم ٥ ريالات مرة واحدة على الحجز."
			: "Price per paying adult includes VAT. Children under 12 are free. Online payment has no additional fee; cash adds SAR 5 once per booking.";
	} else {
		priceSAR = Number(bookingData?.price_per_person ?? tripData?.price_with_ticket) || 0;
		minGuests = Number(tripData?.min_people_count) || 4;
		maxGuests = Number(tripData?.max_people_count) || 7;
		description = lang === "ar"
			? `السعر للفرد شامل الضريبة وتذكرة معرض الوحي. الحد الأدنى للحجز ${new Intl.NumberFormat("ar-SA").format(minGuests)} أشخاص، والدفع النقدي يضيف ٥ ريالات مرة واحدة على الحجز.`
			: `Price per guest includes VAT and a Revelation Exhibition ticket. Minimum ${minGuests} guests; cash adds SAR 5 once per booking.`;
	}

	if (!Number.isFinite(priceSAR) || priceSAR <= 0) return undefined;

	const offer = {
		"@type": "Offer",
		url: `${url}#booking`,
		price: Number(priceSAR.toFixed(2)),
		priceCurrency: "SAR",
		description,
		seller: { "@id": ORGANIZATION_ID },
		priceSpecification: {
			"@type": "UnitPriceSpecification",
			price: Number(priceSAR.toFixed(2)),
			priceCurrency: "SAR",
			unitText: lang === "ar" ? "شخص" : "person",
			valueAddedTaxIncluded: true,
		},
	};

	if (Number.isFinite(minGuests) && minGuests > 0) {
		offer.eligibleQuantity = {
			"@type": "QuantitativeValue",
			minValue: minGuests,
			...(Number.isFinite(maxGuests) && maxGuests >= minGuests ? { maxValue: maxGuests } : {}),
			unitText: lang === "ar" ? "شخص" : "people",
		};
	}

	return offer;
}

function getBreadcrumbList({ id, lang, url }) {
	if (id === "45") return undefined;
	const labels = id === "88"
		? haramTripCopy[lang].breadcrumb
		: busTripCopy[lang].breadcrumb;
	const urls = [
		`${SITE_ORIGIN}/${lang}/`,
		`${SITE_ORIGIN}/${lang}/all-trips`,
		url,
	];

	return {
		"@type": "BreadcrumbList",
		"@id": `${url}#breadcrumb`,
		itemListElement: labels.map((name, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name,
			item: urls[index],
		})),
	};
}

export function buildTripDetailStructuredData({
	id,
	lang,
	url,
	name,
	description,
	imageUrl,
	tripData,
	bookingData,
	busData,
	schedule,
}) {
	const itinerary = getItinerary(id, lang);
	const tourId = `${url}#tour`;
	const webPageId = `${url}#webpage`;
	const faqItems = getFaqItems({ id, lang, bookingData, schedule, tripData });
	const offer = getOffer({ id, lang, bookingData, busData, tripData, url });
	const graph = [
		{
			"@type": "WebPage",
			"@id": webPageId,
			url,
			name,
			description,
			inLanguage: lang,
			isPartOf: { "@id": WEBSITE_ID },
			about: { "@id": tourId },
			primaryImageOfPage: { "@type": "ImageObject", url: imageUrl },
		},
		{
			"@type": "TouristTrip",
			"@id": tourId,
			url,
			name: id === "88"
				? (lang === "ar" ? "جولة معالم المسجد الحرام" : "Grand Mosque Guided Tour")
				: id === "96"
					? (lang === "ar" ? "جولة معالم مكة" : "Makkah Landmarks Tour")
					: (lang === "ar" ? "جولة خاصة في المشاعر المقدسة ومعرض الوحي" : "Private Makkah Sacred Sites Tour & Revelation Exhibition"),
			description,
			inLanguage: lang,
			image: imageUrl,
			provider: { "@id": ORGANIZATION_ID },
			mainEntityOfPage: { "@id": webPageId },
			touristType: id === "88"
				? (lang === "ar" ? "زوار المسجد الحرام" : "Visitors to Al-Masjid Al-Haram")
				: id === "96"
					? (lang === "ar" ? "السياحة الثقافية" : "Cultural tourism")
					: (lang === "ar" ? "مجموعات خاصة من ٤ أشخاص فأكثر" : "Private groups of four or more"),
			tripOrigin: {
				"@type": "Place",
				name: id === "88"
					? (lang === "ar" ? "بوابة الملك عبدالله، المسجد الحرام" : "King Abdullah Gate, Al-Masjid Al-Haram")
					: id === "96"
						? (lang === "ar" ? "فندق أنجم مكة" : "Anjum Hotel Makkah")
						: (lang === "ar" ? "مقر الإقامة المتفق عليه في مكة" : "Agreed accommodation in Makkah"),
			},
			itinerary: {
				"@type": "ItemList",
				itemListElement: itinerary.map(({ name: stopName, description: stopDescription, itemType }, index) => ({
					"@type": "ListItem",
					position: index + 1,
					name: stopName,
					...(stopDescription ? { description: stopDescription } : {}),
					item: { "@type": itemType || "TouristAttraction", name: stopName },
				})),
			},
			...(offer ? { offers: offer } : {}),
		},
		{
			"@type": "FAQPage",
			"@id": `${url}#faq`,
			url: `${url}#faq`,
			inLanguage: lang,
			mainEntity: faqItems.map(([question, answer]) => ({
				"@type": "Question",
				name: question,
				acceptedAnswer: { "@type": "Answer", text: answer },
			})),
		},
	];

	const breadcrumb = getBreadcrumbList({ id, lang, url });
	if (breadcrumb) graph.push(breadcrumb);

	return { "@context": "https://schema.org", "@graph": graph };
}

export function serializeTripDetailStructuredData(value) {
	return JSON.stringify(value).replace(/</g, "\\u003c");
}
