"use client";

import React, { useCallback, useEffect, useState } from "react";
import { TripSummaryCard } from "@/components/book-components/TripSummaryCard";
import { BookingForm } from "@/components/book-components/BookingForm";
import { PriceCalculationBox } from "@/components/book-components/PriceCalculationBox";
import { CustomerInfoFields } from "@/components/book-components/CustomerInfoFields";
import { ActionButtons } from "@/components/book-components/ActionButtons";

import Loading from "@/app/loading";
import { API_BASE_URL } from "@/lib/apiConfig";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { API_BETA_URL } from "@/lib/apiConfig";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// add analytics import
import { trackBeginCheckout } from "@/lib/analytics";
import { trackAddToCart } from "@/lib/analytics";
import { handleInvalidForm } from "@/lib/formUtils";
import { format, addDays, startOfToday } from "date-fns";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import PromoCodeSection from "@/components/book-path-new/PromoCodeSection";
import BusTripBookingCard from "@/components/trip-detail/bus/BusTripBookingCard";
import { BUS_CASH_FEE_SAR, getBusAdultGroup, getBusTripQuote } from "@/components/trip-detail/bus/busTripPricing";

const STORAGE_KEY = "bookTour.selection";

const getSchema = (lang, max_people_count = 20) => {
	const requiredDate =
		lang === "ar" ? "يرجى اختيار تاريخ" : "Please select a date";
	const requiredTime =
		lang === "ar" ? "يرجى اختيار الوقت" : "Please choose a time";
	const requiredMeet =
		lang === "ar" ? "يرجى اختيار نقطة التجمع" : "Please select a meeting point";
	const reqName = lang === "ar" ? "الاسم مطلوب" : "Name is required";
	const reqPhone =
		lang === "ar" ? "رقم الواتساب مطلوب" : "WhatsApp is required";

	return z
		.object({
			name: z.string().min(1, reqName).max(100),
			whatsapp: z.string().min(7, reqPhone),
			country_id: z.number().optional(),
			date: z
				.date({
					invalid_type_error: requiredDate,
					required_error: requiredDate,
				})
				.refine(Boolean, { message: requiredDate }),
			time: z
				.object(
					{ id: z.any(), name: z.string() },
					{ invalid_type_error: requiredTime, required_error: requiredTime },
				)
				.refine((v) => v && v.id && v.name, { message: requiredTime }),
			meetingPoint: z
				.object(
					{ id: z.any(), name: z.string() },
					{ invalid_type_error: requiredMeet, required_error: requiredMeet },
				)
				.refine((v) => v && v.id && v.name, { message: requiredMeet }),
			people: z.coerce.number().int().min(1).max(max_people_count).default(1),
			// new: per-age-group quantities
			group_age_counts: z
				.array(
					z.object({
						id: z.coerce.number(),
						quantity: z.coerce.number().int().min(0),
					}),
				)
				.default([]),
		})
		.refine(
			(vals) =>
				(vals.group_age_counts || []).reduce(
					(s, r) => s + Number(r.quantity || 0),
					0,
				) > 0,
			{
				path: ["group_age_counts"],
				message:
					lang === "ar"
						? "يرجى إضافة شخص واحد على الأقل"
						: "Please add at least one person",
			},
		);
};

