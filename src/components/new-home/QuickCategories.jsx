"use client";

import React, { useRef, useState } from "react";
import {
	MapPin,
	Landmark,
	Users,
	User,
	UserCheck,
	Clock,
	ArrowLeft,
	Globe2,
	BookOpen,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function QuickCategories({ lang }) {
	const isAr = lang === "ar";
	const categories = [
		{
			icon: <MapPin size={56} strokeWidth={1.5} />,
			title: isAr ? "جولات الحرمين الشريفين " : "Two Holy Mosques Tours",
			description: isAr ? "رحلات ميدانية مرخصة داخل الحرمين الشريفين مع مرشدين معتمدين" : "Licensed on-site tours inside Al-Masjid Al-Haram and Al-Masjid An-Nabawi, led by certified guides",
		},
		{
			icon: <Landmark size={56} strokeWidth={1.5} />,
			title: isAr ? "الرحلات الإثرائية" : "Enrichment Journeys",
			description: isAr ? "استكشاف المعالم الدينية والتاريخية في مكة والمدينة " : "Explore the most significant religious and historical landmarks in Makkah and Madinah",
		},
		{
			icon: <Users size={56} strokeWidth={1.5} />,
			title: isAr ? "حافلة الجولات الإثرائية " : "Enrichment Tours Bus",
			description: isAr ? "رحلة تشاركية إلى أبرز معالم مكة التاريخية والثقافية " : "A shared tour experience to Makkah’s most prominent historical and cultural landmarks",
		},
		// {
		// 	icon: <User size={56} strokeWidth={1.5} />,
		// 	title: isAr ? "جولة المسجد الحرام الإثرائية " : "Masjid al-Haram Enrichment Tour",
		// 	description: isAr ? "تجربة تأخذك بين قدسية المكان وعبق التاريخ ــ ابدأ جولتك الآن! " : "An experience that takes you between the sanctity of the place and the fragrance of history ــ start your tour now!",
		// },
		// {
		// 	icon: <UserCheck size={56} strokeWidth={1.5} />,
		// 	title: isAr ? "جولات للنساء فقط" : "Women Only Tours",
		// 	description: isAr ? "رحلات آمنة ومناسبة للنساء فقط" : "Safe and suitable trips for women only",
		// },
		// {
		// 	icon: <Clock size={56} strokeWidth={1.5} />,
		// 	title: isAr ? "رحلات اليوم الواحد" : "One Day Trips",
		// 	description: isAr ? "أنشطة وتجارب سريعة ليوم واحد فقط" : "Quick activities and experiences for one day only",
		// },
		// {
		// 	icon: <Globe2 size={56} strokeWidth={1.5} />,
		// 	title: isAr ? "جولات دولية" : "International Tours",
		// 	description: isAr ? "رحلات خارج المملكة لاكتشاف العالم" : "Trips outside the kingdom to explore the world",
		// },
		// {
		// 	icon: <BookOpen size={56} strokeWidth={1.5} />,
		// 	title: isAr ? "جولات تعليمية" : "Educational Tours",
		// 	description: isAr ? "رحلات مخصصة للتعلم واكتساب المعرفة" : "Trips dedicated to learning and gaining knowledge",
		// },
	];

	const [activeIndex, setActiveIndex] = useState(0);
	const swiperRef = useRef(null);

	return (
		<section className="py-24 bg-white relative overflow-hidden">
			{/* Soft background shape for depth */}
			<div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
				<div className="absolute top-20 right-0 w-96 h-96 bg-[#E7D3AF] rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 left-0 w-96 h-96 bg-[#A8C3BC] rounded-full blur-3xl"></div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2
						className="text-[#3C6652] mb-4 font-bold"
						style={{ fontSize: "2.5rem" }}
					>
						{isAr ? "استكشف تجارب مزار الحصرية" : "Explore Mzar's Exclusive Experiences"}
					</h2>
					<p
						className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed"
						style={{
							
							lineHeight: "1.7",
						}}
					>
						{isAr ? "نصمّم تجاربنا بعناية لتناسب احتياجاتكم وتمنحكم دهشة وإثراء" : "We thoughtfully design our experiences to meet your needs, offering moments of inspiration, enrichment, and discovery "}
					</p>
				</div>

				{/* Swiper Slider */}
				<Swiper
					onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
					onSwiper={(swiper) => (swiperRef.current = swiper)}
					slidesPerView={1}
					spaceBetween={24}
					breakpoints={{
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					autoplay={{ delay: 3000, disableOnInteraction: false }}
					loop={true}
					modules={[Autoplay]}
					className=""
					id="QuickCategories"
				>
					{categories.map((category, index) => (
						<SwiperSlide key={index}>
							<div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300  group hover:scale-[1.03] border border-gray-100 flex flex-col">
								<div className="p-8 flex flex-col items-center text-center flex-1">
									{/* Icon */}
									<div className="mb-6 text-[#867957] group-hover:text-[#3C6652] transition-colors group-hover:scale-110 transform duration-300">
										{category.icon}
									</div>
									{/* Title */}
									<h3
										className="text-[#3C6652] mb-3 font-semibold"
										style={{  fontSize: "1.5rem" }}
									>
										{category.title}
									</h3>
									{/* Description */}
									<p
										className="text-gray-600 mb-6 leading-relaxed min-h-[3rem]"
										style={{
										
											lineHeight: "1.6",
										}}
									>
										{category.description}
									</p>
									{/* Arrow Icon */}
									<div className="mt-auto flex items-center gap-2 text-[#867957] group-hover:gap-4 transition-all">
										<span
											className="text-sm"
											style={{
												
												fontWeight: 500,
											}}
										>
											{isAr ? "استكشف ←" : "Explore →"}
										</span>
										
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Custom Pagination */}
				{/* <div className="flex items-center justify-center mt-8 gap-3">
					{categories.map((_, i) => (
						<button
							key={i}
							aria-label={`انتقل إلى الشريحة ${i + 1}`}
							onClick={() => {
								swiperRef.current?.slideToLoop(i);
								setActiveIndex(i);
							}}
							className={`transition-all duration-200 ${
								activeIndex === i
									? "bg-[#009966] w-8 h-2 rounded-full"
									: "bg-[#d1d5dc] w-2 h-2 rounded-full"
							} border-none outline-none cursor-pointer`}
							style={{
								boxShadow: activeIndex === i ? "0 0 0 2px #00996644" : "none",
							}}
						></button>
					))}
				</div> */}
			</div>
		</section>
	);
}
