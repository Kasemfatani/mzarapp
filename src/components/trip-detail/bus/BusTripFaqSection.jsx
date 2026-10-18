import styles from "./BusTripDetail.module.css";

export default function BusTripFaqSection({ copy, lang }) {
	return (
		<section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="bus-trip-faq-title">
			{copy.faqEyebrow && <p className={styles.eyebrow}>{copy.faqEyebrow}</p>}
			<h2 className={styles.sectionTitle} id="bus-trip-faq-title">
				{copy.faqTitle}
			</h2>
			<div className={styles.faqList}>
				{copy.faqs.map((faq, index) => (
					<details key={faq.question} className={styles.faqItem} open={index === 0}>
						<summary>{faq.question}</summary>
						<p>
							{index === copy.faqs.length - 1 ? (
								<a href={`/${lang}/cancellation-policy`} className={styles.faqLink}>
									{faq.answer}
								</a>
							) : faq.answer}
						</p>
					</details>
				))}
			</div>
		</section>
	);
}

