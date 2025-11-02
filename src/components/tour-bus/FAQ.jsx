"use client";

import React, { useState } from "react";

export default function FAQ({ initialLang = "en" }) {
	const [openIndex, setOpenIndex] = useState(1); // open the 2nd item by default (to match the screenshot)
	const isAr = initialLang === "ar";

	const items = [
		{
			q: isAr
				? "هل الجولة تشمل دخول الحرم من الداخل؟"
				: "Does the tour include entry inside the Haram?",
			a: isAr
				? "لا يشمل الدخول إلى داخل الحرم. الجولة هي خارجية حول المعالم المحيطة."
				: "Entry inside the Haram is not included. The tour is around nearby landmarks.",
		},
		{
			q: isAr ? "هل يمكن الحجز للعائلات؟" : "Can families book the tour?",
			a: isAr
				? "نعم، الجولة متاحة للعائلات والمجموعات الصغيرة."
				: "Yes, the tour is available for families and small groups.",
		},
		{
			q: isAr
				? "هل الخدمة متوفرة بلغات أخرى؟"
				: "Is the service available in other languages?",
			a: isAr
				? "نعم، نوفر دليلاً صوتياً بعدة لغات مدعومة داخل التطبيق."
				: "Yes, the in‑app audio guide supports multiple languages.",
		},
		{
			q: isAr
				? "كيف أستلم شهادة الزيارة؟"
				: "How do I receive the visit certificate?",
			a: isAr
				? "ستصلك الشهادة رقميًا بعد انتهاء الجولة، ويمكنك تنزيلها من التطبيق."
				: "You’ll receive a digital certificate after the tour and can download it in the app.",
		},
	];

	const Title = isAr ? "أسئلة يطرحها الزوار" : "Frequently Asked Questions";

	return (
		<section
			className="container m-auto my-20"
			style={{ direction: isAr ? "rtl" : "ltr" }}
		>
			<h2 className="text-3xl md:text-4xl font-bold text-[#141414] mb-8 text-center">
				{Title}
			</h2>

			<div className="max-w-3xl mx-auto space-y-4">
				{items.map((item, idx) => {
					const isOpen = openIndex === idx;
					return (
						<div
							key={idx}
							className={` border border-[#EFE8DC] overflow-hidden transition-colors ${
								isOpen ? "bg-white" : "bg-[#FFF7E9]"
							}`}
						>
							{/* Header row */}
							<button
								type="button"
								aria-expanded={isOpen}
								onClick={() => setOpenIndex(isOpen ? -1 : idx)}
								className="w-full flex items-center justify-between gap-4 p-5 md:p-6"
							>
								{/* Icon (plus / x) */}
								<span
									className={`w-6 h-6 flex items-center justify-center text-[#6B6B7B] ${
										isAr ? "order-1" : "order-1"
									}`}
									aria-hidden="true"
								>
									{isOpen ? "×" : "+"}
								</span>

								<div>
                  {/* Number */}
									<span className={`text-sm md:text-base font-semibold ${
										isOpen ? "text-[#B89C73]" : "text-[#6B6B7B]"}  tabular-nums`}>
										{String(idx + 1).padStart(2, "0")}
									</span>
									{/* Question */}
									<span className={`flex-1 ${
										isOpen ? "text-[#B89C73]" : "text-[#141414]"}  text-base md:text-lg font-medium text-center ms-2`}>
										{item.q}
									</span>

									
								</div>
							</button>

							{/* Answer */}
							{isOpen && (
								<div className="px-5 md:px-6 pb-6 -mt-2">
									<p className="text-[#6F6C90] text-sm md:text-base leading-7 text-start">
										{item.a}
									</p>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
}
