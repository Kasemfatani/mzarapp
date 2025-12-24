"use client";

import { is } from "date-fns/locale";
import { Tag, Clock, ArrowLeft , ArrowRight } from "lucide-react";

function OfferCard({
	isAr = false,
	image,
	title,
	description,
	discount,
	oldPrice,
	newPrice,
	badge,
	urgency,
}) {
  
	return (
		<div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-[1.02] border border-gray-100 flex flex-col h-full">
			{/* Image Container */}
			<div className="relative h-56 overflow-hidden">
				<img
					src={image}
					alt={title}
					className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
				/>

				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

				<div className="absolute content-stretch flex items-center justify-between left-[10.2px] top-[16.2px] w-full px-4">
					{/* Discount Badge */}
					<div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full shadow-xl flex items-center gap-2 animate-pulse text-sm">
						<Tag size={14} />
						<span
							className=""
							
						>
							{discount}% {isAr ? "خصم" : "Off"}
						</span>
					</div>

					{/* Badge Label */}
					<div
						className="bg-[#867957] text-white px-4 py-1.5 rounded-full shadow-lg text-sm"
						
					>
						{badge}
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="p-6 flex flex-col flex-1" >
				{/* Title */}
				<h3
					className="text-[#3C6652] mb-3 text-xl  font-semibold"
					
				>
					{title}
				</h3>

				{/* Description */}
				<p
					className="text-gray-600 text-sm mb-5  leading-relaxed flex-grow"
					style={{  lineHeight: "1.6" }}
				>
					{description}
				</p>

				{/* Urgency Badge */}
				{urgency && (
					<div
						className="flex items-center gap-2 mb-4 text-orange-600 text-sm justify-center"
						style={{  fontWeight: 500 }}
					>
						<span>{urgency}</span>
						<Clock size={16} />
					</div>
				)}

				{/* Spacer to push pricing and button down */}
				<div className="flex-grow" />

				{/* Pricing */}
				<div className="mb-5 ">
					<div className="flex items-center justify-between">
						<p
							className="text-sm text-gray-500 mt-1"
							
						>
              {isAr ? "وفّر" : "Save"} {parseInt(oldPrice) - parseInt(newPrice)} {isAr ? "ريال" : "SAR"}
						</p>

						<div className="flex items-baseline gap-4">
							<div
								className="text-3xl text-[#3C6652] font-bold"
								style={{ fontWeight: 700 }}
							>
								{newPrice} <span className="text-lg">{isAr ? "ريال" : "SAR"}</span>
							</div>
							<div
								className="text-lg text-gray-400 line-through"
								
							>
								{oldPrice}
							</div>
						</div>
					</div>
				</div>

				{/* CTA Button */}
				<button
					className="w-full bg-[#3C6652] text-white py-3.5 rounded-xl hover:bg-[#1E3A5F] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-auto"
					style={{  fontWeight: 500 }}
				>
					<span >{isAr ? "عرض المزيد " : "View More"}</span>
					{/* <ArrowLeft
						size={18}
						className="group-hover:translate-x-1 transition-transform"
					/> */}
				</button>
			</div>
		</div>
	);
}

