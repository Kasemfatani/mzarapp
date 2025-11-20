"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import topKaaba from "/public/madinah/Nabawi.svg";
import heroBg from "/public/madinah/hero-bg.webp";

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
		<>
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
						<Image
							src={topKaaba}
							alt="top kaaba"
							height={200}
							className="mx-auto"
						/>

						{/* Heading */}
						<h1 className="text-3xl md:text-6xl text-center font-bold !leading-tight ">
							{isAr
								? "جولة المسجد النبوي الإثرائية"
								: "The Enriching Al-Masjid An-Nabawi Tour"}
						</h1>

						{/* Subtext / description */}
						<p className="text-base md:text-lg text-gray-300 text-center mb-6">
							{isAr
								? "رحلة السكينة والمعرفة في رحاب المسجد النبوي الشريف."
								: "A journey of peace and knowledge within the sacred grounds of the Prophet’s Mosque ﷺ."}
						</p>

						<p className="text-base md:text-lg text-gray-300 text-center mb-6">
							{isAr
								? "جولة تأخذك إلى حيث خطت أقدام النبي ﷺ وصحابته الكرام، لتتعرف على المعالم المباركة في المسجد النبوي، وتشاهدها كما رآها التاريخ، في تجربة تجمع بين التأمل، والعلم، والتقنية الحديثة."
								: "Walk where the Prophet ﷺ once stood and explore Al-Masjid An-Nabawi’s sacred landmarks , in an experience that blends reflection, learning, and modern technology. "}
						</p>

						{/* Buttons (no links yet) */}
						<div className="flex flex-col sm:flex-row items-center justify-center  gap-3">
							<Link href="/book-madinah" className="inline-block">
								<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-6 py-3  font-semibold rounded-lg">
									{isAr ? "احجز جولتك الآن" : "Book Your Tour Now"}
								</span>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Mobile booking bar  */}
			<div className="md:hidden fixed bottom-0 w-full bg-[var(--main-bg)] p-4 border-t border-t-gray-300 z-20 flex justify-between items-center">
				<div className="flex flex-col">
					<p className="mb-1 text-sm text-black font-semibold">
						{language === "en" ? "From" : "من"}
					</p>
					<div className="flex items-baseline gap-2">
						<span className="text-base font-bold text-[#7B7154]">
							{499} {language === "ar" ? "ر.س" : "SAR"}
						</span>
						<span className="text-sm  line-through text-gray-400 font-bold">
							{(499 * 1.25).toFixed(2)}
						</span>
					</div>
					<p className="mt-1 text-sm text-black font-semibold">
						{language === "en"
							? "Per group up to 5 persons"
							: "لكل مجموعة حتى 5 شخص"}
					</p>
				</div>
				<Link href="/book-madinah" className="book-link !px-8" >
					{language === "en" ? "Book Now" : "احجز الآن"}
				</Link>
			</div>
		</>
	);
}
