"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination , Autoplay  } from "swiper/modules";
import "swiper/css";
import img1 from "/public/madinah/banner-bg.webp";
import Link from "next/link";
import Image from "next/image";

export default function Testimonials({ lang = "en" }) {
	const [language, setLanguage] = useState(lang || "en");
	const swiperRef = useRef(null);

	const t =
		language === "ar"
			? { title: "آراء العملاء", prev: "السابق", next: "التالي" }
			: { title: "Testimonials", prev: "Prev", next: "Next" };

	//  hard-coded testimonials 
	const items = [
		{
			id: 1,
			name: "Arif Mirza",
			country: "Canada",
			rating: 5,
			review:
				"My Masjid an-Nabawi tour was made much more meaningful by the audio guide in my native tongue. The interactive questions kept us interested, the historical images brought the past to life, and receiving the visit certificate at the conclusion made me feel like I had accomplished something truly unique.",
		},
		{
			id: 2,
			name: "Ms. Myriam Grinah",
			country: "France",
			rating: 4,
			review:
				"This tour's multilingual audio guide, made every stop an exploration of Masjid an-Nabawi. The final certificate was a beautiful way to wrap things up.",
		},
		{
			id: 3,
			name: "Mr. Sulaiman Malaji",
			country: "Australia",
			rating: 5,
			review:
				"Our hearts were won over by the tour as soon as we walked into Masjid an-Nabawi. The historical images helped us visualize early Islamic history and the entertaining quiz questions made it engaging. Afterward, I loved the certificate!",
		},
		{
			id: 4,
			name: "Ms. Soad Itani",
			country: "United Kingdom",
			rating: 5,
			review:
				"Everything went really well: the audio guide on the app made sure we didn't miss anything, selecting our language was easy, it is not gonna be the last Tour with Mzar",
		},
		{
			id: 5,
			name: "Farookh Kupe",
			country: "United Arab Emirates",
			rating: 4,
			review:
				"The breadth of experience at Masjid an-Nabawi was what most impressed us. We saw old photographs that surrounded each landmark ,  Suggested for anyone looking for more than a simple visit.",
		},
		{
			id: 6,
			name: "Zaheer laher",
			country: "South Africa",
			rating: 5,
			review:
				"Despite my prior visits to Masjid an-Nabawi, this time was completely different thanks to the audio guide. The historical photos added layers of story, the interactive quiz was fun for the family, and the certificate at the end sealed the experience.",
		},
		{
			id: 7,
			name: "aneil ahmed",
			country: "United Kingdom",
			rating: 4,
			review:
				"We are delighted that we selected this tour for Masjid an-Nabawi. The tour was enjoyable for people of all ages thanks to the interactive questions, and the multilingual audio guide that covered every detail. An unanticipated benefit was the visitation certificate.",
		},
		{
			id: 8,
			name: "Adeel imtiaz",
			country: "Pakistan",
			rating: 5,
			review:
				"We knew this was unique tour at Masjid an-Nabawi. It was a journey we will never forget because the audio guide story, the interactive reflections, and the final certificate.",
		},
		{
			id: 9,
			name: "nerffous",
			country: "France",
			rating: 5,
			review:
				"Just amazing. We received a certificate of our visit after being led by a kind narrator, assisted by rare historical photographs, and engaged by interactive questions at Masjid an-Nabawi. A mind-and-soul-enriching experience.",
		},
		
	];

	const itemsAr = [
		{
			id: 1,
			name: "عبد العزيز",
			country: "ألمانيا",
			rating: 5,
			review:
				"تجربة روحانية لا تُنسى في المسجد النبوي!المرشد الصوتي بلغتي أضاف عمقًا خاصًا للزيارة، والصور التاريخية ، والأسئلة التفاعلية كانت ممتعة جدًا، أما شهادة الزيارة فكانت لمسة جميلة في النهاية",
		},
		{
			id: 2,
			name: "طاهر بلوتش",
			country: "كندا",
			rating: 4,
			review:
				"جولة فوق التوقعات!استمعنا للقصص بلغتنا، وشاهدنا صورًا نادرة من تاريخ المسجد النبوي، وتفاعلنا مع الأسئلة اللي زادت متعة الجولة، وأجمل ختام كان استلام شهادة الزيارة",
		},
		{
			id: 3,
			name: "محمود حمزة",
			country: "أستراليا",
			rating: 5,
			review:
				"تجربة إثرائية حديثة بروح الماضي!استمتعنا بشرح واضح من المرشد الصوتي، والأسئلة التفاعلية خلت الرحلة تعليمية ومسلية في نفس الوقت ، لن تكون الرحلة الأخيرة مع مزار",
		},
		{
			id: 4,
			name: "روهين زيب",
			country: "ايرلندا",
			rating: 5,
			review:
				"رحلة مليئة بالمشاعر والمعرفة 🕌المرشد الصوتي روى لنا القصص بأسلوب مؤثر، والصور التاريخية عرّفتنا على تفاصيل ما كنا نعرفها، والأسئلة الصغيرة خلتنا نعيش التجربة بكل حواسنا.",
		},
		{
			id: 5,
			name: "إقبال سراف",
			country: "كندا",
			rating: 4,
			review:
				"المرشد الصوتي غيّر تجربتي تمامًا.كنت زرت المسجد النبوي من قبل، لكن مع القصص الصوتية والصور التاريخية، أحسست وكأني أزوره لأول مرة، وشهادة الزيارة كانت مفاجأة جميلة.",
		},
		{
			id: 6,
			name: "ابراهيم ابا",
			country: "نيجيريا",
			rating: 5,
			review:
				"جولة تجمع بين التقنية والإثراء.الصوت يروي، الصور تعرض، والأسئلة تثير الفضول ، تجربة متكاملة تعيشك روح المكان، شكرًا مزار",
		},
		{
			id: 7,
			name: "عبد الرحيم  علي",
			country: "السويد",
			rating: 4,
			review:
				"استمتعنا بكل لحظة في المسجد النبوي.المرشد الصوتي بلغتنا، الصور القديمة اللي تحكي تاريخ المكان، والأسئلة اللي تخليك تلاحظ التفاصيل أكثر ، كلها خلت التجربة لا تُنسى.",
		},
		{
			id: 8,
			name: "منار سيد",
			country: "بريطانيا",
			rating: 5,
			review:
				"رحلة للمسجد النبوي مليئة بالإلهام والمعرفة.كل تفصيل في الجولة كان محسوب : اللغة، الصوت، الصور، الأسئلة، وحتى شهادة الزيارة في النهاية كانت تذكّرنا بعظمة التجربة.",
		},
		{
			id: 9,
			name: "عائشه الجابري",
			country: "الإمارات العربية المتحدة",
			rating: 5,
			review:
				"من أجمل التجارب اللي خضتها في المدينة المنورة.\nالتطبيق منظم جدًا، والمرشد الصوتي يرافقك خطوة بخطوة، والصور التاريخية تعيدك إلى البدايات، وشهادة الزيارة كانت تذكار رائع.",
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
