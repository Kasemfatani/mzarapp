"use client";

import React, { useEffect, useState } from "react";
import { TripSummaryCard } from "@/components/book-haram-new/TripSummaryCard";
import { BookingForm } from "@/components/book-haram-new/BookingForm";
import { PriceCalculationBox } from "@/components/book-haram-new/PriceCalculationBox";
import { CustomerInfoFields } from "@/components/book-haram-new/CustomerInfoFields";
import { ActionButtons } from "@/components/book-haram-new/ActionButtons";
import PromoCodeSection from "@/components/book-path-new/PromoCodeSection";

import Loading from "@/app/loading";
import { API_BASE_URL } from "@/lib/apiConfig";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
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
		name: z.string().min(1, reqName).max(100),
		whatsapp: z.string().min(7, reqPhone),
		country_id: z.preprocess(
			(val) => {
				if (val === "" || val === null || typeof val === "undefined")
					return undefined;
				return Number(val);
			},
			z
				.number({
					invalid_type_error: reqNationality,
					required_error: reqNationality,
				})
				.min(1, reqNationality),
		),
		date: z
			.date({ invalid_type_error: requiredDate, required_error: requiredDate })
			.refine(Boolean, { message: requiredDate }),
		time: z
			.object(
				{ id: z.any(), name: z.string() },
				{ invalid_type_error: requiredTime, required_error: requiredTime },
			)
			.refine((v) => v && v.id && v.name, { message: requiredTime }),
		people: z.coerce.number().int().min(1).max(max_people_count).default(1),
	});
};

export default function BookTourPage({
	lang,
	busData,
	disabledDays = [],
	isSaudi = true,
	countryCode = "SA",
}) {
	const [leftSeats, setLeftSeats] = useState(null);
	const [loading, setLoading] = useState(false);

	// promo state
	const [promoCode, setPromoCode] = useState("");
	const [promoApplied, setPromoApplied] = useState(false);
	const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);

	const [isPartOneSubmitted, setIsPartOneSubmitted] = useState(false);

	// console.log("BookWrapper busData:", busData);

	const today = startOfToday();
	const defaultDate = addDays(today, 1);

	const form = useForm({
		resolver: zodResolver(
			getSchema(lang || "en", leftSeats ?? 20, busData?.min_people_count ?? 1),
		),
		defaultValues: {
			date: undefined,
			time: undefined,
			people: busData?.min_people_count ?? 1,
			name: "",
			whatsapp: "",
			country_id: undefined,
		},
		shouldFocusError: false,
		mode: "onSubmit",
	});

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
						},
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

	const onConfirm = (method) =>
		form.handleSubmit(
			async (values) => {
				try {
					setLoading(true); // set loading true on submit
					const selection = {
						date: format(values.date, "yyyy-MM-dd"),
						time: values.time,
						tour_id: busData?.id,
						people: values.people,
					};
					localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));

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
						payment_type: method === "cash" ? "cash" : "online",
						promo_code: promoCode ? promoCode : null, // add promo code
						country_id: values.country_id, // send selected country id
					};
					console.log("Booking payload:", payload);

					const res = await fetch(
						`${API_BASE_URL_NEW}/landing/landing-guided-tour/booking`,
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

					const { trip_id, customer_id, process_id } = json.data || {};

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
							customer_name: values.name,
							customer_whatsapp: whatsapp_country_code + whatsapp,
						}),
					);

					// Payment amount: base -> apply promo -> add tax
					const base = Number(busData?.price || 0) * Number(values.people || 1);
					const discountAmount = Number(
						((Number(promoDiscountPercent || 0) / 100) * base).toFixed(2),
					);
					const totalBeforeTax = Number((base - discountAmount).toFixed(2));
					const taxRate = Number(busData?.tax || 0);
					const taxAmount = Number((taxRate * totalBeforeTax).toFixed(2));

					// Initial Total (Before Payment Method Discount)
					let finalTotal = Number((totalBeforeTax + taxAmount).toFixed(2));

					// Apply 5% discount if paying online
					if (method === "online") {
						const onlineDiscount = Number((finalTotal * 0.05).toFixed(2));
						finalTotal = Number((finalTotal - onlineDiscount).toFixed(2));
						console.log(
							"Applying 5% Online Discount. Old Total:",
							(totalBeforeTax + taxAmount).toFixed(2),
							"New Total:",
							finalTotal,
						);
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
						window.location.href = `/book-haram-success?status=success&tranRef=free`;
						return;
					}

					// Cash booking: skip payment gateway
					// Cash pays the full amount (no 5% discount applied above in storage, but usually cash collection logic is separate)
					// Note: If you want the database to record the "Cash" price as the final price,
					// the logic above is correct because 'method === online' is false.
					if (method === "cash") {
						setLoading(false);
						window.location.href = `/book-haram-success?status=success&tranRef=cash`;
						return;
					}

					console.log("Starting ClickPay payment:", {
						base,
						discountPercent: promoDiscountPercent,
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
							amount: finalTotal, // use final total (after promo + tax)
							lang,
							cart_id: cartId,
							customer_details: {
								name: "",
								email: "customer@gmail.com",
								whatsapp: whatsapp_country_code + whatsapp,
							},
							successPath: "/book-haram-success",
							failPath: "/book-haram",
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

	if (loading) return <Loading />;

	const people = form.watch("people") || 1;

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<div className=" bg-[#fafbfc] py-8">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex flex-col-reverse md:flex-row  gap-8 md:gap-12">
						{/* Booking Flow */}
						<div className="md:w-[60%] flex flex-col gap-6">
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
									times={busData.times}
									busId={busData.id}
									leftSeats={leftSeats}
									setLeftSeats={setLeftSeats}
									minSeats={busData.min_people_count}
									disabledDays={disabledDays}
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
								promo_type="tour"
							/>

							<PriceCalculationBox
								startPrice={busData.price}
								minPeople={busData.min_people_count}
								people={people}
								lang={lang}
								tax={typeof busData?.tax === "number" ? busData.tax : 0}
								promoDiscountPercent={promoDiscountPercent}
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
								subtitle={busData.subtitle ? busData.subtitle : ""} // added fallback to empty string
								duration={busData.duration}
								maxPeople={busData.max_people_count}
								price={busData.price}
								minPeople={busData.min_people_count}
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
