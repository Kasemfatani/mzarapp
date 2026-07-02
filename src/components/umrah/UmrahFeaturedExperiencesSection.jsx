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

const experiences = [
	{
		location: "MAKKAH",
		title: "Wadi Dhi Tuwa Experience",
		description:
			"A spiritual and historical journey that takes you through some of the most significant Prophetic and historical sites in Makkah Al-Mukarramah.",
		image: "/tour-bus/Bir_Tuwa.webp",
	},
	{
		location: "Madinah",
		title: "First Migration Paths Experience",
		description:
			"A historical tour to the first home of Hijrah, where the Messenger of Allah ﷺ arrived in Al-Madinah Al-Munawwarah",
		image: "/umrah/first-migration.png",
	},
	{
		location: "JEDDAH",
		title: "Historic Al-Balad",
		description:
			"Wander through the UNESCO-listed heart of old Jeddah, where centuries of trade, culture, and architecture come to life.",
		image: "/umrah/historic-al-balad.webp",
	},
	{
		location: "TAIF",
		title: "Mountains of Taif",
		description:
			"Escape to the cool mountains of Taif, famous for its breathtaking landscapes, rose farms, and rich Islamic heritage.",
		image: "/umrah/taif.webp",
	},
];

export default function UmrahFeaturedExperiencesSection() {
	return (
		<section
			className={`${dmSans.className} bg-[#FAF8F2] px-5 py-24 sm:px-8 md:px-12 lg:px-16`}
		>
			<div className="mx-auto max-w-[1160px]">
				<div className="mb-14 text-center">
					<span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#867957]">
						BEYOND THE HOLY MOSQUES
					</span>
					<h2
						className={`${cormorant.className} text-[32px] leading-[1.14] text-[#2E4A3E] sm:text-[42px] md:text-[50px]`}
					>
						Continue Your Journey of Discovery
					</h2>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
					{experiences.map((experience) => (
						<article
							key={experience.title}
							className="overflow-hidden rounded-[16px] border border-[#E6E1D7] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
						>
							<div className="h-[210px] overflow-hidden">
								<img
									src={experience.image}
									alt={experience.title}
									loading="lazy"
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="p-6">
								<div className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em] text-[#867957]">
									{experience.location}
								</div>
								<h3
									className={`${cormorant.className} mb-3 text-[30px] leading-[1.05] text-[#2E4A3E]`}
								>
									{experience.title}
								</h3>
								<p className="text-[13px] font-light leading-[1.65] text-[#6B665F]">
									{experience.description}
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
