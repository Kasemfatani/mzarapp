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

const traditionalItems = [
	"Visit locations",
	"Transportation only",
	"Limited historical context",
	"Generic group tours",
	"One-language guidance",
	"Fixed itinerary",
];

const mzarItems = [
	"Understand the stories behind every site",
	"Professional enriching tours",
	"Verified content & Deep historical storytelling",
	"Private and comfortable transportation",
	"Multilingual audio guidance",
	"Curated itineraries designed around Islamic history",
];

export default function UmrahWhyChooseSection() {
	return (
		<section
			className={`${dmSans.className} bg-white px-5 py-24 sm:px-8 md:px-12 lg:px-16`}
		>
			<div className="mx-auto max-w-[1100px]">
				<div className="mb-14 text-center">
					<span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#867957]">
						Why Choose MZAR?
					</span>
					<h2
						className={`${cormorant.className} mb-4 text-[34px] leading-[1.14] text-[#2E4A3E] sm:text-[44px] md:text-[52px]`}
					>
						Not Just a Trip.
						<br />
						<span className="italic text-[#3D6753]">
							A Journey Through History.
						</span>
					</h2>
					<p className="mx-auto max-w-[560px] text-[16px] font-light leading-[1.7] text-[#6B665F]">
						We help you discover the stories, events, and meanings behind every
						place you visit.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<ComparisonCard
						title="Traditional Umrah"
						items={traditionalItems}
						variant="traditional"
					/>
					<ComparisonCard
						title="MZAR Experience"
						items={mzarItems}
						variant="mzar"
					/>
				</div>
			</div>
		</section>
	);
}

function ComparisonCard({ title, items, variant }) {
	const isMzar = variant === "mzar";

	return (
		<div
			className={
				isMzar
					? "relative overflow-hidden rounded-2xl border-[1.5px] border-[#3D6753] bg-white px-6 py-8 shadow-[0_20px_50px_rgba(61,103,83,0.10)] sm:px-8"
					: "rounded-2xl border border-[#E6E1D7] bg-[#F3EFE6] px-6 py-8 sm:px-8"
			}
		>
			{isMzar && (
				<div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[radial-gradient(circle_at_center,rgba(61,103,83,0.18)_0%,rgba(61,103,83,0)_70%)]" />
			)}

			<h3
				className={`${cormorant.className} mb-6 text-[30px] leading-[1.1] ${isMzar ? "text-[#2E4A3E]" : "text-[#4C453C]"}`}
			>
				{title}
			</h3>

			<ul className="space-y-3">
				{items.map((item) => (
					<li key={item} className="flex items-start gap-3">
						<span
							className={`mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isMzar ? "border-[#3D6753] bg-[#3D6753] text-white" : "border-[#C9C2B7] bg-white text-[#867957]"}`}
						>
							{isMzar ? (
								<svg
									width="11"
									height="11"
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
							) : (
								<svg
									width="9"
									height="9"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="3"
									strokeLinecap="round"
									aria-hidden="true"
								>
									<path d="M6 6l12 12M18 6L6 18" />
								</svg>
							)}
						</span>
						<span
							className={`text-[15px] leading-[1.55] ${isMzar ? "text-[#2E4A3E]" : "text-[#5F5A53]"}`}
						>
							{item}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
