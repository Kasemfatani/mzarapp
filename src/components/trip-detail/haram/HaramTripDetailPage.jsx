"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { haramTripCopy } from "./haramTripContent";
import { getHaramSchedule } from "./haramTripSchedule";
import HaramTripBookingSection from "./HaramTripBookingSection";
import HaramTripExperienceSection from "./HaramTripExperienceSection";
import HaramTripFaqSection from "./HaramTripFaqSection";
import HaramTripGallerySection from "./HaramTripGallerySection";
import HaramTripHero from "./HaramTripHero";
import HaramTripItinerarySection from "./HaramTripItinerarySection";
import HaramTripLicenseSection from "./HaramTripLicenseSection";
import HaramTripMobileCta from "./HaramTripMobileCta";
import HaramTripReviewsSection from "./HaramTripReviewsSection";
import styles from "./HaramTripDetail.module.css";

export default function HaramTripDetailPage({
	lang = "en",
	bookingData,
	initialSchedule,
	countryCode = "SA",
}) {
	const isAr = lang === "ar";
	const copy = haramTripCopy[isAr ? "ar" : "en"];
	const [schedule, setSchedule] = useState(initialSchedule || null);
	const refreshSchedule = useCallback(() => {
		setSchedule(getHaramSchedule(bookingData, new Date()));
	}, [bookingData]);

	useEffect(() => {
		refreshSchedule();
		const timer = window.setInterval(refreshSchedule, 30_000);
		window.addEventListener("focus", refreshSchedule);
		return () => {
			window.clearInterval(timer);
			window.removeEventListener("focus", refreshSchedule);
		};
	}, [refreshSchedule]);

	const breadcrumbs = useMemo(() => copy.breadcrumb, [copy.breadcrumb]);
	const localizedRoot = isAr ? "/ar" : "/en";

	return (
		<main className={styles.page} lang={isAr ? "ar" : "en"} dir={isAr ? "rtl" : "ltr"}>
			<div className={styles.container}>
				<nav className={styles.breadcrumb} aria-label={isAr ? "مسار التنقل" : "Breadcrumb"}>
					{breadcrumbs.map((label, index) => <span key={label}>
						{index > 0 && <span aria-hidden="true">/</span>}
						{index === 0 ? <a href={`${localizedRoot}/`}>{label}</a> : index === 1 ? <a href={`${localizedRoot}/all-trips`}>{label}</a> : <span aria-current="page">{label}</span>}
					</span>)}
				</nav>
				<HaramTripHero copy={copy} bookingData={bookingData} lang={lang} />
				<HaramTripLicenseSection copy={copy} />
				<div className={styles.contentGrid}>
					<article className={styles.contentColumn}>
						<HaramTripExperienceSection copy={copy} bookingData={bookingData} schedule={schedule} lang={lang} />
						<HaramTripItinerarySection copy={copy} />
						<HaramTripGallerySection copy={copy} />
						<HaramTripReviewsSection copy={copy} bookingData={bookingData} />
						<HaramTripFaqSection copy={copy} bookingData={bookingData} schedule={schedule} lang={lang} />
					</article>
					<aside className={styles.bookingAside} aria-label={copy.bookingTitle}>
						<HaramTripBookingSection
							copy={copy}
							lang={lang}
							bookingData={bookingData}
							schedule={schedule}
							onScheduleChange={setSchedule}
							countryCode={countryCode}
						/>
					</aside>
				</div>
				<section className={styles.closing}>
					<h2>{copy.closingTitle}</h2>
					<p>{copy.closingDescription}</p>
					<a href="#booking" className={styles.primaryButton}>{copy.book}</a>
				</section>
			</div>
			<HaramTripMobileCta copy={copy} bookingData={bookingData} schedule={schedule} lang={lang} />
		</main>
	);
}
