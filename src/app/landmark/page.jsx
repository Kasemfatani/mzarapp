import { cookies, headers } from "next/headers";
import Hero from "@/components/landmark/Hero";
import WhatLandmark from "@/components/landmark/WhatLandmark";
import StepsSection from "@/components/landmark/StepsSection";

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
			<StepsSection lang={lang} />
		</div>
	);
}
