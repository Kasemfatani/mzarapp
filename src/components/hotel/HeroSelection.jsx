"use client";
import { useState } from "react";


export default function HeroSelection({ lang = "ar" }) {
	const isAr = lang === "ar";
	const t = {
		title: isAr ? "اختر الهدية" : "Choose your gift",
	};

	return (
		<section className="relative md:min-h-[90vh] w-full overflow-hidden flex flex-col justify-start items-center">
			{/* Step 2 hero BG */}
			<img
				src="/hotel/Hero2.webp"
				alt="Step 2 background"
				className="absolute inset-0 w-full h-full object-cover -z-10"
			/>
			{/* <div className="absolute inset-0 bg-[#0b4f3b]/75 -z-10" /> */}

			<div className="px-4 py-10 text-white">
				{/* Hotel icon (external placeholder) */}
					<div className={`mb-4 md:mb-8`}>
						<img
							src="/hotel/gift-select.png"
							alt="gift Logo"
							className="h-56 w-auto mx-auto brightness-110"
						/>
					</div>
					<h2 className="text-2xl md:text-5xl font-extrabold text-center">{t.title}</h2>
			</div>
		</section>
	);
}
