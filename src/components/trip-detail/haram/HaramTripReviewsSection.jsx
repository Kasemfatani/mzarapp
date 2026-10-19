import { Star } from "lucide-react";
import styles from "./HaramTripDetail.module.css";

export default function HaramTripReviewsSection({ copy, bookingData }) {
	const rating = Number(bookingData?.rating || 4.6);
	const count = Number(bookingData?.rating_count || 56);
	return (
		<section className={styles.reviews} aria-labelledby="haram-reviews-title">
			<p className={styles.eyebrow}>{copy.reviewsEyebrow}</p>
			<h2 id="haram-reviews-title">{copy.reviewsTitle}</h2>
			<div className={styles.reviewSummary}>
				<strong>{rating.toFixed(1)}</strong>
				<div><span className={styles.reviewStars} aria-label={`${rating} out of 5`}><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></span>
					<small>{copy.reviewsCountPrefix} {count} {copy.reviewsCountSuffix}</small></div>
			</div>
		</section>
	);
}
