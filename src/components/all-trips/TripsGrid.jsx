"use client";

import { MapPin, Users, Clock, Star } from "lucide-react";
import { Pagination } from "./Pagination";
import { tr } from "date-fns/locale";
import { useState, useEffect } from "react";

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

export function TripsGrid({ lang, trips }) {
	const isAr = lang === "ar";

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(9);

	// Determine itemsPerPage based on viewport width
	useEffect(() => {
		function update() {
			const w = window.innerWidth;
			if (w >= 1024) setItemsPerPage(9); // desktop: 9 (3 cols x 3 rows)
			else if (w >= 768) setItemsPerPage(4); // tablet: 4 (2 cols x 2 rows)
			else setItemsPerPage(3); // mobile: 3 (single column stacked)
		}
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	// Reset page if itemsPerPage changes or trips length shrinks
	useEffect(() => {
		const totalPages = Math.max(1, Math.ceil(trips.length / itemsPerPage));
		if (currentPage > totalPages) setCurrentPage(1);
	}, [itemsPerPage, trips.length, currentPage]);

	const totalPages = Math.max(1, Math.ceil(trips.length / itemsPerPage));
	const start = (currentPage - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	const visibleTrips = trips.slice(start, end);

	// helper: scroll to #trips-sec if present
	const scrollToTrips = () => {
		const el = document.getElementById("trips-sec");
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
		else window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<section id="trips-sec" className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{visibleTrips.map((trip) => (
						<TripCard key={trip.id} trip={trip} isAr={isAr} />
					))}
				</div>

				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={(p) => {
						setCurrentPage(p);
						scrollToTrips();
					}}
					// onLoadMore will load next page (useful for mobile "Load more" button)
					onLoadMore={() => {
						if (currentPage < totalPages) {
							setCurrentPage((c) => c + 1);
							scrollToTrips();
						}
					}}
					isLoading={false}
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
	} else if (trip.city_id === 2) {
		cityName = isAr ? "المدينة المنورة" : "Madinah";
	}

	let link = `/book-path-new/${trip.id}`;

	if (trip.id === 88) {
		link = `/book-haram-new`;
	} else if (trip.id === 96) {
		link = `/book-tour-new`;
	} else if (trip.id === 87) {
		link = `/book-madinah-new`;
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
						<span className="text-[#475569]">
							({trip.rating_count ? trip.rating_count : ""})
						</span>
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
							<span dir="rtl">
								{trip.start_price.toFixed(2)} {CURRENCY_SVG}
							</span>
						</div>
					</div>

					{/* Buttons */}
					<div className="flex flex-col sm:flex-row gap-2">
						{/* Primary Button */}
						<a
							href={`/trip-detail/${trip.id}`}
							className="flex-1 px-4 py-2.5 bg-[#3C6652] text-white rounded-xl hover:bg-[#2d4d3d] transition-all duration-300  text-center"
							style={{ fontWeight: 500 }}
						>
							{isAr ? "شاهد التفاصيل" : "View Details"}
						</a>

						{/* Secondary Button */}
						<a 
							href={link}
							className="flex-1 px-4 py-2.5 border-2 border-[#E7D3AF] text-[#3C6652] rounded-xl hover:bg-[#E7D3AF] hover:border-[#E7D3AF] transition-all duration-300 text-center"
							style={{ fontWeight: 500 }}
						>
							{isAr ? "احجز الآن" : "Book Now"}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
