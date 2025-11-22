"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import seoIcon from "/public/Home/seo.png";
// import routeIcon from "/public/Home/route.png";
import smartPhoneIcon from "/public/Home/smart-phone.png";
import AR_icon from "/public/Home/AR-icon.png";
import bus_icon from "/public/Home/bus-icon.png";
import Audio_Guide from "/public/Home/Audio-Guide.png";

const features = [
	{
		icon: smartPhoneIcon,
		ar: "حجز إلكتروني فوري عبر تطبيق مزار",
		en: "Instant online booking via Mzar app",
	},
	{
		icon: seoIcon,
		ar: "محتوى موثّق تاريخيًا",
		en: "Documented historical content",
	},
	{
		icon: AR_icon,
		ar: "تقنيات واقع معزز (AR) ",
		en: "Augmented Reality (AR) technologies",
	},
	{
		icon: Audio_Guide,
		ar: "مرشد صوتي بـ 6 لغات عالمية ",
		en: "Smart audio guide in 6 languages",
	},
	{
		icon: bus_icon,
		ar: "باصات حديثة مكيّفة ومريحة ",
		en: "Modern, air-conditioned, and comfortable buses",
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
					{isAr ? "تجربة تروي القصة وتُعيد الحياة للمكان " : "An experience that tells the story and brings the place to life"}
				</h2>
				<p className="text-center text-gray-500 mb-2">
					{isAr
						? "جولات حافلة مزار الإثرائية  بين الاستكشاف الميداني والتاريخ الموثق والتقنية الحديثة."
						: 'Mzar’s enrichment tours blend on-site exploration with verified history and modern technology.'}
				</p>
				<p className="text-center text-gray-500 mb-10 ">
					{isAr
						? "انطلاقًا من قلب مكة، تأخذك حافلة الجولة إلى المعالم التاريخية الرئيسية بينما تستمع إلى قصص أصيلة بلغتك المختارة عبر دليلنا الصوتي الذكي."
						: "Starting from the heart of Makkah, the tour bus takes you to key historical landmarks while you listen to authentic stories in your chosen language through our smart audio guide."}
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
				<p className="text-center bg-[var(--second-bg)] text-white mt-16 p-4 rounded-lg w-fit mx-auto text-lg">
					{isAr
						? '"استكشف مكة كما لم ترها من قبل عبر رحلة تجمع الإيمان بالتقنية"'
						: '"Explore Makkah like never before through a journey that blends faith with technology."'}
				</p>
			</div>
		</section>
	);
}
