"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import hero from "/public/hero.webp";
import iPhones from "/public/Home/Phone-Mockup.png"; //should be eng ver
import iPhonesAr from "/public/Home/Phone-Mockup.png";
import { motion } from "framer-motion";
import Loading from "@/app/loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const heroSlides = [
	{
		bg: hero.src,
		h1: {
			en: (
				<>
					Explore <span>Makkah</span> with us !
				</>
			),
			ar: (
				<>
					استكشف <span>مكة</span> معنا!
				</>
			),
		},
		p: {
			en: "Your Makkah tour starts from here",
			ar: "تبدأ جولتك في مكة من هنا",
		},
		iphones: iPhones,
		iphonesAr: "/Home/Phone-makkah-ar.webp",
		iphonesEn: "/Home/Phone-makkah-en.webp",
	},
	{
		bg: "/madinah1.webp",
		h1: {
			en: (
				<>
					Explore <span>Medina</span> with Us
				</>
			),
			ar: (
				<>
					اكتشف <span>المدينة</span> معنا!
				</>
			),
		},
		p: {
			en: "Your journey in Al-Madinah Al-Munawwarah starts here",
			ar: "رحلتك في المدينة المنورة تبدأ من هنا",
		},
		iphones: "/DownloadAppSection-phones.webp",
		iphonesAr: "/Home/Phone-madinah-ar.webp",
		iphonesEn: "/Home/Phone-madinah-en.webp",
	},
	{
		bg: "/makkah2.webp",
		h1: {
			en: (
				<>
					Discover <span>Makkah</span> Al-Mukarramah
				</>
			),
			ar: (
				<>
					اكتشف <span>مكة</span> المكرمة
				</>
			),
		},
		p: {
			en: "Highlighting the most significant religious, historical, and cultural landmarks",
			ar: "أبرز المعالم الدينية والتاريخية والثقافية",
		},
		iphones: iPhonesAr,
		iphonesAr: "/Home/Phone-makkah-ar.webp",
		iphonesEn: "/Home/Phone-makkah-en.webp",
	},

	{
		bg: "/madinah2.webp",
		h1: {
			en: (
				<>
					Prophetic Tales and <span>Historical</span> Landmarks
				</>
			),
			ar: (
				<>
					حكايات نبوية وآثار <span>تاريخية</span>
				</>
			),
		},
		p: {
			en: "Discover the history of Al-Madinah Al-Munawwarah",
			ar: "استكشف تاريخ المدينة المنورة",
		},
		iphones: "/DownloadAppSection-phones.webp",
		iphonesAr: "/Home/Phone-madinah-ar.webp",
		iphonesEn: "/Home/Phone-madinah-en.webp",
	},
];

// add hardcoded features (icons are from public/Home)
const features = [
	{
		icon: "/Home/languages.png",
		title: { en: "Six international languages", ar: "ست لغات عالمية" },
	},
	{
		icon: "/Home/voice.png",
		title: { en: "Intelligent voice guidance", ar: "إرشاد صوتي ذكي" },
	},
	{
		icon: "/Home/destination.png",
		title: {
			en: "Ensuring reaching to destinations",
			ar: "ضمان الوصول للوجهات",
		},
	},
];

export default function Hero() {
	const [loading, setLoading] = useState(false); // no API call, start not loading
	const [language, setLanguage] = useState("en");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const lang = localStorage.getItem("lang") || "en";
			setLanguage(lang);
			document.title =
				lang === "en"
					? "Mzar: Your Journey into the Depths of History and Spirituality"
					: "مزار: رحلتك إلى أعماق التاريخ والروحانية";
		}
	}, []);

	return (
		<div className="hero">
			{loading ? (
				<Loading />
			) : (
				<Swiper
					modules={[Autoplay]}
					autoplay={{ delay: 5000 }}
					// pagination={{ clickable: true }}
					loop
				>
					{heroSlides.map((slide, idx) => (
						<SwiperSlide key={idx}>
							<div
								className="hero"
								style={{
									backgroundImage: `url(${slide.bg})`,
									backgroundRepeat: "no-repeat",
									backgroundSize: "cover",
									direction: language === "ar" ? "rtl" : "ltr",
								}}
							>
								<div className="relative">
									<div className=" bg-black/50 overlay">
										<div className="welcome container md:m-auto">
											<div className="hero-text md:w-[60%]">
												<h1>{slide.h1[language === "ar" ? "ar" : "en"]}</h1>
												<p className="text-start">
													{slide.p[language === "ar" ? "ar" : "en"]}
												</p>
												<Link href="/book" className="hero-book-btn">
													{language === "en" ? "Book Now" : "احجز الآن"}
												</Link>
											</div>
											<div className="iPhones">
												<Image
													src={language === "en" ? slide.iphonesEn : slide.iphonesAr}
													alt="Mazar"
													className={
														"iphones-img h-[330px]" +
														(slide.iphones === "/DownloadAppSection-phone.webp"
															? ""
															: " w-[200px]")
													}
													width={300}
													height={600}
													priority
												/>
											</div>
										</div>
										{/* Only show features on the first slide */}
										{idx === 0 && (
											<div className="features container md:m-auto">
												{features.map((feature, index) => (
													<motion.div
														initial={{ opacity: 0, y: -100 }}
														whileInView={{ opacity: 1, y: 0 }}
														transition={{
															type: "spring",
															bounce: 0.2,
															duration: index + 1 * 0.3,
														}}
														key={index}
														viewport={{ once: true }}
														className="feature"
													>
														<Image
															src={feature.icon}
															alt={
																feature.title[language === "ar" ? "ar" : "en"]
															}
															width={42}
															height={42}
															className=""
															priority
														/>
														<p>
															{feature.title[language === "ar" ? "ar" : "en"]}
														</p>
													</motion.div>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			)}
			{/* <Link href='https://hajjconfex.com/visitor-registration' target='_blank'>
                <Image src={language === 'en' ? hero2 : hero3} alt="Mazar" className="img-banner" />
            </Link> */}
		</div>
	);
}
