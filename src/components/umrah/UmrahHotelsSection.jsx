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

const stayHighlights = [
	"Premium Hospitality",
	"Excellent Locations",
	"Family-Friendly Options",
	"Peaceful & Comfortable Stays",
];

export default function UmrahHotelsSection() {
	return (
		<section
			className={`${dmSans.className} bg-[#FAF8F2] px-5 py-24 sm:px-8 md:px-12 lg:px-16`}
		>
			<div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
				<div>
					<span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#867957]">
						WHERE YOU'LL STAY
					</span>
					<h2
						className={`${cormorant.className} mb-4 text-[32px] leading-[1.14] text-[#2E4A3E] sm:text-[42px] md:text-[48px]`}
					>
						Stay in Comfort.{" "}
						Explore with Peace of Mind.
					</h2>
					<p className="mb-7 max-w-[560px] text-[15px] font-light leading-[1.75] text-[#6B665F] sm:text-[16px]">
						Enjoy a comfortable stay in carefully selected hotels that
						complement your journey, allowing you to focus on worship,
						exploration, and meaningful experiences throughout your Umrah.
					</p>

					<ul className="grid gap-3 sm:grid-cols-2">
						{stayHighlights.map((item) => (
							<li
								key={item}
								className="flex items-center gap-2.5 rounded-[10px] bg-white px-4 py-3 text-[14px] text-[#2E4A3E] shadow-[0_6px_18px_rgba(0,0,0,0.04)]"
							>
								<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF3EE] text-[#3D6753]">
									<svg
										width="10"
										height="10"
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
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="aspect-[3/4] overflow-hidden rounded-[14px] border border-[#E6E1D7] bg-white">
						<img
							src="/umrah/novotel.jpg"
							alt="Hotel stay in Makkah"
							loading="lazy"
							className="h-full w-full object-cover"
						/>
					</div>
					<div className="mt-6 aspect-[3/4] overflow-hidden rounded-[14px] border border-[#E6E1D7] bg-white">
						<img
							src="/umrah/voco.png"
							alt="Hotel stay in Madinah"
							loading="lazy"
							className="h-full w-full object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
