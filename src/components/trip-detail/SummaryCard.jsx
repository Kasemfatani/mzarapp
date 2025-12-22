"use client";

import { Calendar, MapPin, Clock } from "lucide-react";
import { motion } from "motion/react";

export function SummaryCard({ lang, data }) {
	const isAr = lang === "ar";

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.2 }}
			className="relative container mx-auto my-10"
		>
			<div className="bg-gradient-to-b from-[#0f3d2e] to-[#1a5a42] rounded-[20px] shadow-[0px_6px_20px_rgba(0,0,0,0.06)] border-t-4 border-[#c9a463] p-6">
				{/* Title Section - Grouped with stronger separation */}
				<div className="mb-10">
					<motion.h1
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="text-[32px] leading-[1.3] text-white mb-3 "
					>
						{data.name}
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						className="text-[18px] leading-[1.6] text-[#c9a463] "
					>
						{data.short_description}
					</motion.p>
				</div>

				{/* Info Grid - render from data.headers */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[90%] ">
					{(data?.headers || []).map((h, idx) => (
						<motion.div
							key={h.title ?? idx}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="bg-white/10 backdrop-blur-sm rounded-[16px] p-4 border border-white/20 flex items-start gap-4"
						>
							<div className="flex items-center justify-center flex-shrink-0 overflow-hidden">
								{h.image ? (
									<img
										src={h.image}
										alt={h.title}
										className="w-5 h-5 object-contain"
									/>
								) : (
									<div className="w-5 h-5" />
								)}
							</div>

							<div className="flex-1">
								<p className="text-xs text-white/70 mb-2 leading-[1.5]">
									{h.title}
								</p>
								<p className="text-[16px] leading-[1.5] text-white">
									{h.description || "-"}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
}
