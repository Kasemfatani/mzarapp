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
			className="relative w-full min-h-[420px] flex items-center bg-cover bg-center bg-[url('/DownloadAppSection-bg.png')] mb-10"
      dir={language === "ar" ? "rtl" : "ltr"}
		>
			{/* <div className="absolute inset-0 bg-black/40"></div> */}
			<div className="relative z-10 container m-auto flex flex-col md:flex-row items-center justify-between py-10 gap-8">
				{/* Left: Text & Buttons */}
				<div className="flex-1 flex flex-col items-start gap-6 max-w-lg">
					<h2 className="text-4xl font-bold text-black">
						{language === "ar"
      ? "لوريم إيبسوم هو ببساطة نص شكلي"
      : "Lorem Ipsum is simply dummy"}
					</h2>
					<p className="text-lg text-black/90">
						{language === "ar"
      ? "لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد."
      : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
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
