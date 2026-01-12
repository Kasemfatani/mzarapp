"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const DetailedPolicy = dynamic(() => import("./DetailedPolicy"), {
	ssr: false,
	loading: () => <Loading />,
});
const HowToCancel = dynamic(() => import("./HowToCancel"), {
	ssr: false,
	loading: () => <Loading />,
});
const SupportCTA = dynamic(() => import("./SupportCTA"), {
	ssr: false,
	loading: () => <Loading />,
});



export default function LazyBottomSections({ isAr }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<DetailedPolicy isAr={isAr} />
					<HowToCancel isAr={isAr} />

					<SupportCTA isAr={isAr} />
					
				</>
			) : null}
		</div>
	);
}
