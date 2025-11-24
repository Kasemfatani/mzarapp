"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function PartnerSection({
	lang = "en",
	hotelName = "(الاسم)",
	discountCode = "MZAR20",
	hotelLogoSrc = "/hotel/hotel_2_logo.png",
}) {
	const isAr = lang === "ar";

	// Texts (adjust as needed)
	const heading = isAr
		? `عن الشراكة بين مزار وفندق ${hotelName}`
		: `About the partnership between Mzar and ${hotelName}`;
	const paragraph1 = isAr
		? `الشراكة بين ${hotelName} ومزار لتقديم تجربة معرفية استثنائية لزوار ${hotelName}، تجمع بين الراحة الفندقية والرحلة الثقافية.`
		: `The partnership between ${hotelName} and Mzar aims to provide an exceptional educational and cultural experience for the esteemed guests of ${hotelName}.`;
	const paragraph2 = isAr
		? `معًا، نساهم في جعل إقامة ضيف مكة أكثر ثراءً وارتباطًا بتاريخها العريق — لعيش لحظات لا تُنسى بين أصالة التاريخ وروح المكان.`
		: `Together, we contribute to making every guest’s stay in Makkah more meaningful and deeply connected to its ancient history, allowing them to live unforgettable moments filled with the authenticity of history, the spirit of the place, and the warmth of hospitality`;
	const cta = isAr ? "حمل تطبيق مزار الآن" : "Download Mzar App";

	const headingCode = isAr
		? "رمز خصم خاص لنزلاء الفندق"
		: "Special discount code for hotel guests";

	const useInApp = isAr ? "استخدمه داخل تطبيق مزار" : "Use it in Mazar app";

	const copyCode = isAr ? "انسخ الكود" : "Copy the code";

	return (
		<>
			<section className={`container mx-auto px-4 py-12 md:py-20 `}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
					{/* Text + CTA column */}
					<div className="order-2 md:order-1 flex flex-col gap-6 ">
						<h2 className="text-3xl md:text-4xl font-extrabold text-[var(--main-color,#14532d)]">
							{heading}
						</h2>

						<div className="space-y-3 text-gray-800 max-w-2xl">
							<p className="text-base md:text-lg">{paragraph1}</p>
							<p className="text-base md:text-lg">{paragraph2}</p>
						</div>

						<div>
							<Link
								href="https://onelink.to/yb2xky"
								target="_blank"
								className="inline-block mt-2 px-6 py-3 rounded-full bg-[var(--main-color,#14532d)] text-white font-semibold hover:bg-[var(--sec-color,#86efac)] hover:text-black transition"
							>
								{cta}
							</Link>
						</div>
					</div>

					{/* Logos column */}
					<div
						className={`order-1 md:order-2 flex flex-col justify-between h-56 md:h-72 p-4 md:p-6 bg-white/0 gap-8 md:gap-0`}
					>
						<div className="flex items-start justify-end">
							<div className="bg-white rounded-xl shadow-2xl p-4 inline-block">
								<Image
									src="/Home/header-logo.png"
									alt="Mzar logo"
									width={220}
									height={72}
									className="object-contain"
								/>
							</div>
						</div>

						<div className="flex items-end justify-start ">
							<div className="bg-white rounded-xl shadow-2xl p-4 inline-block">
								<Image
									src={hotelLogoSrc}
									alt="Partner hotel logo"
									width={220}
									height={72}
									className="object-contain"
								/>
							</div>
						</div>
					</div>
				</div>
				{/* Discount code section */}
				<div className="mt-12 p-6  text-center">
					<h2 className="text-3xl md:text-4xl font-extrabold text-[var(--main-color,#14532d)] mb-3">
						{headingCode}
					</h2>
					<h3 className="text-2xl md:text-3xl  text-[var(--second-bg)] mb-3">{discountCode}</h3>
					{/* <p className="mb-2 text-[var(--second-bg)]">{useInApp}</p> */}
					<button
						onClick={() => {
							navigator.clipboard.writeText(discountCode);
							alert(isAr ? "تم نسخ الكود!" : "Code copied!");
						}}
						className="inline-block mt-2 px-6 py-3 rounded-full bg-[var(--main-color,#14532d)] text-white font-semibold hover:bg-[var(--sec-color,#86efac)] hover:text-black transition"
					>
						{copyCode}
					</button>
					
				</div>
			</section>
		</>
	);
}
