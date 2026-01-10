import { Search } from "lucide-react";
import Image from "next/image";

export function Hero({ searchQuery, onSearchChange, isAr }) {
	return (
		<section className="relative overflow-hidden py-20 md:py-28">
			{/* Subtle Pattern */}
			<div className="absolute inset-0">
				<Image
					src="/faq/faq-hero.webp"
					alt="Mecca Background"
					className="w-full h-full object-cover"
					fill
					priority
				/>

				{/* <div
					className="h-full w-full"
					style={{
						backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
						backgroundSize: "40px 40px",
					}}
				/> */}
			</div>

			<div className="container relative mx-auto max-w-4xl px-6 text-center lg:px-8">
				{/* Title */}
				<h1 className="mb-6 text-5xl text-white md:text-6xl lg:text-7xl">
					{isAr ? "الأسئلة الشائعة" : "FAQ"}
				</h1>

				{/* Subtitle */}
				<p className="mb-12 text-xl leading-relaxed text-white/95 md:text-2xl">
					{isAr
						? "جمعنا لك أهم الأسئلة التي تساعدك على الحجز بثقة واطمئنان."
						: "We have compiled the most important questions to help you book with confidence and peace of mind."}
				</p>

				{/* Search Bar */}
				<div className="relative mx-auto max-w-2xl">
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder={
							isAr ? "ابحث عن سؤالك هنا…" : "Search your question here…"
						}
						className="w-full rounded-full border-2 border-white/20 bg-white/95 px-8 py-5 pr-16 text-xl text-[#0d5940] placeholder:text-[#718096] backdrop-blur-sm transition-all focus:border-[#c9a961] focus:outline-none focus:ring-4 focus:ring-[#c9a961]/20"
					/>
					<Search className="absolute right-6 top-1/2 h-6 w-6 -translate-y-1/2 text-[#718096]" />
				</div>
			</div>
		</section>
	);
}
