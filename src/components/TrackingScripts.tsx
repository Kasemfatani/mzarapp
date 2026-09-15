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

	const isBlogPage = /^\/blog\/[^/]+$/.test(pathname);

	if (isBlogPage) {
		return null;
	}

	return (
		<>
			{/* Microsoft Clarity Tracking Code */}
			<Script id="microsoft-clarity" strategy="afterInteractive">
				{`
					(function(c,l,a,r,i,t,y){
						c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
						t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
						y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
					})(window, document, "clarity", "script", "y6a5wnf6bd");
				`}
			</Script>

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
			{/* Meta Pixel Code */}
			<Script id="meta-pixel" strategy="afterInteractive">
				{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '985385120627401');
          fbq('track', 'PageView');
        `}
			</Script>
			<noscript>
				<img
					height="1"
					width="1"
					style={{ display: "none" }}
					alt=""
					src="https://www.facebook.com/tr?id=985385120627401&ev=PageView&noscript=1"
				/>
			</noscript>
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
