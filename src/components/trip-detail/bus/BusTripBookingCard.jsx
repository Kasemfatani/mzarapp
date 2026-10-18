"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Headphones } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Form } from "@/components/ui/form";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { BusTripPriceSummary } from "./BusTripPriceSummary";
import BusTripPaymentMethodField from "./BusTripPaymentMethodField";
import BusTripSelectionRecap from "./BusTripSelectionRecap";
import { formatBusMoney } from "./busTripPricing";
import styles from "./BusTripBookingCard.module.css";

function formatInputDate(value) {
	if (!value) return "";
	if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
		return value.slice(0, 10);
	}
	const date = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(date.getTime())) return "";
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function getDepartureTimeMeta(time, lang) {
	const isAr = lang === "ar";
	const raw = [time?.name, time?.name_en, time?.name_ar, time?.time, time?.time_string]
		.filter(Boolean)
		.join(" ");
	const normalized = raw.replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
	const clock = normalized.match(/(\d{1,2}):(\d{2})(?::\d{2})?/);
	const hour = clock ? Number(clock[1]) : null;
	const isEvening = /evening|afternoon|\bpm\b|مساء|عصر/.test(normalized.toLowerCase()) || (hour !== null && hour >= 12);
	const period = isEvening ? (isAr ? "مساءً" : "PM") : (isAr ? "صباحًا" : "AM");
	let detail = "";

	if (clock) {
		const hour12 = (hour % 12) || 12;
		const hourText = isAr ? new Intl.NumberFormat("ar-SA", { useGrouping: false }).format(hour12) : String(hour12);
		const minuteText = isAr
			? String(clock[2]).replace(/[0-9]/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)])
			: clock[2];
		detail = hourText + ":" + minuteText + " " + period;
	}

	return {
		departure: isEvening ? "evening" : "morning",
		title: isEvening ? (isAr ? "الجولة المسائية" : "Evening tour") : (isAr ? "الجولة الصباحية" : "Morning tour"),
		detail: detail || time?.time_label || time?.time_label_en || time?.time_label_ar || "",
	};
}

