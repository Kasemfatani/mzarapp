"use client";

import { Star, Clock, TrendingUp, MapPin, Users } from "lucide-react";

export function FeaturedToursCard({
	image,
	title,
	location,
	description,
	price,
	rating,
	reviews,
	duration,
	groupSize,
	isPopular = false,
  isAr = false,
}) {
	return (
		<div
			className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-[1.02]"
			
		>
			{/* Image Container */}
			<div className="relative h-64 overflow-hidden">
				<img
					src={image}
					alt={title}
					className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
				/>
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

				{/* Popular Badge */}
				{isPopular && (
					<div
						className="absolute top-4 right-4 bg-gradient-to-r from-[#867957] to-[#3C6652] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm"
						style={{ fontFamily: '"Readex Pro", sans-serif', fontWeight: 500 }}
					>
						<TrendingUp size={16} />
						<span>{isAr ? "الأكثر طلبًا" : "Most Popular"} </span>
					</div>
				)}

				{/* Location Tag */}
				<div
					className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm"
					style={{ fontFamily: '"Readex Pro", sans-serif' }}
				>
					<MapPin size={14} />
					<span>{location}</span>
				</div>
			</div>

			{/* Content */}
			<div className="p-6">
				{/* Title */}
				<h3
					className="text-[#3C6652] mb-2 text-right font-semibold"
					style={{ fontFamily: '"Amiri", serif', fontSize: "1.375rem" }}
				>
					{title}
				</h3>

				{/* Description */}
				<p
					className="text-gray-600 text-sm mb-4 line-clamp-2 text-right"
					style={{ fontFamily: '"Readex Pro", sans-serif', lineHeight: "1.6" }}
				>
					{description}
				</p>

				<div className="flex justify-between">
          {/* Price */}
					<div className="mb-4 text-right">
						<span
							className="text-sm text-gray-600"
							style={{ fontFamily: '"Readex Pro", sans-serif' }}
						>
							{isAr ? "ابتداءً من" : "Starting from"}
						</span>
						<div
							className="text-2xl text-[#867957] mt-1"
							style={{ fontFamily: '"Amiri", serif', fontWeight: 700 }}
						>
							{price} <span className="text-lg">{isAr ? "ريال" : "SAR"}</span>
						</div>
					</div>

					<div>
						{/* Icons Row */}
						<div className="flex items-center gap-4 mb-4 justify-end flex-wrap">
							<div
								className="flex items-center gap-2 text-gray-600 text-sm"
								style={{ fontFamily: '"Readex Pro", sans-serif' }}
							>
								<span>{duration} {isAr ? "ساعات" : "hours"}</span>
								<Clock size={16} className="text-[#867957]" />
							</div>
							<div
								className="flex items-center gap-2 text-gray-600 text-sm"
								style={{ fontFamily: '"Readex Pro", sans-serif' }}
							>
								<span>{groupSize} {isAr ? "شخص" : "people"}</span>
								<Users size={16} className="text-[#867957]" />
							</div>
						</div>

						{/* Rating */}
						<div className="flex items-center gap-3 mb-4 justify-end">
							<span
								className="text-gray-600 text-sm"
								style={{ fontFamily: '"Readex Pro", sans-serif' }}
							>
								({reviews} تقييم)
							</span>
							<div className="flex items-center gap-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={16}
										className={
											i < rating
												? "fill-[#867957] text-[#867957]"
												: "text-gray-300"
										}
									/>
								))}
							</div>
						</div>
					</div>
					
				</div>

				{/* CTA Buttons */}
				<div className="flex flex-col gap-3">
					<button
						className="w-full bg-[#3C6652] text-white py-3 rounded-xl hover:bg-[#1E3A5F] transition-all shadow-md hover:shadow-lg"
						style={{ fontFamily: '"Readex Pro", sans-serif', fontWeight: 500 }}
					>
						{isAr ? "شاهد التفاصيل" : "View Details"}
					</button>
					<button
						className="w-full text-[#867957] hover:text-[#3C6652] transition-colors"
						style={{ fontFamily: '"Readex Pro", sans-serif', fontWeight: 500 }}
					>
						{isAr ? "احجز الآن ←" : "Book Now →"}
					</button>
				</div>
			</div>
		</div>
	);
}
