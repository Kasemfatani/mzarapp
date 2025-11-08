"use client";
import React, { useEffect, useState, useCallback } from "react";
import logo from "/public/Home/header-logo.png";
import Image from "next/image";
import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
	const router = useRouter();
	const pathname = usePathname();

	// Don't render the header on the special-tour page
	if (pathname === "/special-tour") {
		return null;
	}

	// Don't render the header on the custome page
	if (
		pathname === "/saad-alqurashi" ||
		pathname === "/saad-new" ||
		pathname === "/raslania" 
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

	const handleAnchorClick = useCallback((e, hash) => {
		if (typeof window === "undefined") return;
		// if already on home page, prevent default nav and trigger lazy load + update hash
		if (window.location.pathname === "/") {
			e.preventDefault();
			// tell lazy wrappers to load
			window.dispatchEvent(new CustomEvent("mzar:anchor", { detail: hash }));
			// update URL (this triggers native scroll if element exists; lazy will handle if not)
			if (window.location.hash !== hash) window.location.hash = hash;
		}
		// else allow Link to navigate to "/" with the hash
	}, []);

	return (
		<>
			<div className="md:h-[34px] bg-[#857856] text-white text-sm">
				<div className="container m-auto flex flex-col md:flex-row items-center justify-between pt-2 gap-2 md:gap-0">
					{/* Left: Email and Phone */}
					<div className="flex items-center gap-4">
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
							dir="ltr"
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
					{/* Right: Social Icons */}
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
					</div>
				</div>
			</div>
			<header className={`${lang === "en" ? "ltr" : "rtl"} header`}>
				<div className="container m-auto flex items-center gap-2 justify-between">
					<Link href="/">
						{" "}
						<Image src={logo} alt="logo" className="" width={138} height={46} />
					</Link>
					<div className="links">
						<Link
							href="/"
							className={pathname === "/" ? "active" : "normal-Link"}
						>
							{lang === "en" ? "Home" : "الرئيسية"}
						</Link>
						<Link
							href="/#paths"
							onClick={(e) => handleAnchorClick(e, "#paths")}
							className={pathname === "/#paths" ? "active" : "normal-Link"}
						>
							{lang === "en" ? "Paths" : "المسارات"}
						</Link>
						<Link
							href="/#about"
							onClick={(e) => handleAnchorClick(e, "#about")}
							className={pathname === "/#about" ? "active" : "normal-Link"}
						>
							{lang === "en" ? "About" : "من نحن"}
						</Link>
						<Link
							href="/#gallery"
							onClick={(e) => handleAnchorClick(e, "#gallery")}
							className={pathname === "/#about" ? "active" : "normal-Link"}
						>
							{lang === "en" ? "Gallery" : "المعرض"}
						</Link>
						<Link
							href="/blogs"
							className={pathname === "/#about" ? "active" : "normal-Link"}
						>
							{lang === "en" ? "Blogs" : "المقالات"}
						</Link>
						{/* <Link href="/all-news" className={pathname === '/all-news' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'News' : 'الاخبار'}</Link> */}
						{pathname === "/" || pathname === "/tour" || pathname === "/haram" || pathname === "/madinah" ? (
							<Link href="/book" className="book-link-header">
								{lang === "en" ? "Book now" : "احجز الآن"}
							</Link>
						) : null}

						<div
							className="lang-btn"
							onClick={() => {
								const nextLang = lang === "en" ? "ar" : "en";

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

								if (pathname === "/blog") {
									router.push("/");
								} else {
									window.location.reload();
								}
							}}
						>
							{/* {lang === 'ar' ? 'En' : 'ع'} */}
							<Globe size={20} />
						</div>
					</div>

					<Menu
						className="menu-bars"
						onClick={() => {
							document
								.querySelector(".side-menu")
								.classList.toggle("side-menu-active");
							document.querySelector(".menu-bars").classList.toggle("hidden");
							document.querySelector(".menu-bars-X").classList.toggle("hidden");
						}}
					/>
					<X
						className="menu-bars-X hidden"
						onClick={() => {
							document
								.querySelector(".side-menu")
								.classList.toggle("side-menu-active");
							document.querySelector(".menu-bars").classList.toggle("hidden");
							document.querySelector(".menu-bars-X").classList.toggle("hidden");
						}}
					/>
					<div
						className="side-menu"
						onClick={() => {
							document
								.querySelector(".side-menu")
								.classList.toggle("side-menu-active");
							document.querySelector(".menu-bars").classList.toggle("hidden");
							document.querySelector(".menu-bars-X").classList.toggle("hidden");
						}}
					>
						<div className="links">
							<Link
								href="/"
								className={pathname === "/" ? "active" : "normal-Link"}
							>
								{lang === "en" ? "Home" : "الرئيسية"}
							</Link>
							<Link
								href="/#paths"
								onClick={(e) => handleAnchorClick(e, "#paths")}
								className={pathname === "/#paths" ? "active" : "normal-Link"}
							>
								{lang === "en" ? "Paths" : "المسارات"}
							</Link>
							<Link
								href="/#about"
								onClick={(e) => handleAnchorClick(e, "#about")}
								className={pathname === "/#about" ? "active" : "normal-Link"}
							>
								{lang === "en" ? "About" : "من نحن"}
							</Link>
							<Link
								href="/#gallery"
								onClick={(e) => handleAnchorClick(e, "#gallery")}
								className={pathname === "/#about" ? "active" : "normal-Link"}
							>
								{lang === "en" ? "Gallery" : "المعرض"}
							</Link>
							<Link
								href="/blogs"
								className={pathname === "/#about" ? "active" : "normal-Link"}
							>
								{lang === "en" ? "Blogs" : "المقالات"}
							</Link>
							<Link
								href="/all-news"
								className={pathname === "/all-news" ? "active" : "normal-Link"}
							>
								{lang === "en" ? "News" : "الاخبار"}
							</Link>
							<Link href="/book" className="book-link-header">
								{lang === "en" ? "Book now" : "احجز الآن"}
							</Link>
							<div
								className="lang-btn"
								onClick={() => {
									const nextLang = lang === "en" ? "ar" : "en";

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

									if (pathname === "/blog") {
										router.push("/");
									} else {
										window.location.reload();
									}
								}}
							>
								{/* {lang === 'ar' ? 'En' : 'ع'} */}
								<Globe size={20} />
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
