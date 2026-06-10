"use client";

import { useEffect } from "react";

export default function StickyViewportFix() {
	useEffect(() => {
		const html = document.documentElement;
		const body = document.body;

		if (!html || !body) return;

		const previous = {
			htmlOverflow: html.style.overflow,
			htmlOverflowX: html.style.overflowX,
			htmlOverflowY: html.style.overflowY,
			bodyOverflow: body.style.overflow,
			bodyOverflowX: body.style.overflowX,
			bodyOverflowY: body.style.overflowY,
		};

		// Sticky fails when an ancestor has non-visible overflow.
		// Keep page scrolling on html and allow body overflow to be visible.
		html.style.overflowY = "auto";
		html.style.overflowX = "visible";
		body.style.overflow = "visible";
		body.style.overflowX = "visible";
		body.style.overflowY = "visible";

		return () => {
			html.style.overflow = previous.htmlOverflow;
			html.style.overflowX = previous.htmlOverflowX;
			html.style.overflowY = previous.htmlOverflowY;
			body.style.overflow = previous.bodyOverflow;
			body.style.overflowX = previous.bodyOverflowX;
			body.style.overflowY = previous.bodyOverflowY;
		};
	}, []);

	return null;
}
