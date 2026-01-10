import { Check } from "lucide-react";
import Image from "next/image";

export function Hero({ lang }) {
	const isAr = lang === "ar";
	return (
		<section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-bl from-[#0d5940] via-[#116149] to-[#f5f2ed]">
			{/* Subtle Islamic Geometric Pattern */}
			<div className="absolute inset-0 ">
				<Image
					src="/about-us/about-hero.webp"
					alt="Mecca Background"
					className="w-full h-full object-cover"
					fill
					priority
				/>
			</div>

			<div className="container relative mx-auto max-w-7xl px-6 py-20 md:py-32 lg:px-8">
				<div className="max-w-3xl">
					{/* Main Headline */}
					<h1 className="mb-6 text-6xl text-white md:text-7xl lg:text-8xl">
						{isAr ? "من نحن" : "About Us"}
					</h1>

					{/* Subheadline */}
					<h2 className="mb-6 text-3xl text-[#c9a961] md:text-4xl lg:text-5xl">
						{isAr
							? "مزار ــ منصة سعودية معتمدة لحجز التجارب التاريخية والثقافية والإثرائية "
							: "Mzar is a licensed Saudi platform for booking historical, cultural, and enrichment experiences"}
					</h2>

					{/* Supporting Text */}
					<p className="mb-10 max-w-2xl text-xl text-white/95 md:text-2xl">
						{isAr
							? "نقدّم لك تجربة منظمة، آمنة، وتاريخية في مكة المكرمة والمدينة المنورة. "
							: "We offer a well-organized, safe, and authentic historical experience in Makkah Al-Mukarramah & Al-Madinah Al-Munawwarah."}
					</p>

					{/* Trust Chips */}
					<div className="flex flex-wrap gap-4">
						<div className="flex items-center gap-2.5 rounded-full bg-white/15 px-6 py-3.5 backdrop-blur-md">
							<Check className="h-5 w-5 text-[#c9a961]" strokeWidth={3} />
							<span className="text-lg text-white">
								{isAr ? "مرخّصون رسميًا" : "Officially Licensed"}
							</span>
						</div>
						<div className="flex items-center gap-2.5 rounded-full bg-white/15 px-6 py-3.5 backdrop-blur-md">
							<Check className="h-5 w-5 text-[#c9a961]" strokeWidth={3} />
							<span className="text-lg text-white">
								{isAr ? "مرشدون معتمدون" : "Certified Guides"}
							</span>
						</div>
						<div className="flex items-center gap-2.5 rounded-full bg-white/15 px-6 py-3.5 backdrop-blur-md">
							<Check className="h-5 w-5 text-[#c9a961]" strokeWidth={3} />
							<span className="text-lg text-white">
								{isAr ? "دعم على مدار الساعة" : "24/7 Support"}
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
