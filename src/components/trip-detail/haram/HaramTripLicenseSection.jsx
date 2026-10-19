import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import styles from "./HaramTripDetail.module.css";

export default function HaramTripLicenseSection({ copy }) {
	return (
		<section className={styles.license} aria-label={copy.licenseTitle}>
			<Image src="/trip-detail/88/authority.png" alt={copy.licenseAlt} width={112} height={84} />
			<span className={styles.licenseDivider} aria-hidden="true" />
			<div className={styles.licenseCopy}>
				<strong>{copy.licenseTitle}</strong>
				<p>{copy.licenseDescription}</p>
			</div>
			<span className={styles.licenseSeal}><BadgeCheck size={15} />{copy.licenseSeal}</span>
		</section>
	);
}
