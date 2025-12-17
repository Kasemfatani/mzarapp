"use client";

import React, { useState } from "react";
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

import countries from "i18n-iso-countries";
import enCountries from "i18n-iso-countries/langs/en.json";
import arCountries from "i18n-iso-countries/langs/ar.json";

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

countries.registerLocale(enCountries);
countries.registerLocale(arCountries);

const COUNTRIES3 = (() => {
	const namesEn = countries.getNames("en", { select: "official" }) || {};
	const namesAr = countries.getNames("ar", { select: "official" }) || {};
	return Object.entries(namesEn)
		.map(([alpha2, enName]) => {
			const code3 = countries.alpha2ToAlpha3
				? countries.alpha2ToAlpha3(alpha2)
				: alpha2;
			const arName = namesAr[alpha2] || enName;
			return { code: code3, en: enName, ar: arName };
		})
		.filter(Boolean)
		.sort((a, b) => a.en.localeCompare(b.en));
})();

export function CustomerInfoFields({ lang = "ar", form }) {
	const isAr = lang === "ar";
	const [nationalityOpen, setNationalityOpen] = useState(false);

	const labelForCountryName = (enName) => {
		if (!enName) return "";
		const item = COUNTRIES3.find((c) => c.en === enName);
		return item ? (isAr ? item.ar : item.en) : enName;
	};

	return (
		<div className="bg-white rounded-[20px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] border-[0.8px] border-[rgba(243,244,246,0.6)] w-full">
			<div className="p-6 flex flex-col gap-8">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex flex-col">
						<h3 className="text-[#3c6652] text-2xl tracking-[-0.24px]">
							معلوماتك الشخصية
						</h3>
						<p className="text-[#4a5565]">نحتاج بعض المعلومات لإتمام حجزك</p>
					</div>
					<div className="bg-[rgba(231,211,175,0.2)] border-[0.8px] border-[#e7d3af] rounded-full px-2 py-1">
						<p className="text-[#867957]">خطوة 2 من 2</p>
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
										<span className="text-[#364153]">الاسم الكامل</span>
										<span className="text-[#fb2c36]">*</span>
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="أدخل اسمك الكامل"
											className="w-full shadow-none bg-gradient-to-b from-[#f8f4ed] to-[#f5f1eb] border-[0.8px] border-[rgba(229,231,235,0.6)] rounded-[18px] p-4 placeholder:text-[#9ca3af]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Email */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[#364153]">
										البريد الإلكتروني<span className="text-[#fb2c36]"> *</span>
									</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="example@xyz.com"
											className="w-full shadow-none  bg-gradient-to-b from-[#f8f4ed] to-[#f5f1eb] border-[0.8px] border-[rgba(229,231,235,0.6)] rounded-[18px] p-4  placeholder:text-[#9ca3af]"
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
											رقم الواتساب<span className="text-[#fb2c36]"> *</span>
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

							{/* Nationality combobox (stores English name) */}
							<FormField
								control={form.control}
								name="country_name"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormLabel className="text-[#364153]">
											{isAr ? "الجنسية" : "Nationality"}
											<span className="text-[#fb2c36]"> *</span>
										</FormLabel>

										<Popover
											open={nationalityOpen}
											onOpenChange={setNationalityOpen}
										>
											<PopoverTrigger asChild>
												<Button
													type="button"
													variant="outline"
													role="combobox"
													aria-expanded={nationalityOpen}
													className="h-12 w-full justify-between bg-gradient-to-b from-[#f8f4ed] to-[#f5f1eb] border-[0.8px] border-[rgba(229,231,235,0.6)] rounded-[12px] p-2 text-start"
												>
													{field.value
														? labelForCountryName(field.value)
														: isAr
														? "اختر الجنسية"
														: "Select nationality"}
													<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
												<Command>
													<CommandInput
														placeholder={isAr ? "ابحث..." : "Search..."}
													/>
													<CommandList>
														<CommandEmpty>
															{isAr ? "لا توجد نتائج" : "No results found."}
														</CommandEmpty>
														<CommandGroup>
															{COUNTRIES3.map((country) => {
																const label = isAr ? country.ar : country.en;
																return (
																	<CommandItem
																		key={country.code}
																		value={label}
																		onSelect={() => {
																			// Store English name in the form value
																			field.onChange(country.en);
																			setNationalityOpen(false);
																		}}
																	>
																		<Check
																			className={`mr-2 h-4 w-4 ${
																				field.value === country.en
																					? "opacity-100"
																					: "opacity-0"
																			}`}
																		/>
																		{label}
																	</CommandItem>
																);
															})}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>

				{/* Security Note */}
				<div className="bg-gradient-to-r from-[#eff6ff] to-[#eef2ff] border-[0.8px] border-[#bedbff] rounded-[18px] px-4 py-6 flex items-start gap-2">
					<Lock className="w-5 h-5 text-[#1a1a1a] flex-shrink-0 mt-0.5" />
					<div className="flex flex-col">
						<p className="text-[#193cb8]">معلوماتك في أمان تام</p>
						<p className="text-[#155dfc] text-sm">
							نحن نحترم خصوصيتك بشكل كامل. جميع البيانات مشفّرة ولن نشارك
							معلوماتك مع أي جهة خارجية
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
