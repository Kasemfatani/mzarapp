"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DownloadButtons from "@/components/home/DownloadButtons";

import heroBg from "/public/makkah-history/makkah_hero.webp";

export default function Hero({ lang }) {
	const [language, setLanguage] = useState(lang || "en");

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
				<div className="absolute inset-0 bg-black/50" />
			</div>

			<div className="container m-auto px-4 ">
				<div className="w-full text-center text-white py-16 md:py-0">
					{/* Heading */}
					<h1 className="text-3xl md:text-5xl text-center font-bold !leading-tight ">
						{isAr
							? "حكاية مكة التاريخية عبر الواقع المعزز "
							: "The Historical Tale of Makkah through Augmented Reality "}
					</h1>

					{/* Subtext / description */}

						<p className="text-base md:text-lg text-gray-300 text-center mb-6 mt-1">
						{isAr
							? "(رحلة تجمع بين الإيمان والتقنية لتروي لك قصص مكة من أعالي برج الساعة.)"
							: "(A journey that combines faith and technology to tell you the stories of Makkah from the heights of the Clock Tower.)"}
					</p>

					<p className="text-base md:text-lg text-gray-300 text-center mb-6 ">
						{isAr
							? "استكشف القصص النبوية والمعالم التاريخية من شرفة تطل على المسجد الحرام، من خلال تجربة رقمية فريدة أو جولة بإشراف مرشد سياحي."
							: "Explore prophetic stories and historical landmarks from a balcony overlooking the Grand Mosque, through a unique digital experience or a tour supervised by a tour guide."}
					</p>

					{/* Buttons (no links yet) */}
					<div className="flex flex-col  items-center justify-center">
						<Link href="#" className="inline-block">
							<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-6 py-3  font-semibold rounded-lg">
								{isAr
									? "احجز الآن"
									: "Book Now"}
							</span>
						</Link>
					</div>

					<div className="flex flex-col  items-center justify-center	gap-3 mt-10">
						<Link href="https://onelink.to/yb2xky" className="inline-block" target="_blank" rel="noopener noreferrer">
							<span className="inline-block bg-transparent border border-white text-white hover:bg-[var(--sec-color)] hover:text-black px-6 py-3  font-semibold rounded-lg">
								{isAr ? "حمّل تطبيق مزار الآن" : "Download Mzar App Now"}
							</span>
						</Link>
						<DownloadButtons language={language} />
					</div>
				</div>
			</div>
		</section>
	);
}
