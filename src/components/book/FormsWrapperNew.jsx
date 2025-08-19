"use client";

import React, { useEffect, useState, useMemo } from "react";
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

// replace the single static schema with a factory that returns localized messages
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
	});
}

// Validation schema
// const formSchema = z.object({
// 	name: z.string().min(1, { message: "Name is required" }).max(50),
// 	email: z.string().email().min(1, { message: "Email is required" }).max(510),
// 	phone: z.string().min(1, { message: "Phone number is required" }).max(50),
// });

// reduce text to a maximum length
function truncateText(text, maxLength = 120) {
	if (!text) return "";
	return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export default function FormsWrapperNew() {
	const searchParams = useSearchParams();
	const [pathId] = useState(searchParams.get("id"));
	const gclid = searchParams.get("gclid");
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [language, setLanguage] = useState("en");
	const [formLoading, setFormLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [bookingId, setBookingId] = useState(null);

	useEffect(() => {
		setLoading(true);
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || "en");
			axios
				.get(
					`${API_BASE_URL}/landing/home/packages-booking-data?package_id=${pathId}`,
					{
						headers: { lang: localStorage.getItem("lang") || "en" },
					}
				)
				.then((response) => {
					setData(response.data);
					setLoading(false);
					console.log("packages-booking-data is :", response.data);
				})
				.catch(() => setLoading(false));
		}
	}, []);

	// create resolver from localized schema and update when language changes
	const resolver = useMemo(
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
		},
	});

	const handleSubmit = async (values) => {
		setFormLoading(true);

		const phoneNumber = parsePhoneNumberFromString(values.phone);
		const countryCode = phoneNumber ? phoneNumber.countryCallingCode : "";
		const mobile = phoneNumber ? phoneNumber.nationalNumber : values.phone;

		const payload = {
			email: values.email,
			name: values.name,
			mobile: mobile,
			country_code: countryCode,
			package_id: Number(pathId),
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

	if (loading || !data) return <Loading />;

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
			<Form key={language} {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<div className="flex flex-col md:flex-row items-start gap-[70px]">
						{/* Left: Image and description */}
						<div className="md:flex-1 flex flex-col justify-between">
							<img
								src={data.data.package_image}
								alt={data.data.package_name}
								className="h-[250px] rounded-xl mb-6  object-cover"
							/>
							<div>
								<h2 className="text-3xl font-bold text-[#232B55] mb-2">
									{data.data.package_name}
								</h2>
								<p className="text-[#7C7C8A] text-base">
									{truncateText(data.data.package_description)}
								</p>
							</div>
						</div>
						{/* Right: Form fields */}
						<div className="w-full md:flex-1 flex flex-col">
							<h3 className="text-xl font-semibold text-[#232B55] border-b border-[#E5E7EB] pb-2 mb-6">
								{language === "ar" ? "معلومات التواصل" : "Contact information"}
							</h3>
							<BookContactForm form={form} disabled={success} />
						</div>
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
