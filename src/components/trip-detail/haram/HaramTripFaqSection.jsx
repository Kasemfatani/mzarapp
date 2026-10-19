import { ChevronDown } from "lucide-react";
import { formatHaramTime } from "./haramTripSchedule";
import { formatHaramMoney, getHaramOfferPrices } from "./haramTripPricing";
import styles from "./HaramTripDetail.module.css";

export default function HaramTripFaqSection({ copy, bookingData, schedule, lang }) {
	const time = formatHaramTime(schedule?.time?.time || "20:30:00", lang, { longPeriod: true });
	const endTime = formatHaramTime("22:15", lang, { longPeriod: true });
	const { currentPrice } = getHaramOfferPrices({
		price: bookingData?.price,
		taxRate: bookingData?.tax,
	});
	const personPrice = formatHaramMoney(currentPrice, lang);
	const answerDetails = { time, endTime, personPrice };

	return (
		<section className={styles.faqSection} aria-labelledby="haram-faq-title">
			<p className={styles.eyebrow}>{copy.faqEyebrow}</p>
			<h2 id="haram-faq-title">{copy.faqTitle}</h2>
			<div className={styles.faqList}>
				{copy.faq.map(([question, answer]) => (
					<details key={question}>
						<summary>{question}<ChevronDown size={18} aria-hidden="true" /></summary>
						<p>{typeof answer === "function" ? answer(answerDetails) : answer}</p>
					</details>
				))}
			</div>
		</section>
	);
}
