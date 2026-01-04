import { Lock, Server, Shield, Eye } from "lucide-react";

export function DataSecurity({ isAr }) {
	const securityFeatures = [
		{
			icon: Lock,
			title: isAr ? "تشفير متقدم" : "Advanced Encryption",
			description: isAr
				? "جميع بياناتك الشخصية والمعاملات المالية مشفّرة بتقنيات SSL/TLS."
				: "All your personal data and financial transactions are encrypted using SSL/TLS technologies.",
		},
		{
			icon: Server,
			title: isAr ? "خوادم آمنة" : "Secure Servers",
			description: isAr
				? "نستخدم خوادم سحابية معتمدة وموثوقة ضمن مراكز بيانات مؤمنة."
				: "We rely on trusted, certified cloud servers hosted in secure data centers.",
		},
		{
			icon: Shield,
			title: isAr ? "حماية متعددة الطبقات" : "Multi-Layer Protection",
			description: isAr
				? "نطبّق أنظمة دفاع متطورة ضد الاختراقات والهجمات الإلكترونية."
				: "We implement advanced defense systems to protect against breaches and cyberattacks.",
		},
		{
			icon: Eye,
			title: isAr ? "مراقبة مستمرة" : "Continuous Monitoring",
			description: isAr
				? "يعمل فريق أمن سيبراني متخصص على مدار الساعة."
				: "A dedicated cybersecurity team operates around the clock.",
		},
	];

	return (
		<section className="bg-white py-12 ">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				{/* Main Trust Box */}
				<div className="mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d5940] to-[#116149] p-12 text-center shadow-2xl md:p-16">
					<div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#c9a961] shadow-xl">
						<Lock className="h-12 w-12 text-white" strokeWidth={2.5} />
					</div>
					<h2 className="mb-6 text-4xl text-white md:text-5xl">
						{isAr
							? "أمان بياناتك أولويتنا"
							: "Your Data Security is Our Priority"}
					</h2>
					<p className="mx-auto max-w-3xl text-2xl leading-relaxed text-white/95 mb-4">
						{isAr
							? "نستخدم أحدث أنظمة الأمان الرقمية المعتمدة دولياً لضمان أن تكون تجربتك معنا آمنة في كل خطوة ــ من تصفح الموقع وحتى إتمام الحجز. "
							: "We use the latest internationally approved digital security systems to ensure your experience with us is safe at every step ــ from browsing the website to completing your booking. "}
					</p>
				</div>

				{/* Security Features Grid */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{securityFeatures.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<div
								key={index}
								className="rounded-3xl bg-[#f5f2ed] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
							>
								<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d5940]">
									<Icon className="h-8 w-8 text-[#c9a961]" strokeWidth={2.5} />
								</div>
								<h3 className="mb-3 text-xl text-[#0d5940]">{feature.title}</h3>
								<p className="text-lg leading-relaxed text-[#718096]">
									{feature.description}
								</p>
							</div>
						);
					})}
				</div>

				{/* Compliance Badge */}
				<div className="mt-16 rounded-3xl border-2 border-[#c9a961] bg-[#e8f4f0] p-8 text-center">
					<p className="text-xl text-[#0d5940]">
						{isAr
							? "✓ متوافق مع المعايير الدولية لحماية البيانات"
							: "✓ Compliant with International Data Protection Standards"}
					</p>
				</div>
			</div>
		</section>
	);
}
