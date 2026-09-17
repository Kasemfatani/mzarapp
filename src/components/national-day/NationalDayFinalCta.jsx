"use client";

import { useEffect, useState } from "react";
import pageStyles from "./NationalDayPage.module.css";
import styles from "./NationalDayFinalCta.module.css";

export default function NationalDayFinalCta({ content }) {
	const { finalCta } = content;
	const [bookingIsVisible, setBookingIsVisible] = useState(false);

	useEffect(() => {
		const bookingSection = document.getElementById("booking");
		if (!bookingSection || !("IntersectionObserver" in window)) return;

		const observer = new IntersectionObserver(([entry]) => {
			setBookingIsVisible(entry.isIntersecting);
		});
		observer.observe(bookingSection);

		return () => observer.disconnect();
	}, []);

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
			{!bookingIsVisible && (
				<a className={`${pageStyles.button} ${styles.mobileBook}`} href="#booking">
					{finalCta.mobileBook}
				</a>
			)}
		</>
	);
}
