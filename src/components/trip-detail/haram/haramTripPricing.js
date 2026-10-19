export const HARAM_CASH_FEE_SAR = 5;
export const HARAM_REFERENCE_PRICE_MARKUP_PERCENT = 25;
const SAR_PER_USD = 3.75;

function roundMoney(value) {
	return Number((Number(value || 0) + Number.EPSILON).toFixed(2));
}

export function getHaramOfferPrices({ price = 0, taxRate = 0 }) {
	// The API price is VAT-exclusive. The current price includes VAT; only the reference price adds 25%.
	const currentPrice = roundMoney(Number(price) * (1 + Number(taxRate || 0)));
	const originalPrice = roundMoney(currentPrice * (1 + HARAM_REFERENCE_PRICE_MARKUP_PERCENT / 100));

	return { currentPrice, originalPrice };
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
	const tax = roundMoney(taxableAmount * Number(taxRate || 0));
	const cashFee = paymentMethod === "cash" ? HARAM_CASH_FEE_SAR : 0;

	return {
		subtotal,
		discount,
		taxableAmount,
		tax,
		cashFee,
		total: roundMoney(taxableAmount + tax + cashFee),
	};
}

export function formatHaramMoney(amountSAR, lang = "en") {
	const isArabic = lang === "ar";
	const amount = isArabic ? Number(amountSAR) : Number(amountSAR) / SAR_PER_USD;
	if (isArabic) {
		const formattedAmount = new Intl.NumberFormat("ar-SA", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(Number.isFinite(amount) ? amount : 0);
		return `${formattedAmount} ريال`;
	}

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 2,
	}).format(Number.isFinite(amount) ? amount : 0);
}

export function formatHaramNumber(value, lang = "en") {
	return new Intl.NumberFormat(lang === "ar" ? "ar-SA" : "en-US", {
		maximumFractionDigits: 0,
	}).format(Number(value) || 0);
}
