"use client";
import React, { useEffect, useState, Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import Loading from "@/app/loading";


const Confirmed = dynamic(() => import("./Confirmed"), {
	ssr: false,
	loading: () => <Loading />,
});
const About = dynamic(() => import("./About"), {
	ssr: false,
	loading: () => <Loading />,
});
const Paths = dynamic(() => import("./Paths"), {
	ssr: false,
	loading: () => <Loading />,
});

export default function LazyTopSections() {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "0px" });
	const [shouldLoad, setShouldLoad] = useState(false);
	const pendingHashRef = useRef<string | null>(null);

	useEffect(() => {
		if (inView) setShouldLoad(true);
	}, [inView]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		if (window.location.hash) {
			pendingHashRef.current = window.location.hash;
			setShouldLoad(true);
		}
		const onHashChange = () => {
			pendingHashRef.current = window.location.hash;
			setShouldLoad(true);
		};
		const onCustomAnchor = (e: Event) => {
			const h = (e as CustomEvent).detail || window.location.hash;
			pendingHashRef.current = h;
			setShouldLoad(true);
		};

		window.addEventListener("hashchange", onHashChange);
		window.addEventListener("mzar:anchor", onCustomAnchor as EventListener);
		return () => {
			window.removeEventListener("hashchange", onHashChange);
			window.removeEventListener(
				"mzar:anchor",
				onCustomAnchor as EventListener
			);
		};
	}, []);

	useEffect(() => {
		if (!shouldLoad || typeof window === "undefined") return;
		const targetHash = pendingHashRef.current || window.location.hash;
		if (!targetHash) return;

		const tryScroll = () => {
			let tries = 0;
			const t = setInterval(() => {
				const el = document.querySelector(targetHash);
				if (el) {
					clearInterval(t);
					el.scrollIntoView({ behavior: "smooth", block: "start" });
				} else if (++tries > 50) {
					clearInterval(t);
				}
			}, 100);
		};

		setTimeout(tryScroll, 150);
		pendingHashRef.current = null;
	}, [shouldLoad]);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<Suspense fallback={<Loading />}>
          {/* <Trips /> */}
					<About />
					<Confirmed />
					<Paths />
				</Suspense>
			) : null}
		</div>
	);
}
