import Head from "next/head";
import type { Metadata } from "next";
import React, { Suspense } from "react";
import "./globals.css";
import "./video-react.css";
import mzarImg from "../assets/images/home/og.png";
import Header from "@/components/header/Header";
import Footer from "@/components/home/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../style/main.css";
import { Toaster } from "@/components/ui/sonner";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import { headers } from "next/headers"; 
import TrackingScripts from "@/components/TrackingScripts";

export async function generateMetadata(): Promise<Metadata> {
    const acceptLang = headers().get("accept-language");
    const lang = acceptLang && acceptLang.startsWith("ar") ? "ar" : "en";

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
                            url: mzarImg.src,
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
                    title: "Mzar: Your Journey into the Depths of History and Spirituality",
                    description:
                        "Mzar is an innovative app offering an exceptional experience to explore religious, historical, and cultural landmarks in Mecca. Choose from four unique routes, enjoy audio and text enrichment in 6 languages, and plan your spiritual journey easily.",
                    url: "https://www.mzarapp.com",
                    siteName: "MzarApp",
                    images: [
                        {
                            url: mzarImg.src,
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
	return (
		<html lang="en" id="root">
			<Head>
				{/* Google Fonts */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
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
									logo: mzarImg.src,
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
			</Head>
			{/* Hotjar Tracking Code for https://mzarapp.com/ */}
			{/* <Script id="hotjar" strategy="afterInteractive">
				{`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:5050444,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
			</Script> */}
			{/* <GoogleTagManager gtmId="GTM-WS294KJ" /> */}
			{/* Google tag (gtag.js) for AW-16518722477 */}
			{/* <Script
				src="https://www.googletagmanager.com/gtag/js?id=AW-16518722477"
				strategy="afterInteractive"
			/> */}
			{/* <Script id="gtag-init" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16518722477');
        `}
			</Script> */}
			<body className="w-full" suppressHydrationWarning={true}>
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
				{children}
				<Suspense fallback={null}>
					<Footer />
				</Suspense>
			</body>
		</html>
	);
}
