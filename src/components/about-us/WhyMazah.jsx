import {
	UserCheck,
	Headphones,
	Zap,
	Sparkles,
	BookOpenCheck,
	Languages,
} from "lucide-react";

export function WhyMazah({ lang }) {
	const isAr = lang === "ar";

	const benefits = [
		{
			icon: Zap,
			title: isAr ? "حجز فوري" : "Instant Booking",
			description: isAr
				? "احجز رحلتك خلال ثوانٍ عبر التطبيق واستلم التأكيد فوراً."
				: "Book your journey within seconds through the app & receive immediate confirmation.",
		},
		{
			icon: UserCheck,
			title: isAr ? "مرشدون متخصصون ومعتمدون" : "Certified Specialized Guides",
			description: isAr
				? "فريق من الخبراء المؤهلين يملكون معرفة دقيقة بالمواقع التاريخية."
				: "A team of qualified experts with in-depth knowledge of historical sites.",
		},
		{
			icon: Sparkles,
			title: isAr
				? "تجارب مصممة خصيصاً لك"
				: "Experiences Designed Just for You",
			description: isAr
				? "خيارات تناسب الأفراد والعائلات والمجموعات، لتعيش تجربة تناسب اهتماماتك."
				: "Options suitable for individuals, families, and groups ــ so your experience matches your interests.",
		},
		{
			icon: BookOpenCheck,
			title: isAr ? "محتوى موثوق" : "Trusted Content",
			description: isAr
				? "نقدّم معلومات دقيقة وتجارب مدروسة بعناية."
				: "We provide accurate information & carefully curated experiences.",
		},
		{
			icon: Languages,
			title: isAr
				? "إثراء معرفي متعدد اللغات"
				: "Multilingual Knowledge Enrichment",
			description: isAr
				? "دليل صوتي ونصي بـ 6 لغات عالمية يرافقك في رحلتك."
				: "Audio & text guides are available in 6 international languages throughout your journey.",
		},
		{
			icon: Headphones,
			title: isAr ? "دعم متواصل على مدار الساعة" : "24/7 Continuous Support",
			description: isAr
				? "فريق دعم جاهز دائماً للرد على استفساراتك ومساعدتك في كل مرحلة من رحلتك."
				: "A dedicated support team is always ready to assist you at every stage of your trip.",
		},
	];

	return (
		<section className="bg-white py-20 md:py-28">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				{/* Title */}
				<h2 className="mb-16 text-center text-4xl text-[#0d5940] md:text-5xl">
					{isAr
						? 'لماذا يختار الآلاف "مزار"؟ '
						: 'Why Do Thousands Choose "Mzar"?'}
				</h2>

				{/* Benefits Grid */}
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{benefits.map((benefit, index) => {
						const Icon = benefit.icon;
						return (
							<div
								key={index}
								className="group rounded-3xl border border-[#e2e8f0] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a961] hover:shadow-lg"
							>
								<div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#f5f2ed]">
									<Icon className="h-7 w-7 text-[#c9a961]" strokeWidth={2.5} />
								</div>
								<h3 className="mb-3 text-2xl text-[#0d5940]">
									{benefit.title}
								</h3>
								<p className="text-lg leading-relaxed text-[#718096]">
									{benefit.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