export default function BookTourPage({
	busData,
	lang,
	isSaudi = true,
	countryCode = "SA",
	variant = "default",
	selectedDeparture = "morning",
	onDepartureChange,
}) {
	const isSidebar = variant === "sidebar";
	const agePrices = busData?.group_age_prices || [];
	const adultGroup = getBusAdultGroup(agePrices);
	const [leftSeats, setLeftSeats] = useState(null);
	const [loading, setLoading] = useState(false);
	const [disabledDays, setDisabledDays] = useState([0, 1, 2, 3, 4, 5, 6]);
	const [dayTimes, setDayTimes] = useState([]);

	// promo state (used by PromoCodeSection and PriceCalculationBox)
	const [promoCode, setPromoCode] = useState("");
	const [promoApplied, setPromoApplied] = useState(false);
	const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);
	const [paymentMethod, setPaymentMethod] = useState("online");
	const clearBusPromo = useCallback(() => {
		setPromoCode("");
		setPromoApplied(false);
		setPromoDiscountPercent(0);
	}, []);

	const [isPartOneSubmitted, setIsPartOneSubmitted] = useState(false);

	// helpers to convert between Day indexes and slugs coming from API
	const slugToIndex = {
		Sun: 0,
		Mon: 1,
		Tue: 2,
		Wed: 3,
		Thu: 4,
		Fri: 5,
		Sat: 6,
	};
	const indexToSlug = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	// Show toast if payment failed
	useEffect(() => {
		function getQueryParams() {
			if (typeof window !== "undefined") {
				const params = new URLSearchParams(window.location.search);
				if (params.get("status") === "failed") {
					toast.error(
						lang === "ar"
							? "فشلت عملية الدفع. يرجى المحاولة مرة أخرى."
							: "Payment failed. Please try again.",
					);
				}
			}
		}
		if (lang) getQueryParams();
	}, []);

	useEffect(() => {
		if (!busData) return;
		trackAddToCart({
			busData,
		});
	}, []);

	// store promo_code from URL params (overwrites existing partnerPromoCode)
	useEffect(() => {
		if (typeof window === "undefined") return;
		const params = new URLSearchParams(window.location.search);
		const promoFromUrl = params.get("promo_code");
		if (promoFromUrl) {
			localStorage.setItem("partnerPromoCode", promoFromUrl);
		}
	}, []);

	const today = startOfToday();
	const defaultDate = addDays(today, 1);

	// The bus detail page charges adults only; under-12 child counts stay out of this flow.
	const seedCounts =
		(busData?.group_age_prices || []).map((g, idx) => ({
			id: g.id,
			quantity: isSidebar
				? String(g.id) === String(adultGroup?.id) ? 1 : 0
				: idx === 0 ? 1 : 0,
		})) || [];

	const form = useForm({
		resolver: zodResolver(getSchema(
			lang || "en",
			isSidebar ? Number(leftSeats ?? busData?.max_people_count ?? 45) : leftSeats ?? 20,
		)),
		defaultValues: {
			date: undefined,
			time: undefined,
			meetingPoint: undefined,
			people: seedCounts.reduce((s, r) => s + r.quantity, 0) || 1,
			// new
			group_age_counts: seedCounts,

			name: "",
			whatsapp: "",
			country_id: undefined,
		},
		shouldFocusError: false,
		mode: "onSubmit",
	});

	useEffect(() => {
		if (!isSidebar || form.getValues("meetingPoint")) return;
		const points = busData?.gathering_points || [];
		if (points.length === 1) {
			form.setValue("meetingPoint", { id: points[0].id, name: points[0].name });
		}
	}, [form, isSidebar, busData]);

	// keep people = sum(group_age_counts)
	useEffect(() => {
		const sub = form.watch((values, { name }) => {
			if (name === "group_age_counts") {
				const total =
					(values.group_age_counts || []).reduce(
						(s, r) => s + Number(r.quantity || 0),
						0,
					) || 0;
				form.setValue("people", Math.max(1, total), { shouldValidate: true });
			}
		});
		return () => sub.unsubscribe?.();
	}, [form]);

	// Availability check when date + time change
	useEffect(() => {
		const sub = form.watch((values, { name }) => {
			if (name === "date" || name === "time" || name === "meetingPoint") {
				const v = form.getValues();
				if (v.date && v.time?.id && busData?.id && v.meetingPoint?.id) {
					const params = new URLSearchParams({
						bus_id: busData.id,
						date: format(v.date, "yyyy-MM-dd"),
						time_id: v.time.id,
						gathering_point_id: v.meetingPoint.id,
					});
					fetch(
						`${API_BASE_URL_NEW}/landing/landing-bus-trip/check-availability?${params.toString()}`,
						{
							method: "GET",
							headers: { lang: lang || "en" },
						},
					)
						.then((res) => res.json())
						.then((data) => {
							if (data.status && data.data) {
								setLeftSeats(data.data.left_seats);
							} else {
								setLeftSeats(null);
							}
						})
						.catch(() => setLeftSeats(null));
				} else {
					setLeftSeats(null);
				}
			}
		});
		return () => sub.unsubscribe?.();
	}, [form, busData, lang]);

	// Recompute disabledDays and times when meetingPoint or date changes
	useEffect(() => {
		const subscription = form.watch((values, { name }) => {
			const selectedPoint = (busData?.gathering_points || []).find(
				(p) => p.id === values.meetingPoint?.id,
			);

			// If meeting point changed: compute allowed days and reset time
			if (name === "meetingPoint" && selectedPoint) {
				// allowed day indexes from this meeting point
				const allowed = (selectedPoint.days || [])
					.map((d) => slugToIndex[d.slug])
					.filter((n) => typeof n === "number");
				const all = [0, 1, 2, 3, 4, 5, 6];
				setDisabledDays(all.filter((i) => !allowed.includes(i)));

				// clear previously selected time
				form.setValue("time", undefined, { shouldValidate: false });

				// if a date is already chosen, recompute that day's times
				if (values.date) {
					const dayIdx = values.date.getDay();
					const slug = indexToSlug[dayIdx];
					const day = (selectedPoint.days || []).find((d) => d.slug === slug);
					setDayTimes(day?.times || []);
				} else {
					setDayTimes([]);
				}
			}

			// If date changed: compute times for that weekday from the selected meeting point
			if (name === "date") {
				if (selectedPoint && values.date) {
					const dayIdx = values.date.getDay();
					const slug = indexToSlug[dayIdx];
					const day = (selectedPoint.days || []).find((d) => d.slug === slug);
					setDayTimes(day?.times || []);
					// clear time if current selected time is not in the new list
					const hasSelected =
						values.time &&
						(day?.times || []).some((t) => t.id === values.time.id);
					if (!hasSelected) {
						form.setValue("time", undefined, { shouldValidate: false });
					}
				} else {
					setDayTimes([]);
				}
			}
		});
		return () => subscription.unsubscribe?.();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form, busData]);

	const onConfirm = (method) =>
		form.handleSubmit(
			async (values) => {
				const submittedAgeCounts = isSidebar
					? (values.group_age_counts || [])
							.filter((row) => String(row.id) === String(adultGroup?.id))
							.map((row) => ({ ...row, quantity: Number(row.quantity || 0) }))
					: values.group_age_counts || [];
				const bookingValues = isSidebar
					? {
							...values,
							people: submittedAgeCounts.reduce((sum, row) => sum + row.quantity, 0),
							group_age_counts: submittedAgeCounts,
						}
					: values;

				// prevent booking when requested people > available seats
				if (
					typeof leftSeats === "number" &&
					Number(bookingValues.people || 0) > Number(leftSeats)
				) {
					toast.error(
						lang === "ar"
							? `الحد الأقصى للمقاعد المتاحة هو ${leftSeats}`
							: `Available seats limit is ${leftSeats}`,
					);
					return;
				}

				try {
					setLoading(true); // set loading true on submit
					const selection = {
						date: format(values.date, "yyyy-MM-dd"),
						time: values.time,
						meetingPoint: values.meetingPoint,
						lang,
						bus_id: busData?.id,
						people: bookingValues.people,
						paymentMethod: method,
						cashFeeSAR: isSidebar && method === "cash" ? BUS_CASH_FEE_SAR : 0,
						pricingMode: isSidebar ? "trip-96-reference" : "legacy",
						// store age counts
						group_age_counts: bookingValues.group_age_counts,
					};
					localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));

					// Parse whatsapp using PhoneInput value (already full international)
					// --- Add whatsapp_country_code and strip leading zero ---
					const whatsappParsed = parsePhoneNumberFromString(
						values.whatsapp || "",
					);
					const stripLeadingZero = (num) =>
						num && num.startsWith("0") ? num.replace(/^0+/, "") : num;
					const whatsapp = whatsappParsed
						? stripLeadingZero(whatsappParsed.nationalNumber)
						: stripLeadingZero(values.whatsapp);
					const whatsapp_country_code = whatsappParsed
						? whatsappParsed.countryCallingCode
						: "";

					if (isSidebar) {
						const customerResponse = await fetch(
							`${API_BASE_URL_NEW}/landing/customer/add`,
							{
								method: "POST",
								headers: { "Content-Type": "application/json", lang: lang || "en" },
								body: JSON.stringify({
									name: bookingValues.name,
									whatsapp,
									whatsapp_country_code,
									package_id: busData?.id,
								}),
							},
						);
						const customerResult = await customerResponse.json();
						if (!customerResponse.ok || !customerResult?.status) {
							throw new Error(
								customerResult?.message ||
									(lang === "ar"
										? "تعذر حفظ معلومات الحجز"
										: "Could not save your booking details."),
							);
						}
					}

					// Build booking payload (+ group_age_counts)
					const payload = {
						name: bookingValues.name,
						phone: null,
						whatsapp,
						phone_country_code: null,
						whatsapp_country_code,
						bus_id: busData?.id,
						date: selection.date,
						time_id: selection.time?.id,
						gathering_point_id: Number(selection.meetingPoint?.id),
						people_count: selection.people,
						payment_method: method === "cash" ? "cash" : "online",
						...(!isSidebar ? { country_id: values.country_id } : {}),

						promo_code: promoCode ? promoCode : null,
						group_age_counts: bookingValues.group_age_counts.map((r) => ({
							id: Number(r.id),
							quantity: Number(r.quantity || 0),
						})),
					};
					console.log("Booking payload:", payload);

					const res = await fetch(
						`${API_BASE_URL_NEW}/landing/landing-bus-trip/booking`,
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(payload),
						},
					);
					const json = await res.json();

					if (!res.ok || !json.status) {
						toast.error(
							lang === "ar"
								? "حدث خطأ أثناء إرسال المعلومات"
								: "Something went wrong sending the info",
						);
						return;
					}

					const { trip_id, customer_id, process_id, ticket } = json.data || {};

					const cartId = `${process_id}_${Date.now()}`;

					const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
					localStorage.setItem(
						STORAGE_KEY,
						JSON.stringify({
							...stored,
							trip_id,
							customer_id,
							process_id,
							cart_id: cartId,
							ticket,
							// customer_email: values.email,
							customer_name: bookingValues.name,
							customer_whatsapp: whatsapp_country_code + whatsapp,
						}),
					);

					// Payment amount: keep the legacy calculation for standalone booking pages;
					// the integrated trip-96 page uses its tax-inclusive quote and cash fee.
					const prices = busData?.group_age_prices || [];
					const counts = bookingValues.group_age_counts || [];
					const base = counts.reduce((sum, r) => {
						const gp = prices.find((p) => p.id === r.id);
						return sum + Number(gp?.price || 0) * Number(r.quantity || 0);
					}, 0);

					// apply promo discount on the base (matches PriceCalculationBox)
					const discountAmount = Number(
						((Number(promoDiscountPercent || 0) / 100) * base).toFixed(2),
					);
					const totalBeforeTax = Number((base - discountAmount).toFixed(2));

					const taxRate = Number(busData?.tax ?? 0);
					let taxAmount;
					let finalTotal;
					let cashFeeSAR = 0;
					if (isSidebar) {
						const quote = getBusTripQuote({
							adultUnitPrice: adultGroup?.price,
							adultCount: bookingValues.people,
							taxRate,
							promoDiscountPercent,
							paymentMethod: method,
						});
						taxAmount = quote.taxSAR;
						finalTotal = quote.totalSAR;
						cashFeeSAR = quote.cashFeeSAR;
					} else {
						// Existing standalone booking pages retain their original tax and payment rules.
						taxAmount = Number((taxRate * totalBeforeTax).toFixed(2));
						finalTotal = Number((totalBeforeTax + taxAmount).toFixed(2));
						if (method === "online") {
							const onlineDiscount = Number((base * 0.05).toFixed(2));
							const onlineTaxable = Number((base - discountAmount - onlineDiscount).toFixed(2));
							const onlineTax = Number((taxRate * onlineTaxable).toFixed(2));
							finalTotal = Number((onlineTaxable + onlineTax).toFixed(2));
						}
					}

					// persist useful info for success page analytics / debugging
					try {
						const storedPrev = JSON.parse(
							localStorage.getItem(STORAGE_KEY) || "{}",
						);
						localStorage.setItem(
							STORAGE_KEY,
							JSON.stringify({
								...storedPrev,
								bus_id: busData?.id ?? storedPrev.bus_id,
								bus_name: busData?.name ?? storedPrev.bus_name,
								finalTotal,
								promoCode: promoCode || storedPrev.promoCode || "",
								tax: taxAmount,
								paymentMethod: method,
								cashFeeSAR,
								pricingMode: isSidebar ? "trip-96-reference" : "legacy",
								people: selection.people || storedPrev.people || 1,
							}),
						);
					} catch (e) {
						// ignore localStorage errors
					}

					// fire add_to_cart before starting payment (for GA4)
					try {
						trackBeginCheckout({
							busData,
							finalTotal,
							promoCode,
							quantity: selection.people || 1,
							currency: "SAR",
						});
					} catch (e) {
						// non-blocking if analytics fails
						console.warn("trackBeginCheckout failed", e);
					}

					if (finalTotal == 0) {
						// free booking -> redirect to success page with free tranRef
						setLoading(false);
						window.location.href = `/book-tour-success?status=success&tranRef=free`;
						return;
					}

					// Cash booking: skip payment gateway
					if (method === "cash") {
						setLoading(false);
						window.location.href = `/book-tour-success?status=success&tranRef=cash`;
						return;
					}

					console.log("Payment calc:", {
						base,
						discountAmount,
						totalBeforeTax,
						taxRate,
						taxAmount,
						finalTotal,
					});

					const clickpayRes = await fetch("/api/pay/clickpay/init", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							amount: finalTotal,
							lang,
							cart_id: cartId,
							customer_details: {
								name: "",
								email: "customer@gmail.com",
								whatsapp: whatsapp_country_code + whatsapp,
							},
							successPath: "/book-tour-success",
							failPath: "/book-tour",
						}),
					});
					const clickpayJson = await clickpayRes.json();
					if (!clickpayRes.ok || !clickpayJson?.paymentUrl) {
						toast.error(
							clickpayJson?.error ||
								(lang === "ar" ? "فشل بدء الدفع" : "Failed to start payment"),
						);
						return;
					}
					window.location.href = clickpayJson.paymentUrl;
				} catch (e) {
					console.error("Booking or ClickPay error", e);
					toast.error(
						lang === "ar"
							? "فشل إرسال المعلومات أو بدء الدفع"
							: "Failed to send info or start payment",
					);
				} finally {
					setLoading(false); // reset loading if error occurs
				}
			},
			(errors) => {
				// scroll / focus first invalid field
				if (typeof window !== "undefined") handleInvalidForm(form, errors);
			},
		);

	// Two explicit handlers
	const onPayNow = onConfirm("online");
	const onPayCash = onConfirm("cash");

	const onCancel = () => {
		if (typeof window !== "undefined") window.history.back();
	};

	if ((!isSidebar && loading) || !busData) return <Loading />;

	const people = form.watch("people") || 1;
	const groupCounts = form.watch("group_age_counts") || [];

	if (isSidebar) {
		return (
			<BusTripBookingCard
				busData={busData}
				lang={lang}
				form={form}
				countryCode={countryCode}
				times={dayTimes}
				gatheringPoints={busData.gathering_points || []}
				leftSeats={leftSeats}
				tax={typeof busData.tax === "number" ? busData.tax : 0}
				maxDate={busData.last_date}
				maxPeopleCount={busData.max_people_count}
				adultGroup={adultGroup}
				selectedDeparture={selectedDeparture}
				onDepartureChange={onDepartureChange}
				adultQuantity={Number(groupCounts.find((row) => String(row.id) === String(adultGroup?.id))?.quantity || 0)}
				promoCode={promoCode}
				promoDiscountPercent={promoDiscountPercent}
				paymentMethod={paymentMethod}
				onPromoApplied={({ code, discountPercent }) => {
					setPromoCode(code);
					setPromoApplied(true);
					setPromoDiscountPercent(Number(discountPercent || 0));
				}}
				onPromoCleared={clearBusPromo}
				onPaymentMethodChange={(method) => {
					setPaymentMethod(method);
					clearBusPromo();
				}}
				onSubmitBooking={onConfirm(paymentMethod)}
				loading={loading}
			/>
		);
	}

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<div className=" bg-[#fafbfc] py-8">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex flex-col-reverse md:flex-row  gap-8 md:gap-12">
						{/* Booking Flow */}
						<div className="md:w-[60%] flex flex-col gap-6">
							{/* Customer info fields */}
							<CustomerInfoFields
								lang={lang}
								form={form}
								countryCode={countryCode}
								packageId={busData?.id}
								onPartOneSubmit={() => setIsPartOneSubmitted(true)}
								packageName={busData?.name}
							/>

							<div
								className={`transition-opacity duration-500 ${
									isPartOneSubmitted ? "opacity-100" : "opacity-40"
								} `}
							>
								<BookingForm
									lang={lang}
									form={form}
									times={dayTimes}
									gatheringPoints={busData.gathering_points}
									busId={busData.id}
									disabledDays={disabledDays}
									groupAgePrices={busData.group_age_prices || []}
									leftSeats={leftSeats}
									tax={typeof busData?.tax === "number" ? busData.tax : 0}
									isSaudi={isSaudi}
									maxDate={busData.last_date}
								/>
							</div>

							{/* Promo section (after form) */}
							<PromoCodeSection
								lang={lang}
								value={promoCode}
								onApplied={({ code, discountPercent }) => {
									setPromoCode(code);
									setPromoApplied(true);
									setPromoDiscountPercent(Number(discountPercent || 0));
								}}
								onCleared={() => {
									setPromoCode("");
									setPromoApplied(false);
									setPromoDiscountPercent(0);
								}}
								promo_type="bus"
							/>

							<PriceCalculationBox
								startPrice={busData.start_price}
								minPeople={1}
								people={people}
								groupAgePrices={busData.group_age_prices || []}
								groupAgeCounts={groupCounts}
								// tax from API
								tax={typeof busData?.tax === "number" ? busData.tax : 0}
								// apply promo discount
								promoDiscountPercent={promoDiscountPercent}
								lang={lang}
								isSaudi={isSaudi}
							/>

							<ActionButtons
								onConfirm={onPayNow}
								onPayCash={onPayCash}
								onCancel={onCancel}
								lang={lang}
							/>
						</div>

						{/* Trip Summary */}
						<div className="md:w-[40%] flex flex-col gap-6">
							<TripSummaryCard
								imageUrl={busData.image}
								location={busData.city}
								rating={busData.rating}
								reviewCount={busData.rating_count}
								title={busData.name}
								subtitle={busData.subtitle ? busData.subtitle : ""}
								duration={busData.duration}
								maxPeople={busData.max_people_count}
								price={busData.start_price}
								minPeople={busData.min_people_count || 1}
								lang={lang}
								tax={typeof busData?.tax === "number" ? busData.tax : 0}
								isSaudi={isSaudi}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
