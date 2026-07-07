"use client";

import Image from "next/image";
import { useState } from "react";
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

const PROMO_CODE = "SAIRAHAYATI";
const WA_LINK = `https://wa.me/966580121025?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20MZAR%20Umrah%20Experiences.%20Promo%20code%3A%20${PROMO_CODE}`;

export default function UmrahSairaEndorsement() {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(PROMO_CODE);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section
			className={`${dmSans.className} bg-[#FAF8F2] px-5 py-20 sm:px-8 md:px-12 lg:px-16 border-t border-[#E6E1D7]`}
		>
			<div className="mx-auto max-w-[1100px]">
				<div className="grid gap-10 items-center md:grid-cols-12">
					{/* Image Column */}
					<div className="md:col-span-5 flex justify-center">
						<div className="relative group max-w-[350px] md:max-w-full w-full">
							{/* Outer Decorative frame matching premium look */}
							<div className="absolute -inset-3 rounded-[24px] border-2 border-dashed border-[#E7D3B0] opacity-60 group-hover:scale-[1.02] transition-transform duration-300 pointer-events-none" />
							
							<div className="relative overflow-hidden rounded-[20px] bg-[#142735] shadow-[0_20px_50px_rgba(61,103,83,0.15)] aspect-[4/5] w-full">
								<Image
									src="/umrah/saira-hayati-img.webp"
									alt="Saira Hayati"
									fill
									sizes="(max-w-768px) 350px, 400px"
									className="object-cover transition-transform duration-500 group-hover:scale-105"
									priority
								/>
							</div>
						</div>
					</div>

					{/* Content Column */}
					<div className="md:col-span-7 flex flex-col justify-center text-left">
						<span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#867957]">
							Exclusive Partnership
						</span>
						
						<h2
							className={`${cormorant.className} mb-5 text-[34px] leading-[1.12] text-[#2E4A3E] sm:text-[44px]`}
						>
							Journey to the Holy Sites <br />
							with Saira Hayati
						</h2>

						<p className="mb-6 text-[15px] font-light leading-[1.75] text-[#6B665F] sm:text-[16px]">
							"My journey with MZAR was deeply inspiring. The detailed historical storytelling and the private, comfortable guidance truly brought the history of Islam to life in a way I've never experienced before. I highly recommend their curated experiences for your Umrah."
						</p>

						{/* Promo Code Card */}
						<div className="mb-8 rounded-[16px] border border-[#E6E1D7] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] max-w-md w-full">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#867957] block mb-1">
										Use Promo Code
									</span>
									<div className="font-mono text-xl font-bold tracking-wider text-[#2E4A3E]">
										{PROMO_CODE}
									</div>
								</div>
								
								<button
									type="button"
									onClick={handleCopy}
									className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
										copied
											? "bg-[#3D6753] border-[#3D6753] text-white"
											: "bg-[#FAF8F2] border-[#E6E1D7] text-[#2E4A3E] hover:bg-[#E7D3B0]/20"
									}`}
								>
									{copied ? (
										<>
											<svg
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="3"
												className="text-white"
											>
												<path d="M20 6L9 17l-5-5" />
											</svg>
											Copied!
										</>
									) : (
										<>
											<svg
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
											>
												<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
												<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
											</svg>
											Copy Code
										</>
									)}
								</button>
							</div>
							
							<div className="mt-3 text-[11px] leading-[1.4] text-[#867957]">
								Mention this code when speaking with our Umrah advisor on WhatsApp to unlock special benefits and priority booking.
							</div>
						</div>

						{/* CTA Button */}
						<div>
							<a
								href={WA_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2.5 rounded-md bg-[#3D6753] px-7 py-4 text-[15px] font-medium tracking-[0.03em] text-white shadow-[0_12px_30px_rgba(61,103,83,0.25)] transition hover:bg-[#345746]"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="currentColor"
									aria-hidden="true"
								>
									<path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.5.003 9.974-4.47 9.977-9.974.001-2.665-1.033-5.17-2.914-7.053C16.552 1.7 14.053.666 11.39.665c-5.502 0-9.976 4.47-9.979 9.974-.001 1.904.478 3.762 1.393 5.378L1.87 21.082l5.127-1.344c.001 0-.001 0 0 0z" />
								</svg>
								Claim My Special Experience
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
