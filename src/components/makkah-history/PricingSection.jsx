"use client";
import React from "react";
import Link from "next/link";
import DownloadButtons from "@/components/home/DownloadButtons";

const SARIcon = () => (
	<svg
		viewBox="0 0 1124.14 1256.39"
		width=".5em"
		height=".5em"
		fill="currentColor"
		style={{ display: "inline", verticalAlign: "top" }}
	>
		<path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
		<path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
	</svg>
);

export default function PricingSection({ lang = "ar" }) {
	const isAr = lang === "ar";

	const options = [
		{
			title: isAr
				? "التجربة الرقمية (بالمرشد الرقمي)"
				: "Digital Experience (with Digital Guide)",
			price: "80",
			description: isAr
				? "استكشف القصص التاريخية عبر تطبيق مزار باستخدام تقنية الواقع المعزز بست لغات عالمية، متاحة للأفراد والعائلات."
				: "Explore historical stories through the Mzar app using augmented reality technology in six global languages, available for individuals and families.",
			buttonText: isAr ? "احجز الآن" : "Book Now",
			buttonClass:
				"bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black",
			agreement: false,
		},
		{
			title: isAr
				? "التجربة المرافقة (بالمرشد البشري)"
				: "Accompanied Experience (with Human Guide)",
			price: "120",
			description: isAr
				? "جولة حية بإشراف مرشد سياحي متخصص داخل شرفة برج الساعة، تشمل الحجز الكامل للشرفة."
				: "A live tour supervised by a specialized tourist guide inside the Clock Tower balcony, including full balcony reservation.",
			buttonText: isAr ? "احجز الآن" : "Book Now",
			buttonClass:
				"bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black",
			agreement: true,
		},
	];

	const features = [
		{
			icon: (
				<img src="/makkah-history/time-forward.png" alt="img" width="24" height="24"/>
			),
			text: isAr ? "مدة الجولة: 20-40 دقيقة" : "Tour Duration: 20-40 minutes",
		},
		{
			icon: (
				<img src="/makkah-history/time.png" alt="img" width="24" height="24"/>
			),
			text: isAr
				? "أوقات التشغيل: من الساعة 4 مساءً إلى 10 مساءً"
				: "Operating Hours: 4 PM to 10 PM",
		},
		{
			icon: (
				<img src="/makkah-history/location-fill.png" alt="img" width="24" height="24"/>
			),
			text: isAr
				? "الموقع: شرفة برج الساعة – مكة المكرمة"
				: "Location: Clock Tower Balcony – Makkah",
		},
	];

	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				{/* Title */}
				<h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900">
					{isAr ? "خيارات التجربة" : "Experience Options"}
				</h2>

				{/* Features */}
				<div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mb-12">
					{features.map((feature, idx) => (
						<div key={idx} className="flex items-center gap-3">
							<div className="text-[var(--main-color)]">{feature.icon}</div>
							<span className="text-gray-700 text-sm md:text-base">
								{feature.text}
							</span>
						</div>
					))}
				</div>

				{/* Pricing Cards */}
				<div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
					{options.map((option, idx) => (
						<div
							key={idx}
							className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow flex flex-col h-full"
						>
							{/* Content above button */}
							<div className="flex-1 flex flex-col">
								<h3 className="text-xl font-bold text-gray-900 text-center mb-4">
									{option.title}
								</h3>
								<div className="text-center mb-4">
									<div className="flex items-center justify-center gap-1">
										<span className="text-4xl font-bold text-gray-900 ltr">
											<SARIcon /> {option.price}
										</span>
										<p className="text-gray-500 text-sm">
											{isAr ? "للفرد" : "per person"}
										</p>
									</div>
									{option.agreement && (
										<p className="text-gray-400 text-xs mt-1">
											{isAr ? "حسب الاتفاق" : "according to agreement"}
										</p>
									)}
								</div>
								<div className="w-full h-px bg-gray-200 mb-4"></div>
								<p className="text-gray-600 text-center text-sm md:text-base mb-6 leading-relaxed ">
									{option.description}
								</p>
							</div>
							{/* Button at bottom */}
							<Link href="#" className="block mt-auto">
								<button
									className={`w-full py-3 rounded-lg font-semibold transition-colors ${option.buttonClass}`}
								>
									{option.buttonText}
								</button>
							</Link>
						</div>
					))}
				</div>

				{/* App Download Section */}
				<div className="text-center">
					<Link
						href="https://onelink.to/yb2xky"
						className="inline-block mb-4"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className="inline-block bg-transparent border border-[var(--main-color)] text-[var(--main-color)] hover:bg-[var(--sec-color)] hover:border-black hover:text-black px-8 py-3 font-semibold rounded-lg transition-colors">
							{isAr ? " التجربة عبر التطبيق" : "Experience via the App"}
						</span>
					</Link>
					<DownloadButtons language={lang} />
				</div>
			</div>
		</section>
	);
}
