"use client";

import { Search, ChevronDown, Calendar, SlidersHorizontal } from "lucide-react";
import { FeaturedToursCard } from "./FeaturedToursCard";
import { useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./QuickCategories.module.css";

export default function FeaturedToursSection({ lang, topData }) {
	const [showAll, setShowAll] = useState(false);

	const isAr = lang === "ar";

	if (!topData || topData.length === 0) return null;

	return (
		<section className="py-20 bg-gradient-to-b from-white to-[#E7D3AF]/10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12">
					<h2 className="text-[#3C6652] mb-3 font-bold">
						{isAr ? "اختر تجربتك  المفضلة" : "Choose Your Preferred Experience"}
					</h2>
					<p className="text-gray-600 text-xl">
						{isAr
							? "تجارب مصممة بعناية لتثري تجربة زيارتك إلى مكة المكرمة والمدينة المنورة "
							: "Carefully designed experiences that enrich your visit to Makkah Al-Mukarramah and Al-Madinah Al-Munawwarah"}
					</p>
				</div>

				{/* Tours Slider */}
				<Swiper
					modules={[Autoplay]}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					loop={true}
					spaceBetween={24}
					slidesPerView={1.1}
					breakpoints={{
						640: { slidesPerView: 1.1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 }, // show 3 on larger screens
					}}
					className={styles.quickCategories}
				>
					{topData.map((tour, index) => (
						<SwiperSlide key={tour.id ?? index}>
							<FeaturedToursCard {...tour} isAr={isAr} />
						</SwiperSlide>
					))}
				</Swiper>

				{/* View All Button */}
				{!showAll && (
					<div className="text-center mt-12">
						<Link
							href="/all-trips"
							className="bg-white border-2 border-[#867957] text-[#867957] px-12 py-4 rounded-xl hover:bg-[#867957] hover:text-white transition-all shadow-md hover:shadow-lg inline-block"
						>
							{isAr ? "عرض جميع التجارب" : "View All Experiences"}
						</Link>
					</div>
				)}
			</div>
		</section>
	);
}
