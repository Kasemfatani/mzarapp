
const CURRENCY_SVG = (
	<svg
		viewBox="0 0 1124.14 1256.39"
		width="1em"
		height="1em"
		fill="currentColor"
		style={{ display: "inline", verticalAlign: "top" }}
	>
		<path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
		<path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
	</svg>
);

const SAR_LABEL = (
	<span>
		{CURRENCY_SVG}
		<span className="mx-1 font-thin">(SAR)</span>
	</span>
);


export default function DesktopBookingSidebar({ isAr, data , mockData , isSaudi}) {
	const { t } = mockData;
	const price = data.starting_price_per_person || 0;

	// --- Currency Logic (kept) ---
	const SAR_RATE = 3.75;
	let displayPrice;
	let currencySymbol;

	if (isSaudi) {
		displayPrice = price;
		currencySymbol = isAr ? SAR_LABEL : "SAR";
	} else {
		displayPrice = price / SAR_RATE;
		currencySymbol = isAr ? "دولار" : "USD";
	}
	// --- End Currency Logic ---

	return (
		<div id="sticky-sidebar-test" className="hidden lg:block sticky top-28">
			<div className="h-fit rounded-2xl border border-[#1b4332]/10 bg-white p-6 shadow-[0_10px_40px_rgba(27,67,50,0.12)]">
				<div className="mb-6 flex items-end justify-between">
					<div>
						<p className="text-sm text-[#414844]">{t.startingFrom}</p>
						<p className="text-xl font-bold text-[#1b4332]">
							 {displayPrice.toFixed(2)} {currencySymbol}
						</p>
						<p className="text-sm text-[#414844]">{t.perPerson}</p>
					</div>
					<span className="rounded bg-[#775a19]/10 px-3 py-1 text-xs font-bold uppercase text-[#775a19]">
						{t.allInclusive}
					</span>
				</div>

				<div className="mb-6 space-y-3 text-sm">
					<div className="flex justify-between border-b border-[#1b4332]/10 pb-2">
						<span className="text-[#414844]">{t.basePackage}</span>
						<span className="font-semibold"> {displayPrice.toFixed(2)}</span>
					</div>
					<div className="flex justify-between border-b border-[#1b4332]/10 pb-2">
						<span className="text-[#414844]">{t.luxurySurcharge}</span>
						<span className="font-semibold text-[#1b4332]">{t.included}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-[#414844]">{t.taxesFees}</span>
						<span className="font-semibold">0</span>
					</div>
				</div>
				<a
					href="https://wa.me/+966580121025"
					target="_blank"
					rel="noopener noreferrer"
				>
					<button className="w-full rounded-xl bg-[#1b4332] px-4 py-3 font-bold text-white transition hover:bg-[#123728]">
						{t.bookNow}
					</button>
				</a>

				<p className="mt-4 text-center text-sm text-[#414844]">{t.noCard}</p>
			</div>
		</div>
	);
}
