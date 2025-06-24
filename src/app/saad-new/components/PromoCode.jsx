"use client";

import { useState, useRef } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const storyImages = [
	"/shared-image2.jpg",
	"/shared-image3.jpg",
	"/shared-image4.jpg",
];

export const PromoCode = ({ language }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const swiperRef = useRef(null);
	const SLIDE_DELAY = 3500;

	const featureCards = language === 'ar'
		? [
			{
				title: "عنوان الميزة",
				description: "هو نص نائب شائع يستخدم لإظهار العناصر الرسومية في مستند أو عرض مرئي.",
				icon: "/card-icon.png",
			},
			{
				title: "عنوان الميزة",
				description: "هو نص نائب شائع يستخدم لإظهار العناصر الرسومية في مستند أو عرض مرئي.",
				icon: "/card-icon.png",
			},
			{
				title: "عنوان الميزة",
				description: "هو نص نائب شائع يستخدم لإظهار العناصر الرسومية في مستند أو عرض مرئي.",
				icon: "/card-icon.png",
			},
		] : [
			{
				title: "Feature Title",
				description: "This is common placeholder text used to display graphic elements in a document or visual presentation.",
				icon: "/card-icon.png",
			},
			{
				title: "Feature Title",
				description: "This is common placeholder text used to display graphic elements in a document or visual presentation.",
				icon: "/card-icon.png",
			},
			{
				title: "Feature Title",
				description: "This is common placeholder text used to display graphic elements in a document or visual presentation.",
				icon: "/card-icon.png",
			},
		];

	return (
		<section className="w-full lg:h-screen overflow-hidden">
			<div className="w-full h-full px-4 sm:px-8 lg:px-6 py-8 lg:py-4">
				<div className="flex flex-col min-[922px]:flex-row gap-8 md:gap-10 lg:gap-6 items-center h-full">

					{/* Text and Cards */}
					<div className="features w-full md:flex-1">
						<h1 className="text-3xl sm:text-4xl lg:text-3xl font-bold leading-tight tracking-tight">
							{language === 'ar' ? 'ميزات الواقع المعزز' : 'Augmented Reality Features'}
						</h1>
						<p className="mt-6 md:mt-8 text-base sm:text-lg lg:text-sm">
							{language === 'ar' ? 'هو نص نائب شائع يستخدم لإظهار العناصر الرسومية في مستند أو عرض مرئي.' : 'This is common placeholder text used to display graphic elements in a document or visual presentation.'}
						</p>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-4 mt-12">
							{featureCards.map((card, index) => (
								<Card key={index} className="w-full">
									<CardHeader>
										<img
											src={card.icon}
											className="mb-4 w-[40px] h-[40px] lg:w-[32px] lg:h-[32px]"
											alt="Feature icon"
										/>
										<CardTitle className="text-2xl lg:text-lg font-bold">
											{card.title}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm lg:text-xs">
											{card.description}
										</p>
									</CardContent>
								</Card>
							))}

							<Card className="bg-[#1AC5BD] text-white w-full">
								<CardHeader className="flex flex-col justify-center items-center">
									<img
										src="/promo-icon.png"
										className="mb-4 w-[40px] h-[40px] lg:w-[32px] lg:h-[32px]"
										alt="Promo code icon"
									/>
									<CardTitle className="text-2xl lg:text-lg font-bold">
										{language === 'ar' ? 'الرمز الترويجي' : 'Promo Code'}
									</CardTitle>
								</CardHeader>
							</Card>
						</div>
					</div>

					{/* Swiper Section with Story-like Pagination */}
					<div className="w-[70%] sm:w-[40%] lg:w-[27%] flex-shrink-0 mx-auto">
						<Card className="w-full">
							{/* Custom top progress bars */}
							<div className="flex gap-1 p-2">
								{storyImages.map((_, index) => (
									<div
										key={index}
										className="h-1 bg-gray-300 rounded-full w-full overflow-hidden"
									>
										<div
											className={`h-full bg-[#1AC5BD] transition-all duration-200 ease-linear ${
												index === activeIndex
													? "w-full animate-story"
													: index < activeIndex
													? "w-full"
													: "w-0"
											}`}
											style={{
												animationDuration: `${SLIDE_DELAY}ms`,
											}}
										/>
									</div>
								))}
							</div>

							<CardContent className="p-0 flex justify-center w-full overflow-hidden">
								<Swiper
									key={language}
									spaceBetween={50}
									slidesPerView={1}
									loop={true}
									autoplay={{
										delay: SLIDE_DELAY,
										disableOnInteraction: false,
									}}
									onSlideChange={(swiper) =>
										setActiveIndex(swiper.realIndex)
									}
									onSwiper={(swiper) => (swiperRef.current = swiper)}
									modules={[Autoplay]}
									className="w-full h-full"
								>
									{storyImages.map((src, i) => (
										<SwiperSlide key={i}>
											<img
												src={src}
												alt={`Slide ${i + 1}`}
												className="w-full h-full object-contain"
											/>
										</SwiperSlide>
									))}
								</Swiper>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PromoCode;
