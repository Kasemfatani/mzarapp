"use client";
import { useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function HotelHero({ lang = "ar", partner }) {
	// const [name, setName] = useState("");
	// const [whatsApp, setWhatsApp] = useState("");

	const isAr = lang === "ar";
	const t = {
		title: isAr ? "أهلًا بك ضيفنا في" : "Welcome, dear guest in",
		sub: isAr
			? "مزار تقدم لك خدمات مميزة داخل مكة مع هدية حصرية ل زوار " + partner?.name
			: "Mzar offers you exclusive services within Mecca with a special gift for " + partner?.name + " visitors",
		offer: isAr
			? " إثراء - راحة - تجربة لا تُنسى"
			: " Enrichment - Comfort - Unforgettable Experience",
		travelSafe: isAr
			? "تنقلات وخدمات داخل مكة"
			: "Transportation and services within Mecca",
		support : isAr
			? "دعم ميداني بالقرب من الحرم"
			: "Field support near the Haram",
		// namePh: isAr ? "اسمك الكامل" : "Your full name",
		// waPh: isAr ? "رقم الجوال (واتساب)" : "WhatsApp number",
		// cta: isAr ? "اختر هديتك الآن" : "Choose your gift now",
	};

	// const handleSubmit = (e) => {
	// 	e.preventDefault();

	// 	const phoneParsed = parsePhoneNumberFromString(whatsApp || "");
	// 	const normalizeDigits = (num) =>
	// 		num ? String(num).replace(/\D/g, "") : "";
	// 	const stripLeadingZero = (num) =>
	// 		num && num.startsWith("0") ? num.replace(/^0+/, "") : num;

	// 	const national = phoneParsed
	// 		? stripLeadingZero(phoneParsed.nationalNumber)
	// 		: stripLeadingZero(normalizeDigits(whatsApp));

	// 	const cc = phoneParsed ? phoneParsed.countryCallingCode : "";

	// 	if (!name || !national || national.length < 8) {
	// 		alert(
	// 			isAr
	// 				? "يرجى إدخال الاسم ورقم واتساب صحيح (على الأقل 8 أرقام)"
	// 				: "Please enter your name and a valid WhatsApp number (at least 8 digits)",
	// 		);
	// 		return;
	// 	}

	// 	onNext?.({ name, cc, phone: national });
	// };

	return (
		<section className="relative md:min-h-[90vh]  w-full overflow-hidden flex flex-col justify-center items-center">
			{/* BG image (external) */}
			<img
				src="/hotel/Hero1.webp"
				alt="Hotel hero background"
				className="absolute inset-0 w-full h-full object-cover -z-10"
			/>
			{/* <div className="absolute inset-0 bg-[#0b4f3b]/70 -z-10" /> */}

			<div className="  px-4 pt-10 pb-28 ">
				{/* Hotel icon (external placeholder) */}
				<div className={`mb-4 md:mb-8`}>
					<img
						src={partner?.logo}
						alt="Hotel Logo"
						className="h-24 w-auto mx-auto brightness-110"
					/>
				</div>

				<div
					className={` text-center text-white max-w-4xl`}
				>
					<h1 className="text-3xl md:text-5xl font-extrabold !leading-snug mb-4 md:mb-8">
						{t.title} {partner?.name}
					</h1>
					<p className="text-base md:text-3xl text-[#C9A961] mb-4 md:mb-8">{t.sub}</p>
					<p className="text-base md:text-3xl  mb-4 md:mb-8">{t.offer}</p>
					<div className="flex flex-row gap-2 md:gap-6 justify-center items-center">
						<p className="text-sm md:text-lg bg-[#E6D2AF]/60 p-4 rounded-full"> <span className="text-[#857856]">✔</span> {t.travelSafe}</p>
						<p className="text-sm md:text-lg bg-[#E6D2AF]/60 p-4 rounded-full"> <span className="text-[#857856]">✔</span> {t.support}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
