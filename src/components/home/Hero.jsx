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
		h1: (
			<>
				Explore <span>Makkah</span> with us !
			</>
		),
		p: "Your Makkah tour starts from here",
		iphones: iPhones,
	},
	{
		bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
		h1: (
			<>
				Discover <span>Medina</span> Wonders
			</>
		),
		p: "Experience the beauty of Medina",
		iphones: "/DownloadAppSection-phones.png",
	},
	{
		bg: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
		h1: (
			<>
				Unveil <span>History</span> in Riyadh
			</>
		),
		p: "Journey through Riyadh's heritage",
		iphones: iPhonesAr,
	},
	{
		bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
		h1: (
			<>
				Adventure in <span>Jeddah</span>
			</>
		),
		p: "Start your Red Sea adventure",
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
											<div className="hero-text">
												<h1>{slide.h1}</h1>
												<p>{slide.p}</p>
												<Link href="/#paths" className="hero-book-btn">
													{language === "en" ? "Book Now" : "احجز الان"}
												</Link>
											</div>
											<div className="iPhones">
												<Image
													src={slide.iphones}
													alt="Mazar"
													className="iphones-img w-[300px] h-[300px]"
													width={300}
													height={600}
												/>
											</div>
										</div>
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
