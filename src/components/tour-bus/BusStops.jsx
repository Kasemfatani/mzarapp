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

export default function BusStops({ initialLang = "en" }) {
	const isAr = initialLang === "ar";

	useEffect(() => {
		let unbind;
		let destroyed = false;

		(async () => {
			// Ensure CSS is present (pin to v5)
			const cssHref =
				"https://cdn.jsdelivr.net/npm/@fancyapps/ui@5/dist/fancybox/fancybox.css";
			if (!document.querySelector(`link[href="${cssHref}"]`)) {
				const link = document.createElement("link");
				link.rel = "stylesheet";
				link.href = cssHref;
				link.crossOrigin = "anonymous";
				document.head.appendChild(link);
			}

			const { Fancybox } = await import("@fancyapps/ui");
			if (destroyed) return;

			// Delegated binding
			unbind = Fancybox.bind("[data-fancybox]", {
				// options if needed
			});
		})();

		return () => {
			destroyed = true;
			try {
				if (unbind) unbind();
			} catch {}
		};
	}, []);

	const t = useMemo(
		() => ({
			headline: isAr
				? "من بئر طوى إلى جبل الرحمة.. بين كل محطة حكاية"
				: "From Bir Tuwa to Mount Arafat... a story at every stop",
			durationTitle: isAr ? "مدة الجولة" : "Tour Duration",
			durationText: isAr ? "المدة: 5 ساعات." : "Duration: 5 hours.",
			dailyToursTitle: isAr ? "الجولات اليومية:" : "Daily Tours:",
			morning: isAr
				? "صباحية: 7:00 ص – 12:00 م"
				: "Morning: 7:00 am – 12:00 pm",
			evening: isAr ? "مسائية: 4:00 م – 9:00 م" : "Evening: 4:00 pm – 9:00 pm",
			mapCta: isAr
				? "اعرف مواقع الانطلاق ونقاط التجمع"
				: "See starting locations and gathering points",
			cta: isAr ? "احجز جولتك الآن" : "Book your tour now",
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

				{/* Below slider: details + map */}
				<div className="mt-12 flex flex-col md:flex-row gap-8 md:gap-9 items-center  ">
					{/* Text side */}
					<div className={` md:w-[55%] `}>
						<div className="flex flex-col  gap-16 max-w-lg md:max-w-none">
							<div>
								<h4 className="text-xl font-bold mb-3 text-gray-900">
									{t.durationTitle}
								</h4>
								<div className="inline-flex items-center gap-2 rounded-full bg-[#EAE3D3] text-gray-900 px-4 py-2">
									<span className="w-6 h-6 text-[var(--main-color)]">
										<img src="/tour-bus/clock.png" alt="clock" />
									</span>
									<span className="font-medium">{t.durationText}</span>
								</div>
							</div>

							<div>
								<h4 className="text-xl font-bold mb-3 text-gray-900">
									{t.dailyToursTitle}
								</h4>
								<div className={`flex  gap-3 flex-wrap`}>
									<div className="inline-flex items-center gap-2 rounded-full bg-[#EAE3D3] text-gray-900 px-4 py-2">
										<span className="w-6 h-6 text-[var(--main-color)]">
											<img src="/tour-bus/sun.png" alt="sun" />
										</span>
										<span className="font-medium">{t.morning}</span>
									</div>
									<div className="inline-flex items-center gap-2 rounded-full bg-[#EAE3D3] text-gray-900 px-4 py-2">
										<span className="w-6 h-6 text-[var(--main-color)]">
											<img src="/tour-bus/moon.png" alt="moon" />
										</span>
										<span className="font-medium">{t.evening}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Map side */}
					<div className={` md:w-[45%]`}>
						<div className="relative rounded-2xl overflow-hidden shadow-lg">
							<a
								data-fancybox="map"
								href={isAr ? "/tour-bus/map-ar.webp" : "/tour-bus/map-en.webp"}
								className="block"
								tabIndex={0}
							>
								<img
									src={isAr ? "/tour-bus/map-ar.webp" : "/tour-bus/map-en.webp"}
									alt={
										isAr
											? "خريطة مواقع الانطلاق ونقاط التجمع"
											: "Map of starting and gathering points"
									}
									className="object-cover select-none  w-full cursor-zoom-in"
								/>
								<span className="sr-only">
									{isAr ? "تكبير الخريطة" : "Enlarge map"}
								</span>
							</a>
							{/* <div className="absolute inset-0 bg-black/15" /> */}
							{/* <div className="absolute inset-0 flex items-end">
								<p className="m-4 sm:m-6 md:m-8 bg-white/80 backdrop-blur px-4 py-2 rounded-md text-gray-900 font-semibold">
									{t.mapCta}
								</p>
							</div> */}
							
						</div>
						{/* <p className="text-center mt-1">{isAr ? "انقر على الصورة للتكبير" : "click on the image to enlarge"}</p> */}
					</div>
				</div>

				<div className="flex justify-center mt-6">
					<Link href="/book-tour" className="inline-block">
						<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-20 py-3 font-semibold rounded-lg">
							{t.cta}
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
}
