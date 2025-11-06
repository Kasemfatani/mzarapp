"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const BusStops = dynamic(() => import("./BusStops"), {
	ssr: false,
	loading: () => <Loading />,
});
const PackagePrice = dynamic(() => import("./PackagePrice"), {
	ssr: false,
	loading: () => <Loading />,
});
const StepsSection = dynamic(() => import("./StepsSection"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyTopBusSections({ initialLang }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<BusStops initialLang={initialLang} />
					<PackagePrice initialLang={initialLang} />
					<StepsSection initialLang={initialLang} />
				</>
			) : null}
		</div>
	);
}
