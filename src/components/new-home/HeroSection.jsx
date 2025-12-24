"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, CheckCircle, Calendar } from "lucide-react";

export default function HeroSection({ lang }) {
	const isAr = lang === "ar";
	const router = useRouter();

	// options match FiltersBar
	const cityOptions = isAr
		? [
				{ id: 1, label: "مكة المكرمة" },
				{ id: 2, label: "المدينة المنورة" },
		  ]
		: [
				{ id: 1, label: "Mecca" },
				{ id: 2, label: "Medina" },
		  ];

	const typeOptions = isAr
		? [
				{ id: 1, label: "الرحلات الإثرائية" },
				{ id: 2, label: "جولات الحرمين" },
				{ id: 3, label: "حافلة الجولات الإثرائية" },
		  ]
		: [
				{ id: 1, label: "Enriching Trips" },
				{ id: 2, label: "Haram Tours" },
				{ id: 3, label: "Enriching Trips Bus" },
		  ];

	const [selectedCity, setSelectedCity] = useState("");
	const [selectedType, setSelectedType] = useState("");

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
					<h1 className="text-white text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight drop-shadow-lg font-bold">
						{isAr
							? "اكتشف أجمل التجارب الدينية والتاريخية مع مزار"
							: "Discover the Most Inspiring Religious and Historical Experiences with Mzar "}
					</h1>

					{/* Subheadline */}
					<p
						className="text-[#E7D3AF] text-xl md:text-2xl mb-8 leading-relaxed"
						style={{
							lineHeight: "1.7",
						}}
					>
						{isAr
							? "استمتع بأفضل الرحلات الدينية والتاريخية في مكة والمدينة مع تجربة استثنائية"
							: "Enjoy the finest religious and historical journeys in Makkah and Madinah through an exceptional and enriching experience"}
					</p>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
						<a 
							href="/all-trips"
							className="bg-[#867957] text-white px-10 py-4 rounded-xl hover:bg-[#3C6652] transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
							style={{
								fontWeight: 500,
							}}
						>
							{isAr ? "استكشف التجارب " : "Explore Experiences"}
						</a>
						{/* <button
							className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-xl hover:bg-white/20 transition-all shadow-xl"
							style={{
								fontWeight: 500,
							}}
						>
							{isAr ? "احجز تجربتك الآن" : "Book Your Experience Now"}
						</button> */}
					</div>

					{/* Trust Badges */}
					<div className="flex flex-wrap gap-6 mb-10 justify-center">
						<div className="flex items-center gap-2 text-white/90">
							<CheckCircle size={20} className="text-[#867957]" />
							<span>
								{isAr ? "رحلات معتمدة رسميًا" : "Officially Certified Tours"}
							</span>
						</div>
						<div className="flex items-center gap-2 text-white/90">
							<CheckCircle size={20} className="text-[#867957]" />
							<span>{isAr ? "مرشدين متخصصين" : "Expert Guides"}</span>
						</div>
						<div className="flex items-center gap-2 text-white/90">
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
							style={{ fontSize: "1.5rem" }}
						>
							{isAr ? "ابحث عن تجربتك المثالية" : "Find Your Ideal Experience"}
						</h3>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{/* Tour Type */}
							<div className="relative">
								<label
									className="block text-sm text-[#3C6652] mb-2"
									style={{
										fontWeight: 500,
									}}
								>
									{isAr ? "نوع التجربة " : " Experience Type"}
								</label>
								<select
									value={selectedType}
									onChange={(e) => setSelectedType(e.target.value)}
									className="w-full px-4 py-3 border-2 border-[#E7D3AF] rounded-xl appearance-none bg-white pr-10 cursor-pointer hover:border-[#867957] focus:border-[#867957] focus:outline-none text-[#3C6652]"
								>
									<option value="">
										{isAr ? "اختر نوع التجربة" : "Select Experience Type"}
									</option>
									{typeOptions.map((opt) => (
										<option key={opt.id} value={opt.id}>
											{opt.label}
										</option>
									))}
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
										fontWeight: 500,
									}}
								>
									{isAr ? "المدينة" : "City"}
								</label>
								<select
									value={selectedCity}
									onChange={(e) => setSelectedCity(e.target.value)}
									className="w-full px-4 py-3 border-2 border-[#E7D3AF] rounded-xl appearance-none bg-white pr-10 cursor-pointer hover:border-[#867957] focus:border-[#867957] focus:outline-none text-[#3C6652]"
								>
									<option value="">
										{isAr ? "اختر المدينة" : "Select City"}
									</option>
									{cityOptions.map((c) => (
										<option key={c.id} value={c.id}>
											{c.label}
										</option>
									))}
								</select>
								<ChevronDown
									className={`absolute top-[42px] text-[#867957] pointer-events-none ${
										isAr ? "left-3" : "right-3"
									}`}
									size={20}
								/>
							</div>

							{/* Search Button */}
							<div className="flex items-end">
								<button
									onClick={() => {
										const params = new URLSearchParams();
										if (selectedCity)
											params.set("city_id", String(selectedCity));
										if (selectedType) params.set("type", String(selectedType));
										const path = params.toString()
											? `/all-trips?${params.toString()}`
											: "/all-trips";
										router.push(path);
									}}
									className="w-full bg-[#3C6652] text-white px-6 py-3 rounded-xl hover:bg-[#1E3A5F] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
									style={{
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
