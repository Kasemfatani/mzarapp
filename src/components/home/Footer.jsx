"use client";
import React, { useEffect, useState } from "react"; // Importing React to use JSX syntax and create components.
// import c from "/public/c.svg";
import {
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
	X,
	Youtube,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

export default function Footer() {
	// Defining the main functional component named 'Footer'.
	const [language, setLanguage] = useState("en"); // Default language is 'en'
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [gclid, setGclid] = useState("");

	// Store gclid in localStorage if present in URL
	useEffect(() => {
		if (typeof window !== "undefined") {
			const urlGclid = searchParams.get("gclid");
			if (urlGclid) {
				localStorage.setItem("gclid", urlGclid);
				setGclid(urlGclid);
			} else {
				const stored = localStorage.getItem("gclid") || "";
				setGclid(stored);
			}
			setLanguage(localStorage.getItem("lang"));
		}
	}, [searchParams]);

	// Don't render the footer on the custome page
	if (
		pathname === "/saad-alqurashi" ||
		pathname === "/saad-new" ||
		pathname === "/raslania"
	) {
		return null;
	}

	return (
		<footer className={`${language === "en" ? "ltr" : "rtl"} mt-8 overflow-visible`}>
			{" "}
			{/* Main footer container with padding and background color */}
			{pathname !== "/path" && pathname !== "/makkah-mzar"
				? (() => {
						const whatsappText =
							language === "en"
								? `Hello, I am interested to know more about Mzar.${
										gclid ? ` Discount code (${gclid})` : ""
								  }`
								: `مرحبًا، أود معرفة المزيد عن مزار.${
										gclid ? ` رمز الخصم (${gclid})` : ""
								  }`;
						return (
							<a
								href={`https://wa.me/+966580121025?text=${encodeURIComponent(
									whatsappText
								)}`}
								className="fixed-what"
								target="_blank"
							>
								<i className="fa-brands fa-whatsapp"></i>
							</a>
						);
				  })()
				: null}
			<div className="container m-auto">
				<div className="flex flex-col items-center">
					{/* New top blue section */}
					<div className="w-[80%] rounded-2xl bg-[var(--sec-color)] flex flex-col md:flex-row items-center justify-between px-8 py-6 mb-8  -mt-[50px]">
						<div className="text-black font-bold text-xl md:text-2xl md:max-w-[60%]">
							{language === "en" ? (
								<>
									Mzar Is A Strategic Partner Of The Royal Commission For Makkah
									City And Holy Sites
								</>
							) : (
								<>
									مزار شريك استراتيجي للهيئة الملكية لمدينة مكة المكرمة والمشاعر
									المقدسة
								</>
							)}
						</div>
						<div className="flex flex-col items-end gap-2 mt-6 md:mt-0">
							<img
								src="/conf/royal-commission.webp"
								alt="Royal Commission"
								className="h-[107px]"
								style={{ objectFit: "contain" }}
								loading="lazy"
							/>
							{/* <div className="text-black text-sm md:text-base text-right leading-tight">
							<div className="font-bold">
								الهيئة الملكية لمدينة مكة المكرمة والمشاعر المقدسة
							</div>
							<div className="uppercase text-[#B5A16C] font-bold">
								ROYAL COMMISSION FOR
								<br />
								MAKKAH CITY AND HOLY SITES
							</div>
						</div> */}
						</div>
					</div>

					{/* New 3-column grid */}
					<div className="w-[80%] grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 justify-items-center">
						{/* Left: Logo + Social */}
						<div className="flex flex-col items-center md:items-start gap-4">
							<img src="/Home/footer-logo.png" alt="Mzar Logo" className="" width={187} />
							<div className="flex gap-4 mt-2">
								<Link href="https://x.com/mzarapp" target="_blank">
									<i className="fa-brands fa-x-twitter text-2xl text-white"></i>
								</Link>
								<Link href="https://www.instagram.com/mzarapp/" target="_blank">
									<i className="fa-brands fa-instagram text-2xl text-white"></i>
								</Link>
								<Link href="https://www.facebook.com/mzarapp" target="_blank">
									<i className="fa-brands fa-facebook text-2xl text-white"></i>
								</Link>
								<Link href="https://www.youtube.com/@mzarapp" target="_blank">
									<i className="fa-brands fa-youtube text-2xl text-white"></i>
								</Link>
								<Link href="https://www.tiktok.com/@mzarapp" target="_blank">
									<i className="fa-brands fa-tiktok text-2xl text-white"></i>
								</Link>
								<Link
									href="https://www.linkedin.com/company/mzarapp"
									target="_blank"
								>
									<i className="fa-brands fa-linkedin text-2xl text-white"></i>
								</Link>
							</div>
						</div>
						{/* Center: Website Links */}
						<div className="flex flex-col items-center md:items-start gap-2">
							<div className="font-bold text-lg mb-2 text-white">
								{language === "en" ? "Quick Links" : "روابط سريعة"}
							</div>
							<Link href="/" className="text-white hover:text-black">
								{language === "en" ? "Home" : "الرئيسية"}
							</Link>
							<Link href="/#paths" className="text-white hover:text-black">
								{language === "en" ? "Paths" : "المسارات"}
							</Link>
							<Link href="/#about" className="text-white hover:text-black">
								{language === "en" ? "About" : "من نحن"}
							</Link>
							<Link href="/#gallery" className="text-white hover:text-black">
								{language === "en" ? "Gallery" : "المعرض"}
							</Link>
							<Link href="/blogs" className="text-white hover:text-black">
								{language === "en" ? "Blogs" : "المقالات"}
							</Link>
							{/* Add more links if needed */}
							{/* <Link href="/book" className="text-white hover:text-black">
								{language === "en" ? "Book now" : "احجز الآن"}
							</Link> */}
						</div>
						{/* Right: Contact Us */}
						<div className="flex flex-col items-center md:items-start gap-2">
							<div className="font-bold text-lg mb-2 text-white">
								{language === "en" ? "Contact us" : "تواصل معنا"}
							</div>
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-phone text-white"></i>
								<a
									href="tel:920005785"
									className="ltr:ml-2 rtl:mr-2 text-white hover:underline"
									dir="ltr"
								>
									920005785
								</a>
							</div>
							<div className="flex items-center gap-2">
								<i className="fa-brands fa-whatsapp text-white"></i>
								<a
									href="https://wa.me/+966580121025"
									target="_blank"
									rel="noopener noreferrer"
									className="ltr:ml-2 rtl:mr-2 text-white hover:underline"
								>
									+966580121025
								</a>
							</div>
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-envelope text-white"></i>
								<a
									href="mailto:contact@mzarapp.com"
									className="ltr:ml-2 rtl:mr-2 text-white hover:underline"
								>
									contact@mzarapp.com
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Existing copyright bar */}
				<div className="footer-cont">
					<div className="copyRight">
						&copy;
						<p>
							{language === "en"
								? "Licensed by the Ministry of Tourism, license number 73104705 | Licensed Activity: Tour Organization"
								: "مرخصة من وزارة السياحة رقم الترخيص 73104705 | تنظيم الرحلات السياحية"}
						</p>
					</div>
					{/* Replace social with text */}
					<div className="text-white text-sm font-medium flex items-center">
						{language === "en" ? (
							<>CR: 4031282010</>
						) : (
							<>السجل التجاري : 4031282010</>
						)}
					</div>
				</div>
			</div>
		</footer>
	);
}
