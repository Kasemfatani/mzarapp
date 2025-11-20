"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import Loading from "@/app/loading";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
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

		// Fallback (payment ok but booking not finalized)
		paymentOk: "Payment received",
		finalizeFailedTitle: "We couldn’t finalize your booking",
		finalizeFailedDesc:
			"Your payment was successful, but there was a problem finalizing your booking. Please save the transaction ID below and contact our support team.",
		transactionId: "Transaction ID",
		takeScreenshot: "Tip: Take a screenshot of this page.",
		contactSupport: "Contact support",
		callUs: "Call us",
		whatsappUs: "WhatsApp us",
		emailUs: "Email us",
		copy: "Copy",
		copied: "Copied",
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

		// Fallback (payment ok but booking not finalized)
		paymentOk: "تم استلام الدفع",
		finalizeFailedTitle: "تعذر إكمال الحجز",
		finalizeFailedDesc:
			"تمت عملية الدفع بنجاح، لكن حدثت مشكلة عند إتمام الحجز. يرجى حفظ رقم العملية أدناه والتواصل مع فريق الدعم.",
		transactionId: "رقم العملية",
		takeScreenshot: "معلومة: التقط لقطة شاشة لهذه الصفحة.",
		contactSupport: "تواصل مع الدعم",
		callUs: "اتصل بنا",
		whatsappUs: "واتساب",
		emailUs: "البريد الإلكتروني",
		copy: "نسخ",
		copied: "تم النسخ",
	},
};

