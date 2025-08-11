"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function NewDestinations() {
	const [language, setLanguage] = useState("en"); // Default language is 'en'

	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || "en");
		}
	}, []);

	// Texts for both languages
	const texts = {
		en: {
			title: "Explore new destinations starting",
			desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
			button: "View Tours",
		},
		ar: {
			title: "استكشف وجهات جديدة تبدأ",
			desc: "لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد. كان لوريم إيبسوم النص القياسي للصناعة.",
			button: "عرض الجولات",
		},
	};

	const t = language === "ar" ? texts.ar : texts.en;

	return (
		<section
			className="relative flex flex-col items-center justify-center py-20"
			style={{
				backgroundImage: "url('/NewDestinations-bg.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				minHeight: 350,
			}}
			dir={language === "ar" ? "rtl" : "ltr"}
		>
			{/* Overlay */}
			<div className="absolute inset-0 bg-black/70"></div>
			{/* Content */}
			<div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto px-4">
				<div className="flex items-center gap-4 mb-4">
					<img
						src={
							language === "ar"
								? "/NewDestinations-img-ar.png"
								: "/NewDestinations-img.png"
						}
						alt={language === "ar" ? "جديد" : "New"}
						className="w-16 h-16"
						style={{ objectFit: "contain" }}
					/>
					<h2 className="text-3xl md:text-4xl font-bold text-white ">
						{t.title}
					</h2>
				</div>
				<p className="text-white text-center text-lg md:text-xl mb-6">
					{t.desc}
				</p>
				<Link
					href="#"
					className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
				>
					{t.button}
				</Link>
			</div>
		</section>
	);
}
