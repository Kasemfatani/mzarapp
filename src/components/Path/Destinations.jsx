"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import img1 from "/public/bg.webp";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import Why from "@/components/home/Why";
import AudioPreviewDialog from "@/components/Path/AudioPreviewDialog";

export default function Destinations({ data, lang }) {
	const [language, setLanguage] = useState(lang || "en");
	const swiperRef = useRef(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || lang || "en");
		}
	}, [lang]);

	const destinations = data.locations || [];
	const t =
		language === "ar"
			? { title: "الوجهات", prev: "السابق", next: "التالي" }
			: { title: "Destinations", prev: "Prev", next: "Next" };

			console.log('short_audio ', data.short_audio.ar);

	return (
		<div className="destinations container m-auto">
			{/* Header: title left, nav right */}
			<div
				className="flex items-center justify-between gap-4 mb-2"
				style={{ direction: language === "ar" ? "rtl" : "ltr" }}
			>
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333]">
					{t.title}
				</h2>
				<div className="flex items-center gap-3">
					<button
						type="button"
						aria-label={t.prev}
						onClick={() => swiperRef.current?.slidePrev()}
						className="w-16 md:w-10 h-10 rounded-full border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100"
					>
						{language === "ar" ? "‹" : "‹"}
					</button>
					<button
						type="button"
						aria-label={t.next}
						onClick={() => swiperRef.current?.slideNext()}
						className="w-16 md:w-10 h-10 rounded-full border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100"
					>
						{language === "ar" ? "›" : "›"}
					</button>
				</div>
			</div>

			{/* Slider */}
			<Swiper
				modules={[Pagination]}
				onSwiper={(s) => (swiperRef.current = s)}
				slidesPerView={4}
				spaceBetween={18}
				loop={false}
				breakpoints={{
					1280: { slidesPerView: 4, spaceBetween: 18 },
					1024: { slidesPerView: 3, spaceBetween: 20 },
					768: { slidesPerView: 2, spaceBetween: 16 },
					0: { slidesPerView: 1, spaceBetween: 12 },
				}}
				className="destinations-swiper"
				style={{ direction: language === "ar" ? "rtl" : "ltr" }}
			>
				{destinations.map((item) => (
					<SwiperSlide key={item.id}>
						<article className="rounded-[20px] bg-white shadow-2xl overflow-hidden h-[410px] flex flex-col">
							{/* Image */}
							<div className="relative h-48 w-full">
								<Image
									src={item.cover}
									alt={`${data.name} image`}
									fill
									className="object-cover"
									sizes="(max-width: 1280px) 50vw, 25vw"
								/>
							</div>

							{/* Text */}
							<div className="p-5 flex flex-col gap-2 flex-1">
								<h3 className="text-lg md:text-xl font-semibold text-[#141414]">
									{item.name}
								</h3>
								<p className="text-sm text-gray-600 leading-6 line-clamp-5">
									{item.short_description}
								</p>
								{/* Spacer to keep buttons aligned if needed */}
								<div className="mt-auto" />
							</div>
						</article>
					</SwiperSlide>
				))}
			</Swiper>

			{/* New banner  */}
			<div
				className="ready-cont relative overflow-hidden rounded-[30px]"
				style={{ backgroundImage: `url(${img1.src})` }}
			>
				{/* Color overlay to show bg image slightly */}
				<div className="absolute inset-0 bg-[#857856]/80" aria-hidden="true" />

				<div className="relative px-4 sm:px-8 py-10 md:py-16 text-center flex flex-col items-center gap-6">
					{/* Headings */}
					<div className="space-y-2">
						<h2 className="text-3xl md:text-5xl font-semibold text-[#E7D3AF] drop-shadow-sm">
							{language === "ar" ? "دليل مزَار الصوتي" : "Mzar Audio Guide"}
						</h2>
						<p className="text-xl md:text-3xl font-semibold text-[#F8F2E7]">
							{language === "ar"
								? "استمع إلى التاريخ بلغتك"
								: "Listen to History Told in Your Language"}
						</p>
					</div>

					{/* Sub text */}
					<p className="max-w-3xl text-base md:text-lg font-medium text-[#FFF8]">
						{language === "ar"
							? "رفيقك الذكي طوال الرحلة، يشارك القصص النبوية والروايات التاريخية بلغتك المفضلة."
							: "Your smart companion throughout the journey, sharing prophetic stories and historical insights in your language."}
					</p>

					{/* Language pills */}
					<div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
						{[
							{ labelEn: "Arabic", labelAr: "العربية", c: "bg-[#8B1C2E]" },
							{ labelEn: "English", labelAr: "الإنجليزية", c: "bg-[#0F6D5C]" },
							{ labelEn: "French", labelAr: "الفرنسية", c: "bg-[#8B1C2E]" },
							{ labelEn: "Turkish", labelAr: "التركية", c: "bg-[#0F6D5C]" },
							{ labelEn: "Urdu", labelAr: "الأردية", c: "bg-[#8B1C2E]" },
							{ labelEn: "Malay", labelAr: "الماليزية", c: "bg-[#0F6D5C]" },
						].map((x, i) => (
							<span
								key={i}
								className={`${x.c} text-white/95 px-4 py-1 rounded-full text-sm md:text-base font-semibold`}
							>
								{language === "ar" ? x.labelAr : x.labelEn}
							</span>
						))}
					</div>

					{/* Features row */}
					<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mt-2 w-full">
						<div className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 text-white">
							<div className="w-16 md:w-10 h-10 rounded-lg bg-[#A03D3D] flex items-center justify-center -ms-6 md:-ms-7">
								<i className="fa-solid fa-language text-white" />
							</div>
							<div className="">
								<p className="text-sm md:text-base font-semibold  md:text-start">
									{language === "ar" ? "محتوى بـ" : "Content in"} 6{" "}
									{language === "ar" ? "لغات" : "Languages"}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 text-white">
							<div className="w-16 md:w-10 h-10 rounded-lg bg-[#0F6D5C] flex items-center justify-center -ms-6 md:-ms-7">
								<i className="fa-solid fa-car text-white" />
							</div>
							<div className="">
								<p className="text-sm md:text-base font-semibold">
									{language === "ar"
										? "تشغيل تلقائي عند الوصول"
										: "Auto-Play on Arrival"}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 text-white">
							<div className="w-16 md:w-10 h-10 rounded-lg bg-[#8B1C2E] flex items-center justify-center -ms-6 md:-ms-7">
								<i className="fa-solid fa-book-open text-white" />
							</div>
							<div className="">
								<p className="text-sm md:text-base font-semibold">
									{language === "ar" ? "روايات موثوقة" : "Authentic Narrations"}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-1 md:gap-3 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 text-white">
							<div className="w-16 md:w-10 h-10 rounded-lg bg-[#0E8F5B] flex items-center justify-center -ms-6 md:-ms-7">
								<i className="fa-solid fa-circle-check text-white" />
							</div>
							<div className="">
								<p className="text-sm md:text-base font-semibold">
									{language === "ar"
										? "التحقق من الوصول للوجهة"
										: "Destination arrival verification"}
								</p>
							</div>
						</div>
					</div>
					{/* listen button at bottom center */}
					<div className="w-full flex justify-center mt-6">
						{/* Replaced Link with dialog trigger */}
						<AudioPreviewDialog language={language} audio={data.short_audio} />
					</div>
				</div>
			</div>
			<br />
			<Why />

			{/* Video section - YouTube embed */}
			<section className="container m-auto my-12">
				<h2
					className="text-2xl md:text-3xl font-bold text-center mb-6"
					style={{ direction: language === "ar" ? "rtl" : "ltr" }}
				>
					{language === "ar"
						? "كيفية تحسين تجربتك مع مزار"
						: "How to enhance your experience with Mzar"}
				</h2>

				<div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg">
					<div className="w-full aspect-video bg-black">
						{/* responsive youtube iframe */}
						<iframe
							className="w-full h-full block"
							src="https://www.youtube.com/embed/dMZO88og9Is"
							title="Mzar - Emotional journey"
							frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen=""
						/>
					</div>
				</div>

				<div className="flex justify-center mt-6">
					<Link
						href="https://onelink.to/yb2xky"
						target="_blank"
						rel="noopener noreferrer"
						className="book-link text-lg md:text-xl max-w-xs w-full text-center"
						style={{ fontWeight: 700 }}
					>
						{language === "ar" ? "تحميل تطبيق مزار" : "Download Mzar App"}
					</Link>
				</div>
			</section>
		</div>
	);
}
