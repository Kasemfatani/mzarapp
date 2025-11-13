"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { startOfToday, addDays, format } from "date-fns";
import { arSA, enUS } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormMessage,
	FormControl,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import StepsTimeline from "./StepsTimeline";

const STORAGE_KEY = "madinahTour.selection";

const messages = {
	en: {
		steps: {
			choose: "Choose Tour",
			info: "Personal Information",
			pay: "Payment",
		},
		calendar: "Select Date",
		time: "Choose Time:",
		meeting: "Gathering point:",
		next: "Next",
		saved: "Saved. Proceeding to the next step soon.",
		requiredDate: "Please select a date",
		requiredTime: "Please choose a time",
		requiredMeet: "Please select a meeting point",
	},
	ar: {
		steps: { choose: "اختر جولتك", info: "أدخل المعلومات", pay: "الدفع" },
		calendar: "اختر التاريخ",
		time: "اختيار الوقت:",
		meeting: "نقطة التجمع:",
		next: "التالي",
		saved: "تم الحفظ. سيتم الانتقال للخطوة التالية قريبًا.",
		requiredDate: "يرجى اختيار تاريخ",
		requiredTime: "يرجى اختيار الوقت",
		requiredMeet: "يرجى اختيار نقطة التجمع",
	},
};

const schema = (lang) =>
	z.object({
		date: z
			.date({ invalid_type_error: messages[lang].requiredDate })
			.refine(Boolean, {
				message: messages[lang].requiredDate,
			}),
		time: z
			.object({
				id: z.any(),
				name: z.string(),
			})
			.refine((val) => val && val.id && val.name, {
				message: messages[lang].requiredTime,
			}),
		
	});

export default function ChooseTourStep({
	initialLang = "en",
	times = [],
	gatheringPointAddress = "",
	busId,
	onSaved,
}) {
	const lang = initialLang === "ar" ? "ar" : "en";
	const t = messages[lang];
	const isAr = lang === "ar";

	const today = startOfToday();
	const tomorrow = addDays(today, 1);
	const maxDate = addDays(today, 14);

	const form = useForm({
		resolver: zodResolver(schema(lang)),
		defaultValues: {
			date: undefined,
			time: undefined,
		},
		mode: "onSubmit",
	});

	// Prefill from storage, if exists
	// useEffect(() => {
	// 	if (typeof window === "undefined") return;
	// 	try {
	// 		const raw = localStorage.getItem(STORAGE_KEY);
	// 		if (!raw) return;
	// 		const parsed = JSON.parse(raw);
	// 		if (parsed?.date) parsed.date = new Date(parsed.date);
	// 		form.reset(parsed);
	// 	} catch {}

	// }, []);

	const onSubmit = (values) => {
		if (typeof window !== "undefined") {
			const payload = {
				...values,
				date: format(values.date, "yyyy-MM-dd"),
				time: values.time,
				tour_id: busId,
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
		}
		onSaved?.(values);
		setSavedMsg(t.saved);
	};

	const [savedMsg, setSavedMsg] = useState("");

	const colBase = "  p-4 md:p-6 ";
	const sectionTitle = "text-base md:text-lg font-semibold mb-3 md:mb-4";

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
												disabled={(date) => {
													// Only allow Sunday (0), Tuesday (2), Wednesday (3)
													const day = date.getDay();
													return (
														![0, 2, 3].includes(day) ||
														date < tomorrow ||
														date > maxDate
													);
												}}
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

					{/* Time column */}
					<div className={cn(colBase, "md:ms-2 md:border-x md:border-dotted")}>
						<h3 className={sectionTitle}>{t.time}</h3>
						<FormField
							control={form.control}
							name="time"
							render={({ field }) => (
								<FormItem>
									<div className="grid gap-3">
										{times.map((time) => {
											const active = field.value?.id === time.id;
											return (
												<button
													type="button"
													key={time.id}
													onClick={() =>
														field.onChange({ id: time.id, name: time.name })
													}
													className={cn(
														"w-full text-center rounded-md border px-4 py-2 font-medium",
														active
															? "bg-[var(--main-color,#14532d)] text-white border-[var(--main-color,#14532d)]"
															: "hover:bg-muted/40"
													)}
												>
													<div className="font-medium">{time.name}</div>
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
						<div className="p-3 rounded border bg-white text-black">
							{gatheringPointAddress ||
								(isAr ? "لا يوجد عنوان نقطة تجمع" : "No meeting point address")}
						</div>
					</div>

					{/* Footer actions */}
					<div className={cn("md:col-span-4")}>
						<div
							className={cn(
								"flex items-center justify-center  mt-2 md:mt-4"
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
