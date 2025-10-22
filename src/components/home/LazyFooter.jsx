"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Footer = dynamic(() => import("./Footer"), {
	ssr: false,
	loading: () => null,
});

export default function LazyFooter(props) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	useEffect(() => {
		if (inView) setShouldLoad(true);
	}, [inView]);

	return (
		<div ref={ref} style={{ minHeight: 260 }}>
			{shouldLoad ? <Footer {...props} /> : null}
		</div>
	);
}
