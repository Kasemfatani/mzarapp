"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const Stations = dynamic(() => import("./Stations"), {
	ssr: false,
	loading: () => <Loading />,
});
const BannerSection = dynamic(() => import("./BannerSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const FAQ = dynamic(() => import("./FAQ"), {
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
					<Stations lang={lang} />
					<FAQ lang={lang} />
					<BannerSection lang={lang} />
				</>
			) : null}
		</div>
	);
}
