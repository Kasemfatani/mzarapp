"use client";

import { Mail, Smartphone, CreditCard, MapPin , User , Settings ,BarChart3 } from "lucide-react";

export function WhatWeCollect({ isAr }) {

	const dataItems = [
  {
    icon: User,
    title: isAr ? "الاسم ومعلومات التواصل" : "Name and Contact Information",
    description: isAr 
      ? "لإنشاء حسابك، تأكيد الحجوزات، وإرسال التحديثات والعروض الهامة." 
      : "To create your account, confirm bookings, and send important updates and offers.",
  },
  {
    icon: CreditCard,
    title: isAr ? "معلومات الدفع" : "Payment Information",
    description: isAr 
      ? "تُعالج بياناتك عبر مزودين موثوقين لضمان إتمام الحجوزات بأعلى معايير الأمان." 
      : "Your data is processed via trusted providers to ensure bookings meet the highest security standards.",
  },
  {
    icon: MapPin,
    title: isAr ? "بيانات الموقع الجغرافي" : "Geographic Location Data",
    description: isAr 
      ? "لاقتراح وجهات قريبة، تحسين الملاحة، وتفعيل الدليل الصوتي تلقائياً عند المعالم." 
      : "To suggest nearby destinations, improve navigation, and trigger audio guides at landmarks.",
  },
  {
    icon: Settings,
    title: isAr ? "البيانات التقنية" : "Technical Data",
    description: isAr 
      ? "نجمع معلومات مثل عنوان IP ونوع النظام لتحسين أداء الخدمات وحماية الحسابات." 
      : "We collect info like IP address and OS type to improve service performance and protect accounts.",
  },
  {
    icon: BarChart3,
    title: isAr ? "بيانات الاستخدام والتحليل" : "Usage and Analytics Data",
    description: isAr 
      ? "لفهم تفضيلاتك وتطوير واجهة التطبيق بناءً على أنواع الجولات المفضلة وأوقات الحجز." 
      : "To understand your preferences and develop the app interface based on favorite tours and booking times.",
  },
];

	return (
		<section className="bg-white py-20 md:py-32">
			<div className="container mx-auto max-w-6xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
						{isAr ? "ما هي البيانات التي نجمعها؟" : "What Data Do We Collect?"}
					</h2>
					<p className="mx-auto max-w-2xl text-xl text-[#718096]">
						{isAr ? "نحن نجمع فقط البيانات الضرورية لتقديم خدماتنا بأفضل شكل ممكن " : "We only collect the necessary data to provide our services in the best possible way"}
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
						🔒 <strong>{isAr ? "ملحوظة:" : "Note:"}</strong> {isAr ? "نحن لا نجمع أي بيانات غير ضرورية أو حساسة دون موافقتك الصريحة، وجميع المعلومات محفوظة وفق أعلى معايير الأمان والخصوصية. " : "We do not collect any unnecessary or sensitive data without your explicit consent, and all information is stored according to the highest security and privacy standards."}
					</p>
				</div>
			</div>
		</section>
	);
}
