"use client";

import { useState, useEffect } from "react";
import { DownloadButtons } from "./DownloadButtons";

export const HeroSection = ({ language, setLanguage }) => {
	const switchLanguage = () => {
		const newLang = language === "ar" ? "en" : "ar";
		setLanguage(newLang);
		localStorage.setItem("lang", newLang);
	};

	return (
		<section className="relative w-full min-[1025px]:h-screen overflow-hidden bg-cover bg-center bg-[url('/banner_2.png')]">
			<div className="relative z-10 w-full h-full px-4 sm:px-6 md:px-10 lg:px-[66px] py-6 sm:py-8 md:py-10 lg:py-[57px] flex flex-col">
				{/* Header for the language switcher */}
				<div
					className={`w-full flex ${language === "ar" ? "" : "justify-start"}`}>
					<button
						onClick={switchLanguage}
						className="flex items-center gap-2 rounded-lg bg-black/20 px-4 py-2 text-base font-semibold text-white transition-colors hover:bg-black/40 backdrop-blur-sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-5 w-5">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
							/>
						</svg>
						<span>{language === "ar" ? "English" : "العربية"}</span>
					</button>
				</div>

				
				<div className="flex-grow flex flex-col md:flex-row justify-center lg:justify-between items-center gap-5 w-full mt-8 md:mt-0">
					<div
						className="flex flex-col justify-center items-center
 my-auto text-center">
						<div className="font-semibold">
						<p className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-wrap mb-8">
								{language === "ar"
									? "اكتشف مكة كما لم ترها من قبل! "
									: "Discover Makkah Like Never Before!"}
							</p>
							<p className="text-white text-xl md:text-3xl lg:text-4xl text-wrap">
								{language === "ar"
									? "استمتع بتجربة الواقع المعزز من مزار"
									: "Experience the sacred city through Mzar's Augmented Reality,"}
							</p>
							<p className="text-white text-xl md:text-3xl lg:text-4xl text-wrap mt-6">
								{language === "ar"
									? "الآن من نافذتك المطلة على أقدس مكان على وجه الأرض. "
									: "Now from your window overlooking the holiest place on earth."}
							</p>
							<br />
						</div>
						<DownloadButtons language={language} />
					</div>
					<div className=" w-[100%] md:w-[40%] lg:w-[30%] relative flex justify-center items-center">
						<div class="w-[250px] h-[510px] bg-black rounded-[2.5rem] border-[6px] border-gray-900 shadow-lg relative flex flex-col items-center justify-start overflow-hidden">
							<iframe
								className="absolute top-0 left-0 w-full h-full"
								src="https://www.youtube.com/embed/frw4Z53HxGc" // Replace with your video ID
								allow="accelerometer;clipboard-write;  gyroscope; picture-in-picture"
								allowFullScreen
								title="Embedded YouTube Video"></iframe>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
