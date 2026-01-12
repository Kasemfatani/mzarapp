"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const Values = dynamic(() => import("./Values"), {
	ssr: false,
	loading: () => <Loading />,
});
const TrustCompliance = dynamic(() => import("./TrustCompliance"), {
	ssr: false,
	loading: () => <Loading />,
});
const CTA = dynamic(() => import("./CTA"), {
	ssr: false,
	loading: () => <Loading />,
});



export default function LazyBottomSections({ lang }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<Values lang={lang} />
					<TrustCompliance lang={lang} />

					<CTA lang={lang} />
					
				</>
			) : null}
		</div>
	);
}
