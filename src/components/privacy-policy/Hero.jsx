import { Shield } from "lucide-react";
import Image from "next/image";

export function Hero({ isAr }) {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-[#0d5940] via-[#116149] to-[#0d5940] py-24 md:py-36">
			{/* Decorative Pattern */}
			<div className="absolute inset-0 ">
				<Image
					src="/privacy-policy/privacy-hero.webp"
					alt="Privacy Policy Background"
					className="w-full h-full object-cover"
					fill
					priority
				/>
				{/* <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        /> */}
			</div>

			<div className="container relative mx-auto max-w-5xl px-6 text-center lg:px-8">
				{/* Icon */}
				<div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#c9a961] shadow-2xl">
					<Shield className="h-12 w-12 text-white" strokeWidth={2.5} />
				</div>

				{/* Title */}
				<h1 className="mb-6 text-5xl text-white md:text-6xl lg:text-7xl">
					{isAr ? "سياسة الخصوصية" : "Privacy Policy"}
				</h1>

				{/* Subtitle */}
				<p className="mx-auto max-w-3xl text-2xl leading-relaxed text-white/95 md:text-3xl">
					{isAr
						? "نحترم خصوصيتك ونحمي بياناتك."
						: "We respect your privacy and protect your data."}
				</p>

				{/* Last Updated */}
				{/* <p className="mt-8 text-lg text-white/70">
          {isAr ? "آخر تحديث: ديسمبر 2025" : "Last Updated: December 2025"}
        </p> */}
			</div>
		</section>
	);
}
