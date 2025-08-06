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

export default function HeroSection() {
	const [loading, setLoading] = useState(false); // State for loading indicator

	const [language, setLanguage] = useState("en"); // Default language is 'en'
	useEffect(() => {
		// setLoading(true);

		if (typeof window !== "undefined") {
			// Define the headers with the selected language
			setLanguage(localStorage.getItem("lang"));
		}
	}, []); // Run this effect whenever the `language` changes
	return (
		<div className="">
			{loading ? (
				<Loading />
			) : (
				<div
					className="h-[500px] "
					style={{
						backgroundImage: `url(/gallary-hero-bg.png)`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						direction: language === "ar" ? "rtl" : "ltr",
					}}
				>
					<div className="container m-auto flex flex-col  justify-center  h-full text-white">
						<h1 className="text-5xl font-bold mb-5">Gallery</h1>
						<p className="w-[80%] md:w-[60%]">
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s, when an unknown printer took a galley of
							type and scrambled it to make a type specimen book. It has
							survived not only five centuries, but also the leap into
							electronic typesetting
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
