"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Trips() {
	const [language, setLanguage] = useState("en");
	const [activeIndex, setActiveIndex] = useState(2); // match initialSlide
	const swiperRef = useRef(null); // <-- keep swiper instance

	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || "en");
		}
	}, []);

	const t = {
		en: {
			title: "Enjoy Mzar's Exclusive Experiences",
			desc: "Hand-picked experiences crafted for your journey.",
			soon: "Soon...",
			details: "details",
			book: "Book Now",
			download: "Download app",
			discover: "Discover now",
			whatsApp: "Book your seat now",
			EnrichmentButton:"Start your journey now",
			TwoMosquesButton:"Your Holy Mosques tour awaits — book your seat now ",
			BusTourButton:"Explore Makkah and its history — book your tour today",

		},
		ar: {
			title: "استمتع بتجارب مزار المميزة",
			desc: "تجارب مختارة بعناية لتناسب رحلتك.",
			soon: "قريبًا...",
			details: "التفاصيل",
			book: "احجز الآن",
			download: "تحميل التطبيق",
			discover: "اكتشف الآن",
			whatsApp: "احجز مقعدك الآن",
			EnrichmentButton:"ابدأ رحلتك الآن",
			TwoMosquesButton:"جولة الحرم في انتظارك – احجز مقعدك فوراً ",
			BusTourButton:"استكشف مكة وتاريخها – احجز رحلتك",
		},
	};

	const L = language === "ar" ? t.ar : t.en;

	const trips = [
		{
			id: 1,
			img: "/Home/Enrichment-Trips.webp",
			rating: "4.93",
			title: {
				en: "Enrichment Trips",
				ar: "الرحلات الإثرائية",
			},
			blurb: {
				en: "Unique and diverse routes in Makkah and Madinah, combining spirituality, history, and culture.",
				ar: "مسارات متنوعة فريدة في مكة المكرمة والمدينة المنورة، تجمع بين الروحانية والتاريخ والثقافة.",
			},
			features: {
				en: [
					"A complete and meaningful experience",
					"Smart audio guide available in 6 languages ",
					"Comfortable transportation and professional organization",
					"Your journey... in your own way ",
				],
				ar: [
					"تجربة متكاملة وثرية ",
					"مرشد صوتي ذكي بـ6 لغات",
					"نقل مريح وتنظيم احترافي ",
					"رحلتك.. بطريقتك الخاصة ",
				],
			},
			buttonType: "enrichment",
		},
		{
			id: 2,
			img: "/Home/Mosques-Tours.webp",
			rating: "4.88",
			title: {
				en: "Two Holy Mosques Tours",
				ar: "جولات الحرمين الشريفين",
			},
			blurb: {
				en: "Exclusive tours inside the Grand Mosque and the Prophet’s Mosque to explore their historical landmarks and hear their stories.",
				ar: "جولات استثنائية حصرية داخل المسجد الحرام والمسجد النبوي، لاستكشاف المعالم التاريخية داخل الحرمين الشريفين والوقوف بجوارها ومشاهدتها وسماع حكاياتها التاريخية.",
			},
			features: {
				en: [
					"A journey through the holiest places on Earth",
					"Certified guides and an authentic experience",
					"6 languages, one voice that unites hearts",
					"Hospitality worthy of the sacred sites",
				],
				ar: [
					"رحلة داخل أطهر بقاع الأرض",
					"مرشد معتمد... وتجربة موثوقة",
					"6 لغات... لغة واحدة تجمع القلوب",
					"ضيافة تليق بقدسية المكان",
				],
			},
			buttonType: "TwoMosques",
		},
		{
			id: 3,
			img: "/Home/Tourist-Bus.webp",
			rating: "4.90",
			title: {
				en: "Tourist Bus",
				ar: "الباص السياحي",
			},
			blurb: {
				en: "Affordable introductory tours to visit the most prominent historical and enrichment landmarks of Makkah in an innovative knowledge experience.",
				ar: "جولات تعريفية بأسعار اقتصادية لزيارة أبرز معالم مكة التاريخية والإثرائية في تجربة معرفية مبتكرة.",
			},
			features: {
				en: [
					"One tour… a truly unforgettable experience.",
					"Stops that reflect history and enrich the present",
					"Smart guide in 6 languages",
					"Easy access and seamless travel",
				],
				ar: [
					"جولة واحدة... وتجربة لا تُنسى",
					"محطات تُحاكي التاريخ وتُثري الحاضر",
					"مرشد ذكي بـ 6 لغات ",
					"سهولة الوصول والانطلاق ",
				],
			},
			buttonType: "TouristBus",
		},
		
	];

	const renderButtons = (type) => {
		if (type === "enrichment") {
			return (
				<Link
					href="/#paths"
					
					className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--main-color)] text-white py-3 text-sm font-semibold  hover:text-gray-300 transition-colors text-center"
				>
					{L.EnrichmentButton}
				</Link>
			);
		}

		if (type === "TwoMosques") {
			return (
				<Link
					href="/tour"
					
					className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--main-color)] text-white px-2 py-3 text-sm font-semibold  hover:text-gray-300 transition-colors text-center"
				>
					{L.TwoMosquesButton}
				</Link>
			);
		}

		if (type === "TouristBus") {
			return (
				<Link
					href="/tour-bus"
					className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--main-color)] text-white px-2 py-3 text-sm font-semibold hover:text-gray-300 transition-colors text-center"
				>
					{L.BusTourButton}
				</Link>
			);
		}

		// if (type === "book") {
		// 	return (
		// 		<Link
		// 			href="#"
		// 			className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--main-color)] text-white py-3 text-sm font-semibold hover:bg-[var(--sec-color)] hover:text-black transition-colors"
		// 			onClick={(e) => e.preventDefault()}
		// 		>
		// 			{L.book}
		// 		</Link>
		// 	);
		// }
		// if (type === "path") {
		// 	return (
		// 		<Link
		// 			href="/#paths"
		// 			className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--main-color)] text-white py-3 text-sm font-semibold  hover:hover:text-gray-300 transition-colors"
		// 		>
		// 			{L.discover}
		// 		</Link>
		// 	);
		// }
		// if (type === "whatsApp") {
		// 	return (
		// 		<Link
		// 			href="https://wa.me/+966580121025"
		// 			target="_blank"
		// 			rel="noopener noreferrer"
		// 			className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--main-color)] text-white py-3 text-sm font-semibold  hover:text-gray-300 transition-colors"
		// 		>
		// 			{L.whatsApp}
		// 		</Link>
		// 	);
		// }
		// if (type === "download") {
		// 	return (
		// 		<Link
		// 			href="https://onelink.to/yb2xky"
		// 			target="_blank"
		// 			className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--main-color)] text-white py-3 text-sm font-semibold hover:text-gray-300 transition-colors"
		// 			rel="noopener noreferrer"
		// 		>
		// 			{L.download}
		// 		</Link>
		// 	);
		// }
		return (
			<div
				className={
					"flex items-center gap-3 " +
					(language === "ar" ? "flex-row-reverse" : "")
				}
			>
				<button
					type="button"
					className="flex-1 rounded-xl border border-[#2f4f3f]/40 text-[#2f4f3f] py-2.5 text-sm font-semibold bg-white/60"
				>
					{L.soon}
				</button>
				{/* <button
					type="button"
					className="flex-1 rounded-xl border-2 border-[#2f4f3f] text-[#2f4f3f] py-2.5 text-sm font-semibold bg-transparent hover:bg-[#2f4f3f] hover:text-white transition"
				>
					{L.details}
				</button> */}
			</div>
		);
	};

	useEffect(() => {
		const swiper = swiperRef.current;
		if (!swiper) return;

		const interval = setInterval(() => {
			const current = swiper.realIndex ?? swiper.activeIndex ?? 0;
			const next = (current + 1) % trips.length;
			swiper.slideTo(next, 600);
		}, 3500);

		return () => clearInterval(interval);
	}, [trips.length]);

	return (
		<section
			id="trips"
			className="container m-auto px-4 sm:px-6 lg:px-8 py-8"
			style={{ direction: language === "ar" ? "rtl" : "ltr" }}
		>
			{/* Title */}
			<div className="text-center mb-8">
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333]">
					{L.title}
				</h2>
			</div>

			{/* Cards */}
			<div className="w-full" dir="ltr">
				<Swiper
					modules={[Navigation, Pagination]}
					initialSlide={2}
					centeredSlides
					// centeredSlidesBounds: remove at top-level
					spaceBetween={25}
					slidesPerView={3.5}
					slidesPerGroup={1}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
						// Force-disable bounds in case it was set via params or breakpoints
						swiper.params.centeredSlidesBounds = false;
						swiper.update();
						swiper.slideTo(2, 0);
					}}
					onSlideChange={(swiper) => {
						setActiveIndex(swiper.realIndex);
					}}
					breakpoints={{
						1280: {
							slidesPerView: 3,
							spaceBetween: 25,
							centeredSlides: true,
							// centeredSlidesBounds: false,  // ensure NOT true
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 25,
							centeredSlides: true,
						},
						768: {
							slidesPerView: 3,
							spaceBetween: 20,
							centeredSlides: true,
						},
						640: {
							slidesPerView: 2,
							spaceBetween: 16,
							centeredSlides: true,
						},
						0: {
							slidesPerView: 1.2,
							spaceBetween: 16,
							centeredSlides: true,
						},
					}}
					className="trips-swiper overflow-visible"
				>
					{trips.map((trip, idx) => (
						<SwiperSlide
							key={trip.id}
							onClick={() => {
								// setActiveIndex(idx);
								swiperRef.current?.slideTo(idx, 500);
							}}
						>
							<article
								className={
									"flex flex-col justify-between rounded-3xl shadow-lg transition-all duration-300 ease-out " +
									(activeIndex === idx
										? "bg-[var(--sec-color)] scale-105"
										: "bg-white")
								}
								style={{ direction: language === "ar" ? "rtl" : "ltr" }}
							>
								{/* Image */}
								<div className="p-4">
									<div className="relative rounded-2xl overflow-hidden aspect-[1/1]">
										<Image
											src={trip.img}
											alt={`${
												language === "ar" ? trip.title.ar : trip.title.en
											} image`}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 300px, 320px"
										/>
										{/* <div className="absolute top-3 left-3 rounded-xl px-3 py-1 text-xs font-semibold text-white bg-[var(--main-color)]">
											{trip.rating}
										</div> */}
									</div>
								</div>

								{/* Content */}

								<h3 className="text-lg font-semibold text-[#333] mb-1 px-5">
									{language === "ar" ? trip.title.ar : trip.title.en}
								</h3>
								{/* <p className="text-sm text-gray-600 mb-3 px-5">
									{language === "ar" ? trip.blurb.ar : trip.blurb.en}
								</p> */}

								{/* Only show features if active */}
								{activeIndex === idx && (
									<div className="px-5">
										<ul className="mb-4 list-disc ps-5 text-sm text-[#333] space-y-1">
											{(language === "ar"
												? trip.features.ar
												: trip.features.en
											).map((f, i) => (
												<li key={i}>{f}</li>
											))}
										</ul>
									</div>
								)}
								<div className="px-5">{renderButtons(trip.buttonType)}</div>

								<div
									className="px-5 pb-5 "
									style={{ direction: language === "ar" ? "rtl" : "ltr" }}
								></div>
							</article>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
