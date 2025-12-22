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
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays, startOfToday } from "date-fns";
import { parsePhoneNumberFromString } from "libphonenumber-js";

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
	const reqEmail =
		lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
	const invalidEmail = lang === "ar" ? "بريد غير صالح" : "Invalid email";

	return z.object({
		date: z
			.date({ invalid_type_error: requiredDate })
			.refine(Boolean, { message: requiredDate }),
		time: z
			.object({ id: z.any(), name: z.string() })
			.refine((v) => v && v.id && v.name, { message: requiredTime }),
		meetingPoint: z
			.object({ id: z.any(), name: z.string() })
			.refine((v) => v && v.id && v.name, { message: requiredMeet }),
		people: z.coerce.number().int().min(1).max(max_people_count).default(1),
		name: z.string().min(1, reqName).max(100),
		email: z.string().email(invalidEmail).min(1, reqEmail),
		whatsapp: z.string().min(7, reqPhone),
	});
};

export default function BookTourPage({ tripData }) {
	const [lang, setLang] = useState(null);
	const [leftSeats, setLeftSeats] = useState(null);
	const [busData, setBusData] = useState(null);
	const [loading, setLoading] = useState(true);

	// Read language
	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedLang = localStorage.getItem("lang");
			setLang(storedLang === "ar" ? "ar" : "en");
		}
	}, []);

	// Fetch bus booking data when lang is known
	useEffect(() => {
		let active = true;
		async function fetchData() {
			try {
				setLoading(true);
				const res = await fetch(
					`${API_BASE_URL}/landing/home/bus-booking-data`,
					{
						headers: { lang },
					}
				);
				if (!res.ok)
					throw new Error(`Failed to load bus-booking-data: ${res.status}`);
				const json = await res.json();

				if (active) setBusData(json);
				// console.log("Fetched bus booking data:", json);
			} catch (err) {
				console.error("Error fetching bus booking data:", err);
				if (active) setBusData(null);
			} finally {
				if (active) setLoading(false);
			}
		}
		if (lang) fetchData();
		return () => {
			active = false;
		};
	}, [lang]);

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

	const today = startOfToday();
	const defaultDate = addDays(today, 1);

	const form = useForm({
		resolver: zodResolver(getSchema(lang || "en", leftSeats ?? 20)),
		defaultValues: {
			date: undefined,
			time: undefined,
			meetingPoint: undefined,
			people: 1,
			name: "",
			email: "",
			whatsapp: "",
		},
		mode: "onSubmit",
	});

	// Availability check when date + time change
	useEffect(() => {
		const sub = form.watch((values, { name }) => {
			if (name === "date" || name === "time") {
				const v = form.getValues();
				if (v.date && v.time?.id && busData?.id) {
					const params = new URLSearchParams({
						bus_id: busData.id,
						date: format(v.date, "yyyy-MM-dd"),
						time_id: v.time.id,
					});
					fetch(
						`${API_BASE_URL_NEW}/customer/landing-bus-trip/check-availability?${params.toString()}`,
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
								setLeftSeats(0);
							}
						})
						.catch(() => setLeftSeats(0));
				} else {
					setLeftSeats(null);
				}
			}
		});
		return () => sub.unsubscribe?.();
	}, [form, busData, lang]);

	const onConfirm = form.handleSubmit(async (values) => {
		try {
			// Persist selection (same keys as ChooseTourStep)
			const selection = {
				date: format(values.date, "yyyy-MM-dd"),
				time: values.time,
				meetingPoint: values.meetingPoint,
				lang,
				bus_id: busData?.id,
				people: values.people,
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

			// Build booking payload (same as PersonalInfoStep)
			const payload = {
				name: values.name,
				email: values.email,
				phone: null,
				whatsapp,
				phone_country_code: null,
				whatsapp_country_code,
				bus_id: busData?.id,
				date: selection.date,
				time_id: selection.time?.id,
				meetingPoint_id: Number(selection.meetingPoint?.id),
				people: selection.people,
				payment_method: "online",
				promo_code: null,
			};
				console.log("Booking payload:", payload);
				
			const res = await fetch(
				`${API_BASE_URL_NEW}/customer/landing-bus-trip/booking`,
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
			const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					...stored,
					trip_id,
					customer_id,
					process_id,
					ticket,
					customer_email: values.email,
					customer_name: values.name,
					customer_whatsapp: whatsapp_country_code + whatsapp,
				})
			);

			// Payment amount: start_price * people (UI ignores tax; for payment we can include tax if needed)
			const base =
				Number(busData?.start_price || 0) * Number(values.people || 1);
			// const tax = Number(busData?.tax || 0) * base;
			const totalSar = Number(base.toFixed(2));

			const clickpayRes = await fetch("/api/pay/clickpay/init", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					amount: totalSar,
					lang,
					cart_id: process_id,
					customer_details: {
						name: values.name,
						email: values.email,
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
		}
	});

	const onCancel = () => {
		if (typeof window !== "undefined") window.history.back();
	};

	if (loading || !busData) return <Loading />;

	const people = form.watch("people") || 1;

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
								times={busData.times}
								gatheringPoints={busData.gathering_points}
								busId={busData.id}
								leftSeats={leftSeats}
								setLeftSeats={setLeftSeats}
							/>

							<PriceCalculationBox
								startPrice={busData.start_price}
								minPeople={1}
								people={people}
							/>

							<CustomerInfoFields lang={lang} form={form} />

							<ActionButtons onConfirm={onConfirm} onCancel={onCancel} />
						</div>

						{/* Trip Summary */}
						<div className="md:w-[40%] flex flex-col gap-6">
							<TripSummaryCard {...tripData} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
