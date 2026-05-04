"use client";

import { MapPin, Clock } from "lucide-react";
import Image from "next/image";

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

const SAR_LABEL = (
	<span className="">
		{CURRENCY_SVG}
		<span className="mx-1 font-thin">(SAR)</span>
	</span>
);

export function RamadanCard({
	id,
	image,
	name,
	city,
	short_description,
	start_price,
	duration,
	isAr = false,
	isSaudi = true,
	type,
	is_available,
}) {
	// --- Currency Logic ---
	const SAR_RATE = 3.75;
	let displayPrice;
	let currencySymbol;

	if (isSaudi) {
		displayPrice = start_price;
		currencySymbol = isAr ? SAR_LABEL : "SAR";
	} else {
		displayPrice = start_price / SAR_RATE;
		currencySymbol = isAr ? "دولار" : "USD";
	}
	// --- End Currency Logic ---

	let link = `/book-path/${id}`;

	if (id === 88) {
		link = `/book-haram`;
	} else if (type === 3) {
		link = `/book-tour/${id}`;
	} else if (id === 87) {
		link = `/book-madinah`;
	}

	let disableBooking = false;
	if (!is_available) {
		disableBooking = true;
	}

	return (
		<div className="bg-white rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group">
			{/* Image Container */}
			<div className="relative h-60 w-full overflow-hidden">
				<a href={`/trip-detail/${id}`}>
					<Image
						src={image}
						alt={name}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						fill
					/>
				</a>

				{/* Tags */}
				<div className="absolute top-4  flex flex-row justify-between w-full px-4">
					<div className="bg-[#004B40]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-md">
						<MapPin size={14} />
						<span
							style={{
								fontFamily: '"Readex Pro", sans-serif',
								fontWeight: 500,
							}}
						>
							{city}
						</span>
					</div>
					<div className="bg-white/90 backdrop-blur-sm text-[#004B40] px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-md">
						<Clock size={14} />
						<span
							style={{
								fontFamily: '"Readex Pro", sans-serif',
								fontWeight: 500,
							}}
						>
							{duration}
						</span>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="p-6 flex flex-col flex-grow">
				{/* Title */}
				<a href={`/trip-detail/${id}`}>
					<h3
						className="text-xl text-gray-900 mb-3 font-bold line-clamp-1"
						style={{ fontFamily: '"Readex Pro", sans-serif' }}
					>
						{name}
					</h3>
				</a>

				{/* Description */}
				<p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
					{short_description}
				</p>

				{/* Price */}
				<div className="mt-auto mb-6 flex items-center gap-2 text-[#867957]">
					<span className="text-sm text-gray-500">
						{isAr ? "ابتداءً من" : "Starting from"}
					</span>
					<div className="text-xl font-bold flex items-center gap-1">
						{displayPrice?.toFixed(2)} {currencySymbol}
					</div>
				</div>

				{/* CTA Buttons */}
				<div className="flex gap-3 w-full">
					{disableBooking ? (
						<button
							disabled
							className="flex-1 bg-[#004B40] text-white py-3 rounded-xl text-sm font-medium opacity-70 cursor-not-allowed"
							style={{ fontFamily: '"Readex Pro", sans-serif' }}
						>
							{isAr ? "قريباً ..." : "Soon ..."}
						</button>
					) : (
						<a
							href={link}
							className="flex-1 bg-[#004B40] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#003830] transition-colors flex items-center justify-center"
							style={{ fontFamily: '"Readex Pro", sans-serif' }}
						>
							{isAr ? "احجز الآن" : "Book Now"}
						</a>
					)}
					<a
						href={`/trip-detail/${id}`}
						className="flex-1 bg-gray-50 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200 flex items-center justify-center"
						style={{ fontFamily: '"Readex Pro", sans-serif' }}
					>
						{isAr ? "التفاصيل" : "Details"}
					</a>
				</div>
			</div>
		</div>
	);
}
