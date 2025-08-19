"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import Loading from "@/app/loading";
import BookContactForm from "./BookContactForm";
import BookingDetailsForm from "./BookingDetailsForm"; // Import the second form component
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import PhnoeInput from "react-phone-number-input";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
// Validation schema
function getFormSchema(lang = "en") {
	return z.object({
		name: z
			.string()
			.min(1, { message: lang === "ar" ? "الاسم مطلوب" : "Name is required" })
			.max(50, {
				message:
					lang === "ar"
						? "يجب ألا يزيد الاسم عن 50 حرفًا"
						: "Name must be at most 50 characters",
			}),
		email: z
			.string()
			.email({
				message: lang === "ar" ? "البريد الإلكتروني غير صالح" : "Invalid email",
			})
			.min(1, {
				message:
					lang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required",
			})
			.max(510),
		phone: z
			.string()
			.min(5, {
				message:
					lang === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required",
			})
			.max(50),
		destination: z.string().min(1, {
			message: lang === "ar" ? "الوجهة مطلوبة" : "Destination is required",
		}),
	});
}

export default function GeneralFormsWrapper() {
	const searchParams = useSearchParams();

	const gclid = searchParams.get("gclid");
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [language, setLanguage] = useState("en");
	const [formLoading, setFormLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [bookingId, setBookingId] = useState(null);
	const [cities, setCities] = useState([
		{ id: "all", name: language === "ar" ? "الكل" : "All" },
	]);
	const [selectedCity, setSelectedCity] = useState("all");

	const [packages, setPackages] = useState([]);

	useEffect(() => {
		setLoading(true);
		if (typeof window !== "undefined") {
			const lang = localStorage.getItem("lang") || "en";
			setLanguage(lang);
			const headers = { lang };

			// Fetch cities
			axios
				.get(`${API_BASE_URL}/landing/home/cities`, { headers })
				.then((response) => {
					const cityList = response.data;
					setCities([
						{ id: "all", name: lang === "ar" ? "الكل" : "All" },
						...cityList,
					]);
				});

			// Fetch packages (destinations)
			axios
				.get(`${API_BASE_URL}/landing/home/packages`, { headers })
				.then((response) => {
					const packageList = response.data?.data?.packages || [];
					setPackages(packageList);
					setLoading(false);
				})
				.catch(() => setLoading(false));
		}
	}, []);

	// create resolver from localized schema and update when language changes
	const resolver = React.useMemo(
		() => zodResolver(getFormSchema(language)),
		[language]
	);

	// use the resolver in useForm
	const form = useForm({
		resolver,
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			destination: "",
		},
	});

	const handleSubmit = async (values) => {
		setFormLoading(true);

		const phoneNumber = parsePhoneNumberFromString(values.phone);
		const countryCode = phoneNumber ? phoneNumber.countryCallingCode : "";
		const mobile = phoneNumber ? phoneNumber.nationalNumber : values.phone;
		const package_id = Number(values.destination);

		const payload = {
			email: values.email,
			name: values.name,
			mobile: mobile,
			country_code: countryCode,
			package_id: package_id,
			gclid: gclid || "",
		};

		try {
			const response = await axios.post(
				`${API_BASE_URL}/landing/home/booking-pt1`,
				payload,
				{ headers: { lang: language } }
			);

			if (response.data && response.data.status) {
				setBookingId(response.data.data.booking_id);
				// fetch booking data
				const bookingDataRes = await axios.get(
					`${API_BASE_URL}/landing/home/packages-booking-data?package_id=${package_id}`,
					{ headers: { lang: language } }
				);
				setData(bookingDataRes.data);
				setFormLoading(false);
				setSuccess(true);
				toast.success(
					language === "ar"
						? "تم إرسال طلبك بنجاح!"
						: "Your request was sent successfully!",
					{ duration: 7000, className: "sonner-toast-large" }
				);
			} else {
				setFormLoading(false);
				toast.error(
					language === "ar"
						? "فشل إرسال الطلب. الرجاء المحاولة مرة أخرى."
						: "Failed to submit your request. Please try again."
				);
			}
		} catch (error) {
			setFormLoading(false);
			toast.error(
				language === "ar"
					? "حدث خطأ. الرجاء المحاولة مرة أخرى."
					: "An error occurred. Please try again."
			);
		}
	};

	const filteredPackages =
		selectedCity === "all"
			? packages
			: packages.filter((pkg) => pkg.city_id === Number(selectedCity));

	if (loading) return <Loading />;

	return (
		<div
			className="container mx-auto py-4 new-form"
			style={{ direction: language === "ar" ? "rtl" : "ltr" }}
		>
			<div className="flex flex-col items-center mb-8">
				<img src="/logo.svg" alt="MZAR Logo" className="h-14 mb-2" />
				<h2 className="font-semibold text-2xl md:text-3xl text-center text-black mb-2 mt-2">
					{language === "ar" ? "احجز الآن" : "Make a reservation"}
				</h2>
				<h3 className="font-semibold text-xl md:text-2xl text-center text-[#555050] mb-2 mt-2">
					{language === "ar"
						? "يرجى تعبئة النموذج لحجز تجربتك"
						: "Fill out the form to book your experience"}
				</h3>
			</div>
			{/* remount form subtree when language changes so Zod messages update immediately */}
			<Form key={language} {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
						{/* Row 1: Full name & Email */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>
										{language === "ar" ? "الاسم الكامل*" : "Full name*"}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={
												language === "ar" ? "محمد أحمد" : "John Carter"
											}
											{...field}
											disabled={success}
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
								<FormItem className="">
									<FormLabel>
										{language === "ar"
											? "البريد الإلكتروني*"
											: "Email address*"}
									</FormLabel>
									<FormControl>
										<Input
											placeholder="john@youremail.com"
											type="email"
											{...field}
											disabled={success}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Row 2: City & phone */}

						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{language === "ar" ? "المدينة" : "City"}
									</FormLabel>
									<Select
										onValueChange={(val) => {
											field.onChange(val);
											setSelectedCity(val);
										}}
										defaultValue={field.value || "all"}
										disabled={success}
									>
										<FormControl className="date-picker">
											<SelectTrigger className="w-full justify-between px-4">
												<SelectValue
													placeholder={
														language === "ar" ? "اختر المدينة" : "Select city"
													}
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{cities.map((city) => (
													<SelectItem key={city.id} value={city.id.toString()}>
														{city.name}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage className="form-message" />
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
										<PhoneInput
											defaultCountry="sa"
											value={field.value}
											onChange={field.onChange}
											disabled={success}
											className=""
											forceDialCode={true}
										/>
									</FormControl>
									<FormMessage className="form-message" />
								</FormItem>
							)}
						/>

						{/* Row 3: Path/packages */}

						<FormField
							control={form.control}
							name="destination"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{language === "ar" ? "الوجهة" : "Destination"}
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										disabled={success}
									>
										<FormControl className="date-picker">
											<SelectTrigger className="w-full justify-between px-4">
												<SelectValue
													placeholder={
														language === "ar"
															? "اختر الوجهة"
															: "Select destination"
													}
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{filteredPackages.map((pkg) => (
													<SelectItem key={pkg.id} value={pkg.id.toString()}>
														{pkg.name}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage className="form-message" />
								</FormItem>
							)}
						/>
					</div>
					{!success && (
						<div className="flex justify-center mt-8">
							<Button
								type="submit"
								className="w-full max-w-md h-[60px] bg-gradient-to-r from-blue-600 to-teal-400 text-white text-xl py-4 rounded-xl shadow-lg hover:from-blue-700 hover:to-teal-500 transition-colors duration-300"
								disabled={formLoading}
							>
								{formLoading
									? language === "ar"
										? "جاري الإرسال..."
										: "Sending..."
									: language === "ar"
									? "إرسال الطلب"
									: "Send Request"}
							</Button>
						</div>
					)}
				</form>
			</Form>
			{/* Render the second form below after success */}
			{success && (
				<div className="mt-4 border-t border-[#E5E7EB]">
					<h3 className="text-center text-xl font-semibold my-8 bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
						{language === "ar"
							? "لخدمة أفضل .. رجاء أكمل تفاصيل الحجز التالية"
							: "For better service .. please fill booking details"}
					</h3>
					<BookingDetailsForm
						bookingData={data.data}
						bookingId={bookingId}
						contactName={form.getValues("name")}
						contactPhone={form.getValues("phone")}
					/>
				</div>
			)}
		</div>
	);
}
