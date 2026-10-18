"use client";

import { busTripDepartures, busTripStops } from "./busTripContent";
import styles from "./BusTripDetail.module.css";

export default function BusTripItinerarySection({ copy, lang, selectedId, onSelect }) {
	const isAr = lang === "ar";
	const locale = isAr ? "ar-SA" : "en-US";
	const departure = busTripDepartures.find((item) => item.id === selectedId) || busTripDepartures[0];

	return (
		<section className={`${styles.section} ${styles.itinerarySection}`} id="bus-itinerary" aria-labelledby="bus-itinerary-title">
			<p className={styles.eyebrow}>{copy.itineraryEyebrow}</p>
			<h2 className={styles.sectionTitle} id="bus-itinerary-title">
				{copy.itineraryTitle}
			</h2>
			<p className={styles.sectionText}>{copy.itineraryDescription}</p>
			<div className={styles.itineraryTabs} role="group" aria-label={isAr ? "اختر مسار الجولة" : "Choose itinerary"}>
				{busTripDepartures.map((item) => (
					<button
						key={item.id}
						type="button"
						className={`${styles.itineraryButton} ${selectedId === item.id ? styles.selectedDeparture : ""}`}
						aria-pressed={selectedId === item.id}
						onClick={() => onSelect(item.id)}
					>
						<span>{item.icon} {isAr ? item.ar : item.en}</span>
						<small>{isAr ? item.arTime : item.enTime}</small>
					</button>
				))}
			</div>
			<div className={styles.routeSummary}>
				<strong>{isAr ? departure.ar : departure.en}</strong>
				<span>{isAr ? departure.arTime : departure.enTime} · {isAr ? "الانطلاق" : "Departure"}</span>
				<span>{new Intl.NumberFormat(locale).format(busTripStops.length)} {isAr ? "محطات" : "stops"}</span>
			</div>
			<ol className={styles.stopGrid} aria-label={isAr ? departure.ar : departure.en}>
				{busTripStops.map((stop, index) => (
					<li className={styles.stop} key={stop.en}>
						<span className={styles.stopNumber} aria-hidden="true">
							{new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(index + 1)}
						</span>
						<span>{isAr ? stop.ar : stop.en}</span>
					</li>
				))}
			</ol>
			<div className={styles.routeFooter}>
				<span>{isAr ? "انطلق من فندق أنجم مكة" : "Depart from Anjum Hotel Makkah"}</span>
				<button
					type="button"
					className={styles.routeLink}
					onClick={() => {
						onSelect(departure.id);
						document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
					}}
				>
					{isAr ? "احجز هذه الجولة" : "Book this tour"}
					<span aria-hidden="true">{isAr ? " ←" : " →"}</span>
				</button>
			</div>
			<p className={styles.itineraryNote}>
				{isAr
					? "المحطات مشتركة للصباحية والمسائية حاليًا، ويمكن تخصيص كل مسار مستقلًا."
					: "Both departures currently share these stops. Each route can be updated independently."}
			</p>
		</section>
	);
}
