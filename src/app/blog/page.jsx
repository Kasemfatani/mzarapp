import { cookies, headers } from "next/headers";
// import { notFound } from "next/navigation";
// import { API_BASE_URL } from "@/lib/apiConfig";
import SingleBlogWrapper from "@/components/blog-new/SingleBlogWrapper";

// import { API_BASE_URL_NEW } from "@/lib/apiConfig";

// import { cache } from "react";



// Helper to determine language (keep this logic centralized)
function determineLang() {
	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	return (
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en")
	);
}

export function generateMetadata() {
	
	const lang = determineLang();

	if (lang === "ar") {
		return {
			title: "مقال",
			
		};
	}
	return {
		title: "Blog",
		
	};
}

export default async function Page() {
	

	const lang = determineLang();


	return (
		<SingleBlogWrapper lang={lang} />
	);
}
