import BookWrapper from "@/app/book-tour/[id]/BookWrapper";
import styles from "./BusTripDetail.module.css";

export default function BusTripBookingSection({
	copy,
	lang,
	busData,
	isSaudi,
	countryCode,
	selectedDeparture,
	onDepartureChange,
	sidebar = false,
}) {
	return (
		<section className={`${styles.bookingSection} ${sidebar ? styles.sidebarBookingSection : ""}`} id="booking" aria-labelledby="bus-booking-title">
			{!sidebar && <div className={styles.bookingHeading}>
				<p className={styles.eyebrow}>{copy.bookingEyebrow}</p>
				<h2 className={styles.sectionTitle} id="bus-booking-title">
					{copy.bookingTitle}
				</h2>
				<p className={styles.sectionText}>{copy.bookingDescription}</p>
			</div>}
			{busData ? (
				<BookWrapper
					lang={lang}
					busData={busData}
					isSaudi={isSaudi}
					countryCode={countryCode || "SA"}
					selectedDeparture={selectedDeparture}
					onDepartureChange={onDepartureChange}
					variant={sidebar ? "sidebar" : "default"}
				/>
			) : (
				<div className={styles.bookingUnavailable} role="status">
					{copy.bookingUnavailable}
				</div>
			)}
		</section>
	);
}

