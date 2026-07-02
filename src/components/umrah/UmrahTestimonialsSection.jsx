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

const testimonials = [
	{
		quote:
			"After performing Umrah twice before, the MZAR experience was transformative. The storytelling inside Al-Masjid Al-Haram brought tears to my eyes.",
		name: "Amina Rahman",
		from: "London, UK",
		avatar: "AR",
	},
	{
		quote:
			"The audio guidance inside Al-Masjid Al-Nabawi was unlike anything I expected. Our family speaks three languages - MZAR made sure we all experienced it together.",
		name: "Yusuf Ahmed",
		from: "Toronto, Canada",
		avatar: "YA",
	},
	{
		quote:
			"MZAR is not an Umrah agency. They are custodians of the story. Every landmark had context, every moment had meaning.",
		name: "Fatima Benali",
		from: "Paris, France",
		avatar: "FB",
	},
];

function Stars() {
	return (
		<div
			className="text-[17px] tracking-[3px] text-[#867957]"
			aria-label="5 stars"
		>
			★★★★★
		</div>
	);
}

export default function UmrahTestimonialsSection() {
	return (
		<section
			className={`${dmSans.className} bg-white px-5 py-24 sm:px-8 md:px-12 lg:px-16`}
		>
			<div className="mx-auto max-w-[1160px]">
				<div className="mb-14 text-center">
					<span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#867957]">
						Guest Voices
					</span>
					<h2
						className={`${cormorant.className} text-[32px] leading-[1.14] text-[#2E4A3E] sm:text-[42px] md:text-[50px]`}
					>
						Words from the{" "}
						Journey
					</h2>
				</div>

				<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
					{testimonials.map((item) => (
						<article
							key={item.quote}
							className="flex h-full flex-col gap-4 rounded-[16px] border border-[#E6E1D7] bg-[#FAF8F2] p-7"
						>
							<Stars />
							<p
								className={`${cormorant.className} flex-1 text-[22px] italic leading-[1.55] text-[#3D362E]`}
							>
								"{item.quote}"
							</p>
							<div className="border-t border-[#E6E1D7] pt-4">
								<div className="flex items-center gap-3">
									<div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6E1D7] text-[12px] font-semibold text-[#3D6753]">
										{item.avatar}
									</div>
									<div>
										<div className="text-[14px] font-semibold text-[#2E4A3E]">
											{item.name}
										</div>
										<div className="mt-1 text-[12px] text-[#867957]">
											{item.from}
										</div>
									</div>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
