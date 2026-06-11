"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./IncludedExperiences.module.css";

export default function IncludedExperiences({ isAr, data , mockData }) {
	const { t } = mockData;
	const experiences = data.included_experiences || [];
	return (
		<section className="overflow-hidden">
			<h2 className="mb-6 text-2xl font-semibold text-[#1b4332]">
				{t.includedExperiences}
			</h2>
			<Swiper
				modules={[Pagination]}
				pagination={{ clickable: true }}
				spaceBetween={16}
				breakpoints={{
					0: { slidesPerView: 1.1 },
					640: { slidesPerView: 1.4 },
					1024: { slidesPerView: 2.3 },
					1280: { slidesPerView: 3 },
				}}
				dir={isAr ? "rtl" : "ltr"}
				className={styles.IncludedExperiences}
			>
				{experiences.map((item) => (
					<SwiperSlide key={item.id} className="h-auto">
						<article className="h-full overflow-hidden rounded-xl bg-white shadow-[0_6px_24px_rgba(27,67,50,0.10)]">
							<img
								src={item.cover || "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1200&auto=format&fit=crop"}
								alt={item.name}
								className="h-48 w-full object-cover"
							/>
							<div className="p-5">
								<h3 className="mb-2 text-xl font-semibold text-[#1b4332]">
									{item.name}
								</h3>
								<p className="text-sm leading-6 text-[#414844]">
									{item.description}
								</p>
							</div>
						</article>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
