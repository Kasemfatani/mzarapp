export default function BannerCta({ lang }) {
  const isAr = lang === "ar";
	return (
		<section className="relative bg-[rgba(133,120,86,0.7)] py-12 md:py-24 flex items-center justify-center overflow-hidden" >
			{/* Background image */}
			<img
				src="/Home/banner-bg.webp"
				alt=""
				className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
				style={{ zIndex: 0 }}
			/>

			<div className="relative z-10 flex flex-col md:flex-row items-center justify-center max-w-5xl w-full px-4 md:px-8 gap-8">
				{/* People image */}
				<div className="w-full md:w-1/2 flex justify-center">
					<img
						src="/Home/people-eating.webp"
						alt=""
						className="rounded-2xl shadow-xl w-full max-w-md object-cover"
						style={{ maxHeight: 320 }}
					/>
				</div>
				{/* Text & CTA */}
				<div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-start gap-6">
					<h2
						className="text-white font-bold text-2xl md:text-4xl leading-snug"
						
						
					>
            {isAr ? "تجربة المسجد الحرام الإثرائية " : "Al-Masjid Al-Haram Enrichment Experience"}
					</h2>
					<p
						className="text-blue-100 text-base md:text-lg"
						
						
					>
						{isAr ? "تجربة تأخذك بين قدسية المكان وعبق التاريخ ــ ابدأ جولتك الآن! " : "An experience that takes you between the sanctity of the place and the fragrance of history ــ start your tour now! "}
					</p>
					<a href="/trip-detail/88"
						className="mt-2 bg-white text-[#3c6652] px-8 py-3 rounded-xl shadow-lg hover:bg-[#f5f5f5] font-semibold flex items-center gap-2 text-lg transition"
						
					>
						{isAr ? " استكشف تاريخ الكعبة المشرفة   ← " : "Explore the History of the Holy Kaaba →"}
						
					</a>
				</div>
			</div>
		</section>
	);
}
