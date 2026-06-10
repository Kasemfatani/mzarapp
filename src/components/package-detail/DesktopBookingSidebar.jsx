export default function DesktopBookingSidebar({ isAr, data }) {
	const { t, price } = data;

	return (
		<div id="sticky-sidebar-test" className="hidden lg:block sticky top-28">
			<div className="h-fit rounded-2xl border border-[#1b4332]/10 bg-white p-6 shadow-[0_10px_40px_rgba(27,67,50,0.12)]">
				<div className="mb-6 flex items-end justify-between">
					<div>
						<p className="text-sm text-[#414844]">{t.startingFrom}</p>
						<p className="text-4xl font-bold text-[#1b4332]">
							${price.toLocaleString()}
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
						<span className="font-semibold">${price.toLocaleString()}</span>
					</div>
					<div className="flex justify-between border-b border-[#1b4332]/10 pb-2">
						<span className="text-[#414844]">{t.luxurySurcharge}</span>
						<span className="font-semibold text-[#1b4332]">{t.included}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-[#414844]">{t.taxesFees}</span>
						<span className="font-semibold">$0</span>
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

				<p className="mt-4 text-center text-xs text-[#414844]">{t.noCard}</p>
			</div>
		</div>
	);
}
