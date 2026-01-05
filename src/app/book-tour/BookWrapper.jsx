"use client";

import React, { useEffect, useState } from "react";
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
import { format, addDays, startOfToday } from "date-fns";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import PromoCodeSection from "@/components/book-path-new/PromoCodeSection";

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
			date: z
				.date({ invalid_type_error: requiredDate , required_error: requiredDate  })
				.refine(Boolean, { message: requiredDate }),
			time: z
				.object(
					{ id: z.any(), name: z.string() },
					{ invalid_type_error: requiredTime, required_error: requiredTime }
				)
				.refine((v) => v && v.id && v.name, { message: requiredTime }),
			meetingPoint: z
				.object(
					{ id: z.any(), name: z.string() },
					{ invalid_type_error: requiredMeet, required_error: requiredMeet }
				)
				.refine((v) => v && v.id && v.name, { message: requiredMeet }),
			people: z.coerce.number().int().min(1).max(max_people_count).default(1),
			// new: per-age-group quantities
			group_age_counts: z
				.array(
					z.object({
						id: z.coerce.number(),
						quantity: z.coerce.number().int().min(0),
					})
				)
				.default([]),

			name: z.string().min(1, reqName).max(100),
			whatsapp: z.string().min(7, reqPhone),
		})
		.refine(
			(vals) =>
				(vals.group_age_counts || []).reduce(
					(s, r) => s + Number(r.quantity || 0),
					0
				) > 0,
			{
				path: ["group_age_counts"],
				message:
					lang === "ar"
						? "يرجى إضافة شخص واحد على الأقل"
						: "Please add at least one person",
			}
		);
};

