"use client";
import React, { useEffect, useState } from "react";
import logo from "../../assets/images/home/logo.svg";
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
			if (
				localStorage.getItem("lang") === "ar" ||
				localStorage.getItem("lang") === "en"
			) {
				setLang(localStorage.getItem("lang"));
			} else {
				localStorage.setItem("lang", "en");
				setLang("en");
			}
		}
	}, [lang]);
	return (
		<>
			<div className="md:h-[34px] bg-[#025AB4] text-white text-sm">
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
						<span className="flex items-center gap-1">
							<i className="fa-brands fa-whatsapp"></i>
							+966580121025
						</span>
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
						<Image src={logo} alt="logo" className="logo-img" />
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
							className={pathname === "/#paths" ? "active" : "normal-Link"}
						>
							{lang === "en" ? "Paths" : "المسارات"}
						</Link>
						<Link
							href="/#about"
							className={pathname === "/#about" ? "active" : "normal-Link"}
						>
							{lang === "en" ? "About" : "من نحن"}
						</Link>
						<Link
							href="/#gallery"
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
						{pathname === "/" ? (
							<Link href="/book" className="book-link">
								{lang === "en" ? "Book now" : "احجز الآن"}
							</Link>
						) : null}

						<div
							className="lang-btn"
							onClick={() => {
								if (lang === "en") {
									localStorage.setItem("lang", "ar");
									setLang("ar");
								} else {
									localStorage.setItem("lang", "en");
									setLang("en");
								}
								if (pathname === "/blog") {
									console.log("here");
									router.push("/");
								} else {
									window.location.reload(); // Reloads the page
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
								className={pathname === "/#paths" ? "active" : "normal-Link"}
							>
								{lang === "en" ? "Paths" : "المسارات"}
							</Link>
							<Link
								href="/#about"
								className={pathname === "/#about" ? "active" : "normal-Link"}
							>
								{lang === "en" ? "About" : "من نحن"}
							</Link>
							<Link
								href="/#about"
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
							<Link href="/book" className="book-link">
								{lang === "en" ? "Book now" : "احجز الآن"}
							</Link>
							<div
								className="lang-btn"
								onClick={() => {
									if (lang === "en") {
										localStorage.setItem("lang", "ar");
										setLang("ar");
									} else {
										localStorage.setItem("lang", "en");
										setLang("en");
									}
									if (pathname === "/blog") {
										console.log("here");
										router.push("/");
									} else {
										window.location.reload(); // Reloads the page
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
