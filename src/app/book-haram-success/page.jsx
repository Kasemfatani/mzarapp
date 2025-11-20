"use client";

import React, { useEffect, useState } from "react";
import HeroTop from "@/components/book-haram/HeroTop";
import SuccessSummary from "@/components/book-haram/SuccessSummary";
import Loading from "@/app/loading";
// export const revalidate = 300;

export default function TourSuccess() {
	const [lang, setLang] = useState(null);
	// Read language from localStorage (client)
	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedLang = localStorage.getItem("lang");
			setLang(storedLang === "ar" ? "ar" : "en");
		}
	}, []);

	if (!lang) return <Loading />;

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<HeroTop initialLang={lang} />
			<SuccessSummary initialLang={lang} />
		</div>
	);
}
