import { Headphones } from "lucide-react";
import styles from "./BusTripDetail.module.css";

export default function BusTripAudioSection({ copy }) {
	return (
		<section className={`${styles.section} ${styles.guidanceSection}`}>
			<div className={styles.guidanceIcon} aria-hidden="true">
				<Headphones size={24} strokeWidth={2} />
			</div>
			<div>
				<p className={styles.eyebrow}>{copy.guidanceEyebrow}</p>
				<h2 className={styles.sectionTitle}>{copy.guidanceTitle}</h2>
				<p className={styles.sectionText}>{copy.guidanceDescription}</p>
				<div className={styles.languagePills} aria-label={copy.languages}>
					{(copy.languages || "").split(" · ").map((language) => (
						<span key={language}>{language}</span>
					))}
				</div>
			</div>
		</section>
	);
}

