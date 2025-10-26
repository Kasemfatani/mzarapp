"use client";

import React from "react";
import ExpandableDescription from "./ExpandableDescription";
import PathOffer from "./PathOffer";

export default function PathExtra({
	data = {},
	language = "en",
	pathId,
	whatsappText,
}) {
	const startingPrice =
		typeof data.starting_price === "number"
			? data.starting_price
			: Number(data.starting_price) || 0;
	const originalPrice =
		typeof data.original_price === "number"
			? data.original_price
			: Number(data.original_price) ||
			  (startingPrice ? startingPrice * 1.25 : 0);

	const wText = whatsappText ?? data.whatsappText ?? data.whatsapp_text ?? "";

	return (
		<>
			<ExpandableDescription
				description={data.description}
				language={language}
			/>
			<br />
			<br />
			<PathOffer
				language={language}
				startingPrice={startingPrice}
				originalPrice={originalPrice}
				whatsappText={wText}
				pathId={pathId ?? data.id}
			/>
		</>
	);
}
