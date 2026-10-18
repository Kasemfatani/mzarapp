export const BUS_CASH_FEE_SAR = 5;
export const BUS_SAR_PER_USD = 3.75;

export function getBusAdultGroup(agePrices = []) {
	return agePrices.find((group) => {
		const label = [group.name, group.name_ar, group.name_en, group.label]
			.filter(Boolean)
			.join(" ")
			.toLowerCase();
		const minAge = Number(group.min_age ?? group.age_from ?? group.from_age);
		return /adult|بالغ|بالغين/.test(label) || (Number.isFinite(minAge) && minAge >= 12);
	}) || agePrices[0];
}

function roundMoney(value) {
	return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

export function getBusTripQuote({
	adultUnitPrice = 0,
	adultCount = 1,
	taxRate = 0,
	promoDiscountPercent = 0,
	paymentMethod = "online",
}) {
	const netUnitPrice = Math.max(0, Number(adultUnitPrice) || 0);
	const tax = Math.max(0, Number(taxRate) || 0);
	const count = Math.max(0, Number(adultCount) || 0);
	const unitGrossSAR = roundMoney(netUnitPrice * (1 + tax));
	const subtotalSAR = roundMoney(unitGrossSAR * count);
	const netSubtotalSAR = roundMoney(netUnitPrice * count);
	const discountPercent = Math.min(100, Math.max(0, Number(promoDiscountPercent) || 0));
	const discountSAR = roundMoney(subtotalSAR * (discountPercent / 100));
	const guestTotalSAR = roundMoney(Math.max(0, subtotalSAR - discountSAR));
	const taxSAR = tax > 0 ? roundMoney(guestTotalSAR * (tax / (1 + tax))) : 0;
	const cashFeeSAR = paymentMethod === "cash" ? BUS_CASH_FEE_SAR : 0;

	return {
		unitGrossSAR,
		netSubtotalSAR,
		subtotalSAR,
		discountSAR,
		guestTotalSAR,
		taxSAR,
		cashFeeSAR,
		totalSAR: roundMoney(guestTotalSAR + cashFeeSAR),
	};
}

export function formatBusMoney(amountSAR, lang = "en") {
	const amount = Number(amountSAR) || 0;
	if (lang === "ar") {
		const number = new Intl.NumberFormat("ar-SA", { maximumFractionDigits: 2 }).format(amount);
		return `${number} ريال`;
	}

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount / BUS_SAR_PER_USD);
}

export function formatBusDate(value, lang = "en") {
	if (!value) return "";
	const date = value instanceof Date
		? value
		: typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
			? new Date(`${value}T12:00:00`)
			: new Date(value);
	if (Number.isNaN(date.getTime())) return "";

	return new Intl.DateTimeFormat(lang === "ar" ? "ar-SA" : "en-US", {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date);
}
