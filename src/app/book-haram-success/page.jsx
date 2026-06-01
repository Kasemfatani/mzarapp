"use client";

import React, { useEffect, useState } from "react";
import HeroTop from "@/components/book-haram/HeroTop";
import SuccessSummary from "@/components/book-haram/SuccessSummary";
import Loading from "@/app/loading";
// export const revalidate = 300;
import { useCurrentLocale } from "@/lib/useLocale";

const STORAGE_KEY = "bookHaramain.selection";

export default function TourSuccess() {

	const {
		locale
	} = useCurrentLocale();

	const lang = locale;
	
	// useEffect(() => {
	// 	if (typeof window === "undefined") return;

	// 	// Read selection from localStorage
	// 	let sel;
	// 	try {
	// 		sel = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
	// 	} catch {
	// 		sel = null;
	// 	}
	// 	const customer_name = sel?.customer_name || "";
	// 	const customer_whatsapp = sel?.customer_whatsapp || "";
	// 	const customer_email = sel?.customer_email || "";

	// 	window.dataLayer = window.dataLayer || [];
	// 	window.dataLayer.push({
	// 		event: "form_submission",
	// 		customer_name: customer_name || "",
	// 		customer_whatsapp: customer_whatsapp || "",
	// 		customer_email: customer_email || "",
	// 	});
	// }, []);

	if (!lang) return <Loading />;

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			{/* <HeroTop initialLang={lang} /> */}
			<SuccessSummary initialLang={lang} />
		</div>
	);
}
