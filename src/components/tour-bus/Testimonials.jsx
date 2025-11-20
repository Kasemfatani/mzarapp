"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination , Autoplay } from "swiper/modules";
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

	// hard-coded testimonials 
	const items = [
		{
			id: 1,
			name: "latif",
			country: "Canada",
			rating: 5,
			review:
				"A truly remarkable experience!The audio guide in our native tongue made the trip extremely interesting, and the air-conditioned bus was incredibly comfortable. It was amazing to see Tuwa Well and Al-Jin Mosque and hear their stories via the app. I heartily endorse this tour! ",
		},
		{
			id: 2,
			name: "Mr. Mohamed Lachhab",
			country: "Germany",
			rating: 4,
			review:
				"We admired how well-planned everything was; augmented reality technology offered a fresh perspective on ancient locations like Mount Arafat and the Royal Palaces.",
		},
		{
			id: 3,
			name: "Dr. Munazaah Ebad",
			country: "Australia",
			rating: 5,
			review:
				"It was amazing to see sacred sites like Al-Jin Mosque and Jabal Al-Rahmah while using AR to visualize their history. The verified content made everything feel authentic and meaningful.",
		},
		{
			id: 4,
			name: "Abrahim Bushra",
			country: "Canada",
			rating: 5,
			review:
				"After selecting a time and opening the Mzar app, the entire tour was prepared. Everything went smoothly from Tuwa Well to the Hira Cultural Districts. What most impressed us about the stories was their historical accuracy.",
		},
		{
			id: 5,
			name: "Mr. Omar SAHRAOUI",
			country: "France",
			rating: 4,
			review:
				"The audio guide in eight languages was what made the trip unforgettable, but the modern bus made the journey more comfortable. Particularly when visiting the Bay'ah Mosque and Hira Cultural District, the historical and religious facts were presented in a beautiful manner.",
		},
		{
			id: 6,
			name: "Ms. Roma Khatun",
			country: "United Kingdom",
			rating: 5,
			review:
				"I saw familiar locations in a whole new way thanks to the combination of AR storytelling, rich narration, and contemporary buses. The visit to the Hira Cultural District was incredibly motivating.",
		},
		{
			id: 7,
			name: "rubella ahmed",
			country: "United Kingdom",
			rating: 4,
			review:
				"Immersion technology, cozy transportation, and profoundly spiritual narratives. Everything was carefully considered by the Mzar team, particularly the authenticated historical content that lends credibility.",
		},
		
	];

	const itemsAr = [
		{
			id: 1,
			name: "عبدالباسط طاهر",
			country: "المملكة العربية السعودية",
			rating: 5,
			review:
				"الباص مريح ومكيّف، والتنظيم رائع من أول الحجز عبر التطبيق إلى آخر لحظة. أكثر ما شدّنا هو المرشد الصوتي اللي خلانا نعيش القصص أثناء زيارتنا لبئر طوى ومسجد الجن. تجربة روحانية وممتعة في آن واحد.",
		},
		{
			id: 2,
			name: "محمد نور",
			country: "جنوب أفريقيا",
			rating: 4,
			review:
				"من بداية الرحلة شعرنا بالراحة، والمرشد الصوتي زاد التجربة عمقًا. أحببنا كيف شرح تاريخ مسجد البيعة وجبل الرحمة بطريقة مؤثرة وسلسة.",
		},
		{
			id: 3,
			name: "عامر الطاف",
			country: "الامارات العربية المتحدة",
			rating: 5,
			review:
				"تجربة الواقع المعزز كانت مدهشة! مجرد ما وجّهنا الكاميرا على المعلم، ظهرت القصص أمامنا بطريقة تفاعلية رائعة، خصوصًا عند زيارة القصور الملكية وحي حراء الثقافي.",
		},
		{
			id: 4,
			name: "ابراهيم ايت لمعلم",
			country: "المغرب",
			rating: 5,
			review:
				"جميل كيف مزار جمع التقنية الحديثة مع الإرث الإسلامي. شفنا معالم مثل بئر طوى ومسجد البيعة، وسمعنا القصص الصوتية الموثّقة اللي خلتنا نعيش الحدث. نشكر مزار على هذه التجربة الممتعة",
		},
		{
			id: 5,
			name: "محمد أمين",
			country: "ألمانيا",
			rating: 4,
			review:
				"من حجز الرحلة عبر تطبيق مزار إلى ركوب الباص، كل شيء منظم ومريح. الجولة كانت مليئة بالمعلومات والقصص المؤثرة، خاصة عند زيارة جبل الرحمة.",
		},
		{
			id: 6,
			name: "حامد حسين",
			country: "باكستان",
			rating: 5,
			review:
				"الباص المكيّف والمرشد الصوتي خلّى الأطفال يستمتعوا بالرحلة، والواقع المعزز كان مثير جدًا لهم. استمتعنا بجمال حي حراء الثقافي وتاريخ الأماكن اللي زرناها. أنصح بهذه الجولة للعائلات",
		},
		{
			id: 7,
			name: "احمد محمود جمعه",
			country: "مصر",
			rating: 4,
			review:
				"تنظيم، راحة، ومحتوى غني بالمعلومات. أعجبني أن كل معلم يرافقه قصة موثّقة وصور تاريخية، من مسجد الجن حتى جبل الرحمة. تجربة متكاملة ومبتكرة.",
		},
		{
			id: 8,
			name: "ريحانه تيلا",
			country: "الامارات العربية المتحدة",
			rating: 5,
			review:
				"لم أشعر أني في جولة تقليدية، بل في رحلة تفاعلية تجمع بين العلم والتأمل. الصوت، الصور، وحتى التقنيات الجديدة خلت كل محطة لها طابعها الخاص. ",
		},
		{
			id: 9,
			name: "فيصل الاحمد",
			country: "بريطانيا",
			rating: 4,
			review:
				"الباصات نظيفة ومريحة جدًا، والمرشد الصوتي دقيق في المعلومة وهادئ في الطرح. استمتعنا كثيرًا عند زيارة القصور الملكية وسماع القصص حول تاريخها.",
		},
		{
			id: 10,
			name: "محمد حسن",
			country: "العراق",
			rating: 5,
			review:
				"من أول ما بدأنا الرحلة من بئر طوى إلى حي حراء، شعرنا أننا نعيش تجربة تجمع الماضي بالمستقبل. كل شيء منظم وسلس، والمرشد الصوتي أضفى روح خاصة للرحلة.",
		},
	];

	const testimonials = language === "ar" ? itemsAr : items;

	return (
		<div className="mb-20">
			<div
				className="container m-auto mb-20"
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
								<article className="bg-[#2E5A46] text-white rounded-2xl p-6 md:p-8 h-[300px] md:h-[340px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col justify-between relative overflow-hidden">
									{/* Quote icon decor */}
									<div className="absolute bottom-2 right-4 text-white pointer-events-none select-none">
										<i className="fa-solid fa-quote-right text-7xl md:text-8xl" />
									</div>

									{/* Text */}
									<p className="text-lg md:text-xl font-semibold leading-8 line-clamp-6" dir={language === "ar" ? "rtl" : "ltr"}>
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

			
		</div>
	);
}
