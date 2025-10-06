"use client";
import React, { useState, useEffect, useMemo } from "react";
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

// Currency SVG Icon
function CurrencyIcon({ className = "inline w-5 h-5 mr-1" }) {
	return (
		<svg
			viewBox="0 0 1124.14 1256.39"
			width="1em"
			height="1em"
			fill="currentColor"
			className={className}
		>
			<path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
			<path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
		</svg>
	);
}

// Ticket Selector Component
function TicketSelector({ tickets, selected, setSelected, language }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{tickets?.map((ticket) => {
				const isSelected = selected.includes(ticket.id);
				return (
					<div
						key={ticket.id}
						className={`
                            flex flex-col items-start justify-between px-4 py-3 rounded-lg border-2 transition-colors cursor-pointer
                            ${
															isSelected
																? "bg-gradient-to-r from-blue-600 to-teal-400 text-white border-blue-400"
																: "bg-transparent border-blue-400 text-blue-900 hover:bg-blue-50/50"
														}
                        `}
						style={{ minHeight: 56 }}
						onClick={() => {
							if (isSelected) {
								setSelected(selected.filter((id) => id !== ticket.id));
							} else {
								setSelected([...selected, ticket.id]);
							}
						}}
					>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={isSelected}
								readOnly
								className="accent-blue-600 !w-[20px] "
								tabIndex={-1}
							/>
							<span className="font-semibold">{ticket.name}</span>
						</div>
						<div className="flex items-center text-xs font-bold gap-1">
							{ticket.price}
							<CurrencyIcon />
						</div>
					</div>
				);
			})}
		</div>
	);
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
	const [paymentLoading, setPaymentLoading] = useState(false);

	const [calendarOpen, setCalendarOpen] = useState(false);
	const [selectedTickets, setSelectedTickets] = useState([]);

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
			add_ons: selectedTickets, // array of selected ticket IDs
			// optional payment fields if user chose pay later (unpaid status)
			payment_type: "cash",
			transaction_id: null,
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

	// Create draft in Redis and initiate payment (Pay Now flow)
	const createDraftAndPay = async () => {
		// Validate form first
		const valid = await form.trigger();
		if (!valid) return;
		const values = form.getValues();
		const carId = values.car.split(",")[0];
		const draftPayload = {
			address_name: values.address,
			visit_date: format(values.date, "yyyy-MM-dd"),
			lat,
			lng,
			transportation_type_id: Number(carId),
			visit_time_id: Number(values.time),
			seats: Number(values.persons),
			booking_id: bookingId,
			add_ons: selectedTickets,
			// include contact/package for congrats page
			contact_name: contactName ?? "",
			contact_phone: contactPhone ?? "",
			contact_email: contactEmail ?? "",
			package_name: bookingData?.package_name ?? "",
			lang: language,
			// Pricing summary (already calculated client side for this draft)
			grand_total: Number(grandTotal.toFixed(2)),
			tax_rate: bookingData?.tax ? Number(bookingData.tax) : 0.15,
			// initial payment metadata (server will set status="pending")
			payment_status: "pending",
			payment_provider: "urway",
		};
		try {
			setPaymentLoading(true);
			// 1. create draft
			const draftRes = await fetch("/api/bookings/draft", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(draftPayload),
			});
			const draftJson = await draftRes.json();
			if (!draftRes.ok) throw new Error(draftJson.error || "Draft failed");
			// 2. init payment
			const initRes = await fetch("/api/urway-init", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ draftId: draftJson.draftId }),
			});
			const initJson = await initRes.json();
			if (!initRes.ok || !initJson.paymentUrl) {
				throw new Error(initJson.error || "Init payment failed");
			}
			window.location.href = initJson.paymentUrl;
		} catch (e) {
			console.error("Pay now error", e);
			toast.error(
				language === "ar" ? "فشل بدء الدفع" : "Failed to start payment"
			);
			setPaymentLoading(false);
		}
	};

	// Hardcoded tickets for now
	// const tickets = [
	// 	{ id: 1, name: "Revelation Exhibition Ticket", cost: 5 },
	// 	{ id: 2, name: "The Holy Quran Museum", cost: 10 },
	// 	{ id: 3, name: "Climbing To The Cave Of Hira (On Foot)", cost: 15 },
	// 	{ id: 4, name: "Performing Ihram From Aisha's Mosque", cost: 20 },
	// ];

	const tickets = bookingData?.add_ons ? bookingData.add_ons : null;

	// Get number of persons from form values
	const persons = Number(form.watch("persons") || 1);

	// from const carValue = form.watch("car");
	// get selected car info
	const selectedCar = useMemo(() => {
		if (!carValue || !bookingData?.cars) return null;
		const carId = carValue.split(",")[0];
		return bookingData.cars.find((car) => String(car.id) === carId);
	}, [carValue, bookingData]);

	const carPrice = selectedCar?.web_price ? Number(selectedCar.web_price) : 0;

	// Calculate tickets cost
	const ticketsCost = useMemo(() => {
		if (!tickets) return 0;
		const selected = tickets.filter((t) => selectedTickets.includes(t.id));
		const sum = selected.reduce((acc, t) => acc + t.price, 0);
		return sum * persons;
	}, [selectedTickets, persons, tickets]);

	// Subtotal (car + tickets)
	const subtotal = carPrice + ticketsCost;

	// Tax (from bookingData.tax, e.g. 0.15)
	const taxRate = bookingData?.tax ? Number(bookingData.tax) : 0.15;
	const taxAmount = subtotal * taxRate;

	// Grand total
	const grandTotal = subtotal + taxAmount;

	return (
		<div>
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
										<FormLabel>
											{language === "ar" ? "الوقت" : "Time"}
										</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
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
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
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
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
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
								{language === "ar"
									? "معلومات إضافية"
									: "Additional information"}
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
					<h3 className="text-center text-xl font-semibold my-8 bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
						{language === "ar"
							? "يمكنك اختيار تذكرة إذا كنت ترغب في ذلك"
							: "You can choose a ticket if you want to"}
					</h3>
					<div className="flex flex-col md:flex-row gap-8">
						<div className="flex-1.5">
							<TicketSelector
								tickets={tickets}
								selected={selectedTickets}
								setSelected={setSelectedTickets}
								language={language}
							/>
						</div>
						<div className="flex-1 flex flex-col items-center justify-center">
							<div className="bg-white/70 border border-blue-200 rounded-xl p-6 shadow-md w-full max-w-xs mx-auto">
								<div className="text-lg font-semibold mb-2 text-center">
									{language === "ar" ? "ملخص السعر" : "Cost Summary"}
								</div>
								<div className="mb-2 flex justify-between">
									<span>{language === "ar" ? "المركبة" : "Vehicle"}</span>
									<span className="flex items-center">
										<CurrencyIcon className="w-5 h-5 mr-1" />
										{carPrice}
									</span>
								</div>
								{tickets && (
									<div className="mb-2 flex justify-between">
										<span>{language === "ar" ? "التذاكر" : "Tickets"}</span>
										<span className="flex items-center">
											<CurrencyIcon className="w-5 h-5 mr-1" />
											{ticketsCost}
										</span>
									</div>
								)}
								<div className="mb-2 flex justify-between border-t pt-2">
									<span>{language === "ar" ? "المجموع" : "Subtotal"}</span>
									<span className="flex items-center">
										<CurrencyIcon className="w-5 h-5 mr-1" />
										{subtotal}
									</span>
								</div>
								<div className="mb-2 flex justify-between">
									<span>{language === "ar" ? "الضريبة" : "Tax"}</span>
									<span className="flex items-center">
										<CurrencyIcon className="w-5 h-5 mr-1" />
										{taxAmount.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between font-bold text-blue-700 text-lg mt-4 border-t pt-3">
									<span>{language === "ar" ? "الإجمالي" : "Total"}</span>
									<span className="flex items-center">
										<CurrencyIcon className="w-6 h-6 mr-1" />
										{grandTotal.toFixed(2)}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col md:flex-row justify-center mt-8 gap-4 ">
						<Button
							type="submit"
							className="w-full max-w-sm h-[60px] bg-gradient-to-r from-blue-600 to-teal-400 hover:to-teal-500 transition-colors duration-300 text-white text-xl py-4 rounded-xl shadow-lg"
							disabled={formLoading}
						>
							{formLoading
								? language === "ar"
									? "جاري الإرسال..."
									: "Sending..."
								: language === "ar"
								? "الدفع لاحقًا"
								: "Pay later"}
						</Button>
						<Button
							type="button"
							className="w-full max-w-sm h-[60px] bg-gradient-to-r from-blue-600 to-teal-400 hover:to-teal-500 transition-colors duration-300 text-white text-xl py-4 rounded-xl shadow-lg"
							disabled={paymentLoading}
							onClick={createDraftAndPay}
						>
							{paymentLoading
								? language === "ar"
									? "جاري الإرسال..."
									: "Sending..."
								: language === "ar"
								? "الدفع الآن"
								: "Pay now"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
