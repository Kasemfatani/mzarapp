"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const PricingSection = dynamic(() => import("./PricingSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const Gallery = dynamic(() => import("./Gallery"), {
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
					<BusStops lang={lang} />
					<PricingSection lang={lang} />
					<Gallery lang={lang} />
					
				</>
			) : null}
		</div>
	);
}
