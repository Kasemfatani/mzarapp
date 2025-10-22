"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const Content = dynamic(() => import("./Content"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyContent(props) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return <div ref={ref}>{shouldLoad ? <Content {...props} /> : null}</div>;
}
