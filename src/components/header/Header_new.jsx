"use client";

import { Menu, X, Globe, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	// Don't render the header on the custome page
	if (
		pathname === "/saad-alqurashi" ||
		pathname === "/saad-new" ||
		pathname === "/special-tour" ||
		pathname === "/raslania" ||
		pathname.startsWith("/hotel/")
	) {
		return null;
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
			<div className="bg-[#3C6652] text-white py-2">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div
						className="flex flex-col md:flex-row items-center justify-between text-sm"
						
						style={{ fontFamily: '"Readex Pro", sans-serif' }}
					>
						<div className="flex items-center gap-6">
							<div className="flex items-center gap-2">
								<Phone size={14} />
								<span style={{ fontFamily: '"Readex Pro", sans-serif' }}>
									+966 12 345 6789
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Mail size={14} />
								<span style={{ fontFamily: '"Readex Pro", sans-serif' }}>
									info@mzar.sa
								</span>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Globe size={14} />
							<button
								className="hover:text-[#E7D3AF] transition-colors"
								style={{ fontFamily: '"Readex Pro", sans-serif' }}
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
								style={{ fontFamily: '"Readex Pro", sans-serif' }}
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
						</div>
					</div>
				</div>
			</div>

			{/* Main Header */}
			<div className="bg-white shadow-md sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-20" >
						{/* Logo - positioned right in  */}
						<div className="flex-shrink-0">
							<Link href="/">
								<img
									src="/Home/header-logo.png"
									alt="logo"
									width={138}
									height={46}
								/>
							</Link>
						</div>

						{/* Desktop Navigation -  */}
						<nav
							className="hidden lg:flex items-center gap-8"
							style={{
								fontFamily: '"Readex Pro", sans-serif',
								fontWeight: 500,
							}}
						>
							<a
								href="#home"
								className="text-[#3C6652] hover:text-[#867957] transition-colors"
							>
								{isAr ? 'الرئيسية' : 'Home'}
							</a>
							<a
								href="#trips"
								className="text-[#3C6652] hover:text-[#867957] transition-colors"
							>
								{isAr ? 'الجولات' : 'Trips'}
							</a>
							<a
								href="#routes"
								className="text-[#3C6652] hover:text-[#867957] transition-colors"
							>
								{isAr ? 'المسارات' : 'Routes'}
							</a>
							<a
								href="#bookings"
								className="text-[#3C6652] hover:text-[#867957] transition-colors"
							>
								{isAr ? 'الحجوزات' : 'Bookings'}
							</a>
							<a
								href="#contact"
								className="text-[#3C6652] hover:text-[#867957] transition-colors"
							>
								{isAr ? 'تواصل معنا' : 'Contact Us'}
							</a>
						</nav>

						{/* Desktop CTA */}
						<div className="hidden lg:flex items-center gap-4">
							<button
								className="bg-[#3C6652] text-white px-8 py-3 rounded-lg hover:bg-[#1E3A5F] transition-all shadow-md hover:shadow-lg"
								style={{
									fontFamily: '"Readex Pro", sans-serif',
									fontWeight: 500,
								}}
							>
								{isAr ? 'احجز الآن' : 'Book Now'}
							</button>
						</div>

						{/* Mobile menu button */}
						<button
							className="lg:hidden text-[#3C6652]"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
						</button>
					</div>

					{/* Mobile Navigation */}
					{mobileMenuOpen && (
						<div className="lg:hidden py-4 border-t text-center" >
							<nav
								className="flex flex-col gap-4"
								style={{
									fontFamily: '"Readex Pro", sans-serif',
									fontWeight: 500,
								}}
							>
								<a
									href="#home"
									className="text-[#3C6652] hover:text-[#857856] transition-colors"
								>
									{isAr ? 'الرئيسية' : 'Home'}
								</a>
								<a
									href="#trips"
									className="text-[#3C6652] hover:text-[#857856] transition-colors"
								>
									{isAr ? 'الجولات' : 'Trips'}
								</a>
								<a
									href="#routes"
									className="text-[#3C6652] hover:text-[#857856] transition-colors"
								>
									{isAr ? 'المسارات' : 'Routes'}
								</a>
								<a
									href="#bookings"
									className="text-[#3C6652] hover:text-[#857856] transition-colors"
								>
									{isAr ? 'الحجوزات' : 'Bookings'}
								</a>
								<a
									href="#contact"
									className="text-[#3C6652] hover:text-[#857856] transition-colors"
								>
									{isAr ? 'تواصل معنا' : 'Contact Us'}
								</a>
								<button
									className="bg-[#3C6652] text-white px-6 py-3 rounded-lg hover:bg-[#1E3A5F] transition-colors"
									style={{
										fontFamily: '"Readex Pro", sans-serif',
										fontWeight: 500,
									}}
								>
									{isAr ? 'احجز الآن' : 'Book Now'}
								</button>
							</nav>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
