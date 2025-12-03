"use client";

import React, { useState } from "react";

export default function FAQ({ initialLang = "en" }) {
	const [openIndex, setOpenIndex] = useState(1); // open the 2nd item by default (to match the screenshot)
	const isAr = initialLang === "ar";

	const items = [
		{
			q: isAr
				? "كيف يمكنني الحجز؟ "
				: "How can I make a booking?",
			a: isAr
				? "يمكنك الحجز مباشرة عبر تطبيق “مزار” أو من خلال نقاط البيع المعتمدة في الفنادق والمراكز السياحية بمكة."
				: "You can book directly through the “Mzar” app or through authorized sales points in hotels and tourist centers in Makkah.",
		},
		{
			q: isAr ? "هل الجولات مخصصة للعوائل فقط؟" : "Are the tours for families only?",
			a: isAr
				? "لا، الجولات متاحة للأفراد والعوائل والمجموعات."
				: "No, the tours are available for individuals, families, and groups.",
		},
		{
			q: isAr
				? "بأي لغات يتوفر المرشد الصوتي؟"
				: "In which languages is the audio guide available?",
			a: isAr
				? "يتوفر بـ 6 لغات: العربية، الإنجليزية، الفرنسية، التركية، الأردية، الملايوية. "
				: "It is available in 6 languages: Arabic, English, French, Turkish, Urdu, and Malay.",
		},
		{
			q: isAr
				? "هل الجولة تشمل النقل من الفندق؟ "
				: "Does the tour include transportation from the hotel?",
			a: isAr
				? "نعم، تتوفر نقاط تجمع قريبة من معظم فنادق المنطقة المركزية ويمكن تنسيق النقل عند الحجز. "
				: "Yes, there are pickup points near most hotels in the central area, and transportation can be arranged when booking.",
		},
		{
			q: isAr
				? "هل التجربة مناسبة للأطفال وكبار السن؟ "
				: "Is the experience suitable for children and the elderly?",
			a: isAr
				? "نعم، تم تصميم الباصات لتناسب جميع الفئات العمرية مع خدمات مريحة وآمنة. "
				: "Yes, the buses are designed to accommodate all age groups with comfortable and safe services.",
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
