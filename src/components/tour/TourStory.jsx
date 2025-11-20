"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import bigImg from "/public/tour/big-img.png";
import smallImg from "/public/haram/small-img.png";

export default function TourStory({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");
	// useEffect(() => {
	// 	if (typeof window === "undefined") return;
	// 	const stored = localStorage.getItem("lang");
	// 	if (stored === "ar" || stored === "en") setLanguage(stored);
	// 	else if (initialLang) setLanguage(initialLang);
	// }, [initialLang]);
	const isAr = language === "ar";

	return (
		<section className="py-12 md:py-20 bg-white relative overflow-x-clip">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center  gap-10 md:gap-32">
					
					{/* Texts side */}
					<div className="w-full md:w-1/2">
						<div >
							<h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
								{isAr
									? "لأن الزيارة ليست فقط عبادة... بل معرفة وإلهام أيضاً."
									: "Because a visit is not only about worship ,it’s also about knowledge and inspiration."}
							</h3>
							<p className="text-gray-700 mb-2 leading-relaxed">
								{isAr
									? "كثيرون زاروا الحرمين، لكن القليل من عاشوا معانيهما بعمق."
									: "Many have visited the Two Holy Mosques, but few have truly felt their deeper meanings."}
							</p>
							<p className="text-gray-700 mb-2 leading-relaxed">
								{isAr
									? "في جولات “مزار”، ستتعرف على الأماكن التي مر بها الأنبياء والصحابة، وتسمع القصص الموثقة بلغتك، وتشاهد الوقائع أمامك حيث وقعت وقت الأحداث."
									: 'With Mzar Tours, you’ll discover the places where prophets and companions once walked, hear authentic stories in your own language, and see the sacred sites before you ,exactly where history unfolded.'}
							</p>
						</div>
					</div>

          {/* Images side */}
					<div className="w-full md:w-1/2 flex justify-center md:justify-start">
						<div className="relative">
							{/* Big image as background */}
							<Image
								src={bigImg}
								alt=""
								width={420}
								height={320}
								className="rounded-2xl shadow-lg"
								draggable={false}
								priority
							/>
							{/* Small image centered and overlapping */}
							<div className="absolute left-1/2 top-1/2  -translate-y-1/2 -translate-x-[-10%] md:-translate-x-[-30%]">
								<Image
									src={smallImg}
									alt=""
									width={220}
									height={160}
									className="rounded-xl border-4 border-white shadow-md"
									draggable={false}
								/>
							</div>
						</div>
					</div>

				</div>
				{/* Centered text below */}
				<div className="mt-10 text-center text-lg md:text-xl font-semibold text-gray-800">
					{isAr
						? '"في 90 دقيقة فقط، يعيش الزائر قرونًا من التاريخ والإيمان." '
						: ' "In just 90 minutes, visitors experience centuries of history and faith." '}
				</div>
			</div>
			{/* Optional: subtle background pattern */}
      {/* You can add a subtle SVG or pattern here if needed */}
			{/* <div className="pointer-events-none absolute inset-0 -z-10">
				
			</div> */}
		</section>
	);
}
