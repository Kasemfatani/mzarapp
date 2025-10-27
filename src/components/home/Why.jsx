"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";

export default function Why() {
	const [language, setLanguage] = useState("en");
	const swiperRef = useRef(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || "en");
		}
	}, []);

	const t = {
		en: {
			title: "Why Mzar?",
			cards: [
				{
					img: "/Home/Audio-Guide.png",
					title: "Audio Guide",
					desc: "Listen to authentic stories through our audio guide available in 6 different languages.",
				},
				{
					img: "/Home/Verified.png",
					title: "Arrival Verification",
					desc: "When you reach the site, the audio guide starts automatically to confirm you are at the exact location.",
				},
				{
					img: "/Home/Our-Filter.png",
					title: "Our Unique Filters",
					desc: "Capture your memories using our exclusive filters that include the destination name and visit date.",
				},
				{
					img: "/Home/AR.png",
					title: "Augmented Reality Experience",
					desc: "Open your camera and point it at the landmark to discover each site's story through AR technology.",
				},
			],
			prev: "Prev",
			next: "Next",
		},
		ar: {
			title: "لماذا مزار؟",
			cards: [
				{
					img: "/Home/Audio-Guide.png",
					title: "الدليل الصوتي",
					desc: "استمع إلى القصص الأصيلة من خلال المرشد الصوتي المتوفر ب٦ لغات مختلفة.",
				},
				{
					img: "/Home/Verified.png",
					title: "التحقق من الوصول إلى الوجهة",
					desc: "عند وصولك إلى الموقع، يبدأ المرشد الصوتي تلقائيًا ليؤكد أنك في المكان الصحيح تماماً.",
				},
				{
					img: "/Home/Our-Filter.png",
					title: "فلاترنا المميزة",
					desc: "التقط ذكرياتك باستخدام فلاترنا الفريدة التي تتضمن اسم الوجهة وتاريخ الزيارة.",
				},
				{
					img: "/Home/AR.png",
					title: "تجربة الواقع المعزز",
					desc: "افتح كاميرتك ووجّهها نحو المعلم لتكتشف قصة كل موقع من خلال تقنية الواقع المعزز.",
				},
			],
			prev: "السابق",
			next: "التالي",
		},
	};

	const L = language === "ar" ? t.ar : t.en;

	return (
		<section
			id="why"
			className="container m-auto px-4 sm:px-6 lg:px-8 py-10"
			
		>
			{/* Header: title on the left, nav on the right */}
			<div className="flex items-center justify-between gap-4 mb-8" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333]">
					{L.title}
				</h2>
				<div className="flex items-center gap-3">
					<button
						type="button"
						aria-label={L.prev}
						onClick={() => swiperRef.current?.slidePrev()}
						className="w-10 h-10 rounded-full border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100"
					>
						{language === "ar" ? "‹" : "‹"}
					</button>
					<button
						type="button"
						aria-label={L.next}
						onClick={() => swiperRef.current?.slideNext()}
						className="w-10 h-10 rounded-full border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100"
					>
						{language === "ar" ? "›" : "›"}
					</button>
				</div>
			</div>

			<Swiper
				modules={[Pagination, Autoplay]}
				onSwiper={(s) => (swiperRef.current = s)}
				slidesPerView={4}
				spaceBetween={18}
				loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
				breakpoints={{
					1280: { slidesPerView: 4, spaceBetween: 18 },
					1024: { slidesPerView: 3, spaceBetween: 20 },
					768: { slidesPerView: 2, spaceBetween: 16 },
					0: { slidesPerView: 1, spaceBetween: 12 },
				}}
				className="why-swiper"
			>
				{L.cards.map((card, i) => (
					<SwiperSlide key={i}>
						<article className="rounded-[24px] bg-[var(--main-bg)] p-6 h-full flex flex-col gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]" style={{ direction: language === "ar" ? "rtl" : "ltr" }}>
							<div className="w-16 h-16 rounded-xl flex items-center justify-center">
								<Image src={card.img} alt={card.title} width={40} height={40} />
							</div>
							<h3 className="text-xl font-semibold text-[#333]">
								{card.title}
							</h3>
							<p className="text-sm text-gray-600 leading-6">{card.desc}</p>
						</article>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
