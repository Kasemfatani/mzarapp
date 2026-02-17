"use client";

import React from "react";

export default function FixedWhatsLink({
	lang = "en",
	packageName = "",
	name = "",
	countryName = "",
	phone = "+966580121025",
}) {
	const en = `I am interested in ${packageName}. My name is ${name}${
		countryName ? " and I am from " + countryName : ""
	}.`;
	const ar = `أنا مهتم بـ ${packageName}. اسمي ${name}${
		countryName ? " و أنا من " + countryName : ""
	}.`;
	const text = lang === "ar" ? ar : en;
	const href = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
		text,
	)}`;

	return (
		<a
			href={href}
			className="fixed-what flex items-center gap-3"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="WhatsApp"
			dir={lang === "ar" ? "rtl" : "ltr"}
		>
			<i className="fa-brands fa-whatsapp"></i>
			<span className="hidden md:inline text-white font-semibold max-w-xs truncate">
				{text}
			</span>
		</a>
	);
}
