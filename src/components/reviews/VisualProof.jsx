"use client";

import { useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";

export function VisualProof({ isAr }) {
	const customerPhotos = [
		{
			id: "1",
			url: "https://images.unsplash.com/photo-1711336290921-1fd1eeadd569?w=600",
			caption: "جولة المعالم التاريخية - مكة المكرمة",
		},
		{
			id: "2",
			url: "https://images.unsplash.com/photo-1723512414375-45ff0ed80afd?w=600",
			caption: "تجربة روحانية في المسجد الحرام",
		},
		{
			id: "3",
			url: "https://images.unsplash.com/photo-1722990040470-53c0ec51ff7c?w=600",
			caption: "جولة التراث الإسلامي",
		},
		{
			id: "4",
			url: "https://images.unsplash.com/photo-1617182195886-21a605900f11?w=600",
			caption: "المسجد الحرام من الأعلى",
		},
		{
			id: "5",
			url: "https://images.unsplash.com/photo-1674313505558-206662f3de03?w=600",
			caption: "غار حراء وجبل النور",
		},
		{
			id: "6",
			url: "https://images.unsplash.com/photo-1759994976016-cd0799b2f480?w=600",
			caption: "جبل عرفة - رحلة روحانية",
		},
	];

	const swiperRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<section className="bg-[#f5f2ed] py-16 md:py-24">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-12 text-center">
					<h2 className="mb-3 text-3xl text-[#3C6652] md:text-4xl">
						صور من تجارب العملاء
					</h2>
					<p className="text-xl text-[#718096]">
						تجارب حقيقية مشاركة من زوّار مزار
					</p>
				</div>

				<div className="relative">
					<Swiper
						ref={swiperRef}
						modules={[Navigation, Pagination]}
						spaceBetween={24}
						slidesPerView={1}
						breakpoints={{
							768: {
								slidesPerView: 3,
							},
						}}
						loop={true}
						onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
						className="!pb-0"
					>
						{customerPhotos.map((photo) => (
							<SwiperSlide key={photo.id}>
								<div className="relative">
									<div className="group overflow-hidden rounded-2xl shadow-lg">
										<img
											src={photo.url}
											alt={photo.caption}
											className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
										<div className="absolute bottom-0 right-0 w-full p-6">
											<div className="mb-2 inline-block rounded-full bg-[#3C6652] px-3 py-1 text-sm text-white">
												تجربة فعلية – مزار
											</div>
											<p className="text-lg text-white">{photo.caption}</p>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Custom Navigation Buttons */}
					<button
						onClick={() => swiperRef.current?.swiper.slidePrev()}
						className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl transition-all hover:bg-[#3C6652] hover:text-white"
						aria-label="Previous"
					>
						<ChevronRight className="h-6 w-6" />
					</button>
					<button
						onClick={() => swiperRef.current?.swiper.slideNext()}
						className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl transition-all hover:bg-[#3C6652] hover:text-white"
						aria-label="Next"
					>
						<ChevronLeft className="h-6 w-6" />
					</button>
				</div>

				{/* Custom Dots Indicator */}
				<div className="mt-8 flex justify-center gap-2">
					{customerPhotos.map((_, i) => (
						<button
							key={i}
							onClick={() => swiperRef.current?.swiper.slideToLoop(i)}
							className={`h-3 w-3 rounded-full transition-all ${
								activeIndex === i
									? "w-8 bg-[#3C6652]"
									: "bg-[#e2e8f0] hover:bg-[#867957]"
							}`}
							aria-label={`Go to slide ${i + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
