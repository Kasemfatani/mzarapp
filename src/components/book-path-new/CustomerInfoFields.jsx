"use client";

import React, { useState, useEffect } from "react";
import { User, Lock } from "lucide-react";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import {
	Command,
	CommandInput,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import LocationPickerMap from "@/components/book-components/LocationPickerMap";

export function CustomerInfoFields({ lang = "ar", form }) {
	const isAr = lang === "ar";
	const [nationalityOpen, setNationalityOpen] = useState(false);
	const [countries, setCountries] = useState([]);

	// local map coords
	const [lat, setLat] = useState(21.425893460537548);
	const [lng, setLng] = useState(39.82470840448206);

	useEffect(() => {
		fetch(`${API_BASE_URL_NEW}/landing/countries`, { headers: { lang } })
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data)) setCountries(data);
				else if (Array.isArray(data.data)) setCountries(data.data);
			});
	}, []);

	// register address fields once
	useEffect(() => {
		form.register("address_name");
		form.register("address_lat");
		form.register("address_lng");
	}, [form]);

	// push coords to form as strings
	useEffect(() => {
		form.setValue("address_lat", String(lat), { shouldValidate: true });
	}, [lat, form]);
	useEffect(() => {
		form.setValue("address_lng", String(lng), { shouldValidate: true });
	}, [lng, form]);

	const getCountryName = (id) => {
		const country = countries.find((c) => c.id === id);
		return country ? country.name : "";
	};

	return (
		<div className="bg-white rounded-[20px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] border-[0.8px] border-[rgba(243,244,246,0.6)] w-full">
			<div className="p-6 flex flex-col gap-8">
				{/* Header */}
				<div className="flex flex-col md:flex-row items-center justify-between gap-2">
					<div className="flex flex-col">
						<h3 className="text-[#3c6652] text-2xl tracking-[-0.24px]">
							{isAr ? "معلوماتك الشخصية" : "Your Personal Information"}
						</h3>
						<p className="text-[#4a5565]">
							{isAr
								? "نحتاج بعض المعلومات لإتمام حجزك"
								: "We need some information to complete your booking"}
						</p>
					</div>
					<div className="bg-[rgba(231,211,175,0.2)] border-[0.8px] border-[#e7d3af] rounded-full px-2 py-1">
						<p className="text-[#867957]">
							{isAr ? "خطوة 2 من 2" : "Step 2 of 2"}
						</p>
					</div>
				</div>

				<Form {...form}>
					<form className="flex flex-col gap-4">
						{/* Full Name */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex items-center gap-2">
										<User
											className="w-5 h-5 text-[#867957]"
											strokeWidth={1.67}
										/>
										<span className="text-[#364153]">
											{isAr ? "الاسم الكامل" : "Full Name"}
										</span>
										<span className="text-[#fb2c36]">*</span>
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder={
												isAr ? "أدخل اسمك الكامل" : "Enter your full name"
											}
											className="w-full shadow-none bg-gradient-to-b from-[#f8f4ed] to-[#f5f1eb] border-[0.8px] border-[rgba(229,231,235,0.6)] rounded-[18px] p-4 placeholder:text-[#9ca3af]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* WhatsApp + Nationality row */}
						<div className="flex flex-col md:flex-row gap-4">
							{/* WhatsApp only */}
							<FormField
								control={form.control}
								name="whatsapp"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel className="text-[#364153]">
											{isAr ? "رقم الواتساب" : "WhatsApp"}
											<span className="text-[#fb2c36]"> *</span>
										</FormLabel>
										<FormControl>
											<div
												className="phone-input-book"
												style={{ direction: "ltr" }}
											>
												<PhoneInput
													defaultCountry="sa"
													value={field.value}
													onChange={field.onChange}
													className=""
													forceDialCode={true}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Address + Map (stores name, lat, lng as strings) */}
						<div className="flex flex-col gap-2">
							<label className="text-[#364153]">
								{isAr ? "العنوان" : "Address*"}
							</label>
							
							<LocationPickerMap
								lat={lat}
								lng={lng}
								setLat={setLat}
								setLng={setLng}
								onAddressChange={(addr) =>
									form.setValue("address_name", addr, { shouldValidate: true })
								}
								language={lang}
							/>
							{form.formState.errors.address_name?.message && (
								<p className="text-sm text-destructive mt-1">
									{String(form.formState.errors.address_name.message)}
								</p>
							)}
							{/* Show coord errors (optional) */}
							{(form.formState.errors.address_lat ||
								form.formState.errors.address_lng) && (
								<p className="text-xs text-destructive mt-1">
									{form.formState.errors.address_lat?.message ||
										form.formState.errors.address_lng?.message}
								</p>
							)}
						</div>
					</form>
				</Form>

				{/* Security Note */}
				<div className="bg-gradient-to-r from-[#eff6ff] to-[#eef2ff] border-[0.8px] border-[#bedbff] rounded-[18px] px-4 py-6 flex items-start gap-2">
					<Lock className="w-5 h-5 text-[#1a1a1a] flex-shrink-0 mt-0.5" />
					<div className="flex flex-col">
						<p className="text-[#193cb8]">
							{isAr
								? "معلوماتك في أمان تام"
								: "Your information is completely safe"}
						</p>
						<p className="text-[#155dfc] text-sm">
							{isAr
								? "نحن نحترم خصوصيتك بشكل كامل. جميع البيانات مشفّرة ولن نشارك معلوماتك مع أي جهة خارجية"
								: "We fully respect your privacy. All data is encrypted and we will not share your information with any external party"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
