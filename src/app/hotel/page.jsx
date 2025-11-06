import { cookies, headers } from "next/headers";
import Hero from "@/components/haram/Hero";
import TourStory from "@/components/haram/TourStory";
import LazyHaramSections from "@/components/haram/LazyHaramSections";
import LazyPreviewSection from "@/components/haram/LazyPreviewSection";
import LazyTestimonials from "@/components/haram/LazyTestimonials";

export const revalidate = 300;

export default function TourPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero initialLang={lang} />
			<TourStory initialLang={lang} />
			<LazyHaramSections initialLang={lang} />
			<LazyPreviewSection initialLang={lang} />
			<LazyTestimonials initialLang={lang} />
		</div>
	);
}
