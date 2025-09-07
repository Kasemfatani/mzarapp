"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Loading from "@/app/loading";
import { API_BASE_URL } from "@/lib/apiConfig";


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
						<h1 className="text-5xl font-bold mb-5">
							{language === "ar" ? "المعرض" : "Gallery"}
						</h1>
						<p className="w-[80%] md:w-[60%]">
							{language === "ar"
								? "استكشف أجمل اللحظات والذكريات من رحلاتنا الدينية إلى مكة المكرمة والمدينة المنورة وغيرها من الأماكن المقدسة. يضم هذا المعرض صورًا توثق روحانية الرحلة وتجارب الزوار في أجواء إيمانية فريدة."
								: "Explore the most beautiful moments and memories from our journeys to Makkah, Madinah, and other sacred sites. This gallery features photos capturing the spirituality of the trips and the unique experiences of the visitors."}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
