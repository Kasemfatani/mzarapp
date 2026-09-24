"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, LockKeyhole, Minus, Plus } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-international-phone/style.css";
import {
	NATIONAL_DAY_PRICE_SAR,
	NATIONAL_DAY_SESSION_PREFIX,
} from "@/lib/nationalDayBookingConstants";
import pageStyles from "./NationalDayPage.module.css";
import styles from "./NationalDayBooking.module.css";

const PAYMENT_INIT_ENDPOINT = "/api/national-day/clickpay/init";

export default function NationalDayBooking({ content, lang }) {
	const { booking } = content;
	const [availability, setAvailability] = useState("checking");
	const [availabilityMessage, setAvailabilityMessage] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [countryName, setCountryName] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const submittingRef = useRef(false);

	const loadAvailability = useCallback(async () => {
		setAvailability("checking");
		setAvailabilityMessage("");
		try {
			const response = await fetch("/api/national-day/availability", {
				cache: "no-store",
			});
			const result = await response.json().catch(() => null);
			if (!response.ok || typeof result?.status !== "boolean") {
				throw new Error("availability_unavailable");
			}
			setAvailability(result.status ? "available" : "unavailable");
		} catch {
			setAvailability("error");
			setAvailabilityMessage(booking.availabilityError);
		}
	}, [booking.availabilityError]);

	useEffect(() => {
		loadAvailability();
	}, [loadAvailability]);

	const handleQuantity = (nextQuantity) => {
		setQuantity(Math.max(1, nextQuantity));
		setErrors((current) => ({ ...current, quantity: "" }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (submittingRef.current) return;

		const nextErrors = {};
		const cleanName = name.trim();
		const parsedPhone = parsePhoneNumberFromString(phone || "");

		if (!cleanName || cleanName.length > 100) nextErrors.name = booking.nameRequired;
		if (!phone.trim()) nextErrors.phone = booking.phoneRequired;
		else if (!parsedPhone?.isValid()) nextErrors.phone = booking.phoneInvalid;
		if (
			!Number.isSafeInteger(quantity) ||
			quantity < 1 ||
			!Number.isSafeInteger(quantity * NATIONAL_DAY_PRICE_SAR)
		) {
			nextErrors.quantity = booking.quantityInvalid;
		}

		setErrors(nextErrors);
		if (Object.keys(nextErrors).length) return;

		submittingRef.current = true;
		setSubmitting(true);
		try {
			if (availability !== "available") {
				await loadAvailability();
				throw new Error("availability_changed");
			}

			const countryCallingCode = `+${parsedPhone.countryCallingCode}`;
			const nationalNumber = parsedPhone.nationalNumber.replace(/^0+/, "");
			const sessionResponse = await fetch("/api/national-day/payment-session", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: cleanName,
					whatsapp: nationalNumber,
					whatsapp_country_code: countryCallingCode,
					country_name: countryName.trim(),
					quantity,
				}),
			});
			const sessionResult = await sessionResponse.json().catch(() => null);
			if (!sessionResponse.ok || !sessionResult?.status || !sessionResult?.data?.session) {
				if (sessionResult?.code === "unavailable") {
					setAvailability("unavailable");
					throw new Error("availability_changed");
				}
				if (sessionResult?.code === "availability_unavailable") {
					setAvailability("error");
					throw new Error("availability_unavailable");
				}
				if (sessionResult?.code === "customer_save_failed") {
					throw new Error("customer_save_failed");
				}
				throw new Error("payment_session_failed");
			}

			const { session, signature } = sessionResult.data;
			const sessionKey = `${NATIONAL_DAY_SESSION_PREFIX}${session.cart_id}`;
			localStorage.setItem(sessionKey, JSON.stringify({ session, signature }));

			const clickpayResponse = await fetch(PAYMENT_INIT_ENDPOINT, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ session, signature, lang }),
			});
			const clickpayResult = await clickpayResponse.json().catch(() => null);
			if (!clickpayResponse.ok || !clickpayResult?.paymentUrl) {
				localStorage.removeItem(sessionKey);
				throw new Error("payment_session_failed");
			}

			window.location.assign(clickpayResult.paymentUrl);
		} catch (error) {
			submittingRef.current = false;
			setSubmitting(false);
			if (error.message === "availability_changed") {
				setErrors((current) => ({ ...current, form: booking.availabilityChanged }));
			} else if (error.message === "availability_unavailable") {
				setErrors((current) => ({ ...current, form: booking.availabilityError }));
			} else if (error.message === "customer_save_failed") {
				setErrors((current) => ({ ...current, form: booking.customerSaveError }));
			} else {
				setErrors((current) => ({ ...current, form: booking.paymentStartError }));
			}
		}
	};

	const total = quantity * NATIONAL_DAY_PRICE_SAR;

	return (
		<section className={`${styles.bookingSection} ${pageStyles.container}`} id="booking" aria-labelledby="booking-title">
			{availability === "checking" ? (
				<div className={`${styles.stateCard} ${styles.loadingCard}`} aria-live="polite">
					<LoaderCircle className={styles.spin} aria-hidden="true" size={34} />
					<p>{booking.checking}</p>
				</div>
			) : availability === "unavailable" ? (
				<div className={`${styles.stateCard} ${styles.unavailableCard}`} role="status">
					<span className={styles.stateIcon}><AlertCircle aria-hidden="true" size={28} /></span>
					<h2>{booking.unavailableTitle}</h2>
					<p>{booking.unavailableCopy}</p>
				</div>
			) : availability === "error" ? (
				<div className={`${styles.stateCard} ${styles.errorCard}`} role="alert">
					<span className={styles.stateIcon}><AlertCircle aria-hidden="true" size={28} /></span>
					<p>{availabilityMessage || booking.availabilityError}</p>
					<button className={styles.retryButton} type="button" onClick={loadAvailability}>
						{booking.retry}
					</button>
				</div>
			) : (
				<div className={styles.bookingShell}>
					<div className={styles.bookingFormWrap}>
						<div className={styles.bookingHeading}>
							<div>
								<span>{booking.eyebrow}</span>
								<h2 id="booking-title">{booking.title}</h2>
								<p>{booking.intro}</p>
							</div>
							<span className={styles.availableBadge}>
								<CheckCircle2 aria-hidden="true" size={16} />
								{lang === "ar" ? "المقاعد متاحة" : "Seats available"}
							</span>
						</div>

						<form className={styles.form} onSubmit={handleSubmit} noValidate>
							<div className={styles.field}>
								<label htmlFor="national-day-name">{booking.name}<span>*</span></label>
								<input
									id="national-day-name"
									name="name"
									autoComplete="name"
									maxLength={100}
									value={name}
									onChange={(event) => {
										setName(event.target.value);
										setErrors((current) => ({ ...current, name: "", form: "" }));
									}}
									placeholder={booking.namePlaceholder}
									disabled={submitting}
									aria-invalid={Boolean(errors.name)}
								/>
								{errors.name && <small className={styles.fieldError}>{errors.name}</small>}
							</div>

							<div className={styles.field}>
								<label htmlFor="national-day-whatsapp">{booking.whatsapp}<span>*</span></label>
								<div className={styles.phoneInput} dir="ltr">
									<PhoneInput
										defaultCountry="sa"
										value={phone}
										onChange={(value) => {
											setPhone(value);
											setErrors((current) => ({ ...current, phone: "", form: "" }));
										}}
										inputProps={{
											id: "national-day-whatsapp",
											name: "whatsapp",
											autoComplete: "tel",
											"aria-invalid": Boolean(errors.phone),
										}}
										forceDialCode
										disabled={submitting}
									/>
								</div>
								{errors.phone && <small className={styles.fieldError}>{errors.phone}</small>}
							</div>

							<div className={styles.field}>
								<label htmlFor="national-day-country">{booking.country}</label>
								<input
									id="national-day-country"
									name="country_name"
									autoComplete="country-name"
									maxLength={100}
									value={countryName}
									onChange={(event) => setCountryName(event.target.value)}
									placeholder={booking.countryPlaceholder}
									disabled={submitting}
								/>
							</div>

							<div className={styles.quantityBlock}>
								<div className={styles.quantityHeading}>
									<label>{booking.quantity}</label>
									<small>{booking.quantityHint}</small>
								</div>
								<div className={styles.quantityControl}>
									<button type="button" onClick={() => handleQuantity(quantity - 1)} disabled={submitting || quantity <= 1} aria-label={booking.decrease}>
										<Minus aria-hidden="true" size={18} />
									</button>
									<strong aria-live="polite">{quantity}</strong>
									<button type="button" onClick={() => handleQuantity(quantity + 1)} disabled={submitting} aria-label={booking.increase}>
										<Plus aria-hidden="true" size={18} />
									</button>
								</div>
							</div>

							{errors.form && <p className={styles.formError} role="alert">{errors.form}</p>}

							<button className={styles.payButton} type="submit" disabled={submitting} aria-busy={submitting}>
								{submitting ? <LoaderCircle className={styles.spin} aria-hidden="true" size={19} /> : <LockKeyhole aria-hidden="true" size={18} />}
								<span>{submitting ? booking.processing : booking.pay}</span>
							</button>
							<p className={styles.onlineOnly}>{booking.onlineOnly}</p>
						</form>
					</div>

					<aside className={styles.bookingSummary} aria-label={lang === "ar" ? "ملخص الحجز" : "Booking summary"}>
						<span className={styles.summaryEyebrow}>{booking.eyebrow}</span>
						<h3>{lang === "ar" ? "جولة المسجد الحرام" : "Grand Mosque Tour"}</h3>
						<div className={styles.summaryRow}><span>{lang === "ar" ? "التاريخ" : "Date"}</span><strong>{lang === "ar" ? "30 سبتمبر 2026" : "September 30, 2026"}</strong></div>
						<div className={styles.summaryRow}><span>{lang === "ar" ? "الوقت" : "Time"}</span><strong>{lang === "ar" ? "9:00 مساءً" : "9:00 PM"}</strong></div>
						<div className={styles.summaryRow}><span>{booking.quantity}</span><strong>{quantity}</strong></div>
						<div className={styles.summaryPrice}>
							<span>{booking.total}</span>
							<strong><bdi>{total}</bdi> {lang === "ar" ? "ريالًا" : "SAR"}</strong>
						</div>
						<p className={styles.summaryNote}>{lang === "ar" ? "96 ريالًا لكل مقعد" : "SAR 96 per seat"}</p>
						<div className={styles.onlineBadge}><LockKeyhole aria-hidden="true" size={17} />{lang === "ar" ? "الدفع الإلكتروني فقط" : "Online payment only"}</div>
					</aside>
				</div>
			)}
		</section>
	);
}
