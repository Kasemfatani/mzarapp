import HomePopup from "./HomePopup"; // client component
import { cookies, headers } from "next/headers";
import { API_BASE_URL } from "@/lib/apiConfig";

export default async function HomePopupServer() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	try {
		const res = await fetch(`${API_BASE_URL}/landing/home/ads`, {
			headers: { lang },
			next: { revalidate: 300 }, // tune as needed
		});
		if (!res.ok) return null;

		const json = await res.json();
		// support both shapes: { data: {...} } or top-level { title, image, ... }
		const adData = json?.data ?? json;
		if (!adData) return null;

		return <HomePopup adData={adData} lang={lang} />;
	} catch (err) {
		console.error('Error fetching ad data:', err);
		return null;
	}
}
