"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Loading from "@/app/loading";

const ContactFormWithCaptcha = dynamic(() => import("./ContactFormWithCaptcha"), {
	ssr: false,
	loading: () => <Loading />,
});
const CompanyInfo = dynamic(() => import("./CompanyInfo"), {
	ssr: false,
	loading: () => <Loading />,
});


export default function LazyTopSections({ isAr , data }) {
	const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "50px" });
	const [shouldLoad, setShouldLoad] = useState(false);

	if (inView && !shouldLoad) setShouldLoad(true);

	return (
		<div ref={ref}>
			{shouldLoad ? (
				<>
					<ContactFormWithCaptcha isAr={isAr} InquiryType={data} />
					<CompanyInfo isAr={isAr}  />
					
				</>
			) : null}
		</div>
	);
}
