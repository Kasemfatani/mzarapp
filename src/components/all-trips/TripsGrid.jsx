"use client";

import { MapPin, Users, Clock, Star } from "lucide-react";
import { Pagination } from "./Pagination";
import { tr } from "date-fns/locale";



export function TripsGrid({ lang, trips }) {
	const isAr = lang === "ar";

	return (
		<section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{trips.map((trip) => (
						<TripCard key={trip.id} trip={trip} isAr={isAr} />
					))}
				</div>
				<Pagination
					currentPage={1}
					totalPages={1}
					onPageChange={() => {}}
					isAr={isAr}
				/>
			</div>
		</section>
	);
}

function TripCard({ trip, isAr }) {
	
	let cityName = "";
	if (trip.city_id === 1) {
		cityName = isAr ? "مكة المكرمة" : "Makkah";
	}
	else if (trip.city_id === 2) {
		cityName = isAr ? "المدينة المنورة" : "Madinah";
	}

	return (
		<div className="group bg-white rounded-[20px] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 flex flex-col h-full">
			{/* Image Section */}
			<div className="relative h-56 overflow-hidden">
				<img
					src={trip.image}
					alt={trip.name}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
				/>

				{/* City Badge - Top Left */}
				<div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
					<span className="text-sm text-[#3C6652]" style={{ fontWeight: 500 }}>
						{cityName}
					</span>
					<MapPin className="w-3.5 h-3.5 text-[#867957]" />
				</div>

				{/* Optional Badge - Top Right */}
				{trip.badge && (
					<div className="absolute top-4 right-4 bg-[#867957] text-white px-3 py-1.5 rounded-full shadow-lg animate-fade-in">
						<span className="text-xs" style={{ fontWeight: 500 }}>
							{trip.badge}
						</span>
					</div>
				)}
			</div>

			{/* Card Content */}
			<div className="p-5 flex flex-col flex-1">
				{/* Title */}
				<h3
					className="text-lg text-[#0F172A] mb-2  line-clamp-2 min-h-[3.5rem] leading-relaxed"
					style={{ fontWeight: 700 }}
				>
					{trip.name}
				</h3>

				{/* Description */}
				<p className="text-sm text-[#475569] mb-4  line-clamp-6 leading-relaxed">
					{trip.short_description}
				</p>

				{/* Icons Row */}
				<div className="flex items-center  gap-4 mb-4 text-sm text-[#475569]">
					{/* People */}
					<div className="flex items-start gap-1.5">
						<Users className="w-4 h-4 text-[#867957]" />
						<span>
							{trip.min_people_count} {isAr ? "شخص" : "people"}
						</span>
					</div>

					{/* Duration */}
					<div className="flex items-start gap-1.5">
						<Clock className="w-4 h-4 text-[#867957]" />
						<span>{trip.duration} </span>
					</div>

					{/* Rating */}
					<div className="flex items-start gap-1.5">
						<Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
						<span className="text-[#0F172A]" style={{ fontWeight: 500 }}>
							{trip.rating}
						</span>
						<span className="text-[#475569]">({trip.rating_count ? trip.rating_count : ""})</span>
					</div>
				</div>

				{/* Spacer to push content below to bottom */}
				<div className="flex-1" />

				{/* Bottom Section - Price and Buttons */}
				<div className="mt-auto">
					{/* Divider */}
					<div className="border-t border-gray-100 mb-4" />

					{/* Price Section */}
					<div className="mb-4 ">
						<div className="text-xs text-[#867957] mb-1">
							{isAr ? "ابتداءً من" : "Starting from"}
						</div>
						<div
							className="text-2xl text-[#3C6652]"
							style={{ fontWeight: 700 }}
						>
							{trip.start_price} {isAr ? "ريال" : "SAR"}
						</div>
					</div>

					{/* Buttons */}
					<div className="flex flex-col sm:flex-row gap-2">
						{/* Primary Button */}
						<a
							href={`/trip-detail/${trip.id}`}

							className="flex-1 px-4 py-2.5 bg-[#3C6652] text-white rounded-xl hover:bg-[#2d4d3d] transition-all duration-300 "
							style={{ fontWeight: 500 }}
						>
							{isAr ? "شاهد التفاصيل" : "View Details"}
						</a>

						{/* Secondary Button */}
						<button
							className="flex-1 px-4 py-2.5 border-2 border-[#E7D3AF] text-[#3C6652] rounded-xl hover:bg-[#E7D3AF] hover:border-[#E7D3AF] transition-all duration-300"
							style={{ fontWeight: 500 }}
						>
							{isAr ? "احجز الآن" : "Book Now"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
