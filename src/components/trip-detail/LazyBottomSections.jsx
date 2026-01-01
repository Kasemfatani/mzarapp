"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const Destinations = dynamic(() => import("./Destinations"), {
	ssr: false,
	loading: () => <Loading />,
});
const TimelineSection = dynamic(() => import("./TimelineSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const MapSection = dynamic(() => import("./MapSection"), {
	ssr: false,
	loading: () => <Loading />,
});

const MultipleMap = dynamic(() => import("./MultipleMap"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyBottomSections({ lang, data }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					{data.locations && <Destinations lang={lang} data={data} />}
					{data.tentatives && data.tentatives.length > 0 && (
						<TimelineSection lang={lang} data={data} />
					)}

					{data.map_image && <MapSection lang={lang} data={data} />}
					{Array.isArray(data.assimply_points) &&
						data.assimply_points.length > 0 && (
							<MultipleMap lang={lang} data={data} />
						)}
				</>
			) : null}
		</div>
	);
}
