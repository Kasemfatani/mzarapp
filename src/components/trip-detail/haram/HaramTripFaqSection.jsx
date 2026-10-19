import { ChevronDown } from "lucide-react";
import { getHaramTripFaqItems } from "./haramTripFaqData";
import styles from "./HaramTripDetail.module.css";

export default function HaramTripFaqSection({ copy, bookingData, schedule, lang }) {
	const faqItems = getHaramTripFaqItems({ bookingData, schedule, lang });

	return (
		<section className={styles.faqSection} aria-labelledby="haram-faq-title">
			<p className={styles.eyebrow}>{copy.faqEyebrow}</p>
			<h2 id="haram-faq-title">{copy.faqTitle}</h2>
			<div className={styles.faqList}>
				{faqItems.map(([question, answer]) => (
					<details key={question}>
						<summary>{question}<ChevronDown size={18} aria-hidden="true" /></summary>
						<p>{answer}</p>
					</details>
				))}
			</div>
		</section>
	);
}
