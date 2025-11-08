"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
// import SpinWheelDialog from "./SpinWheelDialog";

// Assets
import heroBg from "/public/hotel/hero-bg.webp";
import appLogo from "/public/Home/footer-logo.png";
import hotelLogo from "/public/hotel/hotel_logo.png";
import royalCommission from "/public/conf/royal-commission.webp";
import giftImg from "/public/hotel/gift.png";

const SpinWheelDialog = dynamic(() => import("./SpinWheelDialog"), { ssr: false });

export default function Hero({ initialLang }) {
	const [language] = useState(initialLang || "ar");
	const [name, setName] = useState("");
	const [whatsApp, setWhatsApp] = useState("");
	const [showWheel, setShowWheel] = useState(false);

	const isAr = language === "ar";

	const t = {
		nav: isAr
			? ["الرئيسية", "خدمات", "لماذا مزار؟"]
			: ["Home", "Services", "Why Mzar?"],
		getApp: isAr ? "احصل على التطبيق" : "Get the App",
		giftHead: isAr ? "احصل على هديتك الحصرية!" : "Get your exclusive gift!",
		giftSub: isAr
			? "استكشف معالم مكة التاريخية والإثرائية مع مزار"
			: "Explore Makkah's historic and enriching landmarks with Mzar",
		namePh: isAr ? "اسمك الكريم" : "Your Name",
		waPh: isAr ? "+966 رقم تواصل الواتساب" : "WhatsApp Number +966",
		cta: isAr ? "اكتشف هديتك الآن !" : "Discover your gift now!",
	};

	const onSubmit = (e) => {
		e.preventDefault();
		// Show the spin wheel dialog
		setShowWheel(true);
		// You can send the data to your API here
		// console.log({ name, whatsApp });
	};

	return (
		<>
			<section
				id="hero-hotel"
				className="relative md:min-h-screen min-h-[70vh] w-full overflow-hidden flex flex-col "
			>
				{/* Background */}
				<div className="absolute inset-0 -z-10">
					<Image
						src={heroBg}
						alt="hero background"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black/45 md:bg-black/50" />
				</div>

				<div className="container mx-auto px-4 ">
					{/* Top bar */}
					<nav className={`relative flex  justify-between `}>
						{/* Right (in RTL): Logo */}
						<div className="pt-2 ">
							<Link
								href="/"
								className="shrink-0 inline-flex items-center gap-2 "
							>
								<Image
									src={appLogo}
									alt="MZAR Logo"
									width={120}
									height={40}
									className="h-8 w-auto"
									priority
								/>
							</Link>
						</div>

						{/* Center: Nav */}
						<ul className="center-nav pointer-events-auto hidden md:flex justify-center items-center gap-8 text-black  bg-gray-300 w-[50%]">
							{t.nav.map((label) => (
								<li key={label}>
									<Link
										href="#"
										onClick={(e) => e.preventDefault()}
										className="hover:text-[var(--main-color)] transition-colors"
									>
										{label}
									</Link>
								</li>
							))}
						</ul>

						{/* Left (in RTL): Get the app */}
						<div className="pt-2 ">
							<Link
								href="#"
								onClick={(e) => e.preventDefault()}
								className="shrink-0 inline-flex items-center gap-2 text-white border border-white/60 hover:border-white rounded-full px-4 py-2 text-sm"
							>
								<span className="text-lg leading-none">⤓</span>
								{t.getApp}
							</Link>
						</div>
					</nav>
				</div>

				<div className="container mx-auto px-4 flex-1 flex items-center justify-start">
					{/* Center content */}
					<div className="w-full text-white text-start ">
						{/* Three logos row */}
						<div className="flex items-center justify-start gap-6 md:gap-10 mb-7 md:mb-12">
							<Image
								src={hotelLogo}
								alt="Hotel Logo"
								width={120}
								height={48}
								className="h-10 w-auto brightness-110"
							/>
							<Image
								src={appLogo}
								alt="MZAR Logo"
								width={120}
								height={48}
								className="h-10 w-auto"
							/>
						</div>

						{/* Gift heading */}
						<div
							className={` max-w-3xl flex items-center justify-start gap-3  mb-6 md:mb-16 `}
						>
							<Image
								src={giftImg}
								alt="gift"
								width={42}
								height={42}
								className=" w-14"
							/>
							<h1 className="text-2xl md:text-5xl font-extrabold !leading-snug">
								{t.giftHead}
							</h1>
						</div>

						{/* Sub text */}
						<p className="text-sm md:text-lg text-gray-200 mb-6 md:mb-8">
							{t.giftSub}
						</p>

						{/* Inputs + CTA */}
						<form
							onSubmit={onSubmit}
							className={`w-full  flex flex-col md:flex-row items-stretch justify-center gap-3 md:gap-4 backdrop-blur-sm bg-white/10 p-2  rounded-2xl`}
						>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder={t.namePh}
								className="flex-1 rounded-2xl bg-white/15 text-white text-center placeholder-white/70  border border-white/25 focus:border-white/50 outline-none px-4 py-3 md:py-4"
								dir={isAr ? "rtl" : "ltr"}
								required
							/>
							<input
								type="tel"
								value={whatsApp}
								onChange={(e) => setWhatsApp(e.target.value)}
								placeholder={t.waPh}
								className="flex-1 rounded-2xl bg-white/15 text-white text-center placeholder-white/70  border border-white/25 focus:border-white/50 outline-none px-4 py-3 md:py-4"
								dir="ltr"
								required
							/>
							<button
								type="submit"
								className="flex-1 rounded-2xl px-6 py-3 md:py-4 font-semibold text-white bg-[var(--main-color)] hover:bg-[var(--sec-color)] hover:text-black transition-colors"
							>
								{t.cta}
							</button>
						</form>
					</div>
				</div>
			</section>

			{/* Spin Wheel Dialog */}
			<SpinWheelDialog
				open={showWheel}
				onOpenChange={setShowWheel}
				lang={language}
				name={name}
			/>
		</>
	);
}
