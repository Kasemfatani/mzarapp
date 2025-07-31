"use client";
import React, { useEffect, useState } from "react";
import Flag from "react-world-flags";
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import Loading from "@/app/loading";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Riviews({ id }) {
	const [loading, setLoading] = useState(true); // State for loading indicator
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [language, setLanguage] = useState("en"); // Default language is 'en'

	useEffect(() => {
		setLoading(true);
		// --- HARDCODED REVIEWS FOR DEMO ---
        setLanguage(localStorage.getItem('lang'));
		const demoReviews = [
			{
				id: 1,
				title: "Amazing Experience",
				country_code: "SA",
				rating: 5,
				description:
					"The trip was fantastic and well organized. Highly recommended!",
			},
			{
				id: 2,
				title: "جيد جدا",
				country_code: "EG",
				rating: 4,
				description: "الرحلة كانت جميلة والتنظيم ممتاز. شكرا لكم!",
			},
			{
				id: 3,
				title: "Very good",
				country_code: "US",
				rating: 4,
				description: "Everything went smoothly. Will book again.",
			},
            {
				id: 4,
				title: "Very good",
				country_code: "US",
				rating: 4,
				description: "Everything went smoothly. Will book again.",
			},
            {
				id: 5,
				title: "Very good",
				country_code: "US",
				rating: 4,
				description: "Everything went smoothly. Will book again.",
			},
		];
		setTimeout(() => {
			setData(demoReviews);
			setLoading(false);
		}, 500);
		// --- END HARDCODED REVIEWS ---

		// Uncomment below for real API
		/*
        if (typeof window !== 'undefined') {
            setLanguage(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'),
            };
            axios.get(`${API_BASE_URL}/landing/home/packages/reviews?package_id=${id}`, { headers })
                .then(response => {
                    setData(response.data.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    console.error('Error fetching data:', error);
                    setLoading(false)
                });
        }
        */
	}, []); // Run this effect whenever the `language` changes

    console.log("language:", language);
    console.log("data:", data);

	return (
		<>
			{data.length > 0 ? (
				<div
					className="container m-auto"
					style={{ direction: `${language === "ar" ? "rtl" : "ltr"}` }}
				>
					<h4 className="t-title-review">
						{language === "en" ? "Reviews" : "التقييمات"}
					</h4>
					{loading ? (
						<Loading />
					) : (
						<div className="reviews-swiper w-full" style={{ direction: `ltr` }}>
							<Swiper
								dir={language === "ar" ? "rtl" : "ltr"}
								spaceBetween={32}
								slidesPerView={7.5}
								autoplay={true}
								loop={true}
								navigation={true}
								modules={[Autoplay, Navigation, Pagination]}
								breakpoints={{
									1400: { slidesPerView: 3 },
									1100: { slidesPerView: 3 },
									767: { slidesPerView: 2 },
									768: { slidesPerView: 2, autoplay: false, Navigation: false },
									640: {
										slidesPerView: 1.2,
										autoplay: false,
										spaceBetween: 16,
									},
									100: {
										slidesPerView: 1.2,
										autoplay: false,
										spaceBetween: 16,
									},
								}}
							>
								{data?.map((review) => (
									<SwiperSlide key={review.id}>
										<div className="review-cont">
											<div className="title">
												<h4>{review.title}</h4>
												<Flag code={review.country_code.toUpperCase()} />
											</div>
											<div className="stars">
												{[...Array(5)].map((star, index) => (
													<i
														key={index}
														className={`${
															review.rating > index ? "fa-solid" : "fa-regular"
														} fa-star ${review.rating > index ? "active" : ""}`}
													></i>
												))}
											</div>
											<p>{review.description}</p>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					)}
				</div>
			) : null}
		</>
	);
}
