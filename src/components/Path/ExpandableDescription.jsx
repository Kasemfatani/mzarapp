import React, { useState } from "react";

export default function ExpandableDescription({ description, language }) {
	const [expanded, setExpanded] = useState(false);

	return (
		<section className="my-6 py-6 border-y">
			<h3 className="text-2xl mb-4 text-center md:text-start">
				{language === "en" ? "Overview" : "نظرة عامة"}
			</h3>
			<p
				className={`text-gray-600 transition-all duration-200 ${
					expanded ? "" : "line-clamp-2"
				}`}
			>
				{description}
			</p>
			{description && description.length > 0 && (
				<button
					className="mt-2 text-blue-600 hover:underline text-sm font-semibold"
					onClick={() => setExpanded((v) => !v)}
				>
					{expanded
						? language === "ar"
							? "عرض أقل"
							: "Show less"
						: language === "ar"
						? "عرض المزيد"
						: "Show more"}
				</button>
			)}
		</section>
	);
}
