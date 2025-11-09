"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const ComparisonTable = dynamic(() => import("./ComparisonTable"), {
	ssr: false,
	loading: () => <Loading />,
});
// const Testimonials = dynamic(() => import("./Testimonials"), {
// 	ssr: false,
// 	loading: () => <Loading />,
// });
const FAQ = dynamic(() => import("./FAQ"), {
	ssr: false,
	loading: () => <Loading />,
});

const Confirmed = dynamic(() => import("./Confirmed"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyBottomBusSections({ initialLang }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<ComparisonTable initialLang={initialLang} />
					{/* <Testimonials lang={initialLang} /> */}
					<FAQ initialLang={initialLang} />
					<Confirmed />
				</>
			) : null}
		</div>
	);
}
