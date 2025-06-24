"use client";

import { useState, useEffect } from "react";
import { DownloadButtons } from "./DownloadButtons";

export const HeroSection = ({ language, setLanguage }) => {

	const switchLanguage = () => {
		const newLang = language === 'ar' ? 'en' : 'ar';
		setLanguage(newLang);
		localStorage.setItem('lang', newLang);
	};

	return (
		<section className="relative w-full lg:h-screen overflow-hidden bg-cover bg-center bg-[url('/banner_2.png')]">
			<div className="relative z-10 w-full h-full px-4 sm:px-6 md:px-10 lg:px-[66px] py-6 sm:py-8 md:py-10 lg:py-[57px] flex flex-col">
				{/* Header for the language switcher */}
				<div className={`w-full flex ${language === 'ar' ? '' : 'justify-start'}`}>
					<button onClick={switchLanguage} className="text-white font-semibold p-2 rounded-md hover:bg-white/20 transition-colors">
						{language === 'ar' ? 'English' : 'العربية'}
					</button>
				</div>

				{/* Main content, takes remaining space and centers its children */}
				<div className="flex-grow flex flex-col md:flex-row justify-center lg:justify-between items-center gap-5 w-full mt-8 md:mt-0">
					<div
						className="flex flex-col justify-center items-center
 my-auto text-center">
						<div className="font-semibold">
							<h1 className="text-white text-3xl md:text-5xl lg:text-6xl text-wrap">
								{language === 'ar' ? 'استمتع بتجربة الواقع' : 'Enjoy the Augmented Reality'}
							</h1>
							<h1 className="text-white text-3xl md:text-5xl lg:text-6xl text-wrap mt-6">
								{language === 'ar' ? 'المعزز في تطبيق مزار' : ' Experience in Mzar App'}
							</h1>
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
