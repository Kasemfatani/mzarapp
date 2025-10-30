"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DownloadButtons from "@/app/saad-new/components/DownloadButtons";
import Link from "next/link";

export default function DownloadAppSection({ initialLang }) {
	const [language, setLanguage] = useState(initialLang || "en");

	

	const isAr = language === "ar";

	return (
		<section
			className="relative w-full min-h-[420px] flex items-center bg-cover bg-center bg-[url('/tour/zoom-out.jpg')] mb-10"
      
		>
			<div className="absolute inset-0 bg-[#E6D2AF]/60"></div>
			<div className="relative z-10 container m-auto flex flex-col md:flex-row items-center justify-between py-10 gap-8">
				{/* Left: Text & Buttons */}
				<div className="flex-1 flex flex-col item-center md:items-start gap-6 max-w-2xl">
					<h2 className="text-4xl font-bold text-black leading-tight">
						{language === "ar"
      ? "تجربة رقمية تواكب العصر، تربطك بالمكان عبر الذكاء التفاعلي، لتجعل رحلتك أكثر عمقًا ومتعة."
      : " A digital experience that connects you to every place through interactive intelligence , making your journey deeper and more enjoyable"}
					</h2>
					{/* <p className="text-lg text-black font-medium">
						{language === "ar"
      ? "اكتشف التاريخ من خلال تقنية الواقع المعزز"
      : "Relive History with Augmented Reality "}
					</p> */}
					 <Link
							href="#"
							onClick={(e) => e.preventDefault()}
							className="inline-block"
						>
							<span className="inline-block bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-6 py-3  font-semibold rounded-md">
								{isAr
									? "جرّب تطبيق مزار الآن"
									: "Try Mzar App now"}
							</span>
						</Link>
					{/* Use DownloadButtons instead of the old download buttons */}
					<DownloadButtons language={language} />
				</div>
				{/* Right: Phones */}
				<div className="">
					<Image
						src="/tour/Phone.png"
						alt="Phone 1"
						width={342}
						height={340}
						className=""
					/>
				</div>
			</div>
		</section>
	);
}
