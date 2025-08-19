"use client";

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import PhnoeInput from "react-phone-number-input";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function BookContactForm({ form, disabled }) {
	const [language, setLanguage] = useState("en");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || "en");
		}
	}, []);

	const isArabic = language === "ar";

	return (
		<div style={{ direction: isArabic ? "rtl" : "ltr" }}>
			<FormField
				control={form.control}
				name="name"
				render={({ field }) => (
					<FormItem className="mb-4">
						<FormLabel>{isArabic ? "الاسم الكامل*" : "Full name*"}</FormLabel>
						<FormControl>
							<Input
								placeholder={isArabic ? "محمد أحمد" : "John Carter"}
								{...field}
								disabled={disabled}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem className="mb-4">
						<FormLabel>
							{isArabic ? "البريد الإلكتروني*" : "Email address*"}
						</FormLabel>
						<FormControl>
							<Input
								placeholder="john@youremail.com"
								type="email"
								{...field}
								disabled={disabled}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				className="w-full ltr"
				style={{ direction: "ltr" }}
				control={form.control}
				name="phone"
				render={({ field }) => (
					<FormItem className="w-full ">
						<FormLabel className="text-blackText text-xl font-extrabold input-label">
							{language === "ar" ? "رقم الهاتف" : "Phone"}
						</FormLabel>
						<FormControl>
							<div style={{ direction: "ltr" }}>
								<PhoneInput
									defaultCountry="sa"
									value={field.value}
									onChange={field.onChange}
									disabled={disabled}
									className=""
									forceDialCode={true}
								/>
							</div>
						</FormControl>
						<FormMessage className="form-message" />
					</FormItem>
				)}
			/>
		</div>
	);
}
