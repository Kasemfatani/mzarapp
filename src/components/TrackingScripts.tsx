"use client";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { usePathname } from "next/navigation";

const SCRIPT_PATHS = [
	"/",
	"/blogs",
	"/book",
	"/book-path",
	"/congats",
	"/gallary",
	"/makkah-mzar",
	"/path",
	"/tour",
	"/tour-bus",
	"/madinah",
	"/haram",
	"/book-haram",
	"/book-haram-success",
	"/book-madinah",
	"/book-madinah-success",
	"/book-tour",
	"/book-tour-success",
];

// Patterns for dynamic routes you also want scripts on.
const DYNAMIC_PATTERNS = [/^\/hotel\/[^/]+$/]; // hotel/<slug> (one segment after /hotel)


export default function TrackingScripts() {
	const pathname = usePathname();

	// const shouldIncludeScripts =
	// 	SCRIPT_PATHS.includes(pathname) ||
	// 	DYNAMIC_PATTERNS.some((re) => re.test(pathname));

	// if (!shouldIncludeScripts) return null;

	return (
		<>
			{/* Hotjar Tracking Code for https://mzarapp.com/ */}
			<Script id="hotjar" strategy="afterInteractive">
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
			</Script>
			<GoogleTagManager gtmId="GTM-WS294KJ" />
      {/* Google tag (gtag.js) for AW-16518722477 */}
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=AW-16518722477"
				strategy="afterInteractive"
			/>
			<Script id="gtag-init" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16518722477');
        `}
			</Script>
		</>
	);
}
