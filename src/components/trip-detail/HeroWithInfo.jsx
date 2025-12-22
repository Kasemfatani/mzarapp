"use client";

import { Star, Clock, Users } from "lucide-react";
import { motion } from "motion/react";

import { ArrowRight, ArrowLeft  } from "lucide-react";
import { BottomBar } from "./BottomBar";

export function HeroWithInfo({ lang , data }) {
	const isAr = lang === "ar";
	// console.log("data:", data);
	return (
		<>
			<div className="container mx-auto px-8 py-4 flex items-center gap-1">
				<button className="w-10 h-10 flex items-center justify-center rounded-[12px] hover:bg-gray-100 transition-colors">
					{isAr ? <span><ArrowRight className="w-5 h-5 text-[#867957]" strokeWidth={2.5} /></span>  : <span><ArrowLeft className="w-5 h-5 text-[#867957]" strokeWidth={2.5} /></span>}
					
				</button>
				<h1 className="container text-[28px] leading-[1.3] text-[#867957]">
				  {isAr ? " تفاصيل الرحلة" : "Trip Details"}
				</h1>
			</div>
			<div className=" relative w-full h-screen overflow-hidden flex flex-col">
				{/* Hero Image */}
				<div className="absolute inset-0">
					<img
						src={data.image}
						alt={data.name}
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Info Card - Center Bottom */}
				<div className="flex flex-1 items-end justify-center z-10">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="w-full max-w-2xl bg-white rounded-3xl p-4 shadow-[0px_6px_20px_rgba(0,0,0,0.06)] mb-8 mx-4"
					>
						<div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-6">
							{/* Duration */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.5 }}
								className="flex items-center gap-4"
							>
								<div className="w-14 h-14 rounded-[16px] bg-gradient-to-b from-[#0f3d2e] to-[#1a5a42] flex items-center justify-center">
									<Clock className="w-7 h-7 text-white" />
								</div>
								<div >
									<p className="text-xs text-gray-500 mb-1.5 leading-[1.5]">
										{isAr ? "المدة" : "Duration"}
									</p>
									<p
										className="text-[18px] leading-[1.4] text-[#0f3d2e]"
										
									>
										{data.duration}
									</p>
								</div>
							</motion.div>

							{/* Divider */}
							<div className="hidden md:block h-12 w-px bg-gradient-to-b from-[#c9a463] to-transparent"></div>

							{/* Max Guests */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.6 }}
								className="flex items-center gap-4"
							>
								<div className="w-14 h-14 rounded-[16px] bg-gradient-to-b from-[#c9a463] to-[#b8914a] flex items-center justify-center">
									<Users className="w-7 h-7 text-white" />
								</div>
								<div className={isAr ? "text-right" : "text-left"}>
									<p className="text-xs text-gray-500 mb-1.5 leading-[1.5]">
										{isAr ? "أقصى عدد" : "Max Guests"}
									</p>
									<p
										className="text-[18px] leading-[1.4] text-[#0f3d2e]"
										
									>
										{data.max_people_count} 
									</p>
								</div>
							</motion.div>

							{/* Divider */}
							<div className="hidden md:block h-12 w-px bg-gradient-to-b from-[#c9a463] to-transparent"></div>

							{/* Rating */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.7 }}
								className="flex items-center gap-3"
							>
								<div className="flex items-center gap-2">
									<Star className="w-7 h-7 fill-[#c9a463] text-[#c9a463]" />
									<span
										className="text-[26px] leading-[1.2] text-[#0f3d2e]"
										
									>
										{data.rating}
									</span>
								</div>
								<p className="text-[14px] leading-[1.5] text-gray-600">
									{isAr ? `(${data.rating_count} تقييم)` : `(${data.rating_count} reviews)`}
								</p>
								
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>
			<BottomBar lang={lang}  data={data} />
		</>
	);
}
