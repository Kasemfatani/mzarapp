import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Clock4, RotateCcw } from "lucide-react";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";

export default function PromoCodeSection({
	lang = "ar",
	value = "",
	onApplied = () => {},
	onCleared = () => {},
	promo_type = "trip",
}) {
	const isAr = lang === "ar";
	const [code, setCode] = useState(value || "");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [ok, setOk] = useState(false);

	useEffect(() => setCode(value || ""), [value]);

	// Pre-fill promo code from localStorage on mount
	useEffect(() => {
		try {
			// partner promo (global)
			const partnerPromo = localStorage.getItem("partnerPromoCode");
			const partnerExpiry = localStorage.getItem("partnerPromoCodeExpiry");
			const now = Date.now();

			if (partnerPromo) {
				if (!partnerExpiry) {
					// expiry missing , remove partner promo
					localStorage.removeItem("partnerPromoCode");
				} else if (partnerExpiry && now > parseInt(partnerExpiry, 10)) {
					localStorage.removeItem("partnerPromoCode");
					localStorage.removeItem("partnerPromoCodeExpiry");
				} else {
					setCode(partnerPromo);
				}
			}

			// if current page is /book-haram (booking page for package id 88),
			// prefer haram-specific promo stored by HaramPromoSaver
			if (typeof window !== "undefined") {
				const pathname = window.location.pathname || "";
				// handle both '/book-haram' and '/book-haram/' variants
				if (pathname.startsWith("/book-haram")) {
					const haramPromo = localStorage.getItem("haramPromoCode");
					const haramExpiry = localStorage.getItem("haramPromoCodeExpiry");
					if (haramPromo) {
						if (!haramExpiry) {
							// expiry missing , remove haram promo
							localStorage.removeItem("haramPromoCode");
						} else if (haramExpiry && now > parseInt(haramExpiry, 10)) {
							// expiry passed, remove haram promo
							localStorage.removeItem("haramPromoCode");
							localStorage.removeItem("haramPromoCodeExpiry");
						} else {
							// override partner promo on the haram booking page
							setCode(haramPromo);
						}
					}
				}
			}
		} catch (e) {
			/* ignore errors */
		}
	}, []);

	const apply = async () => {
		if (!code.trim()) return;
		setLoading(true);
		setMessage("");
		setOk(false);
		try {
			const url = `${API_BASE_URL_NEW}/landing/coupons/check?promo_code=${encodeURIComponent(
				code.trim(),
			)}&promo_type=${encodeURIComponent(promo_type)}`;
			const res = await fetch(url, { method: "GET", headers: { lang } });
			const json = await res.json();
			if (res.ok && json?.status && json?.data) {
				const discount = Number(json.data.discount_value || 0);
				onApplied({ code: code.trim(), discountPercent: discount });
				setOk(true);
				setMessage(
					isAr
						? `تم تطبيق الخصم (${discount}٪)`
						: `Discount applied (${discount}%)`,
				);
			} else {
				setOk(false);
				setMessage(
					json?.message || (isAr ? "رمز الخصم غير صالح" : "Invalid promo code"),
				);
			}
		} catch (e) {
			setOk(false);
			setMessage(isAr ? "فشل التحقق من الرمز" : "Failed to check promo code");
		} finally {
			setLoading(false);
		}
	};

	const clearCode = () => {
		setCode("");
		setOk(false);
		setMessage("");
		onCleared();
	};

	return (
		<div className="rounded-[20px] border border-[#e7d3af] bg-white shadow-md p-4 md:p-5">
			<h4 className="text-[#3c6652] text-lg md:text-xl font-semibold mb-1">
				{isAr ? "هل لديك كود خصم؟" : "Do you have a promo code?"}
			</h4>
			<p className="text-[#6a7282] mb-3">
				{isAr
					? "أدخل الكود للاستفادة من أفضل سعر متاح"
					: "Enter the code to get the best available price"}
			</p>

			<div className={`flex items-center gap-2 `}>
				<Input
					value={code}
					onChange={(e) => setCode(e.target.value)}
					placeholder={isAr ? "أدخل كود الخصم هنا" : "Enter promo code here"}
					className="h-11 flex-1 rounded-xl bg-[#fbfbfb] shadow-md"
				/>
				<Button
					type="button"
					className="h-11 px-6 rounded-xl bg-[#3c6652] hover:bg-[#2d4d3d] text-white"
					onClick={apply}
					disabled={loading || !code.trim()}
				>
					{loading ? (isAr ? "..." : "...") : isAr ? "تطبيق" : "Apply"}
				</Button>

				{/* {code && (
					<Button
						type="button"
						variant="outline"
						onClick={clearCode}
						className="h-11 rounded-xl"
					>
						{isAr ? "إزالة" : "Clear"}
					</Button>
				)} */}
			</div>

			{message && (
				<p className={`mt-2 text-sm ${ok ? "text-green-600" : "text-red-600"}`}>
					{message}
				</p>
			)}

			{/* benefits row */}
			<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-[#364153] text-sm">
				<div className="flex items-center justify-center gap-2 bg-[#f7f6f2] rounded-xl py-2">
					<CheckCircle2 className="w-4 h-4 text-[#3c6652]" />
					<span>{isAr ? "خصم معتمد من مزار" : "Mzar verified discount"}</span>
				</div>
				<div className="flex items-center justify-center gap-2 bg-[#f7f6f2] rounded-xl py-2">
					<Clock4 className="w-4 h-4 text-[#3c6652]" />
					<span>
						{isAr ? "إلغاء مجاني خلال 24 ساعة" : "Free cancel within 24h"}
					</span>
				</div>
				<div className="flex items-center justify-center gap-2 bg-[#f7f6f2] rounded-xl py-2">
					<RotateCcw className="w-4 h-4 text-[#3c6652]" />
					<span>{isAr ? "استرداد آمن" : "Secure refund"}</span>
				</div>
			</div>
		</div>
	);
}
