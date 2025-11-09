import Image from "next/image";

export default function KnowledgeBanner({ lang = "ar" }) {
	return (
		<section className="w-full bg-[#f6f1e7] py-8 px-2 flex justify-center">
			<div
				className="relative w-full max-w-5xl rounded-3xl overflow-hidden flex items-center justify-center min-h-[260px] sm:min-h-[320px] md:min-h-[360px] py-4"
				style={{
					backgroundImage: "url(/hotel/banner-bg.webp)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				{/* Overlay */}
				<div className="absolute inset-0 bg-black/50" aria-hidden="true" />

				{/* Content */}
				<div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-4">
					{/* Logos */}
					<div className="flex items-center justify-center gap-4 mb-10 md:mb-4">
						<Image
							src="/Home/footer-logo.png"
							alt="Mzar Logo"
							width={120}
							height={40}
							className="object-contain"
							priority
						/>
						<Image
							src="/conf/royal-commission-icon.png"
							alt="Royal Commission Logo"
							width={158}
							height={40}
							className="object-contain"
							priority
						/>
					</div>
					{/* Headline */}
					<h2 className="text-white text-2xl md:text-4xl font-bold mb-2 leading-snug">
						{lang === "ar"
							? "رحلة معرفة... برؤية وطنية"
							: "A Journey of Knowledge... With a National Vision"}
					</h2>
					{/* Subtext */}
					<p className="text-white text-base md:text-lg font-medium mb-1">
						{lang === "ar"
							? "تعاون مزار مع الهيئة الملكية لمدينة مكة المكرمة والمشاعر المقدسة"
							: "In collaboration with the Royal Commission for the City of Makkah and the Holy Sites,"}
					</p>
					<p className="text-white text-base md:text-lg font-medium">
						{lang === "ar"
							? "لإثراء تجربة الزائر في أقدس بقاع الأرض"
							: "Mzar works to enrich the visitor’s experience in the holiest land on earth "}
					</p>
				</div>
			</div>
		</section>
	);
}
