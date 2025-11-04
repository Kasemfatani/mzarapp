"use client";

import React, { useState } from "react";

export default function FAQ({ initialLang = "en" }) {
	const [openIndex, setOpenIndex] = useState(1); // open the 2nd item by default
	const isAr = initialLang === "ar";

	const items = [
		{
			q: isAr
				? "هل تشمل الجولة الدخول إلى الروضة الشريفة؟"
				: "Does the tour include entry to Al-Rawdah Al-Sharifah?",
			a: isAr
				? "الجولة تمر بالمناطق المجاورة للروضة وفق التنظيم الرسمي، وتشرح معالمها بالتفصيل."
				: "The tour passes by the areas adjacent to Al-Rawdah according to official regulations, and explains its landmarks in detail.",
		},
		{
			q: isAr
				? "هل يمكن الحجز لمجموعة خاصة؟"
				: "Can I book for a private group?",
			a: isAr
				? "نعم، يمكن حجز جولة VIP لمجموعة أو وفد محدد."
				: "Yes, you can book a VIP tour for a specific group or delegation.",
		},
		{
			q: isAr
				? "هل تتوفر ترجمة فورية أثناء الجولة؟"
				: "Is live translation available during the tour?",
			a: isAr
				? "نعم، عبر الترجمة الفورية في التطبيق بعدة لغات."
				: "Yes, via live translation in the app in multiple languages.",
		},
		{
			q: isAr
				? "هل الجولة مناسبة لكبار السن؟"
				: "Is the tour suitable for seniors?",
			a: isAr
				? "نعم، جميع المسارات مهيأة للكراسي المتحركة، مع تنظيم مريح للحركة."
				: "Yes, all routes are wheelchair accessible, with comfortable movement arrangements.",
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
									className={`w-6 h-6 flex items-center justify-center text-[#6B6B7B] order-1`}
									aria-hidden="true"
								>
									{isOpen ? "×" : "+"}
								</span>

								<div>
									{/* Number */}
									<span
										className={`text-sm md:text-base font-semibold ${
											isOpen ? "text-[#B89C73]" : "text-[#6B6B7B]"
										}  tabular-nums`}
									>
										{String(idx + 1).padStart(2, "0")}
									</span>
									{/* Question */}
									<span
										className={`flex-1 ${
											isOpen ? "text-[#B89C73]" : "text-[#141414]"
										}  text-base md:text-lg font-medium text-center ms-2`}
									>
										{item.q}
									</span>
								</div>
							</button>

							{/* Answer */}
							{isOpen && (
								<div className="px-5 md:px-6 pb-6 -mt-2">
									<p className="text-[var(--main-color)] text-sm md:text-base leading-7 text-start">
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
