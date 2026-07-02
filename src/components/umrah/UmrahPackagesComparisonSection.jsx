import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	style: ["normal", "italic"],
	display: "swap",
});

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	display: "swap",
});

const packages = [
	{ id: "seerah", name: "Seerah Umrah", fullName: "Seerah Umrah" },
	{
		id: "seerahPlus",
		name: "Seerah Umrah Plus",
		fullName: "Seerah Umrah Plus",
	},
	{ id: "mashaer", name: "Mashaer Umrah", fullName: "Mashaer Umrah" },
	{
		id: "mashaerPlus",
		name: "Mashaer Umrah Plus",
		fullName: "Mashaer Umrah Plus",
	},
];

const featureRows = [
	{
		feature: "Duration",
		values: {
			seerah: "5 days",
			seerahPlus: "5 days",
			mashaer: "8 days",
			mashaerPlus: "8 days",
		},
	},
	{
		feature: "Accommodation",
		values: {
			seerah: false,
			seerahPlus: true,
			mashaer: false,
			mashaerPlus: true,
		},
	},
	{
		feature: "Sacred Sites",
		values: {
			seerah: true,
			seerahPlus: true,
			mashaer: true,
			mashaerPlus: true,
		},
	},
	{
		feature: "Al-Masjid Al-haram tour",
		values: {
			seerah: true,
			seerahPlus: true,
			mashaer: true,
			mashaerPlus: true,
		},
	},
	{
		feature: "Tuwa Tour",
		values: {
			seerah: true,
			seerahPlus: true,
			mashaer: true,
			mashaerPlus: true,
		},
	},
	{
		feature: "Historical Jeddah tour",
		values: {
			seerah: false,
			seerahPlus: false,
			mashaer: true,
			mashaerPlus: true,
		},
	},
	{
		feature: "Taif & Al Hada tour",
		values: {
			seerah: false,
			seerahPlus: false,
			mashaer: true,
			mashaerPlus: true,
		},
	},
	{
		feature: "Madinah tour",
		values: {
			seerah: true,
			seerahPlus: true,
			mashaer: true,
			mashaerPlus: true,
		},
	},
	{
		feature: "Al-Masjid Al-Nabawi tour",
		values: {
			seerah: true,
			seerahPlus: true,
			mashaer: true,
			mashaerPlus: true,
		},
	},
	{
		feature: "Private transportation",
		values: {
			seerah: true,
			seerahPlus: true,
			mashaer: true,
			mashaerPlus: true,
		},
	},
	{
		feature: "Multilingual Audio Guide",
		values: {
			seerah: true,
			seerahPlus: true,
			mashaer: true,
			mashaerPlus: true,
		},
	},
];

function AvailabilityCell({ value }) {
	if (typeof value === "string") {
		return (
			<span className="text-[13px] font-medium text-[#4C453C]">{value}</span>
		);
	}

	if (value) {
		return (
			<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF3EE] text-[#3D6753]">
				<svg
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="M20 6L9 17l-5-5" />
				</svg>
			</span>
		);
	}

	return <span className="text-[16px] font-medium text-[#C9C2B7]">-</span>;
}

export default function UmrahPackagesComparisonSection() {
	return (
		<section
			className={`${dmSans.className} bg-white px-5 py-24 sm:px-8 md:px-12 lg:px-16`}
		>
			<div className="mx-auto max-w-[1160px]">
				<div className="mb-12 text-center">
					<span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#867957]">
						SIDE BY SIDE
					</span>
					<h2
						className={`${cormorant.className} text-[32px] leading-[1.14] text-[#2E4A3E] sm:text-[42px] md:text-[50px]`}
					>
						Compare Packages
					</h2>
				</div>

				<div className="hidden md:block">
					<div className="overflow-x-auto rounded-[16px] border border-[#E6E1D7] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
						<table className="w-full min-w-[760px] table-fixed border-collapse text-left text-[13px]">
							<colgroup>
								<col className="w-[30%]" />
								<col className="w-[17.5%]" />
								<col className="w-[17.5%]" />
								<col className="w-[17.5%]" />
								<col className="w-[17.5%]" />
							</colgroup>
							<thead>
								<tr className="bg-[#FAF8F2]">
									<th className="border-b border-[#E6E1D7] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#867957]">
										Features
									</th>
									{packages.map((pkg) => (
										<th
											key={pkg.id}
											className={`border-b px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.08em] ${
												pkg.id === "mashaer"
													? "border-[#3D6753] bg-[#3D6753] text-white"
													: "border-[#E6E1D7] text-[#2E4A3E]"
											}`}
										>
											{pkg.name}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{featureRows.map((row) => (
									<tr
										key={row.feature}
										className="odd:bg-white even:bg-[#FCFBF8]"
									>
										<td className="border-b border-[#EDE9E0] px-4 py-4 text-[13px] font-medium leading-[1.35] text-[#4C453C]">
											{row.feature}
										</td>
										{packages.map((pkg) => (
											<td
												key={`${row.feature}-${pkg.id}`}
												className={`border-b px-5 py-4 ${
													pkg.id === "mashaer"
														? "border-[#D6E8DE] bg-[#F1F7F4]"
														: "border-[#EDE9E0]"
												}`}
											>
												<div className="flex items-center justify-center">
													<AvailabilityCell value={row.values[pkg.id]} />
												</div>
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="space-y-4 md:hidden">
					{packages.map((pkg) => (
						<article
							key={pkg.id}
							className={`rounded-[14px] border p-4 shadow-[0_8px_22px_rgba(0,0,0,0.04)] ${
								pkg.id === "mashaer"
									? "border-[#3D6753] bg-[#F1F7F4]"
									: "border-[#E6E1D7] bg-white"
							}`}
						>
							<h3
								className={`mb-3 text-[14px] font-semibold uppercase tracking-[0.08em] ${
									pkg.id === "mashaer" ? "text-[#2E4A3E]" : "text-[#2E4A3E]"
								}`}
							>
								{pkg.fullName}
							</h3>
							<ul className="space-y-2.5">
								{featureRows.map((row) => (
									<li
										key={`${pkg.id}-${row.feature}`}
										className={`flex items-center justify-between gap-4  px-3 py-2 ${
											pkg.id === "mashaer" ? "" : "rounded-[10px] bg-[#FAF8F2] "
										}`}
									>
										<span className="text-[12px] text-[#5E574F]">
											{row.feature}
										</span>
										<AvailabilityCell value={row.values[pkg.id]} />
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
