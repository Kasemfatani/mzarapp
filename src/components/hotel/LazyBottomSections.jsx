"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

const WhyMzarSection = dynamic(() => import("./WhyMzarSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const HiraSection = dynamic(() => import("./HiraSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const HotelFooter = dynamic(() => import("./HotelFooter"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyBottomSections({
	lang,
	hotelLogoSrc,
	forceLoad = false,
}) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "400px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	// Check hash on mount
	useEffect(() => {
		if (typeof window !== "undefined" && window.location.hash === "#why") {
			setShouldLoad(true);
			setTimeout(() => {
				document.getElementById("why")?.scrollIntoView({ behavior: "smooth" });
			}, 300);
		}
	}, []);

	// IntersectionObserver trigger
	useEffect(() => {
		if (inView && !shouldLoad) setShouldLoad(true);
	}, [inView, shouldLoad]);

	// Force load from nav click
	useEffect(() => {
		if (forceLoad && !shouldLoad) {
			setShouldLoad(true);
			setTimeout(() => {
				document.getElementById("why")?.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}, 250);
		}
	}, [forceLoad, shouldLoad]);

	return (
		<div ref={ref}>
			{/* Anchor always present */}
			<div id="why" style={{ scrollMarginTop: "80px" }} />
			{shouldLoad ? (
				<>
					<WhyMzarSection lang={lang} />
					<HiraSection lang={lang} />
					<HotelFooter lang={lang} hotelLogoSrc={hotelLogoSrc} />
				</>
			) : null}
		</div>
	);
}
