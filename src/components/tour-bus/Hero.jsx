"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import heroBg from "/public/tour-bus/hero-bg.webp";

export default function Hero({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");

	// useEffect(() => {
	// 	if (typeof window === "undefined") return;
	// 	const stored = localStorage.getItem("lang");
	// 	if (stored === "ar" || stored === "en") setLanguage(stored);
	// 	else if (initialLang) setLanguage(initialLang);
	// }, [initialLang]);

	const isAr = language === "ar";

	return (
		<section
			dir={isAr ? "rtl" : "ltr"}
			className="relative md:min-h-screen min-h-[70vh] w-full overflow-hidden flex justify-center items-center"
		>
			{/* background image */}
			<div className="absolute inset-0 -z-10">
				<Image
					src={heroBg}
					alt="hero background"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/45 md:bg-black/50" />
			</div>

			<div className="container m-auto px-4 ">
				<div className="w-full text-center text-white py-16 md:py-0">
					
					{/* Heading */}
					<h1 className="text-3xl md:text-5xl text-center font-bold !leading-tight ">
						{isAr
							? "الجولات الإثرائية في مكة المكرمة"
							: "Enriching Tours in Makkah"}
					</h1>
					<h1 className="text-3xl md:text-5xl text-center font-bold !leading-tight ">
						{isAr
							? "رحلة تجمع بين الإيمان والمعرفة والتقنية."
							: " A journey that blends faith, knowledge, and technology."}
					</h1>

					{/* Subtext / description */}
					

					<p className="text-base md:text-lg text-gray-300 text-center mb-6 mt-6">
						{isAr
							? "انطلق معنا في تجربة سياحية روحانية فريدة على متن باص مزار الإثرائي، لتستكشف المعالم التاريخية والإسلامية في مكة المكرمة. استمع إلى القصص بلغتك، وشاهد الأحداث كما رُويت، عبر تقنيات الواقع المعزز والمرشد الصوتي الذكي. "
							: "Embark on a unique spiritual tour experience aboard the Mzar Enriching Bus, exploring historical and Islamic landmarks in Makkah. Listen to stories in your language and witness events as they were narrated, through augmented reality technologies and smart audio guides."}
					</p>

					{/* Buttons (no links yet) */}
					<div className="flex flex-col sm:flex-row items-center justify-center  gap-3">
						<Link
							href="/book-tour"
							
							className="inline-block"
						>
							<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-6 py-3  font-semibold rounded-lg">
								{isAr ? "احجز جولتك الآن" : "Book Your Tour Now"}
							</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
