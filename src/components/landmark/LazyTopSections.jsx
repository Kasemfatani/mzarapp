"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const StepsSection = dynamic(() => import("./StepsSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const WhatTour = dynamic(() => import("./WhatTour"), {
	ssr: false,
	loading: () => <Loading />,
});
const BusStops = dynamic(() => import("./BusStops"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyTopSections({ lang }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "80px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<StepsSection lang={lang} />
					<WhatTour lang={lang} />
					<BusStops lang={lang} />
				</>
			) : null}
		</div>
	);
}
