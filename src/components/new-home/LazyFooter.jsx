"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { usePathname } from "next/navigation";
import { useCurrentLocale } from "@/lib/useLocale";

const Footer = dynamic(() => import("./Footer"), {
	ssr: false,
	loading: () => null,
});

export default function LazyFooter(props) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "300px" });
	const [shouldLoad, setShouldLoad] = useState(false);
	const pathname = usePathname();

	const {
		barePath
	} = useCurrentLocale();

	

	useEffect(() => {
		if (inView) setShouldLoad(true);
	}, [inView]);

	// Decide whether to skip rendering AFTER hooks are called
  const skipFooter =
    barePath === "/saad-alqurashi" ||
    barePath === "/saad-new" ||
    barePath === "/raslania" ||
		barePath === "/umrah" ||
		barePath === "/saira" ||
    barePath.startsWith("/hotel/");

  if (skipFooter) {
    return null;
  }

	return (
		<div ref={ref} style={{ minHeight: 260 }}>
			{shouldLoad ? <Footer {...props} /> : null}
		</div>
	);
}
