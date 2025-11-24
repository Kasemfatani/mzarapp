"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Globe } from "lucide-react"; // NEW
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// Assets
import heroBg from "/public/hotel/hero-bg.webp";
import appLogo from "/public/Home/footer-logo.png";
import hotelLogo from "/public/hotel/hotel_logo.png";
// import royalCommission from "/public/conf/royal-commission.webp";
import giftImg from "/public/hotel/gift.png";

const SpinWheelDialog = dynamic(() => import("./SpinWheelDialog"), {
	ssr: false,
});

export default function Hero({ initialLang , partner_id , hotelLogoSrc, promo_code }) {
	const [language] = useState(initialLang || "ar");
	const [name, setName] = useState("");
	const [whatsApp, setWhatsApp] = useState("");
	const [countryCode, setCountryCode] = useState("");
	const [showWheel, setShowWheel] = useState(false);

	//  store the national number (digits only, no country code) separately
	const [whatsappNational, setWhatsappNational] = useState("");

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const menuRef = useRef(null);

	const isAr = language === "ar";

	const t = {
		nav: isAr
			? [
					{ label: "الرئيسية", href: "/" },
					{ label: "خدمات", href: "/#services" },
					{ label: "لماذا مزار؟", href: "/#why" },
			  ]
			: [
					{ label: "Home", href: "/" },
					{ label: "Services", href: "/#services" },
					{ label: "Why Mzar?", href: "/#why" },
			  ],
		getApp: isAr ? "احصل على التطبيق" : "Get the App",
		giftHead: isAr ? "احصل على هديتك الحصرية!" : "Get your exclusive gift!",
		giftSub: isAr
			? "استكشف معالم مكة التاريخية والإثرائية مع مزار"
			: "Explore Makkah's historic and enriching landmarks with Mzar",
		namePh: isAr ? "اسمك الكريم" : "Your Name",
		waPh: isAr ? "966 رقم تواصل الواتساب" : "WhatsApp Number 966",
		cta: isAr ? "اكتشف هديتك الآن !" : "Discover your gift now!",
		waWarning: isAr
			? "يرجى إدخال رقم واتساب  على الأقل 8 أرقام."
			: "Please enter a valid WhatsApp number with at least 8 digits.",
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// Parse WhatsApp number
		const phoneParsed = parsePhoneNumberFromString(whatsApp || "");
		const stripLeadingZero = (num) =>
			num && num.startsWith("0") ? num.replace(/^0+/, "") : num;
		const normalizeDigits = (num) =>
			num ? String(num).replace(/\D/g, "") : "";

		// national number (digits only, no country code)
		const whatsappNumber = phoneParsed
			? stripLeadingZero(phoneParsed.nationalNumber)
			: stripLeadingZero(normalizeDigits(whatsApp));

		
		// store the national number to send to the backend
		setWhatsappNational(whatsappNumber);

		if (!whatsappNumber || whatsappNumber.length < 8) {
			alert(t.waWarning);
			return;
		}

		const whatsappCountryCode = phoneParsed
			? phoneParsed.countryCallingCode
			: "";
		setCountryCode(whatsappCountryCode);
	

		setShowWheel(true);
	};

	// save promo_code to localStorage
	useEffect(() => {
    if (promo_code) {
        localStorage.setItem("partnerPromoCode", promo_code);
    }
}, [promo_code]);

	// Close mobile menu when clicking outside
	useEffect(() => {
		if (!mobileMenuOpen) return;
		const handleClick = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setMobileMenuOpen(false);
			}
		};
		// switch to 'click' so the button's onClick stopPropagation wins
		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick);
	}, [mobileMenuOpen]);

	// NEW: same behavior as Header.jsx
	const toggleLang = () => {
		if (typeof window === "undefined") return;
		const current = localStorage.getItem("lang") === "ar" ? "ar" : "en";
		const nextLang = current === "en" ? "ar" : "en";

		localStorage.setItem("lang", nextLang);

		const oneYear = 60 * 60 * 24 * 365;
		const isHTTPS = window.location.protocol === "https:";
		document.cookie = `lang=${nextLang}; path=/; max-age=${oneYear}; samesite=lax${
			isHTTPS ? "; secure" : ""
		}`;

		window.location.reload();
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
					<nav
						className={`relative flex  justify-between ${
							mobileMenuOpen ? "mb-0" : "mb-12"
						} md:mb-0 `}
					>
						{/* Right (in RTL): Logo */}
						<div className="pt-2 ">
							<Link
								href="#"
								className="shrink-0 inline-flex items-center gap-2 "
							>
								<Image
									src={appLogo}
									alt="MZAR Logo"
									width={140}
									height={60}
									className="h-8 w-auto"
									priority
								/>
							</Link>
						</div>

						{/* Center: Nav (desktop only) */}
						<ul className="center-nav pointer-events-auto hidden md:flex justify-center items-center gap-8 text-black  bg-gray-300 w-[50%]">
							{t.nav.map((item) => (
								<li key={item.label}>
									<Link
										href={item.href}
										className="hover:text-[var(--main-color)] transition-colors"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>

						{/* Left (in RTL): Get the app  (desktop only)*/}
						<div className="pt-2 hidden md:flex items-center gap-2">
							<Link
								href="https://onelink.to/yb2xky"
								target="_blank"
								rel="noopener noreferrer"
								className="shrink-0 inline-flex items-center gap-2 text-white border border-white/60 hover:border-white rounded-full px-4 py-2 text-sm"
							>
								<span className="text-lg leading-none">⤓</span>
								{isAr ? "احصل على التطبيق" : "Get the App"}
							</Link>

							{/* Language toggle icon (desktop) */}
							<button
								type="button"
								aria-label={isAr ? "تغيير اللغة" : "Toggle language"}
								onClick={toggleLang}
								className="inline-flex items-center justify-center text-white border border-white/60 hover:border-white rounded-full p-2"
								title={isAr ? "تغيير اللغة" : "Toggle language"}
							>
								<Globe size={18} />
							</button>
						</div>

						{/* Mobile menu icon (only on small screens) */}
						<button
							type="button"
							className="md:hidden flex items-center justify-center p-2 rounded-full border border-white/40 text-white bg-black/30 hover:bg-black/60 transition"
							aria-label={isAr ? "القائمة" : "Menu"}
							onClick={(e) => {
								e.stopPropagation();
								setMobileMenuOpen((v) => !v);
							}}
						>
							{/* Hamburger icon */}
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none">
								<rect y="5" width="24" height="2" rx="1" fill="currentColor" />
								<rect y="11" width="24" height="2" rx="1" fill="currentColor" />
								<rect y="17" width="24" height="2" rx="1" fill="currentColor" />
							</svg>
						</button>
					</nav>

					{/* Mobile menu dropdown */}
					{mobileMenuOpen && (
						<div
							ref={menuRef}
							className="md:hidden absolute w-[80%] z-30 mx-4 rounded-2xl bg-white/95 shadow-2xl border border-gray-200 flex flex-col items-stretch gap-2 py-4 px-4 animate-fade-in text-center"
						>
							{t.nav.map((item) => (
								<Link
									key={item.label}
									href={item.href}
									onClick={() => setMobileMenuOpen(false)}
									className="py-2 px-3 rounded-lg text-[var(--main-color)] font-semibold text-base hover:bg-gray-100 transition"
								>
									{item.label}
								</Link>
							))}
							<hr className="my-2" />
							{/* Row: Get App + Language toggle (mobile) */}
							<div className="flex flex-col items-center justify-center gap-3">
								<Link
									href="https://onelink.to/yb2xky"
									onClick={(e) => {
										setMobileMenuOpen(false);
									}}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-[var(--main-color)] border border-[var(--main-color)] rounded-full px-4 py-2 text-sm font-semibold justify-center hover:bg-[var(--main-color)] hover:text-white transition"
								>
									<span className="text-lg leading-none">⤓</span>
									{isAr ? "احصل على التطبيق" : "Get the App"}
								</Link>
								<button
									type="button"
									aria-label={isAr ? "تغيير اللغة" : "Toggle language"}
									onClick={() => {
										setMobileMenuOpen(false);
										toggleLang();
									}}
									className="inline-flex items-center justify-center text-[var(--main-color)] border border-[var(--main-color)] rounded-full p-2 hover:bg-[var(--main-color)] hover:text-white transition"
									title={isAr ? "تغيير اللغة" : "Toggle language"}
								>
									<Globe size={18} />
								</button>
							</div>
						</div>
					)}
				</div>

				<div className="container mx-auto px-4 flex-1 flex items-center justify-start">
					{/* Center content */}
					<div className="w-full text-white text-start ">
						{/*  logos row */}
						<div className="flex items-center justify-start gap-6 md:gap-10 mb-7 md:mb-12">
							<Image
								src={hotelLogoSrc || hotelLogo}
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
								className="flex-1 rounded-sm !bg-white/15 !text-white text-center placeholder-white  border border-white/50 outline-none px-4 py-3 md:py-4"
								dir={isAr ? "rtl" : "ltr"}
								required
							/>
							<div id="hotel_landing" className="flex-1" dir="ltr">
								<PhoneInput
									defaultCountry="sa"
									value={whatsApp}
									onChange={setWhatsApp}
									className="w-full"
									forceDialCode={true}
									inputClassName="rounded-2xl !bg-white/15 !text-white text-center placeholder-white/70 border border-white/25 focus:border-white/50 outline-none px-4 py-3 md:py-4 w-full"
									placeholder={t.waPh}
									required
								/>
							</div>
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
				client_name={name}
				country_code={countryCode}
				// pass national number (digits only) — not the PhoneInput's display value
				mobile={whatsappNational}
				partner_id={partner_id}
			/>
		</>
	);
}
