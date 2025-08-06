"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlurFade from "@/components/ui/blur-fade";
import img1 from "/public/gallery/1.png";
import img2 from "/public/gallery/2.png";
import img4 from "/public/gallery/4.png";
import img5 from "/public/gallery/5.png";
import img6 from "/public/gallery/6.png";
import img7 from "/public/gallery/7.png";
import img8 from "/public/gallery/8.png";
import img9 from "/public/gallery/9.png";
import img10 from "/public/gallery/10.png";
// import img12 from '/public/gallery/bg.png';

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const images = Array.from({ length: 9 }, (_, i) => {
	const isLandscape = i % 2 === 0;
	const width = isLandscape ? 800 : 600;
	const height = isLandscape ? 600 : 800;
	return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
});

export default function GallerySection() {
	const [language, setLanguage] = useState("en"); // Default language is 'en'
	useEffect(() => {
		if (typeof window !== "undefined") {
			// Define the headers with the selected language
			setLanguage(localStorage.getItem("lang"));
		}
	}, []); // Run this effect whenever the `language` changes
	Fancybox.bind("[data-fancybox]", {
		// Your custom options
	});
	let imgs = [
		{ url: img1, category: "photos" },
		{ url: img10, category: "photos" },
		{ url: img4, category: "photos" },
		{ url: img2, category: "photos" },
		{ url: img7, category: "videos", video: "https://www.youtube.com/embed/ScMzIvxBSi4" }, // example video
		{ url: img8, category: "photos" },
		{ url: img5, category: "videos", video: "https://www.youtube.com/embed/ScMzIvxBSi4" }, // example video
		{ url: img6, category: "videos", video: "https://www.youtube.com/embed/ScMzIvxBSi4" }, // example video
		{ url: img9, category: "videos", video: "https://www.youtube.com/embed/ScMzIvxBSi4" }, // example video
		// { url: img12, category: 'photos' },
	];
	let [activeTab, setActiveTab] = useState("all");

	return (
		<div
			className="gallery"
			id="gallery"
			style={{ direction: language === "en" ? "ltr" : "rtl" }}
		>
			<div className="container mx-auto">
				{/* <h2>{language === 'en' ? 'Gallery' : 'المعرض' }</h2>
                <p>{language === 'en' ? 'Experience Mzar through the eyes of our visitors from around the world.' : 'استمتع بتجربة مزار كما رآها زوارنا من حول العالم.'} </p> */}
				<div className="tabs">
					<button
						className={`px-8 py-2 rounded-lg border transition font-medium
      ${
				activeTab === "all"
					? "border-blue-400 text-blue-600 bg-white shadow"
					: "border-gray-300 text-gray-500 bg-white hover:border-blue-300"
			}
    `}
						onClick={() => setActiveTab("all")}
					>
						{language === "en" ? "All" : "الكل"}
					</button>
					<button
						className={`px-8 py-2 rounded-lg border transition font-medium
      ${
				activeTab === "photos"
					? "border-blue-400 text-blue-600 bg-white shadow"
					: "border-gray-300 text-gray-500 bg-white hover:border-blue-300"
			}
    `}
						onClick={() => setActiveTab("photos")}
					>
						{language === "en" ? "Photos" : "الصور"}
					</button>
					<button
						className={`px-8 py-2 rounded-lg border transition font-medium
      ${
				activeTab === "videos"
					? "border-blue-400 text-blue-600 bg-white shadow"
					: "border-gray-300 text-gray-500 bg-white hover:border-blue-300"
			}
    `}
						onClick={() => setActiveTab("videos")}
					>
						{language === "en" ? "Videos" : "الفيديوهات"}
					</button>
				</div>
				<section id="photos">
					<div className="columns-2 gap-4 sm:columns-3">
						{imgs.map((img, idx) =>
							img.category === activeTab || activeTab === "all" ? (
								<BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
									{img.category === "videos" ? (
										<a
											href={img.video}
											data-fancybox="gallery"
											data-type="iframe"
											className="relative block group"
										>
											<figure>
												<Image
													src={img.url}
													alt="Mazar"
													width={200}
													height={200}
													className="mb-4 size-full rounded-lg object-contain"
												/>
												{/* Video play icon overlay */}
												<span className="absolute inset-0 flex items-center justify-center pointer-events-none">
													<svg
														className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform"
														fill="currentColor"
														viewBox="0 0 48 48"
													>
														<circle
															cx="24"
															cy="24"
															r="24"
															fill="black"
															opacity="0.5"
														/>
														<polygon
															points="20,16 34,24 20,32"
															fill="white"
														/>
													</svg>
												</span>
											</figure>
										</a>
									) : (
										<a href={img.url.src} data-fancybox="gallery">
											<figure>
												<Image
													src={img.url}
													alt="Mazar"
													width={200}
													height={200}
													className="mb-4 size-full rounded-lg object-contain"
												/>
											</figure>
										</a>
									)}
								</BlurFade>
							) : null
						)}
					</div>
				</section>
			</div>
		</div>
	);
}
