"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";

import { Clock } from "lucide-react";
import { motion } from "motion/react";

// Swiper core styles (scoped to this component since it's client-only)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const stopsData = [
	{
		img: "/tour-bus/Bir_Tuwa.webp",
		arTitle: "بئر طوى",
		enTitle: "Tuwa Well",
		arDesc: "انطلق معنا في تجربة سياحية روحية فريدة على متن باص مزار.",
		enDesc: "Begin a unique spiritual tour onboard the Mzar bus.",
	},
	{
		img: "/tour-bus/Al-Jinn_Mosque.webp",
		arTitle: "مسجد الجن",
		enTitle: "Al-Jinn Mosque",
		arDesc: "محطة تُعيد لك تفاصيل التاريخ وتربطك بالمكان.",
		enDesc: "A stop that brings history alive and connects you to place.",
	},
	{
		img: "/tour-bus/Royal_Palaces.webp",
		arTitle: "القصور الملكية",
		enTitle: "Royal Palaces",
		arDesc: "قصص موثّقة تسمعها بلغتك عبر المرشد الصوتي الذكي.",
		enDesc: "Verified stories in your language via a smart audio guide.",
	},
	{
		img: "/tour-bus/Bayah_Mosque.webp",
		arTitle: "مسجد البيعة",
		enTitle: "Bay’ah Mosque",
		arDesc: "بين كل محطة حكاية تُثري تجربتك وتلهمك.",
		enDesc: "A story at every stop to enrich and inspire.",
	},
	{
		img: "/tour-bus/Jabal_Al-Rahmah.webp",
		arTitle: "جبل الرحمة",
		enTitle: "Jabal Al-Rahmah",
		arDesc: "نختم الجولة عند معلم خالد في الذاكرة.",
		enDesc: "Concluding at an iconic, unforgettable site.",
	},
	{
		img: "/tour-bus/Cultural_District.webp",
		arTitle: "حي حراء الثقافي",
		enTitle: "Hira Cultural District",
		arDesc: "نختم الجولة عند معلم خالد في الذاكرة.",
		enDesc: "Concluding at an iconic, unforgettable site.",
	},
];

export default function BusStops({ lang = "en" }) {
	const isAr = lang === "ar";

	return (
		<section className="mb-10">
			<div className="container mx-auto p-5 bg-white rounded-[20px] shadow-[0px_6px_20px_rgba(0,0,0,0.06)] overflow-hidden">
				
				{/* Section Header - Grouped */}
			<div className="mb-6">
				<div className="flex items-center gap-4 mb-6">
					<motion.div
						whileHover={{ rotate: 360 }}
						transition={{ duration: 0.6 }}
						className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#0f3d2e] to-[#1a5a42] flex items-center justify-center"
					>
						<Clock className="w-7 h-7 text-white" />
					</motion.div>
					<h2 className="text-[26px] leading-[1.3] text-[#0f3d2e]">
						{isAr ? "الوجهات" : "Destinations"}
					</h2>
				</div>

				<div className="h-px bg-gradient-to-r from-[#c9a463] via-gray-200 to-transparent"></div>
			</div>

				{/* Slider */}
				<div className="relative">
					<Swiper
						dir={isAr ? "rtl" : "ltr"}
						modules={[Autoplay, A11y]}
						spaceBetween={16}
						slidesPerView={1.05}
						centeredSlides={false}
						loop
						autoplay={{ delay: 3500, disableOnInteraction: false }}
						breakpoints={{
							640: { slidesPerView: 1.5, spaceBetween: 16 },
							768: { slidesPerView: 2.2, spaceBetween: 18 },
							1024: { slidesPerView: 3, spaceBetween: 20 },
							1280: { slidesPerView: 4, spaceBetween: 24 },
						}}
						className="!pb-10"
					>
						{stopsData.map((s, i) => (
							<SwiperSlide key={i}>
								<article
									className="relative h-[260px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg"
									style={{
										backgroundImage: `url(${s.img})`,
										backgroundSize: "cover",
										backgroundPosition: "center",
									}}
								>
									<div className="absolute inset-0 bg-black/35" />
									<div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
										<h3 className="text-white font-bold text-lg mb-1">
											{isAr ? s.arTitle : s.enTitle}
										</h3>
										{/* <p className="text-white/90 text-sm">
											{isAr ? s.arDesc : s.enDesc}
										</p> */}
									</div>
								</article>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				
			</div>
		</section>
	);
}
