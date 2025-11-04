import { cookies, headers } from "next/headers";
import HeroTop from "@/components/book-tour/HeroTop";


export const revalidate = 300;

export default function TourPage() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<HeroTop initialLang={lang} />
			
		</div>
	);
}
