"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const QuickCategories = dynamic(() => import("./QuickCategories"), {
	ssr: false,
	loading: () => <Loading />,
});
const BannerCta = dynamic(() => import("./BannerCta"), {
	ssr: false,
	loading: () => <Loading />,
});
const HowItWorks = dynamic(() => import("./HowItWorks"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyTopSections({ lang }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<QuickCategories lang={lang} />
					<BannerCta lang={lang} />
					<HowItWorks lang={lang} />
				</>
			) : null}
		</div>
	);
}
