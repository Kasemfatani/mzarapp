"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination , Autoplay  } from "swiper/modules";
import "swiper/css";
import img1 from "/public/madinah/big-img.webp";
import Link from "next/link";
import Image from "next/image";

export default function Testimonials({ lang = "en" }) {
	const [language, setLanguage] = useState(lang || "en");
	const swiperRef = useRef(null);

	const t =
		language === "ar"
			? { title: "آراء العملاء", prev: "السابق", next: "التالي" }
			: { title: "Testimonials", prev: "Prev", next: "Next" };

	// 20 hard-coded testimonials (English only, single 'review' field)
	const items = [
		{
			id: 1,
			name: "Asad Ali",
			country: "Canada",
			rating: 5,
			review:
				"The trip went off without a hitch and was expertly planned. We had a great time and learned a lot thanks to the audio guide, which made every stop come to life. Strongly advised.",
		},
		{
			id: 2,
			name: "Mr. Shafaqat Ali",
			country: "Australia",
			rating: 4,
			review:
				"Very friendly and convenient service. The tour was much more meaningful because of the poignant and lucid audio commentary.",
		},
		{
			id: 3,
			name: "Manar Said",
			country: "United Kingdom",
			rating: 5,
			review:
				"Amazing insight into Makkah's heritage , the audio guide gave each site more depth and transformed facts into authentic tales we still discuss.",
		},
		{
			id: 4,
			name: "Mr. Abdelaziz",
			country: "Germany",
			rating: 5,
			review:
				"The most instructive trip I've ever gone on. We were able to emotionally connect with each landmark thanks to the well-planned route and the audio guide.",
		},
		{
			id: 5,
			name: "Ms. Nilar Alom Ispahany",
			country: "Australia",
			rating: 4,
			review:
				"The tour was fantastic. Our trips were enhanced and made more memorable by the in-app audio guide, and the driver and guide were polite and professional.",
		},
		{
			id: 6,
			name: "Mr. Noredin MOUSSAID",
			country: "France",
			rating: 5,
			review:
				"A fascinating experience from beginning to end. The audio narration brought the history to life, and Abdullah and the team were superb.",
		},
		{
			id: 7,
			name: "Mr. Afaq Punjabi",
			country: "United Kingdom",
			rating: 4,
			review:
				"Good trip, executed and paced well. Each stop became unique and memorable when the stories were told via the audio guide.",
		},
		{
			id: 8,
			name: "Ms. Nur Alya",
			country: "Malaysia",
			rating: 5,
			review:
				"The service was first-rate, and everything arrived on schedule. One of the highlights was the audio guide, which transformed facts into heartwarming tales.",
		},
		{
			id: 9,
			name: "Ms. Andrea Longley",
			country: "United Kingdom",
			rating: 5,
			review:
				"We thoroughly enjoyed our exploration of the historical sites. A must for first-time visitors, the guided audio helped us comprehend context we were previously unaware of.",
		},
		{
			id: 10,
			name: "Mr. Bodrudduza Numan",
			country: "Canada",
			rating: 5,
			review:
				"The staff was extremely professional, the itinerary was well-considered, and the audio guide turned our walk into an unforgettable educational experience.",
		},
		{
			id: 11,
			name: "Ms. Mastura SHAHRUM",
			country: "France",
			rating: 4,
			review:
				"A truly moving day , the itinerary was smart and the audio narration painted vivid scenes from every stop. We departed with a sense of inspiration and enrichment.",
		},
		{
			id: 12,
			name: "Ms. STEPHANIE SAYEGH",
			country: "France",
			rating: 5,
			review:
				"It was a gentle, memorable tour; I liked how the audio guide allowed us to take in the stories at our own pace and the careful pacing.",
		},
		{
			id: 13,
			name: "Mr. Mohammad Siddique",
			country: "Australia",
			rating: 5,
			review:
				"The tour went smoothly thanks to the attentive staff, the audio guide that clarified details we had never noticed before, and the clear timing.",
		},
		{
			id: 14,
			name: "Yusuf Ahmed Shehzad Vilchis",
			country: "Mexico",
			rating: 5,
			review:
				"Everything was accessible to our group thanks to the multilingual audio. The day was unique because everyone could relate to and understood each other.",
		},
		{
			id: 15,
			name: "Mr. Hassan Howlader",
			country: "United Kingdom",
			rating: 4,
			review:
				"Great for families ,adults enjoyed the historical depth, and children remained interested with the lively audio stories.",
		},
		{
			id: 16,
			name: "Mr. Salim Al Harrasi",
			country: "Oman",
			rating: 5,
			review:
				"Comfortable transportation, courteous personnel, and an audio tour that resembled a discussion with an informed friend.",
		},
		{
			id: 17,
			name: "Ms. Chahira Ait Belkacem",
			country: "France",
			rating: 4,
			review:
				"Hearing each landmark through the audio guide gave it a new meaning. This encounter altered my perspective on Makkah's past.",
		},
		{
			id: 18,
			name: "Mr. Navin Raj",
			country: "Canada",
			rating: 5,
			review:
				"The in-app stories brought the sites to life in a way that no guidebook could, the driver was professional, and the stops were strategically placed.",
		},
		{
			id: 19,
			name: "Mr. Kevin Van der Voort",
			country: "Netherlands",
			rating: 5,
			review:
				"We admired the tour's ability to strike a balance between introspection and exploration. The voices of the audio guide gave the landmarks a more intimate, sentimental quality.",
		},
		{
			id: 20,
			name: "Dr. Salamatu Garba",
			country: "Nigeria",
			rating: 5,
			review:
				"Great value , educational narration, seamless operations, and special moments captured with the app's filters.",
		},
	];

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
						{items.map((r) => (
							<SwiperSlide key={r.id}>
								<article className="bg-[#2E5A46] text-white rounded-2xl p-6 md:p-8 h-[300px] md:h-[320px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col justify-between relative overflow-hidden">
									{/* Quote icon decor */}
									<div className="absolute bottom-2 right-4 text-white pointer-events-none select-none">
										<i className="fa-solid fa-quote-right text-7xl md:text-8xl" />
									</div>

									{/* Text */}
									<p className="text-lg md:text-xl font-semibold leading-8 line-clamp-4">
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
								<>في جولةٍ واحدة… تعيش سيرة النبوة حيث وقعت أحداثها.</>
							) : (
								<>
									In one tour, relive the Prophet’s story where it truly happened.
								</>
							)}
						</p>
						<p className="text-lg md:text-2xl text-white mb-8 max-w-2xl">
							{language === "ar" ? (
								<>مزار — نروي التاريخ لتراه بعينك وتسمعه بقلبك. </>
							) : (
								<> Mzar ,where history is seen with your eyes and felt with your heart. </>
							)}
						</p>

						<Link
							href="/book-madinah"
							className="book-link text-lg md:text-xl max-w-xs w-full"
							style={{ fontWeight: 700 }}
						>
							{language === "en" ? "Book Your Tour Now" : "احجز جولتك الآن"}
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
