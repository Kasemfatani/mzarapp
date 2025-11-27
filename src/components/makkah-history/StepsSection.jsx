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
				اكتشف التجربة عبر <br /> موقع مزار أو التطبيق.
			</>
		),
		en: (
			<>
				Discover the experience through <br /> Mzar website or app.
			</>
		),
		dotColor: "var(--sec-color)",
	},
	{
		icon: (
			<div className="bg-[var(--sec-color)] p-4 rounded-lg">
				<img src="/tour-bus/hand.png" alt="hand" />
			</div>
		),
		ar: (
			<>
				اختر نوع الجولة
				<br />
				(رقمية / مع مرشد). 
			</>
		),
		en: (
			<>
				Choose the type of tour
				<br />
				(Digital / with a guide).
			</>
		),
		dotColor: "var(--second-bg)",
	},
	{
		icon: (
			<div className="bg-[var(--second-bg)] p-4 rounded-lg">
				<img src="/tour-bus/building.png" alt="building" />
			</div>
		),
		ar: (
			<>
				احجز مقعدك وحدّد 
				<br />
				وقتك المناسب. 
			</>
		),
		en: (
			<>
				Book your seat and set your
				<br />
				suitable time.
			</>
		),
		dotColor: "var(--sec-color)",
	},
	{
		icon: (
			<div className="bg-[var(--sec-color)] p-4 rounded-lg">
				<img src="/tour-bus/building.png" alt="building" />
			</div>
		),
		ar: (
			<>
				استمتع بتجربتك من
				<br />
				شرفة برج الساعة.
			</>
		),
		en: (
			<>
				Enjoy your experience from
				<br />
				the Clock Tower balcony.
			</>
		),
		dotColor: "var(--second-bg)",
	},
];

export default function StepsSection({ lang = "ar" }) {
	const isAr = lang === "ar";
	return (
		<section className="py-16 ">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
					{isAr ? "رحلتك خطوة بخطوة" : "Your Journey Step by Step"}
				</h2>
				<div
					className={`flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-0 relative`}
				>
					{steps.map((step, idx) => (
						<div key={idx} className="flex-1 flex flex-col items-center">
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
				{/* <div className="flex justify-center mt-12">
					<Link href="#" className="inline-block">
						<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-12 py-3  font-semibold rounded-lg">
							{isAr ? "ابدأ الآن" : "Start Now"}
						</span>
					</Link>
				</div> */}
			</div>
		</section>
	);
}
