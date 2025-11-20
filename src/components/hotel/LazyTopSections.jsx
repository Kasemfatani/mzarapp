"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const TopSection = dynamic(() => import("./TopSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const PartnerSection = dynamic(() => import("./PartnerSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const KnowledgeBanner = dynamic(() => import("./KnowledgeBanner"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyTopSections({ lang , audio, hotelName }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "80px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<TopSection lang={lang} audio={audio} />
					<PartnerSection lang={lang} hotelName={hotelName} />
					<KnowledgeBanner lang={lang} />
				</>
			) : null}
		</div>
	);
}
