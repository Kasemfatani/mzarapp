"use client";
import React, { useEffect, useState } from "react";

export default function Offer() {
	const [language, setLanguage] = useState("en");
	const [timeLeft, setTimeLeft] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	// Set language from localStorage
	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || "en");
		}
	}, []);

	useEffect(() => {
		function getNextMidnight() {
			const now = new Date();
			const next = new Date(now);
			next.setHours(24, 0, 0, 0); // next midnight
			return next;
		}

		function updateCountdown() {
			const now = new Date();
			const nextMidnight = getNextMidnight();
			const diff = nextMidnight - now;

			setTimeLeft({
				hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((diff / (1000 * 60)) % 60),
				seconds: Math.floor((diff / 1000) % 60),
			});
		}

		updateCountdown();
		const timer = setInterval(updateCountdown, 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="uper-header-counter-cont">
			{/* <span className="ohsol-span">
				{language === "en"
					? "Book Now And Get 20% Off"
					: "احجز الآن واحصل على خصم 20٪"}
			</span> */}
			<div className="uper-header-counter" style={{ direction : 'ltr' }}>
				<div className="days">
					<span>00</span>
					<p>{language === "en" ? "Days" : "أيام"}</p>
				</div>
				<span className="nokteten">:</span>
				<div className="days">
					<span>{timeLeft.hours.toString().padStart(2, "0")}</span>
					<p>{language === "en" ? "Hours" : "ساعات"}</p>
				</div>
				<span className="nokteten">:</span>
				<div className="days">
					<span>{timeLeft.minutes.toString().padStart(2, "0")}</span>
					<p>{language === "en" ? "Minutes" : "دقائق"}</p>
				</div>
				<span className="nokteten">:</span>
				<div className="days">
					<span>{timeLeft.seconds.toString().padStart(2, "0")}</span>
					<p>{language === "en" ? "Seconds" : "ثواني"}</p>
				</div>
			</div>
		</div>
	);
}
