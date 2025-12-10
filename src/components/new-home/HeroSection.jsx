"use client";

import { Search, ChevronDown, CheckCircle, Calendar } from "lucide-react";

export default function HeroSection({ lang }) {
	const isAr = lang === "ar";

	return (
		<section className="relative min-h-[700px] flex items-center justify-center pt-4">
			{/* Background Image with Parallax Effect */}
			<div className="absolute inset-0 z-0">
				<img
					src="https://images.unsplash.com/photo-1720549973451-018d3623b55a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWFiYSUyMG1ha2thaCUyMG1hc2ppZHxlbnwxfHx8fDE3NjQ0OTUzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
					alt="Holy Kaaba"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-black/70"></div>
				{/* Decorative overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-[#3C6652]/40 via-transparent to-transparent"></div>
			</div>

			{/* Content */}
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
				<div className="text-center max-w-4xl mx-auto">
					{/* Main Headline */}
					<h1
						className="text-white text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight drop-shadow-lg font-bold"
						style={{ fontFamily: '"Amiri", serif' }}
					>
						{isAr
							? "اكتشف أجمل الجولات الدينية والتاريخية مع مزار"
							: "Discover the Most Beautiful Religious & Historical Tours with Mzar"}
					</h1>

					{/* Subheadline */}
					<p
						className="text-[#E7D3AF] text-xl md:text-2xl mb-8 leading-relaxed"
						style={{
							fontFamily: '"Readex Pro", sans-serif',
							lineHeight: "1.7",
						}}
					>
						{isAr
							? "نقدم لك أفضل الرحلات المعتمدة داخل مكة والمدينة مع تجربة حجز سهلة وسريعة."
							: "We offer you the best certified trips in Makkah and Madinah with a fast and easy booking experience."}
					</p>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
						<button
							className="bg-[#867957] text-white px-10 py-4 rounded-xl hover:bg-[#3C6652] transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
							style={{
								fontFamily: '"Readex Pro", sans-serif',
								fontWeight: 500,
							}}
						>
							{isAr ? "استكشف الجولات" : "Explore Tours"}
						</button>
						<button
							className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-xl hover:bg-white/20 transition-all shadow-xl"
							style={{
								fontFamily: '"Readex Pro", sans-serif',
								fontWeight: 500,
							}}
						>
							{isAr ? "احجز رحلتك الآن" : "Book Your Trip Now"}
						</button>
					</div>

					{/* Trust Badges */}
					<div className="flex flex-wrap gap-6 mb-10 justify-center">
						<div
							className="flex items-center gap-2 text-white/90"
							style={{ fontFamily: '"Readex Pro", sans-serif' }}
						>
							<CheckCircle size={20} className="text-[#867957]" />
							<span>
								{isAr ? "رحلات معتمدة رسميًا" : "Officially Certified Tours"}
							</span>
						</div>
						<div
							className="flex items-center gap-2 text-white/90"
							style={{ fontFamily: '"Readex Pro", sans-serif' }}
						>
							<CheckCircle size={20} className="text-[#867957]" />
							<span>{isAr ? "مرشدين متخصصين" : "Expert Guides"}</span>
						</div>
						<div
							className="flex items-center gap-2 text-white/90"
							style={{ fontFamily: '"Readex Pro", sans-serif' }}
						>
							<CheckCircle size={20} className="text-[#867957]" />
							<span>
								{isAr ? "مواعيد يومية متاحة" : "Daily Schedules Available"}
							</span>
						</div>
					</div>

					{/* Quick Search Bar */}
					<div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-[#E7D3AF]/30">
						<h3
							className="text-[#3C6652] mb-4 text-center font-semibold"
							style={{ fontFamily: '"Amiri", serif', fontSize: "1.5rem" }}
						>
							{isAr ? "ابحث عن رحلتك المثالية" : "Find Your Perfect Tour"}
						</h3>

						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							{/* Tour Type */}
							<div className="relative">
								<label
									className="block text-sm text-[#3C6652] mb-2"
									style={{
										fontFamily: '"Readex Pro", sans-serif',
										fontWeight: 500,
									}}
								>
									{isAr ? "نوع الجولة" : "Tour Type"}
								</label>
								<select
									className="w-full px-4 py-3 border-2 border-[#E7D3AF] rounded-xl appearance-none bg-white pr-10 cursor-pointer hover:border-[#867957] focus:border-[#867957] focus:outline-none text-[#3C6652] "
									style={{ fontFamily: '"Readex Pro", sans-serif' }}
								>
									<option>
										{isAr ? "اختر نوع الجولة" : "Select Tour Type"}
									</option>
									<option>{isAr ? "جولات تاريخية" : "Historical Tours"}</option>
									<option>{isAr ? "جولات دينية" : "Religious Tours"}</option>
									<option>
										{isAr ? "تجربة الواقع المعزز" : "AR Experience"}
									</option>
									<option>{isAr ? "جولات خاصة" : "Private Tours"}</option>
								</select>
								<ChevronDown
									className={`absolute top-[42px] text-[#867957] pointer-events-none ${
										isAr ? "left-3" : "right-3"
									}`}
									size={20}
								/>
							</div>

							{/* City */}
							<div className="relative">
								<label
									className="block text-sm text-[#3C6652] mb-2"
									style={{
										fontFamily: '"Readex Pro", sans-serif',
										fontWeight: 500,
									}}
								>
									{isAr ? "المدينة" : "City"}
								</label>
								<select
									className="w-full px-4 py-3 border-2 border-[#E7D3AF] rounded-xl appearance-none bg-white pr-10 cursor-pointer hover:border-[#867957] focus:border-[#867957] focus:outline-none text-[#3C6652]"
									style={{ fontFamily: '"Readex Pro", sans-serif' }}
								>
									<option>{isAr ? "اختر المدينة" : "Select City"}</option>
									<option>{isAr ? "مكة المكرمة" : "Makkah"}</option>
									<option>{isAr ? "المدينة المنورة" : "Madinah"}</option>
									<option>{isAr ? "كلا المدينتين" : "Both Cities"}</option>
								</select>
								<ChevronDown
									className={`absolute top-[42px] text-[#867957] pointer-events-none ${
										isAr ? "left-3" : "right-3"
									}`}
									size={20}
								/>
							</div>

							{/* Date */}
							<div className="relative">
								<label
									className="block text-sm text-[#3C6652] mb-2"
									style={{
										fontFamily: '"Readex Pro", sans-serif',
										fontWeight: 500,
									}}
								>
									{isAr ? "التاريخ" : "Date"}
								</label>
								<div className="relative">
									<input
										type="date"
										className="w-full px-4 py-3 border-2 border-[#E7D3AF] rounded-xl bg-white hover:border-[#867957] focus:border-[#867957] focus:outline-none text-[#3C6652]"
										style={{ fontFamily: '"Readex Pro", sans-serif' }}
									/>
								</div>
							</div>

							{/* Search Button */}
							<div className="flex items-end">
								<button
									className="w-full bg-[#3C6652] text-white px-6 py-3 rounded-xl hover:bg-[#1E3A5F] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
									style={{
										fontFamily: '"Readex Pro", sans-serif',
										fontWeight: 500,
									}}
								>
									<Search size={20} />
									{isAr ? "بحث" : "Search"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Decorative Element */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-[5]"></div>
		</section>
	);
}
