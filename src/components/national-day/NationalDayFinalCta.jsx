import pageStyles from "./NationalDayPage.module.css";
import styles from "./NationalDayFinalCta.module.css";

export default function NationalDayFinalCta({ content }) {
	const { finalCta } = content;

	return (
		<>
			<section className={`${styles.finalCta} ${pageStyles.container}`}>
				<div className={styles.finalCard}>
					<div className={styles.finalCopy}>
						<h2>{finalCta.title}</h2>
						<p>{finalCta.copy}</p>
					</div>
					<a className={`${pageStyles.button} ${styles.finalButton}`} href="#booking">
						{finalCta.book}
					</a>
				</div>
			</section>
			<a className={`${pageStyles.button} ${styles.mobileBook}`} href="#booking">
				{finalCta.mobileBook}
			</a>
		</>
	);
}
