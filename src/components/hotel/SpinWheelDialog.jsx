"use client";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import DownloadButtons from "./DownloadButtons";

export default function SpinWheelDialog({
	open,
	onOpenChange,
	lang = "ar",
	name = "",
}) {
	const [mustSpin, setMustSpin] = useState(false);
	const [prizeNumber, setPrizeNumber] = useState(0);
	const [hasSpun, setHasSpun] = useState(false);
	const [winner, setWinner] = useState(null);

	const isAr = lang === "ar";

	const prizes = [
		{
			option: isAr
				? "ترقية المقعد في الحافلة"
				: "Upgrade the seat",
			style: { backgroundColor: "#f5e6d3", textColor: "#2c1810" },
		},
		{
			option: isAr ? "مشروبات مجانية في الجولة" : "Free drinks",
			style: { backgroundColor: "#fff", textColor: "#2c1810" },
		},
		{
			option: isAr ? "هدية من مزار" : "Gift from Mzar",
			style: { backgroundColor: "#f5e6d3", textColor: "#2c1810" },
		},
		{
			option: isAr ? "خصم 25%" : "25% discount",
			style: { backgroundColor: "#fff", textColor: "#2c1810" },
		},
		{
			option: isAr ? "جولة مجانية" : "Free tour",
			style: { backgroundColor: "#f5e6d3", textColor: "#2c1810" },
		},
		{
			option: isAr ? "خصم 50%" : "50% discount",
			style: { backgroundColor: "#fff", textColor: "#2c1810" },
		},
	];

	const t = {
		title: isAr ? "اكتشف هديتك الآن!" : "Discover your gift now!",
		spinButton: isAr ? "اضغط للدوران" : "Spin the Wheel",
		congrats: isAr ? "تهانينا!" : "Congratulations!",
		youWon: isAr ? "لقد فزت بـ:" : "You won:",
		close: isAr ? "إغلاق" : "Close",
    downloadApp: isAr ? "قم بتنزيل التطبيق للحصول على المزيد من العروض!" : "Download the app for more offers!",
	};

	const handleSpinClick = () => {
		if (!mustSpin && !hasSpun) {
			const newPrizeNumber = Math.floor(Math.random() * prizes.length);
			setPrizeNumber(newPrizeNumber);
			setMustSpin(true);
			setHasSpun(true);
		}
	};

	const handleStopSpinning = () => {
		setMustSpin(false);
		setWinner(prizes[prizeNumber].option);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className={`sm:max-w-[600px] bg-white max-h-[99vh] ${
					winner ? "overflow-y-auto" : ""
				} `}
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
					{/* Wheel */}
					<div className="relative mb-6">
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
							fontSize={isAr ? 14 : 16}
							textDistance={60}
							spinDuration={0.5}
						/>
					</div>

					{/* Spin button or Winner message */}
					{!winner ? (
						<button
							onClick={handleSpinClick}
							disabled={mustSpin || hasSpun}
							className={`px-8 py-3 rounded-full text-lg font-semibold text-white transition-all ${
								mustSpin || hasSpun
									? "bg-gray-400 cursor-not-allowed"
									: "bg-[var(--main-color)] hover:bg-[var(--sec-color)] hover:text-black"
							}`}
						>
							{t.spinButton}
						</button>
					) : (
						<div className={`text-center ${isAr ? 'rtl' : ''}`}>
							{isAr ? (
								<>
									<h3 className="text-2xl font-bold text-[#8B6F47] mb-2">
										🎉 مبارك {name ? name : ""}! حصلت على هديتك من مزار!
									</h3>
									<p className="text-lg mb-4 font-bold text-[var(--main-color)]">
										{winner}
									</p>
								</>
							) : (
								<>
									<h3 className="text-2xl font-bold text-[#8B6F47] mb-2">
										🎉 Congratulations{name ? `, ${name}` : ""}! You got your
										gift from Mzar!
									</h3>
									<h3 className="text-2xl mb-4 font-bold text-[var(--main-color)]">
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
				</div>
			</DialogContent>
		</Dialog>
	);
}
