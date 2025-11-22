"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import bigImg from "/public/haram/big-img.png";
import smallImg from "/public/haram/small-img.png";
import StarRating from "@/components/Path/StarRating";

export default function TourStory({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");
	// useEffect(() => {
	// 	if (typeof window === "undefined") return;
	// 	const stored = localStorage.getItem("lang");
	// 	if (stored === "ar" || stored === "en") setLanguage(stored);
	// 	else if (initialLang) setLanguage(initialLang);
	// }, [initialLang]);
	const isAr = language === "ar";

	const points = isAr
		? [
				"نأخذك في جولة تمتد نحو 90 دقيقة بين أروقة المسجد الحرام،",
				"نروي لك فيها قصة الكعبة",
				"ونحكي لك قصة عمارة هذا البيت المعظم وتطور عبر العصور",
				"تجربة تثري القلب والعقل، وتمنحك فهمًا أعمق لمعاني الحج والعمرة.",
		  ]
		: [
				"This 90-minute tour takes you through the sacred corridors of Al-Masjid Al-Haram.",
				"We tell you the story of the Kaaba,",
				"where you’ll hear the story of the Kaaba and witness how this blessed place evolved through the ages.",
				"An experience that enriches both heart and mind, offering a deeper understanding of Hajj and Umrah.",
		  ];

	return (
		<section className="py-12 md:py-20 bg-white relative overflow-x-clip">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center  justify-between gap-6 md:gap-0">
					{/* Texts side */}
					<div className="w-full md:w-[80%] order-2 md:order-1">
						<div>
							<div className="flex flex-col md:flex-row items-start mb-4 md:gap-2">
								<h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 w-full md:w-[60%]">
									{isAr
										? "أكثر من زيارة… إنها رحلة تاريخ وإيمان في رحاب الحرم."
										: "More than a visit… it’s a journey of history and faith within Al Masjid Al Haram. "}
								</h3>
								<StarRating rating={4.8} language={language} />
							</div>
							<ul className="list-disc ps-6 mb-4 text-gray-700 leading-relaxed space-y-1">
								{points.map((point, idx) => (
									<li key={idx}>{point}</li>
								))}
							</ul>
							<div className="mt-4">
								<Link
									href="/book-haram"
									className="inline-block"
								>
									<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-6 py-3 font-semibold rounded-lg">
										{isAr ? "ابدأ الحجز الآن" : "Book Now"}
									</span>
								</Link>
							</div>
						</div>
					</div>

					{/* Images side */}
					<div className="order-1 md:order-2 flex justify-center md:justify-start">
						<div className="relative">
							{/* Big image as background */}
							<Image
								src={bigImg}
								alt=""
								width={420}
								height={420}
								className="rounded-2xl shadow-lg"
								draggable={false}
								priority
							/>
							{/* Small image centered and overlapping */}
							<div className="absolute left-1/2 top-1/2  -translate-y-1/2 -translate-x-[-10%] md:-translate-x-[-30%]">
								<Image
									src={smallImg}
									alt=""
									width={220}
									height={160}
									className="rounded-xl border-4 border-white shadow-md"
									draggable={false}
								/>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</section>
	);
}
