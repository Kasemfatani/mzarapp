import pageStyles from "./NationalDayPage.module.css";
import styles from "./NationalDayDetails.module.css";

export default function NationalDayDetails({ content }) {
	const { details } = content;

	return (
		<section className={`${styles.detailsSection} ${pageStyles.container}`} aria-labelledby="details-title">
			<div className={styles.detailsPanel}>
				<div className={pageStyles.sectionIntro}>
					<span>{details.eyebrow}</span>
					<h2 id="details-title">{details.title}</h2>
				</div>
				<div className={styles.detailsGrid}>
					{details.items.map(([label, value, icon]) => (
						<div className={styles.detailCard} key={label}>
							<span aria-hidden="true">{icon}</span>
							<div>
								<small>{label}</small>
								<strong>{value}</strong>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
