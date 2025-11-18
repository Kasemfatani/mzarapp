"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";


const station1 = "/madinah/station-1.webp"; 
const station2 = "/madinah/station-2.webp";
const station3 = "/madinah/station-3.webp";
const station4 = "/madinah/station-4.webp";

const stationsData = {
	ar: [
		{
			title: "المحطة الأولى",
			img: station1,
			items: ["منطقة المصليات", "معرض عمارة المسجد النبوي"],
		},
		{
			title: "المحطة الثانية",
			img: station2,
			items: ["المظلات" , "المنارات و القِبب"],
		},
		{
			title: "المحطة الثالثة",
			img: station3,
			items: [
				"عمارة المسجد النبوي","الحصوات"
			],
		},
		{
			title: "المحطة الرابعة",
			img: station4,
			items: [" باب السلام ", "المحاريب", "الروضة الشريفة", "بقيع الغرقد", "خَوْخة أبي بكر الصديق"],
		},
	],
	en: [
		{
			title: "1st Station",
			img: station1,
			items: ["Prayer Area Zone" , "Exhibition of the Prophet’s Mosque Architecture"],
		},
		{
			title: "2nd Station",
			img: station2,
			items: [
				"Umbrellas",
				"Minarets and Domes",
			],
		},
		{
			title: "3rd Station",
			img: station3,
			items: [
				"Architecture of the Prophet’s Mosque",
				"Courtyards",
				
			],
		},
		{
			title: "4th Station",
			img: station4,
			items: ["Bab Al-Salam (Gate of Peace)", " Abu Bakr Al-Siddiq’s Door", "the Mihrabs (Prayer Niches) ", "The Noble Rawdah", "Al-Baqi’ Al-Gharqad Cemetery "],
		},
	],
};

export default function Stations({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");
	useEffect(() => {
		if (typeof window === "undefined") return;
		const stored = localStorage.getItem("lang");
		if (stored === "ar" || stored === "en") setLanguage(stored);
		else if (initialLang) setLanguage(initialLang);
	}, [initialLang]);
	const isAr = language === "ar";
	const stations = isAr ? stationsData.ar : stationsData.en;

	return (
		<section className="py-12 bg-white">
			<div className="container mx-auto px-4">
				{/* Top texts */}
				<div className="text-center mb-8">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
						{isAr
							? "محطات من النور… حيث سار النبي ﷺ."
							: "Stations of Light… Where the Prophet ﷺ Walked."}
					</h2>
					<p className="text-gray-600 mb-1">
						{isAr
							? "نزور في هذه الجولة مواقع مباركة تحمل عبق السيرة النبوية،"
							: " In this tour, we visit the blessed sites that preserve the fragrance of the Prophet’s life ﷺ."}
					</p>
					<p className="text-gray-600">
						{isAr
							? "ونروي القصص كما وردت في الروايات الصحيحة، لتراها بعينك في موضعها الأصلي."
							: " Hear the authentic stories and witness the landmarks in their original setting, where history truly unfolded."}
					</p>
				</div>

				{/* Cards */}
				<div className="flex flex-col md:flex-row flex-wrap gap-4 mb-8">
					{stations.map((station, idx) => (
						<div
							key={idx}
							className="md:flex-1 flex flex-col items-center bg-white rounded-2xl shadow-md overflow-hidden  md:min-h-[340px]  mx-auto w-[80%] md:w-auto"
						>
							<div className="w-full h-36 relative">
								<Image
									src={station.img}
									alt={station.title}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 320px"
									priority={idx === 0}
								/>
							</div>
							<div className=" flex flex-col justify-between w-full px-4 py-4">
								<h3 className="text-lg font-bold text-center mb-2 text-gray-900">
									{station.title}
								</h3>
								<ul className="list-disc ps-5 text-gray-700 text-sm  space-y-1">
									{station.items.map((item, i) => (
										<li key={i} className="">
											{item}
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>

				{/* Centered text below cards */}
				<div className="text-center text-black mb-6">
					{isAr
						? '"في 90 دقيقة فقط، يعيش الزائر قرونًا من التاريخ والإيمان."'
						: '"In just 90 minutes, visitors experience centuries of history and faith."'}
				</div>

				{/* Button */}
				<div className="flex justify-center">
					<Link
						href="/book-madinah"
						
						className="inline-block"
					>
						<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-16 py-3 font-semibold rounded-lg">
							{isAr ? "احجز الآن" : "Book Now"}
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
}
