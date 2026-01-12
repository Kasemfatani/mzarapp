"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const TrustReinforcement = dynamic(() => import("./TrustReinforcement"), {
	ssr: false,
	loading: () => <Loading />,
});
const SupportCTA = dynamic(() => import("./SupportCTA"), {
	ssr: false,
	loading: () => <Loading />,
});
const FinalCTA = dynamic(() => import("./FinalCTA"), {
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
					<TrustReinforcement isAr={isAr} />
					<SupportCTA isAr={isAr} />

					<FinalCTA isAr={isAr} />
					
				</>
			) : null}
		</div>
	);
}
