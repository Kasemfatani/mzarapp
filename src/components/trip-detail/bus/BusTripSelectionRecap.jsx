import { formatBusDate } from "./busTripPricing";
import styles from "./BusTripBookingCard.module.css";

export default function BusTripSelectionRecap({
	lang = "en",
	date,
	departure,
	meetingPoint,
}) {
	const isAr = lang === "ar";
	const items = [
		departure,
		meetingPoint,
		formatBusDate(date, lang),
	].filter(Boolean);

	return (
		<div className={styles.selectionRecap} aria-label={isAr ? "ملخص تفاصيل الجولة" : "Tour selection summary"}>
			{items.map((item, index) => (
				<span key={`${item}-${index}`}>{item}</span>
			))}
		</div>
	);
}
