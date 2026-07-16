import Image from "next/image";
import { AlertTriangle, CheckCircle2, ShieldCheck, Trash2 } from "lucide-react";

import deleteStepOne from "@/assets/images/home/delete1.jpeg";
import deleteStepTwo from "@/assets/images/home/delete2.jpeg";
import deleteStepThree from "@/assets/images/home/delete3.jpeg";
import { getServerLocale } from "@/lib/localeServer";

export function generateMetadata() {
	const isAr = getServerLocale() === "ar";

	return {
		title: isAr ? "حذف الحساب | مزار" : "Account Deletion | Mzar",
		description: isAr
			? "تعرف على خطوات حذف حسابك وبياناتك من تطبيق مزار."
			: "Learn how to permanently delete your Mzar account and associated data.",
	};
}

export default function AccountDeletionPage() {
	const isAr = getServerLocale() === "ar";
	const steps = [
		{
			image: deleteStepOne,
			title: isAr ? "افتح صفحة حسابي" : "Open My Account",
			description: isAr
				? "سجّل الدخول إلى تطبيق مزار، ثم اضغط على حسابي من شريط التنقل واضغط على أيقونة التعديل."
				: "Sign in to the Mzar app, open My Account from the navigation bar, then tap the edit icon.",
			alt: isAr ? "صفحة حسابي في تطبيق مزار" : "My Account screen in the Mzar app",
		},
		{
			image: deleteStepTwo,
			title: isAr ? "اختر حذف الحساب" : "Choose Delete Account",
			description: isAr
				? "مرّر إلى أسفل صفحة إعدادات الحساب، ثم اضغط على حذف الحساب."
				: "Scroll to the bottom of the account settings page and tap Delete Account.",
			alt: isAr ? "زر حذف الحساب في إعدادات مزار" : "Delete Account option in Mzar settings",
		},
		{
			image: deleteStepThree,
			title: isAr ? "أكّد الحذف النهائي" : "Confirm Permanent Deletion",
			description: isAr
				? "راجع رسالة التأكيد، ثم اضغط على حذف الحساب لإكمال الطلب نهائيًا."
				: "Review the confirmation message, then tap Delete Account to complete the request permanently.",
			alt: isAr ? "رسالة تأكيد حذف حساب مزار" : "Mzar account deletion confirmation",
		},
	];

	return (
		<main className={isAr ? "rtl" : "ltr"}>
			<section className="relative overflow-hidden bg-gradient-to-br from-[#0d5940] via-[#116149] to-[#0d5940] py-24 md:py-36">
				<div className="absolute inset-0">
					<Image
						src="/privacy-policy/privacy-hero.webp"
						alt=""
						className="h-full w-full object-cover"
						fill
						priority
					/>
				</div>
				<div className="container relative mx-auto max-w-5xl px-6 text-center lg:px-8">
					<div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#c9a961] shadow-2xl">
						<Trash2 className="h-12 w-12 text-white" strokeWidth={2.5} />
					</div>
					<h1 className="mb-6 text-5xl text-white md:text-6xl lg:text-7xl">
						{isAr ? "حذف الحساب" : "Account Deletion"}
					</h1>
					<p className="mx-auto max-w-3xl text-2xl leading-relaxed text-white/95 md:text-3xl">
						{isAr
							? "يمكنك حذف حسابك وبياناتك من تطبيق مزار في أي وقت."
							: "You can delete your Mzar account and associated data at any time."}
					</p>
				</div>
			</section>

			<section className="bg-white py-20 md:py-28">
				<div className="container mx-auto max-w-6xl px-6 lg:px-8">
					<div className="mx-auto mb-16 max-w-3xl text-center">
						<h2 className="mb-5 text-4xl text-[#0d5940] md:text-5xl">
							{isAr ? "كيفية حذف حسابك" : "How to Delete Your Account"}
						</h2>
						<p className="text-xl leading-relaxed text-[#4a5568]">
							{isAr
								? "اتبع الخطوات الثلاث التالية داخل تطبيق مزار. يجب تسجيل الدخول إلى الحساب الذي تريد حذفه."
								: "Follow these three steps in the Mzar app. You must be signed in to the account you want to delete."}
						</p>
					</div>

					<div className="grid gap-10 lg:grid-cols-3">
						{steps.map((step, index) => (
							<article
								key={step.title}
								className="overflow-hidden rounded-3xl border-2 border-[#e2e8f0] bg-white shadow-sm transition-all duration-300 hover:border-[#c9a961] hover:shadow-xl"
							>
								<div className="relative aspect-[600/1326] w-full bg-[#f7fafc]">
									<Image
										src={step.image}
										alt={step.alt}
										fill
										className="object-contain"
										sizes="(min-width: 1024px) 30vw, 90vw"
									/>
								</div>
								<div className="p-7">
									<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f4f0] text-xl font-bold text-[#0d5940]">
										{index + 1}
									</div>
									<h3 className="mb-3 text-2xl text-[#0d5940]">{step.title}</h3>
									<p className="text-lg leading-relaxed text-[#4a5568]">{step.description}</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#f7faf8] py-20">
				<div className="container mx-auto max-w-5xl px-6 lg:px-8">
					<div className="grid gap-8 md:grid-cols-2">
						<div className="rounded-3xl bg-[#e8f4f0] p-8">
							<ShieldCheck className="mb-5 h-10 w-10 text-[#0d5940]" />
							<h2 className="mb-3 text-2xl text-[#0d5940]">
								{isAr ? "ما الذي يتم حذفه؟" : "What Will Be Deleted?"}
							</h2>
							<p className="text-lg leading-relaxed text-[#4a5568]">
								{isAr
									? "سيتم حذف حسابك وبيانات ملفك الشخصي والبيانات المرتبطة به. قد نحتفظ بسجلات محدودة عندما يقتضي النظام ذلك، مثل السجلات المالية أو سجلات مكافحة الاحتيال."
									: "Your account, profile information, and associated personal data will be deleted. Limited records may be retained where required by law, such as financial or fraud-prevention records."}
							</p>
						</div>
						<div className="rounded-3xl bg-[#fff7e6] p-8">
							<AlertTriangle className="mb-5 h-10 w-10 text-[#b7791f]" />
							<h2 className="mb-3 text-2xl text-[#744210]">
								{isAr ? "قبل المتابعة" : "Before You Continue"}
							</h2>
							<p className="text-lg leading-relaxed text-[#4a5568]">
								{isAr
									? "حذف الحساب نهائي ولا يمكن التراجع عنه. لن تتمكن من استعادة بياناتك أو الدخول إلى الحساب بعد تأكيد الحذف."
									: "Account deletion is permanent and cannot be undone. You will not be able to recover your data or access the account after confirming deletion."}
							</p>
						</div>
					</div>

					<div className="mt-8 rounded-3xl border-2 border-[#e2e8f0] bg-white p-8 text-center">
						<CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-[#0d5940]" />
						<h2 className="mb-3 text-2xl text-[#0d5940]">
							{isAr ? "هل تحتاج إلى مساعدة؟" : "Need Help?"}
						</h2>
						<p className="text-lg leading-relaxed text-[#4a5568]">
							{isAr ? "إذا تعذّر عليك الوصول إلى حسابك، تواصل معنا عبر " : "If you cannot access your account, contact us at "}
							<a className="font-semibold text-[#0d5940] underline" href="mailto:contact@mzarapp.com">
								contact@mzarapp.com
							</a>
							{isAr
								? " من البريد الإلكتروني المرتبط بالحساب."
								: " using the email address associated with your account."}
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
