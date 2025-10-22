"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Trips() {
	const [language, setLanguage] = useState("en");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || "en");
		}
	}, []);

	const t = {
		en: {
			title: "Enjoy the Mazar experience through five distinctive trips",
			desc: "Hand-picked experiences crafted for your journey.",
			soon: "Soon...",
			details: "details",
			book: "Book Now",
			download: "Download app",
			discover: "Discover now",
			whatsApp: "Book your seat now",
		},
		ar: {
			title: "استمتع بتجربة مزار عبر خمس رحلات مميزة",
			desc: "تجارب مختارة بعناية لتناسب رحلتك.",
			soon: "قريبًا...",
			details: "التفاصيل",
			book: "احجز الآن",
			download: "تحميل التطبيق",
			discover: "اكتشف الآن",
			whatsApp: "احجز مقعدك الآن",
		},
	};

	const L = language === "ar" ? t.ar : t.en;

	const trips = [
		{
			id: 1,
			img: "/gallery/1.png",
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
					"Documented historical and Islamic destinations.",
					"Tech audio guide in 6 world languages.",
					"Rich experience with modern information and technologies.",
					"Safe and comfortable transport between landmarks.",
				],
				ar: [
					"وجهات تاريخية وإسلامية موثّقة.",
					"دليل صوتي تقني بـ6 لغات عالمية.",
					"تجربة غنية بالمعلومات والتقنيات الحديثة.",
					"تنقل آمن ومريح بين المعالم.",
				],
			},
			buttonType: "path",
		},
		{
			id: 2,
			img: "/gallery/6.png",
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
					"Certified tour guides.",
					"Instant translation in 6 languages.",
					"Saudi hospitality.",
					"Symbolic gifts.",
				],
				ar: [
					"مرشدون سياحيون معتمدون.",
					"ترجمة فورية بـ6 لغات.",
					"ضيافة سعودية.",
					"هدايا رمزية.",
				],
			},
			buttonType: "whatsApp",
		},
		{
			id: 3,
			img: "/gallery/9.png",
			rating: "4.93",
			title: {
				en: "Landmarks on the Way",
				ar: "معالم في الطريق",
			},
			blurb: {
				en: "A unique initiative turning public transport into a complete tourism experience integrated with the Mzar app.",
				ar: "مبادرة نوعية تُحوّل وسائل النقل العامة إلى تجربة سياحية متكاملة بالتكامل مع تطبيق مزار.",
			},
			features: {
				en: [
					"Listen to stories of historical sites as you pass by.",
					"Interactive technologies connecting past and present.",
					"Immersive experience blending physical and spiritual journeys.",
				],
				ar: [
					"استمع لقصص المواقع التاريخية أثناء مرورك.",
					"تقنيات تفاعلية تربط الماضي بالحاضر.",
					"تجربة غامرة تمزج بين الرحلة الجسدية والروحانية.",
				],
			},
			buttonType: "download",
		},
		{
			id: 4,
			img: "/gallery/10.png",
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
					"Multiple gathering points in Makkah.",
					"Stops at key historical and cultural sites.",
					"Audio guide via Mzar app in several languages.",
					"Ideal experience for families and groups.",
				],
				ar: [
					"نقاط تجمع متعددة داخل مكة.",
					"توقفات عند أهم المواقع التاريخية والثقافية.",
					"مرشد صوتي عبر تطبيق مزار بعدة لغات.",
					"تجربة مثالية للعائلات والمجموعات.",
				],
			},
			buttonType: "soonDetails",
		},
		{
			id: 5,
			img: "/gallery/11.png",
			rating: "4.86",
			title: {
				en: "Historic Makkah Story via Augmented Reality",
				ar: "حكاية مكة التاريخية عبر الواقع المعزز",
			},
			blurb: {
				en: "An innovative digital experience that brings Makkah’s history to life before your eyes from the Clock Tower balcony using augmented reality.",
				ar: "تجربة رقمية مبتكرة تُعيد الحياة إلى تاريخ مكة أمام عينيك، بالوقوف من على شرفة برج الساعة للاطلاع على حكايات مكة التاريخية عبر الواقع المعزز.",
			},
			features: {
				en: [
					"Discover sites as they were in the past with AR technology.",
					"Live visual and audio interaction in an impactful experience.",
					"Suitable for all ages and offers a unique educational journey.",
				],
				ar: [
					"اكتشف المواقع كما كانت في الماضي عبر تقنيات الواقع المعزز (AR).",
					"عِش التفاعل البصري والسمعي في تجربة واقعية مؤثرة.",
					"مناسبة للكبار والصغار وتقدم تجربة تعليمية فريدة.",
				],
			},
			buttonType: "soonDetails",
		},
	];

	const renderButtons = (type) => {
		if (type === "book") {
			return (
				<Link
					href="#"
					className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--main-color)] text-white py-3 text-sm font-semibold hover:bg-[var(--sec-color)] hover:text-black transition-colors"
					onClick={(e) => e.preventDefault()}
				>
					{L.book}
				</Link>
			);
		}
		if (type === "path") {
			return (
				<Link
					href="/#paths"
					className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--main-color)] text-white py-3 text-sm font-semibold  hover:hover:text-gray-300 transition-colors"
					
				>
					{L.discover}
				</Link>
			);
		}
		if (type === "whatsApp") {
			return (
				<Link
					href="https://wa.me/+966580121025"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--main-color)] text-white py-3 text-sm font-semibold  hover:text-gray-300 transition-colors"
					
				>
					{L.whatsApp}
				</Link>
			);
		}
		if (type === "download") {
			return (
				<Link
					href="https://onelink.to/yb2xky"
					target="_blank"
					className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--main-color)] text-white py-3 text-sm font-semibold hover:text-gray-300 transition-colors"
					rel="noopener noreferrer"
				>
					{L.download}
				</Link>
			);
		}
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
					modules={[Autoplay, Navigation, Pagination]}
					initialSlide={2}
					centeredSlides
					loop
					autoplay={{ delay: 3500, disableOnInteraction: false }}
					spaceBetween={25}
					slidesPerView={3.5}
					breakpoints={{
						1280: {
							slidesPerView: 3.5,
							spaceBetween: 25,
							centeredSlides: false,
						},
						1024: {
							slidesPerView: 3.5,
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
						<SwiperSlide key={trip.id}>
							<article
								className="h-[600px] md:h-[670px] flex flex-col justify-between
 rounded-3xl shadow-lg transition-all duration-300 ease-out bg-white
    hover:bg-[var(--sec-color)] hover:scale-105
  " 
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
										<div className="absolute top-3 left-3 rounded-xl px-3 py-1 text-xs font-semibold text-white bg-[var(--main-color)]">
											{trip.rating}
										</div>
									</div>
								</div>

								{/* Content */}

								<h3 className="text-lg font-semibold text-[#333] mb-1 px-5">
										{language === "ar" ? trip.title.ar : trip.title.en}
									</h3>
									<p className="text-sm text-gray-600 mb-3 px-5">
										{language === "ar" ? trip.blurb.ar : trip.blurb.en}
									</p>
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
									<div className="px-5">
										{renderButtons(trip.buttonType)}
									</div>
									

									
								<div
									className="px-5 pb-5 "
									style={{ direction: language === "ar" ? "rtl" : "ltr" }}
								>
									
								</div>
							</article>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
