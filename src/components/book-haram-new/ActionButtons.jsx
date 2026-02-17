import { ArrowLeft, CheckCircle2, X } from "lucide-react";

export function ActionButtons({
	onConfirm,
	onPayCash,
	onCancel,
	loading = false,
	lang,
}) {
	const isAr = lang === "ar";

	return (
		<div className="flex flex-col gap-3 w-full">
			{/* Primary Actions - Pay Now & Pay Cash */}
			<div className="flex flex-col md:flex-row gap-3 w-full">
				{/* Pay Now (online) */}
				<button
					onClick={onConfirm}
					disabled={loading}
					className="w-full bg-[#3c6652] rounded-[30px] shadow-[0px_15px_25px_-15px_rgba(0,0,0,0.2)] px-8 py-4 flex items-center justify-center gap-2 hover:bg-[#2d4d3d] transition-colors"
				>
					<p className="text-white">
						{isAr
							? loading
								? "جارٍ المعالجة..."
								: "ادفع الآن"
							: loading
								? "Processing..."
								: "Pay Now"}
					</p>
				</button>

				{/* Pay Cash */}
				<button
					onClick={onPayCash}
					disabled={loading}
					className="w-full bg-[#3c6652] rounded-[30px] shadow-[0px_15px_25px_-15px_rgba(0,0,0,0.2)] px-8 py-4 flex items-center justify-center gap-2 hover:bg-[#2d4d3d] transition-colors"
				>
					<p className="text-white">{isAr ? "ادفع نقدًا" : "Pay Cash"}</p>
				</button>
			</div>

			{/* Cancel Button */}
			<button
				onClick={onCancel}
				className="w-full rounded-[20px] py-2 flex items-center justify-center gap-3 hover:bg-red-50 transition-colors"
			>
				<X className="w-5 h-5 text-[#B52B2B]" strokeWidth={1.67} />
				<p className="text-[#b52b2b]">
					{isAr ? "إلغاء والعودة" : "Cancel and Go Back"}
				</p>
			</button>

			{/* Info Note */}
			<div className="bg-[#fffcf5] border-[0.8px] border-[#fef3c7] rounded-[16.4px] px-6 py-2 text-center">
				<p className="text-[#4a5565]">
					{isAr
						? "لن يتم خصم أي مبلغ حتى تأكيد الحجز نهائياً"
						: "No amount will be deducted until the booking is fully confirmed"}
				</p>
			</div>

			{/* Privacy Notice */}
			<div className="text-center px-4">
				<p className="text-[#4a5565] text-sm">
					{isAr ? "سياسة الحجز والإلغاء" : "Booking and Cancellation Policy"}
					<span className="text-[#b52b2b]"> * </span>
					{isAr
						? "عند تأكيد الحجز ، أنت توافق على شروط الحجز وسياسة الإلغاء الخاصة بمزار. يمكن إلغاء الحجز قبل موعد الرحلة بساعتين دون رسوم، وبعدها تُطبق رسوم إلغاء بنسبة 25%. لمزيد من المساعدة، تواصل معنا مباشرة عبر الواتساب"
						: "By confirming, you agree to Mzar’s booking and cancellation policy. You can cancel your booking up to 2 hours before the trip with no fees. For assistance, contact our WhatsApp"}{" "}
					<span dir="ltr">+966580121025</span>
				</p>
			</div>
		</div>
	);
}
