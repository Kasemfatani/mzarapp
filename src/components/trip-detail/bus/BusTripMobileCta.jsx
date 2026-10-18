"use client";

import { useEffect, useState } from "react";
import { formatBusMoney, getBusAdultGroup, getBusTripQuote } from "./busTripPricing";
import styles from "./BusTripDetail.module.css";

export default function BusTripMobileCta({ copy, busData, lang = "en" }) {
	const [bookingVisible, setBookingVisible] = useState(false);
	const adultGroup = getBusAdultGroup(busData?.group_age_prices || []);
	const startingPrice = getBusTripQuote({
		adultUnitPrice: adultGroup?.price,
		adultCount: 1,
		taxRate: busData?.tax,
	}).unitGrossSAR;

	useEffect(() => {
		const bookingSection = document.getElementById("booking");
		if (!bookingSection || !("IntersectionObserver" in window)) return;

		const observer = new IntersectionObserver(
			([entry]) => setBookingVisible(entry.isIntersecting),
			{ threshold: 0 },
		);
		observer.observe(bookingSection);

		return () => observer.disconnect();
	}, []);

	if (bookingVisible) return null;

	return (
		<div className={styles.mobileBar}>
			<div className={styles.mobileBarInner}>
				<div className={styles.mobileStartingPrice}>
					<span>{copy.mobilePriceFrom}</span>
					<strong>{formatBusMoney(startingPrice, lang)}</strong>
				</div>
			<a href="#booking" className={styles.primaryButton}>
				{copy.bookMobile}
				<span aria-hidden="true">{lang === "ar" ? "←" : "→"}</span>
			</a>
			</div>
		</div>
	);
}
