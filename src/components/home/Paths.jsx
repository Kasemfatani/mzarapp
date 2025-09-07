"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Flag from "react-world-flags";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { API_BASE_URL } from "@/lib/apiConfig";
import img2 from "/public/conf/10.svg";
import makkahIcon from "/public/makkah-icon.png";
import madinahIcon from "/public/madinah-icon.png";

import Marquee from "../ui/marquee";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRef } from "react";

export default function Paths() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [language, setLanguage] = useState("en");
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [filters, setFilters] = useState([
		{ key: "all", label: "All", icon: null },
	]);
	const [swiper, setSwiper] = useState(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const searchParams = useSearchParams();

	useEffect(() => {
		// Fetch data once on mount (unchanged)
		setLoading(true);
		if (typeof window !== "undefined") {
			const lang = localStorage.getItem("lang") || "en";
			setLanguage(lang);
			const headers = { lang };

			// Fetch filters (cities)
			axios
				.get(`${API_BASE_URL}/landing/home/cities`, { headers })
				.then((response) => {
					const cityFilters = response.data.map((city) => ({
						key: city.id,
						label: city.name,
						icon:
							city.name.includes("مكة") ||
							city.name.toLowerCase().includes("makkah") ? (
								<Image
									src={makkahIcon}
									alt="Makkah"
									width={18}
									height={18}
									className="pb-[6px]"
									style={{ display: "inline-block" }}
									priority
								/>
							) : city.name.includes("مدينة") ||
							  city.name.toLowerCase().includes("madinah") ? (
								<Image
									src={madinahIcon}
									alt="Madinah"
									width={18}
									height={18}
									className="pb-[6px]"
									style={{ display: "inline-block" }}
									priority
								/>
							) : null,
					}));
					setFilters([
						{
							key: "all",
							label: lang === "ar" ? "الكل" : "All",
							icon: null,
						},
						...cityFilters,
					]);
				})
				.catch((error) => {
					console.error("Error fetching filters:", error);
				});

			// Fetch packages
			axios
				.get(`${API_BASE_URL}/landing/home/packages`, { headers })
				.then((response) => {
					setData(response.data);
					setLoading(false);
				})
				.catch((error) => {
					setError(error);
					console.error("Error fetching data:", error);
					setLoading(false);
				});
		}
	}, []);

	// New effect: apply filter whenever search params change
	useEffect(() => {
		if (!searchParams) return;
		const qf = searchParams.get("filter");
		if (qf) {
			setSelectedFilter(Number(qf));
			// optionally scroll into view if you want Paths to auto-scroll on URL change:
			// const el = document.getElementById("paths");
			// if (el) el.scrollIntoView({ behavior: "smooth" });
		}
		// if no filter param, you may want to reset to "all":
		// else setSelectedFilter("all");
	}, [searchParams]);

	const ReviewCard = ({ cover, name }) => {
		return (
			<figure className={cn()}>
				<div className="small-swiper-img-name">
					<div className="samll-img-cont">
						<Image src={cover} alt={`path image`} width={100} height={100}  priority/>
					</div>
					<h6> {name} </h6>
				</div>
			</figure>
		);
	};
	const filteredPackages =
		selectedFilter === "all"
			? data?.data.packages
			: data?.data.packages.filter(
					(path) => path.city_id === Number(selectedFilter)
			  );
	console.log("Filtered packages:", filteredPackages);

	return (
		<div
			className="paths container m-auto"
			id="paths"
			style={{ direction: `${language === "ar" ? "rtl" : "ltr"}` }}
		>
			<div className="title">
				<h2>{data?.data.title}</h2>
				<p>{data?.data.description}</p>
			</div>
			<div className="path-buttons flex gap-2 px-10 py-4 bg-white rounded-full overflow-x-auto shadow-2xl w-full">
				{filters.map((filter, idx) => (
					<Button
						key={filter.key}
						variant={selectedFilter === filter.key ? "default" : "outline"}
						className={cn(
							"flex items-center gap-2 rounded-full px-6 justify-center w-full",
							selectedFilter === filter.key &&
								"bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)]"
						)}
						style={{ flex: 1 }} // Each button gets equal width
						onClick={() => setSelectedFilter(filter.key)}
					>
						{filter.icon}
						{filter.label}
					</Button>
				))}
			</div>
			<div className="path-swiper w-full" style={{ direction: `ltr` }}>
				<Swiper
					dir={"rtl"}
					// cssMode={language === 'ar'} // Important for RTL support
					spaceBetween={32}
					slidesPerView={7.5}
					autoplay={true}
					loop={true}
					pagination={false}
					navigation={false}
					onSwiper={setSwiper}
					onSlideChange={(s) => setActiveIndex(s.realIndex)}
					modules={[Autoplay, Navigation, Pagination]}
					breakpoints={{
						1400: {
							slidesPerView: 3,
						},
						1100: {
							slidesPerView: 3,
						},
						767: {
							slidesPerView: 2,
						},
						768: {
							slidesPerView: 2,
							autoplay: false,
						},
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
					{filteredPackages?.map((path) => {
						// Find the city label by matching city_id with filters (skip "all")
						const city = filters.find(
							(f) => f.key !== "all" && Number(f.key) === path.city_id
						);
						return (
							<SwiperSlide key={path.id}>
								<div className="path-card">
									<div className="img-cont">
										<div className="overlay">
											{/* <div className="auth">
                                            <h4>{language === 'en' ? 'Autorized by' : 'معتمد من'} </h4>
                                            <Image src={img2} alt="Mazar" width={100} height={100} />
                                        </div> */}
											{path.most_ordered ? (
												<div className="most-ordered">
													{language === "en" ? "Most Ordered" : "الاكثر طلبا"}{" "}
												</div>
											) : null}
										</div>
										<Image
											src={path.cover}
											alt={`${path.name} image`}
											className="path-img"
											width={300}
											height={300}
											priority
										/>
									</div>
									{/* City name */}
									{city && (
										<div
											className="city-label text-xs text-gray-500 mb-1 flex items-center gap-1"
											style={{
												direction: `${language === "ar" ? "rtl" : "ltr"}`,
											}}
										>
											{/* Use city.icon if available, otherwise a default location icon */}
											{city.icon ? (
												city.icon
											) : (
												<span role="img" aria-label="location">
													📍
												</span>
											)}
											{city.label}
										</div>
									)}
									<h3 className={`${language === "ar" ? "rtl" : "ltr"}`}>
										{path.name}{" "}
									</h3>
									<div
										className="path-duration"
										style={{
											direction: `${language === "ar" ? "rtl" : "ltr"}`,
										}}
									>
										{language === "en" ? "Duration" : "مدة الرحلة"} :{" "}
										{path.duration}
									</div>
									<p className={`${language === "ar" ? "rtl" : "ltr"}`}>
										{path.short_description}
									</p>
									<div className="small-imgs-slider w-full" dir="ltr">
										<Marquee reverse pauseOnHover className="[--duration:20s]">
											{path.locations.map((review, index) => (
												<ReviewCard key={index} {...review} />
											))}
										</Marquee>
									</div>
									<Link
										scroll={false}
										href={`/path?id=${path.id}`}
										className="view-detials"
									>
										{language === "en" ? "View Details" : "عرض التفاصيل"}{" "}
									</Link>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
				{(() => {
					// Get current slidesPerView based on window width
					let slidesPerView = 7.5;
					if (typeof window !== "undefined") {
						const width = window.innerWidth;
						if (width >= 1400) slidesPerView = 3;
						else if (width >= 1100) slidesPerView = 3;
						else if (width >= 768) slidesPerView = 2;
						else if (width >= 640) slidesPerView = 1.2;
						else slidesPerView = 1.2;
					}
					return filteredPackages?.length > slidesPerView ? (
						<div className="custom-swiper-controls">
							<button
								className="custom-prev"
								onClick={() => swiper && swiper.slidePrev()}
								disabled={!swiper}
							>
								&lt;
							</button>
							{filteredPackages?.map((_, idx) => (
								<button
									key={idx}
									className={`custom-bullet ${
										activeIndex === idx ? "active" : ""
									}`}
									onClick={() =>
										swiper && swiper.slideToLoop
											? swiper.slideToLoop(idx)
											: swiper.slideTo(idx)
									}
									disabled={!swiper}
								/>
							))}
							<button
								className="custom-next"
								onClick={() => swiper && swiper.slideNext()}
								disabled={!swiper}
							>
								{" "}
								&gt;
							</button>
						</div>
					) : null;
				})()}
			</div>
		</div>
	);
}