export default function BusTripBookingCard({
	busData,
	lang,
	form,
	countryCode = "SA",
	times = [],
	gatheringPoints = [],
	leftSeats,
	tax = 0,
	maxDate,
	maxPeopleCount = 45,
	adultGroup,
	adultQuantity = 1,
	selectedDeparture = "morning",
	onDepartureChange,
	promoCode = "",
	promoDiscountPercent = 0,
	paymentMethod = "online",
	onPromoApplied,
	onPromoCleared,
	onPaymentMethodChange,
	onSubmitBooking,
	loading = false,
}) {
	const isAr = lang === "ar";
	const values = form.watch();
	const date = values.date;
	const selectedMeetingId = values.meetingPoint?.id ?? "";
	const selectedTimeId = values.time?.id ?? "";
	const errors = form.formState.errors;
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const maxDateValue = useMemo(() => formatInputDate(maxDate), [maxDate]);
	const configuredMaxPeople = Number(maxPeopleCount);
	const fallbackMaxPeople = Number.isFinite(configuredMaxPeople)
		? Math.max(0, configuredMaxPeople)
		: 45;
	const price = (value) => formatBusMoney(value, lang);
	const adultUnitPrice = Number(adultGroup?.price || 0);
	const adultUnitWithTax = adultUnitPrice * (1 + Number(tax || 0));
	const dateValue = formatInputDate(date);
	const [promo, setPromo] = useState(promoCode);
	const [promoLoading, setPromoLoading] = useState(false);
	const [promoMessage, setPromoMessage] = useState("");
	const [promoValid, setPromoValid] = useState(false);

	useEffect(() => {
		if (promoCode) setPromo(promoCode);
	}, [promoCode]);

	const invalidatePromo = useCallback(() => {
		setPromoValid(false);
		setPromoMessage("");
		onPromoCleared?.();
	}, [onPromoCleared]);

	useEffect(() => {
		try {
			const partnerPromo = localStorage.getItem("partnerPromoCode");
			const expiry = localStorage.getItem("partnerPromoCodeExpiry");
			if (partnerPromo && expiry && Date.now() <= Number.parseInt(expiry, 10)) {
				setPromo(partnerPromo);
			} else if (partnerPromo) {
				localStorage.removeItem("partnerPromoCode");
				localStorage.removeItem("partnerPromoCodeExpiry");
			}
		} catch {
			// Ignore unavailable local storage.
		}
	}, []);

	useEffect(() => {
		if (!times.length) return;
		const preferredTime = times.find((time) => {
			const label = [time.name, time.name_en, time.name_ar, time.time, time.time_string]
				.filter(Boolean)
				.join(" ")
				.toLowerCase();
			if (selectedDeparture === "morning") {
				return /morning|\bam\b|صباح|07:|7:00|٧:٠٠|٧ صباح/.test(label);
			}
			return /evening|afternoon|\bpm\b|مساء|عصر|16:|4:00|٤:٠٠|٤ عصر/.test(label);
		});
		const selectedTime = preferredTime || (times.length === 1 ? times[0] : undefined);
		if (selectedTime) {
			const currentTimeId = form.getValues("time")?.id;
			if (currentTimeId && String(currentTimeId) !== String(selectedTime.id)) {
				invalidatePromo();
			}
			const timeMeta = getDepartureTimeMeta(selectedTime, lang);
			if (timeMeta.departure !== selectedDeparture) onDepartureChange?.(timeMeta.departure);
			form.setValue("time", { id: selectedTime.id, name: selectedTime.name }, {
				shouldDirty: true,
				shouldValidate: true,
			});
		} else if (form.getValues("time")) {
			form.setValue("time", undefined, { shouldValidate: false });
		}
	}, [form, invalidatePromo, lang, onDepartureChange, selectedDeparture, times]);

	const applyPromo = async () => {
		if (!promo.trim()) {
			setPromoMessage(isAr ? "أدخل كود الخصم أولًا" : "Enter a promo code first.");
			setPromoValid(false);
			return;
		}
		setPromoLoading(true);
		setPromoMessage("");
		setPromoValid(false);
		try {
			const query = new URLSearchParams({ promo_code: promo.trim(), promo_type: "bus" });
			const response = await fetch(`${API_BASE_URL_NEW}/landing/coupons/check?${query}`, {
				method: "GET",
				headers: { lang },
			});
			const result = await response.json();
			if (!response.ok || !result?.status || !result?.data) {
				throw new Error(result?.message || (isAr ? "رمز الخصم غير صالح" : "Invalid promo code."));
			}
			const discountPercent = Number(result.data.discount_value || 0);
			onPromoApplied?.({ code: promo.trim(), discountPercent });
			setPromoMessage(isAr ? `تم تطبيق الخصم (${discountPercent}٪)` : `Discount applied (${discountPercent}%).`);
			setPromoValid(true);
		} catch (error) {
			setPromoMessage(error.message || (isAr ? "فشل التحقق من الرمز" : "Could not check the promo code."));
			setPromoValid(false);
			onPromoCleared?.();
		} finally {
			setPromoLoading(false);
		}
	};

	const setMeetingPoint = (event) => {
		invalidatePromo();
		const selected = gatheringPoints.find((point) => String(point.id) === event.target.value);
		form.setValue(
			"meetingPoint",
			selected ? { id: selected.id, name: selected.name } : undefined,
			{ shouldDirty: true, shouldValidate: true },
		);
		form.setValue("date", undefined, { shouldValidate: false });
		form.setValue("time", undefined, { shouldValidate: false });
	};

	const setDate = (event) => {
		invalidatePromo();
		const value = event.target.value;
		form.setValue("date", value ? new Date(`${value}T12:00:00`) : undefined, {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	const setAdultCount = (next) => {
		const seatLimit = leftSeats !== null && leftSeats !== undefined && Number.isFinite(Number(leftSeats))
			? Number(leftSeats)
			: fallbackMaxPeople;
		const safeCount = Math.max(1, Math.min(seatLimit, Number(next)));
		if (!adultGroup) return;
		invalidatePromo();
		form.setValue("group_age_counts", [{ id: adultGroup.id, quantity: safeCount }], {
			shouldDirty: true,
			shouldValidate: true,
		});
		form.setValue("people", safeCount, { shouldDirty: true, shouldValidate: true });
	};

	const meetingPoint = gatheringPoints.find((point) => String(point.id) === String(selectedMeetingId));
	const selectedTime = times.find((time) => String(time.id) === String(selectedTimeId));
	const selectedTimeMeta = selectedTime ? getDepartureTimeMeta(selectedTime, lang) : null;
	const departureName = selectedTimeMeta?.title || (selectedDeparture === "morning"
		? (isAr ? "الجولة الصباحية" : "Morning tour")
		: (isAr ? "الجولة المسائية" : "Evening tour"));
	const departureSummary = [departureName, selectedTimeMeta?.detail].filter(Boolean).join(" · ");
	const noTimes = Boolean(date && times.length === 0);
	const maxCount = leftSeats !== null && leftSeats !== undefined && Number.isFinite(Number(leftSeats))
		? Number(leftSeats)
		: fallbackMaxPeople;
	const payDisabled = loading || promoLoading || noTimes || maxCount < 1 || (typeof leftSeats === "number" && leftSeats < 1);

	return (
		<div className={styles.card} lang={isAr ? "ar" : "en"} dir={isAr ? "rtl" : "ltr"}>
			<div className={styles.cardHeader}>
				<p className={styles.eyebrow}>{isAr ? "حجز سريع · خطوة واحدة" : "Quick booking · One step"}</p>
				<h2 id="bus-booking-title">{isAr ? "احجز جولتك بسهولة" : "Book your tour with ease"}</h2>
				<div className={styles.unitPrice}>
					<strong>{price(adultUnitWithTax)}</strong>
					<span>{isAr ? "للبالغ • شامل الضريبة" : "per adult • tax included"}</span>
				</div>
				<div className={styles.audioNote}>
					<span aria-hidden="true"><Headphones size={16} strokeWidth={2} /></span>
					{isAr ? "يشمل إرشادًا سياحيًا صوتيًا بلغتك" : "Includes audio tour guidance in your language"}
				</div>
			</div>

			<Form {...form}>
				<div className={styles.fields}>
					<label className={styles.field}>
						<span>{isAr ? "تاريخ الجولة *" : "Tour date *"}</span>
						<input
							id="bus-tour-date"
							type="date"
							min={formatInputDate(today)}
							max={maxDateValue || undefined}
							value={dateValue}
							disabled={loading}
							onChange={setDate}
							required
						/>
						{errors.date && <small className={styles.error}>{errors.date.message}</small>}
					</label>

					<fieldset className={styles.fieldset} disabled={loading}>
						<legend>{isAr ? "الجولة *" : "Departure *"}</legend>
						<div className={styles.timeOptions + (times.length === 1 ? " " + styles.singleTimeOption : "")}>
							{times.map((time) => {
								const active = String(selectedTimeId) === String(time.id);
								const timeMeta = getDepartureTimeMeta(time, lang);
								return (
									<label
										key={time.id}
										className={styles.timeOption + (active ? " " + styles.activeOption : "")}
										aria-label={[timeMeta.title, timeMeta.detail].filter(Boolean).join(" ")}
									>
										<input
											type="radio"
											name="bus-departure-time"
											value={time.id}
											checked={active}
											onChange={() => {
												if (String(selectedTimeId) !== String(time.id)) invalidatePromo();
												onDepartureChange?.(timeMeta.departure);
												form.setValue("time", { id: time.id, name: time.name }, { shouldDirty: true, shouldValidate: true });
											}}
										/>
										<span className={styles.timeOptionCopy}>
											<strong>{timeMeta.title}</strong>
											{timeMeta.detail && <small>{timeMeta.detail}</small>}
										</span>
									</label>
								);
							})}
							{times.length === 0 && (
								<p className={styles.hint}>
									{isAr
									? date ? "لا توجد مواعيد متاحة لهذا التاريخ." : "اختر نقطة التجمع والتاريخ لعرض الأوقات المتاحة."
									: date ? "No departures are available for this date." : "Choose a meeting point and date to see available times."}
								</p>
							)}
						</div>
						{errors.time && <small className={styles.error}>{errors.time.message}</small>}
					</fieldset>

					<label className={styles.field}>
						<span>{isAr ? "نقطة التجمع *" : "Meeting point *"}</span>
						<select value={selectedMeetingId} onChange={setMeetingPoint} disabled={loading} required>
							<option value="" disabled>{isAr ? "اختر نقطة التجمع" : "Choose a meeting point"}</option>
							{gatheringPoints.map((point) => <option key={point.id} value={point.id}>{point.name}</option>)}
						</select>
						{meetingPoint?.lat && meetingPoint?.lng && (
							<a className={styles.mapLink} href={`https://www.google.com/maps/search/?api=1&query=${meetingPoint.lat},${meetingPoint.lng}`} target="_blank" rel="noreferrer">
								{isAr ? "⌖ عرض نقطة التجمع على الخريطة" : "⌖ View meeting point on map"}
							</a>
						)}
						{errors.meetingPoint && <small className={styles.error}>{errors.meetingPoint.message}</small>}
					</label>

					<div className={styles.counterField}>
						<div className={styles.counterHeading}>
							<strong>{isAr ? "عدد البالغين *" : "Number of adults *"}</strong>
							{typeof leftSeats === "number" && <span>{isAr ? `المقاعد المتاحة: ${leftSeats}` : `${leftSeats} seats available`}</span>}
						</div>
						<div className={styles.counterRow}>
							<p>{adultGroup?.name || (isAr ? "بالغ، ١٢ سنة فأكثر" : "Adult, 12 years and over")}<small>{price(adultUnitWithTax)} {isAr ? "للشخص" : "per person"}</small></p>
							<div className={styles.counter}>
								<button type="button" aria-label={isAr ? "تقليل عدد البالغين" : "Fewer adults"} onClick={() => setAdultCount(adultQuantity - 1)} disabled={adultQuantity <= 1 || loading}>−</button>
								<output aria-live="polite" aria-label={isAr ? "عدد البالغين" : "Number of adults"}>{adultQuantity}</output>
								<button type="button" aria-label={isAr ? "زيادة عدد البالغين" : "More adults"} onClick={() => setAdultCount(adultQuantity + 1)} disabled={adultQuantity >= maxCount || loading}>+</button>
							</div>
						</div>
						<p className={styles.childrenNote}>{isAr ? "الأطفال دون ١٢ سنة مجانًا. أدخل عدد البالغين فقط." : "Children under 12 go free. Count adults only."}</p>
						{errors.group_age_counts && <small className={styles.error}>{errors.group_age_counts.message}</small>}
					</div>

					<label className={styles.field}>
						<span>{isAr ? "الاسم الكامل *" : "Full name *"}</span>
						<input {...form.register("name")} autoComplete="name" type="text" maxLength={100} placeholder={isAr ? "اسم صاحب الحجز" : "Booking holder’s name"} disabled={loading} required />
						{errors.name && <small className={styles.error}>{errors.name.message}</small>}
					</label>

					<label className={styles.field}>
						<span>{isAr ? "رقم الواتساب *" : "WhatsApp number *"}</span>
						<div className={styles.phoneInput} dir="ltr">
							<PhoneInput
								defaultCountry={countryCode ? countryCode.toLowerCase() : "sa"}
								value={values.whatsapp || ""}
								onChange={(value) => form.setValue("whatsapp", value, {
									shouldDirty: true,
									shouldValidate: Boolean(form.formState.errors.whatsapp),
								})}
								forceDialCode
								disabled={loading}
							/>
						</div>
						{errors.whatsapp && <small className={styles.error}>{errors.whatsapp.message}</small>}
					</label>

					<BusTripPaymentMethodField
						lang={lang}
						value={paymentMethod}
						onChange={(method) => {
							invalidatePromo();
							onPaymentMethodChange?.(method);
						}}
						disabled={loading || promoLoading}
					/>

					<div className={styles.promoField}>
						<label className={styles.promoLabel} htmlFor="bus-promo-code">
							{isAr ? "البرومو كود (اختياري)" : "Promo code (optional)"}
						</label>
						<div className={styles.promoRow}>
							<input
								id="bus-promo-code"
								value={promo}
								onChange={(event) => {
									setPromo(event.target.value);
									invalidatePromo();
								}}
								placeholder={isAr ? "أدخل كود الخصم" : "Enter promo code"}
								disabled={loading || promoLoading}
							/>
							<button type="button" onClick={applyPromo} disabled={loading || promoLoading || !promo.trim()}>
								{promoLoading ? "…" : isAr ? "تطبيق" : "Apply"}
							</button>
						</div>
						{promoMessage && <p className={promoValid ? styles.successText : styles.error}>{promoMessage}</p>}
						{promoDiscountPercent > 0 && <span className={styles.promoApplied}>{isAr ? `تم تطبيق خصم ${promoDiscountPercent}٪` : `${promoDiscountPercent}% discount applied`}</span>}
					</div>

					<BusTripPriceSummary
						adultPrice={adultUnitPrice}
						quantity={adultQuantity}
						tax={tax}
						promoDiscountPercent={promoDiscountPercent}
						paymentMethod={paymentMethod}
						lang={lang}
					/>

					<BusTripSelectionRecap
						lang={lang}
						date={date}
						departure={departureSummary}
						meetingPoint={meetingPoint?.name}
					/>

					<button className={styles.bookingSubmit} type="button" onClick={onSubmitBooking} disabled={payDisabled}>
						{loading
							? (isAr ? "جارٍ المعالجة…" : "Processing…")
							: paymentMethod === "online"
								? (isAr ? "ادفع أونلاين وأكّد الحجز ←" : "Pay online & confirm →")
								: (isAr ? "تأكيد الحجز والدفع نقدًا ←" : "Confirm & pay in cash →")}
					</button>
					<p className={styles.trustNote}>{isAr ? "لن يتم خصم أي مبلغ حتى تأكيد الحجز نهائيًا" : "No amount will be deducted until the booking is fully confirmed."}</p>
					<p className={styles.terms}>
						{isAr ? "بالتأكيد توافق على " : "By confirming, you agree to our "}
						<a href={"/" + lang + "/terms-and-conditions"}>{isAr ? "شروط الحجز" : "booking terms"}</a>
						{isAr ? " و" : " and "}
						<a href={"/" + lang + "/cancellation-policy"}>{isAr ? "سياسة الإلغاء" : "cancellation policy"}</a>.
					</p>
				</div>
			</Form>
		</div>
	);
}
