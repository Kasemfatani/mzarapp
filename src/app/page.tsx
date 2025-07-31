"use client";
import React, { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import Paths from "../components/home/Paths";
import About from "../components/home/About";
import GenSection from "../components/home/GenSection";
import AppExplore from "../components/home/AppExplore";
import Explore from "../components/home/Explore";
import SemiAbout from "../components/home/SemiAbout";
import Gallery from "../components/home/Gallery";
import Content from "../components/home/Content";
import Latest from "../components/home/Latest";
import Confiemed from "../components/home/Confirmed";
import DownloadAppSection from "../components/home/DownloadAppSection.jsx";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
	const [lang, setLang] = useState("en");
	const [showPopup, setShowPopup] = useState(false); // default: false
	const [checkedStorage, setCheckedStorage] = useState(false);

  

	useEffect(() => {
		if (typeof window !== "undefined") {
      console.log("Checking localStorage at top popup key",popupKey, lang );
			if (localStorage.getItem("lang") === "ar") setLang("ar");
			else if (localStorage.getItem("lang") === "en") setLang("en");
			else localStorage.setItem("lang", "ar");
			// Only show popup after checking localStorage
			console.log("Checking localStorage for popup key",popupKey, lang );
			if (localStorage.getItem(popupKey) !== "1") {
				setShowPopup(true);
			}
			setCheckedStorage(true);
		}
	}, [lang]);

  const popupKey =
				lang === "ar"
					? "homepage_popup_dismissed_ar"
					: "homepage_popup_dismissed";

	const handleDismiss = () => {
		setShowPopup(false);
		localStorage.setItem(popupKey, "1");
	};
	console.log("Checking localStorage bottom popup key", popupKey, lang);
	return (
		<>
			{checkedStorage && (
				<Dialog open={showPopup}>
					<DialogContent className="  p-0 bg-white rounded-2xl shadow-2xl overflow-visible">
						{/* NEW badge in the top left, pulled out with -translate-x and -translate-y */}
						<img
							src="/popup-new.png"
							alt="New"
							className="absolute left-0 top-0 w-20 h-20 z-10 -translate-x-[8px] -translate-y-[8px]"
							style={{ pointerEvents: "none" }}
						/>
						<img
							src="/popup-img.png"
							alt="New Trip"
							className="rounded-t-2xl w-full h-56 object-cover pt-5 px-5"
						/>
						<div
							className="p-6 text-center"
							dir={lang === "ar" ? "rtl" : "ltr"}
						>
							<h2 className="text-2xl font-semibold mb-2">
								{lang === "ar" ? "رحلة جديدة متاحة!" : "New Trip Available!"}
							</h2>
							<p className="text-gray-600 text-center mb-1">
								{lang === "ar"
									? "استكشف أحدث مساراتنا"
									: "Explore our latest route"}
							</p>
							<p className="text-gray-600 text-center mb-4">
								{lang === "ar"
									? "أسرع، أرخص، ومتوفرة الآن يوميًا!"
									: "Faster, cheaper, and now available daily!"}
							</p>
							<div className="flex gap-4 justify-center">
								<Button
									variant="outline"
									className="flex-1 border-cyan-400 text-cyan-500"
									onClick={handleDismiss}
								>
									{lang === "ar" ? "إغلاق" : "Dismiss"}
								</Button>
								<Button
									className="flex-1 bg-cyan-500 bg-gradient-to-r from-[#025AB4] via-[#1AC5BD] to-[#87DCB5] text-white"
									onClick={handleDismiss}
								>
									{lang === "ar" ? "عرض التفاصيل" : "View Details"}
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			)}
			<main>
				<Hero></Hero>
				<SemiAbout />
				{/* <Parteners/> */}
				<Confiemed />
				<Paths></Paths>
				<DownloadAppSection />
				<Explore />
				<Gallery />
				<About></About>
				<AppExplore />
				<Content />
				<GenSection />
				<Latest />
			</main>
		</>
	);
}
