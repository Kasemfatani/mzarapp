"use client";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/apiConfig";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { arSA } from "date-fns/locale";
// import { Calendar } from "react-multi-date-picker";
// import arabic from "react-date-object/calendars/arabic"
// import arabic_ar from "react-date-object/locales/arabic_ar"
// import { Controller } from "react-hook-form";

import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
// import MapSelector from "./MapSelector";
import Image from "next/image";
import { format } from "date-fns";
import LocationPickerMap from "./LocationPickerMap";
import { isToday } from "date-fns";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

// replace static schema with factory that returns localized messages
function getBookingSchema(lang = "en") {
	return z.object({
		date: z.date({
			required_error: lang === "ar" ? "التاريخ مطلوب" : "Date is required",
		}),
		time: z.string().min(1, lang === "ar" ? "الوقت مطلوب" : "Time is required"),
		persons: z
			.string()
			.min(
				1,
				lang === "ar" ? "عدد الأشخاص مطلوب" : "Number of people is required"
			),
		car: z
			.string()
			.min(1, lang === "ar" ? "المركبة مطلوبة" : "Vehicle is required"),
		address: z
			.string()
			.min(1, lang === "ar" ? "العنوان مطلوب" : "Address is required"),
	});
}

export default function BookingDetailsForm({
	bookingData,
	bookingId,
	contactName,
	contactPhone,
	contactEmail,
}) {
	const [language, setLanguage] = useState("en");
	const [maxSeats, setMaxSeats] = useState(4);
	const [lat, setLat] = useState(21.425893460537548);
	const [lng, setLng] = useState(39.82470840448206);
	const [formLoading, setFormLoading] = useState(false);

	const [calendarOpen, setCalendarOpen] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || "en");
		}
		console.log("bookingData is :", bookingData);
	}, []);

	// create resolver tied to language so validation messages are localized
	const resolver = React.useMemo(
		() => zodResolver(getBookingSchema(language)),
		[language]
	);

	const form = useForm({
		resolver,
		defaultValues: {
			date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from today
			time: "",
			persons: "",
			car: "",
			address: "",
		},
	});

	// ensure address field is registered (we'll use the map input as the address)
	useEffect(() => {
		form.register("address");
	}, [form]);

	// Update maxSeats when car changes
	const carValue = form.watch("car");
	useEffect(() => {
		if (carValue && bookingData?.cars) {
			const selectedCar = bookingData.cars.find(
				(car) => String(car.id) === carValue.split(",")[0]
			);
			if (selectedCar) setMaxSeats(Number(selectedCar.number_of_seats));
		}
	}, [carValue, bookingData]);

	// Watch the selected date
	const selectedDate = form.watch("date");

	// Get current time in "HH:mm:ss" format
	const now = new Date();
	const currentTimeString = now
		.toLocaleTimeString("en-GB", { hour12: false })
		.padStart(8, "0");

	// Filter booking_hours based on selected date
	const filteredBookingHours = bookingData?.booking_hours?.filter((item) => {
		if (selectedDate && isToday(selectedDate)) {
			// Only show times that are after now
			return item.description > currentTimeString;
		}
		return true; // Show all times for other dates
	});

	const handleSubmit = async (values) => {
		setFormLoading(true);
		const carId = values.car.split(",")[0];
		const payload = {
			address_name: values.address,
			visit_date: format(values.date, "yyyy-MM-dd"),
			lat,
			lng,
			transportation_type_id: Number(carId),
			visit_time_id: Number(values.time),
			seats: Number(values.persons),
			booking_id: bookingId,
		};
		console.log("payload in detail is :", payload);
		try {
			const response = await axios.post(
				`${API_BASE_URL}/landing/home/booking-pt2`,
				payload,
				{
					headers: { lang: language },
				}
			);
			console.log("Booking pt2 API response:", response.data);
			console.log(
				"Booking pt2 API response response.data.data.ref_no:",
				response.data.data.ref_no
			);

			if (response.data && response.data.status) {
				setFormLoading(false);
				const qName = contactName ?? "";
				const qPhone = contactPhone ?? "";
				const qEmail = contactEmail ?? "";
				const qPackage = bookingData?.package_name ?? "";
				const refNo = response.data.data.ref_no ?? "";
				router.push(
					`/congats?name=${encodeURIComponent(
						qName
					)}&phone=${encodeURIComponent(qPhone)}&package=${encodeURIComponent(
						qPackage
					)}&email=${encodeURIComponent(qEmail)}&refNo=${encodeURIComponent(
						refNo
					)}`
				);
			} else {
				setFormLoading(false);
				toast.error(
					language === "ar"
						? "فشل إرسال الحجز. حاول مرة أخرى."
						: "Failed to submit booking. Please try again."
				);
			}
		} catch (error) {
			setFormLoading(false);
			console.log("Booking pt2 API error:", error);
			toast.error(
				language === "ar"
					? "حدث خطأ أثناء إرسال الحجز."
					: "An error occurred while submitting your booking."
			);
		}
	};

	return (
		<Form key={language} {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="mt-8"
				style={{ direction: language === "ar" ? "rtl" : "ltr" }}
			>
				<div className="flex flex-col md:flex-row gap-8">
					{/* Booking details */}
					<div className="flex-1">
						<h2 className="text-xl font-semibold mb-4">
							{language === "ar" ? "تفاصيل الحجز" : "Booking details"}
						</h2>
						{/* Date */}
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="flex flex-col mb-4">
									<FormLabel>
										{language === "ar" ? "التاريخ" : "Date*"}
									</FormLabel>
									<Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
										<PopoverTrigger asChild>
											<FormControl>
												<Button variant={"outline"} className="date-picker">
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>
															{language === "ar"
																? "اختر التاريخ"
																: "Pick a date"}
														</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												locale={language === "ar" ? arSA : undefined}
												selected={field.value}
												onSelect={(date) => {
													if (date === undefined) {
														// User clicked the already-selected date, so close the calendar
														setCalendarOpen(false);
													} else {
														field.onChange(date);
													}
												}}
												disabled={(date) =>
													bookingData?.min_date &&
													bookingData?.max_date &&
													(date > new Date(bookingData.max_date) ||
														date < new Date(bookingData.min_date))
												}
												initialFocus
											/>
											{/* <Calendar
												value={field.value || null}
												onChange={(d) => {
													// d is a DateObject (react-date-object) or null
													const jsDate = d
														? typeof d.toDate === "function"
															? d.toDate()
															: new Date(d)
														: null;
													if (jsDate) {
														field.onChange(jsDate); // store JS Date in react-hook-form
														setCalendarOpen(false);
													}
												}}
												highlightToday={false}
												minDate={new Date(bookingData.min_date)}
												maxDate={new Date(bookingData.max_date)}
												calendar={language === "ar" ? arabic : ""}
												locale={language === "ar" ? arabic_ar : ""}
											/> */}
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Time */}
						<FormField
							control={form.control}
							name="time"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>{language === "ar" ? "الوقت" : "Time"}</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className="w-full select-trigger">
												<SelectValue
													placeholder={
														language === "ar" ? "اختر الوقت" : "Select Time"
													}
												/>
											</SelectTrigger>
											<SelectContent>
												{filteredBookingHours?.map((item) => (
													<SelectItem key={item.id} value={String(item.id)}>
														<span>{item.name}</span>
														{/* <span className="ml-2 text-xs text-gray-500">
															{item.description}
														</span> */}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Vehicle */}
						<FormField
							control={form.control}
							name="car"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>
										{language === "ar" ? "المركبة" : "Vehicle*"}
									</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className="w-full select-trigger">
												<SelectValue
													placeholder={
														language === "ar"
															? "اختر نوع المركبة"
															: "Select Vehicle type"
													}
												/>
											</SelectTrigger>
											<SelectContent>
												{bookingData?.cars?.map((item) => (
													<SelectItem
														key={item.id}
														value={`${item.id},${item.number_of_seats}`}
														disabled={!item.is_enabled}
													>
														{item.image && (
															<Image
																src={item.image}
																alt={item.name}
																width={30}
																height={30}
																className="inline-block mr-2"
															/>
														)}
														<span>{item.name}</span>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Number of people */}
						<FormField
							control={form.control}
							name="persons"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>
										{language === "ar" ? "عدد الأشخاص" : "Number of people*"}
									</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className="w-full select-trigger">
												<SelectValue
													placeholder={
														language === "ar"
															? "اختر عدد الأشخاص"
															: "Select number of people"
													}
												/>
											</SelectTrigger>
											<SelectContent>
												{Array.from({ length: maxSeats }, (_, i) => (
													<SelectItem key={i + 1} value={String(i + 1)}>
														{i + 1}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* Additional information */}
					<div className="flex-1">
						<h2 className="text-xl font-semibold mb-2">
							{language === "ar" ? "معلومات إضافية" : "Additional information"}
						</h2>
						{/* Address */}
						{/* <FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>
										{language === "ar" ? "العنوان" : "Address*"}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={
												language === "ar" ? "أدخل عنوانك" : "Enter your address"
											}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}
						{/* Special requests */}

						<label className="">
							{language === "ar" ? "العنوان" : "Address*"}
						</label>
						{/* show validation error for address (react-hook-form) */}
						{form.formState.errors.address?.message && (
							<p className="text-sm text-destructive mt-1">
								{String(form.formState.errors.address.message)}
							</p>
						)}
						<LocationPickerMap
							lat={lat}
							lng={lng}
							setLat={setLat}
							setLng={setLng}
							onAddressChange={(addr) =>
								form.setValue("address", addr, { shouldValidate: true })
							}
						/>
					</div>
				</div>
				<div className="flex justify-center mt-8">
					<Button
						type="submit"
						className="w-full max-w-md h-[60px] bg-gradient-to-r from-blue-600 to-teal-400 hover:to-teal-500 transition-colors duration-300 text-white text-xl py-4 rounded-xl shadow-lg"
						disabled={formLoading}
					>
						{formLoading
							? language === "ar"
								? "جاري الإرسال..."
								: "Sending..."
							: language === "ar"
							? "إرسال الحجز"
							: "Submit booking"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
