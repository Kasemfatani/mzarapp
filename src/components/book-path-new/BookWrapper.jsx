"use client";

import React, { useEffect, useState } from "react";
import { TripSummaryCard } from "@/components/book-path-new/TripSummaryCard";
import { BookingForm } from "@/components/book-path-new/BookingForm";
import { PriceCalculationBox } from "@/components/book-path-new/PriceCalculationBox";
import { CustomerInfoFields } from "@/components/book-path-new/CustomerInfoFields";
import { ActionButtons } from "@/components/book-path-new/ActionButtons";
import PromoCodeSection from "@/components/book-path-new/PromoCodeSection";

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

const STORAGE_KEY = "path.selection";

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
	// new localized address messages
	const reqAddress = lang === "ar" ? "العنوان مطلوب" : "Address is required";
	const reqLat =
		lang === "ar" ? "إحداثيات خط العرض مطلوبة" : "Latitude is required";
	const reqLng =
		lang === "ar" ? "إحداثيات خط الطول مطلوبة" : "Longitude is required";

	return z.object({
		date: z
			.date({ invalid_type_error: requiredDate })
			.refine(Boolean, { message: requiredDate }),
		time: z
			.object({ id: z.any(), name: z.string() })
			.refine((v) => v && v.id && v.name, { message: requiredTime }),
		vehicle: z
			.object({
				id: z.any(),
				name: z.string(),
				number_of_seats: z.number().optional(),
				web_price: z.any().optional(),
				express_price: z.any().optional(),
			})
			.nullable()
			.refine((v) => v && v.id, {
				message: lang === "ar" ? "اختر المركبة" : "Please select vehicle",
			}),
		people: z.coerce.number().int().min(1).max(max_people_count).default(1),
		is_express: z.boolean().default(false),
		add_ons: z.array(z.number()).default([]),
		// new address fields (strings)
		address_name: z.string().min(1, reqAddress),
		address_lat: z.string().min(1, reqLat),
		address_lng: z.string().min(1, reqLng),

		name: z.string().min(1, reqName).max(100),
		whatsapp: z.string().min(7, reqPhone),
	});
};

