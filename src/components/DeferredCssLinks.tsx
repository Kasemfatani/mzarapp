"use client";
import React, { useEffect } from "react";

export default function DeferredCssLinks() {
	useEffect(() => {
		const addStylesheet = (href: string) => {
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = href;
			link.media = "print";
			link.crossOrigin = "anonymous";
			link.onload = () => {
				link.media = "all";
			};
			document.head.appendChild(link);
			// Fallback in case onload doesn't fire
			const t = window.setTimeout(() => {
				try {
					link.media = "all";
				} catch {}
			}, 4000);

			return () => {
				window.clearTimeout(t);
				try {
					document.head.removeChild(link);
				} catch {}
			};
		};

		const removeFA = addStylesheet(
			"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
		);
		// const removeFancybox = addStylesheet(
		// 	"https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox/fancybox.css"
		// );

		return () => {
			removeFA?.();
			// removeFancybox?.();
		};
	}, []);

	return (
		<>
			{/* Defer Font Awesome (non‑blocking) */}
			{/* <link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
				media="print"
				crossOrigin="anonymous"
				// @ts-ignore: swap media after load
				onLoad={(e) => (e.currentTarget.media = "all")}
			/> */}
			{/* <noscript>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
					crossOrigin="anonymous"
				/>
			</noscript> */}

			{/* Defer Fancybox CSS (optional) */}
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox/fancybox.css"
				media="print"
				// @ts-ignore
				onLoad={(e) => (e.currentTarget.media = "all")}
			/>
			<noscript>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox/fancybox.css"
				/>
			</noscript>
		</>
	);
}
