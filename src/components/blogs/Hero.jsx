import { BookOpen } from "lucide-react";
import Image from "next/image";

export function Hero({ isAr }) {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-[#3C6652] via-[#2d4d3d] to-[#3C6652] py-24 md:py-36">
			<div className="absolute inset-0 ">
				<Image
					src="/blogs/blogs-hero.webp"
					alt="Mecca Background"
					className="w-full h-full object-cover"
					fill
					priority
				/>
				
			</div>

			<div className="container relative mx-auto max-w-6xl px-6 text-center lg:px-8">
				{/* Icon */}
				<div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#867957] shadow-2xl">
					<BookOpen className="h-10 w-10 text-white" strokeWidth={2.5} />
				</div>

				{/* Title (H1) */}
				<h1 className="mb-6 text-5xl text-white md:text-6xl lg:text-7xl">
					{isAr ? "المقالات" : "Articles"}
				</h1>

				{/* Subtitle */}
				<p className="mx-auto max-w-4xl text-2xl leading-relaxed text-white/95 md:text-3xl">
					{isAr
						? "اكتشف تاريخ مكة والمدينة، أسرار المعالم، ودليل الزائر لتجربة أعمق وأكثر وعيًا."
						: "Discover the history of Makkah and Madinah, the secrets of landmarks, and visitor guides for a deeper and more mindful experience. "}
				</p>

				{/* Trust Micro Text */}
				<div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-lg text-white/80 md:gap-6">
					<div className="flex items-center gap-2">
						<span className="h-1.5 w-1.5 rounded-full bg-[#867957]" />
						<span>{isAr ? "محتوى موثوق" : "Trusted Content"}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="h-1.5 w-1.5 rounded-full bg-[#867957]" />
						<span>
							{isAr
								? "معرفة تثري رحلتك "
								: "Knowledge that Enriches Your Journey"}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="h-1.5 w-1.5 rounded-full bg-[#867957]" />
						<span>
							{isAr
								? "قصص تُروى بروح المكان"
								: "Stories Told Through the Spirit of Place"}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
