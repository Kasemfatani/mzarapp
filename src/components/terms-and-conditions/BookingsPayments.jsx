import {
	Calendar,
	DollarSign,
	CheckSquare,
	CreditCard,
	Clock,
	Receipt,
	BellRing,
	ShieldCheck,
} from "lucide-react";

export function BookingsPayments({ isAr }) {
	const paymentRules = [
		{
			icon: CheckSquare,
			title: isAr ? "تأكيد الحجز" : "Booking Confirmation",
			description: isAr
				? "يتم تأكيد الحجز تلقائياً فور إتمام عملية الدفع بنجاح"
				: "Your booking is automatically confirmed once the payment is successfully completed",
		},
		{
			icon: DollarSign,
			title: isAr ? "الأسعار والضرائب" : "Prices and Taxes",
			description: isAr
				? "تتضمن جميع الأسعار ضريبة القيمة المضافة وأي رسوم إضافية إن وجدت"
				: "All prices include Value Added Tax (VAT) and any additional fees, if applicable",
		},
		{
			icon: Calendar,
			title: isAr ? "توفر التجارب" : "Availability of Experiences",
			description: isAr
				? "تخضع الحجوزات لتوفر الرحلة، وقد تتغير المواعيد أو لا تكون متاحة أحياناً"
				: "Bookings are subject to tour availability. Schedules may change, or certain experiences may occasionally be unavailable",
		},
		{
			icon: Receipt,
			title: isAr ? "الفواتير" : "Invoices",
			description: isAr
				? "يتم إرسال فاتورة تفصيلية إلى بريدك الإلكتروني بعد إتمام عملية الدفع"
				: "A detailed invoice will be sent to your email address after the payment is completed",
		},
		{
			icon: Clock,
			title: isAr ? "وقت المعالجة" : "Processing Time",
			description: isAr
				? "تُعالَج عمليات الدفع فوراً، ويتم إرسال تأكيد الحجز إلى بريدك الإلكتروني"
				: "Payments are processed instantly, and a booking confirmation will be sent to your email",
		},
		{
			icon: CreditCard,
			title: isAr ? "وسائل الدفع" : "Payment Methods",
			description: isAr
				? "يدعم مزار جميع وسائل الدفع الإلكتروني الآمنة والمعتمدة"
				: "Mzar supports all secure and approved electronic payment methods",
		},
	];

	return (
		<section className="bg-white py-20 md:py-32">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
						{isAr ? "الحجوزات والمدفوعات" : "Bookings and Payments"}
					</h2>
					<p className="mx-auto max-w-2xl text-xl text-[#718096]">
						{isAr
							? "قواعد واضحة لضمان عملية حجز سلسة وآمنة"
							: "Clear guidelines to ensure a smooth and secure booking process"}
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{paymentRules.map((rule, index) => {
						const Icon = rule.icon;
						return (
							<div
								key={index}
								className="rounded-3xl bg-[#f5f2ed] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
							>
								<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c9a961]">
									<Icon className="h-8 w-8 text-white" strokeWidth={2.5} />
								</div>
								<h3 className="mb-3 text-2xl text-[#0d5940]">{rule.title}</h3>
								<p className="text-lg leading-relaxed text-[#4a5568]">
									{rule.description}
								</p>
							</div>
						);
					})}
				</div>

				{/* Additional Info */}
				<div className="mt-16 grid gap-6 md:grid-cols-2">
					<div className="rounded-3xl bg-gradient-to-br from-[#e8f4f0] to-[#f5f2ed] p-8">
						<h3 className="mb-4 text-2xl text-[#0d5940]">
							💳 {isAr ? "الأمان المالي" : "Financial Security"}
						</h3>
						<p className="text-lg leading-relaxed text-[#4a5568]">
							{isAr
								? "تتم جميع المعاملات المالية عبر بوابات دفع معتمدة وآمنة. لا يحتفظ مزار بأي بيانات تخص بطاقتك الائتمانية على خوادمه."
								: "All financial transactions are processed through secure and approved payment gateways. We do not store any of your credit card details on our servers. "}
						</p>
					</div>
					<div className="rounded-3xl bg-gradient-to-br from-[#e8f4f0] to-[#f5f2ed] p-8">
						<h3 className="mb-4 text-2xl text-[#0d5940]">
							📧 {isAr ? "التواصل الفوري" : "Instant Communication"}
						</h3>
						<p className="text-lg leading-relaxed text-[#4a5568]">
							{isAr
								? "ستصلك جميع التحديثات المتعلقة بحجزك فوراً عبر البريد الإلكتروني أو الرسائل النصية، بما في ذلك تأكيد الرحلة أو أي تعديل."
								: "All updates related to your booking will be sent to you immediately via email or text messages, including tour confirmation or any changes. "}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
