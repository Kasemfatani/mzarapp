import Image from "next/image";
import styles from "./HaramTripDetail.module.css";

export default function HaramTripGallerySection({ copy }) {
	return (
		<section className={styles.gallery} aria-label={copy.galleryTitle}>
			<div className={styles.galleryImage}>
				<Image src="/trip-detail/88/haram.jpg" alt={copy.closingImageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" />
			</div>
			<div className={styles.galleryCopy}>
				<p className={styles.eyebrow}>{copy.galleryEyebrow}</p>
				<h2>{copy.galleryTitle}</h2>
				<p>{copy.galleryDescription}</p>
			</div>
		</section>
	);
}
