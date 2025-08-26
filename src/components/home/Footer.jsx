"use client";
import React, { useEffect, useState } from "react"; // Importing React to use JSX syntax and create components.
import c from "/public/c.svg";
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
		<footer className={`${language === "en" ? "ltr" : "rtl"}`}>
			{" "}
			{/* Main footer container with padding and background color */}
			{pathname != "/path"
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
				{" "}
				{/* Container for the footer content */}
				<div className="footer-cont">
					<div className="copyRight">
						<Image src={c} alt="Mazar" className="img" />
						<p>
							{language === "en"
								? "Licensed by the Ministry of Tourism ,license number 73104705"
								: "مرخصة من وزارة السياحة رقم الترخيص 73104705"}
						</p>
					</div>
					<div className="social">
						<Link href={"https://x.com/mzarapp"} target="_blank">
							<i className="fa-brands fa-x-twitter"></i>
						</Link>
						<Link href={"https://www.instagram.com/mzarapp/"} target="_blank">
							<i className="fa-brands fa-instagram"></i>
						</Link>
						<Link href={"https://www.facebook.com/mzarapp"} target="_blank">
							<i className="fa-brands fa-facebook"></i>
						</Link>
						<Link href={"https://www.youtube.com/@mzarapp"} target="_blank">
							<i className="fa-brands fa-youtube"></i>
						</Link>
						<Link href={"https://www.tiktok.com/@mzarapp"} target="_blank">
							<i className="fa-brands fa-tiktok"></i>
						</Link>
						<Link
							href={"https://www.linkedin.com/company/mzarapp"}
							target="_blank"
						>
							<i className="fa-brands fa-linkedin"></i>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
