import styles from "./BusTripDetail.module.css";

export default function BusTripFactsSection({ copy }) {
	return (
		<section className={styles.section} aria-labelledby="bus-trip-facts-title">
			{copy.factsEyebrow && <p className={styles.eyebrow}>{copy.factsEyebrow}</p>}
			<h2 className={styles.sectionTitle} id="bus-trip-facts-title">
				{copy.factsTitle}
			</h2>
			<div className={styles.factsGrid}>
				{copy.facts.map((fact) => (
					<div className={styles.fact} key={fact.label}>
						<strong>{fact.value}</strong>
						<span>{fact.label}</span>
					</div>
				))}
			</div>
		</section>
	);
}

