import { BUS_CASH_FEE_SAR } from "./busTripPricing";
import styles from "./BusTripBookingCard.module.css";

export default function BusTripPaymentMethodField({
	lang = "en",
	value = "online",
	onChange,
	disabled = false,
}) {
	const isAr = lang === "ar";
	const methods = [
		{
			id: "online",
			label: isAr ? "أونلاين" : "Online",
		detail: isAr ? "دون رسوم إضافية" : "No extra fee",
		},
		{
			id: "cash",
			label: isAr ? "نقدًا" : "Cash",
			detail: isAr ? `+ ${BUS_CASH_FEE_SAR} ريال للحجز` : `+ SAR ${BUS_CASH_FEE_SAR} per booking`,
		},
	];

	return (
		<fieldset className={styles.paymentMethods} disabled={disabled}>
			<legend>{isAr ? "طريقة الدفع *" : "Payment method *"}</legend>
			<div className={styles.paymentChoices}>
				{methods.map((method) => {
					const selected = value === method.id;
					return (
						<label
							key={method.id}
							className={`${styles.paymentChoice} ${selected ? styles.selectedPaymentChoice : ""}`}
						>
							<input
								type="radio"
								name="bus-payment-method"
								value={method.id}
								checked={selected}
								onChange={() => onChange?.(method.id)}
							/>
							<span className={styles.paymentChoiceCopy}>
								<strong>{method.label}</strong>
								<small>{method.detail}</small>
							</span>
						</label>
					);
				})}
			</div>
		</fieldset>
	);
}
