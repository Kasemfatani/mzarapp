"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const HighlightsSection = dynamic(() => import("./HighlightsSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const AboutSection = dynamic(() => import("./AboutSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const InclusionsSection = dynamic(() => import("./InclusionsSection"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyTopSections({ lang, data }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "50px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<HighlightsSection lang={lang} data={data} />
					<AboutSection lang={lang} data={data} />
					{data.consists > 0 && data.unconsists > 0 && (
						<InclusionsSection lang={lang} data={data} />
					)}
				</>
			) : null}
		</div>
	);
}
