"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const MissionVision = dynamic(() => import("./MissionVision"), {
	ssr: false,
	loading: () => <Loading />,
});
const WhyMazah = dynamic(() => import("./WhyMazah"), {
	ssr: false,
	loading: () => <Loading />,
});
const Stats = dynamic(() => import("./Stats"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyTopSections({ lang }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "50px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<MissionVision lang={lang}  />
					<WhyMazah lang={lang}  />
					<Stats lang={lang}  />
				</>
			) : null}
		</div>
	);
}
