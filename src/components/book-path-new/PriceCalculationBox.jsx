"use client";

import { Sparkles, TrendingUp } from "lucide-react";
import { getAddonUnitPrice } from "@/lib/addonPricing";

const CURRENCY_SVG = (
	<svg
		viewBox="0 0 1124.14 1256.39"
		width="1.3em"
		height="1.3em"
		fill="currentColor"
		style={{ display: "inline", verticalAlign: "top" }}
	>
		<path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
		<path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
	</svg>
);

const SAR_RATE = 3.75;

function toDollar(amount) {
	return (amount / SAR_RATE).toFixed(2);
}

const SAR_LABEL = (
	<span className="">
		{CURRENCY_SVG}
		<span className="mx-1 font-thin">(SAR)</span>
	</span>
);

export function PriceCalculationBox({
	vehicle = null,
	addons = [],
	selectedAddons = [],
	people = 1,
	isExpress = false,
	lang = "en",
	tax = 0,
	promoDiscountPercent = 0, // <-- new
	isSaudi = true,
}) {
	const isAr = lang === "ar";

	// --- Currency Logic ---
	let currencySymbol;

	if (isSaudi) {
		currencySymbol = isAr ? SAR_LABEL : "SAR";
	} else {
		currencySymbol = isAr ? "دولار" : "USD";
	}
	// --- End Currency Logic ---

	const rawBase = Number(
		isExpress
			? (vehicle?.express_price ?? vehicle?.web_price ?? 0)
			: (vehicle?.web_price ?? 0),
	);
	const discountAmount = Number(
		((promoDiscountPercent / 100) * rawBase).toFixed(2),
	);
	const baseUnit = Number((rawBase - discountAmount).toFixed(2)); // discounted base

	const vehicleId = vehicle?.id;

	const addonsTotal = selectedAddons.reduce((sum, id) => {
		const a = addons.find((x) => x.id === id);
		if (!a) return sum;

		const unitPrice = getAddonUnitPrice(a, vehicleId);

		// If this add-on is priced by car and vehicle isn't selected yet,
		// unitPrice will be 0 (so it won't affect totals).
		const multiplier = a.allow_multiple ? Number(people || 1) : 1;
		return sum + unitPrice * multiplier;
	}, 0);

	const totalBeforeTax = baseUnit + addonsTotal;
	const taxAmount = Number((Number(tax || 0) * totalBeforeTax).toFixed(2));
	const finalTotal = Number((totalBeforeTax + taxAmount).toFixed(2));

	// --- ONLINE CALCULATION (Discount at start) ---
	// Apply 5% on the Total Before Tax
	const onlineDiscountBaseAmount = Number((totalBeforeTax * 0.05).toFixed(2));
	const onlineTaxableAmount = Number(
		(totalBeforeTax - onlineDiscountBaseAmount).toFixed(2),
	);
	const onlineTaxAmount = Number(
		(Number(tax || 0) * onlineTaxableAmount).toFixed(2),
	);
	const onlineTotal = Number(
		(onlineTaxableAmount + onlineTaxAmount).toFixed(2),
	);

	const rawBaseDisplay = rawBase.toFixed(2);
	const discountDisplay = discountAmount.toFixed(2);
	const baseUnitDisplay = baseUnit.toFixed(2);
	const addonsTotalDisplay = addonsTotal.toFixed(2);
	const totalBeforeTaxDisplay = totalBeforeTax.toFixed(2);
	const taxAmountDisplay = taxAmount.toFixed(2);
	const finalTotalDisplay = finalTotal.toFixed(2);
	const onlineTotalDisplay = onlineTotal.toFixed(2);

	return (
		<div
			className="relative rounded-[20px] border-[1.6px] border-[rgba(231,211,175,0.6)] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] overflow-hidden w-full"
			style={{
				backgroundImage:
					"linear-gradient(146.179deg, rgba(231, 211, 175, 0.4) 0%, rgba(231, 211, 175, 0.25) 50%, rgb(255, 255, 255) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 100%)",
			}}
		>
			<div className="relative p-0 md:p-6 py-4 md:py-6 flex flex-col gap-4">
				{/* Header */}
				<div className="flex items-center justify-between px-6">
					<div className="flex items-center gap-4">
						<div className="flex flex-col items-start">
							<h3 className="text-[#3c6652] text-2xl tracking-[-0.24px]">
								{isAr ? "ملخص الأسعار" : "Price Summary"}
							</h3>
							<p className="text-[#4a5565]">
								{isAr ? "يتم التحديث تلقائياً" : "Automatically updated"}
							</p>
						</div>
						<div className="bg-gradient-to-b from-[#3c6652] to-[#2d4d3d] rounded-full w-14 h-14 flex items-center justify-center">
							<svg
								className="w-7 h-7 text-white"
								fill="none"
								viewBox="0 0 28 28"
							>
								<path
									d="M4.66667 2.33333V25.6667L7 24.5L9.33333 25.6667L11.6667 24.5L14 25.6667L16.3333 24.5L18.6667 25.6667L21 24.5L23.3333 25.6667V2.33333L21 3.5L18.6667 2.33333L16.3333 3.5L14 2.33333L11.6667 3.5L9.33333 2.33333L7 3.5L4.66667 2.33333Z"
									stroke="currentColor"
									strokeWidth="2.33333"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M18.6667 9.33333H11.6667C11.0478 9.33333 10.4543 9.57917 10.0168 10.0168C9.57917 10.4543 9.33333 11.0478 9.33333 11.6667C9.33333 12.2855 9.57917 12.879 10.0168 13.3166C10.4543 13.7542 11.0478 14 11.6667 14H16.3333C16.9522 14 17.5457 14.2458 17.9832 14.6834C18.4208 15.121 18.6667 15.7145 18.6667 16.3333C18.6667 16.9522 18.4208 17.5457 17.9832 17.9832C17.5457 18.4208 16.9522 18.6667 16.3333 18.6667H9.33333"
									stroke="currentColor"
									strokeWidth="2.33333"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M14 20.4167V7.58333"
									stroke="currentColor"
									strokeWidth="2.33333"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>
					<Sparkles
						className="hidden md:block w-6 h-6 text-[#867957]"
						strokeWidth={2}
					/>
				</div>

				<div className="h-px bg-[#E6D2AF]" />

				<div className="px-1 md:px-6 flex flex-col gap-2">
					{/* Trip price (show strike-through if discounted) */}
					<div className="flex items-center justify-between border-b border-[#e6d2af] pb-4 pt-4">
						<p className="text-[#364153]">
							{isAr ? "السعر الرحلة" : "Trip Price"}
						</p>
						<div className="flex items-center gap-2">
							{promoDiscountPercent > 0 && (
								<p className="text-[#9aa3b2] line-through ">
									{isSaudi ? rawBaseDisplay : toDollar(rawBaseDisplay)}{" "}
									{currencySymbol}
								</p>
							)}
							<p className="text-[#1e2939] ">
								{isSaudi ? baseUnitDisplay : toDollar(baseUnitDisplay)}{" "}
								{currencySymbol}
							</p>
						</div>
					</div>

					{/* Discount line (optional) */}
					{promoDiscountPercent > 0 && (
						<div className="flex items-center justify-between border-b border-[#e6d2af] pb-4 pt-4">
							<p className="text-[#364153]">
								{isAr ? "خصم" : "discount"} ({promoDiscountPercent}%)
							</p>
							<p className="text-[#3c6652] ">
								-{isSaudi ? discountDisplay : toDollar(discountDisplay)}{" "}
								{currencySymbol}
							</p>
						</div>
					)}

					{/* Add-ons */}
					<div className="flex items-center justify-between border-b border-[#e6d2af] pb-4 pt-4">
						<p className="text-[#364153]">
							{isAr ? "الخدمات الإضافية" : "Add-ons"}
						</p>
						<div className="flex items-center gap-3">
							<TrendingUp
								className="w-5 h-5 text-[#867957]"
								strokeWidth={1.67}
							/>
							<p className="text-[#867957]">
								{isSaudi ? addonsTotalDisplay : toDollar(addonsTotalDisplay)}
							</p>
						</div>
					</div>

					{/* Total before tax */}
					<div className="flex items-center justify-between border-b border-[#e6d2af] pb-4 pt-4">
						<p className="text-[#364153]">
							{isAr ? "إجمالي السعر" : "Total price"}
						</p>
						<p className="text-[#1e2939] ">
							{isSaudi
								? totalBeforeTaxDisplay
								: toDollar(totalBeforeTaxDisplay)}{" "}
							{currencySymbol}
						</p>
					</div>

					{/* Tax */}
					<div className="flex items-center justify-between border-b border-[#e6d2af] pb-4 pt-4">
						<p className="text-[#364153]">
							{isAr ? "الضريبة" : "Tax"}
							{typeof tax === "number" ? ` (${(tax * 100).toFixed(0)}%)` : ""}
						</p>
						<p className="text-[#1e2939] ">
							{isSaudi ? taxAmountDisplay : toDollar(taxAmountDisplay)}{" "}
							{currencySymbol}
						</p>
					</div>

					{/* Standard Final total (for Cash) */}
					<div className="flex items-center justify-between py-2">
						<div className="flex flex-col items-start">
							<p className="text-[#4a5565]">
								{isAr ? "المجموع" : "Total"}{" "}
								<span className="font-bold">
									{isAr ? "(دفع نقدي)" : "(Pay Cash)"}
								</span>
							</p>
						</div>
						<div className="flex items-center gap-2">
							<p className="text-[#1e2939] font-medium">
								{isSaudi ? finalTotalDisplay : toDollar(finalTotalDisplay)}{" "}
								{currencySymbol}
							</p>
						</div>
					</div>

					{/* Online Total with Discount */}
					<div className="bg-gradient-to-br from-[#3c6652] to-[#1e3a2d] rounded-[18px] px-2 md:px-6 py-4 flex items-center justify-between shadow-lg relative overflow-hidden group">
						{/* Shimmer effect overlay */}
						<div className="absolute inset-0 bg-white/10 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

						<div className="flex flex-col items-start relative z-10">
							<div className="flex items-center gap-2 mb-1">
								<p className="text-white font-bold text-base">
									{isAr ? "ادفع إلكترونياً (وفر 5%)" : "Pay Online (Save 5%)"}
								</p>
							</div>
							<p className="text-[rgba(255,255,255,0.7)] text-xs">
								{isAr ? "أفضل سعر متاح!" : "Best price available!"}
							</p>
						</div>
						<div className="flex flex-col items-end gap-0 relative z-10">
							<p className="text-[#86efac] text-xs line-through opacity-70">
								{isSaudi ? finalTotalDisplay : toDollar(finalTotalDisplay)}
							</p>
							<p className="text-white text-base font-bold">
								{isSaudi ? onlineTotalDisplay : toDollar(onlineTotalDisplay)}{" "}
								<span className="text-sm font-normal">{currencySymbol}</span>
							</p>
						</div>
					</div>

					<div className="bg-[#f0fdf4] border-[0.8px] border-[#b9f8cf] rounded-[16.4px] px-6 py-2 flex items-center gap-2 mt-2">
						<p className="text-[#4a5565]">
							{isAr
								? "السعر نهائي بدون أي رسوم إضافية مخفية"
								: "The final price with no hidden additional fees"}
						</p>
						<p className="text-[#00a63e]">✓</p>
					</div>
				</div>
			</div>
		</div>
	);
}
