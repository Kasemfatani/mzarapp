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
			title: "الحجاج والمعتمرين",
			img: station1,
			desc: " للتعرّف على المعالم التي تمر بها رحلتهم إلى الحرم.",
			items: ["معرض المسجد الحرام"],
		},
		{
			title: "العائلات والطلاب",
			img: station2,
			desc: "كوسيلة تعليمية ممتعة. ",
			items: ["الساحات.", "المنارات.", "الأبواب.", "عمارة المسجد الحرام."],
		},
		{
			title: "لشركاء السياحة والفنادق",
			img: station3,
			desc: "لتقديم خدمة قيمة لضيوفهم. ",
			items: [
				"الكعبة المشرفة.",
				"الحجر أو الحطيم.",
				"مقام إبراهيم عليه السلام.",
				"بئر زمزم.",
			],
		},
		{
			title: "لمستخدمي النقل العام",
			img: station4,
			desc: "لتتحول الرحلة اليومية إلى تجربة ثرية. ",
			items: ["الصفا.", "المروة.", "باب السلام."],
		},
	],
	en: [
		{
			title: "Pilgrims and Umrah Visitors",
			img: station1,
			desc: "To learn about the landmarks along their journey to the Haram.",
			items: ["Masjid al-Haram Exhibition"],
		},
		{
			title: "Families and Students",
			img: station2,
			desc: "As an enjoyable educational tool. ",
			items: [
				"Courtyards.",
				"Minarets.",
				"Gates.",
				"Architecture of Masjid al-Haram.",
			],
		},
		{
			title: "Tourism and Hotel Partners",
			img: station3,
			desc: "To provide a valuable service to their guests. ",
			items: [
				"The Kaaba.",
				"Hijr Ismail (Hatim).",
				"Maqam Ibrahim (Station of Abraham).",
				"Zamzam Well.",
			],
		},
		{
			title: "Public Transport Users",
			img: station4,
			desc: "To transform the daily journey into a rich experience. ",
			items: ["Safa.", "Marwa.", "Bab Al-Salam."],
		},
	],
};

export default function Stations({ lang }) {
	const [language, setLanguage] = useState(lang || "en");
	
	const isAr = language === "ar";
	const stations = isAr ? stationsData.ar : stationsData.en;

	return (
		<section className="py-12 bg-white">
			<div className="container mx-auto px-4">
				{/* Top texts */}
				<div className="text-center mb-8">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
						{isAr
							? "لمن هذه الخدمة ؟"
							: "Who is this service for ?"}
					</h2>
					
				</div>

				{/* Cards */}
				<div className="flex flex-col md:flex-row flex-wrap gap-4 mb-8">
					{stations.map((station, idx) => (
						<div
							key={idx}
							className="md:flex-1 flex flex-col items-center bg-white rounded-2xl shadow-md overflow-hidden  md:min-h-[250px]  mx-auto w-[80%] md:w-auto"
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
								{station.desc && (
									<p className="text-sm text-center text-gray-600 mb-2">
										{station.desc}
									</p>
								)}
								
							</div>
						</div>
					))}
				</div>

				{/* Button */}
				<div className="flex justify-center">
					<Link
						href="https://onelink.to/yb2xky"
						className="inline-block"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-4 py-3 font-semibold rounded-lg">
							{isAr ? "شارك التجربة-نزل التطبيق الآن" : "Share the Experience - Download the App Now"}
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
}
