"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DownloadButtons from "@/components/home/DownloadButtons";
import AudioPreviewDialog from "@/components/landmark/AudioPreviewDialog";

import heroBg from "/public/landmark/landmark_hero.webp";

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
				<div className="absolute inset-0 bg-black/60" />
			</div>

			<div className="container m-auto px-4 ">
				<div className="w-full text-center text-white py-16 md:py-0">
					{/* Heading */}
					<h1 className="text-3xl md:text-5xl text-center font-bold !leading-tight ">
						{isAr
							? "استكشف مكة كما لم ترها من قبل"
							: "Explore Makkah Like Never Before"}
					</h1>

					{/* Subtext / description */}

					<p className="text-base md:text-lg text-gray-300 text-center mb-6 mt-6">
						{isAr
							? "رحلة عبر حافلات مكة تجعل من كل طريق حكاية."
							: "Hop on the Makkah Tour Bus and transform your journey into a window of history and knowledge."}
					</p>

					
					<div className="flex flex-col  items-center justify-center">

							<AudioPreviewDialog language={language}  />

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
