"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlurFade from "../ui/blur-fade";
import img20 from "/public/gallery/20.jpg";
import img2 from "/public/gallery/2.png";
import img4 from "/public/gallery/4.png";
import img5 from "/public/gallery/5.png";
import img6 from "/public/gallery/6.png";
import img7 from "/public/gallery/7.png";
import img8 from "/public/gallery/8.png";
import img9 from "/public/gallery/9.png";
import img24 from "/public/gallery/24.png";
// import img12 from '/public/gallery/bg.png';

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Link from "next/link";


const images = Array.from({ length: 9 }, (_, i) => {
	const isLandscape = i % 2 === 0;
	const width = isLandscape ? 800 : 600;
	const height = isLandscape ? 600 : 800;
	return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
});

export default function Parteners() {
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
		{ url: img20, category: "photos" },
		{ url: img24, category: "photos" },
		{ url: img4, category: "photos" },
		{ url: img2, category: "photos" },
		{ url: img7, category: "videos" },
		{ url: img8, category: "photos" },
		{ url: img5, category: "videos" },
		{ url: img6, category: "videos" },
		{ url: img9, category: "videos" },
		// { url: img12, category: 'photos' },
	];
	let [activeTab, setActiveTab] = useState("all");

	return (
		<div
			className="gallery"
			id="gallery"
			style={{ direction: language === "en" ? "ltr" : "rtl" }}
		>
			<div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-10 py-16 ">
				<div className="w-full md:w-[30%] text-center md:text-justify">
					<h2>{language === "en" ? "Gallery" : "المعرض"}</h2>
					<p className="mb-5">
						{language === "en"
							? "Experience Mzar through the eyes of our visitors from around the world."
							: "استمتع بتجربة مزار كما رآها زوارنا من حول العالم."}{" "}
					</p>
					<button className="bg-blue-500 text-white px-6 py-2 rounded-lg text-base font-medium hover:bg-blue-600 transition">
						<Link href="/gallary">
							{language === "en" ? "see more" : "شاهد المزيد"}
						</Link>
					</button>
				</div>

				{/* <div className="tabs">
                    <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>{language === 'en' ? 'All' : 'الكل' }</button>
                    <button className={`tab ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => setActiveTab('photos')}>{language === 'en' ? 'Photos' : 'الصور'}</button>
                    <button className={`tab ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => setActiveTab('videos')}>{language === 'en' ? 'Videos' : 'الفيديوهات' }</button>
                </div> */}
				<section id="photos" className="w-full md:w-[70%] ">
					<div className="grid grid-cols-3 grid-rows-3 gap-2 h-[650px]">
						<div className="col-span-1 row-span-2">
							<a href={imgs[0].url.src} data-fancybox="gallery">
								<Image
									src={imgs[0].url}
									alt="Mazar"
									className="w-full h-full object-cover rounded-lg"
								/>
							</a>
						</div>
						<div className="col-span-2 row-span-1">
							<a href={imgs[1].url.src} data-fancybox="gallery">
								<Image
									src={imgs[1].url}
									alt="Mazar"
									className="w-full h-full object-cover rounded-lg"
								/>
							</a>
						</div>
						<div className="col-span-1 row-span-1">
							<a href={imgs[2].url.src} data-fancybox="gallery">
								<Image
									src={imgs[2].url}
									alt="Mazar"
									className="w-full h-full object-cover rounded-lg"
								/>
							</a>
						</div>
						<div className="col-span-1">
							<a href={imgs[3].url.src} data-fancybox="gallery">
								<Image
									src={imgs[3].url}
									alt="Mazar"
									className="w-full h-full object-cover rounded-lg"
								/>
							</a>
						</div>
						<div className="col-span-2">
							<a href={imgs[4].url.src} data-fancybox="gallery">
								<Image
									src={imgs[4].url}
									alt="Mazar"
									className="w-full h-full object-cover rounded-lg"
								/>
							</a>
						</div>
						<div className="col-span-1">
							<a href={imgs[5].url.src} data-fancybox="gallery">
								<Image
									src={imgs[5].url}
									alt="Mazar"
									className="w-full h-full object-cover rounded-lg"
								/>
							</a>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
