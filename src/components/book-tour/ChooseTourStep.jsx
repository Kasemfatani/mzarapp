"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addDays, startOfToday } from "date-fns";
import { arSA, enUS } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormControl,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { CalendarDays, UserRound, CreditCard } from "lucide-react";
import StepsTimeline from "./StepsTimeline";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "bookTour.selection";

const messages = {
	en: {
		steps: {
			choose: "Choose Tour",
			info: "Personal Information",
			pay: "Payment",
		},
		calendar: "Select Date",
		tourType: "Choose Tour Type:",
		morning: "Morning Tour",
		morningTime: "7:00 AM–12:00 PM",
		afternoon: "Afternoon Tour",
		afternoonTime: "4:00 PM–9:00 PM",
		meeting: "Select nearest gathering point:",
		next: "Next",
		saved: "Saved. Proceeding to the next step soon.",
		requiredDate: "Please select a date",
		requiredType: "Please choose a tour type",
		requiredMeet: "Please select a meeting point",
	},
	ar: {
		steps: { choose: "اختر جولتك", info: "أدخل المعلومات", pay: "الدفع" },
		calendar: "اختر التاريخ",
		tourType: "اختيار نوع الجولة:",
		morning: "جولة صباحية",
		morningTime: "7:00 AM–12:00 PM",
		afternoon: "جولة مسائية",
		afternoonTime: "4:00 PM–9:00 PM",
		meeting: "اختيار نقطة التجمع الأقرب:",
		next: "التالي",
		saved: "تم الحفظ. سيتم الانتقال للخطوة التالية قريبًا.",
		requiredDate: "يرجى اختيار تاريخ",
		requiredType: "يرجى اختيار نوع الجولة",
		requiredMeet: "يرجى اختيار نقطة التجمع",
	},
};

const defaultMeetingPoints = {
	en: ["Ghazza Station", "Ajyad", "Behind Clock Towers", "AlSafwa Park"],
	ar: ["محطة الغزة", "أجياد", "خلف أبراج الساعة", "حديقة الصفوة"],
};

const schema = (lang) =>
	z.object({
		date: z
			.date({ invalid_type_error: messages[lang].requiredDate })
			.refine(Boolean, {
				message: messages[lang].requiredDate,
			}),
		tourType: z.enum(["morning", "afternoon"], {
			required_error: messages[lang].requiredType,
			invalid_type_error: messages[lang].requiredType,
		}),
		meetingPoint: z.string().min(1, messages[lang].requiredMeet),
	});

export default function ChooseTourStep({
	initialLang = "en",
	points,
	onSaved, // optional callback for when step is saved
}) {
	const lang = initialLang === "ar" ? "ar" : "en";
	const t = messages[lang];
	const isAr = lang === "ar";

	const form = useForm({
		resolver: zodResolver(schema(lang)),
		defaultValues: {
			date: undefined,
			tourType: undefined,
			meetingPoint: "",
		},
		mode: "onSubmit",
	});

	const router = useRouter();

	// Prefill from storage, if exists
	useEffect(() => {
		if (typeof window === "undefined") return;
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const parsed = JSON.parse(raw);
			if (parsed?.date) parsed.date = new Date(parsed.date);
			form.reset(parsed);
		} catch {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const meetingPoints = points?.[lang] || defaultMeetingPoints[lang];

	const onSubmit = (values) => {
		if (typeof window !== "undefined") {
			const payload = {
				...values,
				date: values.date?.toISOString(),
				lang,
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
		}
		onSaved?.(values);
		setSavedMsg(t.saved);
		// navigate to step 2
		router.push("/book-tour-pt2");
	};

	const [savedMsg, setSavedMsg] = useState("");

	// UI helpers for ordering columns by lang, and responsiveness
	const colBase = "  p-4 md:p-6 ";
	const sectionTitle = "text-base md:text-lg font-semibold mb-3 md:mb-4";
	const badge =
		"inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm";
	const stepDot =
		"size-2 rounded-full bg-[var(--main-color,#14532d)] inline-block";
	const muted = "text-muted-foreground";

	return (
		<section className=" mx-auto px-6 md:px-6 my-12">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={cn("grid grid-cols-1 gap-4 ", "md:grid-cols-4")}
				>
					{/* Steps column */}
					<StepsTimeline t={t} isAr={isAr} />

					{/* Calendar column */}
					<div className={cn(colBase, "flex justify-center items-start ")}>
						<div>
							<h3 className={sectionTitle}>{t.calendar}</h3>
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={{ before: startOfToday() }}
												locale={isAr ? arSA : enUS}
												className="rounded-md border w-auto max-w-full"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					{/* Tour type column */}
					<div className={cn(colBase, "md:ms-2 md:border-x md:border-dotted")}>
						<h3 className={sectionTitle}>{t.tourType}</h3>
						<FormField
							control={form.control}
							name="tourType"
							render={({ field }) => (
								<FormItem>
									<div className="grid gap-3">
										{[
											{
												value: "morning",
												label: t.morning,
												time: t.morningTime,
											},
											{
												value: "afternoon",
												label: t.afternoon,
												time: t.afternoonTime,
											},
										].map((type) => {
											const active = field.value === type.value;
											return (
												<button
													type="button"
													key={type.value}
													onClick={() => field.onChange(type.value)}
													className={cn(
														"w-full text-start rounded-md border px-4 py-2 font-medium",
														active
															? "bg-[var(--main-color,#14532d)] text-white border-[var(--main-color,#14532d)]"
															: "hover:bg-muted/40"
													)}
												>
													<div className="font-medium">{type.label}</div>
													<div>{type.time}</div>
												</button>
											);
										})}
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Meeting point column */}
					<div className={cn(colBase, "")}>
						<h3 className={sectionTitle}>{t.meeting}</h3>
						<FormField
							control={form.control}
							name="meetingPoint"
							render={({ field }) => (
								<FormItem>
									<div className="grid gap-3">
										{meetingPoints.map((pt) => {
											const active = field.value === pt;
											return (
												<button
													type="button"
													key={pt}
													onClick={() => field.onChange(pt)}
													className={cn(
														"w-full text-center rounded-md border px-4 py-2 font-medium",
														active
															? "bg-[var(--main-color,#14532d)] text-white border-[var(--main-color,#14532d)]"
															: "hover:bg-muted/40"
													)}
												>
													{pt}
												</button>
											);
										})}
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Footer actions */}
					<div className={cn("md:col-span-4")}>
						<div
							className={cn(
								"flex items-center justify-center md:justify-center mt-2 md:mt-4"
							)}
						>
							<Button
								type="submit"
								className="min-w-40 bg-[var(--main-color,#14532d)] hover:bg-[var(--sec-color,#86efac)] hover:text-black"
							>
								{t.next}
							</Button>
						</div>
						{savedMsg && (
							<p className="text-center mt-3 text-green-700">{savedMsg}</p>
						)}
					</div>
				</form>
			</Form>
		</section>
	);
}
