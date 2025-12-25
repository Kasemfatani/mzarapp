import { Smartphone, MousePointer, XCircle, CheckCircle } from "lucide-react";

export function HowToCancel({ isAr }) {
	const steps = [
		{
			number: "1",
			icon: Smartphone,
			title:  isAr ? 'ادخل إلى "رحلاتي"' : 'Go to "My Trips"',
			description: isAr ? "افتح التطبيق أو الموقع وانتقل إلى قسم حجوزاتك" : "Open the app or website and navigate to your bookings section",
		},
		{
			number: "2",
			icon: MousePointer,
			title: isAr ? "اختر الرحلة" : "Select the trip",
			description: isAr ? "حدد الرحلة التي تريد إلغاءها من قائمة الحجوزات" : "Select the trip you want to cancel from your bookings list",
		},
		{
			number: "3",
			icon: XCircle,
			title: isAr ? 'اضغط "إلغاء الحجز"' : 'Click "Cancel Booking"',
			description: isAr ? "اضغط على زر الإلغاء واتبع التعليمات البسيطة" : "Click the cancel button and follow the simple instructions",
		},
		{
			number: "4",
			icon: CheckCircle,
			title: isAr ? "يتم تأكيد الإلغاء فورًا" : "Cancellation is confirmed immediately",
			description: isAr ? "ستصلك رسالة تأكيد فورية على جوالك وبريدك الإلكتروني" : "You will receive an immediate confirmation message on your phone and email",
		},
	];

	return (
		<section className="bg-white py-20 md:py-32">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
						{isAr ? "كيفية الإلغاء" : "How to Cancel"}
					</h2>
					<p className="mx-auto max-w-2xl text-xl text-[#718096]">
						{isAr ? "عملية بسيطة وسريعة في 4 خطوات فقط" : "A simple and quick process in just 4 steps"}
					</p>
				</div>

				<div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* Connection Line (Desktop Only) */}
					<div
						className="absolute left-0 right-0 top-16 hidden h-1 bg-gradient-to-r from-[#0d5940] via-[#c9a961] to-[#0d5940] lg:block"
						style={{ top: "4rem" }}
					/>

					{steps.map((step, index) => {
						const Icon = step.icon;
						return (
							<div key={index} className="relative">
								<div className="rounded-3xl bg-[#f5f2ed] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
									{/* Step Number */}
									<div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0d5940] to-[#116149] text-3xl text-white shadow-lg">
										{step.number}
									</div>

									{/* Icon */}
									<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-md">
										<Icon
											className="h-7 w-7 text-[#c9a961]"
											strokeWidth={2.5}
										/>
									</div>

									{/* Title */}
									<h3 className="mb-3 text-2xl text-[#0d5940]">{step.title}</h3>

									{/* Description */}
									<p className="text-lg leading-relaxed text-[#4a5568]">
										{step.description}
									</p>
								</div>
							</div>
						);
					})}
				</div>

				{/* Additional Help */}
				<div className="mt-16 rounded-3xl bg-[#e8f4f0] p-10 text-center">
					<p className="text-xl text-[#0d5940]">
						💡 <strong>{isAr ? "نصيحة:" : "Tip:"}</strong> {isAr ? "يمكنك أيضًا التواصل مع فريق الدعم مباشرة لمساعدتك في عملية الإلغاء" : "You can also contact the support team directly to assist you with the cancellation process"}
					</p>
				</div>
			</div>
		</section>
	);
}
