"use client";

import { Menu, X, Globe, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image'

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	// Don't render the header on the custome page
	if (
		pathname === "/saad-alqurashi" ||
		pathname === "/saad-new" ||
		pathname === "/special-tour" ||
		pathname === "/raslania" 
	) {
		return null;
	}

	let showMenue = true;
	if (pathname.startsWith("/hotel/")) {
		showMenue = false;
	}

	let [lang, setLang] = useState("en");
	useEffect(() => {
		if (typeof window !== "undefined") {
			let currentLang = localStorage.getItem("lang");
			if (currentLang === "ar" || currentLang === "en") {
				setLang(currentLang);
			} else {
				localStorage.setItem("lang", "en");
				setLang("en");
				currentLang = "en";
			}
			// Always set the cookie to match localStorage
			const oneYear = 60 * 60 * 24 * 365;
			const isHTTPS = window.location.protocol === "https:";
			document.cookie = `lang=${currentLang}; path=/; max-age=${oneYear}; samesite=lax${
				isHTTPS ? "; secure" : ""
			}`;
		}
	}, [lang]);
	const isAr = lang === "ar";

	return (
		<>
			{/* Top Bar */}
			<div className="bg-[#3C6652] text-white py-2" dir={isAr ? "rtl" : "ltr"}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row items-center justify-between text-sm">
						<div className="flex items-center justify-center gap-2 flex-wrap mb-2 md:mb-0">
							<a
								href="mailto:contact@mzarapp.com"
								className="flex items-center gap-1 hover:underline"
							>
								<i className="fa-solid fa-envelope"></i>
								contact@mzarapp.com
							</a>
							<a
								href="tel:920005785"
								className="flex items-center gap-1 hover:underline"
							>
								<i className="fa-solid fa-phone"></i>
								920005785
							</a>
							<a
								href="https://wa.me/+966580121025"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1 hover:underline"
							>
								<i className="fa-brands fa-whatsapp"></i>
								+966580121025
							</a>
						</div>
						<div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
							<div className="flex items-center gap-4">
								<a
									href="https://www.youtube.com/@mzarapp"
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fa-brands fa-youtube text-white"></i>
								</a>
								<a
									href="https://www.instagram.com/mzarapp/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fa-brands fa-instagram text-white"></i>
								</a>
								<a
									href="https://www.facebook.com/mzarapp"
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fa-brands fa-facebook text-white"></i>
								</a>
								{/* LinkedIn, TikTok, and X */}
								<a
									href="https://www.linkedin.com/company/mzarapp"
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fa-brands fa-linkedin text-white"></i>
								</a>
								<a
									href="https://www.tiktok.com/@mzarapp"
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fa-brands fa-tiktok text-white"></i>
								</a>
								<a
									href="https://x.com/mzarapp"
									target="_blank"
									rel="noopener noreferrer"
								>
									<i className="fa-brands fa-x-twitter text-white"></i>
								</a>
							</div>
							<div className="flex items-start gap-2">
								<button
									className="hover:text-[#E7D3AF] transition-colors"
									onClick={() => {
										const nextLang = "ar";

										// Keep localStorage
										localStorage.setItem("lang", nextLang);

										// Also set a cookie for server-side usage (1 year)
										const oneYear = 60 * 60 * 24 * 365;
										const isHTTPS =
											typeof window !== "undefined" &&
											window.location.protocol === "https:";
										document.cookie = `lang=${nextLang}; path=/; max-age=${oneYear}; samesite=lax${
											isHTTPS ? "; secure" : ""
										}`;

										setLang(nextLang);

										window.location.reload();
									}}
								>
									العربية
								</button>
								<span>|</span>
								<button
									className="hover:text-[#E7D3AF] transition-colors"
									onClick={() => {
										const nextLang = "en";

										// Keep localStorage
										localStorage.setItem("lang", nextLang);

										// Also set a cookie for server-side usage (1 year)
										const oneYear = 60 * 60 * 24 * 365;
										const isHTTPS =
											typeof window !== "undefined" &&
											window.location.protocol === "https:";
										document.cookie = `lang=${nextLang}; path=/; max-age=${oneYear}; samesite=lax${
											isHTTPS ? "; secure" : ""
										}`;

										setLang(nextLang);

										window.location.reload();
									}}
								>
									EN
								</button>
								<Globe size={18} />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Header */}
			<div
				className="bg-white shadow-md sticky top-0 z-50"
				dir={isAr ? "rtl" : "ltr"}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className={`flex items-center ${showMenue ? "justify-between" : "justify-center"} h-20`}>
						{/* Logo - positioned right in  */}
						<div className="flex-shrink-0">
							<Link href="/">
								<Image
									src="/Home/header-logo.png"
									alt="logo"
									width={138}
									height={46}
									priority
								/>
							</Link>
						</div>

						{/* Desktop Navigation -  */}
						{showMenue && (
						<nav
							className="hidden lg:flex items-center gap-8"
							style={{
								fontWeight: 500,
							}}
						>
							<a
								href="/"
								className="text-[#3C6652] hover:text-[#867957] transition-colors"
							>
								{isAr ? "الرئيسية" : "Home"}
							</a>
							<a
								href="/all-trips"
								className="text-[#3C6652] hover:text-[#867957] transition-colors"
							>
								{isAr ? "التجارب" : "Experiences"}
							</a>
							<a
								href="/about-us"
								className="text-[#3C6652] hover:text-[#867957] transition-colors"
							>
								{isAr ? " من نحن" : "About Us"}
							</a>
							{/* <a
								href="#bookings"
								className="text-[#3C6652] hover:text-[#867957] transition-colors"
							>
								{isAr ? "الحجوزات" : "Bookings"}
							</a> */}
							<a
								href="/contact-us"
								className="text-[#3C6652] hover:text-[#867957] transition-colors"
							>
								{isAr ? "تواصل معنا" : "Contact Us"}
							</a>
						</nav>
						)}
						{/* Desktop CTA */}
						{showMenue && (
						<div className="hidden lg:flex items-center gap-4">
							<a href="/all-trips"
								className="bg-[#3C6652] text-white px-8 py-3 rounded-lg hover:bg-[#1E3A5F] transition-all shadow-md hover:shadow-lg"
								style={{
									
									fontWeight: 500,
								}}
							>
								{isAr ? "احجز الآن" : "Book Now"}
							</a>
						</div>
						)}

						{/* Mobile menu button */}
						{showMenue && (
						<button
							className="lg:hidden text-[#3C6652]"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
						</button>
						)}
					</div>

					{/* Mobile Navigation */}
					{mobileMenuOpen && (
						<div className="lg:hidden py-4 border-t text-center">
							<nav
								className="flex flex-col gap-4"
								style={{
									fontWeight: 500,
								}}
							>
								<a
									href="/"
									className="text-[#3C6652] hover:text-[#857856] transition-colors"
								>
									{isAr ? "الرئيسية" : "Home"}
								</a>
								<a
									href="/all-trips"
									className="text-[#3C6652] hover:text-[#857856] transition-colors"
								>
									{isAr ? "التجارب" : "Experiences"}
								</a>
									<a
										href="/about-us"
										className="text-[#3C6652] hover:text-[#857856] transition-colors"
									>
										{isAr ? " من نحن" : "About Us"}
									</a>
									{/* <a
										href="#bookings"
										className="text-[#3C6652] hover:text-[#857856] transition-colors"
									>
										{isAr ? "الحجوزات" : "Bookings"}
									</a> */}
								<a
									href="/contact-us"
									className="text-[#3C6652] hover:text-[#857856] transition-colors"
								>
									{isAr ? "تواصل معنا" : "Contact Us"}
								</a>
								<a href="/all-trips"
									className="bg-[#3C6652] text-white px-6 py-3 rounded-lg hover:bg-[#1E3A5F] transition-colors"
									style={{
										
										fontWeight: 500,
									}}
								>
									{isAr ? "احجز الآن" : "Book Now"}
								</a>
							</nav>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
