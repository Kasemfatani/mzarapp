"use client";

import { MapPin, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// const locations = [
// 	{ lat: 21.4225, lng: 39.8262, label: "المسجد الحرام" }, // Masjid al-Haram
// 	{ lat: 21.3891, lng: 39.8579, label: "برج الساعة" }, // Abraj Al Bait
// 	{ lat: 21.4267, lng: 39.8256, label: "جبل النور" }, // Jabal al-Nour
// 	{ lat: 21.4187, lng: 39.8937, label: "جبل ثور" }, // Jabal Thawr
// ];

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

export function MapSection({ lang , data }) {

  const isAr = lang === "ar";

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyCuS6yzhdLKU-fiY7zfmGX1yDPrHDvfYIE", 
	});

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
						  {isAr ? "تفاصيل المكان" : "Location Details"}
					</h2>
				</div>
				<div className="h-px bg-gradient-to-r from-[#c9a463] via-gray-200 to-transparent"></div>
			</div>

			{/* Google Map with Multiple Pins */}
			<motion.div
				whileHover={{ scale: 1.02 }}
				className="relative w-full h-96 rounded-[20px] overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.04)] cursor-pointer mb-8"
				style={{ minHeight: 384 }}
			>
				{isLoaded ? (
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={data.mapCenter || center}
						zoom={13}
						options={{
							mapTypeControl: false,
							streetViewControl: false,
							fullscreenControl: false,
						}}
					>
						{data.mapLocations.map((loc, idx) => (
							<Marker
								key={idx}
								position={{ lat: loc.lat, lng: loc.lng }}
								title={loc.label}
								// icon: Use default Google Maps pin. To use a custom SVG, see below.
							/>
						))}
					</GoogleMap>
				) : (
					<div className="flex items-center justify-center h-full text-gray-400">
					 	{isAr ? "جارٍ تحميل الخريطة..." : "Loading map..."}
					</div>
				)}
			</motion.div>

			{/* Open in Maps Button */}
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="w-fit mx-auto px-8 py-4 bg-gradient-to-r from-[#c9a463] to-[#b8914a] text-white rounded-[18px] hover:shadow-[0px_10px_30px_rgba(0,0,0,0.15)] transition-all flex items-center justify-center gap-3 text-[16px] group"
				onClick={() =>
					window.open(
						data.mapLink || "https://www.google.com/maps",
						"_blank"
					)
				}
			>
				<motion.div whileHover={{ rotate: 12 }} transition={{ duration: 0.3 }}>
					<ExternalLink className="w-5 h-5" />
				</motion.div>
				<span>{isAr ? "عرض الموقع على الخريطة" : "View Location on Map"}</span>
			</motion.button>
		</motion.div>
	);
}
