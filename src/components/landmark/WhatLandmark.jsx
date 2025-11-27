"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import bigImg from "/public/haram/big-img.png";
import smallImg from "/public/haram/small-img.png";

const icons = [
		"/Home/smart-phone.png",
		"/Home/AR-icon.png",
		"/Home/seo.png",
		"/Home/bus-icon.png",
	];

export default function WhatLandmark({ lang }) {
	const [language, setLanguage] = useState(lang || "en");

	const isAr = language === "ar";

	// const points = isAr
	// 	? [
	// 			"تأخذك هذه الجولة في رحلة تمتد نحو 90 دقيقة بين أروقة المسجد الحرام،",
	// 			"نروي لك فيها قصة الكعبة",
	// 			"ونُظهر لك كيف نشأ هذا المكان العظيم وتطور عبر العصور",
	// 			"تجربة تثري القلب والعقل، وتمنحك فهمًا أعمق لمعاني الحج والعمرة.",
	// 	  ]
	// 	: [
	// 			"This 90-minute tour takes you through the sacred corridors of Al-Masjid Al-Haram.",
	// 			"We tell you the story of the Kaaba,",
	// 			"where you’ll hear the story of the Kaaba and witness how this blessed place evolved through the ages.",
	// 			"An experience that enriches both heart and mind, offering a deeper understanding of Hajj and Umrah.",
	// 	  ];
	

	return (
		<section className="bg-[url(/landmark/whatLandMark-bg.webp)] py-12 md:py-20 bg-white relative overflow-x-clip">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center  justify-between gap-6 md:gap-0">
					{/* Texts side */}
					<div className="w-full md:w-[80%] order-2 md:order-1">
						<div>
							<div className="flex flex-col md:flex-row items-start mb-4 md:gap-2">
								<h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 w-full md:w-[80%]">
									{isAr
										? 'ما هي مبادرة "معالم في الطريق"؟ '
										: 'What is the "Landmarks on the Way" Initiative?'}
								</h3>
								{/* <StarRating rating={4.8} language={language} /> */}
							</div>
							<p className="text-gray-600 w-full md:w-[80%]">
								{isAr
									? '"معالم في الطريق" هي مبادرة تهدف إلى تحويل منظومة النقل العام في مكة المكرمة — حافلات مكة — إلى بوابة معرفية تفاعلية متنقلة. من خلال دمج دليل مزار السياحي المعرفي داخل الحافلات، يعيش الركّاب تجربة تُثري رحلتهم بقصص المعالم التاريخية التي يمرّون بها، مع إرشاد صوتي ونصي بست لغات عالمية وتقنيات الواقع المعزز (AR). '
									: '"Landmarks on the Way" is an initiative aimed at transforming the public transportation system in Makkah — Makkah buses — into a mobile interactive knowledge gateway. By integrating the Mzar tourist guide inside the buses, passengers experience a journey enriched with stories of the historical landmarks they pass by, with audio and text guidance in six global languages and augmented reality (AR) technologies.'}
							</p>
							{/* 
							<ul className="list-disc ps-6 mb-4 text-gray-700 leading-relaxed space-y-1">
								{points.map((point, idx) => (
									<li key={idx}>{point}</li>
								))}
							</ul>
							 */}
							
							<div className="mt-4">
								<Link
									href="#"
									onClick={(e) => e.preventDefault()}
									className="inline-block"
								>
									<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-6 py-3 font-semibold rounded-lg">
										{isAr
											? "ابدأ رحلتك المعرفية "
											: "Start Your Knowledge Journey"}
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
				<div className="text-center bg-[var(--second-bg)] text-white mt-8 p-4 rounded-lg w-fit  mx-auto">
					<p className="">
					🕊
				</p>	
					<p className="">
					{isAr
						? ' كل طريق تسلكه يروي لك قصة...'
						: 'Every road you take tells you a story...'}
				</p>	
					<p className="">
					{isAr
						? 'وادٍ مرّ به النبي ﷺ، وجبل شهد لحظة من أعظم لحظات التاريخ. '
						: 'A valley the Prophet ﷺ passed through, and a mountain that witnessed one of the greatest moments in history.'}
				</p>						
				</div>
					
			</div>
		</section>
	);
}
