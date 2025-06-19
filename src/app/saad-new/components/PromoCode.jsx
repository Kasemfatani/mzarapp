"use client"

import {
	Card,
	CardContent,
	CardDescription,
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
		<section className="w-full overflow-hidden ">
		
			<div className="w-full px-4 sm:px-8 lg:px-[66px] py-8 lg:py-[57px]">
				
				<div className="flex flex-col min-[922px]:flex-row gap-8 md:gap-12 lg:gap-16 items-start">
					
					<div className="features w-full md:flex-1">
						<h1
							className="text-3xl sm:text-4xl lg:text-5xl text-wrap font-bold leading-tight sm:leading-tight lg:leading-normal tracking-tight"
						>
							ميزات الواقع المعزز
						</h1>
						<p className="mt-6 md:mt-8 text-base sm:text-lg">
							هو نص نائب شائع يستخدم لإظهار العناصر الرسومية في مستند أو عرض
							مرئي.
						</p>
						<br />
						<br />
						<br />

						
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<Card className="w-full">
								<CardHeader>
									<img
										src="/card-icon.png"
										className="mb-4"
										alt=""
										width={60}
										height={60}
									/>
									<CardTitle className="text-2xl font-bold">
										{" "}
										عنوان الميزة
									</CardTitle>
								</CardHeader>
								<CardContent className="steps img">
									<p>
										هو نص نائب شائع يستخدم لإظهار العناصر الرسومية في مستند أو
										عرض مرئي.
									</p>
								</CardContent>
							</Card>
							<Card className="w-full">
								<CardHeader>
									<img
										src="/card-icon.png"
										className="mb-4"
										alt=""
										width={60}
										height={60}
									/>
									<CardTitle className="text-2xl font-bold">
										{" "}
										عنوان الميزة
									</CardTitle>
								</CardHeader>
								<CardContent className="steps img">
									<p>
										هو نص نائب شائع يستخدم لإظهار العناصر الرسومية في مستند أو
										عرض مرئي.
									</p>
								</CardContent>
							</Card>
							
							<Card className="w-full">
								<CardHeader>
									<img
										src="/card-icon.png"
										className="mb-4"
										alt=""
										width={60}
										height={60}
									/>
									<CardTitle className="text-2xl font-bold">
										{" "}
										عنوان الميزة
									</CardTitle>
								</CardHeader>
								<CardContent className="steps img">
									<p>
										هو نص نائب شائع يستخدم لإظهار العناصر الرسومية في مستند أو
										عرض مرئي.
									</p>
								</CardContent>
							</Card>
							
							<Card className="bg-[#1AC5BD] text-white w-full">
								<CardHeader className="flex flex-col justify-center items-center">
									<img
										src="/promo-icon.png"
										className="mb-4"
										alt=""
										width={60}
										height={60}
									/>
									<CardTitle className="text-2xl font-bold">
										{" "}
										 الرمز الترويجي
									</CardTitle>
								</CardHeader>
								
							</Card>
						</div>
					</div>
					
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
				</div>
			</div>
		</section>
	);
};

export default PromoCode;
