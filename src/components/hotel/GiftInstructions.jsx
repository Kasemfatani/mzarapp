"use client";
import { useState } from "react";
import {
	Copy,
	Download,
	UserPlus,
	Map,
	Calendar,
	Percent,
	CheckCircle,
} from "lucide-react";

export default function GiftInstructions({ lang = "ar", code = "-" }) {
	const isAr = lang === "ar";
	const [copied, setCopied] = useState(false);

	const t = {
		title: isAr ? "كيفية استخدام هديتك" : "How to use your gift",
		copyHint: isAr ? "انسخ الكود" : "Copy the code",
		copied: isAr ? "تم نسخ الكود" : "Code copied",
		whatsAppBtn: isAr
			? "  للإستفسار تواصل معنا عبر واتساب"
			: " For inquiries, contact us via WhatsApp",
		downloadBtn: isAr
			? "اذهب للموقع أو حمل التطبيق"
			: "Visit site or download the app",
		steps: isAr
			? [
					"حمل التطبيق أو اذهب للموقع الإلكتروني ( اضغط هنا )",
					"سجل حساب جديد في حال تحميل التطبيق",
					"اختر التجربة المطابقة للهدية",
					"قم بالحجز",
					"أدخل كود الخصم",
					"تأكيد الحجز",
				]
			: [
					"Download the app or visit the website (Click here)",
					"Create a new account if you downloaded the app",
					"Choose the experience matching the gift",
					"Make a booking",
					"Enter the promo code",
					"Confirm the booking",
				],
	};

	// each step can provide: icon (lucide component), img (string) and/or link
	const stepsConfig = [
		{ icon: Download, link: "https://www.mzarapp.com/all-trips" }, // app / site
		{ icon: UserPlus }, // sign up
		{ icon: Map }, // choose experience
		{ icon: Calendar }, // make booking
		{ icon: Percent }, // enter promo code
		{ icon: CheckCircle }, // confirm
	];

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			setCopied(false);
		}
	};

	return (
		<section className="container mx-auto w-full relative z-10 bg-white p-4 md:p-6 rounded-2xl shadow-2xl mb-12 md:mb-16 -mt-6 md:-mt-12">
			<h2 className="text-center text-[#0B4F3B] text-xl md:text-3xl font-semibold mb-4">
				{t.title}
			</h2>

			{/* Promo code box */}
			<div className="max-w-xl mx-auto mb-6">
				<div className="flex items-center gap-3 border border-[#0B4F3B]/15 bg-[#F5F7FA] rounded-full px-4 py-2">
					<button
						type="button"
						onClick={handleCopy}
						className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#0B4F3B]/20 text-[#0B4F3B] hover:bg-[#0B4F3B]/5 transition"
						aria-label={isAr ? "نسخ الكود" : "Copy code"}
					>
						<Copy className="w-4 h-4" />
					</button>
					<div className="flex-1 text-base text-[#5B6474] truncate">
						{t.copyHint}
					</div>
					<div className="px-4 py-1 rounded-full bg-[#0B4F3B] text-white font-semibold text-base">
						{code}
					</div>
				</div>
				{copied && (
					<p className="mt-2 text-center text-xs text-emerald-700 font-medium">
						{t.copied}
					</p>
				)}
			</div>

			{/* Steps row */}
			<div className="flex flex-col gap-6 items-center">
				<div className="relative flex flex-col md:flex-row justify-center gap-4 md:gap-8">
					{/* horizontal Line (behind numbers) */}
					<div className="hidden md:block absolute left-[95px] right-[95px] top-7  h-1 bg-gray-200 rounded-full z-0" />
					{/* vertical Line (behind numbers) */}
					<div
						className={`md:hidden absolute ${isAr ? "right-5" : "left-5"} top-7 bottom-7 w-1  bg-gray-200 rounded-full z-0`}
					/>

					{t.steps.map((label, idx) => {
						const cfg = stepsConfig[idx] || {};
						const Icon = cfg.icon;
						const stepNumber = idx + 1;

						const iconNode = cfg.img ? (
							<img
								src={cfg.img}
								alt={label}
								className="w-6 md:w-10 h-6 md:h-10 object-contain"
							/>
						) : Icon ? (
							<Icon className="w-6 md:w-10 h-6 md:h-10 text-[#0B4F3B]" />
						) : null;

						const content = (
							<>
								<div className="">
									<div className="w-10 md:w-12 h-10 md:h-12 rounded-md border border-[#857856] flex items-center justify-center text-base md:text-xl font-semibold text-[#857856] bg-white">
										{stepNumber}
									</div>
								</div>
								<div className="w-12 md:w-16 h-12 md:h-16 rounded-xl border border-[#0B4F3B]/15 flex items-center justify-center bg-white mb-2">
									{iconNode}
								</div>
								<p className="text-sm md:text-base text-[#5B6474] leading-relaxed md:w-32 text-start md:text-center">
									{label}
								</p>
							</>
						);

						return (
							<div
								key={idx}
								className="flex flex-row md:flex-col items-center gap-4 text-center relative z-10"
							>
								{cfg.link ? (
									<a
										href={cfg.link}
										target="_blank"
										rel="noopener noreferrer"
										className="flex flex-row md:flex-col items-center gap-4 text-center relative z-10"
									>
										{content}
									</a>
								) : (
									content
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Actions */}
			<div className="mt-8 space-y-3 max-w-xl mx-auto">
				<a
					href="https://wa.me/+966580121025"
					target="_blank"
					rel="noopener noreferrer"
					className="block w-full text-center bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold py-3 rounded-full text-sm md:text-base transition"
				>
					<i className="fa-brands fa-whatsapp text-2xl"></i> {"  "}
					{t.whatsAppBtn}
				</a>

				<a
					href="https://onelink.to/yb2xky"
					target="_blank"
					rel="noopener noreferrer"
					className="w-full flex items-center justify-center gap-2 border border-[#0B4F3B]/25 text-[#0B4F3B] font-semibold py-3 rounded-full text-sm md:text-base hover:bg-[#F5F7FA] transition"
				>
					<Download className="w-6 h-6" />
					<span>{t.downloadBtn}</span>
				</a>
			</div>
		</section>
	);
}
