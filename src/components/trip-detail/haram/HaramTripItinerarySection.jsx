import { Award, Coffee, Headphones, Landmark, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import styles from "./HaramTripDetail.module.css";

const INCLUDE_ICONS = { guide: Award, headset: Headphones, hospitality: Coffee, memory: CheckCircle2 };

export default function HaramTripItinerarySection({ copy }) {
	return (
		<>
			<section className={styles.included} aria-labelledby="haram-included-title">
				<p className={styles.eyebrow}>{copy.includedEyebrow}</p>
				<h2 id="haram-included-title">{copy.includedTitle}</h2>
				<div className={styles.includedGrid}>
					{copy.includes.map(([icon, title, body]) => {
						const Icon = INCLUDE_ICONS[icon] || Landmark;
						return <article className={styles.includedItem} key={title}>
							<span><Icon size={20} /></span><div><h3>{title}</h3><p>{body}</p></div>
						</article>;
					})}
				</div>
				<p className={styles.excludes}><XCircle size={16} />{copy.excludes}</p>
				<div className={styles.accessNote}>
					<ShieldCheck size={20} />
					<div><strong>{copy.accessTitle}</strong><p>{copy.accessDescription}</p></div>
				</div>
			</section>
			<section className={styles.routeSection} aria-labelledby="haram-route-title">
				<p className={styles.eyebrow}>{copy.routeEyebrow}</p>
				<h2 id="haram-route-title">{copy.routeTitle}</h2>
				<p className={styles.sectionIntro}>{copy.routeDescription}</p>
				<ol className={styles.routeList}>
					{copy.route.map(([step, title, body], index) => (
						<li key={title}>
							<span className={styles.routeNumber}>{String(index + 1).padStart(2, "0")}</span>
							<div><small>{step}</small><h3>{title}</h3><p>{body}</p></div>
						</li>
					))}
				</ol>
				<p className={styles.routeNote}>{copy.routeNote}</p>
			</section>
		</>
	);
}
