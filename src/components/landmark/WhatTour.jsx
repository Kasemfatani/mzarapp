"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import seoIcon from "/public/Home/seo.png";
// import routeIcon from "/public/Home/route.png";
// import smartPhoneIcon from "/public/Home/smart-phone.png";
import AR from "/public/Home/AR.png";
import tour_guide from "/public/Home/tour-guide.png";
import map from "/public/Home/map.svg";
import photography from "/public/Home/photography.svg";
import imageIcon from "/public/Home/image.svg";

const features = [
	{
		icon: tour_guide,
		ar: "رحلة معرفية أثناء التنقل – اجعل كل دقيقة على الطريق فرصة لاكتشاف جديد. ",
		en: "An informative journey on the go – make every minute on the road an opportunity to discover something new. ",
	},
	{
		icon: AR,
		ar: "إرشاد ذكي تلقائي – لا حاجة للبحث، التطبيق يتحدث إليك في الوقت والمكان المناسب. ",
		en: "Smart automatic guidance – no need to search, the app talks to you at the right time and place. ",
	},
	{
		icon: map,
		ar: "لغات متعددة – تخاطب الجميع بلغتهم وثقافتهم. ",
		en: "Multiple languages – addressing everyone in their language and culture. ",
	},
	{
		icon: imageIcon,
		ar: "محتوى حي وتفاعلي – صور، أصوات، وخرائط تعيدك إلى قلب الحدث. ",
		en: "Live and interactive content – photos, sounds, and maps that take you back to the heart of the event. ",
	},
	{
		icon: photography,
		ar: "تجربة حصرية داخل مزار – لا يمكن استخدامها إلا من خلال تطبيق مزار. ",
		en: "Exclusive experience within Mzar – can only be used through the Mzar app.",
	},
];

export default function WhatTour({ lang = "en" }) {
	
	const isAr = lang === "ar";

	return (
		<section className="py-16 ">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900">
					{isAr ? 'لماذا "معالم في الطريق"؟' : 'Why "Landmarks on the Way"?'}
				</h2>
				<p className="text-center text-gray-500 mb-2">
					{isAr
						? "لأنها لا تكتفي بنقلك من مكانٍ إلى آخر، بل تأخذك في رحلة عبر الزمان. "
						: 'Because it does not just transport you from one place to another, but takes you on a journey through time. '}
				</p>
				
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
					{features.map((f, i) => (
						<div
							key={i}
							className="flex flex-col items-center bg-[#F9F6EF] rounded-2xl p-6 shadow-xl min-h-[180px]"
						>
							<div className="mb-4">
								<Image
									src={f.icon}
									alt=""
									width={48}
									height={48}
									className="mx-auto"
									draggable={false}
								/>
							</div>
							<div className="text-center text-gray-800 font-semibold text-base leading-snug">
								{isAr ? f.ar : f.en}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
