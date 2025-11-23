import { cookies, headers } from "next/headers";
import Hero from "@/components/haram/Hero";
import TourStory from "@/components/haram/TourStory";
import LazyHaramSections from "@/components/haram/LazyHaramSections";
import LazyPreviewSection from "@/components/haram/LazyPreviewSection";
import LazyTestimonials from "@/components/haram/LazyTestimonials";

export const revalidate = 300;

export function generateMetadata() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	if (lang === "ar") {
		return {
			title: "جولة المسجد الحرام الإثرائية | مزار",
			description:
				"استكشف مع مزار تجربة فريدة داخل المسجد الحرام تتعرف فيها على أقدس المعالم وأعظم القصص، في جولة تجمع بين الأصالة والمعرفة والتقنية الحديثة لتراها كما لم ترها من قبل.",
		};
	}
	return {
		title: "Enriching Masjid Haram Tour",
		description:
			"Experience a one-of-a-kind journey inside the Grand Mosque with Mzar, where you’ll discover its holiest landmarks and timeless stories.",
	};
}

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
