"use client";

import React, { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormControl,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import StepsTimelineInfo from "./StepsTimelineInfo";
import { useRouter } from "next/navigation";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { toast } from "sonner";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";

const STORAGE_KEY = "bookTour.selection";

const CURRENCY_SVG = (
	<svg
		viewBox="0 0 1124.14 1256.39"
		width="1em"
		height="1em"
		fill="currentColor"
		style={{ display: "inline", verticalAlign: "top" }}
	>
		<path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
		<path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
	</svg>
);

const messages = {
	en: {
		steps: {
			choose: "Choose Tour",
			info: "Personal Information",
			pay: "Payment",
		},
		discount: "Save more! 10% discount when booking for more than two people.",
		title: "Enter Information",
		peopleCount: "Number of people",
		name: "Full name",
		email: "Email address",
		phone: "Mobile phone (optional)",
		whatsapp: "Mobile phone (WhatsApp)",
		nationality: "Nationality",
		nationalityPlaceholder: "Select nationality",
		placeholders: {
			name: "Your Name",
			email: "example@xyz.com",
			phone: "966 506552589",
			whatsapp: "966 506552589",
		},
		next: "Next",
		pay: "Pay",
		back: "Back",
		missingSelection: "Selection missing. Redirecting…",
		saved: "Saved your info.",
		requiredName: "Name is required",
		requiredPhone: "WhatsApp is required",
		requiredEmail: "Email is required",
		invalidEmail: "Invalid email",
		requiredNationality: "Nationality is required",
		subtotal: "Subtotal",
		discountLabel: "Discount",
		subtotalAfterDiscount: "Subtotal after discount",
		tax: "VAT",
		taxValue: "15%",
		totalDollar: "Total in Dollar",
		total: "Total",
		currency: "SAR",
		promoCode: "Promo Code (optional)",
		promoPlaceholder: "Enter promo code",
		applyBtn: "Apply",
		promoSuccess: "discount applied!",
		promoInvalid: "Invalid promo code",
		promoError: "Failed to check promo code",
	},
	ar: {
		steps: { choose: "اختر جولتك", info: "أدخل المعلومات", pay: "الدفع" },
		discount: "وفّر أكثر! خصم 10٪ عند الحجز لأكثر من شخصين.",
		title: "ادخل المعلومات",
		peopleCount: "عدد الأشخاص",
		name: "الاسم",
		email: "عنوان البريد الإلكتروني",
		phone: "هاتف محمول (اختياري)",
		whatsapp: "هاتف محمول (واتساب)",
		nationality: "الجنسية",
		nationalityPlaceholder: "اختر الجنسية",
		placeholders: {
			name: " اسمك",
			email: "example@xyz.com",
			phone: "966 506552589",
			whatsapp: "966 506552589",
		},
		next: "التالي",
		pay: "الدفع",
		back: "العودة",
		missingSelection: "لا توجد بيانات من الخطوة الأولى. سيتم إعادتك…",
		saved: "تم حفظ معلوماتك.",
		requiredName: "الاسم مطلوب",
		requiredPhone: "رقم الواتساب مطلوب",
		requiredEmail: "البريد الإلكتروني مطلوب",
		invalidEmail: "بريد غير صالح",
		requiredNationality: "الجنسية مطلوبة",
		subtotal: "المجموع الفرعي",
		discountLabel: "الخصم",
		subtotalAfterDiscount: "المجموع بعد الخصم",
		tax: "ضريبة القيمة المضافة",
		taxValue: "15٪",
		totalDollar: "الإجمالي المقدر بالدولار",
		total: "الإجمالي",
		currency: CURRENCY_SVG,
		promoCode: "رمز الخصم (اختياري)",
		promoPlaceholder: "أدخل رمز الخصم",
		applyBtn: "تطبيق",
		promoSuccess: "تم تطبيق الخصم!",
		promoInvalid: "رمز خصم غير صالح",
		promoError: "فشل التحقق من رمز الخصم",
	},
};

function schemaFor(lang, max_people_count) {
	const t = messages[lang];
	return z.object({
		people: z.coerce.number().int().min(1).max(max_people_count).default(1),
		name: z.string().min(1, t.requiredName).max(100),
		email: z.string().email(t.invalidEmail).min(1, t.invalidEmail), // required
		phone: z.string().optional().or(z.literal("")), // optional
		whatsapp: z.string().min(7, t.requiredPhone), // required
	});
}

export default function PersonalInfoStep({
	initialLang = "en",
	max_people_count = 20,
	tax_amount = 0.15,
	start_price = 20,
	minSeats = 1,
	successPath = "/book-tour-success",
	failPath = "/book-tour",
}) {
	const lang = initialLang === "ar" ? "ar" : "en";
	const t = messages[lang];
	const router = useRouter();
	const [ready, setReady] = useState(true);
	const [isLoading, setIsLoading] = useState(false); // Add loading state
	const isAr = lang === "ar";

	// Promo code state (added)
	const [promoCode, setPromoCode] = useState("");
	const [promoApplied, setPromoApplied] = useState(false);
	const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);
	const [promoMessage, setPromoMessage] = useState("");
	const [promoLoading, setPromoLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(schemaFor(lang, max_people_count)),
		defaultValues: {
			people: 1,
			name: "",
			email: "",
			phone: "",
			whatsapp: "",
		},
		mode: "onSubmit",
	});

	// Pre-fill promo code from localStorage on mount
	useEffect(() => {
		const partnerPromo = localStorage.getItem("partnerPromoCode");
		if (partnerPromo) {
			setPromoCode(partnerPromo);
		}
	}, []);

	// Apply promo code
	const handleApplyPromo = async () => {
		if (!promoCode.trim()) {
			setPromoMessage(isAr ? "أدخل رمز الخصم" : "Enter promo code");
			setPromoApplied(false);
			return;
		}
		setPromoLoading(true);
		setPromoMessage("");
		try {
			const res = await fetch(
				`${API_BASE_URL_NEW}/landing/coupons/check?promo_code=${encodeURIComponent(
					promoCode
				)}&promo_type=trip`
			);
			const json = await res.json();
			if (res.ok && json.status && json.data) {
				const discount = json.data.discount_value || 0;
				setPromoDiscountPercent(discount);
				setPromoApplied(true);
				setPromoMessage(`${discount}% ${t.promoSuccess}`);
			} else {
				setPromoApplied(false);
				setPromoDiscountPercent(0);
				setPromoMessage(t.promoInvalid);
			}
		} catch (err) {
			console.error("Promo check error:", err);
			setPromoApplied(false);
			setPromoDiscountPercent(0);
			setPromoMessage(t.promoError);
		} finally {
			setPromoLoading(false);
		}
	};

	const onSubmit = async (values) => {
		setIsLoading(true); // Start loading

		// Parse phone and whatsapp
		const phoneParsed = parsePhoneNumberFromString(values.phone || "");
		const whatsappParsed = parsePhoneNumberFromString(values.whatsapp || "");

		// Remove leading zero if present
		const stripLeadingZero = (num) =>
			num && num.startsWith("0") ? num.replace(/^0+/, "") : num;

		const info = {
			...values,
			phone: phoneParsed
				? stripLeadingZero(phoneParsed.nationalNumber)
				: stripLeadingZero(values.phone),
			phone_country_code: phoneParsed ? phoneParsed.countryCallingCode : "",
			whatsapp: whatsappParsed
				? stripLeadingZero(whatsappParsed.nationalNumber)
				: stripLeadingZero(values.whatsapp),
			whatsapp_country_code: whatsappParsed
				? whatsappParsed.countryCallingCode
				: "",
		};

		// Get selection data from localStorage
		let selection = {};
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) selection = JSON.parse(raw);
		} catch {}

		// Build payload for booking API (include promo_code)
		const payload = {
			name: info.name,
			email: info.email,
			phone: info.phone || null,
			whatsapp: info.whatsapp,
			phone_country_code: info.phone_country_code || null,
			whatsapp_country_code: info.whatsapp_country_code,
			bus_id: selection.bus_id,
			date: selection.date,
			time_id: selection.time?.id,
			meetingPoint_id: Number(selection.meetingPoint.id),
			people: info.people,
			payment_method: "online",
			promo_code: promoApplied ? promoCode : null,
		};
		try {
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
					<>
						{lang === "ar"
							? "حدث خطأ أثناء إرسال المعلومات: "
							: "Something went wrong sending the info: "}
						{json.message}
					</>
				);
				setIsLoading(false);
				return;
			}

			// Save trip_id, customer_id, process_id to localStorage
			const { trip_id, customer_id, process_id, ticket } = json.data || {};
			const updatedSelection = {
				...selection,
				trip_id,
				customer_id,
				process_id,
				ticket,
				customer_email: info.email,
				customer_name: info.name,
				customer_whatsapp: info.whatsapp_country_code + info.whatsapp,
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSelection));

			// Calculate final total for ClickPay payment
			const peopleCount = Number(info.people || 1);
			const base = start_price * peopleCount;
			const discountAmount = promoApplied
				? (base * promoDiscountPercent) / 100
				: 0;
			const baseAfterDiscount = base - discountAmount;
			const tax = baseAfterDiscount * tax_amount;
			const totalSar = Number((baseAfterDiscount + tax).toFixed(2));

			// Use the process_id as the unique cart_id for the transaction
			const cartId = process_id;

			const clickpayRes = await fetch("/api/pay/clickpay/init", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					amount: totalSar,
					lang,
					cart_id: cartId,
					customer_details: {
						name: info.name,
						email: info.email,
						whatsapp: info.whatsapp_country_code + info.whatsapp,
					},
					successPath,
					failPath,
				}),
			});
			const clickpayJson = await clickpayRes.json();
			if (!clickpayRes.ok || !clickpayJson?.paymentUrl) {
				throw new Error(clickpayJson?.error || "Failed to start payment");
			}
			window.location.href = clickpayJson.paymentUrl;
		} catch (e) {
			console.error("Booking or ClickPay error", e);
			toast.error(
				lang === "ar"
					? "فشل إرسال المعلومات أو بدء الدفع"
					: "Failed to send info or start payment"
			);
			setIsLoading(false);
		}
	};

	if (!ready) return null;

	const colBase = "p-4 md:p-6";

	// Calculation logic (apply discount before tax)
	const people = form.watch("people") || 1;
	const base = (start_price * people).toFixed(2);
	const discountAmount = promoApplied
		? ((parseFloat(base) * promoDiscountPercent) / 100).toFixed(2)
		: "0.00";
	const baseAfterDiscount = (
		parseFloat(base) - parseFloat(discountAmount)
	).toFixed(2);
	const tax = (parseFloat(baseAfterDiscount) * tax_amount).toFixed(2);
	const totalSar = (parseFloat(baseAfterDiscount) + parseFloat(tax)).toFixed(2);
	const totalUsd = (totalSar / 3.75).toFixed(2);

	const priceBox = (
		<div className="w-full flex justify-center my-4 md:col-span-3">
			<div className="w-full max-w-md border-2 border-[var(--main-color,#14532d)] rounded-xl bg-white shadow p-4">
				<div className="flex flex-col gap-2">
					<div className="flex justify-between items-center">
						<span className="text-gray-700 font-medium">{t.subtotal}</span>
						<span
							className={cn(
								"text-gray-900",
								promoApplied && "line-through text-gray-500"
							)}
						>
							{base}
						</span>
					</div>
					{promoApplied && (
						<>
							<div className="flex justify-between items-center text-green-600">
								<span className="font-medium">
									{t.discountLabel}
									<span className="inline-block ms-2 bg-green-100 text-[12px] px-2 py-0.5 rounded-full font-bold">
										{promoDiscountPercent}%
									</span>
								</span>
								<span>-{discountAmount}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-gray-700 font-medium">
									{t.subtotalAfterDiscount}
								</span>
								<span className="text-gray-900 font-semibold">
									{baseAfterDiscount}
								</span>
							</div>
						</>
					)}
					<div className="flex justify-between items-center">
						<span className="text-gray-700 font-medium">
							{t.tax}
							<span className="inline-block ms-2 bg-gray-200 text-[12px] px-2 py-0.5 rounded-full font-bold text-green-800">
								{t.taxValue}
							</span>
						</span>
						<span className="text-gray-900">{tax}</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-gray-700 font-medium">{t.totalDollar}</span>
						<span className="text-gray-900">{totalUsd}$</span>
					</div>
					<hr />
					<div className="flex justify-between items-center font-bold text-lg">
						<span>{t.total}</span>
						<span className="flex items-center gap-1 rtl">
							{totalSar}
							<span className="text-[1.2em] ms-1">{CURRENCY_SVG}</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div>
			<section
				id="PersonalInfoStep"
				className="container mx-auto px-6 md:px-20 my-12"
			>
				<h2 className="text-2xl md:text-3xl font-extrabold text-center hidden md:block mb-6">
					{t.title}
				</h2>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className={cn("grid grid-cols-1 gap-4", "md:grid-cols-3")}
					>
						{/* column: Steps column (both first two active) */}
						<StepsTimelineInfo t={t} className="" />

						{/* column: Inputs */}
						<div className={cn(colBase, "md:border-x md:border-dotted")}>
							<div className="grid gap-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t.name}</FormLabel>
											<FormControl>
												<Input
													placeholder={t.placeholders.name}
													className="h-12 shadow-md"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t.email}</FormLabel>
											<FormControl>
												<Input
													placeholder={t.placeholders.email}
													className="h-12 shadow-md ltr"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="whatsapp"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t.whatsapp}</FormLabel>
											<FormControl>
												<div style={{ direction: "ltr" }}>
													<PhoneInput
														defaultCountry="sa"
														value={field.value}
														onChange={field.onChange}
														className="h-full"
														forceDialCode={true}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t.phone}</FormLabel>
											<FormControl className="w-full">
												<div style={{ direction: "ltr" }}>
													<PhoneInput
														defaultCountry="sa"
														value={field.value}
														onChange={field.onChange}
														className=""
														forceDialCode={true}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* column: People count + Promo code */}
						<div className={cn(colBase)}>
							<FormField
								control={form.control}
								name="people"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="mb-2">{t.peopleCount}</FormLabel>
										<FormControl>
											<div className="relative flex items-center justify-center">
												<button
													type="button"
													onClick={() =>
														field.onChange(
															Math.max(minSeats, (field.value || minSeats) - 1)
														)
													}
													className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-lg font-bold px-2 py-1 rounded-full hover:bg-gray-100"
													tabIndex={-1}
													aria-label="Decrease"
												>
													-
												</button>
												<Input
													type="number"
													min={minSeats}
													max={max_people_count}
													step={1}
													{...field}
													className="tour-booking-number-input h-12 shadow-md text-center appearance-none w-full px-10"
													style={{
														MozAppearance: "textfield",
													}}
													onWheel={(e) => e.target.blur()} // prevent accidental scroll
												/>
												<button
													type="button"
													onClick={() =>
														field.onChange(
															Math.min(max_people_count, (field.value || 1) + 1)
														)
													}
													className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-lg font-bold px-2 py-1 rounded-full hover:bg-gray-100"
													tabIndex={-1}
													aria-label="Increase"
												>
													+
												</button>
											</div>
										</FormControl>
										<div className="mt-3 text-center text-base text-blue-600 font-semibold">
											{max_people_count === 0
												? isAr
													? "لا توجد مقاعد متاحة، يرجى تغيير التاريخ أو الوقت."
													: "No seats left, please change date or time."
												: isAr
												? `المقاعد المتبقية: ${max_people_count}`
												: `Seats left: ${max_people_count}`}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Promo Code */}
							<div className="mt-4">
								<label className="block text-sm font-medium mb-2">
									{t.promoCode}
								</label>
								<div className="flex items-center gap-2">
									<Input
										type="text"
										value={promoCode}
										onChange={(e) => setPromoCode(e.target.value)}
										placeholder={t.promoPlaceholder}
										className="h-12 shadow-md flex-1"
										disabled={promoLoading}
									/>
									<Button
										type="button"
										onClick={handleApplyPromo}
										disabled={promoLoading || !promoCode.trim()}
										className="h-12 bg-[var(--main-color,#14532d)] hover:bg-[var(--sec-color,#86efac)] hover:text-black"
									>
										{promoLoading ? "..." : t.applyBtn}
									</Button>
								</div>
								{promoMessage && (
									<p
										className={cn(
											"text-sm mt-2",
											promoApplied ? "text-green-600" : "text-red-600"
										)}
									>
										{promoMessage}
									</p>
								)}
							</div>
						</div>

						{/* Price Calculation Result */}
						{priceBox}

						{/* Actions */}
						<div className="md:col-span-3 flex items-center justify-center mt-4">
							<Button
								type="submit"
								className="min-w-40 bg-[var(--main-color,#14532d)] hover:bg-[var(--sec-color,#86efac)] hover:text-black"
								disabled={isLoading}
							>
								{isLoading ? (
									<span className="flex items-center gap-2">
										{lang === "ar" ? "جاري التحميل..." : "Loading..."}
									</span>
								) : (
									t.pay
								)}
							</Button>
						</div>
					</form>
				</Form>
			</section>
		</div>
	);
}