export default function SuccessSummary({ initialLang = "en" }) {
	const lang = initialLang === "ar" ? "ar" : "en";
	const t = messages[lang];

	const [submitting, setSubmitting] = useState(true);
	const [bookingNo, setBookingNo] = useState("");
	const [date, setDate] = useState("");
	const [timeName, setTimeName] = useState("");
	const [data, setData] = useState("");
	const [tranId, setTranId] = useState("");
	const [finalizeError, setFinalizeError] = useState(false);
	const [selection, setSelection] = useState(null);
	const [copied, setCopied] = useState(false);
	const [ticketUrl, setTicketUrl] = useState("");

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

			// Persist tran id for UI
			setTranId(tranid);

			if (status !== "success" || !tranid) {
				toast.error(
					lang === "ar" ? "فشلت عملية الدفع" : "Payment was not successful"
				);
				// Keep behavior: go back to booking if payment didn't succeed
				window.location.replace("/book-tour");
				return;
			}

			// Read selection from localStorage
			let sel;
			try {
				sel = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
			} catch {
				sel = null;
			}
			setSelection(sel || null);

			// Clear localStorage to prevent resubmission on refresh
			// localStorage.removeItem(STORAGE_KEY);

			if (
				!sel ||
				!sel.date ||
				!sel.time?.id ||
				!sel.customer_id ||
				!sel.process_id ||
				!sel.trip_id
			) {
				// Payment is ok, but we lack data to create booking
				setFinalizeError(true);
				setSubmitting(false);
				return;
			}

			// Save UI fields
			setDate(sel.date);
			setTimeName(sel.time?.name || "");
			setTicketUrl(sel.ticket || "");

			const payload = {
				trip_id: sel.trip_id,
				customer_id: sel.customer_id,
				process_id: sel.process_id,
				transaction_id: tranid,
			};

			try {
				const res = await fetch(
					`${API_BASE_URL_NEW}/customer/landing-bus-trip/booking-payment`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
							lang,
						},
						body: JSON.stringify(payload),
					}
				);
				const json = await res.json().catch(() => ({}));
				if (!res.ok || !json.status) {
					toast.error(
						(lang === "ar"
							? "حدث خطأ أثناء إتمام الحجز: "
							: "Something went wrong finalizing the booking: ") +
							(json.message || "")
					);
					setFinalizeError(true);
					setSubmitting(false);
					return;
				}
				// If API returns a reference number, capture it
				const refNo = json?.data?.ref_no || "";
				if (refNo) setBookingNo(refNo);
				setData(json?.data || "");
				setSubmitting(false);
			} catch (e) {
				console.error("bus-booking-create error", e);
				// Don't redirect; show graceful fallback instead
				setFinalizeError(true);
				setSubmitting(false);
				// Optional gentle toast confirming payment and guiding next step
				// toast.success(
				// 	lang === "ar" ? "تم الدفع بنجاح" : "Payment successful"
				// );
				// toast.warning(
				// 	lang === "ar"
				// 		? "حدثت مشكلة أثناء إتمام الحجز. يُرجى التواصل مع الدعم."
				// 		: "We couldn’t finalize your booking. Please contact support."
				// );
			}
		})();
	}, [lang]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(tranId || "");
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			// ignore
		}
	};

	// Support CTAs with prefilled text including the transaction id and basic context
	const name = selection?.info?.name || "";
	const baseLineEn =
		`I completed a payment but the system could not finalize my booking.\n` +
		`Transaction ID: ${tranId}\n` +
		(name ? `Name: ${name}\n` : "") +
		(date ? `Date: ${date}\n` : "") +
		(timeName ? `Time: ${timeName}\n` : "");
	const baseLineAr =
		`لقد أكملت عملية الدفع ولكن لم يتم إتمام الحجز.\n` +
		`رقم العملية: ${tranId}\n` +
		(name ? `الاسم: ${name}\n` : "") +
		(date ? `التاريخ: ${date}\n` : "") +
		(timeName ? `الوقت: ${timeName}\n` : "");

	const whatsappHref = `https://wa.me/+966580121025?text=${encodeURIComponent(
		lang === "ar" ? baseLineAr : baseLineEn
	)}`;
	const emailSubject =
		lang === "ar"
			? `مزار - تم الدفع وتعذر إتمام الحجز - ${tranId}`
			: `Mzar - Payment received, booking not finalized - ${tranId}`;
	const emailBody = lang === "ar" ? baseLineAr : baseLineEn;
	const emailHref = `mailto:contact@mzarapp.com?subject=${encodeURIComponent(
		emailSubject
	)}&body=${encodeURIComponent(emailBody)}`;

	if (submitting) {
		return <Loading />;
	}

	return (
		<section className="container mx-auto px-6 md:px-20 my-12">
			<div className="flex flex-col items-center text-center">
				<div className="size-28 md:size-32 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
					<CheckCircle2 className="text-emerald-600" size={56} />
				</div>

				{/* If booking finalized */}
				{!finalizeError ? (
					<>
						<h1 className="text-2xl md:text-3xl font-extrabold mb-3">
							{t.title}
						</h1>
						{bookingNo ? (
							<div className="text-muted-foreground mb-4 text-lg">
								<span className="font-semibold">{t.bookingNo}</span>{" "}
								<span className="font-mono">{bookingNo}</span>
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
							{ticketUrl ? (
								<a
									href={ticketUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center h-12 px-6 rounded-lg text-white bg-[var(--main-color,#14532d)] hover:bg-[var(--sec-color,#86efac)] hover:text-black transition-colors"
								>
									{t.downloadTicket}
								</a>
							) : null}
							{/* Keep WhatsApp share of ticket if needed later */}
						</div>
					</>
				) : (
					// Fallback UI: payment ok, booking not finalized
					<>
						<h1 className="text-2xl md:text-3xl font-extrabold mb-2">
							{t.paymentOk}
						</h1>
						<h2 className="text-xl md:text-2xl font-semibold text-red-600 mb-4">
							{t.finalizeFailedTitle}
						</h2>
						<p className="max-w-2xl text-gray-700 mb-6">
							{t.finalizeFailedDesc}
						</p>

						{/* Transaction ID box with copy */}
						<div className="flex items-center gap-3 border rounded-lg px-4 py-3 mb-4">
							<span className="font-medium">{t.transactionId}:</span>
							<span className="font-mono text-sm md:text-base">
								{tranId || "—"}
							</span>
							{tranId ? (
								<button
									onClick={handleCopy}
									className="ml-2 px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100"
								>
									{copied ? t.copied : t.copy}
								</button>
							) : null}
						</div>
						<div className="text-gray-500 mb-8">{t.takeScreenshot}</div>

						{/* Support CTAs */}
						<div className="w-full flex flex-col md:flex-row gap-3 justify-center mb-10">
							{/* <a
								href="tel:920005785"
								className="inline-flex items-center justify-center h-11 px-5 rounded-lg text-white bg-[var(--main-color,#14532d)] hover:bg-[var(--sec-color,#86efac)] hover:text-black transition-colors"
							>
								{t.callUs} (920005785)
							</a> */}
							<a
								href={whatsappHref}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center h-11 px-5 rounded-lg border border-[var(--main-color,#14532d)] text-[var(--main-color,#14532d)] hover:bg-[var(--main-color,#14532d)] hover:text-white transition-colors"
							>
								{t.whatsappUs} (+966580121025)
							</a>
							{/* <a
								href={emailHref}
								className="inline-flex items-center justify-center h-11 px-5 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
							>
								{t.emailUs} (contact@mzarapp.com)
							</a> */}
						</div>

						{/* Show date/time we know to help support */}
						<div className="flex flex-col md:flex-row gap-4 md:gap-8">
							<div className="flex items-center gap-3 border rounded-full px-4 py-2">
								<Calendar className="text-gray-600" size={18} />
								<span className="text-sm md:text-base">{date || "—"}</span>
							</div>
							<div className="flex items-center gap-3 border rounded-full px-4 py-2">
								<Clock className="text-gray-600" size={18} />
								<span className="text-sm md:text-base">{timeName || "—"}</span>
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
