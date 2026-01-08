"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const TripsGrid = dynamic(() => import("./TripsGrid"), {
	ssr: false,
	loading: () => <Loading />,
});


export default function LazyBottomSections({ lang , trips , isSaudi = true }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "50px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<TripsGrid lang={lang} trips={trips} isSaudi={isSaudi} />
					
				</>
			) : null}
		</div>
	);
}
