"use client";

import React, { useState } from "react";

export default function FAQ({ lang = "en" }) {
	const [openIndex, setOpenIndex] = useState(1); // open the 2nd item by default
	const isAr = lang === "ar";

	const items = [
		{
			q: isAr
				? "هل يمكن استخدام الخدمة بدون الاتصال بالإنترنت؟"
				: "Can the service be used without an internet connection?",
			a: isAr
				? "نعم، بعد تنزيل التطبيق والمرشد الصوتي، يمكن استخدام الخدمة بدون اتصال بالإنترنت."
				: "Yes, after downloading the app and the audio guide, the service can be used without an internet connection.",
		},
		{
			q: isAr ? "هل تعمل الخدمة في جميع الحافلات؟" : "Does the service work on all buses?",
			a: isAr
				? "تعمل حاليا في مسارات مختارة من حافلات مكة, مع خطة للتوسع قريبا."
				: "Currently, it works on selected routes of Makkah buses, with plans to expand soon.",
		},
		{
			q: isAr
				? "هل يمكن اختيار اللغة؟"
				: "Is the service available in other languages?",
			a: isAr
				? "نعم، تتوفر بست لغات عبر المرشد الصوتي والتطبيق."
				: "Yes, it is available in six languages via the audio guide and the app.",
		},
		{
			q: isAr
				? "هل الخدمة مجانية؟"
				: "Is the service free?",
			a: isAr
				? "نعم، الخدمة مجانية بالكامل."
				: "Yes, the service is completely free.",
		},
	];

	const Title = isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions";

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
