"use client";

import React, {  useState } from "react";

import img1 from "/public/bg.webp";
import Link from "next/link";


export default function BannerSection({ lang = "en" }) {
	const [language, setLanguage] = useState(lang || "en");

	return (
		<>
			
			<div className="w-full overflow-hidden mb-10">
				<div
					className="relative min-h-[220px] flex flex-col items-center justify-center text-center"
					style={{
						backgroundImage: `url(${img1.src})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{/* Black overlay */}
					<div className="absolute inset-0 bg-black/60" aria-hidden="true" />
					<div className="relative z-10 flex flex-col items-center justify-center py-12 px-4">
						<p className="text-lg md:text-3xl text-white mb-6 max-w-2xl">
							{language === "ar" ? (
								<>كل طريق يروي قصة… اكتشفها مع مزار.</>
							) : (
								<>
									Every road tells a story… discover it with Mzar.
								</>
							)}
						</p>
						

						<Link
							href="#"
							className="bg-[var(--main-color)] text-white hover:bg-[var(--sec-color)] hover:text-black px-4 py-3 font-semibold rounded-lg"
						>
							{language === "en" ? "Start your journey now" : "ابدأ رحلتك الآن"}
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
