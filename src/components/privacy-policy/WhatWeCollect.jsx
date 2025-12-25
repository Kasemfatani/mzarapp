import { Mail, Smartphone, CreditCard, MapPin } from "lucide-react";

export function WhatWeCollect({ isAr }) {

	const dataItems = [
		{
			icon: Mail,
			title: isAr ? "الاسم والبريد الإلكتروني" : "Name and Email",
			description: isAr ? "لإنشاء حسابك وإرسال تأكيدات الحجز" : "To create your account and send booking confirmations",
		},
		{
			icon: Smartphone,
			title: isAr ? "رقم الهاتف" : "Phone Number",
			description: isAr ? "للتواصل معك بخصوص الرحلات والتحديثات" : "To contact you regarding trips and updates",
		},
		{
			icon: CreditCard,
			title: isAr ? "بيانات الدفع (مشفّرة)" : "Payment Data (Encrypted)",
			description: isAr ? "لمعالجة الحجوزات بشكل آمن ومشفّر" : "To process bookings securely and encrypted",
		},
		{
			icon: MapPin,
			title: isAr ? "بيانات الموقع" : "Location Data",
			description: isAr ? "لتحسين التجربة وتقديم خدمات مخصصة" : "To improve experience and provide personalized services",
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
						{isAr ? "نجمع فقط البيانات الضرورية لتقديم خدماتنا بأفضل صورة" : "We only collect the necessary data to provide our services in the best way"}
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
						🔒 <strong>{isAr ? "ملاحظة مهمة:" : "Important Note:"}</strong> {isAr ? "لا نشارك بياناتك مع أي طرف غير مصرح به" : "We do not share your data with any unauthorized party"}
					</p>
				</div>
			</div>
		</section>
	);
}
