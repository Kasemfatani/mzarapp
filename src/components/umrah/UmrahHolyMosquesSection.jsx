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

const haramIncludes = [
	"Historical storytelling",
	"Multilingual Tour Guidance",
	"Interactive explanations",
	"Private experience options",
];

const nabawiIncludes = [
	"Stories from the Seerah",
	"Prophet's praying areas",
	"Historical landmarks",
	"Multilingual Tour Guidance",
];

export default function UmrahHolyMosquesSection() {
	return (
		<section
			className={`${dmSans.className} relative overflow-hidden bg-[#F3EFE6] px-5 py-24 sm:px-8 md:px-12 lg:px-16`}
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(61,103,83,0.10)_0%,transparent_45%),radial-gradient(circle_at_85%_80%,rgba(61,103,83,0.08)_0%,transparent_40%)]" />
			<div className="relative mx-auto max-w-[1160px]">
				<div className="mb-14 text-center">
					<span className="mb-3 inline-flex items-center rounded-full border border-[#E6E1D7] bg-white px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#3D6753]">
						Exclusive
					</span>
					<h2
						className={`${cormorant.className} mb-4 text-[32px] leading-[1.14] text-[#2E4A3E] sm:text-[42px] md:text-[52px]`}
					>
						Exclusive Experiences Inside the Two Holy Mosques
					</h2>
					<p className="mx-auto max-w-[760px] text-[15px] font-light leading-[1.75] text-[#6B665F] sm:text-[16px]">
						The soul of MZAR lies in our flagship guided experiences within
						Al-Masjid Al-Haram and Al-Masjid Al-Nabawi - where spirituality,
						history, and discovery come together to create truly unforgettable
						moments.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<MosqueCard
						title="Al-Masjid Al-Haram Experience"
						imageSrc="/haram/big-img.webp"
						description="Discover the stories behind the Kaaba, Zamzam, Safa and Marwa, and the most important landmarks within the Grand Mosque through a guided enriching experience."
						includes={haramIncludes}
					/>

					<MosqueCard
						title="Al-Masjid Al-Nabawi Experience"
						imageSrc="/madinah/big-img.webp"
						description="Walk through the Prophet's Mosque while exploring the events, locations, and stories that shaped the history of Madinah."
						includes={nabawiIncludes}
					/>
				</div>
			</div>
		</section>
	);
}

function MosqueCard({ title, imageSrc, description, includes }) {
	return (
		<article className="overflow-hidden rounded-[18px] border border-[#E6E1D7] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
			<div className="h-[240px] overflow-hidden sm:h-[260px]">
				<img
					src={imageSrc}
					alt={title}
					loading="lazy"
					className="h-full w-full object-cover"
				/>
			</div>
			<div className="px-6 py-7 sm:px-8">
				<h3
					className={`${cormorant.className} mb-5 text-[30px] leading-[1.1] text-[#2E4A3E]`}
				>
					{title}
				</h3>

				<div className="mb-5">
					<p className="text-[14px] leading-[1.65] text-[#5F5A53]">
						{description}
					</p>
				</div>

				<div>
					<h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#867957]">
						Includes
					</h4>
					<ul className="space-y-2">
						{includes.map((item) => (
							<li
								key={item}
								className="flex items-start gap-2.5 text-[14px] text-[#2E4A3E]"
							>
								<span className="mt-[2px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EAF3EE] text-[#3D6753]">
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
			</div>
		</article>
	);
}
