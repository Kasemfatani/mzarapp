"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { formatHaramDate, formatHaramTime } from "./haramTripSchedule";
import { formatHaramMoney } from "./haramTripPricing";
import styles from "./HaramTripDetail.module.css";

export default function HaramTripMobileCta({ copy, bookingData, schedule, lang }) {
	const [bookingVisible, setBookingVisible] = useState(false);
	useEffect(() => {
		const target = document.getElementById("booking");
		if (!target || !("IntersectionObserver" in window)) return undefined;
		const observer = new IntersectionObserver(([entry]) => setBookingVisible(entry.isIntersecting), { threshold: 0.01 });
		observer.observe(target);
		return () => observer.disconnect();
	}, []);
	if (bookingVisible) return null;
	const perPerson = Number(bookingData?.price || 0) * (1 + Number(bookingData?.tax || 0));
	return (
		<div className={styles.mobileBar}>
			<div className={styles.mobileBarMeta}>
				<small>{copy.mobilePrice}</small>
				<strong>{formatHaramMoney(perPerson, lang)}</strong>
				<span>{schedule ? formatHaramDate(schedule.date, lang) : copy.scheduleLoading} · {schedule ? formatHaramTime(schedule.time?.time, lang) : "8:30 PM"}</span>
			</div>
			<a href="#booking" className={styles.mobileBookButton}>
				{copy.mobileBook}{lang === "ar" ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
			</a>
		</div>
	);
}
