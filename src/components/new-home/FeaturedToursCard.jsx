"use client";

import { Star, Clock, TrendingUp, MapPin, Users } from "lucide-react";
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

export function FeaturedToursCard({
	id,
	image,
	name,
	city,
	short_description,
	start_price,
	old_price,
	rating,
	rating_count,
	duration,
	min_people_count,
	isPopular = false,
	isAr = false,
	isSaudi = true, // Default to true if the prop is not passed
}) {

	// --- Currency Logic ---
	const SAR_RATE = 3.75;
	let displayPrice;
	let currencySymbol;
	let displayOldPrice;

	if (isSaudi) {
		displayPrice = start_price;
		currencySymbol = isAr ? SAR_LABEL : "SAR";
		displayOldPrice = old_price;
	} else {
		displayPrice = start_price / SAR_RATE;
		currencySymbol = isAr ? "دولار" : "USD";
		displayOldPrice = old_price / SAR_RATE;
	}
	// --- End Currency Logic ---

	let link = `/book-path/${id}`;

	if (id === 88) {
		link = `/book-haram`;
	} else if (id === 96) {
		link = `/book-tour`;
	} else if (id === 87) {
		link = `/book-madinah`;
	}

	let disableBooking = false;
	if (id === 87) {
		disableBooking = true;
	}

	

	return (
		<div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-[1.02]">
			{/* Image Container */}
			<div className="relative h-64 overflow-hidden">
				<a href={`/trip-detail/${id}`}>
					<Image
						src={image}
						alt={name}
						className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
						fill
					/>
				</a>

				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"></div>

				{/* Popular Badge */}
				{isPopular && (
					<div
						className="absolute top-4 right-4 bg-gradient-to-r from-[#867957] to-[#3C6652] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm"
						style={{  fontWeight: 500 }}
					>
						<TrendingUp size={16} />
						<span>{isAr ? "الأكثر طلبًا" : "Most Popular"} </span>
					</div>
				)}

				{/* city Tag */}
				<div
					className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm"
					
				>
					<MapPin size={14} />
					<span>{city}</span>
				</div>
			</div>

			{/* Content */}
			<div className="p-6">
				{/* name */}
				<a href={`/trip-detail/${id}`}>
					<h3
						className="text-[#3C6652] mb-2  font-semibold"
						style={{ fontSize: "1.375rem" }}
					>
						{name}
					</h3>
				</a>

				{/* short_description */}
				<p className="text-gray-600 text-sm mb-4 line-clamp-2 ">
					{short_description}
				</p>

				<div className="flex flex-col md:flex-row justify-center   md:justify-between items-center">
					{/* start_price */}
					<div className="mb-4 ">
						<span className="text-sm text-gray-600">
							{isAr ? "ابتداءً من" : "Starting from"}
						</span>
						<div
							className="text-2xl text-[#867957] mt-1 "
							style={{ fontWeight: 700 }}
						>
							<span className="text-sm  flex items-center gap-1">
								{displayPrice.toFixed(2)} {currencySymbol}
							</span>
							<span className="text-xs  flex items-center gap-1 line-through opacity-70">
								{displayOldPrice.toFixed(2)} {currencySymbol}
							</span>
						</div>
					</div>

					<div>
						{/* Icons Row */}
						<div className="flex items-center gap-4 mb-4 justify-center md:justify-end flex-wrap">
							<div
								className="flex items-center gap-2 text-gray-600 text-sm"
								
							>
								<span>{duration}</span>
								<Clock size={16} className="text-[#867957]" />
							</div>
							<div
								className="flex items-center gap-2 text-gray-600 text-sm"
								
							>
								<span>
									{min_people_count} {isAr ? "شخص" : "people"}
								</span>
								<Users size={16} className="text-[#867957]" />
							</div>
						</div>

						{/* Rating */}
						<div className="flex items-center gap-3 mb-4 justify-end">
							<span
								className="text-gray-600 text-sm"
								
							>
								({rating_count} {isAr ? "تقييم" : "reviews"} )
							</span>
							<div className="flex items-center gap-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={16}
										className={
											i < rating
												? "fill-[#867957] text-[#867957]"
												: "text-gray-300"
										}
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* CTA Buttons */}
				<div className="flex flex-col gap-3">
					<a
						href={`/trip-detail/${id}`}
						className="w-full text-center bg-[#3C6652] text-white py-3 rounded-xl hover:bg-[#1E3A5F] transition-all shadow-md hover:shadow-lg"
						style={{  fontWeight: 500 }}
					>
						{isAr ? "شاهد التفاصيل" : "View Details"}
					</a>

					{disableBooking ? (
						<a
							href="#"
							className="w-full text-[#867957] hover:text-[#3C6652] transition-colors text-center"
							style={{
								
								fontWeight: 500,
							}}
						>
							{isAr ? " قريباً ..." : "Soon ..."}
						</a>
					) : (
						<a
							href={link}
							className="w-full text-[#867957] hover:text-[#3C6652] transition-colors text-center"
							style={{
								
								fontWeight: 500,
							}}
						>
							{isAr ? "احجز الآن ←" : "Book Now →"}
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
