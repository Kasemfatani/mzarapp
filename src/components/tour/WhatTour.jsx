"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import seoIcon from "/public/Home/seo.png";
// import routeIcon from "/public/Home/route.png";
// import smartPhoneIcon from "/public/Home/smart-phone.png";
import AR from "/public/Home/AR.png";
import Audio from "/public/Home/Audio-Guide.png";
import map from "/public/Home/map.svg";
import photography from "/public/Home/photography.svg";
import imageIcon from "/public/Home/image.svg";

const features = [
	{
		icon: Audio,
		ar: "ترجمة فورية بعدة لغات",
		en: "Instant translation in multiple languages",
	},
	{
		icon: AR,
		ar: "واقع معزز (AR) يعرض القصص والمشاهد",
		en: "Augmented Reality (AR) for stories & scenes",
	},
	{
		icon: map,
		ar: "دقة الموقع",
		en: "Accurate of the site",
	},
	{
		icon: imageIcon,
		ar: "صور تاريخية نادرة",
		en: "Rare historical photos",
	},
	{
		icon: photography,
		ar: "تنظيم ميداني احترافي ومرشد سياحي",
		en: "Professional field organization & Tour guide",
	},
];

export default function WhatTour({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");
	// useEffect(() => {
	// 	if (typeof window === "undefined") return;
	// 	const stored = localStorage.getItem("lang");
	// 	if (stored === "ar" || stored === "en") setLanguage(stored);
	// 	else if (initialLang) setLanguage(initialLang);
	// }, [initialLang]);
	const isAr = language === "ar";

	return (
		<section className="py-16 ">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900">
					{isAr ? "ما هي الجولات الإثرائية؟" : "What are the Enriching Tours?"}
				</h2>
				<p className="text-center text-gray-500 mb-2">
					{isAr
						? "“مزار” تقدم تجربة سياحية إثرائية داخل الحرمين الشريفين، تمزج بين المعرفة، التأمل، والتقنية الحديثة."
						: '“Mzar” offers an enriching tourism experience inside the Haramain , blending knowledge, reflection, and modern technology.'}
				</p>
				<p className="text-center text-gray-500 mb-10 ">
					{isAr
						? "من خلال جولات ميدانية بإشراف رسمي، ترافُقك الأصوات، والصور، والخرائط التفاعلية تروي لك تاريخ المكان كما حدث فعلاً."
						: "Through officially guided field tours, voices, visuals, and interactive maps accompany you to narrate the true story of each sacred place , just as it happened."}
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
					{features.map((f, i) => (
						<div
							key={i}
							className="flex flex-col items-center bg-[#F9F6EF] rounded-2xl p-6 shadow-xl min-h-[180px]"
						>
							<div className="mb-4">
								<Image
									src={f.icon}
									alt=""
									width={48}
									height={48}
									className="mx-auto"
									draggable={false}
								/>
							</div>
							<div className="text-center text-gray-800 font-semibold text-base leading-snug">
								{isAr ? f.ar : f.en}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
