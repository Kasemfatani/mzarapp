"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { usePathname } from "next/navigation";

const Footer = dynamic(() => import("./Footer"), {
	ssr: false,
	loading: () => null,
});

export default function LazyFooter(props) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px" });
	const [shouldLoad, setShouldLoad] = useState(false);
	const pathname = usePathname();

	// Don't render the footer on the custome page
	if (
		pathname === "/saad-alqurashi" ||
		pathname === "/saad-new" ||
		pathname === "/raslania" ||
		pathname === "/hotel"
	) {
		return null;
	}

	useEffect(() => {
		if (inView) setShouldLoad(true);
	}, [inView]);

	return (
		<div ref={ref} style={{ minHeight: 260 }}>
			{shouldLoad ? <Footer {...props} /> : null}
		</div>
	);
}
