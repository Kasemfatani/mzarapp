import { getServerLocale } from "@/lib/localeServer";
import NationalDayBooking from "@/components/national-day/NationalDayBooking";
import NationalDayCountdown from "@/components/national-day/NationalDayCountdown";
import NationalDayDetails from "@/components/national-day/NationalDayDetails";
import NationalDayFacts from "@/components/national-day/NationalDayFacts";
import NationalDayFaq from "@/components/national-day/NationalDayFaq";
import NationalDayFinalCta from "@/components/national-day/NationalDayFinalCta";
import NationalDayHero from "@/components/national-day/NationalDayHero";
import NationalDayStations from "@/components/national-day/NationalDayStations";
import NationalDayStory from "@/components/national-day/NationalDayStory";
import NationalDayVideo from "@/components/national-day/NationalDayVideo";
import pageStyles from "@/components/national-day/NationalDayPage.module.css";
import {
	getNationalDayContent,
	NATIONAL_DAY_TARGET,
	NATIONAL_DAY_VIDEO_ID,
} from "@/components/national-day/nationalDayContent";
import { NATIONAL_DAY_PRICE_SAR } from "@/lib/nationalDayBookingConstants";

const SITE_URL = "https://www.mzarapp.com";

export async function generateMetadata() {
	const lang = getServerLocale() === "ar" ? "ar" : "en";
	const isAr = lang === "ar";

	const title = isAr
		? "عرض خاص | جولة المسجد الحرام — مزار"
		: "Special Offer | Grand Mosque Tour — Mzar";
	const description = isAr
		? `عِش تجربة إثرائية داخل المسجد الحرام لمدة 90 دقيقة، بسعر خاص ${NATIONAL_DAY_PRICE_SAR} ريالًا للشخص.`
		: `Experience a 90-minute enriching tour inside the Grand Mosque at a special price of SAR ${NATIONAL_DAY_PRICE_SAR} per person.`;

	return {
		title,
		description,
		alternates: {
			canonical: `${SITE_URL}/${lang}/special-day`,
			languages: {
				ar: `${SITE_URL}/ar/special-day`,
				en: `${SITE_URL}/en/special-day`,
			},
		},
		openGraph: {
			title,
			description,
			url: `${SITE_URL}/${lang}/special-day`,
			siteName: isAr ? "تطبيق مزار" : "MzarApp",
			locale: isAr ? "ar_SA" : "en_US",
			type: "website",
			images: [
				{
					url: `${SITE_URL}/new-home/sanctuaries.webp`,
					width: 1600,
					height: 900,
					alt: isAr
						? "جولة إثرائية داخل المسجد الحرام"
						: "An enriching tour inside the Grand Mosque",
				},
			],
		},
	};
}

export default function SpecialDayPage() {
	const lang = getServerLocale() === "ar" ? "ar" : "en";
	const isAr = lang === "ar";
	const content = getNationalDayContent(isAr);

	return (
		<div
			className={`${pageStyles.page} ${isAr ? pageStyles.rtl : pageStyles.ltr}`}
			lang={lang}
			dir={isAr ? "rtl" : "ltr"}
		>
			<main>
				<NationalDayHero content={content} />
				<NationalDayFacts content={content} />
				<NationalDayStory content={content} />
				{/* The station section intentionally comes before the general details section. */}
				<NationalDayStations content={content} />
				<NationalDayDetails content={content} />
				<NationalDayVideo content={content} videoId={NATIONAL_DAY_VIDEO_ID} />
				<NationalDayCountdown content={content} targetDate={NATIONAL_DAY_TARGET} />
				<NationalDayFaq content={content} />
				<NationalDayBooking content={content} lang={lang} />
				{/* <NationalDayFinalCta content={content} /> */}
			</main>
		</div>
	);
}
