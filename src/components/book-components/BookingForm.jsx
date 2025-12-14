"use client";

import { useState } from "react";
import {
	Calendar,
	Clock,
	Users,
	MapPin,
	Sun,
	Sunset,
	Moon,
} from "lucide-react";

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

export function BookingForm({ price = 99, minPeople = 5 }) {
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedTimeSlot, setSelectedTimeSlot] = useState("morning");
	const [peopleCount, setPeopleCount] = useState(1);
	const [selectedMeetingPoint, setSelectedMeetingPoint] = useState("");

	const timeSlots = [
		{
			id: "morning",
			label: "الفترة الصباحية",
			time: "9:00 صباحًا – 1:00 ظهرًا",
			icon: "sun",
			available: true,
		},
		{
			id: "afternoon",
			label: "فترة ما بعد الظهر",
			time: "2:00 ظهرًا – 6:00 مساءً",
			icon: "sunset",
			available: true,
		},
		{
			id: "evening",
			label: "الفترة المسائية",
			time: "7:00 مساءً – 11:00 مساءً",
			icon: "moon",
			available: false,
		},
	];

	const meetingPoints = [
		{ id: "1", name: "محطة الغزة", distance: "100 متر" },
		{ id: "2", name: "أجياد", distance: "200 متر" },
		{ id: "3", name: "خلف أبراج الساعة", distance: "250 متر" },
		{ id: "4", name: "حديقة المسفلة", distance: "300 متر" },
	];

	const getTimeSlotIcon = (icon) => {
		switch (icon) {
			case "sun":
				return <Sun className="w-7 h-7 text-[#3C6652]" strokeWidth={2.33} />;
			case "sunset":
				return <Sunset className="w-7 h-7 text-[#867957]" strokeWidth={2.33} />;
			case "moon":
				return <Moon className="w-7 h-7 text-[#867957]" strokeWidth={2.33} />;
			default:
				return null;
		}
	};

	return (
		<div className="bg-white rounded-[20px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] border-[0.8px] border-[rgba(243,244,246,0.6)] w-full">
			<div className="p-8 flex flex-col gap-4">
				{/* Pricing Box */}
				<div
					className="relative rounded-[18px] border-[1.6px] border-[rgba(231,211,175,0.6)] overflow-hidden md:w-[70%] mx-auto"
					style={{
						backgroundImage:
							"linear-gradient(173.577deg, rgba(231, 211, 175, 0.4) 0%, rgba(231, 211, 175, 0.25) 50%, rgba(0, 0, 0, 0) 100%)",
					}}
				>
					<div className="flex flex-col md:flex-row  px-4 py-3 gap-2 ">
            <p className="text-[#3c6652] ">ابتداءً من <span className="rtl">{price} {CURRENCY_SVG}</span> للفرد</p> 
						

						<p className="text-[#867957]">( حد أدنى {minPeople} أشخاص)</p>
					</div>
				</div>

				{/* Step Indicator + Header */}
				<div className="flex items-center justify-between w-full">
					<div className="flex flex-col  ">
						<h3 className="text-[#3c6652] text-[30px] tracking-[-0.45px]">
							اختر موعد رحلتك
						</h3>
						<p className="text-[#4a5565]">حدد التاريخ والوقت المناسب لك</p>
					</div>

					<div className="bg-[rgba(231,211,175,0.2)] border-[0.8px] border-[#e7d3af] rounded-full px-2 py-2">
						<p className="text-[#867957]">خطوة 1 من 2</p>
					</div>
				</div>

				{/* Date Picker */}
				<div className="flex flex-col gap-2">
					<label className="flex items-center  text-[#364153]">
						اختر التاريخ المناسب
					</label>
					<input
						type="date"
						value={selectedDate}
						onChange={(e) => setSelectedDate(e.target.value)}
						className="w-full border border-[#d0d0d0] rounded-[18px] px-[17px] py-[9px]  text-[#364153] cursor-pointer"
					/>
				</div>

				{/* Time Slot Selector */}
				<div className="flex flex-col gap-2">
					<label className="flex items-center  gap-3 text-[#364153]">
						<Clock className="w-5 h-5 text-[#867957]" strokeWidth={1.67} />
						اختر الوقت المناسب
					</label>
					<div className="flex flex-col sm:flex-row md:items-stretch justify-between gap-4">
						{timeSlots.map((slot) => (
							<button
								key={slot.id}
								onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
								disabled={!slot.available}
								className={`flex-1 p-2 rounded-[10px] border transition-all  ${
									selectedTimeSlot === slot.id
										? "bg-[#fffff5] border-[#3c6652] border-2"
										: "border-[#d0d0d0]"
								} ${
									!slot.available
										? "opacity-50 cursor-not-allowed"
										: "hover:border-[#867957] cursor-pointer"
								}`}
							>
								<div className="flex flex-col gap-4  h-full justify-between">
									<div className="flex items-center justify-between w-full">
										{getTimeSlotIcon(slot.icon)}
										{!slot.available && (
											<div className="bg-[#ffe2e2] rounded-full px-2 py-1">
												<p className="text-[#e7000b] text-sm">غير متاح</p>
											</div>
										)}
									</div>
									<div className="flex flex-col items-start  w-full">
										<p className="text-[#4a5565]">{slot.label}</p>
										<p className="text-[#1e2939]">{slot.time}</p>
									</div>
								</div>
							</button>
						))}
					</div>
				</div>

				{/* People Counter */}
				<div className="flex flex-col gap-1 my-4">
					<div className="flex items-center  gap-3">
						<Users className="w-5 h-5 text-[#867957]" strokeWidth={1.67} />
						<p className="text-[#364153]">عدد الأشخاص</p>
					</div>
					<div className="flex items-center gap-5 h-16">
						<button
							onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
							disabled={peopleCount <= 1}
							className={`w-16 h-16 rounded-[16px] flex items-center justify-center ${
								peopleCount <= 1 ? "opacity-30" : ""
							}`}
						>
							<div className="w-6 h-0.5 bg-[#3C6652]" />
						</button>
						<div className="flex-1 h-[54.4px] bg-gradient-to-r from-[rgba(231,211,175,0.3)] to-[rgba(231,211,175,0.2)] border-[1.6px] border-[rgba(231,211,175,0.6)] rounded-[18px] flex flex-col items-center justify-center">
							<p className="text-[#3c6652]">{peopleCount}</p>
							<p className="text-[#4a5565]">شخص</p>
						</div>
						<button
							onClick={() => setPeopleCount(peopleCount + 1)}
							className="w-16 h-16 rounded-[16px] flex items-center justify-center"
						>
							<div className="relative w-6 h-6">
								<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#3C6652]" />
								<div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#3C6652]" />
							</div>
						</button>
					</div>
				</div>

				{/* Meeting Point Selection */}
				<div className="flex flex-col gap-1">
					<div className="flex items-center  gap-3">
						<MapPin className="w-6 h-6 text-[#867957]" strokeWidth={1.33} />
						<p className="text-[#364153]">اختيار نقطة التجمع الأقرب</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						{meetingPoints.map((point) => (
							<div
								key={point.id}
								onClick={() => setSelectedMeetingPoint(point.id)}
								className={`bg-white rounded-[10px] px-6 py-4 flex items-center justify-between cursor-pointer transition-all ${
									selectedMeetingPoint === point.id
										? "border-2 border-[#3c6652] bg-[#fffff5]"
										: "border border-[rgba(4,67,67,0.32)] hover:border-[#867957]"
								}`}
							>
								<div
									className={`flex flex-col text-center ${
										selectedMeetingPoint === point.id
											? "text-[#3c6652]"
											: "text-[rgba(4,67,67,0.32)]"
									}`}
								>
									<p>{point.name}</p>
								</div>
								<a
									href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
										point.name + " مكة المكرمة"
									)}`}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e) => e.stopPropagation()}
									className="bg-[#3c6652] text-white rounded-[15px] px-4 py-2 hover:bg-[#2d4d3d] transition-colors"
								>
									عرض
								</a>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
