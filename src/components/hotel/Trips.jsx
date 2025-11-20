"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Trips() {
	const [language, setLanguage] = useState("en");

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
			EnrichmentButton: "Start your journey now",
			TwoMosquesButton: "Your Holy Mosques tour awaits — book your seat now ",
			BusTourButton: "Explore Makkah and its history — book your tour today",
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
			EnrichmentButton: "ابدأ رحلتك الآن",
			TwoMosquesButton: "جولة الحرم في انتظارك – احجز مقعدك فوراً ",
			BusTourButton: "استكشف مكة وتاريخها – احجز رحلتك",
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
				ar: "الجولات الإثرائية",
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
			<div
				className="flex flex-col md:flex-row gap-6 justify-center items-start w-full"
				dir="ltr"
			>
				{trips.map((trip) => (
					<div
						key={trip.id}
						className={
							"group flex flex-col justify-between rounded-3xl shadow-lg transition-all duration-300 ease-out cursor-pointer w-full md:w-1/3 bg-white hover:bg-[var(--sec-color)] hover:scale-105 hover:z-10"
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
							</div>
						</div>

						{/* Content */}
						<h3 className="text-lg font-semibold text-[#333] mb-1 px-5">
							{language === "ar" ? trip.title.ar : trip.title.en}
						</h3>
						
						<p className="text-sm text-gray-600 mb-3 px-5 hidden group-hover:block">
									{language === "ar" ? trip.blurb.ar : trip.blurb.en}
						</p>
						{/* Features: hidden by default, shown on hover */}
						<div className="px-5">
							<ul className="mb-4 list-disc ps-5 text-sm text-[#333] space-y-1 hidden group-hover:block">
								{(language === "ar" ? trip.features.ar : trip.features.en).map(
									(f, i) => (
										<li key={i}>{f}</li>
									)
								)}
							</ul>
						</div>
						<div className="px-5">{renderButtons(trip.buttonType)}</div>
						<div
							className="px-5 pb-5 "
							style={{ direction: language === "ar" ? "rtl" : "ltr" }}
						></div>
					</div>
				))}
			</div>
		</section>
	);
}
