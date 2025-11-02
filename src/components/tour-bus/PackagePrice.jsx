"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const features = [
	{
		ar: "جولة كاملة",
		en: "Full tour",
	},
	{
		ar: "خصم خاص",
		en: "Special discount",
	},
	{
		ar: "مقاعد مجاورة",
		en: "Adjacent seats",
	},
	{
		ar: "تجربة مخصصة وجدول خاص",
		en: "Custom experience & private schedule",
	},
	{
		ar: "مرشد صوتي مجاني",
		en: "Free audio guide",
	},
];

export default function PackagePrice({ initialLang = "en" }) {
	const isAr = initialLang === "ar";
	const price = 25;
	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">
					{isAr
						? "اختر الباقة المناسبة لتجربتك"
						: "Choose the right package for your experience"}
				</h2>
				<div
					className={`flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 `}
				>
					{/* Card */}
					<div className="w-full md:w-[40%] md:-me-16 z-10 order-2 md:order-1">
						<div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
							{/* Price row */}
							<div className="flex items-start justify-center gap-2">
								<span className="text-4xl font-bold text-gray-900">
									{price}
								</span>
								<span className="text-2xl text-gray-700 mt-[-0.5em] flex items-center">
									<svg
										viewBox="0 0 1124.14 1256.39"
										width="1em"
										height="1em"
										fill="currentColor"
										style={{ display: "inline", verticalAlign: "top" }}
									>
										<path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
										<path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
									</svg>
								</span>
								<span className="text-lg text-gray-500 mt-1">
									{isAr ? "للفرد" : "per person"}
								</span>
							</div>
							{/* Divider */}
							<hr className="my-2" />
							{/* Features */}
							<div>
								<h4 className="font-bold text-gray-900 mb-3 text-center">
									{isAr ? "المزايا" : "Features"}
								</h4>
								<ul className="flex flex-col gap-2">
									{features.map((f, i) => (
										<li
											key={i}
											className="flex items-center gap-2 text-gray-800"
										>
											<span className="text-green-600 text-lg">✔</span>
											<span>{isAr ? f.ar : f.en}</span>
										</li>
									))}
								</ul>
							</div>
							{/* Button */}
							<Link href="#" target="_blank" className="inline-block">
								<span className="inline-block bg-[var(--main-color)] text-white text-center hover:bg-[var(--sec-color)] hover:text-black w-full py-3 font-semibold rounded-lg">
									{isAr
										? "احجز جولتك الآن عبر تطبيق مزار"
										: "Book your tour now via Mzar app"}
								</span>
							</Link>
						</div>
					</div>

					{/* Bus image */}
					<div className="w-full md:w-1/2 max-w-xl order-1 md:order-2">
						<Image
							src="/tour-bus/bus-down.webp"
							alt={isAr ? "صورة الباص" : "Bus image"}
							width={700}
							height={500}
							className="rounded-2xl w-full h-auto object-cover"
							draggable={false}
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
