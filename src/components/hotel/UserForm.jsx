"use client";
import { useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { User, Phone } from "lucide-react";

export default function UserForm({ lang = "ar", onNext }) {
	const [name, setName] = useState("");
	const [whatsApp, setWhatsApp] = useState("");

	const isAr = lang === "ar";
	const t = {
		enter: isAr ? "أدخل" : "Enter",
		namePh: isAr ? "اسمك الكامل" : "Your Full Name",
		waPh: isAr ? "رقم الجوال (واتساب)" : "WhatsApp Number",
		cta: isAr ? "اختر هديتك الآن" : "Choose your gift now",
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const phoneParsed = parsePhoneNumberFromString(whatsApp || "");
		const normalizeDigits = (num) =>
			num ? String(num).replace(/\D/g, "") : "";
		const stripLeadingZero = (num) =>
			num && num.startsWith("0") ? num.replace(/^0+/, "") : num;

		const national = phoneParsed
			? stripLeadingZero(phoneParsed.nationalNumber)
			: stripLeadingZero(normalizeDigits(whatsApp));

		const cc = phoneParsed ? phoneParsed.countryCallingCode : "";

		if (!name || !national || national.length < 8) {
			alert(
				isAr
					? "يرجى إدخال الاسم ورقم واتساب صحيح (على الأقل 8 أرقام)"
					: "Please enter your name and a valid WhatsApp number (at least 8 digits)",
			);
			return;
		}

		onNext?.({ name, cc, phone: national });
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="container mx-auto w-full relative z-10 bg-white p-3 rounded-2xl shadow-2xl py-6 -mt-[50px] md:-mt-[90px] mb-12 md:mb-16"
		>
			<div className="flex flex-col md:flex-row  gap-3 md:gap-4 mb-4 md:mb-8">
				<div className="flex-1 flex flex-col gap-2">
					<label>
						{" "}
						<User className="inline-block ms-2 mb-1 text-[#867957]" />{" "}
						{t.namePh}
					</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder={t.enter + " " + t.namePh}
						className="rounded-full bg-gradient-to-b from-[#f8f4ed] to-[#f5f1eb] text-black  placeholder-black/70 border border-black/25 focus:border-black/50 outline-none px-4 py-3 "
						required
					/>
				</div>

				<div className="flex-1 flex flex-col gap-2">
					<label>
						{" "}
						<Phone className="inline-block ms-2 mb-1 text-[#867957]" /> {t.waPh}
					</label>
					<div className="phone-input-book" dir="ltr">
						<PhoneInput
							defaultCountry="sa"
							value={whatsApp}
							onChange={setWhatsApp}
							className="w-full"
							forceDialCode
							inputClassName="rounded-full bg-gradient-to-b from-[#f8f4ed] to-[#f5f1eb] text-black  placeholder-black/70 border border-black/25 focus:border-black/50 outline-none  w-full"
							required
						/>
					</div>
				</div>
			</div>

			<button
				type="submit"
				className="w-full rounded-full px-6 py-3 md:py-4 font-semibold text-white bg-[var(--main-color)] hover:bg-[var(--sec-color)] hover:text-black transition-colors"
			>
				{t.cta}
			</button>
		</form>
	);
}
