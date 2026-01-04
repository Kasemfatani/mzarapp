"use client";

import {
	Mail,
	Smartphone,
	CreditCard,
	MapPin,
	User,
	Settings,
	BarChart3,
} from "lucide-react";

export function WhatWeCollect({ isAr }) {
	const dataItems = [
		{
			icon: User,
			title: isAr ? "الاسم ومعلومات التواصل" : "Personal & Contact Information",
			description: isAr
				? "لإنشاء حسابك، تأكيد الحجوزات، وإرسال التحديثات والعروض الهامة."
				: "Used to create your account, confirm bookings, and send notifications.",
		},
		{
			icon: CreditCard,
			title: isAr ? "معلومات الدفع" : "Payment Information",
			description: isAr
				? "تُعالج بياناتك عبر مزودين موثوقين لضمان إتمام الحجوزات بأعلى معايير الأمان."
				: "Processed securely via certified payment providers.",
		},
		{
			icon: MapPin,
			title: isAr ? "بيانات الموقع الجغرافي" : "Location Data",
			description: isAr
				? "لاقتراح وجهات قريبة، تحسين الملاحة، وتفعيل الدليل الصوتي تلقائياً عند المعالم."
				: "Used for smart features such as nearby tour suggestions, navigation, driver access, and automatic audio guide activation.",
		},
		{
			icon: Settings,
			title: isAr ? "البيانات التقنية" : "Technical Data",
			description: isAr
				? "نجمع معلومات مثل عنوان IP ونوع النظام لتحسين أداء الخدمات وحماية الحسابات."
				: "IP address, browser type, operating system, and browsing activity.",
		},
		{
			icon: BarChart3,
			title: isAr ? "بيانات الاستخدام والتحليل" : "Usage & Analytics",
			description: isAr
				? "لفهم تفضيلاتك وتطوير واجهة التطبيق بناءً على أنواع الجولات المفضلة وأوقات الحجز."
				: "To improve services and user experience.",
		},
	];

	return (
		<section className="bg-white py-20 md:py-32">
			<div className="container mx-auto max-w-6xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
						{isAr ? "ما هي البيانات التي نجمعها؟" : "Data We Collect"}
					</h2>
					<p className="mx-auto max-w-2xl text-xl text-[#718096]">
						{isAr
							? "نحن نجمع فقط البيانات الضرورية لتقديم خدماتنا بأفضل شكل ممكن "
							: "Only necessary data to provide our services effectively "}
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					{dataItems.map((item, index) => {
						const Icon = item.icon;
						return (
							<div
								key={index}
								className="group rounded-3xl border-2 border-[#e2e8f0] bg-white p-8 transition-all duration-300 hover:border-[#c9a961] hover:shadow-xl"
							>
								<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f4f0] transition-colors group-hover:bg-[#c9a961]">
									<Icon
										className="h-8 w-8 text-[#0d5940] transition-colors group-hover:text-white"
										strokeWidth={2.5}
									/>
								</div>
								<h3 className="mb-3 text-2xl text-[#0d5940]">{item.title}</h3>
								<p className="text-lg leading-relaxed text-[#4a5568]">
									{item.description}
								</p>
							</div>
						);
					})}
				</div>

				{/* Trust Note */}
				<div className="mt-12 rounded-3xl bg-[#e8f4f0] p-8 text-center">
					<p className="text-xl text-[#0d5940]">
						🔒 <strong>{isAr ? "ملحوظة:" : "Note:"}</strong>{" "}
						{isAr
							? "نحن لا نجمع أي بيانات غير ضرورية أو حساسة دون موافقتك الصريحة، وجميع المعلومات محفوظة وفق أعلى معايير الأمان والخصوصية. "
							: "We only collect data with your consent and keep it secure according to the highest privacy standards."}
					</p>
				</div>
			</div>
		</section>
	);
}
