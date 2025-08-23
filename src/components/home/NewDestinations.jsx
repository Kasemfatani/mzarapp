"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewDestinations() {
	const [language, setLanguage] = useState("en"); // Default language is 'en'
	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || "en");
		}
	}, []);

	// Texts for both languages
	const texts = {
		en: {
			title: "Medina is the heart of prophetic history",
			desc: "Embark on a spiritual journey through prophetic and historical landmarks, where the fragrant biography is evident in every corner.",
			button: "Discover Now",
		},
		ar: {
			title: "المدينة المنورة قلب التاريخ النبوي",
			desc: "انطلق في رحلة روحانية بين المعالم النبوية والتاريخية، حيث تتجلى السيرة العطرة في كل زاوية.",
			button: "اكتشف الآن",
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
					href="/?filter=2#paths"
					className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
					onClick={(e) => {
						e.preventDefault();
						// push new url; Paths will react via useSearchParams
						router.push("/?filter=2#paths");
						// scroll to paths after a short delay to allow route/url update
						setTimeout(() => {
							const el = document.getElementById("paths");
							if (el) el.scrollIntoView({ behavior: "smooth" });
						}, 50);
					}}
				>
					{t.button}
				</Link>
			</div>
		</section>
	);
}
