"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DownloadButtons from "@/app/saad-new/components/DownloadButtons";
import Link from "next/link";

export default function DownloadAppSection({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");
	const [gclid, setGclid] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem("gclid") || "";
			setGclid(stored);
		}
	}, []);

	const isAr = language === "ar";
	const whatsappText = isAr
		? `أريد حجز جولة. ${gclid ? ` رمز الخصم (${gclid})` : ""}`
		: `I want to book a tour. ${gclid ? ` Discount code (${gclid})` : ""}`;

	return (
		<section className="relative w-full min-h-[420px] flex items-center bg-[var(--main-bg)]   mb-10">
			{/* <div className="absolute inset-0 bg-white/60"></div> */}
			<div className="relative z-10 container m-auto flex flex-col md:flex-row items-center justify-between py-10 gap-8">
				{/* Left: Text & Buttons */}
				<div className="flex-1 flex flex-col items-center md:items-start gap-6 max-w-2xl">
					<h2 className="text-4xl font-bold text-black leading-tight">
						{isAr
							? "احجز مكانك الآن وابدأ رحلتك."
							: "Book your spot now and start your journey."}
					</h2>

					{/* three brown pills (two per row, wrapped) */}
					<div className="flex flex-wrap gap-3 mt-2">
						<div className="px-6 py-4 rounded-lg bg-[#8B7B5A] text-white font-semibold text-sm flex  gap-2">
							<img src="/haram/clock.png" alt="clock" className="w-5" />
							{isAr ? "المدة: 90 دقيقة" : "Duration: 90 min"}
						</div>
						<div className="px-6 py-4 rounded-lg bg-[#8B7B5A] text-white font-semibold text-sm flex  gap-2">
							<img src="/haram/price-tag.png" alt="price-tag" className="w-5" />
							{isAr
								? "السعر: يبدأ من 499 ريال ل 5 أشخاص"
								: "Starts from: 499 SAR for 5 people"}
						</div>
						<div className="px-6 py-4 rounded-lg bg-[#8B7B5A] text-white font-semibold text-sm flex  gap-2">
							<img src="/haram/calendar.png" alt="calendar" className="w-5" />
							{isAr
								? "المواعيد: كل أحد، ثلاثاء، وأربعاء"
								: "Schedule: Sun, Tue & Wed"}
						</div>
					</div>

					{/* Download button + WhatsApp link */}
					<div className="flex flex-col md:flex-row items-center gap-3 mt-2 w-full">
						<Link
							href="https://onelink.to/yb2xky"
							className="inline-block"
							target="_blank"
						>
							<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-6 py-3  font-semibold rounded-lg">
								{isAr ? "احجز الآن باستخدام التطبيق" : "Book Now Using The App"}
							</span>
						</Link>

						{/* WhatsApp CTA next to download buttons */}
						<a
							href={`https://wa.me/+966580121025?text=${encodeURIComponent(
								whatsappText
							)}`}
							target="_blank"
							rel="noopener noreferrer"
							className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-[var(--main-color)] text-[var(--main-color)] px-5 py-3 rounded-lg font-semibold hover:bg-[var(--main-color)] hover:text-white transition"
						>
							<i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
							<span>
								{isAr ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
							</span>
						</a>
					</div>
					{/* existing black download buttons */}
					<div className="w-full md:w-auto">
						<DownloadButtons language={language} />
					</div>
				</div>
				{/* Right: Phones */}
				<div className="">
					<Image
						src={ isAr ? "/haram/download-phone.png" : "/haram/download-phone-en.webp"}
						alt="Phone 1"
						width={342}
						height={340}
						className=""
					/>
				</div>
			</div>
		</section>
	);
}
