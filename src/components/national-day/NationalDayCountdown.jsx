"use client";

import { useEffect, useState } from "react";
import { NATIONAL_DAY_TARGET } from "./nationalDayContent";
import pageStyles from "./NationalDayPage.module.css";
import styles from "./NationalDayCountdown.module.css";

function getTimeRemaining(targetDate) {
	const distance = new Date(targetDate).getTime() - Date.now();
	const totalSeconds = Math.max(0, Math.floor(distance / 1000));

	return {
		hasStarted: distance <= 0,
		days: Math.floor(totalSeconds / 86400),
		hours: Math.floor((totalSeconds % 86400) / 3600),
		minutes: Math.floor((totalSeconds % 3600) / 60),
		seconds: totalSeconds % 60,
	};
}

const pad = (value) => String(value).padStart(2, "0");

export default function NationalDayCountdown({ content, targetDate = NATIONAL_DAY_TARGET }) {
	const { countdown } = content;
	const [timeLeft, setTimeLeft] = useState(null);

	useEffect(() => {
		const updateCountdown = () => setTimeLeft(getTimeRemaining(targetDate));

		updateCountdown();
		const intervalId = window.setInterval(updateCountdown, 1000);

		return () => window.clearInterval(intervalId);
	}, [targetDate]);

	const values = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

	return (
		<section className={`${styles.countdownSection} ${pageStyles.container}`} aria-labelledby="countdown-title">
			<div className={styles.countdownCard}>
				<div className={styles.countdownCopy}>
					<span>{countdown.eyebrow}</span>
					<h2 id="countdown-title">{countdown.title}</h2>
					<p>{timeLeft?.hasStarted ? countdown.started : countdown.message}</p>
					<a className={`${pageStyles.button} ${styles.countdownCta}`} href="#booking">
						{countdown.book}
					</a>
				</div>
				<div className={styles.countdown} aria-live="polite">
					{[values.days, values.hours, values.minutes, values.seconds].map((value, index) => (
						<div className={styles.time} key={countdown.labels[index]}>
							<b>{pad(value)}</b>
							<small>{countdown.labels[index]}</small>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
