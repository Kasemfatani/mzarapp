"use client";

import React, { useEffect, useState } from "react";
import Hero from "@/components/book-haram/Hero";
import ChooseTourStep from "@/components/book-haram/ChooseTourStep";
import PersonalInfoStep from "@/components/book-haram/PersonalInfoStep";
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
	const [notAvailable, setNotAvailable] = useState(false);

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
					`${API_BASE_URL_NEW}/landing/landing-guided-tour/makkah-booking-data`,
					{
						headers: { lang },
					}
				);
				if (!res.ok)
					throw new Error(`Failed to load booking-data: ${res.status}`);
				const json = await res.json();

				if (json.status === false && json.message === "Package ID  Not Found") {
					if (active) setNotAvailable(true);
					return;
				}


				if (active) setBusData(json.data);
				// console.log("Fetched bus booking data:", json.data);
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

	
	if (notAvailable) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
				<div className="text-5xl mb-6 text-gray-400">🚧</div>
				<h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
					{lang === "ar" ? "الخدمة غير متوفرة حالياً" : "Service Not Available"}
				</h2>
				<p className="text-gray-600 text-center mb-4">
					{lang === "ar"
						? "نعتذر، هذه الخدمة غير متوفرة حالياً. يرجى المحاولة لاحقاً أو التواصل معنا للمزيد من المعلومات."
						: "Sorry, this service is currently not available. Please try again later or contact us for more information."}
				</p>
			</div>
		);
	}

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
					lat={busData.gathering_point_lat}
					lng={busData.gathering_point_lng}
				/>
			)}
			{step === 2 && (
				<PersonalInfoStep
					initialLang={lang}
					max_people_count={leftSeats}
					tax_amount={busData.tax}
					start_price={busData.price}
					// leftSeats={leftSeats}
					minSeats={minSeats}
				/>
			)}
		</div>
	);
}
