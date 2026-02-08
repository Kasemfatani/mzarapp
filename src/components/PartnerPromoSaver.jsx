"use client";
import { useEffect } from "react";

export default function PartnerPromoSaver({ promoCode = null }) {
	useEffect(() => {
		try {
			const code =
				promoCode ??
				new URLSearchParams(window.location.search).get("promo_code");
			if (!code) return;
			const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
			localStorage.setItem("partnerPromoCode", code);
			localStorage.setItem("partnerPromoCodeExpiry", expiry.toString());
		} catch (e) {
			/* ignore errors */
		}
	}, [promoCode]);

	return null;
}
