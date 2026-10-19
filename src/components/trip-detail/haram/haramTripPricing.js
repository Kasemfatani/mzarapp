export const HARAM_CASH_FEE_SAR = 5;
export const HARAM_REFERENCE_PRICE_MARKUP_PERCENT = 25;
const SAR_PER_USD = 3.75;
const HARAM_REFERENCE_PRICE_SAR = 199;
const HARAM_REFERENCE_PRICE_USD = 53;

function roundMoney(value) {
	return Number((Number(value || 0) + Number.EPSILON).toFixed(2));
}

function roundUpToWholeRiyal(value) {
	return Math.ceil(roundMoney(value));
}

export function getHaramOfferPrices({ price = 0, taxRate = 0 }) {
	// Round the VAT-inclusive per-person amount up to a whole Riyal. The crossed-out reference price is fixed display copy.
	const currentPrice = roundUpToWholeRiyal(Number(price) * (1 + Number(taxRate || 0)));

	return { currentPrice };
}

export function formatHaramReferencePrice(lang = "en") {
	if (lang === "ar") {
		return `${new Intl.NumberFormat("ar-SA", { maximumFractionDigits: 0 }).format(HARAM_REFERENCE_PRICE_SAR)} ريال`;
	}

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(HARAM_REFERENCE_PRICE_USD);
}

export function getHaramQuote({
	price = 0,
	people = 1,
	taxRate = 0,
	discountPercent = 0,
	paymentMethod = "online",
}) {
	const subtotal = roundMoney(Number(price) * Number(people));
	const discount = roundMoney(subtotal * (Number(discountPercent) / 100));
	const taxableAmount = roundMoney(Math.max(0, subtotal - discount));
	const perPersonTaxableAmount = Number(people) > 0 ? taxableAmount / Number(people) : 0;
	const perPersonTotal = roundUpToWholeRiyal(perPersonTaxableAmount * (1 + Number(taxRate || 0)));
	const totalBeforeCashFee = roundMoney(perPersonTotal * Number(people));
	const tax = roundMoney(totalBeforeCashFee - taxableAmount);
	const cashFee = paymentMethod === "cash" ? HARAM_CASH_FEE_SAR : 0;

	return {
		subtotal,
		discount,
		taxableAmount,
		tax,
		cashFee,
		total: roundMoney(totalBeforeCashFee + cashFee),
	};
}

export function formatHaramMoney(amountSAR, lang = "en") {
	const isArabic = lang === "ar";
	const amount = isArabic ? Number(amountSAR) : Number(amountSAR) / SAR_PER_USD;
	if (isArabic) {
		const formattedAmount = new Intl.NumberFormat("ar-SA", {
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		}).format(Number.isFinite(amount) ? amount : 0);
		return `${formattedAmount} ريال`;
	}

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(Number.isFinite(amount) ? amount : 0);
}

export function formatHaramNumber(value, lang = "en") {
	return new Intl.NumberFormat(lang === "ar" ? "ar-SA" : "en-US", {
		maximumFractionDigits: 0,
	}).format(Number(value) || 0);
}
