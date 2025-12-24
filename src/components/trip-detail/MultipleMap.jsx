"use client";

import { MapPin, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Image from "next/image";

const containerStyle = {
	width: "100%",
	height: "384px", // h-96
	borderRadius: "20px",
	overflow: "hidden",
};

const center = {
	lat: 21.4225,
	lng: 39.8262,
};

export function MultipleMap({ lang, data }) {
	const isAr = lang === "ar";

	const mapLocations = [
		{
			lat: 21.4225,
			lng: 39.8262,
			label: isAr ? "المسجد الحرام" : "Masjid al-Haram",
		},
		{
			lat: 21.3891,
			lng: 39.8579,
			label: isAr ? "برج الساعة" : "Abraj Al Bait",
		},
		{ lat: 21.4267, lng: 39.8256, label: isAr ? "جبل النور" : "Jabal al-Nour" },
		{ lat: 21.4187, lng: 39.8937, label: isAr ? "جبل ثور" : "Jabal Thawr" },
		{
			lat: 21.4225,
			lng: 39.8262,
			label: isAr ? "المسجد الحرام" : "Masjid al-Haram",
		},
		{
			lat: 21.3891,
			lng: 39.8579,
			label: isAr ? "برج الساعة" : "Abraj Al Bait",
		},
	];


return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			className="container mx-auto bg-white rounded-[20px] p-10 shadow-[0px_6px_20px_rgba(0,0,0,0.06)] mb-10"
		>
			{/* Section Header - Grouped */}
			<div className="mb-8">
				<div className="flex items-center gap-4 mb-6">
					<motion.div
						whileHover={{ scale: 1.1, rotate: 360 }}
						transition={{ duration: 0.6 }}
						className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#c9a463] to-[#b8914a] flex items-center justify-center"
					>
						<MapPin className="w-7 h-7 text-white" />
					</motion.div>
					<h2 className="text-[26px] leading-[1.3] text-[#0f3d2e]">
						{isAr ? "مواقع التجمع" : "Gathering Locations"}
					</h2>
				</div>
				<div className="h-px bg-gradient-to-r from-[#c9a463] via-gray-200 to-transparent"></div>
			</div>

			{/* Grid of Map Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{data.assimply_points.map((location, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, delay: index * 0.1 }}
						className="flex flex-col"
					>
						{/* Map Card */}
						<div className="relative w-full h-64 rounded-[20px] overflow-hidden shadow-lg mb-3">
							{/* Background Map Image */}
							<Image
								src="/trip-detail/map-img.webp"
								alt="Map background"
								fill
								className="object-cover"
							/>

							{/* Marker in Center */}
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c9a463] to-[#b8914a] shadow-xl flex items-center justify-center">
									<MapPin className="w-8 h-8 text-white" />
								</div>
							</div>

							{/* Google Maps Link at Bottom */}
							<a
								href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
								target="_blank"
								rel="noopener noreferrer"
								className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0f3d2e] hover:bg-[#1a5942] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition-colors w-[60%] justify-center"
							>
								<ExternalLink className="w-4 h-4" />
								<span className="text-[10px] w-fit">
									{isAr ? "عرض الموقع على الخرائط" : "View on Map"}
								</span>
								
							</a>
						</div>

						{/* Location Label */}
						<p className="text-center text-[#0f3d2e] font-medium text-lg">
							{location.name}
						</p>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
}
