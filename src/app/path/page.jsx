export const revalidate = 300;

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import PathInfo from "@/components/Path/PathInfo";
import Destinations from "@/components/Path/Destinations";
import Loading from "../loading";
import { API_BASE_URL } from "@/lib/apiConfig";

const Riviews = dynamic(() => import("@/components/Path/Riviews"), {
	ssr: false,
	loading: () => <Loading />,
});
const WhatsAppButton = dynamic(
	() => import("../../components/Path/WhatsAppButton"),
	{ ssr: false }
);

export default async function PathPage({ searchParams }) {
	const pathId = searchParams?.id;
	if (!pathId) notFound();

	const cookieLang = cookies().get("lang")?.value;
	const acceptLang = headers().get("accept-language");
	const lang =
		cookieLang || (acceptLang && acceptLang.startsWith("ar") ? "ar" : "en");

	const res = await fetch(
		`${API_BASE_URL}/landing/home/packages/details?package_id=${pathId}`,
		{
			headers: { lang },
			next: { revalidate: 300 },
		}
	);

	if (!res.ok) notFound();
	const data = await res.json();
	if (!data) notFound();

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<WhatsAppButton name={data?.name} />
			<PathInfo data={data} lang={lang} />
			<Destinations data={data} lang={lang} />
			<Suspense fallback={<Loading />}>
				<Riviews id={pathId} lang={lang} />
			</Suspense>
		</div>
	);
}
