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
		const removeFancybox = addStylesheet(
			"https://cdn.jsdelivr.net/npm/@fancyapps/ui@5/dist/fancybox/fancybox.css"
		);

		return () => {
			removeFA?.();
			removeFancybox?.();
		};
	}, []);

	return null;
}
