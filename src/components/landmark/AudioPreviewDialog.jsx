"use client";
import React, { useMemo, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog";

export default function AudioPreviewDialog({ language = "en" , audio = {} }) {
	const [open, setOpen] = useState(false);
	const LANGS = useMemo(
		() => [
			{
				key: "ar",
				labelEn: "Arabic",
				labelAr: "العربية",
				audio: audio.ar ? audio.ar : "",
			},
			{
				key: "en",
				labelEn: "English",
				labelAr: "الإنجليزية",
				audio: audio.en ? audio.en : "",
			},
			{
				key: "fr",
				labelEn: "French",
				labelAr: "الفرنسية",
				audio: audio.fr ? audio.fr : "",
			},
			{
				key: "tr",
				labelEn: "Turkish",
				labelAr: "التركية",
				audio: audio.tr ? audio.tr : "",
			},
			{
				key: "ur",
				labelEn: "Urdu",
				labelAr: "الأردية",
				audio: audio.ur ? audio.ur : "",
			},
			{
				key: "ms",
				labelEn: "Malay",
				labelAr: "الماليزية",
				audio: audio.ms ? audio.ms : "",
			},
		],
		[]
	);

	const [selected, setSelected] = useState(LANGS[language === "ar" ? 0 : 1]);
	const t =
		language === "ar"
			? { title: "اختر لغتك", listen: "استمع الآن لتجربة تفاعلية قصيرة"}
			: {
					title: "Choose your language",
					listen: "Listen Now for a Short Interactive Experience",
			  };

	return (
		<>
			<button className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-6 py-3  font-semibold rounded-lg" onClick={() => setOpen(true)}>
				{t.listen}
			</button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent
					className="p-0 bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg"
					dir={language === "ar" ? "rtl" : "ltr"}
				>
					<DialogHeader className="p-6 pb-2">
						<DialogTitle className="w-full text-center text-2xl font-semibold">
							{t.title.toUpperCase?.() || t.title}
						</DialogTitle>
					</DialogHeader>

					{/* Scrollable language list */}
					<div className="px-6">
						<div className="max-h-56 overflow-y-auto border-y">
							{LANGS.map((l) => {
								const active = selected?.key === l.key;
								return (
									<button
										key={l.key}
										onClick={() => setSelected(l)}
										className={`w-full py-3 text-center font-semibold transition ${
											active
												? "bg-[var(--second-bg)] text-white"
												: "hover:bg-gray-50"
										}`}
									>
										{language === "ar" ? l.labelAr : l.labelEn}
									</button>
								);
							})}
						</div>

						{/* Audio player */}
						<div className="py-5">
							<div className="rounded-xl bg-gray-100 p-3">
								<audio key={selected?.audio} controls className="w-full">
									<source src={selected?.audio} type="audio/mpeg" />
								</audio>
							</div>
						</div>
					</div>

					{/* Close button */}
					<DialogClose asChild>
						<button className="absolute right-4 top-4 text-gray-500 hover:text-gray-800">
							<i className="fa-solid fa-xmark"></i>
							<span className="sr-only">Close</span>
						</button>
					</DialogClose>
				</DialogContent>
			</Dialog>
		</>
	);
}
