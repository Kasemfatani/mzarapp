import pageStyles from "./NationalDayPage.module.css";
import styles from "./NationalDayFaq.module.css";

export default function NationalDayFaq({ content }) {
	const { faq } = content;

	return (
		<section className={`${styles.faqSection} ${pageStyles.container}`} aria-labelledby="faq-title">
			<div className={pageStyles.sectionIntro}>
				<span>{faq.eyebrow}</span>
				<h2 id="faq-title">{faq.title}</h2>
			</div>
			<div className={styles.faqList}>
				{faq.items.map(([question, answer], index) => (
					<details className={styles.faqItem} open={index === 0} key={question}>
						<summary>{question}</summary>
						<p>{answer}</p>
					</details>
				))}
			</div>
		</section>
	);
}
