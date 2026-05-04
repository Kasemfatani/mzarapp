"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const UserResponsibilities = dynamic(() => import("./UserResponsibilities"), {
	ssr: false,
	loading: () => <Loading />,
});
const BookingsPayments = dynamic(() => import("./BookingsPayments"), {
	ssr: false,
	loading: () => <Loading />,
});
const LimitationLiability = dynamic(() => import("./LimitationLiability"), {
	ssr: false,
	loading: () => <Loading />,
});

const FinalCTA = dynamic(() => import("./FinalCTA"), {
	ssr: false,
	loading: () => <Loading />,
});


export default function LazyBottomSections({ isAr }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<UserResponsibilities isAr={isAr} />
					<BookingsPayments isAr={isAr} />

					<LimitationLiability isAr={isAr} />
					<FinalCTA isAr={isAr} />
					
				</>
			) : null}
		</div>
	);
}
