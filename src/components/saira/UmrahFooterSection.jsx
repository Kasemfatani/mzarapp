import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const xLink = "https://x.com/mzarapp";
const whatsappLink =
	"https://wa.me/966580121025?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20MZAR%20Umrah%20Experiences.%20Promo%20code%3A%20SAIRAHAYATI";

const TikTokIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
	</svg>
);

function SocialLink({ href, label, children }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={label}
			className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:-translate-y-0.5 hover:bg-[#E7D3B0] hover:text-[#2E4A3E]"
		>
			{children}
		</a>
	);
}

export default function UmrahFooterSection() {
	return (
		<footer className="bg-[#20362E] px-5 pb-10 pt-0 text-white sm:px-8 md:px-12 lg:px-16">
			<div className="mx-auto max-w-7xl rounded-[28px]  bg-[#20362E] px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.16)] sm:px-8 md:px-10">
				<div className="flex flex-col gap-8 lg:flex-row items-center justify-center lg:justify-between">
					<div className="max-w-xl">
						<Link href="#" className="inline-flex items-center">
							<img
								src="/Home/footer-logo.png"
								alt="Mzar"
								width={150}
								height={50}
								className="h-auto w-[130px] sm:w-[150px]"
							/>
						</Link>
						
					</div>

					<div>
						<p className="mb-4 text-xs text-center font-semibold uppercase tracking-[0.18em] text-[#E7D3B0]">
							Follow Us
						</p>
						<div className="flex flex-wrap gap-3">
							<SocialLink
								href="https://www.youtube.com/@mzarapp"
								label="YouTube"
							>
								<Youtube size={18} />
							</SocialLink>
							<SocialLink
								href="https://www.instagram.com/mzarapp/"
								label="Instagram"
							>
								<Instagram size={18} />
							</SocialLink>
							<SocialLink
								href="https://www.facebook.com/mzarapp"
								label="Facebook"
							>
								<Facebook size={18} />
							</SocialLink>
							<SocialLink
								href="https://www.linkedin.com/company/mzarapp"
								label="LinkedIn"
							>
								<Linkedin size={18} />
							</SocialLink>
							<SocialLink href={xLink} label="X">
								<span className="text-[15px] font-semibold leading-none">
									X
								</span>
							</SocialLink>
							<SocialLink href="https://www.tiktok.com/@mzarapp" label="TikTok">
								<TikTokIcon />
							</SocialLink>
						</div>
					</div>
				</div>

				<div className="mt-8 grid gap-4 border-t border-white/10 pt-6 text-sm text-white/72 lg:grid-cols-3 lg:items-start text-center lg:text-start">
					<div>
						<div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E7D3B0] ">
							Contact
						</div>
						<div className="mt-2 space-y-1">
							<p>
								Phone:{" "}
								<a
									href="tel:920005785"
									className="text-white transition hover:text-[#E7D3B0]"
								>
									920005785
								</a>
							</p>
							<p>
								WhatsApp:{" "}
								<a
									href={whatsappLink}
									target="_blank"
									rel="noopener noreferrer"
									className="text-white transition hover:text-[#E7D3B0]"
								>
									+966580121025
								</a>
							</p>
							<p>
								Email:{" "}
								<a
									href="mailto:contact@mzarapp.com"
									className="text-white transition hover:text-[#E7D3B0]"
								>
									contact@mzarapp.com
								</a>
							</p>
						</div>
					</div>

					<div>
						<div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E7D3B0]">
							Location
						</div>
						<p className="mt-2 leading-7">Saudi Arabia, Makkah Al-Mukarramah</p>
					</div>

					<div>
						<div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E7D3B0]">
							License Information
						</div>
						<p className="mt-2 leading-7">
							Licensed by the Ministry of Tourism, license number 73104705.
						</p>
						<p className="mt-1 leading-7">
							Commercial Registration: 4031282010 | Licensed Activity: Tour
							Organization.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
