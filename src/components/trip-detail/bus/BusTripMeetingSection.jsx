import styles from "./BusTripDetail.module.css";
import { busTripDepartures } from "./busTripContent";

export default function BusTripMeetingSection({ copy, lang }) {
	const language = lang === "ar" ? "ar" : "en";

	return (
		<section className={styles.section} aria-labelledby="bus-meeting-title">
			<p className={styles.eyebrow}>{copy.meetingEyebrow}</p>
			<h2 className={styles.sectionTitle} id="bus-meeting-title">
				{copy.meetingTitle}
			</h2>
			<p className={styles.sectionText}>{copy.meetingDescription}</p>
			<div className={styles.meetingList}>
				{busTripDepartures.map((departure) => (
					<article className={styles.meetingCard} key={departure.id}>
						<div className={styles.meetingName}>
							<span className={styles.pinIcon} aria-hidden="true">
								⌖
							</span>
							<div>
								<strong>{departure.meetingPoint[language]}</strong>
								<p className={styles.meetingHours}>{departure.meetingHours[language]}</p>
							</div>
						</div>
						<a href={departure.mapUrl} target="_blank" rel="noreferrer" className={styles.mapLink}>
							{copy.viewMap}
							<span aria-hidden="true">↗</span>
						</a>
					</article>
				))}
			</div>
		</section>
	);
}

