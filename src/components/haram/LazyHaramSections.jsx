"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const AboutTour = dynamic(() => import("./AboutTour"), {
	ssr: false,
	loading: () => <Loading />,
});
const Stations = dynamic(() => import("./Stations"), {
	ssr: false,
	loading: () => <Loading />,
});
const AppFeatures = dynamic(() => import("./AppFeatures"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyHaramSections({ initialLang }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<AboutTour initialLang={initialLang} />
					<Stations initialLang={initialLang} />
					<AppFeatures initialLang={initialLang} />
				</>
			) : null}
		</div>
	);
}
