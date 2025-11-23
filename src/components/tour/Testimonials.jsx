"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
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

	//  hard-coded testimonials 
	const items = [
		{
			id: 1,
			name: "Drame Samba",
			country: "France",
			rating: 5,
			review:
				"Every stop was immersive thanks to the tour guide ; Selecting my language was easy with the app’s instant translation feature, the historical images beautifully told the stories, and the interactive questions kept me interested the entire time.",
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
				"I valued the app's multilingual translation,also The certificate is a sentimental memento, thanks Mzar for this amazing Masjid Haram tour ",
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
				"Despite my prior visits to Masjid an-Nabawi, this time was completely different thanks to the tour guide . The historical photos added layers of story, the interactive quiz was fun for the family, and the certificate at the end sealed the experience.",
		},
		{
			id: 7,
			name: "aneil ahmed",
			country: "United Kingdom",
			rating: 4,
			review:
				"We are delighted that we selected this tour for Masjid an-Nabawi. The tour was enjoyable for people of all ages thanks to the interactive questions, and the  Accompanied Tour Guid that covered every detail. An unanticipated benefit was the visitation certificate.",
		},
		{
			id: 8,
			name: "Adeel imtiaz",
			country: "Pakistan",
			rating: 5,
			review:
				"We knew this was unique tour at Masjid an-Nabawi. It was a journey we will never forget because of the tour guide’s stories, the interactive reflections, and the final certificate.",
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
			name: "على",
			country: "الامارات العربية المتحدة",
			rating: 5,
			review:
				"جولة المسجد الحرام كانت تجربة إثرائية بكل تفاصيلها! المرشد المرافق كان رائع، والصور التاريخية خلتنا نعيش الماضي لحظة بلحظة، وأجمل شيء كانت شهادة الزيارة في النهاية.",
		},
		{
			id: 2,
			name: "تميم",
			country: "كندا",
			rating: 4,
			review:
				"جولة المسجد الحرام كانت مختلفة ، واستمتعت بالمعلومات التي قدمها المرشد المرافق ، الصور القديمة كانت تبهرنا في كل محطة، والأسئلة كانت تخلينا نشارك ونفكر.",
		},
		{
			id: 3,
			name: "سفيان",
			country: "بريطانيا",
			rating: 5,
			review:
				"جمعت بين المتعة والمعرفة، المرشد المرافق شرح القصص بأسلوب جميل، واللغة كانت واضحة ومفهومة، أما الصور التاريخية فقدمت لنا مشاهد ما كنا نعرفها من قبل، وختمنا بشهادة نفتخر فيها.",
		},
		{
			id: 4,
			name: " نعيمة",
			country: "أستراليا",
			rating: 5,
			review:
				"الجولة كانت ممتعة ، كل شيء منظم  ، القصص  ممتعة ، تجربة فعلاً عصرية بتقنيات حديثة.",
		},
		{
			id: 5,
			name: "إقبال سراف",
			country: "كندا",
			rating: 4,
			review:
				"المرشد المرافق غيّر تجربتي تمامًا.كنت زرت المسجد النبوي من قبل، لكن مع القصص والصور التاريخية، أحسست وكأني أزوره لأول مرة، وشهادة الزيارة كانت مفاجأة جميلة.",
		},
		{
			id: 6,
			name: "ابراهيم ابا",
			country: "نيجيريا",
			rating: 5,
			review:
				"جولة تجمع بين التقنية والإثراء. بين القصص التي تُروي،و الصور التاريخية التي تُعرض، والأسئلة التي تثير الفضول ، تجربة متكاملة تعيشك روح المكان، شكرًا مزار ",
		},
		{
			id: 7,
			name: "عبد الرحيم  علي",
			country: "السويد",
			rating: 4,
			review:
				"استمتعنا بكل لحظة في المسجد النبوي. القصص التي رواها المرشد المرافق، الصور القديمة اللي تحكي تاريخ المكان، والأسئلة اللي تخليك تلاحظ التفاصيل أكثر ، كلها خلت التجربة لا تُنسى.",
		},
		{
			id: 8,
			name: "منار سيد",
			country: "بريطانيا",
			rating: 5,
			review:
				"رحلة للمسجد النبوي مليئة بالإلهام والمعرفة.كل تفصيل في الجولة كان محسوب : القصص، الصور، الأسئلة، وحتى شهادة الزيارة في النهاية كانت تذكّرنا بعظمة التجربة.",
		},
		{
			id: 9,
			name: "عائشه الجابري",
			country: "الإمارات العربية المتحدة",
			rating: 5,
			review:
					"من أجمل التجارب اللي خضتها في المدينة المنورة. التطبيق منظم جدًا، والمرشد المرافق يرافقك خطوة بخطوة، والصور التاريخية تعيدك إلى البدايات، وشهادة الزيارة كانت تذكار رائع.",
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
						modules={[Pagination, Autoplay]}
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

			<div className="w-full overflow-hidden">
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
						<img
							src="/Home/footer-logo.png"
							alt="Mzar Logo"
							className="mx-auto mb-6"
							width={187}
						/>
						<p className="text-lg md:text-2xl text-white mb-8 max-w-2xl">
							{language === "ar" ? (
								<> احجز جولتك الآن، ودعنا نروي لك القصة حيث وقعت. </>
							) : (
								<>
									Book your tour now, and let us tell you the story where it
									happened.
								</>
							)}
						</p>

						<div className="flex flex-col md:flex-row gap-4 w-full ">
							<Link
								href="/book-haram"
								className="book-link !text-base  w-full"
								style={{ fontWeight: 700 }}
							>
								{language === "en" ? "Book Masjid Al Haram Tour" : "حجز جولة المسجد الحرام"}
							</Link>
							<Link
								href="/book-madinah"
								className="book-link !text-base  w-full"
								style={{ fontWeight: 700 }}
							>
								{language === "en" ? "Book Masjid An-Nabawi Tour" : "حجز جولة المسجد النبوي"}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
