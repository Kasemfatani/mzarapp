"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function LazyLoader({ children, rootMargin = "200px" }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin });
	const [shouldLoad, setShouldLoad] = useState(false);

	useEffect(() => {
		if (inView) setShouldLoad(true);
	}, [inView]);

	return <div ref={ref}>{shouldLoad ? children : null}</div>;
}
