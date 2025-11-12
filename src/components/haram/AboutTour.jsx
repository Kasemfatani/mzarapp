"use client";
import React, { useEffect, useState } from "react";

const features = [
	{
		icon: "fa-regular fa-clock",
		ar: "مدة الرحلة",
		en: "Duration",
		valueAr: "90 دقيقة من الإثراء والسكينة",
		valueEn: "90 minutes of enrichment and tranquility",
	},
	{
		icon: "fa-solid fa-user-group",
		ar: "الفئة",
		en: "Category",
		valueAr: " متاحة للرجال فقط",
		valueEn: "Available for men only",
	},
	{
		icon: "fa-solid fa-wheelchair",
		ar: "الوصول",
		en: "Accessibility",
		valueAr: "مهيأة بالكامل لذوي الاحتياجات الخاصة",
		valueEn: "Fully equipped for people with special needs",
	},
	{
		//<i class="fa-solid fa-user-group"></i>
		icon: "fa-solid fa-user-group",
		ar: "الأعمار",
		en: "Ages",
		valueAr: "مناسبة لجميع الأعمار فوق 6 سنوات",
		valueEn: "Suitable for all ages above 6 years",
	},
	{
		icon: "fa-regular fa-newspaper",
		ar: "تفاعل",
		en: "Engagement",
		valueAr: "صور، خرائط، ومرشد صوتي ذكي",
		valueEn: "Includes photos, maps, and an intelligent audio guide",
	},
	{
		icon: "fa-solid fa-language",
		ar: "اللغات المتاحة",
		en: "Languages",
		valueAr: "(العربية، الإنجليزية، الفرنسية، التركية، الأردية، المالاوية)",
		valueEn: "(Arabic, English, French, Turkish, Urdu, Malay)",
	},
];

export default function AboutTour({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");
	// useEffect(() => {
	// 	if (typeof window === "undefined") return;
	// 	const stored = localStorage.getItem("lang");
	// 	if (stored === "ar" || stored === "en") setLanguage(stored);
	// 	else if (initialLang) setLanguage(initialLang);
	// }, [initialLang]);
	const isAr = language === "ar";

	return (
		<section className="py-10 bg-[#FCF8EE]">
			<div className="flex justify-center px-4">
				<div className="flex flex-wrap justify-center gap-6 md:max-w-3xl">
					{features.map((f, i) => (
						<div
							key={i}
							className="flex items-center gap-6 md:gap-2 min-w-[180px] max-w-[240px] flex-1"
						>
							<div className="">
								<span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#E6E0D0] text-[#8B7B5A] text-xl">
									<i className={f.icon}></i>
								</span>
							</div>
							<div>
								<div className="font-semibold text-start text-gray-700 mb-1">
									{isAr ? f.ar : f.en}
								</div>
								<div className="text-start text-gray-600 text-sm">
									{isAr ? f.valueAr : f.valueEn}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
