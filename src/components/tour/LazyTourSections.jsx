"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const TourStory = dynamic(() => import("./TourStory"), {
	ssr: false,
	loading: () => <Loading />,
});
const DownloadAppSection = dynamic(() => import("./DownloadAppSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const TopTextSection = dynamic(() => import("./TopTextSection"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyTourSections({ initialLang }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<TourStory initialLang={initialLang} />
					<DownloadAppSection initialLang={initialLang} />
					<TopTextSection initialLang={initialLang} />
				</>
			) : null}
		</div>
	);
}
