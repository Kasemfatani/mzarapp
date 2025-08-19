"use client";
import React, { useEffect, useState } from "react";
import doneImage from "/public/done.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function Book() {
	const searchParams = useSearchParams(); // Fixed variable name
	const [language, setLanguage] = useState("en");
	const name = searchParams.get("name");
	const phone = searchParams.get("phone");
	const package_name = searchParams.get("package");
	const email = searchParams.get("email"); // <-- added

	useEffect(() => {
		if (typeof window === "undefined") return;

		const normalizePhone = (raw) => {
			if (!raw) return "";
			const digits = String(raw).replace(/\D/g, ""); // keep only digits
			return digits ? `+${digits}` : "";
		};

		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: "form_submission",
			customer_name: name || "",
			customer_whatsapp: normalizePhone(phone), // safe normalized value
			package_name: package_name || "",
			customer_email: email || "", 
		});
	}, [name, phone, package_name, email]); 
	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || "en");
		}
	}, []);

	const texts = {
		en: {
			title: "Welcome to Mazar",
			desc: "Our team will contact you shortly on WhatsApp to guide you through the next steps of your journey. We look forward to assisting you!",
		},
		ar: {
			title: "مرحبًا بك في مزار",
			desc: "سيتواصل معك فريقنا قريبًا عبر الواتساب لإرشادك في الخطوات التالية من رحلتك. نتطلع لخدمتك!",
		},
	};

	const t = language === "ar" ? texts.ar : texts.en;

	return (
		<div className="popup" dir={language === "ar" ? "rtl" : "ltr"}>
			<div className="popup-cont">
				<Image src={doneImage} alt="Mazar" className="img" />
				<h2>{t.title}</h2>
				<p>{t.desc}</p>
			</div>
		</div>
	);
}
