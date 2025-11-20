"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const WhyMzarSection = dynamic(() => import("./WhyMzarSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const HiraSection = dynamic(() => import("./HiraSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const HotelFooter = dynamic(() => import("./HotelFooter"), {
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
					<WhyMzarSection lang={lang} />
					<HiraSection lang={lang} />
					<HotelFooter lang={lang} />
				</>
			) : null}
		</div>
	);
}
