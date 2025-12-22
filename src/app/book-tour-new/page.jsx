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
	

	const tripData = {
    imageUrl: "https://images.unsplash.com/photo-1649459304452-5a3e5d217102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNjYSUyMGhhamolMjBwaWxncmltc3xlbnwxfHx8fDE3NjU2MTYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "مكة المكرمة",
    rating: 4.9,
    reviewCount: 512,
    title: "جولة المسجد الحرام الشاملة",
    subtitle: "تجربة روحانية فريدة مع مرشد متخصص ومعتمد",
    duration: "7 ساعات",
    maxPeople: "12 شخص",
    price: 99,
    minPeople: 5,
  };

	return (
		<BookWrapper tripData={tripData} />
	);
}
