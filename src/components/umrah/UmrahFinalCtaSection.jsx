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

const whatsappLink =
	"https://wa.me/966580121025?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20MZAR%20Umrah%20Experiences";

export default function UmrahFinalCtaSection() {
	return (
		<section
			className={`${dmSans.className} relative overflow-hidden bg-gradient-to-br from-[#3D6753] to-[#2E4A3E] px-5 py-24 sm:px-8 sm:py-28 md:px-12 lg:px-16`}
		>
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.07]"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Cg fill='none' stroke='%23E8D2A5' stroke-width='1'%3E%3Cpath d='M48 8 L88 48 L48 88 L8 48 Z'/%3E%3Cpath d='M20 20 L76 20 L76 76 L20 76 Z'/%3E%3C/g%3E%3C/svg%3E\")",
					backgroundSize: "96px 96px",
				}}
			/>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(231,211,176,0.12)_0%,transparent_35%),radial-gradient(circle_at_bottom_left,rgba(231,211,176,0.08)_0%,transparent_30%)]" />
			<div className="relative mx-auto max-w-[680px] text-center">
				<div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E7D3B0]/35 bg-[#E7D3B0]/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#E7D3B0]">
					<svg
						width="9"
						height="9"
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="10" />
					</svg>
					Limited Seasonal Availability
				</div>

				<span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E7D3B0]">
					BEGIN YOUR JOURNEY OF DISCOVERY
				</span>
				<h2
					className={`${cormorant.className} text-[34px] leading-[1.1] text-white sm:text-[44px] md:text-[64px]`}
				>
					Experience Umrah Beyond the Ordinary
				</h2>
				<p className="mx-auto mt-5 max-w-[520px] text-[16px] font-light leading-[1.75] text-white">
					Discover the stories behind the places, explore the landmarks of
					Islamic history, and experience a journey where spirituality, culture,
					and discovery come together.
				</p>
				<p className="mx-auto mt-6 max-w-[540px] text-[14px] font-light leading-[1.75] text-white">
					Our specialists are ready to help you design the perfect Umrah
					experience tailored to your travel plans.
				</p>

				<div className="mt-8 flex justify-center">
					<a
						href={whatsappLink}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-[6px] bg-[#E7D3B0] px-8 py-4 text-[15px] font-semibold text-[#2E4A3E] shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition hover:brightness-95"
					>
						Speak with Mzar Advisor
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							aria-hidden="true"
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>
		</section>
	);
}
