"use client";

import { useEffect, useState } from "react";
import {
	// Calendar icon from lucide-react (renamed to CalendarIcon)
	Calendar as CalendarIcon,
	Clock,
	Users,
	MapPin,
	Sun,
	Sunset,
	Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, startOfToday } from "date-fns";
import {
	Form,
	FormField,
	FormItem,
	FormMessage,
	FormControl,
} from "@/components/ui/form";

// add react-day-picker imports (already present in project)
import { Calendar } from "@/components/ui/calendar";
import "react-day-picker/dist/style.css";

// shadcn popover / button (calendar wrapper uses react-day-picker under the hood)
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DatePickerFormField } from "./DatePickerFormField";
import { is } from "date-fns/locale";
// optional: if you have shadcn Calendar component wrapper:
// import { Calendar } from "@/components/ui/calendar";
// we'll use DayPicker directly inside PopoverContent

const CURRENCY_SVG = (
	<svg
		viewBox="0 0 1124.14 1256.39"
		width="1.3em"
		height="1.3em"
		fill="currentColor"
		style={{ display: "inline", verticalAlign: "top" }}
	>
		<path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
		<path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
	</svg>
);

export function BookingForm({
	lang = "ar",
	form,
	times = [],
	gatheringPoints = [],
	busId,
	disabledDays = [0, 1, 2, 3, 4, 5, 6],
	groupAgePrices = [], // <-- new prop
	leftSeats,
}) {
	// auto-select nearest gathering point (if user hasn't picked one)
	// useEffect(() => {
	// 	if (!gatheringPoints || gatheringPoints.length === 0) return;
	// 	if (typeof window === "undefined") return;
	// 	// if user already selected a meetingPoint, don't override
	// 	if (form.getValues().meetingPoint) return;
	// 	if (!navigator.geolocation) return;

	// 	let mounted = true;
	// 	const toRad = (v) => (v * Math.PI) / 180;
	// 	const haversine = (lat1, lon1, lat2, lon2) => {
	// 		const R = 6371; // km
	// 		const dLat = toRad(lat2 - lat1);
	// 		const dLon = toRad(lon2 - lon1);
	// 		const a =
	// 			Math.sin(dLat / 2) ** 2 +
	// 			Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
	// 		return 2 * R * Math.asin(Math.sqrt(a));
	// 	};

	// 	navigator.geolocation.getCurrentPosition(
	// 		(pos) => {
	// 			if (!mounted) return;
	// 			const { latitude, longitude } = pos.coords;
	// 			let closest = null;
	// 			let minDist = Infinity;
	// 			for (const p of gatheringPoints) {
	// 				if (p.lat == null || p.lng == null) continue;
	// 				const d = haversine(
	// 					latitude,
	// 					longitude,
	// 					Number(p.lat),
	// 					Number(p.lng)
	// 				);
	// 				if (d < minDist) {
	// 					minDist = d;
	// 					closest = p;
	// 				}
	// 			}
	// 			// console.log("distance to closest gathering point:", minDist);
	// 			console.log("Closest gathering point:", closest);
	// 			if (closest) {
	// 				form.setValue(
	// 					"meetingPoint",
	// 					{ id: closest.id, name: closest.name },
	// 					{ shouldValidate: true }
	// 				);
	// 			}
	// 		},
	// 		() => {
	// 			/* ignore geolocation errors */
	// 		},
	// 		{ enableHighAccuracy: true, timeout: 5000, maximumAge: 60_000 }
	// 	);

	// 	return () => {
	// 		mounted = false;
	// 	};
	// }, [gatheringPoints, form]);

	const isAr = lang === "ar";
	const today = startOfToday();
	const tomorrow = addDays(today, 1);
	const maxDate = addDays(today, 14);

	// read current counts to render numbers
	const counts = form.watch("group_age_counts") || [];
	const getQty = (id) => counts.find((c) => c.id === id)?.quantity || 0;
	const setQty = (id, next) => {
		const nextVal = Math.max(0, Number(next || 0));
		const nextArr = (() => {
			if (!counts.length) return [{ id, quantity: nextVal }];
			const exists = counts.some((c) => c.id === id);
			if (!exists) return [...counts, { id, quantity: nextVal }];
			return counts.map((c) => (c.id === id ? { ...c, quantity: nextVal } : c));
		})();
		form.setValue("group_age_counts", nextArr, { shouldValidate: true });
	};

	return (
		<div className="bg-white rounded-[20px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] border-[0.8px] border-[rgba(243,244,246,0.6)] w-full">
			<div className="p-8 flex flex-col gap-6">
				{/* Header */}
				<div className="flex flex-col md:flex-row items-center justify-between w-full gap-2">
					<div className="flex flex-col">
						<h3 className="text-[#3c6652] text-[30px] tracking-[-0.45px]">
							{isAr ? "اختر موعد رحلتك" : "Choose Your Trip Date"}{" "}
						</h3>
						<p className="text-[#4a5565]">
							{isAr
								? "حدد التاريخ والوقت المناسب لك"
								: "Select the date and time that suits you"}{" "}
						</p>
					</div>
					<div className="bg-[rgba(231,211,175,0.2)] border-[0.8px] border-[#e7d3af] rounded-full px-2 py-2">
						<p className="text-[#867957]">
							{isAr ? "خطوة 1 من  2" : "Step 1 of 2"}
						</p>
					</div>
				</div>

				<Form {...form}>
					<form className="flex flex-col gap-6">
						{/* Meeting Point Selection */}
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-3">
								<MapPin className="w-6 h-6 text-[#867957]" strokeWidth={1.33} />
								<p className="text-[#364153]">
									{isAr
										? "اختيار نقطة التجمع الأقرب"
										: "Choose the nearest gathering point"}
								</p>
							</div>
							<FormField
								control={form.control}
								name="meetingPoint"
								render={({ field }) => (
									<FormItem>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
											{gatheringPoints.map((point) => {
												const active = field.value?.id === point.id;
												return (
													<div
														key={point.id}
														onClick={() => {
															field.onChange({
																id: point.id,
																name: point.name,
															});
															// clear date/time on meeting point change for accuracy
															form.setValue("date", undefined, {
																shouldValidate: true,
															});
															form.setValue("time", undefined, {
																shouldValidate: true,
															});
														}}
														className={cn(
															"bg-white rounded-[10px] px-6 py-4 flex items-center justify-between cursor-pointer transition-all",
															active
																? "border-2 border-[#3c6652] bg-[#fffff5]"
																: "border border-[rgba(4,67,67,0.32)] hover:border-[#867957]"
														)}
													>
														<div
															className={cn(
																"flex flex-col text-center",
																active
																	? "text-[#3c6652]"
																	: "text-[rgba(4,67,67,0.32)]"
															)}
														>
															<p>{point.name}</p>
														</div>
														{point.lat && point.lng && (
															<a
																href={`https://www.google.com/maps/search/?api=1&query=${point.lat},${point.lng}`}
																target="_blank"
																rel="noopener noreferrer"
																onClick={(e) => e.stopPropagation()}
																className="bg-[#3c6652] text-white rounded-[15px] px-4 py-2 hover:bg-[#2d4d3d] transition-colors"
															>
																عرض
															</a>
														)}
													</div>
												);
											})}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Date (disabledDays comes from selected meeting point) */}
						<DatePickerFormField
							form={form}
							lang={lang}
							minDate={tomorrow}
							maxDate={maxDate}
							disabledDays={disabledDays}
						/>

						{/* Time Slot Selector based on chosen date's weekday for selected meeting point */}
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-3">
								<Clock className="w-5 h-5 text-[#867957]" strokeWidth={1.67} />
								<p className="text-[#364153]">
									{isAr ? "اختر الوقت المناسب" : "Choose the suitable time"}
								</p>
							</div>
							<FormField
								control={form.control}
								name="time"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-col sm:flex-row md:items-stretch justify-between gap-4">
											{(times || []).length === 0 && (
												<p className="text-sm text-[#6a7282]">
													{isAr
														? "اختر نقطة التجمع ثم التاريخ لإظهار الأوقات المتاحة"
														: "Select a meeting point and then a date to show available times"}
												</p>
											)}
											{(times || []).map((time) => {
												const active = field.value?.id === time.id;
												return (
													<button
														key={time.id}
														type="button"
														onClick={() =>
															field.onChange({ id: time.id, name: time.name })
														}
														className={cn(
															"flex-1 p-3 rounded-[10px] border transition-all",
															active
																? "bg-[#fffff5] border-[#3c6652] border-2"
																: "border-[#d0d0d0] hover:border-[#867957] cursor-pointer"
														)}
													>
														<div className="flex flex-col items-center w-full">
															<p className="text-[#1e2939]">{time.name}</p>
														</div>
													</button>
												);
											})}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* People Counter (new grouped design) */}
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-3">
								<Users className="w-5 h-5 text-[#867957]" strokeWidth={1.67} />
								<p className="text-[#364153]">
									{isAr ? "عدد الأشخاص حسب الفئات" : "People by age group"}
								</p>
								{typeof leftSeats === "number" && (
									<span className="ms-2 rounded-full bg-[#ecfdf5] text-[#065f46] text-xs px-3 py-1">
										{isAr
											? `المقاعد المتاحة: ${leftSeats}`
											: `Available seats: ${leftSeats}`}
									</span>
								)}
							</div>

							<div className="divide-y rounded-xl border bg-[#fffefb]">
								{groupAgePrices.map((g) => {
									const q = getQty(g.id);
									return (
										<div
											key={g.id}
											className="flex flex-col md:flex-row items-center justify-between gap-2 py-3 px-4"
										>
											<div className="flex flex-col">
												<p className="text-[#111827] font-medium">{g.name}</p>
												<p className="text-[#6b7280] text-sm">
													{Number(g.price || 0)}{" "}
													{isAr ? "ريال للشخص" : "SAR per person"}
												</p>
											</div>
											<div className="flex items-center gap-4">
												<button
													type="button"
													onClick={() => setQty(g.id, q + 1)}
													className="w-10 h-10 rounded-full bg-[#3c6652] text-white text-xl leading-none flex items-center justify-center"
												>
													+
												</button>
												<span className="min-w-[20px] text-lg font-semibold text-[#111827] text-center">
													{q}
												</span>
												<button
													type="button"
													onClick={() => setQty(g.id, q - 1)}
													className="w-10 h-10 rounded-full bg-[#f5f0ea] text-[#111827]/80 text-xl leading-none flex items-center justify-center"
													disabled={q <= 0}
												>
													−
												</button>
											</div>
										</div>
									);
								})}
							</div>

							{/* Keep total people hidden; BookWrapper syncs it */}
							<input type="hidden" value={form.watch("people") || 0} readOnly />
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
