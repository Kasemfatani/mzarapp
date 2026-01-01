"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import Loading from "@/app/loading";

export default function LazySections({
	children,
	rootMargin = "200px",
	placeholder = <Loading />,
}) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin });
	const [shouldLoad, setShouldLoad] = useState(false);

	useEffect(() => {
		if (inView && !shouldLoad) setShouldLoad(true);
	}, [inView, shouldLoad]);

	return <div ref={ref}>{shouldLoad ? children : placeholder}</div>;
}
