"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination , Autoplay  } from "swiper/modules";
import "swiper/css";
import img1 from "/public/bg.webp";
import Link from "next/link";
import Image from "next/image";

export default function Testimonials({ lang = "en" }) {
	const [language, setLanguage] = useState(lang || "en");
	const swiperRef = useRef(null);

	const t =
		language === "ar"
			? { title: "آراء العملاء", prev: "السابق", next: "التالي" }
			: { title: "Testimonials", prev: "Prev", next: "Next" };

	// 8 hard-coded testimonials (English )
	const items = [
		{
			id: 1,
			name: "Drame Samba",
			country: "France",
			rating: 5,
			review:
				"Every stop was immersive thanks to the audio guide; selecting my language was easy, the historical images beautifully told the stories, and the interactive questions kept me interested the entire time",
		},
		{
			id: 2,
			name: "Mr. Salah",
			country: "Switzerland",
			rating: 4,
			review:
				"I heartily recommend! It was memorable and instructive Masjid Haram Tour. i am sure it won’t be the last tour with Mzar",
		},
		{
			id: 3,
			name: "Olatunji Abdulgafar",
			country: "Turkey",
			rating: 5,
			review:
				"What a cleverly planned Masjid Haram tour! The rare historical images were fascinating and the quiz questions made it both educational and enjoyable. It felt official because of the certificate.",
		},
		{
			id: 4,
			name: "Sham Mahmud",
			country: "Malaysia",
			rating: 5,
			review:
				"I appreciated the multilingual audio guide,also The certificate is a sentimental memento, thanks Mzar for this amazing Masjid Haram tour ",
		},
		{
			id: 5,
			name: "fazan malik",
			country: "India",
			rating: 4,
			review:
				"I really enjoyed the technology-driven experience and thanks for the Visit Certificate.",
		},
		{
			id: 6,
			name: "amer albazaz",
			country: "Australia",
			rating: 5,
			review:
				"Very fulfilling Masjid Haram tour: the multilingual audio guide and carefully chosen historical images, everyhting was top notch",
		},
		{
			id: 7,
			name: "Raji jimoh",
			country: "Nigeria",
			rating: 4,
			review:
				"It was great from beginning to end: choose your language, play the audio guide, look at the old pictures, respond to interactive questions, and get your certificate of visit. Truly modern and meaningful!",
		},
		{
			id: 8,
			name: "Farisha Patel",
			country: "Canada",
			rating: 5,
			review:
				"This was more than just a tour , the multingual audio guide helped me feel connected, the gallery of historical images added depth, the interactive quizzes made it enjoyable, and the certificate was the cherry on top.",
		},
		
	];

	const itemsAr = [
		{
			id: 1,
			name: "على",
			country: "الامارات العربية المتحدة",
			rating: 5,
			review:
				"جولة المسجد الحرام كانت تجربة إثرائية بكل تفاصيلها!المرشد الصوتي كان رائع، والصور التاريخية خلتنا نعيش الماضي لحظة بلحظة، وأجمل شيء كانت شهادة الزيارة في النهاية",
		},
		{
			id: 2,
			name: "تميم",
			country: "كندا",
			rating: 4,
			review:
				"جولة المسجد الحرام كانت مختلفة اخترت اللغة اللي تناسبني، واستمتعت بالمرشد الصوتي، الصور القديمة كانت تبهرنا في كل محطة، والأسئلة كانت تخلينا نشارك ونفكر",
		},
		{
			id: 3,
			name: "سفيان",
			country: "بريطانيا",
			rating: 5,
			review:
				"جمعت بين المتعة والمعرفة المرشد الصوتي شرح القصص بأسلوب جميل، واللغة كانت واضحة ومفهومة، أما الصور التاريخية فقدمت لنا مشاهد ما كنا نعرفها من قبل، وختمنا بشهادة نفتخر فيها",
		},
		{
			id: 4,
			name: " نعيمة",
			country: "أستراليا",
			rating: 5,
			review:
				"الجولة كانت ممتعة ، كل شيء منظم  ، تسمع القصة بلغتك ، تجربة فعلاً عصرية بتقنيات حديثة",
		},
		{
			id: 5,
			name: " جاسم الباكر",
			country: "قطر",
			rating: 4,
			review:
				"أجمل ما في الجولة التفاصيل الصغيرة. والأسئلة اللي تثير الفضول ، كل لحظة كانت شيقة بحد ذاتها",
		},
		{
			id: 6,
			name: "يونس حلوان",
			country: "كندا",
			rating: 5,
			review:
				"جولة المسجد الحرام كانت جميلة ومليئة بالمعلومات الجديدة! الصور القديمة نقلتنا إلى الماضي، والأسئلة التفاعلية خلتنا ننتبه للتفاصيل أكثر",
		},
		{
			id: 7,
			name: "محمد سمير",
			country: "المملكة العربية السعودية",
			rating: 4,
			review:
				"رحلة لا تُنسى مع لمسة تقنية حديثة. المرشد الصوتي بلغات متعددة، وصور توثّق التاريخ، وأسئلة تخليك تفكر، وشهادة زيارة تذكرك دومًا بروعة التجربة",
		},
		
		
	];

	const testimonials = language === "ar" ? itemsAr : items;

	return (
		<>
			<div
				className="container m-auto"
				style={{ direction: language === "ar" ? "rtl" : "ltr" }}
			>
				{/* Header: title left, nav right */}
				<div className="flex items-center justify-between gap-4 mb-6">
					<h2 className="text-3xl md:text-4xl font-bold text-[#141414]">
						{t.title}
					</h2>
					<div className="flex items-center gap-3" style={{ direction: "ltr" }}>
						<button
							type="button"
							aria-label={t.prev}
							onClick={() => swiperRef.current?.slidePrev()}
							className="w-10 h-10 rounded-full border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100"
						>
							{language === "ar" ? "‹" : "‹"}
						</button>
						<button
							type="button"
							aria-label={t.next}
							onClick={() => swiperRef.current?.slideNext()}
							className="w-10 h-10 rounded-full border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100"
						>
							{language === "ar" ? "›" : "›"}
						</button>
					</div>
				</div>

				{/* Slider */}
				<div style={{ direction: "ltr" }}>
					<Swiper
						modules={[Pagination , Autoplay]}
						onSwiper={(s) => (swiperRef.current = s)}
						spaceBetween={24}
						slidesPerView={2.5}
						loop={true}
						autoplay={{ delay: 3500, disableOnInteraction: false }}
						breakpoints={{
							1280: { slidesPerView: 2.5, spaceBetween: 24 },
							1024: { slidesPerView: 2, spaceBetween: 20 },
							768: { slidesPerView: 1.5, spaceBetween: 16 },
							0: { slidesPerView: 1, spaceBetween: 12 },
						}}
						className="!overflow-visible"
					>
						{testimonials.map((r) => (
							<SwiperSlide key={r.id}>
								<article className="bg-[#2E5A46] text-white rounded-2xl p-6 md:p-8 h-[300px] md:h-[320px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col justify-between relative overflow-hidden">
									{/* Quote icon decor */}
									<div className="absolute bottom-2 right-4 text-white pointer-events-none select-none">
										<i className="fa-solid fa-quote-right text-7xl md:text-8xl" />
									</div>

									{/* Text */}
									<p className="text-lg md:text-xl font-semibold leading-8 line-clamp-4" dir={language === "ar" ? "rtl" : "ltr"}>
										{r.review}
									</p>

									{/* Footer: name, country, stars */}
									<div className="flex items-end justify-between mt-4 relative z-[1]">
										<div className="flex flex-col">
											<span className="text-base md:text-lg font-semibold">
												{r.name}
											</span>
											<span className="text-sm text-white/85">{r.country}</span>
											<div className="flex items-center gap-1 mt-2 text-[#EBDC3B]">
												{[...Array(5)].map((_, i) => (
													<i
														key={i}
														className={`${
															r.rating > i ? "fa-solid" : "fa-regular"
														} fa-star`}
													/>
												))}
											</div>
										</div>
									</div>
								</article>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<br />
				<br />
			</div>

			<div className="w-full overflow-hidden mb-10">
				<div
					className="relative min-h-[320px] flex flex-col items-center justify-center text-center"
					style={{
						backgroundImage: `url(${img1.src})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{/* Black overlay */}
					<div className="absolute inset-0 bg-black/70" aria-hidden="true" />
					<div className="relative z-10 flex flex-col items-center justify-center py-12 px-4">
						<p className="text-lg md:text-2xl text-white mb-2 max-w-2xl">
							{language === "ar" ? (
								<>في جولةٍ واحدة… ترى التاريخ بعينك، وتسمعه بقلبك.</>
							) : (
								<>
									In one tour… see history with your eyes and hear it with your heart.
								</>
							)}
						</p>
						<p className="text-lg md:text-2xl text-white mb-8 max-w-2xl">
							{language === "ar" ? (
								<>مزار — نروي القصة حيث وقعت.</>
							) : (
								<>With Mzar, the story is told where it truly happened</>
							)}
						</p>

						<Link
							href="/book-haram"
							className="book-link text-lg md:text-xl max-w-xs w-full"
							style={{ fontWeight: 700 }}
						>
							{language === "en" ? "Book Now" : "حجز الآن"}
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
