import { Clock, CreditCard, Calendar, Ticket } from "lucide-react";

export function QuickSummary({ isAr }) {
	const summaryCards = [
		{
			icon: Clock,
			title: isAr ? "إلغاء مجاني" : "Free Cancellation",
			description: isAr
				? "يمكنك الإلغاء مجاناً حتى ساعتين قبل موعد التجربة."
				: "Up to 2 hours before the experience.",
			bgColor: "bg-[#e8f4f0]",
			iconColor: "text-[#0d5940]",
		},
		{
			icon: CreditCard,
			title: isAr ? "استرجاع المبلغ" : "Refund method",
			description: isAr
				? "يتم استرجاع المبلغ بنفس وسيلة الدفع."
				: "Original payment method.",
			bgColor: "bg-[#e5d4a8]/30",
			iconColor: "text-[#c9a961]",
		},
		{
			icon: Calendar,
			title: isAr ? "وقت الاسترجاع" : "Refund time",
			description: isAr ? "خلال 3 - 14 يوم عمل." : "3 - 14 business days.",
			bgColor: "bg-[#e8f4f0]",
			iconColor: "text-[#0d5940]",
		},
		{
			icon: Ticket,
			title: isAr ? "حسب نوع التجربة" : "Policy variation",
			description: isAr
				? "تختلف السياسة حسب نوع الجولة (موضح في صفحة التجربة)"
				: "Depends on the experience type.",
			bgColor: "bg-[#e5d4a8]/30",
			iconColor: "text-[#c9a961]",
		},
	];

	return (
		<section className="bg-white py-20 md:py-32">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
						{isAr ? "ملخص سريع" : "Quick Summary"}
					</h2>
					<p className="mx-auto max-w-2xl text-xl text-[#718096]">
						{isAr
							? "أهم المعلومات التي تحتاجها عن سياسة الحجز والإلغاء "
							: "Key information you need about the booking and cancellation policy"}
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{summaryCards.map((card, index) => {
						const Icon = card.icon;
						return (
							<div
								key={index}
								className={`rounded-3xl ${card.bgColor} p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
							>
								<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md">
									<Icon
										className={`h-8 w-8 ${card.iconColor}`}
										strokeWidth={2.5}
									/>
								</div>
								<h3 className="mb-3 text-2xl text-[#0d5940]">{card.title}</h3>
								<p className="text-lg leading-relaxed text-[#4a5568]">
									{card.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
