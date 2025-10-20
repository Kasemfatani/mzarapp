"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

const PathExtra = dynamic(() => import("./PathExtra"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyPathExtra(props) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	useEffect(() => {
		if (inView) setShouldLoad(true);
	}, [inView]);

	return <div ref={ref}>{shouldLoad ? <PathExtra {...props} /> : null}</div>;
}
