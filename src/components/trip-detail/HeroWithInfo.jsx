"use client";

import { useEffect } from "react";
import { trackViewItem } from "@/lib/analytics";

import { Star, Clock, Users } from "lucide-react";
import { motion } from "motion/react";

import { ArrowRight, ArrowLeft } from "lucide-react";
import { BottomBar } from "./BottomBar";
import Image from "next/image";

export function HeroWithInfo({ lang, data, isSaudi = true }) {
	const isAr = lang === "ar";
	// console.log("data:", data);

	useEffect(() => {
		// push view_item when card is rendered on client
		trackViewItem({
			id: data.id,
			type: data.type,
			city: data.city,
			name: data.name,
			rating: data.rating,
			start_price: data.start_price,
			currency: "SAR",
		});
	}, []);

	const onCancel = () => {
		if (typeof window !== "undefined") window.history.back();
	};

	// WhatsApp prefilled message
    const whatsappNumber = "+966580121025";
    const whatsappMessage = isAr
        ? `مرحبًا مزار، أنا مهتم بـ ${data.name}، هل يمكنني الحصول على مزيد من التفاصيل؟`
        : `Hello MzarApp, I am interested in ${data.name}, can I get more details?`;
    const whatsappHref =
        "https://wa.me/" +
        whatsappNumber.replace(/^\+/, "") +
        "?text=" +
        encodeURIComponent(whatsappMessage);

	return (
		<>
			<a
				href={whatsappHref}
				className="fixed-what"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="WhatsApp"
				dir={isAr ? "rtl" : "ltr"}
			>
				<i className="fa-brands fa-whatsapp"></i>
			</a>
			<div className="container mx-auto px-8 py-2 flex items-center gap-1">
				<button
					onClick={onCancel}
					className="w-10 h-10 flex items-center justify-center rounded-[12px] hover:bg-gray-100 transition-colors"
				>
					{isAr ? (
						<span>
							<ArrowRight
								className="w-5 h-5 text-[#867957]"
								strokeWidth={2.5}
							/>
						</span>
					) : (
						<span>
							<ArrowLeft className="w-5 h-5 text-[#867957]" strokeWidth={2.5} />
						</span>
					)}
				</button>
				<h1 className="container text-[28px] leading-[1.3] text-[#867957]">
					{isAr ? " تفاصيل الرحلة" : "Trip Details"}
				</h1>
			</div>
			<div className=" relative w-full h-[50vh] md:h-[70vh] overflow-hidden flex flex-col">
				{/* Hero Image */}
				<div className="absolute inset-0">
					<Image
						src={data.image}
						// src="/trip-detail/water-bottles.webp"
						alt={data.name}
						className="w-full h-full object-cover"
						fill
						priority
					/>
				</div>

				{/* Info Card - Center Bottom */}
				<div className="flex flex-1 items-end justify-center z-10">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="w-full  md:max-w-2xl bg-white rounded-2xl md:rounded-3xl p-2 md:p-4 shadow-[0px_6px_20px_rgba(0,0,0,0.06)] mb-6 md:mb-8 mx-2 md:mx-4"
					>
						<div className="flex flex-row justify-center items-center gap-2 md:gap-6">
							{/* Duration */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.5 }}
								className="flex items-center gap-1 md:gap-4"
							>
								<div className="w-10 h-10 md:w-14 md:h-14 rounded-[16px] bg-gradient-to-b from-[#0f3d2e] to-[#1a5a42] flex items-center justify-center px-2 md:px-0">
									<Clock className="w-5 h-5 md:w-7 md:h-7 text-white" />
								</div>
								<div>
									<p className="text-[10px] text-gray-500 mb-1.5 leading-[1.5]">
										{isAr ? "المدة" : "Duration"}
									</p>
									<p className="text-[10px] md:text-[18px] leading-[1.4] text-[#0f3d2e]">
										{data.duration}
									</p>
								</div>
							</motion.div>

							{/* Divider */}
							<div className="block h-12 w-px bg-gradient-to-b from-[#c9a463] to-transparent"></div>

							{/* Max Guests */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.6 }}
								className="flex items-center gap-1 md:gap-4"
							>
								<div className="w-10 h-10 md:w-14 md:h-14 rounded-[16px] bg-gradient-to-b from-[#c9a463] to-[#b8914a] flex items-center justify-center px-2 md:px-0">
									<Users className="w-5 h-5 md:w-7 md:h-7 text-white" />
								</div>
								<div className={isAr ? "text-right" : "text-left"}>
									<p className="text-[10px] text-gray-500 mb-1.5 leading-[1.5]">
										{isAr ? "أقصى عدد" : "Max Guests"}
									</p>
									<p className="text-[10px] md:text-[18px] leading-[1.4] text-[#0f3d2e]">
										{data.max_people_count}
									</p>
								</div>
							</motion.div>

							{/* Divider */}
							<div className="block h-12 w-px bg-gradient-to-b from-[#c9a463] to-transparent"></div>

							{/* Rating */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.7 }}
								className="flex flex-col md:flex-row items-center gap-3"
							>
								<div className="flex items-center gap-2">
									<Star className="w-5 h-5 md:w-7 md:h-7 fill-[#c9a463] text-[#c9a463]" />
									<span className="text-sm md:text-[26px] leading-[1.2] text-[#0f3d2e]">
										{data.rating}
									</span>
								</div>

								<p className="text-[14px] leading-[1.5] text-gray-600">
									{isAr
										? `(${data.rating_count} تقييم)`
										: `(${data.rating_count} reviews)`}
								</p>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>
			<BottomBar lang={lang} data={data} isSaudi={isSaudi} />
		</>
	);
}
