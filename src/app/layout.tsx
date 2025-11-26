// import Head from "next/head";
import type { Metadata } from "next";
import React, { Suspense } from "react";
import "./globals.css";
//import "./video-react.css";
import mzarImg from "/public/Home/header-logo.png";
import Header from "@/components/header/Header";
import LazyFooter from "@/components/home/LazyFooter";
//import "@fortawesome/fontawesome-free/css/all.min.css";
import "../style/main.css";
import { Toaster } from "@/components/ui/sonner";
// import { GoogleTagManager } from "@next/third-parties/google";
// import Script from "next/script";
import { headers, cookies } from "next/headers";
import TrackingScripts from "@/components/TrackingScripts";
import DeferredCssLinks from "@/components/DeferredCssLinks"; // ADD
import ScrollToTopOnPageChange from "@/components/ScrollToTopOnPageChange";

export async function generateMetadata(): Promise<Metadata> {
	const acceptLang = headers().get("accept-language");
	const lang = acceptLang && acceptLang.startsWith("ar") ? "ar" : "en";

	const siteUrl = process.env.APP_URL || "https://www.mzarapp.com/";

	return lang === "ar"
		? {
				title: "مزار: رحلتك إلى أعماق التاريخ والروحانية",
				keywords:
					"مزار, مزارات, رحلات سياحية, رحلات دينية, الخضارة الإسلامية, المعالم المشهورة, إرشاد سياحي, وسيلة مواصلات, برامج سياحية, الأماكن المقدسة, تطبيق سياحي",
				description:
					"مزار هو تطبيق مبتكر يقدم تجربة استثنائية لاستكشاف المعالم الدينية والتاريخية والثقافية في مكة المكرمة. اختر من بين أربعة مسارات مميزة، واستمتع بخدمة الإثراء المعرفي الصوتي والنصي بـ6 لغات، مع تخطيط سهل ومريح لرحلتك الروحانية",
				openGraph: {
					title: "مزار: رحلتك إلى أعماق التاريخ والروحانية",
					description:
						"مزار هو تطبيق مبتكر يقدم تجربة استثنائية لاستكشاف المعالم الدينية والتاريخية والثقافية في مكة المكرمة. اختر من بين أربعة مسارات مميزة، واستمتع بخدمة الإثراء المعرفي الصوتي والنصي بـ6 لغات، مع تخطيط سهل ومريح لرحلتك الروحانية",
					url: "https://www.mzarapp.com",
					siteName: "تطبيق مزار",
					images: [
						{
							url: `${siteUrl}share.png`,
							width: 1200,
							height: 630,
							alt: "مزار - واجهة ومسار",
						},
					],
					type: "website",
					locale: "ar_EG",
				},
		  }
		: {
				title: "Mzar: Your Journey into the Depths of History and Spirituality",
				keywords:
					"Mzar, Mazar, Religious Tourism, Islamic Civilization, Famous Landmarks, Tourist Guide, Transportation, Tour Programs, Holy Places, Tourism App",
				description:
					"Mzar is an innovative app offering an exceptional experience to explore religious, historical, and cultural landmarks in Mecca. Choose from four unique routes, enjoy audio and text enrichment in 6 languages, and plan your spiritual journey easily.",
				openGraph: {
					title:
						"Mzar: Your Journey into the Depths of History and Spirituality",
					description:
						"Mzar is an innovative app offering an exceptional experience to explore religious, historical, and cultural landmarks in Mecca. Choose from four unique routes, enjoy audio and text enrichment in 6 languages, and plan your spiritual journey easily.",
					url: "https://www.mzarapp.com",
					siteName: "MzarApp",
					images: [
						{
							url: `${siteUrl}share.png`,
							width: 1200,
							height: 630,
							alt: "Mzar - A destination and path",
						},
					],
					type: "website",
					locale: "en_US",
				},
		  };
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const langCookie = cookies().get("lang")?.value;
	const lang = langCookie === "ar" ? "ar" : "en";

	return (
		<html lang={lang} id="root" suppressHydrationWarning={true}>
			<head>
				{/* Google Fonts */}
				{/* Remove Google Fonts preconnects (no longer needed) */}
				{/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
				{/* <link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/> */}
				<link rel="preload" as="image" href="/hero.webp" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@graph": [
								{
									"@type": "Organization",
									"@id": "https://www.mzarapp.com#organization",
									name: "MzarApp",
									url: "https://www.mzarapp.com",
									logo: "/Home/header-logo.png",
								},
								{
									"@type": "WebSite",
									"@id": "https://www.mzarapp.com#website",
									name: "MzarApp",
									url: "https://www.mzarapp.com",
									publisher: { "@id": "https://www.mzarapp.com#organization" },
								},
							],
						}),
					}}
				/>
			</head>
			<body className="w-full" suppressHydrationWarning={true}>
				<ScrollToTopOnPageChange />
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-WS294KJ"
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					></iframe>
				</noscript>
				<Header />
				<Toaster position="top-center" />
				<TrackingScripts />
				<DeferredCssLinks />
				{children}
				<Suspense fallback={null}>
					<LazyFooter />
				</Suspense>
			</body>
		</html>
	);
}
