"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import Loading from "@/app/loading";
import { API_BASE_URL } from "@/lib/apiConfig";
import { toast } from "sonner";
// import DownloadButtons from "./DownloadButtons"

const STORAGE_KEY = "bookTour.selection";

const messages = {
	en: {
		title: "Your booking is confirmed",
		bookingNo: "Booking No:",
		thanks: "Thank you!",
		done: "Your booking is complete. You should receive an email with your booking details.",
		downloadTicket: "Download your ticket",
		sendWhatsapp: "Send your ticket to WhatsApp",
		getApp: "Get the app",
		googlePlay: "Get it on Google Play",
		appStore: "Download on the App Store",
	},
	ar: {
		title: "تم تأكيد حجزك بنجاح",
		bookingNo: "رقم الحجز:",
		thanks: "شكرًا لك!",
		done: "تم إكمال حجزك. ستصلك رسالة بريد إلكتروني بتفاصيل الحجز.",
		downloadTicket: "تحميل تذكرتك",
		sendWhatsapp: "إرسال تذكرتك إلى واتساب",
		getApp: "تنزيل التطبيق",
		googlePlay: "احصل عليه من Google Play",
		appStore: "حمِّله من App Store",
	},
};

export default function SuccessSummary({ initialLang = "en" }) {
	const lang = initialLang === "ar" ? "ar" : "en";
	const t = {
		// keep your existing messages or reuse prior block
		en: {
			title: "Your booking is confirmed",
			bookingNo: "Booking No:",
			thanks: "Thank you!",
			done: "Your booking is complete. You should receive an email with your booking details.",
			downloadTicket: "Download your ticket",
			sendWhatsapp: "Send your ticket to WhatsApp",
			getApp: "Get the app",
			googlePlay: "Get it on Google Play",
			appStore: "Download on the App Store",
		},
		ar: {
			title: "تم تأكيد حجزك بنجاح",
			bookingNo: "رقم الحجز:",
			thanks: "شكرًا لك!",
			done: "تم إكمال حجزك. ستصلك رسالة بريد إلكتروني بتفاصيل الحجز.",
			downloadTicket: "تحميل تذكرتك",
			sendWhatsapp: "إرسال تذكرتك إلى واتساب",
			getApp: "تنزيل التطبيق",
			googlePlay: "احصل عليه من Google Play",
			appStore: "حمِّله من App Store",
		},
	}[lang];

	const [submitting, setSubmitting] = useState(true);
	const [bookingNo, setBookingNo] = useState("");
	const [date, setDate] = useState("");
	const [timeName, setTimeName] = useState("");

	// On mount: create booking with backend using localStorage + tranid from URL
	useEffect(() => {
		(async () => {
			if (typeof window === "undefined") return;

			const params = new URLSearchParams(window.location.search);
			const status = params.get("status");
			const tranid =
				params.get("tranid") ||
				params.get("TranId") ||
				params.get("trackId") ||
				params.get("trackid") ||
				"";

			if (status !== "success" || !tranid) {
				toast.error(
					lang === "ar" ? "فشلت عملية الدفع" : "Payment was not successful"
				);
				window.location.replace("/book-tour");
				return;
			}

			// Read selection from localStorage
			let selection;
			try {
				selection = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
			} catch {
				selection = null;
			}
			if (
				!selection ||
				!selection.date ||
				!selection.time?.id ||
				!selection.meetingPoint?.id ||
				!selection.info?.name ||
				!selection.info?.email
			) {
				toast.error(
					lang === "ar" ? "بيانات الحجز غير مكتملة" : "Booking data incomplete"
				);
				window.location.replace("/book-tour");
				return;
			}

			// Save UI fields
			setDate(selection.date);
			setTimeName(selection.time?.name || "");

			const payload = {
				date: selection.date,
				time_id: Number(selection.time.id),
				meetingPoint_id: Number(selection.meetingPoint.id),
				people: Number(selection.info.people || 1),
				name: selection.info.name,
				email: selection.info.email,
				phone: selection.info.phone || "",
				whatsapp: selection.info.whatsapp || "",
				phone_country_code: selection.info.phone_country_code || "",
				whatsapp_country_code: selection.info.whatsapp_country_code || "",
				bus_id: Number(selection.bus_id || 1),
				payment_method: "online",
				transaction_id: tranid,
			};

			try {
				const res = await fetch(
					`${API_BASE_URL}/landing/home/bus-booking-create`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							lang,
						},
						body: JSON.stringify(payload),
					}
				);
				const json = await res.json().catch(() => ({}));
				if (!res.ok) {
					throw new Error(json?.error || "Create booking failed");
				}
        console.log("bus-booking-create response", res);
				// If API returns a reference number, capture it
				const refNo = json?.data?.ref_no || json?.ref_no || "";
				if (refNo) setBookingNo(refNo);

				setSubmitting(false);
			} catch (e) {
				console.error("bus-booking-create error", e);
				toast.error(
					lang === "ar" ? "تعذر إكمال الحجز" : "Could not finalize booking"
				);
				window.location.replace("/book-tour");
			}
		})();
	}, [lang]);

	if (submitting) {
		return <Loading />;
	}

	return (
		<section className="container mx-auto px-6 md:px-20 my-12">
			<div className="flex flex-col items-center text-center">
				<div className="size-28 md:size-32 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
					<CheckCircle2 className="text-emerald-600" size={56} />
				</div>
				<h1 className="text-2xl md:text-3xl font-extrabold mb-3">{t.title}</h1>
				{bookingNo ? (
					<div className="text-muted-foreground mb-4 text-lg">
						<span className="font-semibold">{t.bookingNo}</span>{" "}
						<span className="font-mono">#{bookingNo}</span>
					</div>
				) : null}
				<p className="max-w-2xl text-gray-700 mb-8">
					<span className="font-semibold">{t.thanks}</span> {t.done}
				</p>
				<div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8">
					<div className="flex items-center gap-3 border rounded-full px-4 py-2">
						<Calendar className="text-gray-600" size={18} />
						<span className="text-sm md:text-base">{date || "—"}</span>
					</div>
					<div className="flex items-center gap-3 border rounded-full px-4 py-2">
						<Clock className="text-gray-600" size={18} />
						<span className="text-sm md:text-base">{timeName || "—"}</span>
					</div>
				</div>
				<div
					className={cn(
						"flex flex-col md:flex-row gap-4 mb-12 w-full justify-center"
					)}
				>
					<a
						href="/book-tour/ticket"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center h-12 px-6 rounded-lg text-white bg-[var(--main-color,#14532d)] hover:bg-[var(--sec-color,#86efac)] hover:text-black transition-colors"
					>
						{t.downloadTicket}
					</a>
					{/* <a
						href="#"
						className="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-[var(--main-color,#14532d)] text-[var(--main-color,#14532d)] hover:bg-[var(--main-color,#14532d)] hover:text-white transition-colors"
					>
						{t.sendWhatsapp}
					</a> */}
				</div>
				{/* keep your app badges/buttons here */}
        {/* <h2 className="text-2xl md:text-3xl">{t.getApp}</h2>
        <DownloadButtons language={lang} /> */}
			</div>
		</section>
	);
}
