"use client";

import React, { useMemo, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import Link from "next/link";

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

	const t = useMemo(
		() => ({
			headline: isAr
				? "معالم ستتعرف عليها في الطريق"
				: "Landmarks You Will Discover on the Way",

			smallText: isAr
				? "وأكثر من 40 معلمًا يتم الكشف عنها تباعًا في التحديثات القادمة. "
				: "And more than 40 landmarks to be unveiled in upcoming updates. ",
			cta: isAr ? "فعّل الخدمة من تطبيق مزار " : "Activate the Service from Mzar App",
		}),
		[isAr]
	);

	return (
		<section className="py-16 bg-[#F5F1E8]">
			<div className="container mx-auto px-4">
				{/* Headline */}
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
					{t.headline}
				</h2>

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

				{/* Below slider */}

				<div className="flex flex-col justify-center items-center gap-4 mt-6">
					<p className="text-center bg-[var(--second-bg)] text-white mt-8 p-4 rounded-lg w-fit">
						{t.smallText}
					</p>
					<Link href="https://onelink.to/yb2xky" className="inline-block" target="_blank" rel="noopener noreferrer">
						<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-10 py-3 font-semibold rounded-lg">
							{t.cta}
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
}
