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

export default function UmrahWatchJourneySection() {
	return (
		<section
			className={`${dmSans.className} bg-white px-5 py-24 sm:px-8 md:px-12 lg:px-16`}
		>
			<div className="mx-auto max-w-[980px]">
				<div className="mb-11 text-center">
					<span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#867957]">
						WATCH THE JOURNEY
					</span>
					<h2
						className={`${cormorant.className} mb-4 text-[32px] leading-[1.14] text-[#2E4A3E] sm:text-[42px] md:text-[50px]`}
					>
						More Than a Journey.{" "}
						<span className="italic text-[#3D6753]">
							A Story You Will Live.
						</span>
					</h2>
					<p className="mx-auto max-w-[760px] text-[15px] font-light leading-[1.75] text-[#6B665F] sm:text-[16px]">
						From the sacred landmarks of Makkah and Madinah to the places that
						witnessed the events of Islamic history, experience Umrah through a
						deeper lens of discovery, reflection, and connection.
					</p>
				</div>

				<div className="overflow-hidden rounded-[20px] border border-[#E6E1D7] bg-[#142735] shadow-[0_20px_50px_rgba(61,103,83,0.10)]">
					<div className="relative w-full pb-[56.25%]">
						<iframe
							title="MZAR Journey Video"
							src="https://www.youtube.com/embed/frw4Z53HxGc"
							className="absolute left-0 top-0 h-full w-full"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
