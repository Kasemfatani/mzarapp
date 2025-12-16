import { ArrowLeft, CheckCircle2, X } from "lucide-react";

export function ActionButtons({ onConfirm, onCancel, loading = false }) {
	return (
		<div className="flex flex-col gap-3 w-full">
			{/* Confirm Button */}
			<button
				onClick={onConfirm}
				disabled={loading}
				className="w-full bg-[#3c6652] rounded-[30px] shadow-[0px_15px_25px_-15px_rgba(0,0,0,0.2)] px-8 py-4 flex items-center justify-center gap-2 hover:bg-[#2d4d3d] transition-colors"
			>
				<ArrowLeft className="w-7 h-7 text-white" strokeWidth={2.33} />
				<p className="text-white">
					{loading ? "جارٍ المعالجة..." : "تأكيد الحجز الآن"}
				</p>
				<CheckCircle2 className="w-7 h-7 text-white" strokeWidth={2.33} />
			</button>

			{/* Cancel Button */}
			<button
				onClick={onCancel}
				className="w-full rounded-[20px] py-2 flex items-center justify-center gap-3 hover:bg-red-50 transition-colors"
			>
				<X className="w-5 h-5 text-[#B52B2B]" strokeWidth={1.67} />
				<p className="text-[#b52b2b]">إلغاء والعودة</p>
			</button>

			{/* Info Note */}
			<div className="bg-[#fffcf5] border-[0.8px] border-[#fef3c7] rounded-[16.4px] px-6 py-2 text-center">
				<p className="text-[#4a5565]">
					لن يتم خصم أي مبلغ حتى تأكيد الحجز نهائياً
				</p>
			</div>

			{/* Privacy Notice */}
			<div className="text-center px-4">
				<p className="text-[#4a5565] text-sm">
					سياسة الحجز والإلغاء<span className="text-[#b52b2b]"> * </span>
					لن يتم خصم أي مبلغ حتى تأكيد حجز بطل. الحد الأدنى للإقامة هو 7 أيام.
					05xxxxxxxx - يمكن إلغاء الحجز مع استرجاع كامل المبلغ قبل 24 ساعة من
					موعد الرحلة. بعد هذا الوقت، لن يتم استرداد أي رسوم أو يتم استرداد 50%
					من قيمة الحجز فقط إذا تم إلغاء الحجز قبل 8 ساعات من بدء الرحلة.
				</p>
			</div>
		</div>
	);
}
