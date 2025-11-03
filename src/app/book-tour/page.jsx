import { cookies, headers } from "next/headers";
import Hero from "@/components/book-tour/Hero";
import ChooseTourStep from "@/components/book-tour/ChooseTourStep";

export const revalidate = 300;

export default function TourPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero initialLang={lang} />
			<ChooseTourStep initialLang={lang} />
		</div>
	);
}
