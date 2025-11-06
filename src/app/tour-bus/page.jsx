import { cookies, headers } from "next/headers";
import Hero from "@/components/tour-bus/Hero";
import WhatTour from "@/components/tour-bus/WhatTour";
import BusStops from "@/components/tour-bus/BusStops";
import PackagePrice from "@/components/tour-bus/PackagePrice"; 
import StepsSection from "@/components/tour-bus/StepsSection";
import ComparisonTable from "@/components/tour-bus/ComparisonTable";
import Testimonials from "@/components/tour-bus/Testimonials";
import FAQ from "@/components/tour-bus/FAQ"; 
import Confirmed from "@/components/tour-bus/Confirmed";
import LazyTopBusSections from "@/components/tour-bus/LazyTopBusSections";
import LazyBottomBusSections from "@/components/tour-bus/LazyBottomBusSections";

export const revalidate = 300;

export default function TourPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero initialLang={lang} />
			<WhatTour initialLang={lang} />
			<LazyTopBusSections initialLang={lang} />
			<LazyBottomBusSections initialLang={lang} />
		</div>
	);
}
