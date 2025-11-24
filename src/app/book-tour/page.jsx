import { cookies, headers } from "next/headers";
import BookWrapper from "./BookWrapper";

export function generateMetadata() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	if (lang === "ar") {
		return {
			title: "حجز حافلة الجولات الإثرائية",
			
		};
	}
	return {
		title: "Booking Enriching Bus Tours",
		
	};
}

export default function Page() {
	

	return (
		<BookWrapper />
	);
}
