"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import hero from "/public/hero.jpg";
import iPhones from "/public/iphones.webp";
import iPhonesAr from "/public/iphonesAr.webp";
import { motion } from "framer-motion";
import Loading from "@/app/loading";
import { API_BASE_URL } from "@/lib/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"

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
	},
	{
		bg: "/madinah1.png",
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
		iphones: "/DownloadAppSection-phones.png",
	},
	{
		bg: "/makkah2.png",
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
	},

	{
		bg: "/madinah2.jpg",
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
		iphones: "/DownloadAppSection-phones.png",
	},
];

export default function Hero() {
	const [loading, setLoading] = useState(true); // State for loading indicator
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [language, setLanguage] = useState("en"); // Default language is 'en'
	useEffect(() => {
		// setLoading(true);

		if (typeof window !== "undefined") {
			// Define the headers with the selected language
			setLanguage(localStorage.getItem("lang"));
			const headers = {
				lang: localStorage.getItem("lang"), // Change language dynamically based on state
			};
			// Fetch data from the API with Axios
			axios
				.get(`${API_BASE_URL}/landing/home/features`, {
					headers: headers,
				})
				.then((response) => {
					setData(response.data); // Set the response data to state
					setLoading(false); // Set loading to false
					console.log(language);

					document.title =
						localStorage.getItem("lang") == "en"
							? "Mzar: Your Journey into the Depths of History and Spirituality"
							: "مزار: رحلتك إلى أعماق التاريخ والروحانية";
				})
				.catch((error) => {
					setError(error); // Handle any errors
					console.error("Error fetching data:", error);
					setLoading(false);
				});
		}
	}, []); // Run this effect whenever the `language` changes
	return (
		<div className="hero">
			{loading ? (
				<Loading />
			) : (
				<Swiper
					modules={[Autoplay, Pagination]}
					autoplay={{ delay: 5000 }}
					pagination={{ clickable: true }}
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
										<div className="welcome container m-auto">
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
													src={slide.iphones}
													alt="Mazar"
													className="iphones-img w-[300px] h-[300px] "
													width={300}
													height={600}
												/>
											</div>
										</div>
										{/* Only show features on the first slide */}
										{idx === 0 && (
											<div className="features container m-auto">
												{data?.data.map((feature, index) => (
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
															alt="Mazar"
															width={32}
															height={32}
															className=" h-8 w-auto "
														/>
														<p>{feature.title}</p>
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
