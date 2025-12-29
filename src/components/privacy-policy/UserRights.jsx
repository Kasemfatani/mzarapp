import {
	Trash2,
	Edit,
	BellOff,
	Download,
	UserX,
	RefreshCw,
} from "lucide-react";

export function UserRights({ isAr }) {
	const rights = [
		{
			icon: BellOff,
			title: isAr ? "إيقاف الرسائل الترويجية" : "Stop Promotional Messages",
			description: isAr
				? "يمكنك إلغاء الاشتراك من رسائلنا التسويقية في أي وقت ترغب به. لن نرسل لك أي رسائل إلا بموافقتك. "
				: "You can unsubscribe from our marketing messages at any time you wish. We will not send you any messages without your consent.",
			action: isAr ? "إدارة الإشعارات" : "Manage Notifications",
		},
		{
			icon: Edit,
			title: isAr ? "تحديث معلوماتك" : "Update Your Information",
			description: isAr
				? "يمكنك مراجعة وتحديث معلوماتك الشخصية، مثل الاسم أو البريد الإلكتروني أو رقم الهاتف، من خلال إعدادات حسابك في التطبيق أو الموقع. "
				: "You can review and update your personal information, such as name, email, or phone number, through your account settings in the app or website.",
			action: isAr ? "تحديث البيانات" : "Update Information",
		},
		{
			icon: Trash2,
			title: isAr ? "حذف بياناتك" : "Delete Your Data",
			description: isAr
				? "يمكنك طلب حذف جميع بياناتك الشخصية من أنظمتنا في أي وقت. "
				: "You can request the deletion of all your personal data from our systems at any time.",
			action: isAr ? "طلب الحذف" : "Request Deletion",
		},

		{
			icon: Download,
			title: isAr ? "تحميل بياناتك" : "Download Your Data",
			description: isAr
				? "لديك الحق في الحصول على نسخة من جميع بياناتك الشخصية المخزّنة لدينا بصيغة آمنة وقابلة للتحميل. "
				: "You have the right to obtain a copy of all your personal data stored with us in a secure and downloadable format.",
			action: isAr ? "تحميل البيانات" : "Download Data",
		},
		{
			icon: UserX,
			title: isAr ? "إلغاء حسابك" : "Delete Your Account",
			description: isAr
				? "يمكنك إغلاق حسابك وحذف جميع بياناتك المرتبطة به نهائياً من أنظمتنا متى ما رغبت بذلك. "
				: "You can close your account and permanently delete all data associated with it from our systems whenever you wish.",
			action: isAr ? "إلغاء الحساب" : "Delete Account",
		},
		{
			icon: RefreshCw,
			title: isAr ? "تحديث التفضيلات" : "Update Preferences",
			description: isAr
				? "يمكنك التحكم بنوع الإشعارات أو التنبيهات التي ترغب في استقبالها من مزار بما يتناسب مع اهتماماتك. "
				: "You can control the type of notifications or alerts you wish to receive from Mzar according to your interests.",
			action: isAr ? "تخصيص الخصوصية" : "Customize Privacy",
		},
	];

	return (
		<section className="bg-[#f5f2ed] py-20 md:py-32">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
						{isAr
							? "تحكمك الكامل ببياناتك بين يديك "
							: "Your Complete Control Over Your Data"}
					</h2>
					<p className="mx-auto max-w-3xl text-xl text-[#718096]">
						{isAr
							? "نؤمن في مزار بحقك الكامل في التحكم بمعلوماتك الشخصية "
							: "At Mzar, we believe in your full right to control your personal information."}
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{rights.map((right, index) => {
						const Icon = right.icon;
						return (
							<div
								key={index}
								className="overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
							>
								<div className="p-8">
									<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f4f0]">
										<Icon
											className="h-8 w-8 text-[#0d5940]"
											strokeWidth={2.5}
										/>
									</div>
									<h3 className="mb-3 text-2xl text-[#0d5940]">
										{right.title}
									</h3>
									<p className="mb-6 text-lg leading-relaxed text-[#4a5568]">
										{right.description}
									</p>
									<button className="text-lg text-[#c9a961] transition-colors hover:text-[#0d5940]">
										{right.action} {isAr ? "←" : "→"}
									</button>
								</div>
							</div>
						);
					})}
				</div>

				{/* Important Notice */}
				<div className="mt-16 rounded-3xl bg-white p-10 text-center shadow-md">
					<h3 className="mb-4 text-2xl text-[#0d5940]">
						{isAr ? "كيف نساعدك في ممارسة حقوقك؟ " : "How We Help You Exercise Your Rights?"}
					</h3>
					<p className="mx-auto max-w-2xl text-xl leading-relaxed text-[#4a5568] mb-2">
						{isAr
							? "لممارسة أي من حقوقك، يمكنك التواصل معنا مباشرة عبر البريد الإلكتروني: info@mzarapp.com "
							: "To exercise any of your rights, you can contact us directly via email: info@mzarapp.com"}
					</p>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[#4a5568]">
						{isAr
							? "أو من خلال إعدادات حسابك داخل التطبيق، نلتزم بمعالجة جميع الطلبات خلال 7 أيام عمل كحد أقصى. "
							: "You can also exercise your rights through your account settings within the app. We commit to processing all requests within a maximum of 7 business days."}
					</p>
				</div>
			</div>
		</section>
	);
}
