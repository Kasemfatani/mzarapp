"use client";

export default function MobileBookingBar({ isAr, data }) {
	const { t, price } = data;

	return (
		<div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e8e2d2] bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
				<div>
					<p className="text-[11px] font-semibold uppercase tracking-wider text-[#414844]">
						{t.totalPrice}
					</p>
					<div className="flex items-baseline gap-1">
						<span className="text-2xl font-black text-[#1b4332]">
							${price.toLocaleString()}
						</span>
						<span className="text-xs text-[#414844]">/{t.perPerson}</span>
					</div>
				</div>
				<a
					href="https://wa.me/+966580121025"
					target="_blank"
					rel="noopener noreferrer"
				>
					<button className="rounded-xl bg-[#1b4332] px-5 py-3 text-sm font-bold text-white">
						{t.bookNow}
					</button>
				</a>
			</div>
		</div>
	);
}