export default function BookTourPage({ busData, lang }) {
	const [leftSeats, setLeftSeats] = useState(null);
	const [loading, setLoading] = useState(false);
	const [disabledDays, setDisabledDays] = useState([0, 1, 2, 3, 4, 5, 6]);
	const [dayTimes, setDayTimes] = useState([]);

	// promo state (used by PromoCodeSection and PriceCalculationBox)
	const [promoCode, setPromoCode] = useState("");
	const [promoApplied, setPromoApplied] = useState(false);
	const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);

	// helpers to convert between Day indexes and slugs coming from API
	const slugToIndex = {
		Sun: 0,
		Mon: 1,
		Tue: 2,
		Wed: 3,
		Thur: 4,
		Fri: 5,
		Sat: 6,
	};
	const indexToSlug = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

	// Show toast if payment failed
	useEffect(() => {
		function getQueryParams() {
			if (typeof window !== "undefined") {
				const params = new URLSearchParams(window.location.search);
				if (params.get("status") === "failed") {
					toast.error(
						lang === "ar"
							? "فشلت عملية الدفع. يرجى المحاولة مرة أخرى."
							: "Payment failed. Please try again."
					);
				}
			}
		}
		if (lang) getQueryParams();
	}, [lang]);

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

	// seed group counts: default 1 adult, others 0
	const seedCounts =
		(busData?.group_age_prices || []).map((g, idx) => ({
			id: g.id,
			quantity: idx === 0 ? 1 : 0,
		})) || [];

	const form = useForm({
		resolver: zodResolver(getSchema(lang || "en", leftSeats ?? 20)),
		defaultValues: {
			date: undefined,
			time: undefined,
			meetingPoint: undefined,
			people: seedCounts.reduce((s, r) => s + r.quantity, 0) || 1,
			// new
			group_age_counts: seedCounts,

			name: "",
			whatsapp: "",
		},
		mode: "onSubmit",
	});

	// keep people = sum(group_age_counts)
	useEffect(() => {
		const sub = form.watch((values, { name }) => {
			if (name === "group_age_counts") {
				const total =
					(values.group_age_counts || []).reduce(
						(s, r) => s + Number(r.quantity || 0),
						0
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
						}
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
				(p) => p.id === values.meetingPoint?.id
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

	const onConfirm = form.handleSubmit(async (values) => {
		try {
			setLoading(true); // set loading true on submit
			const selection = {
				date: format(values.date, "yyyy-MM-dd"),
				time: values.time,
				meetingPoint: values.meetingPoint,
				lang,
				bus_id: busData?.id,
				people: values.people,
				// store age counts
				group_age_counts: values.group_age_counts,
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));

			// Parse whatsapp using PhoneInput value (already full international)
			// --- Add whatsapp_country_code and strip leading zero ---
			const whatsappParsed = parsePhoneNumberFromString(values.whatsapp || "");
			const stripLeadingZero = (num) =>
				num && num.startsWith("0") ? num.replace(/^0+/, "") : num;
			const whatsapp = whatsappParsed
				? stripLeadingZero(whatsappParsed.nationalNumber)
				: stripLeadingZero(values.whatsapp);
			const whatsapp_country_code = whatsappParsed
				? whatsappParsed.countryCallingCode
				: "";

			// Build booking payload (+ group_age_counts)
			const payload = {
				name: values.name,
				phone: null,
				whatsapp,
				phone_country_code: null,
				whatsapp_country_code,
				bus_id: busData?.id,
				date: selection.date,
				time_id: selection.time?.id,
				gathering_point_id: Number(selection.meetingPoint?.id),
				people_count: selection.people,
				payment_method: "online",
				promo_code: promoCode ? promoCode : null,
				group_age_counts: (values.group_age_counts || []).map((r) => ({
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
				}
			);
			const json = await res.json();

			if (!res.ok || !json.status) {
				toast.error(
					lang === "ar"
						? "حدث خطأ أثناء إرسال المعلومات"
						: "Something went wrong sending the info"
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
					customer_name: values.name,
					customer_whatsapp: whatsapp_country_code + whatsapp,
				})
			);

			// Payment amount: sum(group price * qty)
			const prices = busData?.group_age_prices || [];
			const counts = values.group_age_counts || [];
			const base = counts.reduce((sum, r) => {
				const gp = prices.find((p) => p.id === r.id);
				return sum + Number(gp?.price || 0) * Number(r.quantity || 0);
			}, 0);

			// apply promo discount on the base (matches PriceCalculationBox)
			const discountAmount = Number(
				((Number(promoDiscountPercent || 0) / 100) * base).toFixed(2)
			);
			const totalBeforeTax = Number((base - discountAmount).toFixed(2));

			// tax applied after discount
			const taxRate = Number(busData?.tax ?? 0);
			const taxAmount = Number((taxRate * totalBeforeTax).toFixed(2));
			const finalTotal = Number((totalBeforeTax + taxAmount).toFixed(2));

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
					failPath: "/book-tour-new",
				}),
			});
			const clickpayJson = await clickpayRes.json();
			if (!clickpayRes.ok || !clickpayJson?.paymentUrl) {
				toast.error(
					clickpayJson?.error ||
						(lang === "ar" ? "فشل بدء الدفع" : "Failed to start payment")
				);
				return;
			}
			window.location.href = clickpayJson.paymentUrl;
		} catch (e) {
			console.error("Booking or ClickPay error", e);
			toast.error(
				lang === "ar"
					? "فشل إرسال المعلومات أو بدء الدفع"
					: "Failed to send info or start payment"
			);
		} finally {
			setLoading(false); // reset loading if error occurs
		} 
	});

	const onCancel = () => {
		if (typeof window !== "undefined") window.history.back();
	};

	if (loading || !busData) return <Loading />;

	const people = form.watch("people") || 1;
	const groupCounts = form.watch("group_age_counts") || [];

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<div className=" bg-[#fafbfc] py-8">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex flex-col-reverse md:flex-row  gap-8 md:gap-12">
						{/* Booking Flow */}
						<div className="md:w-[60%] flex flex-col gap-6">
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
							/>

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
							/>

							<CustomerInfoFields lang={lang} form={form} />

							<ActionButtons
								onConfirm={onConfirm}
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
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
