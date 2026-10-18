import Image from "next/image";
import styles from "./BusTripDetail.module.css";

export default function BusTripPartners({ copy }) {
	return (
		<section className={styles.partners} aria-label={copy.sponsorLabel}>
			<div className={styles.partner}>
				<span>{copy.sponsorLabel}</span>
				<Image
					src="/trip-detail/96/royal-commission.png"
					alt={copy.sponsorAlt}
					width={280}
					height={78}
					className={styles.sponsorLogo}
				/>
			</div>
			<span className={styles.partnerDivider} aria-hidden="true" />
			<div className={styles.partner}>
				<span>{copy.carrierLabel}</span>
				<Image
					src="/trip-detail/96/carrier.svg"
					alt={copy.carrierAlt}
					width={170}
					height={75}
					className={styles.carrierLogo}
				/>
			</div>
		</section>
	);
}

