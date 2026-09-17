import { ArrowLeft } from "lucide-react";
import pageStyles from "./NationalDayPage.module.css";
import styles from "./NationalDayStory.module.css";

export default function NationalDayStory({ content }) {
	const { story } = content;

	return (
		<section className={`${styles.story} ${pageStyles.container}`}>
			<div className={styles.storyGrid}>
				<div className={styles.storyCopy}>
					<span className={styles.storyKicker}>{story.kicker}</span>
					<h2>{story.title}</h2>
					{story.paragraphs.map((paragraph) => (
						<p key={paragraph}>{paragraph}</p>
					))}
					<p className={styles.emphasis}>{story.emphasis}</p>
					<a className={pageStyles.button} href="#booking">
						{story.book}
						<ArrowLeft aria-hidden="true" size={19} strokeWidth={2} />
					</a>
				</div>

				<div className={styles.journeyCard}>
					<h3>{story.journeyTitle}</h3>
					<div className={styles.journeyList}>
						{story.journeyItems.map(([title, description], index) => (
							<div className={styles.journeyItem} key={title}>
								<span className={styles.journeyNumber}>{index + 1}</span>
								<div>
									<strong>{title}</strong>
									<span>{description}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
