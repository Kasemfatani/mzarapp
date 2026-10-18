import Image from "next/image";
import styles from "./BusTripDetail.module.css";

export default function BusTripHero({ copy, lang }) {
	const isAr = lang === "ar";

	return (
		<section className={styles.hero} aria-labelledby="bus-trip-title">
			<Image
				src="/trip-detail/96/tour.jpg"
				alt={isAr ? "حافلة مزار للجولات الإثرائية في مكة" : "Mzar enrichment tour bus in Makkah"}
			fill
				priority
				sizes="(max-width: 760px) 100vw, 1200px"
				className={styles.heroImage}
			/>
			<div className={styles.heroOverlay} />
			<span className={styles.heroBadge}>{copy.badge}</span>
			<div className={styles.heroCopy}>
				<span className={styles.heroEyebrow}>{copy.eyebrow}</span>
				<h1 id="bus-trip-title">{copy.title}</h1>
				<p>{copy.heroDescription}</p>
				<div className={styles.heroLanguages}>{copy.languages}</div>
				<a href="#booking" className={styles.primaryButton}>
					{copy.book}
					<span aria-hidden="true">{isAr ? "←" : "→"}</span>
				</a>
			</div>
		</section>
	);
}

