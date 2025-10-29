"use client";
import React, { useEffect, useState } from "react";

export default function TopTextSection({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");
	// Uncomment if you want to sync with localStorage
	// useEffect(() => {
	//   if (typeof window === "undefined") return;
	//   const stored = localStorage.getItem("lang");
	//   if (stored === "ar" || stored === "en") setLanguage(stored);
	//   else if (initialLang) setLanguage(initialLang);
	// }, [initialLang]);
	const isAr = language === "ar";

	// Card content
	const cards = [
		{
			bg: "bg-[url('/tour/haram.png')]",
			title: isAr ? "جولة المسجد الحرام" : "Masjid al-Haram Tour",
			desc: isAr
				? "انضموا إلينا في جولة مميزة داخل الحرم المكي الشريف، نتعرف خلالها على أبرز المعالم التاريخية والإسلامية"
				: "Join us for a special tour inside the Grand Mosque, exploring its most prominent historical and Islamic landmarks.",
			people: isAr ? "عدد المشاركين: 25 شخصاً" : "Participants: 25 persons",
			duration: isAr ? "مدة الجولة: 40 دقيقة" : "Tour duration: 40 min",
			meet: isAr ? "مكان اللقاء: باب السلام" : "Meeting point: Bab Al-Salam",
			button: {
				label: isAr ? "استكشف الجولة" : "Explore Tour",
				style:
					"w-full mt-4 rounded-xl bg-green-700 hover:bg-green-800 text-white py-2.5 text-sm font-semibold transition",
				soon: false,
			},
		},
		{
			bg: "bg-[url('/tour/mdinah.png')]",
			title: isAr ? "جولة المسجد النبوي" : "Masjid an-Nabawi Tour",
			desc: isAr
				? "انضموا إلينا في جولة مميزة داخل الحرم النبوي الشريف، نتعرف خلالها على أبرز المعالم التاريخية والإسلامية"
				: "Join us for a special tour inside the Prophet’s Mosque, exploring its most prominent historical and Islamic landmarks.",
			people: isAr ? "عدد المشاركين: 25 شخصاً" : "Participants: 25 persons",
			duration: isAr ? "مدة الجولة: 40 دقيقة" : "Tour duration: 40 min",
			meet: isAr ? "مكان اللقاء: باب السلام" : "Meeting point: Bab Al-Salam",
			button: {
				label: isAr ? "قريبًا..." : "Soon...",
				style:
					"w-full mt-4 rounded-xl border border-[#2f4f3f]/40 text-[#2f4f3f] py-2.5 text-sm font-semibold bg-white/60 transition",
				soon: true,
			},
		},
	];

	return (
		<section className="py-5 bg-white mb-32">
			<div className="container mx-auto px-4">
				<h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-0">
					{isAr
						? "لماذا يختار الزوار الجولات الإثرائية؟"
						: "Why do visitors choose Enriching Tours?"}
				</h2>
				<p className="text-center text-gray-500 mt-2">
					{isAr
						? "كثيرون زاروا الحرمين، لكن القليل من عاشوا معانيهما بعمق."
						: "Many have visited the Holy Mosques, but few have truly experienced their deeper meanings."}
				</p>
				<p className="text-center text-gray-500 mb-6">
					{isAr
						? "في جولات “مزار” ستتعرف على الأماكن التي مر بها الأنبياء والصحابة، وتسمع القصص الموثوقة بلغتك، وتشاهد المواقع أمامك حيث وقعت الأحداث. "
						: "In “Mzar” tours, you will discover the places visited by prophets and companions, hear documented stories in your language, and witness events as they happened."}
				</p>

				{/* Two cards */}
				<div className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-4xl mx-auto">
					{cards.map((card, idx) => (
						<div
							key={idx}
							className={`flex-1 rounded-3xl shadow-lg px-10 flex flex-col justify-end min-h-[390px] ${card.bg} bg-cover bg-center relative`}
							style={{ minWidth: 0 }}
						>
							
							<div className="bg-[#8B7B5A]/90 text-white text-center px-6 py-6 flex flex-col items-center -mb-32 rounded-3xl">
								<h3 className="text-xl md:text-2xl font-bold mb-2">
									{card.title}
								</h3>
								<p className="mb-2 text-base">{card.desc}</p>
								<div className="flex flex-col gap-1 text-sm mb-2">
									<div className="flex items-center justify-center gap-2">
										<span className="inline-block">
											<i className="fa-regular fa-user" />
										</span>
										<span>{card.people}</span>
									</div>
									<div className="flex items-center justify-center gap-2">
										<span className="inline-block">
											<i className="fa-regular fa-clock" />
										</span>
										<span>{card.duration}</span>
									</div>
									<div className="flex items-center justify-center gap-2">
										<span className="inline-block">
											<i className="fa-solid fa-location-dot" />
										</span>
										<span>{card.meet}</span>
									</div>
								</div>
								<button
									type="button"
									className={card.button.style}
									disabled={card.button.soon}
									tabIndex={card.button.soon ? -1 : 0}
								>
									{card.button.label}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
