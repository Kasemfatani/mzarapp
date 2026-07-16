"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { useCurrentLocale } from "@/lib/useLocale";

export default function WhatsAppCampaignModal() {
	const { isAr } = useCurrentLocale();
	const [isOpen, setIsOpen] = useState(false);
	const [prefilledText, setPrefilledText] = useState("");

	useEffect(() => {
		const handleGlobalClick = (e) => {
			const anchor = e.target.closest("a");
			if (anchor && anchor.href) {
				const href = anchor.href;
				if (href.includes("wa.me") || href.includes("api.whatsapp.com/send")) {
					e.preventDefault();
					let text = "";
					try {
						const url = new URL(href);
						text = url.searchParams.get("text") || "";
						if (!text) {
							const match = href.match(/[?&]text=([^&]+)/);
							if (match) {
								text = decodeURIComponent(match[1]);
							}
						}
					} catch (err) {
						const match = href.match(/[?&]text=([^&]+)/);
						if (match) {
							text = decodeURIComponent(match[1]);
						}
					}
					setPrefilledText(text);
					setIsOpen(true);
				}
			}
		};

		document.addEventListener("click", handleGlobalClick);
		return () => document.removeEventListener("click", handleGlobalClick);
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") {
				setIsOpen(false);
			}
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, []);

	if (!isOpen) return null;

	const handleNumberClick = (number) => {
		setIsOpen(false);
		const formattedText = prefilledText ? `?text=${encodeURIComponent(prefilledText)}` : "";
		const targetUrl = `https://wa.me/${number}${formattedText}`;
		window.open(targetUrl, "_blank", "noopener,noreferrer");
	};

	return (
		<div 
			className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300 whats-campaign-fadeIn"
			onClick={() => setIsOpen(false)}
		>
			<style dangerouslySetInnerHTML={{__html: `
				@keyframes whatsCampaignFadeIn {
					from { opacity: 0; }
					to { opacity: 1; }
				}
				@keyframes whatsCampaignScaleUp {
					from { transform: scale(0.95); opacity: 0; }
					to { transform: scale(1); opacity: 1; }
				}
				.whats-campaign-fadeIn {
					animation: whatsCampaignFadeIn 0.2s ease-out forwards;
				}
				.whats-campaign-scaleUp {
					animation: whatsCampaignScaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
				}
			`}} />

			<div 
				className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full overflow-hidden shadow-2xl transform transition-all duration-300 scale-100 border border-gray-150 whats-campaign-scaleUp"
				onClick={(e) => e.stopPropagation()}
				dir={isAr ? "rtl" : "ltr"}
			>
				{/* Modal Header */}
				<div className="flex items-center justify-between border-b pb-4 px-6 pt-6 bg-gray-50/50">
					<div className="flex flex-col text-start">
						<h3 className="text-lg font-extrabold text-[#3C6652]">
							{isAr ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
						</h3>
						<p className="text-xs text-gray-500 mt-1">
							{isAr ? "اختر أحد أرقامنا المتاحة لبدء المحادثة" : "Select one of our active lines to start chatting"}
						</p>
					</div>
					<button 
						onClick={() => setIsOpen(false)}
						className="p-2 text-gray-400 hover:text-[#3C6652] hover:bg-gray-100 rounded-full transition-all duration-300"
						aria-label="Close modal"
					>
						<X size={20} />
					</button>
				</div>

				{/* Modal Body */}
				<div className="p-6 flex flex-col gap-4">
					{/* Option 1 */}
					<button
						onClick={() => handleNumberClick("966580121025")}
						className="flex items-center justify-between p-4 bg-[#F8F9FA] hover:bg-[#3C6652]/5 border border-gray-150 hover:border-[#3C6652] rounded-2xl transition-all duration-300 group hover:shadow-md cursor-pointer text-start w-full"
					>
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shadow-md">
								<i className="fa-brands fa-whatsapp text-2xl"></i>
							</div>
							<div>
								<span className="block text-sm font-bold text-gray-800">
									{isAr ? "الدعم والمبيعات 1" : "Support & Sales 1"}
								</span>
								<span className="block text-xs text-gray-500 mt-1 font-mono tracking-wider" dir="ltr">
									+966 58 012 1025
								</span>
							</div>
						</div>
						<div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#3C6652] flex items-center justify-center transition-all duration-300">
							{isAr ? (
								<ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300 transform group-hover:-translate-x-1" />
							) : (
								<ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1" />
							)}
						</div>
					</button>

					{/* Option 2 */}
					<button
						onClick={() => handleNumberClick("966549177484")}
						className="flex items-center justify-between p-4 bg-[#F8F9FA] hover:bg-[#3C6652]/5 border border-gray-150 hover:border-[#3C6652] rounded-2xl transition-all duration-300 group hover:shadow-md cursor-pointer text-start w-full"
					>
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shadow-md">
								<i className="fa-brands fa-whatsapp text-2xl"></i>
							</div>
							<div>
								<span className="block text-sm font-bold text-gray-800">
									{isAr ? "الدعم والمبيعات 2" : "Support & Sales 2"}
								</span>
								<span className="block text-xs text-gray-500 mt-1 font-mono tracking-wider" dir="ltr">
									+966 54 917 7484
								</span>
							</div>
						</div>
						<div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#3C6652] flex items-center justify-center transition-all duration-300">
							{isAr ? (
								<ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300 transform group-hover:-translate-x-1" />
							) : (
								<ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1" />
							)}
						</div>
					</button>
				</div>
			</div>
		</div>
	);
}
