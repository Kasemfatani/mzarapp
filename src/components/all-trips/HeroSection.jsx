"use client";

import Image from 'next/image'
import { MapPin} from 'lucide-react';

export default function HeroSection({ lang , totalResults }) {
	const isAr = lang === "ar";
	const totalTrips = totalResults || 0;

	return (
		<section className="relative h-[400px] bg-gradient-to-b from-[#F1F5F9] to-white overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0">
				<Image
					src="/all-trips/haram-bg.webp"
					alt="Mecca Background"
					className="w-full h-full object-cover"
					fill
					priority
				/>
				<div className="absolute inset-0 bg-black/50" />
			</div>

			



			{/* Content Container */}
			<div className="relative h-full flex flex-col justify-center px-6 pt-10 max-w-7xl mx-auto">
				{/* Title */}
				<h1
					className="text-[40px] text-white mb-4 animate-fade-up"
					style={{
						fontFamily: "Tajawal, sans-serif",
						letterSpacing: "0.02em",
						lineHeight: "1.3",
					}}
				>
				{isAr ? "جميع التجارب" : "All Experiences"}
				</h1>

				{/* Description */}
				<p
					className="text-[18px] text-white leading-[160%] mb-6 max-w-[520px]"
					style={{ fontFamily: "Tajawal, sans-serif" }}
				>
					{isAr
						? "استكشف جميع الجولات والتجارب المتوفّرة في مكة والمدينة من خلال رحلات معتمدة، مرشدين متخصصين، وحجوزات فورية بسهولة تامة."
						: "Explore all available tours and experiences in Mecca and Medina through certified trips, specialized guides, and instant bookings with ease."}
				</p>

				{/* Dynamic Counter Badge */}
				<div className="mb-6 inline-flex w-fit">
					<div className="bg-white rounded-[24px] px-5 py-3 flex items-center gap-3 shadow-[0_4px_14px_rgba(0,0,0,0.08)] animate-fade-in">
						<div className="w-8 h-8 bg-[#006064]/10 rounded-full flex items-center justify-center">
							<MapPin className="w-4 h-4 text-[#006064]" strokeWidth={2} />
						</div>
						<span
							className="text-[15px] text-[#006064]"
							style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 500 }}
						>
							{isAr ? "عدد التجارب المتاحة: " : "Available Experiences: "}
						
							<span className="font-semibold">{totalTrips}  {isAr ? "تجربة" : "Experiences"}</span>
						</span>
						
					</div>
				</div>
			</div>

			
		</section>
	);
}
