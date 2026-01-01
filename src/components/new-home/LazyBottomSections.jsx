"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const SpecialOffers = dynamic(() => import("./SpecialOffers"), {
	ssr: false,
	loading: () => <Loading />,
});
const WhyChooseUs = dynamic(() => import("./WhyChooseUs"), {
	ssr: false,
	loading: () => <Loading />,
});
const CustomerReviews = dynamic(() => import("./CustomerReviews"), {
	ssr: false,
	loading: () => <Loading />,
});

const DownloadAppSection = dynamic(() => import("./DownloadAppSection"), {
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
					<SpecialOffers lang={lang} />
					<WhyChooseUs lang={lang} />
					<CustomerReviews lang={lang} />
					<DownloadAppSection lang={lang} />
				</>
			) : null}
		</div>
	);
}
