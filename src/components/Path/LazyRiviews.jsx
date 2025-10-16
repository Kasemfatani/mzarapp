"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const Riviews = dynamic(() => import("./Riviews"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyRiviews({ id, lang }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	// Start loading when in view
	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>{shouldLoad ? <Riviews id={id} lang={lang} /> : null}</div>
	);
}
