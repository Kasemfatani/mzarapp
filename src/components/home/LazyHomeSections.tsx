"use client";
import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import Loading from "@/app/loading";

const Confirmed = dynamic(() => import("./Confirmed"), {
	ssr: false,
	loading: () => <Loading />,
});
const Paths = dynamic(() => import("./Paths"), {
	ssr: false,
	loading: () => <Loading />,
});
const DownloadAppSection = dynamic(() => import("./DownloadAppSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const Explore = dynamic(() => import("./Explore"), {
	ssr: false,
	loading: () => <Loading />,
});
const Gallery = dynamic(() => import("./Gallery"), {
	ssr: false,
	loading: () => <Loading />,
});
const NewDestinations = dynamic(() => import("./NewDestinations"), {
	ssr: false,
	loading: () => <Loading />,
});
const About = dynamic(() => import("./About"), {
	ssr: false,
	loading: () => <Loading />,
});
const AppExplore = dynamic(() => import("./AppExplore"), {
	ssr: false,
	loading: () => <Loading />,
});
const Content = dynamic(() => import("./Content"), {
	ssr: false,
	loading: () => <Loading />,
});
const GenSection = dynamic(() => import("./GenSection"), {
	ssr: false,
	loading: () => <Loading />,
});
const Latest = dynamic(() => import("./Latest"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyHomeSections() {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	useEffect(() => {
		if (inView) setShouldLoad(true);
	}, [inView]);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<Suspense fallback={<Loading />}>
					<Confirmed />
					<Paths />
					<DownloadAppSection />
					<Explore />
					<Gallery />
					<NewDestinations />
					<About />
					<AppExplore />
					<Content />
					<GenSection />
					<Latest />
				</Suspense>
			) : null}
		</div>
	);
}
