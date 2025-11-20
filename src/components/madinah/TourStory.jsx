"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import bigImg from "/public/madinah/big-img.webp";
import smallImg from "/public/madinah/small-img.webp";
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
				"يعيش الزائر في جولة المسجد النبوي تجربةً لا تُنسى بين أروقة المكان الذي شهد الوحي والهداية",
				"حيث المنبر والمحراب، والروضة الشريفة، ومواطن الدعاء والسلام",
				"في جولة تمتد لتسعين دقيقة، نحكي لك سيرة النبوة من داخل مسرحها الحقيقي،",
				"لتشاهد وتسمع وتعيش القصة بروحك قبل عينيك.",
		  ]
		: [
				"In the Al-Masjid An-Nabawi Tour, visitors live an unforgettable experience within the blessed place that witnessed revelation and guidance",
				"from the pulpit and mihrab to the Rawdah Al-Sharifah and the sites of prayer and peace.",
				"In a 90-minute journey, we narrate the story of Prophethood from within its true setting",
				"so you can see, hear, and feel the story with your soul before your eyes.",
		  ];

	return (
		<section className="py-12 md:py-20 bg-white relative overflow-x-clip">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center gap-6 md:gap-0  justify-between ">
					{/* Texts side */}
					<div className="w-full md:w-[80%] order-2 md:order-1">
						<div>
							<div className="flex flex-col md:flex-row items-start mb-4 md:gap-2">
								<h3 className={`text-xl md:text-2xl font-bold mb-4 text-gray-900 w-full ${isAr?'md:w-fit' : 'md:w-[60%]'} `}>
									{isAr
										? "أكثر من زيارة… إنها لقاء مع النور والسكينة."
										: "More than a visit… it’s a meeting with light and serenity.  "}
								</h3>
								<StarRating rating={4.8} language={language} />
							</div>
							<ul className="list-disc ps-6 mb-4 text-gray-700 leading-relaxed space-y-1 md:w-[90%]">
								{points.map((point, idx) => (
									<li key={idx}>{point}</li>
								))}
							</ul>
							<div className="mt-4">
								<Link
									href="/book-madinah"
									
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
									className="rounded-xl border-4 border-white shadow-md h-[190px]"
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
