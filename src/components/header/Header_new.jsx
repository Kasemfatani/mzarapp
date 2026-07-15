"use client";

import { Menu, X, Globe, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCurrentLocale } from "@/lib/useLocale";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const router = useRouter();
	const {
		locale: lang,
		isAr,
		barePath: bare,
		localizedHref: l,
		getSwitchPath,
	} = useCurrentLocale();

	const [isWhatsModalOpen, setIsWhatsModalOpen] = useState(false);

	// Lock body scroll when modal is open
	useEffect(() => {
		if (isWhatsModalOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isWhatsModalOpen]);

	// Close on Escape key press
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") {
				setIsWhatsModalOpen(false);
			}
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, []);

	// Don't render the header on custom pages
	if (
		bare === "/saad-alqurashi" ||
		bare === "/saad-new" ||
		bare === "/special-tour" ||
		bare === "/raslania" ||
		bare === "/umrah" ||
		bare === "/saira"
	) {
		return null;
	}

	// hide fixed whatsapp on booking pages
	const hideFixedWhats =
		bare === "/book-tour" ||
		bare === "/book-haram" ||
		bare === "/book-madinah" ||
		bare.startsWith("/book-path") ||
		bare.startsWith("/book-tour") ||
		bare.startsWith("/trip-detail");

	let showMenue = true;
	if (bare.startsWith("/hotel/")) {
		showMenue = false;
	}

	let showTopBar = true;
	if (bare === "/mashair" || bare === "/haram") {
		showTopBar = false;
	}

	// Switch language by navigating to the same bare path under the other locale
	const switchLang = () => {
		if (bare.startsWith("/blog/")) {
		return ;
	}
		const nextLang = isAr ? "en" : "ar";
		const nextPath = getSwitchPath(nextLang);
		// router.push(nextPath);
		window.location.href = nextPath;
	};

	return (
		<>
			{/* Top Bar */}
			{showTopBar && (
				<div
					className="bg-[#3C6652] text-white py-2"
					dir={isAr ? "rtl" : "ltr"}
				>
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
								{/* second number */}
								<a
									href="https://wa.me/+966549177484"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1 hover:underline"
								>
									<i className="fa-brands fa-whatsapp"></i>
									+966549177484
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
										className="flex items-center gap-2 px-3 py-1 bg-transparent hover:text-[#E7D3AF] transition-colors rounded"
										onClick={switchLang}
										aria-label={
											isAr ? "Switch to English" : "التبديل إلى العربية"
										}
										aria-pressed={isAr}
									>
										<Globe size={18} />
										<span className="font-medium text-base">
											{isAr ? "العربية" : "EN"}
										</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Fixed WhatsApp button */}
			{!hideFixedWhats && (
				<button
					onClick={() => setIsWhatsModalOpen(true)}
					className="fixed-what border-none bg-transparent p-0 outline-none focus:outline-none cursor-pointer"
					aria-label="WhatsApp Channels"
					dir={isAr ? "rtl" : "ltr"}
				>
					<i className="fa-brands fa-whatsapp"></i>
				</button>
			)}

			{/* WhatsApp Selection Modal */}
			{isWhatsModalOpen && (
				<div 
					className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300 whats-fadeIn"
					onClick={() => setIsWhatsModalOpen(false)}
				>
					{/* Custom animations styling */}
					<style dangerouslySetInnerHTML={{__html: `
						@keyframes whatsFadeIn {
							from { opacity: 0; }
							to { opacity: 1; }
						}
						@keyframes whatsScaleUp {
							from { transform: scale(0.95); opacity: 0; }
							to { transform: scale(1); opacity: 1; }
						}
						.whats-fadeIn {
							animation: whatsFadeIn 0.2s ease-out forwards;
						}
						.whats-scaleUp {
							animation: whatsScaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
						}
					`}} />

					<div 
						className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full overflow-hidden shadow-2xl transform transition-all duration-300 scale-100 border border-gray-150 whats-scaleUp"
						onClick={(e) => e.stopPropagation()}
						dir={isAr ? "rtl" : "ltr"}
					>
						{/* Modal Header */}
						<div className="flex items-center justify-between border-b pb-4 px-6 pt-6 bg-gray-50/50">
							<div className="flex flex-col text-start">
								<h3 className="text-lg font-extrabold text-[#3C6652]">
									{isAr ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
								</h3>
								<p className="text-xs text-gray-500 mt-1">
									{isAr ? "اختر أحد أرقامنا المتاحة لبدء المحادثة" : "Select one of our active lines to start chatting"}
								</p>
							</div>
							<button 
								onClick={() => setIsWhatsModalOpen(false)}
								className="p-2 text-gray-400 hover:text-[#3C6652] hover:bg-gray-100 rounded-full transition-all duration-300"
								aria-label="Close modal"
							>
								<X size={20} />
							</button>
						</div>

						{/* Modal Body */}
						<div className="p-6 flex flex-col gap-4">
							{/* Option 1 */}
							<a
								href="https://wa.me/966580121025"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setIsWhatsModalOpen(false)}
								className="flex items-center justify-between p-4 bg-[#F8F9FA] hover:bg-[#3C6652]/5 border border-gray-150 hover:border-[#3C6652] rounded-2xl transition-all duration-300 group hover:shadow-md cursor-pointer"
							>
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shadow-md">
										<i className="fa-brands fa-whatsapp text-2xl"></i>
									</div>
									<div className="text-start">
										<span className="block text-sm font-bold text-gray-800">
											{isAr ? "الدعم والمبيعات 1" : "Support & Sales 1"}
										</span>
										<span className="block text-xs text-gray-500 mt-1 font-mono tracking-wider" dir="ltr">
											+966 58 012 1025
										</span>
									</div>
								</div>
								<div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#3C6652] flex items-center justify-center transition-all duration-300">
									{isAr ? (
										<ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300 transform group-hover:-translate-x-1" />
									) : (
										<ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1" />
									)}
								</div>
							</a>

							{/* Option 2 */}
							<a
								href="https://wa.me/966549177484"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setIsWhatsModalOpen(false)}
								className="flex items-center justify-between p-4 bg-[#F8F9FA] hover:bg-[#3C6652]/5 border border-gray-150 hover:border-[#3C6652] rounded-2xl transition-all duration-300 group hover:shadow-md cursor-pointer"
							>
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shadow-md">
										<i className="fa-brands fa-whatsapp text-2xl"></i>
									</div>
									<div className="text-start">
										<span className="block text-sm font-bold text-gray-800">
											{isAr ? "الدعم والمبيعات 2" : "Support & Sales 2"}
										</span>
										<span className="block text-xs text-gray-500 mt-1 font-mono tracking-wider" dir="ltr">
											+966 54 917 7484
										</span>
									</div>
								</div>
								<div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#3C6652] flex items-center justify-center transition-all duration-300">
									{isAr ? (
										<ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300 transform group-hover:-translate-x-1" />
									) : (
										<ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1" />
									)}
								</div>
							</a>
						</div>
					</div>
				</div>
			)}

			{/* Main Header */}
			<div
				className="bg-white shadow-md sticky top-0 z-50"
				dir={isAr ? "rtl" : "ltr"}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div
						className={`flex items-center ${showMenue ? "justify-between" : "justify-center"} h-20`}
					>
						{/* Logo */}
						<div className="flex-shrink-0">
							<Link href={l("/")}>
								<Image
									src="/Home/header-logo.png"
									alt="logo"
									width={138}
									height={46}
									priority
								/>
							</Link>
						</div>

						{/* Desktop Navigation */}
						{showMenue && (
							<nav
								className="hidden lg:flex items-center gap-8"
								style={{ fontWeight: 500 }}
							>
								<a
									href={l("/")}
									className="text-[#3C6652] hover:text-[#867957] transition-colors"
								>
									{isAr ? "الرئيسية" : "Home"}
								</a>
								<a
									href={l("/all-trips")}
									className="text-[#3C6652] hover:text-[#867957] transition-colors"
								>
									{isAr ? "التجارب" : "Experiences"}
								</a>
								<a
									href={l("/about-us")}
									className="text-[#3C6652] hover:text-[#867957] transition-colors"
								>
									{isAr ? " من نحن" : "About Us"}
								</a>
								<a
									href={l("/blogs")}
									className="text-[#3C6652] hover:text-[#867957] transition-colors"
								>
									{isAr ? "المقالات" : "Blogs"}
								</a>
								<a
									href={l("/contact-us")}
									className="text-[#3C6652] hover:text-[#867957] transition-colors"
								>
									{isAr ? "تواصل معنا" : "Contact Us"}
								</a>
							</nav>
						)}

						{/* Desktop CTA */}
						{showMenue && (
							<div className="hidden lg:flex items-center gap-4">
								<a
									href={l("/all-trips")}
									className="bg-[#3C6652] text-white px-8 py-3 rounded-lg hover:bg-[#1E3A5F] transition-all shadow-md hover:shadow-lg"
									style={{ fontWeight: 500 }}
								>
									{isAr ? "احجز الآن" : "Book Now"}
								</a>
								{!showTopBar && (
									<button
										className="flex items-center gap-2 px-3 py-1 bg-transparent hover:text-[#E7D3AF] transition-colors rounded"
										onClick={switchLang}
										aria-pressed={isAr}
									>
										<Globe size={18} />
										<span className="font-medium text-base">
											{isAr ? "العربية" : "EN"}
										</span>
									</button>
								)}
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
							<nav className="flex flex-col gap-4" style={{ fontWeight: 500 }}>
								<a
									href={l("/")}
									className="text-[#3C6652] hover:text-[#857856] transition-colors"
								>
									{isAr ? "الرئيسية" : "Home"}
								</a>
								<a
									href={l("/all-trips")}
									className="text-[#3C6652] hover:text-[#857856] transition-colors"
								>
									{isAr ? "التجارب" : "Experiences"}
								</a>
								<a
									href={l("/about-us")}
									className="text-[#3C6652] hover:text-[#857856] transition-colors"
								>
									{isAr ? " من نحن" : "About Us"}
								</a>
								<a
									href={l("/blogs")}
									className="text-[#3C6652] hover:text-[#857856] transition-colors"
								>
									{isAr ? "المقالات" : "Blogs"}
								</a>
								<a
									href={l("/contact-us")}
									className="text-[#3C6652] hover:text-[#857856] transition-colors"
								>
									{isAr ? "تواصل معنا" : "Contact Us"}
								</a>
								<a
									href={l("/all-trips")}
									className="bg-[#3C6652] text-white px-6 py-3 rounded-lg hover:bg-[#1E3A5F] transition-colors"
									style={{ fontWeight: 500 }}
								>
									{isAr ? "احجز الآن" : "Book Now"}
								</a>
								{!showTopBar && (
									<button
										className="flex items-center justify-center gap-2 px-3 py-1 bg-transparent hover:text-[#E7D3AF] transition-colors rounded"
										onClick={switchLang}
										aria-pressed={isAr}
									>
										<Globe size={18} />
										<span className="font-medium text-base">
											{isAr ? "العربية" : "EN"}
										</span>
									</button>
								)}
							</nav>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
