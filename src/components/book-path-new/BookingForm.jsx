"use client";

import { useEffect, useState, useMemo } from "react";
import {
	Calendar,
	Clock,
	Users,
	MapPin,
	Sun,
	Sunset,
	Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, startOfToday, isSameDay } from "date-fns";
import {
	Form,
	FormField,
	FormItem,
	FormMessage,
	FormControl,
} from "@/components/ui/form";
import { DatePickerFormField } from "@/components/book-components/DatePickerFormField";
import { BookingTimeField } from "@/components/book-components/BookingTimeField";
import { BookingVehicleField } from "@/components/book-components/BookingVehicleField";

import { BookingAddonsField } from "./BookingAddonsField";

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
	minSeats = 1,
	disabledDays = [],
	data,
	addons = [],
	selectedAddons = [],
	setSelectedAddons = () => {},
	vehicleMaxSeats,
	availability = { status: true, message: "" }, // <-- new prop
	isSaudi = true,
}) {
	const isAr = lang === "ar";

	const today = startOfToday();
	const tomorrow = addDays(today, 1);
	const maxDate = addDays(today, 14);
	// filter times when selected date is today (only show times >= now + 2h)
	const selectedDate = form.watch("date");
	const allTimes = data?.times || [];
	const filteredTimes = useMemo(() => {
		if (!selectedDate) return allTimes;
		if (!isSameDay(selectedDate, today)) return allTimes;
		const now = new Date();
		const threshold = new Date(now.getTime() + 2 * 60 * 60 * 1000);
		const avail = allTimes.filter((t) => {
			const [hh = 0, mm = 0, ss = 0] = String(t.time || "00:00:00")
				.split(":")
				.map(Number);
			const dt = new Date(selectedDate);
			dt.setHours(hh, mm, ss, 0);
			return dt.getTime() >= threshold.getTime();
		});
		return avail.length ? avail : allTimes; // if none available, return allTimes (we'll switch date to tomorrow below)
	}, [selectedDate, allTimes, today]);

	// if user picked today but there are no times >= now+2h, force date -> tomorrow
	useEffect(() => {
		if (!selectedDate) return;
		if (!isSameDay(selectedDate, today)) return;
		// check if any time is >= now+2h
		const now = new Date();
		const threshold = new Date(now.getTime() + 2 * 60 * 60 * 1000);
		const any = allTimes.some((t) => {
			const [hh = 0, mm = 0, ss = 0] = String(t.time || "00:00:00")
				.split(":")
				.map(Number);
			const dt = new Date(selectedDate);
			dt.setHours(hh, mm, ss, 0);
			return dt.getTime() >= threshold.getTime();
		});
		if (!any) {
			form.setValue("date", tomorrow);
			form.setValue("time", undefined);
		} else {
			// if selected time is no longer valid, clear it
			const cur = form.getValues("time");
			if (cur?.id && !filteredTimes.find((t) => t.id === cur.id)) {
				form.setValue("time", undefined);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDate, allTimes]);

	const tripTypes = [
		{
			id: 1,
			name: isAr ? "رحلة متكاملة" : "Regular Tour",
			desc: isAr
				? "تجربة غنية بالمعرفة تهتم بالتفاصيل وتجعل كل لحظة ذكرى خالدة"
				: "A knowledge-rich experience, Deep in details, Turn every moment into a lasting memory.",
		},
		{
			id: 2,
			name: isAr ? "رحلة سريعة" : "Express Tour",
			desc: isAr
				? "تجربة مركزة تحفظ وقتك وتثري تجربتك "
				: "A focused experience, Save time, Valuable visit.",
		},
	];

	// read is_express from form
	const isExpress = form.watch("is_express");

	// read selected vehicle (for add-on per-car pricing display)
	const selectedVehicle = form.watch("vehicle");

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
								: "Select the date and time that suits you"}
						</p>
					</div>
					<div className="bg-[rgba(231,211,175,0.2)] border-[0.8px] border-[#e7d3af] rounded-full px-2 py-2">
						<p className="text-[#867957]">
							{isAr ? "خطوة 2 من  2" : "Step 2 of 2"}
						</p>
					</div>
				</div>

				<Form {...form}>
					<form className="flex flex-col gap-6">
						<DatePickerFormField
							form={form}
							id="date"
							lang={lang}
							minDate={today}
							maxDate={data.max_date}
							label={isAr ? "اختر التاريخ المناسب" : "Pick a date"}
							disabledDays={disabledDays}
						/>

						{/* Time Selector */}
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-3">
								<Clock className="w-5 h-5 text-[#867957]" strokeWidth={1.67} />
								<p className="text-[#364153]">
									{isAr ? "اختر الوقت المناسب" : "Choose the appropriate time"}
								</p>
							</div>
							<BookingTimeField
								form={form}
								name="time"
								id="time"
								bookingHours={filteredTimes}
								language={lang}
								className="border "
							/>
							{/* availability message shown under time field */}
							{availability?.status === false && (
								<p className="text-sm mt-2 text-[#fb2c36]">
									{availability?.message ||
										(isAr
											? "الوقت / التاريخ غير متاح، يرجى اختيار وقت أو تاريخ آخر."
											: "Selected date/time is not available — please choose a different date or time.")}
								</p>
							)}
						</div>

						{/* Vehicle Selector */}
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-3">
								<img src="/book-path/car.png" className="w-5 h-5 " />
								<p className="text-[#364153]">
									{isAr ? "نوع المركبة" : "Vehicle Type"}
								</p>
							</div>
							<BookingVehicleField
								form={form}
								name="vehicle"
								id="vehicle"
								vehicles={data.cars || []}
								language={lang}
								className="border "
							/>
						</div>

						{/* People Counter + Available seats pill */}
						<div className="flex flex-col gap-1 my-2">
							<div className="flex items-center gap-3">
								<Users className="w-5 h-5 text-[#867957]" strokeWidth={1.67} />
								<p className="text-[#364153]">
									{isAr ? "عدد الأشخاص" : "Number of People"}
								</p>
							</div>
							<FormField
								control={form.control}
								name="people"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="flex items-center gap-5 h-16">
												<button
													type="button"
													onClick={() =>
														field.onChange(
															Math.max(minSeats, (field.value || minSeats) - 1),
														)
													}
													disabled={(field.value || minSeats) <= minSeats}
													className={`w-16 h-16 rounded-[16px] flex items-center justify-center ${
														(field.value || minSeats) <= minSeats
															? "opacity-30"
															: ""
													}`}
												>
													<div className="w-6 h-0.5 bg-[#3C6652]" />
												</button>
												<div className="flex-1 h-[54.4px] bg-gradient-to-r from-[rgba(231,211,175,0.3)] to-[rgba(231,211,175,0.2)] border-[1.6px] border-[rgba(231,211,175,0.6)] rounded-[18px] flex flex-col items-center justify-center">
													<p className="text-[#3c6652]">
														{field.value || minSeats}
													</p>
													<p className="text-[#4a5565]">
														{isAr ? "شخص" : "Person"}
													</p>
												</div>
												<button
													type="button"
													onClick={() =>
														field.onChange(
															Math.min(
																typeof leftSeats === "number"
																	? leftSeats
																	: (vehicleMaxSeats ?? Infinity),
																(field.value || minSeats) + 1,
															),
														)
													}
													disabled={
														typeof leftSeats === "number"
															? (field.value || minSeats) >= leftSeats
															: vehicleMaxSeats
																? (field.value || minSeats) >= vehicleMaxSeats
																: false
													}
													className={`w-16 h-16 rounded-[16px] flex items-center justify-center ${
														(typeof leftSeats === "number" &&
															(field.value || minSeats) >= leftSeats) ||
														(vehicleMaxSeats &&
															(field.value || minSeats) >= vehicleMaxSeats)
															? "opacity-30"
															: ""
													}`}
												>
													<div className="relative w-6 h-6">
														<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#3C6652]" />
														<div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#3C6652]" />
													</div>
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* trip type */}
						{data?.has_express === 1 && (
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-3">
									{/* optional header */}
									<p className="text-[#364153]">
										{isAr ? "نوع الرحلة" : "Trip Type"}
									</p>
								</div>

								<div className="flex flex-col sm:flex-row md:items-stretch justify-between gap-4">
									{tripTypes.map((type, index) => {
										const active =
											(isExpress === true && type.id === 2) ||
											(isExpress === false && type.id === 1);
										return (
											<button
												key={type.id}
												type="button"
												onClick={() =>
													form.setValue("is_express", type.id === 2)
												}
												className={cn(
													"flex-1 p-3 rounded-[10px] border transition-all",
													active
														? "bg-[#fffff5] border-[#3c6652] border-2"
														: "border-[#d0d0d0] hover:border-[#867957] cursor-pointer",
												)}
											>
												<div className="flex  items-center w-full gap-2">
													{index === 0 ? (
														<img
															src="/book-path/road.png"
															className="w-8 h-8 "
														/>
													) : (
														<img
															src="/book-path/flash.png"
															className="w-8 h-8 "
														/>
													)}
													<p className="text-[#1e2939]">{type.name}</p>
												</div>
												<p className="text-xs text-[#4a5565] mt-2">
													{type.desc}
												</p>
											</button>
										);
									})}
								</div>
							</div>
						)}
						{/* if has_express !== 1 we don't render trip type and is_express remains false */}

						{/* Addons component */}
						<BookingAddonsField
							addons={addons}
							selected={selectedAddons}
							onChange={setSelectedAddons}
							lang={lang}
							isSaudi={isSaudi}
							vehicle={selectedVehicle} 
						/>
					</form>
				</Form>
			</div>
		</div>
	);
}
