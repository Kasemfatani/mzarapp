"use client";
import React, { useEffect, useState, Suspense } from "react";
import Loading from "@/app/loading";
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
import HomePopup from "../components/home/HomePopup";

import NewDestinations from "../components/home/NewDestinations";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import parse from "html-react-parser";

export default function Home() {
	const [lang, setLang] = useState("en");
	const [showPopup, setShowPopup] = useState(false);
	const [checkedStorage, setCheckedStorage] = useState(false);
	const [adData, setAdData] = useState<any>(null);

	const popupKey =
		lang === "ar" ? "homepage_popup_dismissed_ar" : "homepage_popup_dismissed";

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (localStorage.getItem("lang") === "ar") setLang("ar");
			else if (localStorage.getItem("lang") === "en") setLang("en");

			// Fetch ad data
			axios
				.get(`${API_BASE_URL}/landing/home/ads`, {
					headers: { lang: localStorage.getItem("lang") },
				})
				.then((response) => {
					setAdData(response.data);
					// if (localStorage.getItem(popupKey) !== "1") {
					setShowPopup(true);
					// }
					setCheckedStorage(true);
				})
				.catch(() => {
					setCheckedStorage(true);
				});
		}
	}, [lang]);

	const handleDismiss = () => {
		setShowPopup(false);
		// localStorage.setItem(popupKey, "1");
	};

	return (
		<>
			{checkedStorage && adData && (
				<HomePopup
					open={showPopup}
					adData={adData}
					lang={lang}
					onDismiss={handleDismiss}
				/>
			)}
			<main>
				<Hero />
				<SemiAbout />
				<Confiemed />
				<Paths />
				<Suspense fallback={<Loading />}>
					<DownloadAppSection />
					<Explore />
					<Gallery />
					<NewDestinations />
					<About />
					<AppExplore />
					<Content />
					<GenSection />
					<Latest />
				</Suspense>
			</main>
		</>
	);
}
