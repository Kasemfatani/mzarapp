"use client";

import { useEffect } from "react";
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
import { format, addDays, startOfToday } from "date-fns";
import {
	Form,
	FormField,
	FormItem,
	FormMessage,
	FormControl,
} from "@/components/ui/form";

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
	leftSeats,
	setLeftSeats,
}) {
	const isAr = lang === "ar";
	const today = startOfToday();
	const tomorrow = addDays(today, 1);
	const maxDate = addDays(today, 14);

	return (
		<div className="bg-white rounded-[20px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] border-[0.8px] border-[rgba(243,244,246,0.6)] w-full">
			<div className="p-8 flex flex-col gap-6">
				{/* Header */}
				<div className="flex items-center justify-between w-full">
					<div className="flex flex-col">
						<h3 className="text-[#3c6652] text-[30px] tracking-[-0.45px]">
							اختر موعد رحلتك
						</h3>
						<p className="text-[#4a5565]">حدد التاريخ والوقت المناسب لك</p>
					</div>
					<div className="bg-[rgba(231,211,175,0.2)] border-[0.8px] border-[#e7d3af] rounded-full px-2 py-2">
						<p className="text-[#867957]">خطوة 1 من 2</p>
					</div>
				</div>

				<Form {...form}>
					<form className="flex flex-col gap-6">
						{/* Date Picker (input type="date") */}
						<div className="flex flex-col gap-2">
							<label className="flex items-center text-[#364153]">
								اختر التاريخ المناسب
							</label>
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<input
												type="date"
												className=" w-full rounded-md border px-3 py-2"
												value={
													field.value ? format(field.value, "yyyy-MM-dd") : ""
												}
												onChange={(e) => {
													const val = e.target.value
														? new Date(e.target.value)
														: null;
													field.onChange(val);
												}}
												min={format(tomorrow, "yyyy-MM-dd")}
												max={format(maxDate, "yyyy-MM-dd")}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Time Slot Selector (no label/icon, buttons only) */}
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-3">
								<Clock className="w-5 h-5 text-[#867957]" strokeWidth={1.67} />
								<p className="text-[#364153]">اختر الوقت المناسب</p>
							</div>
							<FormField
								control={form.control}
								name="time"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-col sm:flex-row md:items-stretch justify-between gap-4">
											{times.map((time) => {
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
														<div className="flex flex-col items-start w-full">
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

						{/* Meeting Point Selection */}
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-3">
								<MapPin className="w-6 h-6 text-[#867957]" strokeWidth={1.33} />
								<p className="text-[#364153]">اختيار نقطة التجمع الأقرب</p>
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
														onClick={() =>
															field.onChange({ id: point.id, name: point.name })
														}
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

						{/* People Counter + Available seats pill */}
						<div className="flex flex-col gap-1 my-2">
							<div className="flex items-center gap-3">
								<Users className="w-5 h-5 text-[#867957]" strokeWidth={1.67} />
								<p className="text-[#364153]">عدد الأشخاص</p>
								{typeof leftSeats === "number" && (
									<span className="ms-2 rounded-full bg-[#ecfdf5] text-[#065f46] text-xs px-3 py-1">
										{isAr
											? `المقاعد المتاحة: ${leftSeats}`
											: `Available seats: ${leftSeats}`}
									</span>
								)}
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
														field.onChange(Math.max(1, (field.value || 1) - 1))
													}
													disabled={(field.value || 1) <= 1}
													className={`w-16 h-16 rounded-[16px] flex items-center justify-center ${
														(field.value || 1) <= 1 ? "opacity-30" : ""
													}`}
												>
													<div className="w-6 h-0.5 bg-[#3C6652]" />
												</button>
												<div className="flex-1 h-[54.4px] bg-gradient-to-r from-[rgba(231,211,175,0.3)] to-[rgba(231,211,175,0.2)] border-[1.6px] border-[rgba(231,211,175,0.6)] rounded-[18px] flex flex-col items-center justify-center">
													<p className="text-[#3c6652]">{field.value || 1}</p>
													<p className="text-[#4a5565]">شخص</p>
												</div>
												<button
													type="button"
													onClick={() =>
														field.onChange(
															Math.min(
																typeof leftSeats === "number"
																	? leftSeats
																	: Infinity,
																(field.value || 1) + 1
															)
														)
													}
													disabled={
														typeof leftSeats === "number"
															? (field.value || 1) >= leftSeats
															: false
													}
													className={`w-16 h-16 rounded-[16px] flex items-center justify-center ${
														typeof leftSeats === "number" &&
														(field.value || 1) >= leftSeats
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
					</form>
				</Form>
			</div>
		</div>
	);
}
