"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import topKaaba from "/public/haram/top-kaaba.png";
import heroBg from "/public/tour/hero-bg.webp";

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
						<div className="flex items-center justify-center mb-6">
							<Image src={topKaaba} alt="top kaaba" width={160} height={64} />
						</div>

						{/* Heading */}
						<h1 className="text-3xl md:text-6xl text-center font-bold !leading-tight ">
							{isAr
								? "جولة المسجد الحرام الإثرائية"
								: "Enriching Masjid Haram Tour"}
						</h1>

						{/* Subtext / description */}
						<p className="text-base md:text-lg text-gray-300 text-center mb-6">
							{isAr
								? "(رحلة روحية تعيدك إلى قلب التاريخ، حيث تنبض المعالم بالإيمان والجلال. )"
								: "(A spiritual journey that takes you to the heart of history  where every landmark breathes faith and majesty.)"}
						</p>

						<p className="text-base md:text-lg text-gray-300 text-center mb-6">
							{isAr
								? "تجربة فريدة داخل المسجد الحرام تتعرف فيها على أقدس المعالم وأعظم القصص، في جولة تجمع بين الأصالة والمعرفة والتقنية الحديثة — لتراها كما لم ترها من قبل."
								: "Experience a one-of-a-kind journey inside the Grand Mosque, where you’ll discover its holiest landmarks and timeless stories."}
						</p>

						{/* Buttons (no links yet) */}
						<div className="flex flex-col sm:flex-row items-center justify-center  gap-3">
							<Link
								href="#"
								onClick={(e) => e.preventDefault()}
								className="inline-block"
							>
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
				<Link href="#" className="book-link !px-8" >
					{language === "en" ? "Book Now" : "احجز الآن"}
				</Link>
			</div>
		</>
	);
}
