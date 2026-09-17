import { CalendarDays, Clock3, Ticket, Timer } from "lucide-react";
import pageStyles from "./NationalDayPage.module.css";
import styles from "./NationalDayFacts.module.css";

const factIcons = [CalendarDays, Clock3, Timer, Ticket];

export default function NationalDayFacts({ content }) {
	return (
		<section
			className={`${styles.factsWrap} ${pageStyles.container}`}
			aria-label={content.factsAria}
		>
			<div className={styles.facts}>
				{content.facts.map((fact, index) => {
					const Icon = factIcons[index];

					return (
						<div className={styles.fact} key={fact.label}>
							<span className={styles.factIcon}>
								<Icon aria-hidden="true" size={22} strokeWidth={1.8} />
							</span>
							<div>
								<small>{fact.label}</small>
								<strong>{fact.value}</strong>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
