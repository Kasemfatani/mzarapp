"use client";

import { Star, CalendarDays, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const CURRENCY_SVG = (
	<svg
		viewBox="0 0 1124.14 1256.39"
		width="1em"
		height="1em"
		fill="currentColor"
		style={{ display: "inline", verticalAlign: "top" }}
	>
		<path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
		<path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
	</svg>
);

const SAR_LABEL = (
	<span>
		{CURRENCY_SVG}
		<span className="mx-1 font-thin">(SAR)</span>
	</span>
);

export function FullPackageCard({
	id,
	name,
	cover = "https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800",
	starting_price_per_person,
	duration,
	rate,
	features = [],
	isAr = false,
	isSaudi = true,
}) {
	// --- Currency Logic (kept) ---
	const SAR_RATE = 3.75;
	let displayPrice;
	let currencySymbol;

	if (isSaudi) {
		displayPrice = starting_price_per_person;
		currencySymbol = isAr ? SAR_LABEL : "SAR";
	} else {
		displayPrice = starting_price_per_person / SAR_RATE;
		currencySymbol = isAr ? "دولار" : "USD";
	}
	// --- End Currency Logic ---

	return (
		<div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(27,67,50,0.08)] group hover:-translate-y-2 transition-all duration-300 border border-[#c1c8c2]/40 flex flex-col h-full">
			<div className="relative h-64 w-full overflow-hidden">
				<a href={`/package-detail/${id}`}>
					<Image
						src={cover}
						alt={name}
						fill
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					/>
				</a>

				<div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
					<Star
						className="w-4 h-4 fill-[#FDC700] text-[#FDC700]"
						strokeWidth={1.5}
					/>
					<span className="font-bold text-sm text-[#1b1c1c]">
						{typeof rate === "number" ? rate.toFixed(1) : "4.8"}
					</span>
				</div>
			</div>

			<div className="p-6 flex flex-col flex-grow">
				<div className="flex justify-between items-start mb-4 gap-3">
					<h3
						className="text-[24px] leading-tight text-[#012d1d] line-clamp-2"
						style={{ fontFamily: '"Readex Pro", sans-serif', fontWeight: 600 }}
					>
						{name}
					</h3>
					<span className="text-[#775a19] font-bold whitespace-nowrap">
						{displayPrice?.toFixed(2)} {currencySymbol}
					</span>
				</div>

				<div className="flex items-center gap-1 text-[#414844] text-sm mb-6">
					<CalendarDays className="w-4 h-4" />
					<span>{duration}</span>
				</div>

				<ul className="space-y-3 mb-8">
					{features.slice(0, 2).map((feature, index) => (
						<li
							key={`${feature?.title || "feature"}-${index}`}
							className="flex items-center gap-2 text-sm text-[#414844]"
						>
							{feature?.image ? (
								<img
									src={feature.image}
									alt={feature.title || "feature"}
									className="w-5 h-5 object-contain"
									loading="lazy"
								/>
							) : (
								<CheckCircle2 className="w-5 h-5 text-[#012d1d]" />
							)}
							<span>
								{feature?.title || (isAr ? "ميزة مضافة" : "Included feature")}
							</span>
						</li>
					))}
				</ul>

				<a
					href={`/package-detail/${id}`}
					className="w-full py-3 border border-[#775a19] text-[#775a19] rounded-xl font-bold hover:bg-[#775a19] hover:text-white transition-colors duration-300 text-center mt-auto"
					style={{ fontFamily: '"Readex Pro", sans-serif' }}
				>
					{isAr ? "عرض التفاصيل" : "View Details"}
				</a>
			</div>
		</div>
	);
}
