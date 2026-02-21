"use client";
import { useEffect } from "react";

export default function HaramPromoSaver() {
	useEffect(() => {
		try {
			const code = new URLSearchParams(window.location.search).get("promo_code");
			if (!code) return;
			const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
			localStorage.setItem("haramPromoCode", code);
			localStorage.setItem("haramPromoCodeExpiry", expiry.toString());
		} catch (e) {
			/* ignore errors */
		}
	}, []);

	return null;
}
