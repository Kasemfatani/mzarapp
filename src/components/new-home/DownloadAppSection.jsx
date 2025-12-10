"use client";
import Image from "next/image";
import React, { useState } from "react";
import DownloadButtons from "@/app/saad-new/components/DownloadButtons";

export default function DownloadAppSection({ lang }) {
	const [language] = useState(lang || "ar");
	const isAr = language === "ar";

	return (
		<section className="relative w-full min-h-[420px] flex items-center bg-gradient-to-b from-[#F5F7F5] to-[#F5F4F3]/20 mb-10">
			<div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between py-10 gap-8">
				{/* Left: Text & Buttons */}
				<div
					className="flex-1 flex flex-col items-center md:items-start gap-6 max-w-2xl"
					
				>
					{/* Availability badge */}
					<div className="inline-flex items-center gap-2 bg-[#EFE9DC] text-[var(--second-bg)] px-4 py-2 rounded-full text-sm">
						<img src="/Home/small-phone.png" alt="phone icon" />
						<span>{isAr ? "متاح الآن" : "Available now"}</span>
					</div>

					{/* Heading */}
					<h2 className="text-3xl md:text-4xl font-bold text-black leading-tight">
						{isAr ? "تحميل تطبيق مزار" : "Download Mzar App"}
					</h2>

					{/* Description */}
					<p className="text-gray-700 text-base md:text-lg leading-relaxed">
						{isAr
							? "تجربة أسرع وأسهل للحجز — في أي وقت وأي مكان."
							: "A faster, easier booking experience — anytime, anywhere."}
					</p>

					{/* Feature chips */}
					<div className="flex flex-wrap gap-3">
						{[
							isAr ? "عروض حصرية" : "Exclusive offers",
							isAr ? "تتبع حجوزاتك" : "Track your bookings",
							isAr ? "احجز في ثوانٍ" : "Book in seconds",
						].map((text, i) => (
							<div
								key={i}
								className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0E9DB] text-[#2C2C2C] text-sm"
							>
								<span className=" w-5 h-5 rounded-full bg-[#3C6652] text-white grid place-items-center">
									✓
								</span>
								<span>{text}</span>
							</div>
						))}
					</div>

					{/* Black download buttons (kept as requested) */}
					<div className="w-full md:w-auto">
						<DownloadButtons language={language} />
					</div>
				</div>

				{/* Right: Phone image */}
				<div>
					<Image
						src={
							isAr
								? "/Home/download-phone-ar.png"
								: "/Home/download-phone-ar.png"
						}
						alt="App preview"
						width={342}
						height={340}
						priority
					/>
				</div>
			</div>
		</section>
	);
}