export function SpecialOffers({ lang }) {
  const isAr = lang === "ar";
	const offers = [
		{
			image:
				"https://images.unsplash.com/photo-1720549973451-018d3623b55a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWFiYSUyMG1ha2thaCUyMG1hc2ppZHxlbnwxfHx8fDE3NjQ0OTUzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
			title:  isAr ? "جولة الحرمين" : "Haram Tour",
			description:  isAr ? "عِش التجربة الإيمانية مع مرشدين متخصصين." : "Experience the spiritual journey with specialized guides.",
			discount: 20,
			oldPrice: 120,
			newPrice: 95,
			badge: isAr ? "عرض اليوم" : "Today's Deal",
			urgency: isAr ? "الأماكن محدودة" : "Limited Seats",
		},
		{
			image:
				"https://images.unsplash.com/photo-1630255452925-41c35e9313bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYXJjaGl0ZWN0dXJlJTIwdG91cnxlbnwxfHx8fDE3NjQ0OTUzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
			title:  isAr ? "رحلة معالم مكة التاريخية" : "Historical Sites Tour of Mecca",
			description: isAr ? "اكتشف أسرار التاريخ من أعالي برج الساعة." : "Discover the secrets of history from the top of the Clock Tower.",
			discount: 15,
			oldPrice: 140,
			newPrice: 119,
			badge: isAr ? "لفترة محدودة" : "Limited Time",
		},
		{
			image:
				"https://images.unsplash.com/photo-1544124499-58912cbddaad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyJTIwYnVzJTIwY2l0eXxlbnwxfHx8fDE3NjQ0OTUzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
			title: isAr ? "الباص السياحي — Day Pass" : "Tour Bus City Pass",
			description:  isAr ? "جولة بانورامية مفتوحة عبر أشهر معالم مكة." : "Open panoramic tour through the most famous landmarks of Mecca.",
			discount: 25,
			oldPrice: 80,
			newPrice: 60,
			badge: isAr ? "عرض حصري" : "Exclusive Deal",
			urgency: isAr ? "ينتهي خلال 12 ساعة" : "Ends in 12 hours",
		},
		{
			image:
				"https://images.unsplash.com/photo-1511632765486-a01980e01a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB0b3VyJTIwaGFwcHl8ZW58MXx8fHwxNzY0NDk1Mzc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
			title:  isAr ? "باقة العائلة" : "Family Package",
			description: isAr ? "احصل على خصم خاص عند حجز 4 أشخاص أو أكثر." : "Get a special discount when booking for 4 or more people.",
			discount: 30,
			oldPrice: 285,
			newPrice: 199,
			badge: isAr ? "للعائلات" : "For Families",
		},
	];

	return (
		<section
			className="py-24 bg-gradient-to-b from-white to-[#E7D3AF]/10"
			
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				{/* <div className="text-center mb-16">
					<h2
						className="text-[#3C6652] mb-4 font-bold"
						style={{  fontSize: "2.5rem" }}
					>
            {isAr ? 'عروض خاصة لرحلتك القادمة' : 'Special Offers for Your Next Journey'}
					</h2>
					<p
						className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed"
						style={{
							
							lineHeight: "1.7",
						}}
					>
						{isAr ? "خصومات مميزة على أشهر التجارب ــ لفترة محدودة!" : "Real discounts on the most popular tours — for a limited time only!"}
					</p>
				</div> */}

				{/* Offers Grid */}
				{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-16">
					{offers.map((offer, index) => (
						<OfferCard key={index} {...offer} isAr={isAr} />
					))}
				</div> */}

				{/* Bottom CTA Banner */}
				<div className="bg-gradient-to-r from-[#3C6652] to-[#1E3A5F] rounded-3xl p-8 md:p-10 text-center shadow-2xl border border-[#867957]/20">
					<div className="max-w-3xl mx-auto">
						<h3
							className="text-white mb-4 text-2xl md:text-3xl font-bold"
							
						>
              {isAr ? "تجربة سياحية آمنة ومريحة " : "A Safe & Comfortable Tourism Experience"}
						</h3>
						<p
							className="text-white/90 mb-6 text-lg"
							style={{
								
								lineHeight: "1.7",
							}}
						>
              {isAr ? "مرشد ذكي صوتي بـ6 لغات، ومحطات غنية بالقصص تجوب بك أبرز معالم مكة المكرمة" : "A smart audio guide in 6 languages, with story-rich stops that take you through Makkah’s most prominent landmarks."}
						</p>
						<a 
							href="/all-trips"
							className="bg-white text-[#3C6652] px-12 py-4 rounded-xl hover:bg-[#E7D3AF] transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-3"
							style={{
								
								fontWeight: 500,
							}}
						>
							<span className="text-lg">{isAr ? "استكشف الآن!" : "Explore Now!"}</span>
							{isAr ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
