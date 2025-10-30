"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function AppFeatures({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");

	// useEffect(() => {
	// 	if (typeof window === "undefined") return;
	// 	const stored = localStorage.getItem("lang");
	// 	if (stored === "ar" || stored === "en") setLanguage(stored);
	// 	else if (initialLang) setLanguage(initialLang);
	// }, [initialLang]);

	const isAr = language === "ar";

	const features = isAr
		? [
				"استماع إلى المرشد المرافق",
				"واقع معزز (AR) يعرض المشاهد التاريخية",
				"صور ومخطوطات أصلية",
				"ترجمة فورية بست لغات",
				"شهادة رقمية بعد الجولة",
		  ]
		: [
				"Listen to your personal audio guide ",
				"Augmented Reality (AR) brings history to life",
				"Authentic photos and manuscripts",
				"Instant translation in six languages ",
				"Digital certificate after your tour",
		  ];

	return (
		<section
			className="relative bg-cover bg-center py-16"
			style={{ backgroundImage: "url('/haram/haram-bg.jpg')" }}
		>
			<div className="absolute inset-0 bg-black/50" aria-hidden="true" />
			<div className="container mx-auto px-4 relative z-10 text-center text-white">
				<h2 className="text-2xl md:text-4xl font-bold mb-3">
					{isAr
						? "التاريخ يروى بأحدث تقنية"
						: "History told with modern technology"}
				</h2>
				<p className="max-w-3xl mx-auto text-sm md:text-base text-gray-100/90 mb-6">
					{isAr
						? "باستخدام تطبيق “مزار”، ترافقك التجربة لحظة بلحظة —من تحديد موقعك داخل الحرم إلى الترجمة الفورية، لترى الصور التاريخية، وتستمع إلى القصة بلغتك، وتوثّق رحلتك بشهادة زيارة رقمية."
						: "Mzar guides you every step of the way discover, listen, and relive the sacred stories through smart technology. "}
				</p>

				{/* Explicit rows: 2 items, 2 items, then 1 centered item */}
				<div className="max-w-4xl mx-auto mb-8 space-y-4">
					{/* Row 1 */}
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1 px-4 py-3 rounded-xl bg-[#8B7B5A]/90 text-white font-semibold text-sm flex items-center justify-center">
							{features[0]}
						</div>
						<div className="flex-1 px-4 py-3 rounded-xl bg-[#8B7B5A]/90 text-white font-semibold text-sm flex items-center justify-center">
							{features[1]}
						</div>
					</div>

					{/* Row 2 */}
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1 px-4 py-3 rounded-xl bg-[#8B7B5A]/90 text-white font-semibold text-sm flex items-center justify-center">
							{features[2]}
						</div>
						<div className="flex-1 px-4 py-3 rounded-xl bg-[#8B7B5A]/90 text-white font-semibold text-sm flex items-center justify-center">
							{features[3]}
						</div>
					</div>

					{/* Row 3 - single centered */}
					<div className="flex">
						<div className="mx-auto w-full md:w-1/2 px-4 py-3 rounded-xl bg-[#8B7B5A]/90 text-white font-semibold text-sm flex items-center justify-center">
							{features[4]}
						</div>
					</div>
				</div>

				<div className="flex justify-center">
					<Link
						href="#"
						onClick={(e) => e.preventDefault()}
						className="inline-block"
					>
						<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-20 py-3 font-semibold rounded-lg">
							{isAr ? "جرّب التطبيق الآن" : "Try Mzar App Now"}
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
}
