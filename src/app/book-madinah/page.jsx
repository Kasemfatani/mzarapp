"use client";

import React, { useEffect, useState } from "react";
import Hero from "@/components/book-madinah/Hero";
import ChooseTourStep from "@/components/book-madinah/ChooseTourStep";
import PersonalInfoStep from "@/components/book-madinah/PersonalInfoStep";
import Loading from "@/app/loading";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { toast } from "sonner"; // ADD

export default function BookTourPage() {
	const [lang, setLang] = useState(null);
	const [step, setStep] = useState(1);

		// how many seats left and minimum seats from API
		const [leftSeats, setLeftSeats] = useState(null);
		const [minSeats, setMinSeats] = useState(null);

	// API data + loading
	const [busData, setBusData] = useState(null);
	const [loading, setLoading] = useState(true);

	// Read language from localStorage (client)
	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedLang = localStorage.getItem("lang");
			setLang(storedLang === "ar" ? "ar" : "en");
		}
	}, []);

	// Fetch bus booking data when lang is known
	useEffect(() => {
		let active = true;
		async function fetchData() {
			try {
				setLoading(true);
				const res = await fetch(
					`${API_BASE_URL_NEW}/landing/landing-guided-tour/madinah-booking-data`,
					{
						headers: { lang },
					}
				);
				if (!res.ok)
					throw new Error(`Failed to load booking-data: ${res.status}`);
				const json = await res.json();

				if (active) setBusData(json.data);
				// console.log("Fetched bus booking data:", json.data.times);
			} catch (err) {
				console.error("Error fetching bus booking data:", err);
				if (active) setBusData(null);
			} finally {
				if (active) setLoading(false);
			}
		}
		if (lang) fetchData();
		return () => {
			active = false;
		};
	}, [lang]);

	// Show toast if payment failed
	useEffect(() => {
		function getQueryParams() {
			if (typeof window !== "undefined") {
				const params = new URLSearchParams(window.location.search);
				if (params.get("status") === "failed") {
					toast.error(
						lang === "ar"
							? "فشلت عملية الدفع. يرجى المحاولة مرة أخرى."
							: "Payment failed. Please try again."
					);
				}
			}
		}
		if (lang) getQueryParams();
	}, [lang]);

	if (loading) return <Loading />;

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero initialLang={lang} step={step} setStep={setStep} />
			{step === 1 && busData && (
				<ChooseTourStep
					initialLang={lang}
					times={busData.times}
					 gatheringPointAddress={busData.gathering_point_address}
					busId={busData.id}
					onSaved={() => setStep(2)}
					leftSeats={leftSeats}
					setLeftSeats={setLeftSeats}
					minSeats={minSeats}
					setMinSeats={setMinSeats}
				/>
			)}
			{step === 2 && (
				<PersonalInfoStep
					initialLang={lang}
					max_people_count={busData.max_people_count}
					tax_amount={busData.tax}
					start_price={busData.price}
				/>
			)}
		</div>
	);
}
