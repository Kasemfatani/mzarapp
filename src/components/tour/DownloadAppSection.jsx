"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DownloadButtons from "@/components/tour/DownloadButtons";
import Link from "next/link";

export default function DownloadAppSection({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");

	const isAr = language === "ar";

	return (
		<section className="relative w-full min-h-[220px] flex items-center bg-cover bg-center bg-[url('/tour/zoom-out.jpg')] mb-6">
			<div className="absolute inset-0 bg-[#E6D2AF]/80"></div>
			<div className="relative z-10 container m-auto flex flex-row items-center justify-between py-4 md:py-10 gap-2 md:gap-8">
				{/* Left: Text & Buttons */}
				<div className="flex-1 flex flex-col md:items-start gap-2 md:gap-4 max-w-xs md:max-w-2xl min-w-0">
					<h2 className="text-base md:text-4xl font-bold text-[var(--main-color)] leading-tight">
						{language === "ar"
							? "تجربة رقمية تواكب العصر"
							: " A digital experience"}
					</h2>

					<p className="text-[11px] md:text-3xl text-[var(--main-color)] leading-tight">
						{language === "ar"
							? "تربطك بالمكان عبر الذكاء التفاعلي"
							: "that connects you to every place through interactive intelligence , making your journey"}
					</p>

					<p className="text-[11px] md:text-3xl text-[var(--main-color)] leading-tight">
						{language === "ar"
							? "لتجعل رحلتك أكثر عمقًا ومتعة."
							: "deeper and more enjoyable"}
					</p>

					<Link
						href="https://onelink.to/yb2xky"
						target="_blank"
						className="inline-block"
					>
						<span className="hidden md:inline-block bg-[var(--main-color)] text-white hover:bg-white hover:text-black px-2 py-1 text-xs md:px-6 md:py-3 md:text-base font-semibold rounded-md">
							{isAr ? "جرّب تطبيق مزار الآن" : "Try Mzar App now"}
						</span>
					</Link>
					{/* Use DownloadButtons instead of the old download buttons */}
					<DownloadButtons language={language} />
				</div>
				{/* Right: Phones */}
				<div className="">
					<Image
						src={isAr ? "/tour/Phone.png" : "/tour/Phone_eng.png"}
						alt="Phone 1"
						width={342}
						height={340}
						className="w-[150px] md:w-auto"
					/>
				</div>
			</div>
		</section>
	);
}
