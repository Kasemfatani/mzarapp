"use client";

import { useEffect } from "react";
import { useCurrentLocale } from "@/lib/useLocale";

const WHATSAPP_NUMBER = "966580121025";

export default function WhatsAppBookingRedirect() {
	const { isAr } = useCurrentLocale();

	useEffect(() => {
		const handleGlobalClick = (e) => {
			const anchor = e.target.closest("a");
			if (!anchor || !anchor.href) return;

			if (
				anchor.hasAttribute("data-no-intercept") ||
				anchor.closest("[data-no-whatsapp-intercept]")
			) {
				return;
			}

			const rawHref = anchor.getAttribute("href") || "";
			let pathname = "";
			try {
				pathname = new URL(anchor.href, window.location.origin).pathname;
			} catch {
				pathname = rawHref.split("?")[0];
			}

			const isBookMadinah = pathname.startsWith("/book-madinah") || rawHref.includes("book-madinah");
			const isBookHaram = pathname.startsWith("/book-haram") || rawHref.includes("book-haram");
			const isBookTour = pathname.startsWith("/book-tour") || rawHref.includes("book-tour");
			const isBookPath = pathname.startsWith("/book-path") || rawHref.includes("book-path");

			if (!isBookMadinah && !isBookHaram && !isBookTour && !isBookPath) {
				return;
			}

			e.preventDefault();
			e.stopPropagation();

			const card =
				anchor.closest("article, .group, [class*='card'], .ready-cont, section, .container") ||
				document;
			const titleEl = card.querySelector(
				"h1, h2, h3, h4, .title, [class*='title'], [class*='name']",
			);
			const extractedName = titleEl
				? titleEl.textContent.trim().replace(/\s+/g, " ")
				: "";

			let message = "";
			if (isBookMadinah) {
				message = isAr
					? "السلام عليكم، أرغب بحجز جولة المسجد النبوي الإثرائية"
					: "Hello, I would like to book the Prophet's Mosque Tour";
			} else if (isBookHaram) {
				message = isAr
					? "السلام عليكم، أرغب بحجز جولة المسجد الحرام الإثرائية"
					: "Hello, I would like to book the Grand Mosque Tour";
			} else if (isBookTour) {
				message = isAr
					? extractedName
						? `السلام عليكم، أرغب بحجز جولة ${extractedName}`
						: "السلام عليكم، أرغب بحجز جولة سياحية"
					: extractedName
					? `Hello, I would like to book the ${extractedName} tour`
					: "Hello, I would like to book a tour";
			} else if (isBookPath) {
				message = isAr
					? extractedName
						? `السلام عليكم، أرغب بحجز مسار ${extractedName}`
						: "السلام عليكم، أرغب بحجز مسار إثرائي"
					: extractedName
					? `Hello, I would like to book the ${extractedName} trail`
					: "Hello, I would like to book a trail experience";
			}

			const targetUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
			window.open(targetUrl, "_blank", "noopener,noreferrer");
		};

		document.addEventListener("click", handleGlobalClick);
		return () => document.removeEventListener("click", handleGlobalClick);
	}, [isAr]);

	return null;
}
