"use client";

import React, { useEffect, useState } from "react";
import Hero from "@/components/book-tour/Hero";
import ChooseTourStep from "@/components/book-tour/ChooseTourStep";
import PersonalInfoStep from "@/components/book-tour/PersonalInfoStep";
import Loading from "@/app/loading";
import { API_BASE_URL } from "@/lib/apiConfig";
import { toast } from "sonner"; // ADD

export default function BookTourPage() {
	const [lang, setLang] = useState(null);
	const [step, setStep] = useState(1);

	// how many seats left  from API
	const [leftSeats, setLeftSeats] = useState(null);

	// API data + loading
	const [busData, setBusData] = useState(null);
	const [loading, setLoading] = useState(true);

	// NEW: access control via ?page=100
	const [hasAccess, setHasAccess] = useState(null);

	// Read language from localStorage (client)
	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedLang = localStorage.getItem("lang");
			setLang(storedLang === "ar" ? "ar" : "en");
		}
	}, []);

	// NEW: check URL param access on mount
	useEffect(() => {
		if (typeof window !== "undefined") {
			const params = new URLSearchParams(window.location.search);
			setHasAccess(params.get("page") === "100");
		} else {
			setHasAccess(false);
		}
	}, []);

	// store promo_code from URL params (overwrites existing partnerPromoCode)
	useEffect(() => {
		if (typeof window === "undefined") return;
		const params = new URLSearchParams(window.location.search);
		const promoFromUrl = params.get("promo_code");
		if (promoFromUrl) {
			localStorage.setItem("partnerPromoCode", promoFromUrl);
		}
	}, []);

	// Fetch bus booking data when lang is known
	useEffect(() => {
		let active = true;
		async function fetchData() {
			try {
				setLoading(true);
				const res = await fetch(
					`${API_BASE_URL}/landing/home/bus-booking-data`,
					{
						headers: { lang },
					}
				);
				if (!res.ok)
					throw new Error(`Failed to load bus-booking-data: ${res.status}`);
				const json = await res.json();

				if (active) setBusData(json);
				// console.log("Fetched bus booking data:", json);
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

	// show access denied before any loading UI
	if (hasAccess === false) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
				<div className="text-5xl mb-6 text-gray-400">❌</div>
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

	if (loading) return <Loading />;

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero initialLang={lang} step={step} setStep={setStep} />
			{step === 1 && busData && (
				<ChooseTourStep
					initialLang={lang}
					times={busData.times}
					gatheringPoints={busData.gathering_points}
					busId={busData.id}
					onSaved={() => setStep(2)}
					leftSeats={leftSeats}
					setLeftSeats={setLeftSeats}
				/>
			)}
			{step === 2 && (
				<PersonalInfoStep
					initialLang={lang}
					max_people_count={leftSeats}
					tax_amount={busData.tax}
					start_price={busData.start_price}
				/>
			)}
		</div>
	);
}
