"use client";

import Image from "next/image";
import {
	Cormorant_Garamond,
	DM_Sans,
	Noto_Naskh_Arabic,
} from "next/font/google";

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

const notoNaskh = Noto_Naskh_Arabic({
	subsets: ["arabic"],
	weight: ["400", "600"],
	display: "swap",
});

const WA_LINK =
	"https://wa.me/966580121025?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20MZAR%20Umrah%20Experiences";

export default function UmrahHero() {
	return (
		<>
			<a
				href="https://wa.me/966580121025?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20MZAR%20Umrah%20Experiences"
				className="fixed-what"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="WhatsApp"
				dir="rtl"
			>
				<i className="fa-brands fa-whatsapp"></i>
			</a>

			<section
				id="top"
				className={`${dmSans.className} relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#142735] px-5 pb-20 pt-32 sm:px-8 md:px-12 lg:px-16`}
			>
				<div className="absolute inset-0">
					<video
						autoPlay
						muted
						loop
						playsInline
						poster="/hero.webp"
						className="h-full w-full object-cover"
					>
						<source src="/umrah/umrah-hero-section.mp4" type="video/mp4" />
					</video>
				</div>

				<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,58,48,0.34)_0%,rgba(34,58,48,0.18)_38%,rgba(34,58,48,0.40)_100%)]" />

				<div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between sm:left-8 sm:right-8 sm:top-7 md:left-12 md:right-12 lg:left-16 lg:right-16">
					<a href="#top" aria-label="Go to top" className="inline-flex">
						<Image
							src="/Home/footer-logo.png"
							alt="MZAR"
							width={140}
							height={46}
							priority
							className="h-9 w-auto sm:h-10"
						/>
					</a>

					<a
						href={WA_LINK}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-full bg-[#3D6753] px-4 py-2 text-xs font-medium tracking-[0.02em] text-white shadow-[0_6px_18px_rgba(61,103,83,0.25)] transition hover:bg-[#345746] sm:px-5 sm:py-2.5"
					>
						<span className="hidden sm:inline">WhatsApp Consultation</span>
						<span className="sm:hidden">WhatsApp</span>
					</a>
				</div>

				<div className="relative z-10 mx-auto w-full max-w-4xl text-center">
					<div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/10 px-4 py-2 backdrop-blur-sm sm:mb-10">
						<svg
							width="11"
							height="11"
							viewBox="0 0 16 16"
							fill="#E7D3B0"
							aria-hidden="true"
						>
							<path d="M8 0L9.8 5.5H16L10.9 8.9L12.7 14.4L8 11L3.3 14.4L5.1 8.9L0 5.5H6.2Z" />
						</svg>
						<span className="text-[10px] font-medium uppercase tracking-[0.13em] text-white">
							Saudi Ministry of Tourism Licensed
						</span>
					</div>

					<h1
						className={`${cormorant.className} mb-3 text-[42px] font-[300] leading-[1.04] text-white drop-shadow-[0_2px_30px_rgba(34,58,48,0.3)] sm:text-[62px] md:text-[78px] lg:text-[92px]`}
					>
						Not Just Umrah...
					</h1>

					<h2
						className={`${cormorant.className} mb-7 text-[34px] font-[400] italic leading-[1.05] text-[#E7D3B0] drop-shadow-[0_2px_30px_rgba(34,58,48,0.3)] sm:mb-9 sm:text-[48px] md:text-[62px] lg:text-[78px]`}
					>
						Experience the Places Where History Happened
						{/* <span className={`${notoNaskh.className} not-italic`}>
							&#65018;
						</span> */}
					</h2>

					<p className="mx-auto mb-9 max-w-2xl text-[15px] font-light leading-[1.7] text-white/90 drop-shadow-[0_1px_14px_rgba(34,58,48,0.4)] sm:mb-11 sm:text-[16px] md:text-[18px]">
						Private guided Umrah experiences, enriching journeys in Makkah and
						Madinah, with multilingual storytelling, curated transport, and
						packages designed for international travelers.
					</p>

					<div className="mb-10 flex flex-col items-stretch justify-center gap-3 sm:mb-11 sm:flex-row sm:items-center sm:gap-4">
						<a
							href="#umrah-packages"
							className="inline-flex items-center justify-center rounded-md bg-[#3D6753] px-7 py-4 text-[15px] font-medium tracking-[0.03em] text-white shadow-[0_12px_30px_rgba(61,103,83,0.35)] transition hover:bg-[#345746]"
						>
							Plan My Umrah Journey
						</a>
						<a
							href={WA_LINK}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center rounded-md border border-white/55 bg-white/15 px-7 py-4 text-[15px] font-normal tracking-[0.03em] text-white backdrop-blur-sm transition hover:bg-white/25"
						>
							Talk to an Umrah Specialist
						</a>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] font-medium text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] sm:text-[13px]">
						<span className="inline-flex items-center gap-1.5">
							<svg
								width="13"
								height="13"
								viewBox="0 0 20 20"
								fill="none"
								aria-hidden="true"
							>
								<circle
									cx="10"
									cy="10"
									r="8"
									stroke="#E7D3B0"
									strokeWidth="1.6"
								/>
								<path
									d="M6 10l2.5 2.5L14 7"
									stroke="#E7D3B0"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							Licensed by the Saudi Ministry of Tourism
						</span>
						<span className="inline-flex items-center gap-1.5">
							<svg
								width="13"
								height="13"
								viewBox="0 0 20 20"
								fill="none"
								aria-hidden="true"
							>
								<path
									d="M10 3l2 4 4 .6-3 2.9.7 4.1-3.7-2-3.7 2 .7-4.1-3-2.9 4-.6 2-4z"
									stroke="#E7D3B0"
									strokeWidth="1.2"
									strokeLinejoin="round"
								/>
							</svg>
							Private &amp; Family-Friendly Experiences
						</span>
						<span className="inline-flex items-center gap-1.5">
							<svg
								width="13"
								height="13"
								viewBox="0 0 20 20"
								fill="none"
								aria-hidden="true"
							>
								<path
									d="M10 2l6 2v5c0 3.3-2.1 6.2-6 8-3.9-1.8-6-4.7-6-8V4l6-2z"
									stroke="#E7D3B0"
									strokeWidth="1.4"
								/>
								<path
									d="M7.2 9.9l1.8 1.9 3.8-3.8"
									stroke="#E7D3B0"
									strokeWidth="1.6"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							Multilingual Audio Guidance
						</span>
						<span className="inline-flex items-center gap-1.5">
							<svg
								width="13"
								height="13"
								viewBox="0 0 20 20"
								fill="none"
								aria-hidden="true"
							>
								<circle
									cx="10"
									cy="10"
									r="8"
									stroke="#E7D3B0"
									strokeWidth="1.6"
								/>
								<path
									d="M6 10l2.5 2.5L14 7"
									stroke="#E7D3B0"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							Trusted by Guests from Around the World
						</span>
					</div>
				</div>
			</section>
			<style jsx global>{`
				@keyframes waPulse {
					0%,
					100% {
						box-shadow:
							0 10px 30px rgba(37, 211, 102, 0.28),
							0 0 0 0 rgba(37, 211, 102, 0.35);
					}

					60% {
						box-shadow:
							0 10px 30px rgba(37, 211, 102, 0.4),
							0 0 0 14px rgba(37, 211, 102, 0);
					}
				}
			`}</style>
		</>
	);
}
