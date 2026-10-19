import Image from "next/image";
import { ArrowDown, Clock3, MapPin, ShieldCheck, Star } from "lucide-react";
import { formatHaramMoney, getHaramOfferPrices, HARAM_REFERENCE_PRICE_MARKUP_PERCENT } from "./haramTripPricing";
import styles from "./HaramTripDetail.module.css";

export default function HaramTripHero({ copy, bookingData, lang }) {
	const isAr = lang === "ar";
	const rating = Number(bookingData?.rating || 4.6);
	const reviewCount = Number(bookingData?.rating_count || 56);
	const duration = copy.duration;
	const price = Number(bookingData?.price || 0);
	const taxRate = Number(bookingData?.tax || 0);
	const offer = getHaramOfferPrices({ price, taxRate });
	const money = (amount) => formatHaramMoney(amount, lang);

	return (
		<section className={styles.hero} aria-labelledby="haram-trip-title">
			<Image
				src="/trip-detail/88/haram.jpg"
				alt={copy.photoAlt}
				fill
				priority
				sizes="(max-width: 760px) 100vw, 1200px"
				className={styles.heroImage}
			/>
			<div className={styles.heroOverlay} />
			<div className={styles.heroBadge}><ShieldCheck size={15} />{copy.licenseBadge}</div>
			<div className={styles.heroCopy}>
				<p className={styles.heroEyebrow}>{copy.place}</p>
				<h1 id="haram-trip-title">{copy.heroTitle}<br /><span>{copy.heroTitleAccent}</span></h1>
				<p className={styles.heroDescription}>{copy.heroDescription}</p>
				<div className={styles.heroFacts}>
					<span><Clock3 size={16} />{duration}</span>
					<span><ShieldCheck size={16} />{copy.heroFacts[1]}</span>
					<span><MapPin size={16} />{copy.meetingPoint}</span>
				</div>
				<div className={styles.heroOffer} aria-label={`${copy.specialOffer} ${copy.offerReferenceNote(HARAM_REFERENCE_PRICE_MARKUP_PERCENT)}`}>
					<div className={styles.heroOfferLabel}>
						<strong>{copy.specialOffer}</strong>
						<span>{copy.offerReferenceNote(HARAM_REFERENCE_PRICE_MARKUP_PERCENT)}</span>
					</div>
					<div className={styles.heroOfferPrice}>
						<strong>{money(offer.currentPrice)}</strong>
						<del>{money(offer.originalPrice)}</del>
						<span>{copy.pricePerPerson}</span>
						<small>{copy.vatIncluded}</small>
					</div>
				</div>
				<div className={styles.heroActions}>
					<a className={`${styles.primaryButton} ${styles.heroBookingButton}`} href="#booking">{copy.book}<ArrowDown size={16} /></a>
					<span className={styles.rating} aria-label={`${rating} ${copy.rating}`}>
						<span className={styles.stars} aria-hidden="true"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></span>
						<strong>{rating.toFixed(1)}</strong> {copy.rating} ({reviewCount})
					</span>
				</div>
			</div>
			<span className={styles.photoCaption}>{copy.photoAlt}</span>
		</section>
	);
}
