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
		phone: "Mobile phone",
		whatsapp: "Mobile phone (WhatsApp)",
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
		requiredPhone: "Phone is required",
		requiredEmail: "Email is required",
		invalidEmail: "Invalid email",
		subtotal: "Subtotal",
		tax: "VAT",
		taxValue: "15%",
		totalDollar: "Total in Dollar",
		total: "Total",
		currency: "SAR",
	},
	ar: {
		steps: { choose: "اختر جولتك", info: "أدخل المعلومات", pay: "الدفع" },
		discount: "وفّر أكثر! خصم 10٪ عند الحجز لأكثر من شخصين.",
		title: "ادخل المعلومات",
		peopleCount: "عدد الأشخاص",
		name: "الاسم",
		email: "عنوان البريد الإلكتروني",
		phone: "هاتف محمول",
		whatsapp: "هاتف محمول (واتساب)",
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
		requiredPhone: "رقم الجوال مطلوب",
		requiredEmail: "البريد الإلكتروني مطلوب",
		invalidEmail: "بريد غير صالح",
		subtotal: "المجموع الفرعي",
		tax: "ضريبة القيمة المضافة",
		taxValue: "15٪",
		totalDollar: "الإجمالي المقدر بالدولار",
		total: "الإجمالي",
		currency: CURRENCY_SVG,
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
}) {
	const lang = initialLang === "ar" ? "ar" : "en";
	const t = messages[lang];
	const router = useRouter();
	const [ready, setReady] = useState(true);
	const [isLoading, setIsLoading] = useState(false); // Add loading state
	const isAr = lang === "ar";

	const form = useForm({
		resolver: zodResolver(schemaFor(lang, max_people_count)),
		defaultValues: { people: 1, name: "", email: "", phone: "", whatsapp: "" },
		mode: "onSubmit",
	});

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

		// Save to localStorage under bookTour.selection
		if (typeof window !== "undefined") {
			const prev = localStorage.getItem(STORAGE_KEY);
			let payload = {};
			try {
				payload = prev ? JSON.parse(prev) : {};
			} catch {}
			const next = { ...payload, info };
			localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
		}

		// Compute total amount in SAR (same as UI box)
		const peopleCount = Number(info.people || 1);
		const base = start_price * peopleCount;
		const tax = base * tax_amount;
		const totalSar = Number((base + tax).toFixed(2));

		try {
			// Init URWAY payment
			const res = await fetch("/api/pay/urway/init", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					amount: totalSar,
					lang,
					flow: "bus",
					successPath: "/book-tour-success",
					failPath: "/book-tour",
				}),
			});
			const json = await res.json();
			if (!res.ok || !json?.paymentUrl) {
				throw new Error(json?.error || "Failed to start payment");
			}
			window.location.href = json.paymentUrl;
			// No need to setIsLoading(false) here, as navigation will occur
		} catch (e) {
			console.error("URWAY init error", e);
			toast.error(lang === "ar" ? "فشل بدء الدفع" : "Failed to start payment");
			setIsLoading(false); // Stop loading on error
		}
	};

	if (!ready) return null;

	const colBase = "p-4 md:p-6";

	// Calculation logic
	const people = form.watch("people") || 1;
	const base = (start_price * people).toFixed(2);
	const tax = (start_price * people * tax_amount).toFixed(2);
	const totalSar = (parseFloat(base) + parseFloat(tax)).toFixed(2);
	const totalUsd = (totalSar / 3.75).toFixed(2);

	const priceBox = (
		<div className="w-full flex justify-center my-4 md:col-span-3">
			<div className="w-full max-w-md border-2 border-[var(--main-color,#14532d)] rounded-xl bg-white shadow p-4">
				<div className="flex flex-col gap-2">
					<div className="flex justify-between items-center">
						<span className="text-gray-700 font-medium">{t.subtotal}</span>
						<span className="text-gray-900">{base}</span>
					</div>
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
							</div>
						</div>

						{/* column: People count */}
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
