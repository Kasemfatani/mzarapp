"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import heroBg from "/public/book-tour/hero-bg.webp";

export default function HeroTop({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");

	// useEffect(() => {
	// 	if (typeof window === "undefined") return;
	// 	const stored = localStorage.getItem("lang");
	// 	if (stored === "ar" || stored === "en") setLanguage(stored);
	// 	else if (initialLang) setLanguage(initialLang);
	// }, [initialLang]);

	const isAr = language === "ar";

	return (
		<div className="mb-6">
			<br />
			<img src="/Home/header-logo.png" alt="logo" width={138} height={46} className="mx-auto"/>
			<section
				
				className="relative mt-6 py-10 w-full overflow-hidden flex justify-center items-center"
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
								? "الجولات الإثرائية – جولة المسجد النبوي"
								: "Enriching Tours – Masjid An-Nabawi Tour"}
						</h1>
						
						
					</div>
				</div>
			</section>
		</div>
	);
}
