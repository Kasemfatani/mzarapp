import styles from "./BusTripDetail.module.css";

const MEETING_POINT_MAP =
	"https://www.google.com/maps/search/?api=1&query=21.42441532155061,39.81894701951807";

export default function BusTripMeetingSection({ copy }) {
	return (
		<section className={styles.section} aria-labelledby="bus-meeting-title">
			<p className={styles.eyebrow}>{copy.meetingEyebrow}</p>
			<h2 className={styles.sectionTitle} id="bus-meeting-title">
				{copy.meetingTitle}
			</h2>
			<p className={styles.sectionText}>{copy.meetingDescription}</p>
			<div className={styles.meetingCard}>
				<div className={styles.meetingName}>
					<span className={styles.pinIcon} aria-hidden="true">
						⌖
					</span>
					<div>
						<strong>{copy.meetingPoint}</strong>
						<p className={styles.meetingHours}>{copy.meetingHours}</p>
					</div>
				</div>
				<a href={MEETING_POINT_MAP} target="_blank" rel="noreferrer" className={styles.mapLink}>
					{copy.viewMap}
					<span aria-hidden="true">↗</span>
				</a>
			</div>
		</section>
	);
}

