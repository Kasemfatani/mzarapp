"use client"

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const PromoCode = () => {
	return (
		<section className="w-full lg:h-screen overflow-hidden">
			<div className="w-full h-full px-4 sm:px-8 lg:px-6 py-8 lg:py-4">
				<div className="flex flex-col min-[922px]:flex-row gap-8 md:gap-10 lg:gap-6 items-center h-full">
					
					{/* Text and Cards */}
					<div className="features w-full md:flex-1">
						<h1 className="text-3xl sm:text-4xl lg:text-3xl font-bold leading-tight tracking-tight">
							ميزات الواقع المعزز
						</h1>
						<p className="mt-6 md:mt-8 text-base sm:text-lg lg:text-sm">
							هو نص نائب شائع يستخدم لإظهار العناصر الرسومية في مستند أو عرض مرئي.
						</p>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-4 mt-12">
							{/* Feature Card */}
							<Card className="w-full">
								<CardHeader>
									<img
										src="/card-icon.png"
										className="mb-4 w-[40px] h-[40px] lg:w-[32px] lg:h-[32px]"
										alt=""
									/>
									<CardTitle className="text-2xl lg:text-lg font-bold">
										عنوان الميزة
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm lg:text-xs">
										هو نص نائب شائع يستخدم لإظهار العناصر الرسومية في مستند أو عرض مرئي.
									</p>
								</CardContent>
							</Card>

							<Card className="w-full">
								<CardHeader>
									<img
										src="/card-icon.png"
										className="mb-4 w-[40px] h-[40px] lg:w-[32px] lg:h-[32px]"
										alt=""
									/>
									<CardTitle className="text-2xl lg:text-lg font-bold">
										عنوان الميزة
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm lg:text-xs">
										هو نص نائب شائع يستخدم لإظهار العناصر الرسومية في مستند أو عرض مرئي.
									</p>
								</CardContent>
							</Card>

							<Card className="w-full">
								<CardHeader>
									<img
										src="/card-icon.png"
										className="mb-4 w-[40px] h-[40px] lg:w-[32px] lg:h-[32px]"
										alt=""
									/>
									<CardTitle className="text-2xl lg:text-lg font-bold">
										عنوان الميزة
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm lg:text-xs">
										هو نص نائب شائع يستخدم لإظهار العناصر الرسومية في مستند أو عرض مرئي.
									</p>
								</CardContent>
							</Card>

							<Card className="bg-[#1AC5BD] text-white w-full">
								<CardHeader className="flex flex-col justify-center items-center">
									<img
										src="/promo-icon.png"
										className="mb-4 w-[40px] h-[40px] lg:w-[32px] lg:h-[32px]"
										alt=""
									/>
									<CardTitle className="text-2xl lg:text-lg font-bold">
										الرمز الترويجي
									</CardTitle>
								</CardHeader>
							</Card>
						</div>
					</div>

					{/* Swiper Section */}
					<div className="w-[70%] sm:w-[40%] lg:w-[27%] flex-shrink-0 mx-auto ">
						<Card className="w-full">
							<CardContent className="p-0 flex justify-center w-full overflow-hidden">
								<Swiper
									spaceBetween={50}
									slidesPerView={1}
									loop={true}
									autoplay={{
										delay: 3500,
										disableOnInteraction: false,
									}}
									pagination={{
										clickable: true,
									}}
									modules={[Autoplay, Pagination, Navigation]}
									className="w-full h-full"
								>
									<SwiperSlide>
										<img
											src="/shared-image2.jpg"
											alt="Step 1"
											className="w-full h-full object-contain "
										/>
									</SwiperSlide>
									<SwiperSlide>
										<img
											src="/shared-image3.jpg"
											alt="Step 2"
											className="w-full h-full object-contain "
										/>
									</SwiperSlide>
									<SwiperSlide>
										<img
											src="/shared-image4.jpg"
											alt="Step 3"
											className="w-full h-full object-contain "
										/>
									</SwiperSlide>
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




<div className="steps img w-[70%] sm:w-[40%]  flex-shrink-0 mx-auto"> 
						<Card className="w-full"> 
							<CardContent className="steps-img p-0 flex justify-center w-full overflow-hidden">
								<Swiper
									spaceBetween={50} 
									slidesPerView={1}
									loop={true} 
									autoplay={{
										delay: 3500, 
										disableOnInteraction: false, 
									}}
									pagination={{
										clickable: true,
									}}
									// navigation={true} 
									modules={[Autoplay, Pagination, Navigation]}
									className="w-full h-full" 
								>
									<SwiperSlide>
										<img src="/shared-image2.jpg" alt="Step 1" className="w-full h-full object-cover" />
									</SwiperSlide>
									<SwiperSlide>
										<img src="/shared-image3.jpg" alt="Step 2" className="w-full h-full object-cover" />
									</SwiperSlide>
									<SwiperSlide>
										<img src="/shared-image4.jpg" alt="Step 3" className="w-full h-full object-cover" />
									</SwiperSlide>
									
								</Swiper>
							</CardContent>
						</Card>
					</div>