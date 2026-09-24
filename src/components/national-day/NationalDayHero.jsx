import Image from "next/image";
import { ArrowLeft, Clock3, MapPin } from "lucide-react";
import pageStyles from "./NationalDayPage.module.css";
import styles from "./NationalDayHero.module.css";

export default function NationalDayHero({ content }) {
	const { hero } = content;

	return (
		<section className={`${styles.hero} ${pageStyles.container}`} aria-labelledby="national-day-title">
			<div className={styles.heroCard}>
				<div className={styles.heroContent}>
					{/* <div className={styles.campaignLabel}>
						<span />
						{hero.campaign}
					</div> */}
					<p className={styles.heroKicker}>{hero.kicker}</p>
					<h1 id="national-day-title">{hero.title}</h1>
					<p className={styles.heroLead}>{hero.lead}</p>
					<div className={styles.priceRow}>
						<div className={styles.priceStack}>
							<div className={styles.oldPrice}>
								{hero.oldPrice} <del>199 {hero.priceUnit}</del>
							</div>
							<div className={styles.price}>
								96 <span>{hero.priceUnit}</span>
							</div>
						</div>
						<div className={styles.priceNote}>{hero.priceNote}</div>
					</div>
					<div className={styles.heroActions}>
						<a className={`${pageStyles.button} ${styles.heroButton}`} href="#booking">
							{hero.book}
							<ArrowLeft aria-hidden="true" size={19} strokeWidth={2} />
						</a>
						<span className={styles.limited}>
							<Clock3 aria-hidden="true" size={18} strokeWidth={1.8} />
							{hero.limited}
						</span>
					</div>
				</div>

				<div className={styles.heroVisual}>
					<Image
						src="/new-home/sanctuaries.webp"
						alt={hero.imageAlt}
						fill
						priority
						sizes="(max-width: 950px) 100vw, 50vw"
						className={styles.heroImage}
					/>
					<div className={styles.imageCaption}>
						<MapPin aria-hidden="true" size={21} strokeWidth={1.8} />
						{hero.imageCaption}
					</div>
				</div>
			</div>
		</section>
	);
}
