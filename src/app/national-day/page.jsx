import { getServerLocale } from "@/lib/localeServer";
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

const SITE_URL = "https://www.mzarapp.com";

export async function generateMetadata() {
	const lang = getServerLocale() === "ar" ? "ar" : "en";
	const isAr = lang === "ar";

	const title = isAr
		? "عرض اليوم الوطني | جولة المسجد الحرام — مزار"
		: "Saudi National Day Offer | Grand Mosque Tour — Mzar";
	const description = isAr
		? "عِش تجربة إثرائية داخل المسجد الحرام لمدة 90 دقيقة بمناسبة اليوم الوطني السعودي، بسعر خاص 96 ريالًا للشخص."
		: "Experience a 90-minute enriching tour inside the Grand Mosque for Saudi National Day at a special price of SAR 96 per person.";

	return {
		title,
		description,
		alternates: {
			canonical: `${SITE_URL}/${lang}/national-day`,
			languages: {
				ar: `${SITE_URL}/ar/national-day`,
				en: `${SITE_URL}/en/national-day`,
			},
		},
		openGraph: {
			title,
			description,
			url: `${SITE_URL}/${lang}/national-day`,
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

export default function NationalDayPage() {
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
				{/* Booking is planned for a later implementation; the existing #booking links remain. */}
				<NationalDayFinalCta content={content} />
			</main>
		</div>
	);
}
