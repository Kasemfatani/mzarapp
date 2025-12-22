"use client";

import React, { useEffect, useState } from "react";
import { TripSummaryCard } from "@/components/book-haram-new/TripSummaryCard";
import { BookingForm } from "@/components/book-haram-new/BookingForm";
import { PriceCalculationBox } from "@/components/book-haram-new/PriceCalculationBox";
import { CustomerInfoFields } from "@/components/book-haram-new/CustomerInfoFields";
import { ActionButtons } from "@/components/book-haram-new/ActionButtons";

import Loading from "@/app/loading";
import { API_BASE_URL } from "@/lib/apiConfig";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays, startOfToday } from "date-fns";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const STORAGE_KEY = "bookHaramain.selection";

const getSchema = (lang, max_people_count = 20, min_people_count = 1) => {
	const requiredDate =
		lang === "ar" ? "يرجى اختيار تاريخ" : "Please select a date";
	const requiredTime =
		lang === "ar" ? "يرجى اختيار الوقت" : "Please choose a time";
	const reqName = lang === "ar" ? "الاسم مطلوب" : "Name is required";
	const reqPhone =
		lang === "ar" ? "رقم الواتساب مطلوب" : "WhatsApp is required";
	const reqNationality =
		lang === "ar" ? "الجنسية مطلوبة" : "Nationality is required";

	return z.object({
		date: z
			.date({ invalid_type_error: requiredDate })
			.refine(Boolean, { message: requiredDate }),
		time: z
			.object({ id: z.any(), name: z.string() })
			.refine((v) => v && v.id && v.name, { message: requiredTime }),
		people: z.coerce.number().int().min(1).max(max_people_count).default(1),
		name: z.string().min(1, reqName).max(100),
		whatsapp: z.string().min(7, reqPhone),
		country_id: z.coerce.number().min(1, reqNationality),
	});
};

export default function BookTourPage({  lang, busData , disabledDays = []}) {
	const [leftSeats, setLeftSeats] = useState(null);
	const [loading, setLoading] = useState(false);

	console.log("BookWrapper busData:", busData);

	const today = startOfToday();
	const defaultDate = addDays(today, 1);

	const form = useForm({
		resolver: zodResolver(
			getSchema(lang || "en", leftSeats ?? 20, busData?.min_people_count ?? 1)
		),
		defaultValues: {
			date: undefined,
			time: undefined,
			people: busData?.min_people_count ?? 1,
			name: "",
			whatsapp: "",
			country_id: undefined,
		},
		mode: "onSubmit",
	});

	useEffect(() => {
		if (busData?.min_people_count) {
			form.reset({
				date: undefined,
				time: undefined,
				people: busData.min_people_count,
				name: "",
				whatsapp: "",
				country_id: undefined,
			});
		}
		// eslint-disable-next-line
	}, [busData?.min_people_count]);

	// Availability check when date + time change
	useEffect(() => {
		const sub = form.watch((values, { name }) => {
			if (name === "date" || name === "time") {
				const v = form.getValues();
				if (v.date && v.time?.id && busData?.id) {
					const params = new URLSearchParams({
						tour_id: busData.id,
						date: format(v.date, "yyyy-MM-dd"),
						time_id: v.time.id,
					});
					fetch(
						`${API_BASE_URL_NEW}/landing/landing-guided-tour/check-availability?${params.toString()}`,
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
			const selection = {
				date: format(values.date, "yyyy-MM-dd"),
				time: values.time,
				tour_id: busData?.id,
				people: values.people,
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));

			const whatsappParsed = parsePhoneNumberFromString(values.whatsapp || "");
			const stripLeadingZero = (num) =>
				num && num.startsWith("0") ? num.replace(/^0+/, "") : num;
			const whatsapp = whatsappParsed
				? stripLeadingZero(whatsappParsed.nationalNumber)
				: stripLeadingZero(values.whatsapp);
			const whatsapp_country_code = whatsappParsed
				? whatsappParsed.countryCallingCode
				: "";

			const payload = {
				name: values.name,
				phone: null,
				whatsapp,
				phone_country_code: null,
				whatsapp_country_code,
				tour_id: busData?.id,
				date: selection.date,
				time: selection.time?.id,
				people_count: selection.people,
				payment_type: "online",
				promo_code: null,
				country_id: values.country_id, // send selected country id
			};
			console.log("Booking payload:", payload);

			const res = await fetch(
				`${API_BASE_URL_NEW}/landing/landing-guided-tour/booking`,
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

			const { trip_id, customer_id, process_id } = json.data || {};
			const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					...stored,
					trip_id,
					customer_id,
					process_id,

					customer_name: values.name,
					customer_whatsapp: whatsapp_country_code + whatsapp,
				})
			);

			// Payment amount: price * people (UI ignores tax; for payment we can include tax if needed)
			const base = Number(busData?.price || 0) * Number(values.people || 1);
			// const tax = Number(busData?.tax || 0) * base;
			const totalSar = Number(base.toFixed(2));

			console.log(
				"Starting ClickPay payment for amount:",
				totalSar,
				base,
				busData?.price,
				values.people
			);

			const clickpayRes = await fetch("/api/pay/clickpay/init", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					amount: totalSar,
					lang,
					cart_id: process_id,
					customer_details: {
						name: values.name,
						email: "customer@gmail.com",
						whatsapp: whatsapp_country_code + whatsapp,
					},
					successPath: "/book-haram-success",
					failPath: "/book-haram-new",
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

	if (loading) return <Loading />;

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
								// gatheringPoints={busData.gathering_points}
								busId={busData.id}
								leftSeats={leftSeats}
								setLeftSeats={setLeftSeats}
								minSeats={busData.min_people_count}
								disabledDays={disabledDays}
							/>

							<PriceCalculationBox
								startPrice={busData.price}
								minPeople={busData.min_people_count}
								people={people}
								lang={lang}
							/>

							<CustomerInfoFields lang={lang} form={form} />

							<ActionButtons onConfirm={onConfirm} onCancel={onCancel} lang={lang} />
						</div>

						{/* Trip Summary */}
						<div className="md:w-[40%] flex flex-col gap-6">
							<TripSummaryCard
								imageUrl={busData.image}
								location={busData.city}
								rating={busData.rating}
								reviewCount={busData.rating_count}
								title={busData.name}
								subtitle={busData.subtitle ? busData.subtitle : ''} // added fallback to empty string
								duration={busData.duration}
								maxPeople={busData.max_people_count}
								price={busData.price}
								minPeople={busData.min_people_count}
								lang={lang}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
