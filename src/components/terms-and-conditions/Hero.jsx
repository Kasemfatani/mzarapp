import { FileText } from "lucide-react";
import Image from "next/image";

export function Hero({ isAr }) {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-[#0d5940] via-[#116149] to-[#0d5940] py-24 md:py-36">
			{/* Decorative Pattern */}
			<div className="absolute inset-0 ">
				<Image
					src="/terms/terms-hero.webp"
					alt="Terms and Conditions Background"
					className="w-full h-full object-cover"
					fill
					priority
				/>
				{/* <div
					className="h-full w-full"
					style={{
						backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
						backgroundSize: "48px 48px",
					}}
				/> */}
			</div>

			<div className="container relative mx-auto max-w-5xl px-6 text-center lg:px-8">
				{/* Icon */}
				<div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#c9a961] shadow-2xl">
					<FileText className="h-12 w-12 text-white" strokeWidth={2.5} />
				</div>

				{/* Title */}
				<h1 className="mb-6 text-5xl text-white md:text-6xl lg:text-7xl">
					{isAr ? "شروط الاستخدام " : "Terms of Use"}
				</h1>

				{/* Subtitle */}
				<p className="mx-auto max-w-3xl text-2xl leading-relaxed text-white/95 md:text-3xl">
					{isAr
						? "باستخدامك منصة مزار، فإنك تقرّ بقراءتك لهذه الشروط وتوافق على الالتزام بها. "
						: "By using the Mzar platform, you acknowledge that you have read and agree to comply with these Terms of Use. "}
				</p>

				{/* Last Updated */}
				{/* <p className="mt-8 text-lg text-white/70">
          آخر تحديث: ديسمبر 2024
        </p> */}
			</div>
		</section>
	);
}
