import {
	CheckCircle2,
	UserCheck,
	Shield,
	Users,
	AlertCircle,
	Clock,
} from "lucide-react";

export default function UserResponsibilities({ isAr }) {
	const responsibilities = [
		{
			icon: UserCheck,
			title: isAr ? "إدخال بيانات صحيحة" : "Providing Accurate Information",
			description: isAr
				? "يجب تسجيل معلومات دقيقة وصحيحة عند إنشاء الحساب أو إجراء أي حجز."
				: "You must provide accurate and correct information when creating an account or making any booking.",
		},
		{
			icon: CheckCircle2,
			title: isAr
				? "الالتزام بتعليمات الجولة"
				: "Adhering to Tour Instructions",
			description: isAr
				? "اتّبع إرشادات وتعليمات المرشد والمنظمين أثناء الرحلة."
				: "Please follow the guidelines and instructions provided by the guide and organizers during the tour.",
		},
		{
			icon: Users,
			title: isAr
				? "احترام المرشدين والمنظمين"
				: "Respecting Guides and Organizers",
			description: isAr
				? "التعامل بأدب واحترام مع جميع موظفي مزار ومقدمي الخدمات."
				: "Interact politely and respectfully with all Mzar staff and service providers.",
		},
		{
			icon: Clock,
			title: isAr ? "الالتزام بالمواعيد" : "Punctuality",
			description: isAr
				? "الحرص على الحضور في الوقت المحدد."
				: "Ensure you arrive at the designated meeting point on time.",
		},
		{
			icon: AlertCircle,
			title: isAr ? "الإبلاغ عن المشكلات" : "Reporting Issues",
			description: isAr
				? "في حال واجهت أي خلل أو ملاحظة أثناء الجولة، نرجو إبلاغ فريق مزار فوراً."
				: "If you encounter any issues or have observations during the tour, please inform the Mzar team immediately.",
		},
		{
			icon: Shield,
			title: isAr ? "المحافظة على السلامة" : "Maintaining Safety",
			description: isAr
				? "اتّبع تعليمات السلامة العامة، واحرص على الالتزام بقواعد التنقل داخل المواقع والمعالم."
				: "Follow general safety instructions and comply with movement and conduct rules within sites and landmarks.",
		},
	];

	return (
		<section className="bg-[#f5f2ed] py-20 md:py-32">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
						{isAr ? "مسؤوليات المستخدم" : "User Responsibilities"}
					</h2>
					<p className="mx-auto max-w-2xl text-xl text-[#718096]">
						{isAr
							? "التزامات بسيطة لضمان تجربة ممتعة وآمنة للجميع"
							: "Simple commitments to ensure an enjoyable and safe experience for everyone"}
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{responsibilities.map((item, index) => {
						const Icon = item.icon;
						return (
							<div
								key={index}
								className="rounded-3xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
							>
								<div className="mb-6 flex items-center gap-4">
									<div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#e8f4f0]">
										<Icon
											className="h-7 w-7 text-[#0d5940]"
											strokeWidth={2.5}
										/>
									</div>
									<CheckCircle2
										className="h-8 w-8 text-[#c9a961]"
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

				{/* Important Note */}
				<div className="mt-12 rounded-3xl border-2 border-[#c9a961] bg-white p-8 text-center">
					<p className="text-xl leading-relaxed text-[#0d5940]">
						⚠️ <strong>{isAr ? "تنويه مهم" : "Important Note"}:</strong>{" "}
						{isAr
							? "عدم الالتزام بهذه المسؤوليات قد يؤدي إلى إلغاء الحجز أو تعليق الحساب أو منع الاستخدام المستقبلي للمنصة، حرصاً على سلامة التجربة لجميع المستخدمين. "
							: "Failure to comply with these responsibilities may result in booking cancellation, account suspension, or restriction from future use of the platform, to maintain the safety and quality of the experience for all users. "}
					</p>
				</div>
			</div>
		</section>
	);
}
