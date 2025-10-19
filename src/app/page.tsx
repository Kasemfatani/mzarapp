"use client";
import React, { useEffect, useState, Suspense } from "react";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import Hero from "../components/home/Hero";
import SemiAbout from "../components/home/SemiAbout";
import HomePopup from "../components/home/HomePopup";
import LazyHomeSections from "@/components/home/LazyHomeSections";

// Dynamically import components inside Suspense
const Confiemed = dynamic(() => import("../components/home/Confirmed"), {
	loading: () => <Loading />,
});
const Paths = dynamic(() => import("../components/home/Paths"), {
	loading: () => <Loading />,
});
const DownloadAppSection = dynamic(
	() => import("../components/home/DownloadAppSection"),
	{
		loading: () => <Loading />,
	}
);
const Explore = dynamic(() => import("../components/home/Explore"), {
	loading: () => <Loading />,
});
const Gallery = dynamic(() => import("../components/home/Gallery"), {
	loading: () => <Loading />,
});
const NewDestinations = dynamic(
	() => import("../components/home/NewDestinations"),
	{
		loading: () => <Loading />,
	}
);
const About = dynamic(() => import("../components/home/About"), {
	loading: () => <Loading />,
});
const AppExplore = dynamic(() => import("../components/home/AppExplore"), {
	loading: () => <Loading />,
});
const Content = dynamic(() => import("../components/home/Content"), {
	loading: () => <Loading />,
});
const GenSection = dynamic(() => import("../components/home/GenSection"), {
	loading: () => <Loading />,
});
const Latest = dynamic(() => import("../components/home/Latest"), {
	loading: () => <Loading />,
});

// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
// import parse from "html-react-parser";

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
					setShowPopup(true);
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
				<SemiAbout />{" "}
				<LazyHomeSections />{" "}
				{/* SemiAbout → Latest will load only when this enters view */}
			</main>
		</>
	);
}
