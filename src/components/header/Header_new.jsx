"use client";

import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
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

	// Don't render the header on custom pages
	if (
		bare === "/saad-alqurashi" ||
		bare === "/saad-new" ||
		bare === "/special-tour" ||
		bare === "/raslania"
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
				<a
					href="https://wa.me/+966580121025"
					className="fixed-what"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="WhatsApp"
					dir={isAr ? "rtl" : "ltr"}
				>
					<i className="fa-brands fa-whatsapp"></i>
				</a>
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
