"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";

const images = [
	"/haram/preview-1.webp",
	"/haram/preview-2.webp",
	"/haram/preview-3.webp",
	"/haram/preview-4.webp",
];

export default function PreviewSection({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");
	const isAr = language === "ar";

	// BIND Fancybox on client mount and unbind on cleanup
	useEffect(() => {
		if (typeof window === "undefined") return;
		let unbind;
		try {
			// bind returns an unbind function in v5
			unbind = Fancybox.bind('[data-fancybox="preview-gallery"]', {});
		} catch (err) {
			// If bind fails (unlikely) log it so you can debug
			// console.warn("Fancybox bind error:", err);
		}
		return () => {
			try {
				if (typeof unbind === "function") unbind();
				// fallback: if Fancybox exposes destroy/close API you could call it here
				// if (Fancybox.destroy) Fancybox.destroy();
			} catch {}
		};
	}, []);

	return (
		<section className="py-14 bg-white">
			<div className="container mx-auto px-4">
				{/* Centered texts */}
				<div className="text-center mb-8">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
						{isAr ? "من داخل التجربة..." : "From Inside the Experience..."}
					</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">
						{isAr
							? "لمحة من الجولات السابقة التي خاضها الزوار داخل المسجد الحرام؛ بين الدهشة والسكينة، والمعرفة والروحانية."
							: "A glimpse from previous tours experienced by visitors inside Masjid al-Haram; between awe, tranquility, knowledge, and spirituality."}
					</p>
				</div>

				{/* Video + images grid */}
				<div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch max-w-5xl mx-auto mb-8">
					{/* Video */}
					<div className="md:col-span-3 aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
						<iframe
							src={isAr ? "https://www.youtube.com/embed/BB7Mu5pSGeg?si=qNyOYB7OuR8gCPTX" : "https://www.youtube.com/embed/0mF9Yb_ETIs?si=psDm_KebD_xz60x6"}
							title={isAr ? "فيديو" : "video"}
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerpolicy="strict-origin-when-cross-origin"
							allowfullscreen
							className="w-full h-full"
						></iframe>
					</div>
					{/* Images */}
					<div className="md:col-span-2 grid grid-cols-2 grid-rows-2 gap-4">
						{images.map((img, i) => (
							<a
								key={i}
								href={img}
								data-fancybox="preview-gallery"
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
				</div>

				{/* Button */}
				<div className="flex justify-center">
					<Link
						href="/book-haram"
						className="inline-block"
					>
						<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-24 py-3 font-semibold rounded-lg">
							{isAr ? "احجز الآن" : "Book Now"}
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
}
