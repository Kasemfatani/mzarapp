import Image from "next/image";
import React, { useEffect, useState } from "react";
import DownloadButtons from "@/app/saad-new/components/DownloadButtons";

export default function DownloadAppSection() {
	const [language, setLanguage] = useState("en"); // Default language is 'en'

	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || "en");
		}
	}, []);

	return (
		<section
			className="relative w-full min-h-[420px] flex items-center bg-cover bg-center bg-[url('/DownloadAppSection-bg.webp')] mb-10"
      dir={language === "ar" ? "rtl" : "ltr"}
		>
			<div className="absolute inset-0 bg-white/60"></div>
			<div className="relative z-10 container m-auto flex flex-col md:flex-row items-center justify-evenly py-10 gap-8">
				{/* Left: Text & Buttons */}
				<div className="flex-1 flex flex-col items-start gap-6 max-w-lg">
					<h2 className="text-4xl font-bold text-black">
						{language === "ar"
      ? "تجربة تنقلك عبر الزمن"
      : "Step Into the Past "}
					</h2>
					<p className="text-lg text-black font-medium">
						{language === "ar"
      ? "اكتشف التاريخ من خلال تقنية الواقع المعزز"
      : "Relive History with Augmented Reality "}
					</p>
					 {/* <button className="flex items-center gap-2 bg-[var(--main-color,#025AB4)] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
            Download app
          </button> */}
					{/* Use DownloadButtons instead of the old download buttons */}
					<DownloadButtons language={language} />
				</div>
				{/* Right: Phones */}
				<div className="">
					<Image
						src="/DownloadAppSection-phones.png"
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
