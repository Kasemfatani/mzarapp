"use client";

import { Sparkles, TrendingUp } from "lucide-react";

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

export function PriceCalculationBox({
	startPrice = 99,
	minPeople = 1,
	people = 1,
	lang = "en",
	// new props
	tax = 0,
	promoDiscountPercent = 0,
	isSaudi = true,
}) {
	const isAr = lang === "ar";
	
	// --- Currency Logic ---
	let currencySymbol;

	if (isSaudi) {
		currencySymbol = isAr ? CURRENCY_SVG : "SAR";
	} else {
		currencySymbol = isAr ? "دولار" : "USD";
	}
	// --- End Currency Logic ---


	// base total
	const base = Number(startPrice) * Number(people);

	// apply promo discount on base
	const discountAmount = Number(
		((Number(promoDiscountPercent || 0) / 100) * base).toFixed(2)
	);
	const totalBeforeTax = Number((base - discountAmount).toFixed(2));

	// add tax after discount
	const taxAmount = Number((Number(tax || 0) * totalBeforeTax).toFixed(2));
	const finalTotal = Number((totalBeforeTax + taxAmount).toFixed(2));

	// displays
	const baseDisplay = base.toFixed(2);
	const discountDisplay = discountAmount.toFixed(2);
	const totalBeforeTaxDisplay = totalBeforeTax.toFixed(2);
	const taxAmountDisplay = taxAmount.toFixed(2);
	const finalTotalDisplay = finalTotal.toFixed(2);

	return (
		<div
			className="relative rounded-[20px] border-[1.6px] border-[rgba(231,211,175,0.6)] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] overflow-hidden w-full"
			style={{
				backgroundImage:
					"linear-gradient(146.179deg, rgba(231, 211, 175, 0.4) 0%, rgba(231, 211, 175, 0.25) 50%, rgb(255, 255, 255) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 100%)",
			}}
		>
			<div className="relative p-6 flex flex-col gap-4">
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

				{/* Price Items */}
				<div className="px-6 flex flex-col gap-2">
					{/* Price per person */}
					<div className="flex items-center justify-between border-b border-[#e6d2af] pb-4 pt-4">
						<p className="text-[#364153]">
							{isAr ? "سعر الفرد" : "Price per person"}
						</p>
						<div className="flex items-center gap-2">
							<p className="text-[#1e2939]">
								{ isSaudi ? startPrice : toDollar(startPrice)} {currencySymbol}
							</p>
						</div>
					</div>

					{/* Minimum booking */}
					<div className="flex items-center justify-between border-b border-[#e6d2af] pb-4 pt-4">
						<p className="text-[#364153]">
							{isAr ? "الحد الأدنى للحجز" : "Minimum booking"}
						</p>
						<div className="flex items-center gap-3">
							<TrendingUp
								className="w-5 h-5 text-[#867957]"
								strokeWidth={1.67}
							/>
							<p className="text-[#867957]">× {minPeople}</p>
						</div>
					</div>

					{/* Promo discount (optional) */}
					{promoDiscountPercent > 0 && (
						<div className="flex items-center justify-between border-b border-[#e6d2af] pb-4 pt-4">
							<p className="text-[#364153]">
								{isAr ? "خصم " : "Promo"} (
								{promoDiscountPercent}%)
							</p>
							<p className="text-[#3c6652] ">
								-{ isSaudi ? discountDisplay : toDollar(discountDisplay)} {currencySymbol}
							</p>
						</div>
					)}

					{/* Total price (after discount, before tax) */}
					<div className="flex items-center justify-between border-b border-[#e6d2af] pb-4 pt-4">
						<p className="text-[#364153]">
							{isAr ? "إجمالي السعر" : "Total price"}
						</p>
						<div className="flex items-center gap-2">
							<p className="text-[#1e2939] ">
								{ isSaudi ? totalBeforeTaxDisplay : toDollar(totalBeforeTaxDisplay)} {currencySymbol}
							</p>
						</div>
					</div>

					{/* Tax */}
					<div className="flex items-center justify-between border-b border-[#e6d2af] pb-4 pt-4">
						<p className="text-[#364153]">
							{isAr ? "الضريبة" : "Tax"}
							{typeof tax === "number"
								? ` (${(Number(tax) * 100).toFixed(0)}%)`
								: ""}
						</p>
						<p className="text-[#1e2939] ">
							{ isSaudi ? taxAmountDisplay : toDollar(taxAmountDisplay)} {currencySymbol}
						</p>
					</div>

					{/* Final total */}
					<div className="bg-gradient-to-b from-[#3c6652] to-[#2d4d3d] rounded-[18px] px-6 py-4 flex items-center justify-between">
						<div className="flex flex-col items-start">
							<p className="text-[rgba(255,255,255,0.8)]">
								{isAr ? "المجموع النهائي" : "Final total"}
							</p>
							<p className="text-[rgba(255,255,255,0.6)] text-sm">
								{isAr
									? "شامل جميع الرسوم والضرائب"
									: "Including all fees and taxes"}
							</p>
						</div>
						<div className="flex items-center gap-2">
							<p className="text-white ">
								{ isSaudi ? finalTotalDisplay : toDollar(finalTotalDisplay)} {currencySymbol}
							</p>
						</div>
					</div>

					{/* Final note */}
					<div className="bg-[#f0fdf4] border-[0.8px] border-[#b9f8cf] rounded-[16.4px] px-6 py-2 flex items-center gap-2">
						<p className="text-[#4a5565]">
							{isAr
								? "السعر نهائي بدون أي رسوم إضافية مخفية"
								: "The final price  with no hidden additional fees"}
						</p>
						<p className="text-[#00a63e]">✓</p>
					</div>
				</div>
			</div>
		</div>
	);
}
