const PARTNER_ID_KEY = "partnerId";
const PARTNER_ID_EXPIRY_KEY = "partnerIdExpiry";
const PARTNER_ID_TTL_MS = 24 * 60 * 60 * 1000;

function normalizePartnerId(value) {
	const normalized = String(value ?? "").trim();
	if (!/^\d+$/.test(normalized)) return null;

	const partnerId = Number(normalized);
	return Number.isSafeInteger(partnerId) && partnerId > 0 ? partnerId : null;
}

export function savePartnerId(value) {
	const partnerId = normalizePartnerId(value);
	if (!partnerId || typeof window === "undefined") return null;

	try {
		localStorage.setItem(PARTNER_ID_KEY, String(partnerId));
		localStorage.setItem(
			PARTNER_ID_EXPIRY_KEY,
			String(Date.now() + PARTNER_ID_TTL_MS),
		);
		return partnerId;
	} catch {
		return null;
	}
}

export function getPartnerId() {
	if (typeof window === "undefined") return null;

	try {
		const params = new URLSearchParams(window.location.search);
		const queryPartnerId = params.get("partner_id")?.trim();
		if (queryPartnerId) {
			const savedPartnerId = savePartnerId(queryPartnerId);
			if (savedPartnerId) return savedPartnerId;
			localStorage.removeItem(PARTNER_ID_KEY);
			localStorage.removeItem(PARTNER_ID_EXPIRY_KEY);
			return null;
		}

		const storedPartnerId = normalizePartnerId(localStorage.getItem(PARTNER_ID_KEY));
		const expiry = Number.parseInt(
			localStorage.getItem(PARTNER_ID_EXPIRY_KEY) || "0",
			10,
		);
		if (!storedPartnerId || !expiry || Date.now() > expiry) {
			localStorage.removeItem(PARTNER_ID_KEY);
			localStorage.removeItem(PARTNER_ID_EXPIRY_KEY);
			return null;
		}

		return storedPartnerId;
	} catch {
		return null;
	}
}
