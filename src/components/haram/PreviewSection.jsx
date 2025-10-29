"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";

const images = [
	"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
	"https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
	"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
	"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
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
							src="https://www.youtube.com/embed/u31qwQUeGuM"
							title="Placeholder video"
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
						href="#"
						onClick={(e) => e.preventDefault()}
						className="inline-block"
					>
						<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-24 py-3 font-semibold rounded-lg">
							{isAr ? "تحميل التطبيق" : "Download App"}
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
}
