

export function UserRights({ isAr }) {


	return (
		<section className="bg-[#f5f2ed] py-20 md:py-32">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				
				{/* Important Notice */}
				<div className="rounded-3xl bg-white p-10 text-center shadow-md">
					<h3 className="mb-4 text-2xl text-[#0d5940]">
						{isAr ? "كيف نساعدك في ممارسة حقوقك؟ " : "How Do We Help You Exercise Your Rights? "}
					</h3>
					<p className="mx-auto max-w-2xl text-xl leading-relaxed text-[#4a5568] mb-2">
						{isAr
							? "لممارسة أي من حقوقك، يمكنك التواصل معنا مباشرة عبر البريد الإلكتروني: info@mzarapp.com "
							: "To exercise any of your rights, you may contact us directly via email at info@mzarapp.com "}
					</p>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[#4a5568]">
						{isAr
							? "أو من خلال إعدادات حسابك داخل التطبيق، نلتزم بمعالجة جميع الطلبات خلال 7 أيام عمل كحد أقصى. "
							: "or through your account settings within the app. We are committed to processing all requests within a maximum of 7 business days. "}
					</p>
				</div>
			</div>
		</section>
	);
}
