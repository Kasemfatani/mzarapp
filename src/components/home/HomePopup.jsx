"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import React from "react";

export default function HomePopup({ open, adData, lang, onDismiss }) {
	if (!adData) return null;
	return (
		<Dialog open={open}>
			<DialogContent className="p-0 bg-white rounded-2xl shadow-2xl overflow-visible">
				{lang === "ar" ? (
					<img
						src="/popup-new-ar.png"
						alt="جديد"
						className="absolute right-0 top-0 w-20 h-20 z-10 translate-x-[4px] -translate-y-[7px]"
						style={{ pointerEvents: "none" }}
					/>
				) : (
					<img
						src="/popup-new.png"
						alt="New"
						className="absolute left-0 top-0 w-20 h-20 z-10 -translate-x-[7px] -translate-y-[7px]"
						style={{ pointerEvents: "none" }}
					/>
				)}
				<img
					src={adData.image}
					alt="New Trip"
					className="rounded-t-2xl w-full h-56 object-cover pt-5 px-5"
				/>
				<div className="p-6 text-center" dir={lang === "ar" ? "rtl" : "ltr"}>
					<h2 className="text-2xl font-semibold mb-2">{adData.title}</h2>
					{adData.description && (
						<p className="text-gray-600 text-center mb-1">
							{parse(adData.description)}
						</p>
					)}
					<div className="flex gap-4 justify-center mt-4">
						<Button
							variant="outline"
							className="flex-1 border-cyan-400 text-cyan-500"
							onClick={onDismiss}
						>
							{lang === "ar" ? "إغلاق" : "Dismiss"}
						</Button>
						<Button
							className="flex-1 bg-cyan-500 bg-gradient-to-r from-[#025AB4] via-[#1AC5BD] to-[#87DCB5] text-white"
							onClick={onDismiss}
							asChild
						>
							<a href={`/path?id=${adData.package_id}`}>
								{lang === "ar" ? "عرض التفاصيل" : "View Details"}
							</a>
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
