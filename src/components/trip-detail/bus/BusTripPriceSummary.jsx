import { BUS_CASH_FEE_SAR, BUS_SAR_PER_USD, formatBusMoney, getBusTripQuote } from "./busTripPricing";
import styles from "./BusTripBookingCard.module.css";

export function BusTripPriceSummary({
	adultPrice = 0,
	quantity = 1,
	tax = 0,
	promoDiscountPercent = 0,
	paymentMethod = "online",
	lang = "en",
}) {
	const isAr = lang === "ar";
	const quote = getBusTripQuote({
		adultUnitPrice: adultPrice,
		adultCount: quantity,
		taxRate: tax,
		promoDiscountPercent,
		paymentMethod,
	});
	const price = (value) => formatBusMoney(value, lang);

	return (
		<section className={styles.priceSummary} aria-live="polite" aria-labelledby="bus-price-summary-title">
			<div className={styles.priceLines}>
				<div>
					<span>{quantity} × {price(quote.unitGrossSAR)}</span>
					<strong>{price(quote.subtotalSAR)}</strong>
				</div>
				{quote.discountSAR > 0 && (
					<div className={styles.discountLine}>
						<span>{isAr ? "خصم كود الترويج" : "Promo code discount"}</span>
						<strong>− {price(quote.discountSAR)}</strong>
					</div>
				)}
				{paymentMethod === "cash" && (
					<div className={styles.cashFeeLine}>
						<span>{isAr ? "رسوم الدفع النقدي" : "Cash payment fee"}</span>
						<strong>+ {price(BUS_CASH_FEE_SAR)}</strong>
					</div>
				)}
			</div>
			<div className={styles.finalTotal}>
				<div>
					<strong id="bus-price-summary-title">{isAr ? "الإجمالي النهائي" : "Final total"}</strong>
					<span>{isAr ? "شامل الضريبة والرسوم" : "Tax and fees included"}</span>
				</div>
				<strong aria-live="polite">{price(quote.totalSAR)}</strong>
			</div>
			{!isAr && (
				<p className={styles.currencyNote}>
					{"USD equivalent at SAR " + BUS_SAR_PER_USD + " = $1. Charged in SAR: "}
					<strong>{quote.totalSAR.toFixed(2)} SAR</strong>
					{paymentMethod === "cash" ? ". Pay this SAR amount in cash." : "."}
				</p>
			)}
		</section>
	);
}
