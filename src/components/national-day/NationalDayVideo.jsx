import pageStyles from "./NationalDayPage.module.css";
import styles from "./NationalDayVideo.module.css";

export default function NationalDayVideo({ content, videoId }) {
	const { video } = content;

	return (
		<section className={`${styles.videoSection} ${pageStyles.container}`} aria-labelledby="video-title">
			<div className={styles.videoLayout}>
				<div className={styles.videoCopy}>
					<div className={pageStyles.sectionIntro}>
						<span>{video.eyebrow}</span>
						<h2 id="video-title">{video.title}</h2>
						<p>{video.copy}</p>
					</div>
				</div>
				<div className={styles.videoFrame}>
					<iframe
						src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
						title={video.iframeTitle}
						loading="lazy"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					/>
				</div>
			</div>
		</section>
	);
}
