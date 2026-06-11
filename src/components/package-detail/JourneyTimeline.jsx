"use client";

export default function JourneyTimeline({ isAr, data , mockData }) {
	const { t } = mockData;
	const timeline = data.timeline || [];
	return (
		<section className="rounded-2xl bg-[#f5f3f3] p-6 md:p-10">
			<h2 className="mb-12 text-2xl font-semibold text-[#1b4332]">
				{t.timelineTitle}
			</h2>

			<div className="relative space-y-0">
				{/* Vertical line */}
				<div
					className="absolute top-4 bottom-4 w-[2px] bg-[#775a19]/30"
					style={{ insetInlineStart: "11px" }}
				/>

				{timeline.map((item, idx) => {
					const isLast = idx === timeline.length - 1;

					return (
						<div
							key={item.id}
							className={`relative ps-12 ${isLast ? "" : "pb-12"}`}
						>
							{/* White outer circle + brown inner circle */}
							<div
								className="absolute top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-white "
								style={{ insetInlineStart: "0px" }}
							>
								<div className="h-3 w-3 rounded-full bg-[#775a19]" />
							</div>

							{/* <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#775a19]">
								{t.day} {item.id}
							</p> */}

							<h3 className="mb-2 text-lg font-semibold text-[#1b4332]">
								{item.name}
							</h3>

							<p className="text-sm leading-6 text-[#414844]">
								{item.description}
							</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}
