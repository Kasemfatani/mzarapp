"use client";
import { Subtitles } from "lucide-react";
import { useState } from "react";


export default function HeroWin({ lang = "ar" }) {
	const isAr = lang === "ar";
	const t = {
		title: isAr ? "مبروك!" : "Congratulations!",
		Subtitles: isAr ? "لقد حصلت على هديتك بنجاح" : "You have successfully claimed your gift",
		gift: isAr ? "لقد حصلت على خصم 30% علي الرحلات" : "You have received a 30% discount on trips",
		giftDesc: isAr ? "لقد لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء كانت تصاميم مطبوعه … بروشور او فلاير على سبيل المثال … او نماذج مواقع انترنت … على خصم 30% علي الرحلات" : "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	};

	return (
		<section className="relative md:min-h-[90vh] w-full overflow-hidden flex flex-col justify-start items-center">
			{/* Step 2 hero BG */}
			<img
				src="/hotel/Hero2.webp"
				alt="Step 2 background"
				className="absolute inset-0 w-full h-full object-cover -z-10"
			/>
			{/* <div className="absolute inset-0 bg-[#0b4f3b]/75 -z-10" /> */}

			<div className="px-4 py-10 text-white">
				{/* Hotel icon (external placeholder) */}
					<div className={`mb-4 md:mb-8`}>
						<img
							src="/hotel/gift-win.png"
							alt="gift Logo"
							className="h-56 w-auto mx-auto brightness-110"
						/>
					</div>
					<h2 className="text-2xl md:text-5xl font-extrabold text-center mb-4 md:mb-8">{t.title}</h2>
					<h2 className="text-2xl md:text-5xl font-extrabold text-center mb-4 md:mb-8">{t.Subtitles}</h2>
					<p className="text-center mb-4 md:mb-8 text-gray-200 md:text-2xl">{t.gift}</p>
					<p className="text-center mb-4 md:mb-8 w-full max-w-4xl text-gray-200 md:text-2xl">{t.giftDesc}</p>
			</div>
		</section>
	);
}
