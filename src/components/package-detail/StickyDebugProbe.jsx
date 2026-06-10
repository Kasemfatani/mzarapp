"use client";

import { useEffect, useState } from "react";

function findStickyBlockers(element) {
	const blockers = [];
	let node = element?.parentElement;

	while (node) {
		const style = window.getComputedStyle(node);
		const overflowX = style.overflowX;
		const overflowY = style.overflowY;
		const transform = style.transform;
		const filter = style.filter;
		const contain = style.contain;

		const overflowBlocks =
			overflowX !== "visible" ||
			overflowY !== "visible" ||
			style.overflow !== "visible";

		const styleBlocks =
			transform !== "none" ||
			filter !== "none" ||
			(contain && contain !== "none");

		if (overflowBlocks || styleBlocks) {
			blockers.push({
				tag: node.tagName?.toLowerCase(),
				id: node.id || "",
				className: (node.className || "").toString().slice(0, 120),
				overflow: style.overflow,
				overflowX,
				overflowY,
				transform,
				filter,
				contain,
			});
		}

		node = node.parentElement;
	}

	return blockers;
}

export default function StickyDebugProbe() {
	const [report, setReport] = useState(null);

	useEffect(() => {
		if (process.env.NODE_ENV === "production") return;

		const sidebar = document.getElementById("sticky-sidebar-test");
		const description = document.getElementById("sticky-description-test");

		if (!sidebar && !description) return;

		const nextReport = {
			sidebar: sidebar ? findStickyBlockers(sidebar) : [],
			description: description ? findStickyBlockers(description) : [],
		};

		setReport(nextReport);

		if (nextReport.sidebar.length || nextReport.description.length) {
			console.warn("[StickyDebug] Sticky blockers found:", nextReport);
		} else {
			console.info(
				"[StickyDebug] No ancestor blockers found for sticky targets.",
			);
		}
	}, []);

	if (process.env.NODE_ENV === "production" || !report) return null;

	const sidebarBlocked = report.sidebar.length > 0;
	const descriptionBlocked = report.description.length > 0;

	return (
		<div className="fixed bottom-20 left-4 z-[9999] hidden max-w-md rounded-lg border border-amber-200 bg-amber-50/95 p-3 text-xs text-amber-900 shadow-lg lg:block">
			<p className="font-semibold">Sticky Debug</p>
			<p>Sidebar: {sidebarBlocked ? "blocked" : "ok"}</p>
			<p>Description: {descriptionBlocked ? "blocked" : "ok"}</p>
			<p className="mt-1">Open console for full ancestor report.</p>
		</div>
	);
}
