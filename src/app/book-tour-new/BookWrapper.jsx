"use client";

import React, { useEffect, useState } from "react";
import { TripSummaryCard } from "@/components/book-components/TripSummaryCard";
import { BookingForm } from "@/components/book-components/BookingForm";
import { PriceCalculationBox } from "@/components/book-components/PriceCalculationBox";
import { CustomerInfoFields } from "@/components/book-components/CustomerInfoFields";
import { ActionButtons } from "@/components/book-components/ActionButtons";

import Loading from "@/app/loading";
import { API_BASE_URL } from "@/lib/apiConfig";
import { toast } from "sonner"; // ADD

export default function BookTourPage({ tripData }) {
	const [lang, setLang] = useState(null);

	// how many seats left  from API
	const [leftSeats, setLeftSeats] = useState(null);

	// API data + loading
	const [busData, setBusData] = useState(null);
	const [loading, setLoading] = useState(false);

	// Read language from localStorage (client)
	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedLang = localStorage.getItem("lang");
			setLang(storedLang === "ar" ? "ar" : "en");
		}
	}, []);

	// Fetch bus booking data when lang is known
	// useEffect(() => {
	// 	let active = true;
	// 	async function fetchData() {
	// 		try {
	// 			setLoading(true);
	// 			const res = await fetch(
	// 				`${API_BASE_URL}/landing/home/bus-booking-data`,
	// 				{
	// 					headers: { lang },
	// 				}
	// 			);
	// 			if (!res.ok)
	// 				throw new Error(`Failed to load bus-booking-data: ${res.status}`);
	// 			const json = await res.json();

	// 			if (active) setBusData(json);
	// 			// console.log("Fetched bus booking data:", json);
	// 		} catch (err) {
	// 			console.error("Error fetching bus booking data:", err);
	// 			if (active) setBusData(null);
	// 		} finally {
	// 			if (active) setLoading(false);
	// 		}
	// 	}
	// 	if (lang) fetchData();
	// 	return () => {
	// 		active = false;
	// 	};
	// }, [lang]);

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
			<div className=" bg-[#fafbfc] py-8" >
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex flex-col-reverse md:flex-row  gap-8 md:gap-12">

						{/*  Booking Flow */}
						<div className="md:w-[60%] flex flex-col gap-6">
							{/* Booking Form */}
							<BookingForm />

							{/* Price Calculation */}
							<PriceCalculationBox
								pricePerPerson={99}
								numberOfPeople={5}
								totalPrice={249}
							/>

							{/* Customer Info */}
							<CustomerInfoFields />

							{/* Action Buttons */}
							<ActionButtons />
						</div>

						{/*  Trip Summary */}
						<div className="md:w-[40%] flex flex-col gap-6">
							<TripSummaryCard {...tripData} />
						</div>

						
					</div>
				</div>
			</div>
		</div>
	);
}
