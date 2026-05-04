import { cookies, headers } from "next/headers";
import BookWrapper from "./BookWrapper";

export function generateMetadata() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	if (lang === "ar") {
		return {
			title: "حجز جولة المسجد الحرام",
			
		};
	}
	return {
		title: "Booking Masjid Haram Tour",
		
	};
}

export default function Page() {
	

	return (
		<BookWrapper />
	);
}
