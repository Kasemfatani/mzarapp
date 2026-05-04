"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Clock, ChevronDown } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

import ExclusiveSlide from "@/components/Path/ExclusiveSlide";
import { motion } from "motion/react";

export default function Destinations({ data, lang }) {
	const [language, setLanguage] = useState(lang || "en");
	const swiperRef = useRef(null);
	const isAr = language === "ar";

	const destinations = data.locations || [];
	const t =
		language === "ar"
			? { title: "الوجهات", prev: "السابق", next: "التالي" }
			: { title: "Destinations", prev: "Prev", next: "Next" };

	// console.log("data is", data);

	return (
		<div className="destinations container mx-auto bg-white rounded-[20px] p-5 shadow-[0px_6px_20px_rgba(0,0,0,0.06)] overflow-hidden">
			{/* Section Header - Grouped */}
			<div className="mb-2">
				<div className="flex items-center gap-4 mb-6">
					<motion.div
						whileHover={{ rotate: 360 }}
						transition={{ duration: 0.6 }}
						className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#0f3d2e] to-[#1a5a42] flex items-center justify-center"
					>
						<Clock className="w-7 h-7 text-white" />
					</motion.div>
					<h2 className="text-[26px] leading-[1.3] text-[#0f3d2e]">
						{isAr ? "الوجهات" : "Destinations"}
					</h2>
				</div>

				<div className="h-px bg-gradient-to-r from-[#c9a463] via-gray-200 to-transparent"></div>
			</div>

			{/* Slider */}
			<Swiper
				modules={[Pagination, Autoplay]}
				autoplay={{ delay: 2500, disableOnInteraction: false }}
				slidesPerView={4}
				spaceBetween={18}
				loop={false}
				breakpoints={{
					1280: { slidesPerView: 4, spaceBetween: 18 },
					1024: { slidesPerView: 3, spaceBetween: 20 },
					768: { slidesPerView: 2, spaceBetween: 16 },
					0: { slidesPerView: 1, spaceBetween: 12 },
				}}
				className="destinations-swiper"
				style={{ direction: language === "ar" ? "rtl" : "ltr" }}
			>
				{destinations.map((item, idx) => (
					<React.Fragment key={item.id}>
						<SwiperSlide key={item.id}>
							<article
								className={`rounded-[20px] overflow-hidden h-[410px] flex flex-col shadow-2xl ${
									data.id === 45 && item.id === 1000
										? "bg-[var(--sec-color)] border-2 border-[#EAD7A1]"
										: "bg-white"
								}`}
							>
								{/* Image */}
								<div className="relative h-48 w-full">
									{data.id === 45 && item.id === 1000 && (
										<div
											className={language === "ar" ? "ribbon-rtl" : "ribbon"}
										>
											<span>{language === "ar" ? "خاص" : "SPECIAL"}</span>
										</div>
									)}
									<Image
										src={item.image}
										alt={`${data.name}`}
										fill
										className="object-cover"
										sizes="(max-width: 1280px) 50vw, 25vw"
									/>
								</div>

								{/* Text */}
								<div className="p-5 flex flex-col gap-2 flex-1">
									<h3 className="text-lg md:text-xl font-semibold text-[#141414]">
										{item.name}
									</h3>
									<p className="text-sm text-gray-600 leading-6 line-clamp-5">
										{item.description}
									</p>
									<div className="mt-auto" />
								</div>
							</article>
						</SwiperSlide>
						{/* Insert ExclusiveSlide after item.id === 15, only if data.id === 45 */}
						{data.id === 45 && item.id === 15 && (
							<SwiperSlide key={`exclusive-${item.id}`}>
								<ExclusiveSlide language={language} />
							</SwiperSlide>
						)}
					</React.Fragment>
				))}
			</Swiper>
		</div>
	);
}
