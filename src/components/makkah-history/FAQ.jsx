"use client";

import React, { useState } from "react";

export default function FAQ({ lang = "en" }) {
	const [openIndex, setOpenIndex] = useState(1); // open the 2nd item by default
	const isAr = lang === "ar";

	const items = [
		{
			q: isAr
				? "هل التجربة تشمل دخول الشرفة؟"
				: "Does the experience include entering the balcony?",
			a: isAr
				? "نعم، تشمل التجربة دخول شرفة برج الساعة كجزء من الجولة."
				: "Yes, the experience includes access to the Clock Tower balcony as part of the tour.",
		},
		{
			q: isAr ? "هل  يمكن الحجز لعائلة أو مجموعة؟" : "Can I book for a family or group?",
			a: isAr
				? "نعم، يمكن الحجز الجماعي من 5 إلى 10 أشخاص للتجربة المرافقة"
				: "Yes, group bookings from 5 to 10 people are available for the accompanying experience.",
		},
		{
			q: isAr
				? "ما هي اللغات المتاحة ؟"
				: "What languages are available?",
			a: isAr
				? "تتوفر ست لغات من خلال الدليل الصوتي والتطبيق."
				: "Six languages are available through the audio guide and the app.",
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
