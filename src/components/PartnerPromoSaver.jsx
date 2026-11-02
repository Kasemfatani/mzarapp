"use client";
import { useEffect } from "react";
import { getPartnerId, savePartnerId } from "@/lib/partnerAttribution";

export default function PartnerPromoSaver({ promoCode = null, partnerId = null }) {
	useEffect(() => {
		try {
			const params = new URLSearchParams(window.location.search);
			const code = promoCode ?? params.get("promo_code");
			if (code) {
				const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
				localStorage.setItem("partnerPromoCode", code);
				localStorage.setItem("partnerPromoCodeExpiry", expiry.toString());
			}

			const incomingPartnerId = partnerId ?? params.get("partner_id");
			if (incomingPartnerId) {
				if (!savePartnerId(incomingPartnerId)) {
					localStorage.removeItem("partnerId");
					localStorage.removeItem("partnerIdExpiry");
				}
			} else {
				getPartnerId(); // Clear an expired saved partner ID.
			}
		} catch (e) {
			/* ignore errors */
		}
	}, [promoCode, partnerId]);

	return null;
}
