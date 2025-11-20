"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import topKaaba from "/public/tour/top-kaaba.png";
import heroBg from "/public/tour/hero-bg.png";

export default function Hero({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");

	// useEffect(() => {
	// 	if (typeof window === "undefined") return;
	// 	const stored = localStorage.getItem("lang");
	// 	if (stored === "ar" || stored === "en") setLanguage(stored);
	// 	else if (initialLang) setLanguage(initialLang);
	// }, [initialLang]);

	const isAr = language === "ar";

	return (
		<section
			dir={isAr ? "rtl" : "ltr"}
			className="relative md:min-h-screen min-h-[70vh] w-full overflow-hidden flex justify-center items-center"
		>
			{/* background image */}
			<div className="absolute inset-0 -z-10">
				<Image
					src={heroBg}
					alt="hero background"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/45 md:bg-black/50" />
			</div>

			<div className="container m-auto px-4 ">
				<div className="w-full text-center text-white py-16 md:py-0">
					{/* top kaaba image (image contains text already) */}
					<div className="flex items-center justify-center mb-6">
						<Image src={topKaaba} alt="top kaaba" width={160} height={64} />
					</div>

					{/* Heading */}
					<h1 className="text-3xl md:text-6xl text-center font-bold !leading-tight mb-4">
						{isAr
							? "رحلةٌ تعيدك إلى زمن النبوة… لتعيش القصة حيث وقعت. "
							: "The enriching Haramain Tours"}
					</h1>

					{/* Subtext / description */}
					<p className="text-base md:text-lg text-gray-300 text-center mb-6">
						{isAr
							? "استكشف أقدس بقاع الأرض عبر تجربة إيمانية ومعرفية فريدة، تسمع فيها القصص بلغتك وتشاهد المعالم بعينك، في جولات ذكية تجمع بين الأصالة والتقنية. "
							: "Explore the holiest places on earth through a tour , where you listen to stories in your own language and witness sacred landmarks  in smart tours that blend authenticity with technology "}
					</p>

					{/* Buttons (no links yet) */}
					<div className="flex flex-col sm:flex-row items-center justify-center  gap-3">
						<Link
							href="/haram"
							// onClick={(e) => e.preventDefault()}
							className="inline-block"
						>
							<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-6 py-3  font-semibold">
								{isAr ? "استكشف جولة المسجد الحرام" : "Explore Masjid al-Haram"}
							</span>
						</Link>

						<Link
							href="/madinah"
							
							className="inline-block"
						>
							<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-6 py-3  font-semibold">
								{isAr
									? "استكشف جولة المسجد النبوي"
									: "Explore Masjid an-Nabawi"}
							</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
