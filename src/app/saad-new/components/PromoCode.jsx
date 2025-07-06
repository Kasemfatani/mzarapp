"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const storyImages = [
	"/Phone-1.png",
	"/Phone-2.png",
	"/Phone-3.png",
];

export const PromoCode = ({ language }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const swiperRef = useRef(null);
	const SLIDE_DELAY = 3500;

	const featureCards =
		language === "ar"
			? [
					{
						title: "رحلة قصصية عبر التاريخ المكي ",
						description:
							"انغمس في قصص الأماكن المقدسة من نافذتك، بتقنيات عرض تفاعلية تمزج بين الماضي والحاضر.",
						icon: "/card-icon.png",
					},
					{
						title: "استكشاف المواقع التاريخية بتقنية الواقع المعزز ",
						description:
							"شاهد المواقع كما كانت عليه قديماً، وتعرّف على أسرارها بطريقة إبداعية ومشوقة. ",
						icon: "/card-icon.png",
					},
					{
						title: "محتوى نصي وصوتي بـ 6 لغات",
						description:
							"استمع أو اقرأ القصص باللغات العالمية، لتجربة تلائم الزوار من جميع الخلفيات. ",
						icon: "/card-icon.png",
					},
					{
						title: "سهولة الاستخدام دون مغادرة موقعك",
						description:
							"من غرفتك، أو طاولتك، تبدأ رحلتك الروحانية بثوانٍ فقط. ",
						icon: "/card-icon.png",
					},
			  ]
			: [
					{
						title: "A Storytelling Journey Through Makkah's History",
						description:
							"Dive into the stories of the sacred sites from your window, with interactive displays that blend the past and the present.",
						icon: "/card-icon.png",
					},
					{
						title: "Explore Historic Landmarks with Augmented Reality",
						description:
							"See the sites as they once were, and uncover their secrets in a creative and engaging way.",
						icon: "/card-icon.png",
					},
					{
						title: "Audio and Text Content in 6 Languages",
						description:
							"Listen to or read the stories in multiple world languages, offering an experience tailored to visitors from diverse backgrounds. ",
						icon: "/card-icon.png",
					},
					{
						title: "Easy to Use Without Leaving Your Location",
						description:
							"Start your spiritual journey in seconds—from your room, your desk, or anywhere you are. ",
						icon: "/card-icon.png",
					},
			  ];

	return (
		<section className="w-full min-[1025px]:h-screen overflow-hidden">
			<div className="w-full h-full px-4 sm:px-8 lg:px-6 py-8 lg:py-4">
				<div className="flex flex-col min-[922px]:flex-row gap-8 md:gap-10 lg:gap-6 items-center h-full">
					{/* Text and Cards */}
					<div className="features w-full  lg:w-[55%]">
						<h1 className="text-4xl sm:text-5xl lg:text-4xl font-bold leading-tight tracking-tight">
							{language === "ar"
								? "ميزات الواقع المعزز : "
								: "Augmented Reality Features :"}
						</h1>
						{/* <p className="mt-6 md:mt-6 text-lg sm:text-xl lg:text-base">
							{language === "ar"
								? "هو نص نائب شائع يستخدم لإظهار العناصر الرسومية في مستند أو عرض مرئي."
								: "This is common placeholder text used to display graphic elements in a document or visual presentation."}
						</p> */}

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-4 mt-8">
							{featureCards.map((card, index) => (
								<Card key={index} className="w-full">
									<CardHeader className="lg:px-6 lg:py-3">
										<img
											src={card.icon}
											className="mb-3 w-[40px] h-[40px] lg:w-[32px] lg:h-[32px]"
											alt="Feature icon"
										/>
										<CardTitle className="text-3xl lg:text-2xl font-bold">
											{card.title}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-base leading-tight tracking-tight">
											{card.description}
										</p>
									</CardContent>
								</Card>
							))}

							<Card className="bg-[#1AC5BD] text-white w-full shadow-lg overflow-hidden">
								{/* Overlay with blur and dark tint */}
								{/* <div className="absolute inset-0 bg-black bg-opacity-45 backdrop-blur-[1px] z-0"></div> */}

								{/* Content wrapper */}
								<div className="relative z-10">
									<CardHeader className="lg:px-6 lg:py-3">
										{/* <img
											src="/promo-icon.png"
											className="mb-4 w-[40px] h-[40px] lg:w-[32px] lg:h-[32px]"
											alt="Promo code icon"
										/> */}
										<CardTitle className="text-center text-xl leading-tight tracking-tight">
										{language === "ar"
												? "يمكنك الاستفادة من الرمز الترويجي التالي: "
												: "You can use the following promo code:"} 
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-center text-3xl  font-bold">
											SJQ
										</p>
										
									</CardContent>
								</div>
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
										className="h-1 bg-gray-300 rounded-full w-full overflow-hidden">
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
									onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
									onSwiper={(swiper) => (swiperRef.current = swiper)}
									modules={[Autoplay]}
									className="w-full h-full">
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