export default function BookTourPage({ lang, busData, disabledDays = [] }) {
	const [leftSeats, setLeftSeats] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selectedAddons, setSelectedAddons] = useState([]);
	const [promoCode, setPromoCode] = useState("");
	const [promoApplied, setPromoApplied] = useState(false);
	const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);
	// availability state
	const [availability, setAvailability] = useState({
		status: true,
		message: "",
	});

	// console.log("BookWrapper busData:", busData);

	const today = startOfToday();
	const defaultDate = addDays(today, 1);

	const form = useForm({
		resolver: zodResolver(
			getSchema(
				lang || "en",
				busData?.max_people_count ?? 20,
				busData?.min_people_count ?? 1
			)
		),
		defaultValues: {
			date: undefined,
			time: undefined,
			vehicle: undefined,
			people: busData?.min_people_count ?? 1,
			is_express: false,
			add_ons: [],
			// new address defaults
			address_name: "",
			address_lat: "",
			address_lng: "",

			name: "",
			whatsapp: "",
		},
		mode: "onSubmit",
	});

	// sync selectedAddons state into form.add_ons
	useEffect(() => {
		form.setValue("add_ons", selectedAddons);
		// eslint-disable-next-line
	}, [selectedAddons]);

	useEffect(() => {
		if (busData?.min_people_count) {
			form.setValue("people", busData.min_people_count);
		}
		// eslint-disable-next-line
	}, [busData?.min_people_count]);

	useEffect(() => {
		const subscription = form.watch((values, { name }) => {
			if (name === "vehicle") {
				const v = form.getValues();
				const vehicle = v.vehicle;
				if (vehicle?.number_of_seats) {
					const currentPeople = v.people || 1;
					if (currentPeople > vehicle.number_of_seats) {
						form.setValue("people", vehicle.number_of_seats);
					}
				}
			}
		});
		return () => subscription.unsubscribe?.();
	}, [form]);


	// store promo_code from URL params (overwrites existing partnerPromoCode)
	useEffect(() => {
		if (typeof window === "undefined") return;
		const params = new URLSearchParams(window.location.search);
		const promoFromUrl = params.get("promo_code");
		if (promoFromUrl) {
			localStorage.setItem("partnerPromoCode", promoFromUrl);
		}
	}, []);

	// Availability check when date + time change (GET)
	useEffect(() => {
		const sub = form.watch((values, { name }) => {
			if (name === "date" || name === "time") {
				const v = form.getValues();
				if (v.date && v.time?.id && busData?.id) {
					const params = new URLSearchParams({
						package_id: busData.id,
						date: format(v.date, "yyyy-MM-dd"),
						time_id: v.time.id,
					});
					fetch(
						`${API_BASE_URL_NEW}/landing/trip/check-availability?${params.toString()}`,
						{
							method: "GET",
							headers: { lang: lang || "en" },
						}
					)
						.then((res) => res.json())
						.then((data) => {
							// expect { status: boolean, message: string, data: null|... }
							if (data?.status === false) {
								setAvailability({
									status: false,
									message:
										data?.message ||
										(lang === "ar"
											? "الاختيار غير متاح، يرجى تغيير التاريخ أو الوقت."
											: "Selected date/time is not available — please change date or time."),
								});
							} else {
								setAvailability({ status: true, message: "" });
							}
						})
						.catch(() =>
							setAvailability({
								status: true,
								message: "",
							})
						);
				} else {
					// clear availability message when no date/time selected
					setAvailability({ status: true, message: "" });
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
				vehicle: values.vehicle,
				tour_id: busData?.id,
				people: values.people,
				is_express: values.is_express,
				add_ons: values.add_ons || selectedAddons,
				// optional store address
				address_name: values.address_name,
				address_lat: values.address_lat,
				address_lng: values.address_lng,
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
				package_id: busData?.id,
				date: selection.date,
				time_id: selection.time?.id,
				transportation_type_id: selection.vehicle?.id,
				people_count: selection.people,
				payment_type: "online",
				promo_code: promoApplied ? promoCode : null, // <-- include promo
				add_ons: values.add_ons || selectedAddons,
				is_express: !!values.is_express,
				// new address fields in payload
				address_name: values.address_name,
				address_lat: String(values.address_lat),
				address_lng: String(values.address_lng),
			};
			console.log("Booking payload:", payload);

			const res = await fetch(`${API_BASE_URL_NEW}/landing/trip/booking`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			const json = await res.json();

			if (!res.ok || !json.status) {
				toast.error(
					lang === "ar"
						? "حدث خطأ أثناء إرسال المعلومات"
						: "Something went wrong sending the info"
				);
				return;
			}

			const { trip_id, customer_id, ref_no } = json.data || {};

			const cartId = `${ref_no}_${Date.now()}`;

			const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					...stored,
					trip_id,
					customer_id,
					ref_no,
					cart_id: cartId,
					customer_name: values.name,
					customer_whatsapp: whatsapp_country_code + whatsapp,
				})
			);

			// Compute payment amount (must match PriceCalculationBox)
			const vehicle = values.vehicle;
			const isExpressVal = !!values.is_express;
			const rawBase = Number(
				isExpressVal
					? vehicle?.express_price ?? vehicle?.web_price ?? 0
					: vehicle?.web_price ?? 0
			);
			const peopleCount = Number(values.people || 1);
			const selectedAddonsArray =
				(values.add_ons && values.add_ons.length
					? values.add_ons
					: selectedAddons) || [];

			const addonsTotal = selectedAddonsArray.reduce((sum, id) => {
				const a = (busData?.add_ons || []).find((x) => x.id === id);
				if (!a) return sum;
				const multiplier = a.allow_multiple ? peopleCount : 1;
				return sum + Number(a.price || 0) * multiplier;
			}, 0);

			// apply promo discount on the base unit only
			const discountAmount = Number(
				((promoDiscountPercent / 100) * rawBase).toFixed(2)
			);
			const baseUnit = Number((rawBase - discountAmount).toFixed(2));
			const totalBeforeTax = Number((baseUnit + addonsTotal).toFixed(2));
			const taxRate = Number(busData?.tax ?? 0);
			const taxAmount = Number((taxRate * totalBeforeTax).toFixed(2));
			const finalTotal = Number((totalBeforeTax + taxAmount).toFixed(2));

			console.log(
				"Starting ClickPay payment for amount (finalTotal):",
				finalTotal,
				{
					baseUnit,
					addonsTotal,
					totalBeforeTax,
					taxRate,
					taxAmount,
					peopleCount,
				}
			);

			const clickpayRes = await fetch("/api/pay/clickpay/init", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					amount: finalTotal,
					lang,
					cart_id: cartId,
					customer_details: {
						name: '',
						email: "customer@gmail.com",
						whatsapp: whatsapp_country_code + whatsapp,
					},
					successPath: "/book-path-success",
					failPath: `/book-path-new/${busData?.id}`,
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
	const selectedVehicle = form.watch("vehicle");
	const vehicleMaxSeats = selectedVehicle?.number_of_seats ?? null;
	const isExpress = form.watch("is_express") || false; // <-- watch

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
								busId={busData.id}
								minSeats={1}
								disabledDays={disabledDays}
								data={busData}
								addons={busData.add_ons ?? []}
								selectedAddons={selectedAddons}
								setSelectedAddons={setSelectedAddons}
								vehicleMaxSeats={vehicleMaxSeats}
								availability={availability}
							/>

							{/* Promo section (after form) */}
							<PromoCodeSection
								lang={lang}
								value={promoCode}
								onApplied={({ code, discountPercent }) => {
									setPromoCode(code);
									setPromoApplied(true);
									setPromoDiscountPercent(discountPercent);
								}}
								onCleared={() => {
									setPromoCode("");
									setPromoApplied(false);
									setPromoDiscountPercent(0);
								}}
							/>

							<PriceCalculationBox
								vehicle={selectedVehicle}
								addons={busData.add_ons ?? []}
								selectedAddons={selectedAddons}
								people={people}
								isExpress={isExpress}
								lang={lang}
								tax={typeof busData?.tax === "number" ? busData.tax : 0}
								promoDiscountPercent={promoDiscountPercent} // <-- pass discount
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
								subtitle={busData.short_description ? busData.short_description : ""}
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
