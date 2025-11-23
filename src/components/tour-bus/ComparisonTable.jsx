"use client";
import React from "react";

const features = [
	{
		ar: "مرشد صوتي متعدد اللغات",
		en: "Multilingual audio guide",
		mzar: "yes",
		normal: "no",
	},
	{
		ar: "محتوى موثَّق تاريخياً",
		en: "Verified historical content",
		mzar: "yes",
		normal: "partial",
	},
	{
		ar: "تجربة واقع معزز (AR)",
		en: "Augmented Reality (AR) experience",
		mzar: "yes",
		normal: "no",
	},
	{
		ar: "حجوزات رقمية عبر التطبيق",
		en: "Digital booking via app",
		mzar: "yes",
		normal: "no",
	},
	{
		ar: "مرخص من الهيئة الملكية لمدينة مكة المكرمة",
		en: "Supported by Royal Commission for Makkah City",
		mzar: "yes",
		normal: "no",
	},
	{
		ar: " وصول حصري إلى عدة معالم تاريخية",
		en: "Exclusive access to several historical landmarks",
		mzar: "yes",
		normal: "no",
	},
];

function CheckIcon() {
	return (
		<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
			<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
				<circle cx="12" cy="12" r="12" fill="#22C55E" fillOpacity="0.15" />
				<path
					d="M7 12.5l3 3 7-7"
					stroke="#22C55E"
					strokeWidth="2.2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</span>
	);
}
function CrossIcon() {
	return (
		<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
			<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
				<circle cx="12" cy="12" r="12" fill="#EF4444" fillOpacity="0.15" />
				<path
					d="M8 8l8 8M16 8l-8 8"
					stroke="#EF4444"
					strokeWidth="2.2"
					strokeLinecap="round"
				/>
			</svg>
		</span>
	);
}

export default function ComparisonTable({ initialLang = "ar" }) {
	const isAr = initialLang === "ar";
	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">
					{isAr
						? "الفرق بين تجربة الجولات الإثرائية من مزار والجولات التقليدية"
						: "The difference between a regular tour and the Mzar Enriching Experience"}
				</h2>
				<div className="overflow-x-auto">
					<table className="md:min-w-[700px] w-full border-separate border-spacing-0 rounded-2xl overflow-hidden">
						<thead>
							<tr>
								<th className="bg-black text-white text-lg font-semibold py-4 px-2  md:w-1/2">
									{isAr ? "الميزة" : "Feature"}
								</th>

								<th className="bg-black text-white text-lg font-semibold py-4 px-2  md:w-1/4">
									{isAr ? "باص مزار" : "Mzar Bus"}
								</th>
								<th className="bg-black text-white text-lg font-semibold py-4 px-2  md:w-1/4">
									{isAr ? "الجولات التقليدية" : "Traditional Tours"}
								</th>
							</tr>
						</thead>
						<tbody>
							{features.map((row, i) => (
								<tr
									key={i}
									className={i % 2 === 0 ? "bg-[#F8F3E9]" : "bg-white"}
								>
									{/* Feature */}
									<td className="text-center py-6 px-2 align-middle font-medium text-lg text-gray-900">
										{isAr ? row.ar : row.en}
									</td>

									{/* Mzar bus */}
									<td className="text-center py-6 px-2 align-middle">
										{row.mzar === "yes" && <CheckIcon />}
										{row.mzar === "no" && <CrossIcon />}
										{row.mzar === "partial" && (
											<span className="inline-block px-4 py-1 rounded-full bg-gray-100 text-gray-700 font-medium text-base">
												{isAr ? "جزئي" : "Partial"}
											</span>
										)}
									</td>
									{/* Traditional tours */}
									<td className="text-center py-6 px-2 align-middle">
										{row.normal === "yes" && <CheckIcon />}
										{row.normal === "no" && <CrossIcon />}
										{row.normal === "partial" && (
											<span className="inline-block px-4 py-1 rounded-full bg-gray-100 text-gray-700 font-medium text-base">
												{isAr ? "جزئي" : "Partial"}
											</span>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}
