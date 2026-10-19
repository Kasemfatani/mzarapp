"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { formatHaramDate, formatHaramTime, getHaramSchedule, HARAM_TIME_ID } from "./haramTripSchedule";
import { formatHaramMoney, getHaramOfferPrices, getHaramQuote, HARAM_REFERENCE_PRICE_MARKUP_PERCENT } from "./haramTripPricing";
import styles from "./HaramTripDetail.module.css";

const STORAGE_KEY = "bookHaramain.selection";

function stripLeadingZero(value = "") {
	return value.startsWith("0") ? value.replace(/^0+/, "") : value;
}

async function readJson(response) {
	return response.json().catch(() => ({}));
}

export default function HaramTripBookingSection({
	copy,
	lang,
	bookingData,
	schedule,
	onScheduleChange,
	countryCode = "SA",
}) {
	const isAr = lang === "ar";
	const [name, setName] = useState("");
	const [whatsapp, setWhatsapp] = useState("");
	const [people, setPeople] = useState(Number(bookingData?.min_people_count) || 1);
	const [paymentMethod, setPaymentMethod] = useState("online");
	const [promoCode, setPromoCode] = useState("");
	const [appliedPromo, setAppliedPromo] = useState(0);
	const [promoMessage, setPromoMessage] = useState("");
	const [promoBusy, setPromoBusy] = useState(false);
	const [busy, setBusy] = useState(false);
	const [message, setMessage] = useState("");
	const [availability, setAvailability] = useState({ state: "loading", seats: null, minSeats: null });
	const [availabilityRefresh, setAvailabilityRefresh] = useState(0);

	const minPeople = Math.max(1, Number(availability.minSeats || bookingData?.min_people_count || 1));
	const configuredMaxPeople = Math.max(minPeople, Number(bookingData?.max_people_count || 25));
	const maxPeople = availability.seats === null
		? configuredMaxPeople
		: Math.min(configuredMaxPeople, Number(availability.seats));
	const money = useCallback((amount) => formatHaramMoney(amount, lang), [lang]);
	const basePrice = Number(bookingData?.price || 0);
	const taxRate = Number(bookingData?.tax || 0);
	const offer = getHaramOfferPrices({ price: basePrice, taxRate });
	const quote = useMemo(() => getHaramQuote({
		price: basePrice,
		people,
		taxRate,
		discountPercent: appliedPromo,
		paymentMethod,
	}), [appliedPromo, basePrice, paymentMethod, people, taxRate]);
	const minimumNotMet = availability.state === "available" && Number(availability.seats) < minPeople;
	const soldOut = availability.state === "available" && (Number(availability.seats) < 1 || minimumNotMet);
	const canSubmit = Boolean(
		bookingData && schedule && availability.state === "available" &&
		!soldOut && people >= minPeople && people <= maxPeople && !busy && !promoBusy,
	);

	useEffect(() => {
		try {
			const queryCode = new URLSearchParams(window.location.search).get("promo_code");
			const storedCode = localStorage.getItem("haramPromoCode");
			const expiry = Number(localStorage.getItem("haramPromoCodeExpiry") || 0);
			const saved = storedCode && expiry > Date.now() ? storedCode : "";
			const initialCode = queryCode || saved;
			if (initialCode) setPromoCode(initialCode);
		} catch {
			// Keep the booking usable when storage is unavailable.
		}
	}, []);

	useEffect(() => {
		if (!bookingData?.min_people_count) return;
		setPeople((current) => Math.max(Number(bookingData.min_people_count), Number(current) || 0));
	}, [bookingData?.min_people_count]);

	useEffect(() => {
		if (!schedule?.date || !schedule?.time?.id) {
			setAvailability({ state: "error", seats: null, minSeats: null });
			return undefined;
		}
		const controller = new AbortController();
		setAvailability((current) => ({ ...current, state: "loading" }));
		const params = new URLSearchParams({
			tour_id: String(bookingData?.id || 88),
			date: schedule.date,
			time_id: String(schedule.time.id),
		});
		fetch(`${API_BASE_URL_NEW}/landing/landing-guided-tour/check-availability?${params}`, {
			method: "GET",
			headers: { lang },
			cache: "no-store",
			signal: controller.signal,
		})
			.then(readJson)
			.then((json) => {
				const seats = Number(json?.data?.left_seats);
				if (!json?.status || !json?.data || !Number.isFinite(seats)) {
					throw new Error("Availability response was incomplete");
				}
				setAvailability({
					state: "available",
					seats,
					minSeats: Number(json.data.min_seats || bookingData?.min_people_count || 1),
				});
			})
			.catch((error) => {
				if (error?.name !== "AbortError") setAvailability({ state: "error", seats: null, minSeats: null });
			});
		return () => controller.abort();
	}, [availabilityRefresh, bookingData?.id, bookingData?.min_people_count, lang, schedule?.date, schedule?.time?.id]);

	useEffect(() => {
		if (availability.state !== "available" || availability.seats === null) return;
		if (availability.seats >= minPeople) {
			setPeople((current) => Math.min(Math.max(Number(current) || minPeople, minPeople), Math.min(configuredMaxPeople, availability.seats)));
		}
	}, [availability.seats, availability.state, configuredMaxPeople, minPeople]);

	const applyPromo = async () => {
		if (!promoCode.trim()) {
			setPromoMessage(isAr ? "أدخل رمز الخصم أولًا" : "Enter a promo code first.");
			setAppliedPromo(0);
			return;
		}
		setPromoBusy(true);
		setPromoMessage("");
		try {
			const query = new URLSearchParams({ promo_code: promoCode.trim(), promo_type: "tour" });
			const response = await fetch(`${API_BASE_URL_NEW}/landing/coupons/check?${query}`, {
				method: "GET",
				headers: { lang },
			});
			const json = await readJson(response);
			if (!response.ok || !json?.status || !json?.data) throw new Error(json?.message || copy.promoInvalid);
			const discount = Math.max(0, Number(json.data.discount_value) || 0);
			setAppliedPromo(discount);
			setPromoMessage(copy.promoApplied(discount));
		} catch {
			setAppliedPromo(0);
			setPromoMessage(copy.promoError);
		} finally {
			setPromoBusy(false);
		}
	};

	const recheckAvailability = async () => {
		if (!schedule) return null;
		const params = new URLSearchParams({
			tour_id: String(bookingData?.id || 88),
			date: schedule.date,
			time_id: String(schedule.time?.id || HARAM_TIME_ID),
		});
		const response = await fetch(`${API_BASE_URL_NEW}/landing/landing-guided-tour/check-availability?${params}`, {
			method: "GET",
			headers: { lang },
			cache: "no-store",
		});
		const json = await readJson(response);
		const seats = Number(json?.data?.left_seats);
		const minSeats = Number(json?.data?.min_seats || bookingData?.min_people_count || 1);
		if (!response.ok || !json?.status || !Number.isFinite(seats)) throw new Error(copy.availabilityError);
		setAvailability({
			state: "available",
			seats,
			minSeats,
		});
		return { seats, minSeats };
	};

	const submitBooking = async (event) => {
		event.preventDefault();
		setMessage("");
		if (!name.trim()) {
			setMessage(copy.nameError);
			return;
		}
		const parsedPhone = parsePhoneNumberFromString(whatsapp || "");
		if (!parsedPhone?.isValid()) {
			setMessage(copy.phoneError);
			return;
		}
		const count = Number(people);
		if (!Number.isInteger(count) || count < minPeople || count > maxPeople) {
			setMessage(copy.guestError);
			return;
		}
		const latestSchedule = getHaramSchedule(bookingData, new Date());
		if (!latestSchedule || latestSchedule.date !== schedule?.date) {
			if (latestSchedule) onScheduleChange?.(latestSchedule);
			setMessage(copy.availabilityChanged);
			setAvailabilityRefresh((value) => value + 1);
			return;
		}

		setBusy(true);
		try {
			const { seats: latestSeats, minSeats: latestMinSeats } = await recheckAvailability();
			if (latestSeats < latestMinSeats || count < latestMinSeats || count > latestSeats) {
				setMessage(copy.availabilityChanged);
				return;
			}
			const nationalNumber = stripLeadingZero(parsedPhone.nationalNumber);
			const callingCode = parsedPhone.countryCallingCode;
			const fullNumber = `+${callingCode}${nationalNumber}`;
			const customerPayload = {
				name: name.trim(),
				whatsapp: nationalNumber,
				whatsapp_country_code: callingCode,
				package_id: Number(bookingData?.id || 88),
			};
			const customerResponse = await fetch(`${API_BASE_URL_NEW}/landing/customer/add`, {
				method: "POST",
				headers: { "Content-Type": "application/json", lang },
				body: JSON.stringify(customerPayload),
			});
			const customerJson = await readJson(customerResponse);
			if (!customerResponse.ok || !customerJson?.status) {
				throw new Error(customerJson?.message || copy.bookingError);
			}

			const bookingPayload = {
				name: name.trim(),
				phone: null,
				whatsapp: nationalNumber,
				phone_country_code: null,
				whatsapp_country_code: callingCode,
				tour_id: Number(bookingData?.id || 88),
				date: schedule.date,
				time: Number(schedule.time?.id || HARAM_TIME_ID),
				people_count: count,
				payment_type: paymentMethod,
				promo_code: appliedPromo > 0 ? promoCode.trim() : null,
			};
			const bookingResponse = await fetch(`${API_BASE_URL_NEW}/landing/landing-guided-tour/booking`, {
				method: "POST",
				headers: { "Content-Type": "application/json", lang },
				body: JSON.stringify(bookingPayload),
			});
			const bookingJson = await readJson(bookingResponse);
			if (!bookingResponse.ok || !bookingJson?.status || !bookingJson?.data) {
				throw new Error(bookingJson?.message || copy.bookingError);
			}
			const { trip_id, customer_id, process_id } = bookingJson.data;
			if (!trip_id || !customer_id || !process_id) throw new Error(copy.bookingError);
			const cartId = `${process_id}_${Date.now()}`;
			const finalQuote = getHaramQuote({
				price: basePrice,
				people: count,
				taxRate,
				discountPercent: appliedPromo,
				paymentMethod,
			});
			const selection = {
				date: schedule.date,
				time: { id: Number(schedule.time?.id || HARAM_TIME_ID), name: schedule.time?.name || schedule.time?.time || "20:30:00" },
				tour_id: Number(bookingData?.id || 88),
				people: count,
				trip_id,
				customer_id,
				process_id,
				cart_id: cartId,
				customer_name: name.trim(),
				customer_whatsapp: `${callingCode}${nationalNumber}`,
				finalTotal: finalQuote.total,
				tax: finalQuote.tax,
				promoCode: appliedPromo > 0 ? promoCode.trim() : "",
				paymentMethod,
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));

			if (paymentMethod === "cash") {
				window.location.href = "/book-haram-success?status=success&tranRef=cash";
				return;
			}

			const paymentResponse = await fetch("/api/pay/clickpay/init", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					amount: finalQuote.total,
					lang,
					cart_id: cartId,
					customer_details: {
						name: name.trim(),
						email: "customer@gmail.com",
						whatsapp: fullNumber,
					},
					successPath: "/book-haram-success",
					failPath: "/book-haram",
				}),
			});
			const paymentJson = await readJson(paymentResponse);
			if (!paymentResponse.ok || !paymentJson?.paymentUrl) throw new Error(paymentJson?.error || copy.paymentError);
			window.location.href = paymentJson.paymentUrl;
		} catch (error) {
			setMessage(error?.message || copy.bookingError);
		} finally {
			setBusy(false);
		}
	};

	const dateText = schedule ? formatHaramDate(schedule.date, lang) : copy.scheduleUnavailable;
	const timeText = schedule ? formatHaramTime(schedule.time?.time, lang) : "";
	const capacityText = soldOut
		? copy.soldOut
		: availability.state === "loading"
		? copy.checkingSeats
		: availability.state === "error"
			? copy.availabilityError
			: `${availability.seats} ${copy.seatsLeft}`;

	return (
		<section className={styles.bookingSection} id="booking" aria-labelledby="haram-booking-title">
			<div className={styles.bookingCard}>
				<div className={styles.bookingOffer}>
					<strong>{copy.specialOffer}</strong>
					<span>{copy.offerReferenceNote(HARAM_REFERENCE_PRICE_MARKUP_PERCENT)}</span>
				</div>
				<div className={styles.bookingBody}>
					{/* <p className={styles.eyebrow}>{copy.bookingDescription}</p> */}
					<h2 id="haram-booking-title">{copy.bookingTitle}</h2>
					<div className={styles.priceLine}>
						<strong>{money(offer.currentPrice)}</strong>
						<del>{money(offer.originalPrice)}</del>
						<span>{copy.pricePerPerson}</span>
					</div>
					<p className={styles.taxNote}>{copy.vatIncluded}</p>
					<div className={styles.scheduleBox}>
						<div className={styles.scheduleHeader}><span>{copy.detailLabels[0]}</span><span className={styles.scheduleDot} /></div>
						<strong>{dateText}</strong>
						<span>{copy.wednesdayOnly} · {timeText || "8:30 PM"}</span>
						<small>{copy.saudiTime}</small>
					</div>
					<div className={styles.availabilityLine} aria-live="polite">
						<span className={availability.state === "available" && !soldOut ? styles.availableDot : styles.unavailableDot} />
						<span>{availability.state === "error" ? copy.availabilityError : capacityText}</span>
						{availability.state === "error" && <button type="button" onClick={() => setAvailabilityRefresh((value) => value + 1)} disabled={busy}>{copy.retry}</button>}
					</div>
					{!bookingData && <p className={styles.inlineError} role="status">{copy.bookingUnavailable}</p>}
					{schedule && <form className={styles.form} onSubmit={submitBooking}>
						<label className={styles.field}>
							<span>{copy.name}</span>
							<input autoComplete="name" type="text" value={name} onChange={(event) => setName(event.target.value)} maxLength={100} placeholder={copy.namePlaceholder} disabled={busy} required />
						</label>
						<label className={styles.field}>
							<span>{copy.whatsapp}</span>
							<div className={styles.phoneInput} dir="ltr">
								<PhoneInput
									defaultCountry={(countryCode || "SA").toLowerCase()}
									value={whatsapp}
									onChange={setWhatsapp}
									forceDialCode
									inputProps={{ autoComplete: "tel", inputMode: "tel", "aria-label": copy.whatsapp }}
									disabled={busy}
								/>
							</div>
							<small className={styles.fieldHint}>{copy.whatsappHint}</small>
						</label>
						<div className={styles.field}>
							<div className={styles.counterLabel}>
								<span>{copy.guests}</span>
								<small>{copy.guestRange(minPeople, Math.max(minPeople, maxPeople))}</small>
							</div>
							<div className={styles.counter}>
								<button type="button" aria-label={copy.decrease} onClick={() => setPeople((value) => Math.max(minPeople, Number(value) - 1))} disabled={busy || people <= minPeople}>−</button>
								<output aria-live="polite">{people}</output>
								<button type="button" aria-label={copy.increase} onClick={() => setPeople((value) => Math.min(maxPeople, Number(value) + 1))} disabled={busy || availability.state !== "available" || people >= maxPeople}>+</button>
							</div>
						</div>
						<fieldset className={styles.paymentMethods} disabled={busy}>
							<legend>{copy.payment}</legend>
							<label className={paymentMethod === "online" ? styles.paymentSelected : ""}>
								<input type="radio" name="haram-payment" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
								<span>{copy.online}</span><small>{copy.onlineHint}</small>
							</label>
							<label className={paymentMethod === "cash" ? styles.paymentSelected : ""}>
								<input type="radio" name="haram-payment" value="cash" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} />
								<span>{copy.cash}</span><small>{copy.cashHint}</small>
							</label>
						</fieldset>
						<div className={styles.promoBox}>
							<label htmlFor="haram-promo">{copy.promo}</label>
							<div className={styles.promoRow}>
								<input id="haram-promo" value={promoCode} onChange={(event) => { setPromoCode(event.target.value); setAppliedPromo(0); setPromoMessage(""); }} placeholder={copy.promoPlaceholder} disabled={busy || promoBusy} />
								<button type="button" onClick={applyPromo} disabled={busy || promoBusy}>{promoBusy ? "…" : copy.applyPromo}</button>
							</div>
							{promoMessage && <p className={appliedPromo > 0 ? styles.successMessage : styles.inlineError} role="status">{promoMessage}</p>}
						</div>
						<div className={styles.priceSummary} aria-live="polite" aria-atomic="true">
							<h3>{copy.priceSummary}</h3>
							<div><span>{people} × {money(basePrice)}</span><strong>{money(quote.subtotal)}</strong></div>
							{quote.discount > 0 && <div><span>{copy.discount}</span><strong>−{money(quote.discount)}</strong></div>}
							<div><span>{copy.tax}</span><strong>{money(quote.tax)}</strong></div>
							{quote.cashFee > 0 && <div><span>{copy.cashFee}</span><strong>{money(quote.cashFee)}</strong></div>}
							<div className={styles.totalLine}><span>{copy.total}</span><strong>{money(quote.total)}</strong></div>
						</div>
						{message && <p className={styles.inlineError} role="alert">{message}</p>}
						<button className={styles.submitButton} type="submit" disabled={!canSubmit}>
							{busy ? copy.processing : paymentMethod === "cash" ? copy.submitCash : copy.submitOnline}
						</button>
						<p className={styles.terms}>
							{copy.termsPrefix} <a href={`/${lang}/terms-and-conditions`}>{copy.bookingTerms}</a> {copy.and} <a href={`/${lang}/cancellation-policy`}>{copy.cancellationPolicy}</a>.
						</p>
					</form>}
					{!schedule && <p className={styles.inlineError} role="status">{copy.scheduleUnavailable}</p>}
				</div>
				<div className={styles.secureNote}>{copy.secureNote}</div>
			</div>
		</section>
	);
}
