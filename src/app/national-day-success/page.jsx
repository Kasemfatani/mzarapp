import { getServerLocale } from "@/lib/localeServer";
import NationalDaySuccess from "@/components/national-day/NationalDaySuccess";
import { getNationalDayContent } from "@/components/national-day/nationalDayContent";
import pageStyles from "@/components/national-day/NationalDayPage.module.css";

export function generateMetadata() {
	const isAr = getServerLocale() === "ar";
	return {
		title: isAr ? "تأكيد حجز اليوم الوطني | مزار" : "National Day Booking Status | Mzar",
		robots: { index: false, follow: false },
	};
}

export default function NationalDaySuccessPage() {
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
				<NationalDaySuccess content={content} lang={lang} />
			</main>
		</div>
	);
}
