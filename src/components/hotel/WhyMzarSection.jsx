"use client";
import React, { useEffect } from "react";

import Image from "next/image";

const featuresAr = [
	"الدليل الصوتي: استمع إلى القصص الأصلية من خلال المرشد الصوتي المتوفر بـ6 لغات مختلفة.",
	"التحقق من الوجهة: عند وصولك إلى الموقع، يبدأ المرشد الصوتي تلقائيًا ليؤكد أنك في المكان الصحيح تمامًا.",
	"فلاترنا المميزة: التقط ذكرياتك باستخدام فلاترنا الفريدة التي تتضمن اسم الوجهة وتاريخ الزيارة.",
	"تجربة الواقع المعزز: افتح كاميرتك ووجّهها نحو المعلم لتكتشف قصة كل موقع من خلال تقنية الواقع المعزز.",
];
const featuresEn = [
	"Audio Guide: Listen to authentic stories through the audio tour guide in 6 different languages.",
	"Arrival verification at the exact destination: When you arrive at the destination, the audio guide starts instantly, confirming you’re exactly where you should be.",
	"Our Filters: Capture memories with our unique filters that contain the name of the destination and the date of visit.",
	"Augmented Reality experience: Unlock each site’s story through Augmented Reality by opening your camera and pointing at the landmark.",
];

const images = [
	"/gallery/4.webp",
	"/gallery/19.jpg",
	"/gallery/25.png",
	"/gallery/17.png",
];

export default function WhyMzarSection({ lang = "ar" }) {
	const isAr = lang === "ar";

	useEffect(() => {
			let unbind;
			let destroyed = false;
	
			(async () => {
				// Ensure CSS is present (pin to v5)
				const cssHref =
					"https://cdn.jsdelivr.net/npm/@fancyapps/ui@5/dist/fancybox/fancybox.css";
				if (!document.querySelector(`link[href="${cssHref}"]`)) {
					const link = document.createElement("link");
					link.rel = "stylesheet";
					link.href = cssHref;
					link.crossOrigin = "anonymous";
					document.head.appendChild(link);
				}
	
				const { Fancybox } = await import("@fancyapps/ui");
				if (destroyed) return;
	
				// Delegated binding
				unbind = Fancybox.bind("[data-fancybox]", {
					Thumbs: false, // Disable the thumbnail bar
				});
			})();
	
			return () => {
				destroyed = true;
				try {
					if (unbind) unbind();
				} catch {}
			};
		}, []);

	return (
		<section  className="bg-[url(/landmark/whatLandMark-bg.webp)] w-full bg-white py-10 px-2 flex justify-center">
			<div
				className={`flex flex-col md:flex-row  items-center gap-8 max-w-6xl w-full`}
			>
				{/* Image side */}
				<div className="w-full md:w-1/2 grid grid-cols-2 grid-rows-2 gap-2">
					{images.map((img, i) => (
							<a
								key={i}
								href={img}
								data-fancybox="preview-imgs"
								className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 block "
							>
								<img
									src={img}
									alt={`Preview ${i + 1}`}
									className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
									loading="lazy"
									draggable={false}
								/>
							</a>
						))}
				</div>
				{/* Text side */}
				<div className="w-full md:w-1/2 flex flex-col items-start md:items-start gap-6">
					<h2 className="text-2xl md:text-3xl font-bold text-[#222] mb-2">
						{isAr ? "لماذا مزار . . . ؟" : "Why Mzar...?"}
					</h2>
					<ul className="flex flex-col gap-4">
						{(isAr ? featuresAr : featuresEn).map((text, i) => (
							<li
								key={i}
								className="flex items-start gap-2 text-base md:text-lg text-[#222]"
							>
								<span className="mt-1 flex-shrink-0">
									{/* Check icon */}
									<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
										<circle cx="11" cy="11" r="11" fill="#BFAE8A" />
										<path
											d="M7 11.5l3 3 5-6"
											stroke="#fff"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
								<span>{text}</span>
							</li>
						))}
					</ul>
					<div className="flex flex-col gap-3 w-full mt-4">
						<div className="bg-[#e5ddcb] text-[#7a6a4d] rounded-lg px-4 py-2 text-sm md:text-base font-semibold w-fit mx-auto text-center">
							{isAr
								? "مزار.. وجهتك الأولى لاكتشاف الحكاية خلف كل معلم."
								: "Mzar... your first destination to discover the story behind every landmark."}
						</div>
						<a
							href="https://wa.me/+966580121025"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-[#3a6c5a] hover:bg-[#29513f] text-white text-center rounded-xl px-6 py-2 text-base font-bold transition w-full"
						>
							{isAr
								? "للمزيد تواصل معنا الآن"
								: "For more details, contact us now "}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
