"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const stationImg = "/haram/station-img.png"; 
const station1 = "/haram/station-1-new.webp"; 
const station2 = "/haram/station-2-new.webp";
const station3 = "/haram/station-3-new.webp";
const station4 = "/haram/station-4-new.webp";

const stationsData = {
	ar: [
		{
			title: "المحطة الأولى",
			img: station1,
			items: ["معرض المسجد الحرام"],
		},
		{
			title: "المحطة الثانية",
			img: station2,
			items: ["الساحات.", "المنارات.", "الأبواب.", "عمارة المسجد الحرام."],
		},
		{
			title: "المحطة الثالثة",
			img: station3,
			items: [
				"الكعبة المشرفة.",
				"الحجر أو الحطيم.",
				"مقام إبراهيم عليه السلام.",
				"بئر زمزم.",
			],
		},
		{
			title: "المحطة الرابعة",
			img: station4,
			items: ["الصفا.", "المروة.", "باب السلام."],
		},
	],
	en: [
		{
			title: "First Station",
			img: station1,
			items: ["Masjid al-Haram Exhibition"],
		},
		{
			title: "Second Station",
			img: station2,
			items: [
				"Courtyards.",
				"Minarets.",
				"Gates.",
				"Architecture of Masjid al-Haram.",
			],
		},
		{
			title: "Third Station",
			img: station3,
			items: [
				"The Kaaba.",
				"Hijr Ismail (Hatim).",
				"Maqam Ibrahim (Station of Abraham).",
				"Zamzam Well.",
			],
		},
		{
			title: "Fourth Station",
			img: station4,
			items: ["Safa.", "Marwa.", "Bab Al-Salam."],
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
							? "معالمك في الطريق إلى الروح..."
							: "Your Landmarks on the Path to the Spirit..."}
					</h2>
					<p className="text-gray-600 mb-1">
						{isAr
							? "نزور معك أهم محطات المسجد الحرام التي تحمل في طياتها تاريخاً خالداً،"
							: "Join us as we visit the most significant sites within Al-Masjid Al-Haram — places that hold timeless history."}
					</p>
					<p className="text-gray-600">
						{isAr
							? "ونروي لك القصص كما وقعت، لتراها أمامك في موضعها الحقيقي."
							: "We bring the stories to life, right where they truly happened."}
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
						href="/book-haram"
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
