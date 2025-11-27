"use client";
import React, { useEffect } from "react";

import Image from "next/image";


const images = [
	"/gallery/4.webp",
	"/gallery/19.jpg",
	"/gallery/25.png",
	"/gallery/17.png",
];

const features = [
	{
		icon: (
			<img src="/Home/AR.png" alt="AR" width={24} height={24} />
		),
		ar: (
			<>
		تقنية الواقع المعزز (عِش الحدث وكأنك هناك)
			</>
		),
		en: (
			<>
				Augmented Reality (Live the experience as if you were there)
			</>
		),
	},
	{
		icon: (
			<img src="/Home/smart-phone.png" alt="smart-phone" width={24} height={24}/>
		),
		ar: (
			<>
				مرشد رقمي ذكي (متاح بست لغات عالمية)
			</>
		),
		en: (
			<>
				Digital smart guide (available in six global languages)
			</>
		),
	},
	{
		icon: (
			<img src="/Home/photography.svg" alt="guide" width={24} height={24}/>
		),
		ar: (
			<>
				مرشدون متخصصون (يروون القصة بإتقان وروحانية)
			</>
		),
		en: (
			<>
				Specialized guides (narrate the story with mastery and spirituality)
			</>
		),
	},
	{
		icon: (
			<img src="/Home/map.svg" alt="map" width={24} height={24}/>
		),
		ar: (
			<>
				موقع استثنائي (من أعالي برج الساعة بإطلالة على الكعبة)
			</>
		),
		en: (
			<>
				Exceptional location (from the top of the Clock Tower with a view of the Kaaba)
			</>
		),
	},
	{
		icon: (
			<img src="/Home/smart-phone.png" alt="smart-phone" width={24} height={24}/>
		),
		ar: (
			<>
				حجز فوري (عبر التطبيق أو الموقع مباشرة)
			</>
		),
		en: (
			<>
				Instant booking (via the app or website directly)
			</>
		),
	},
];

export default function WhyMzarSection({ lang = "ar" }) {
	const isAr = lang === "ar";

	return (
		<section  className="bg-[url(/makkah-history/OBJECTS.webp)] bg-no-repeat bg-right w-full bg-white py-10 px-2 my-16 flex justify-center">
			<div
				className={`flex flex-col md:flex-row  items-center gap-8 md:gap-20 max-w-6xl w-full`}
			>
				{/* Image side */}
				<div className="w-full md:w-[40%] ">
					<img
									src='/makkah-history/why-img.webp'
									alt={`Preview`}
									width={571}
									height={485}
									className="w-full h-full object-cover md:rounded-tr-3xl md:rounded-bl-3xl"
									loading="lazy"
									draggable={false}
								/>
				</div>
				{/* Text side */}
				<div className="w-full md:w-1/2 flex flex-col items-start md:items-start gap-6">
					<h2 className="text-2xl md:text-3xl font-bold text-[#222] mb-2">
						{isAr ? "لماذا تختار حكاية مكة؟" : "Why choose Makkah Story?"}
					</h2>
					<ul className="flex flex-col gap-6">
						{features.map((feature, i) => (
							<li
								key={i}
								className="flex items-start gap-2 text-base md:text-lg text-[#222]"
							>
								<span className="mt-1 flex-shrink-0">
									{feature.icon}
								</span>
								<span>{isAr ? feature.ar : feature.en}</span>
							</li>
						))}
					</ul>
					<a
							href="#"
							
							className="bg-[#3a6c5a] hover:bg-[#29513f] text-white text-center rounded-lg px-6 py-3 text-base font-bold transition "
						>
							{isAr
								? "احجز الآن"
								: "Book Now"}
						</a>
				</div>
			</div>
		</section>
	);
}
