"use client";
import React from "react";
import Link from "next/link";

const steps = [
	{
		icon: (
			<div className="bg-[var(--second-bg)] p-4 rounded-lg">
				<img src="/tour-bus/zoom.png" alt="zoom" />
			</div>
		),
		ar: (
			<>
				حمّل تطبيق مزار من
				<br />
				App Store أو Google Play.
			</>
		),
		en: (
			<>
				Download Mzar app from
				<br />
				App Store or Google Play.
			</>
		),
		dotColor: "var(--sec-color)", // opposite of icon bg
	},
	{
		icon: (
			<div className="bg-[var(--sec-color)] p-4 rounded-lg">
				<img src="/tour-bus/hand.png" alt="hand" />
			</div>
		),
		ar: (
			<>
				افتح التطبيق وفعّل خدمة
				<br />
				"معالم في الطريق".
			</>
		),
		en: (
			<>
				Open the app and activate the
				<br />
				"Landmarks on the way" service.
			</>
		),
		dotColor: "var(--second-bg)", // opposite of icon bg
	},
	{
		icon: (
			<div className="bg-[var(--second-bg)] p-4 rounded-lg">
				<img src="/tour-bus/building.png" alt="building" />
			</div>
		),
		ar: (
			<>
				عند ركوبك الحافلة، يبدأ
				<br />
				التطبيق تلقائيًا بعرض
				<br />
				القصص والمعالم القريبة منك.
			</>
		),
		en: (
			<>
				When you board the bus, the app
				<br />
				automatically starts displaying
				<br />
				stories and landmarks near you.
			</>
		),
		dotColor: "var(--sec-color)", // opposite of icon bg
	},
	{
		icon: (
			<div className="bg-[var(--sec-color)] p-4 rounded-lg">
				<img src="/tour-bus/building.png" alt="building" />
			</div>
		),
		ar: (
			<>
				اختر لغتك واستمتع
				<br />
				بالرحلة المعرفية.
			</>
		),
		en: (
			<>
				Choose your language and enjoy
				<br />
				the informative journey.
			</>
		),
		dotColor: "var(--second-bg)", // opposite of icon bg
	},
];

export default function StepsSection({ lang = "ar" }) {
	const isAr = lang === "ar";
	return (
		<section className="py-16 ">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
					{isAr ? "كيف تبدأ تجربتك؟" : "How to start your experience?"}
				</h2>
				<div
					className={`flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-0 relative`}
				>
					{steps.map((step, idx) => (
						<div
							key={idx}
							className="flex-1 flex flex-col items-center relative"
						>
							{/* Icon with decorative dots */}
							<div className="relative mb-4 flex items-center gap-4 md:gap-6">
								{/* Left dot (hidden on first item) */}
								{idx !== 0 && (
									<div
										className="hidden md:block w-2 h-2 rounded-full"
										style={{ backgroundColor: step.dotColor }}
									></div>
								)}

								{/* Icon */}
								{step.icon}

								{/* Right dot (hidden on last item) */}
								{idx !== steps.length - 1 && (
									<div
										className="hidden md:block w-2 h-2 rounded-full"
										style={{ backgroundColor: step.dotColor }}
									></div>
								)}
							</div>

							<div
								className={`text-center text-gray-900 font-medium text-base md:text-lg leading-snug ${
									isAr ? "md:min-h-[72px]" : "md:min-h-[56px]"
								}`}
							>
								{isAr ? step.ar : step.en}
							</div>
						</div>
					))}
				</div>
				<div className="flex justify-center mt-12">
					<Link href="#" className="inline-block">
						<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-12 py-3 font-semibold rounded-lg">
							{isAr ? "ابدأ الآن" : "Start Now"}
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
}
