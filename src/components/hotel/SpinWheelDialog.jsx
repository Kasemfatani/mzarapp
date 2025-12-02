"use client";
import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import DownloadButtons from "./DownloadButtons";
import Loading from "@/app/loading";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";

export default function SpinWheelDialog({
	open,
	onOpenChange,
	lang = "ar",
	client_name = "",
	country_code,
	mobile,
	partner_id,
}) {
	const [mustSpin, setMustSpin] = useState(false);
	const [prizeNumber, setPrizeNumber] = useState(0);
	const [hasSpun, setHasSpun] = useState(false);
	const [winner, setWinner] = useState(null);
	const [loading, setLoading] = useState(true);

	const [prizes, setPrizes] = useState([]);
	const [winnerId, setWinnerId] = useState(null);
	const [error, setError] = useState("");
	const [registering, setRegistering] = useState(false);

	const isAr = lang === "ar";

	const t = {
		title: isAr ? "اكتشف هديتك الآن!" : "Discover your gift now!",
		spinButton: isAr ? "اضغط للدوران" : "Spin the Wheel",
		congrats: isAr ? "تهانينا!" : "Congratulations!",
		youWon: isAr ? "لقد فزت بـ:" : "You won:",
		close: isAr ? "إغلاق" : "Close",
		downloadApp: isAr
			? "قم بتنزيل التطبيق للحصول على المزيد من العروض!"
			: "Download the app for more offers!",
		error: isAr
			? "حدث خطأ، يرجى المحاولة مرة أخرى."
			: "An error occurred, please try again.",
	};

	// Fetch wheel data on mount
	useEffect(() => {
		let active = true;
		async function fetchWheelData() {
			setLoading(true);
			setError("");
			try {
				const res = await fetch(`${API_BASE_URL_NEW}/landing/wheels/list`, {
					headers: { lang },
				});
				const json = await res.json();
				if (active && json.status && Array.isArray(json.data)) {
					console.log("Fetched wheel data:", json.data);
					// Alternate colors
					const colors = [
						// { backgroundColor: "#f5e6d3", textColor: "#2c1810" },
						{ backgroundColor: "#E7D3AF", textColor: "#3C6652" },
					];
					setPrizes(
						json.data.map((item, idx) => ({
							id: item.id,
							option: item.name,
							style: {
								...colors[0],
								
								
							},
						}))
					);
				} else {
					setError(t.error);
				}
			} catch (err) {
				console.error("Error fetching wheel data:", err);
				setError(t.error);
			} finally {
				if (active) setLoading(false);
			}
		}
		if (open) fetchWheelData();
		return () => {
			active = false;
		};
	}, [open]);

	// Spin button click: get winner from API, spin wheel
	const handleSpinClick = async () => {
		if (hasSpun || mustSpin || loading || prizes.length === 0) return;
		setError("");
		// setLoading(true);
		try {
			const res = await fetch(`${API_BASE_URL_NEW}/landing/wheels/winner`);
			const json = await res.json();
			if (json.status && json.data && json.data.id) {
				console.log("Fetched winner data:", json.data);
				const winId = json.data.id;
				setWinnerId(winId);
				const idx = prizes.findIndex((p) => p.id === winId);
				setPrizeNumber(idx >= 0 ? idx : 0);
				setMustSpin(true);
				setHasSpun(true);
			} else {
				setError(t.error);
			}
		} catch (err) {
			console.error("Error fetching winner:", err);
			setError(t.error);
		} finally {
			setLoading(false);
		}
	};

	// After wheel stops, set winner and call register API (POST)
	const handleStopSpinning = async () => {
		setMustSpin(false);
		const winPrize = prizes[prizeNumber];
		setWinner(winPrize?.option || "");
		if (winPrize && mobile && country_code && client_name) {
			setRegistering(true);
			setError("");
			console.log("body:", mobile, country_code, client_name, winPrize.id , partner_id);
			try {
				const res = await fetch(`${API_BASE_URL_NEW}/landing/wheels/register`, {
					method: "POST",
					headers: { "Content-Type": "application/json" , lang },
					body: JSON.stringify({
						mobile,
						country_code,
						client_name,
						wheel_id: winPrize.id,
						partner_id,
					}),
				});
				
				const json = await res.json();
				console.log("Registered winner response:", json);
				if (!json.status) {
					setError(t.error);
				}
			} catch (err) {
				console.error("Error registering winner:", err);
				setError(t.error);
			} finally {
				setRegistering(false);
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className={`sm:max-w-[600px] bg-white max-h-[99vh] ${
					winner ? "overflow-y-auto" : ""
				}`}
			>
				<DialogHeader>
					<DialogTitle
						className={`text-2xl md:text-3xl font-bold text-center text-[#8B6F47] ${
							isAr ? "font-arabic" : ""
						}`}
					>
						{t.title}
					</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col items-center justify-center ">
					{loading ? (
						<Loading />
					) : error ? (
						<div className="text-red-600 text-center mb-4">{error}</div>
					) : (
						<>
							{/* Wheel */}
							<div className="relative mb-6 w-full flex justify-center">
								<Wheel
									mustStartSpinning={mustSpin}
									prizeNumber={prizeNumber}
									data={prizes}
									onStopSpinning={handleStopSpinning}
									outerBorderColor="#2c1810"
									outerBorderWidth={8}
									innerBorderColor="#2c1810"
									innerBorderWidth={2}
									radiusLineColor="#2c1810"
									radiusLineWidth={2}
									fontSize={13} // smaller font for long text
									textDistance={45}
									spinDuration={0.5}
									perpendicularText={true}
								/>
							</div>

							{/* Spin button or Winner message */}
							{!winner ? (
								<button
									onClick={handleSpinClick}
									disabled={
										mustSpin || hasSpun || loading || prizes.length === 0
									}
									className={`px-8 py-3 rounded-full text-lg font-semibold text-white transition-all ${
										mustSpin || hasSpun || loading || prizes.length === 0
											? "bg-gray-400 cursor-not-allowed"
											: "bg-[var(--main-color)] hover:bg-[var(--sec-color)] hover:text-black"
									}`}
								>
									{t.spinButton}
								</button>
							) : (
								<div className={`text-center ${isAr ? "rtl" : ""}`}>
									{registering && <Loading />}
									{isAr ? (
										<>
											<h3 className="text-2xl font-bold text-[#8B6F47] mb-2">
												🎉 مبارك {client_name ? client_name : ""}! حصلت على
												هديتك من مزار!
											</h3>
											<p
												className="text-lg mb-4 font-bold text-[var(--main-color)]"
												style={{
													whiteSpace: "pre-line",
													wordBreak: "break-word",
												}}
											>
												{winner}
											</p>
										</>
									) : (
										<>
											<h3 className="text-2xl font-bold text-[#8B6F47] mb-2">
												🎉 Congratulations
												{client_name ? `, ${client_name}` : ""}! You got your
												gift from Mzar!
											</h3>
											<h3
												className="text-2xl mb-4 font-bold text-[var(--main-color)]"
												style={{
													whiteSpace: "pre-line",
													wordBreak: "break-word",
												}}
											>
												{winner}
											</h3>
										</>
									)}
									<h3>{t.downloadApp}</h3>
									<DownloadButtons language={lang} />
									<br />
									<button
										onClick={() => onOpenChange(false)}
										className="px-16 py-2 rounded-xl bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black transition-colors"
									>
										{t.close}
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
