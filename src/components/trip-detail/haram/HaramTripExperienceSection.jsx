import { CalendarDays, Clock3, MapPin, Timer } from "lucide-react";
import { formatHaramDate, formatHaramTime } from "./haramTripSchedule";
import styles from "./HaramTripDetail.module.css";

const DETAIL_ICONS = [CalendarDays, Clock3, Timer, MapPin];

export default function HaramTripExperienceSection({ copy, schedule, bookingData, lang }) {
	const time = formatHaramTime(schedule?.time?.time || "20:30:00", lang, { longPeriod: true });
	const details = [
		schedule ? formatHaramDate(schedule.date, lang) : copy.scheduleLoading,
		`${time} – ${copy.tourTimeZone}`,
		copy.duration,
		bookingData?.meeting_point?.name || bookingData?.gathering_point?.name || copy.meetingPoint,
	];

	return (
		<section className={styles.experience} aria-labelledby="haram-experience-title">
			<p className={styles.eyebrow}>{copy.experienceEyebrow}</p>
			<h2 id="haram-experience-title">{copy.experienceTitle}</h2>
			<p className={styles.sectionIntro}>{copy.experienceDescription}</p>
			<div className={styles.detailsBlock}>
				<h3>{copy.detailsHeading}</h3>
				<div className={styles.detailGrid}>
					{details.map((value, index) => {
						const Icon = DETAIL_ICONS[index];
						return (
							<div className={styles.detailItem} key={copy.detailLabels[index]}>
								<Icon size={20} aria-hidden="true" />
								<div><small>{copy.detailLabels[index]}</small><strong>{value}</strong>
									{index === 3 && <a href={copy.mapUrl} target="_blank" rel="noreferrer">{copy.map}</a>}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
