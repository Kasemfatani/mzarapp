"use client";

import { useState } from "react";
import { busTripCopy } from "./busTripContent";
import BusTripAudioSection from "./BusTripAudioSection";
import BusTripBookingSection from "./BusTripBookingSection";
import BusTripFactsSection from "./BusTripFactsSection";
import BusTripFaqSection from "./BusTripFaqSection";
import BusTripHero from "./BusTripHero";
import BusTripItinerarySection from "./BusTripItinerarySection";
import BusTripMeetingSection from "./BusTripMeetingSection";
import BusTripMobileCta from "./BusTripMobileCta";
import BusTripPartners from "./BusTripPartners";
import styles from "./BusTripDetail.module.css";

export default function BusTripDetailPage({
	lang = "en",
	busData,
	isSaudi = true,
	countryCode = "SA",
}) {
	const copy = busTripCopy[lang === "ar" ? "ar" : "en"];
	const isAr = lang === "ar";
	const [selectedDeparture, setSelectedDeparture] = useState("morning");
	const breadcrumbLinks = isAr
		? ["/ar/", "/ar/all-trips"]
		: ["/en/", "/en/all-trips"];

	return (
		<main className={styles.page} lang={isAr ? "ar" : "en"} dir={isAr ? "rtl" : "ltr"}>
			<div className={styles.container}>
				<nav className={styles.breadcrumb} aria-label={isAr ? "مسار التنقل" : "Breadcrumb"}>
					{copy.breadcrumb.map((label, index) => (
						<span key={label}>
							{index > 0 && <span aria-hidden="true">/</span>}
							{index < breadcrumbLinks.length ? (
								<a href={breadcrumbLinks[index]}>{label}</a>
							) : (
								<span aria-current="page">{label}</span>
							)}
						</span>
					))}
				</nav>
				<BusTripHero copy={copy} lang={lang} />
				<BusTripPartners copy={copy} />
				<div className={styles.contentGrid}>
					<div className={styles.contentColumn}>
						<BusTripAudioSection copy={copy} />
						<BusTripItinerarySection
							copy={copy}
							lang={lang}
							selectedId={selectedDeparture}
							onSelect={setSelectedDeparture}
						/>
						<BusTripMeetingSection copy={copy} />
						<BusTripFactsSection copy={copy} />
						<BusTripFaqSection copy={copy} lang={lang} />
					</div>
					<aside className={styles.bookingAside} aria-label={copy.bookingTitle}>
						<BusTripBookingSection
							copy={copy}
							lang={lang}
							busData={busData}
							isSaudi={isSaudi}
							countryCode={countryCode}
							selectedDeparture={selectedDeparture}
							onDepartureChange={setSelectedDeparture}
							sidebar
						/>
					</aside>
				</div>
			</div>
			<BusTripMobileCta copy={copy} busData={busData} lang={lang} />
		</main>
	);
}
