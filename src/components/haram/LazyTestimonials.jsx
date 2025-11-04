"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const Testimonials = dynamic(() => import("./Testimonials"), {
	ssr: false,
	loading: () => <Loading />,
});

const FAQ = dynamic(() => import("./FAQ"), {
	ssr: false,
	loading: () => <Loading />,
});


export default function LazyTestimonials({ initialLang }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<Testimonials lang={initialLang} />
					<FAQ initialLang={initialLang} />
				</>
			) : null}
		</div>
	);
}
