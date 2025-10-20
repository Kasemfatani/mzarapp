"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const Explore = dynamic(() => import("./Explore"), {
	ssr: false,
	loading: () => null,
});

export default function LazyExplore(props) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return <div ref={ref}>{shouldLoad ? <Explore {...props} /> : null}</div>;
}
