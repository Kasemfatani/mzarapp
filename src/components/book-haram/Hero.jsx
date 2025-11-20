"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import heroBg from "/public/book-tour/hero-bg.webp";

export default function Hero({ initialLang, step, setStep }) {
	const [language, setLanguage] = useState(initialLang || "en");
	const isAr = language === "ar";

	return (
		<div className="mb-6">
			<br />
			<img
				src="/Home/header-logo.png"
				alt="logo"
				width={138}
				height={46}
				className="mx-auto"
			/>
			<section className="relative mt-6 py-10 w-full overflow-hidden flex justify-center items-center">
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
						{/* Heading */}
						<h1 className="text-3xl md:text-5xl text-center font-bold !leading-tight ">
							{isAr
								? "الجولات الإثرائية – جولة المسجد الحرام"
								: "Enriching Tours – Masjid Haram Tour"}
						</h1>

						{/* Show button only if step === 2 */}
						{step === 2 && (
							<div className="mt-6 flex flex-col sm:flex-row items-center justify-center  gap-3">
								<Link
									href="#"
									onClick={(e) => {
										e.preventDefault();
										setStep(1);
									}}
									className="inline-block"
								>
									<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-6 py-3  font-semibold rounded-lg">
										{isAr ? "العودة للجولات" : "Back to Tours"}
									</span>
								</Link>
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
