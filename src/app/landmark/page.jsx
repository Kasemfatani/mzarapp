import { cookies, headers } from "next/headers";
import Hero from "@/components/landmark/Hero";
import WhatLandmark from "@/components/landmark/WhatLandmark";

import LazyTopSections from "@/components/landmark/LazyTopSections";

// import StepsSection from "@/components/landmark/StepsSection";
// import WhatTour from "@/components/landmark/WhatTour";
// import BusStops from "@/components/landmark/BusStops";

import LazyBottomSections from "@/components/landmark/LazyBottomSections";

// import Stations from "@/components/landmark/Stations";
// import FAQ from "@/components/landmark/FAQ";
// import BannerSection from "@/components/landmark/BannerSection";

export const revalidate = 300;

export default function LandmarkPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero lang={lang} />
			<WhatLandmark lang={lang} />
			
			<LazyTopSections lang={lang} />
			<LazyBottomSections lang={lang} />

		</div>
	);
}
