import pageStyles from "./NationalDayPage.module.css";
import styles from "./NationalDayStations.module.css";

export default function NationalDayStations({ content }) {
	const { stations } = content;

	return (
		<section className={`${styles.stations} ${pageStyles.container}`} aria-labelledby="stations-title">
			<div className={pageStyles.sectionIntro}>
				<span>{stations.eyebrow}</span>
				<h2 id="stations-title">{stations.title}</h2>
				<p>{stations.intro}</p>
			</div>
			<div className={styles.stationGrid}>
				{stations.items.map(([title, description], index) => (
					<article
						className={`${styles.station} ${index === stations.items.length - 1 ? styles.stationWide : ""}`}
						key={title}
					>
						<span className={styles.stationSymbol} aria-hidden="true">
							{index + 1}
						</span>
						<div>
							<h3>{title}</h3>
							<p>{description}</p>
						</div>
					</article>
				))}
			</div>
			<p className={styles.stationsClosing}>{stations.closing}</p>
		</section>
	);
}
