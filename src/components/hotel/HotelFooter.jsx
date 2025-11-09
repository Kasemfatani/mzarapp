"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HotelFooter({ lang = "ar" }) {
	const [gclid, setGclid] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem("gclid") || "";
			setGclid(stored);
		}
	}, []);

	const isAr = lang === "ar";

	return (
		<section
			className="w-full py-10 px-4"
			style={{ backgroundColor: "var(--second-bg)" }}
		>
			<div className="container m-auto">
				{/* Top row: Logos on one side, contact info on the other */}
				<div
					className={`flex flex-col md:flex-row  items-center justify-between gap-8 mb-6`}
				>
					{/* Logos side */}
					<div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
						<Image
							src="/hotel/hotel_logo.png"
							alt="Hotel Logo"
							width={120}
							height={60}
							className="object-contain"
						/>
						<Image
							src="/Home/footer-logo.png"
							alt="Mzar Logo"
							width={120}
							height={60}
							className="object-contain"
						/>
						<Image
							src="/conf/royal-commission.webp"
							alt="Royal Commission Logo"
							width={160}
							height={60}
							className="object-contain"
						/>
					</div>

					{/* Contact info side */}
					<div className="flex flex-col gap-4 md:gap-1">
						<h3 className="font-bold text-lg text-white text-center ">
							{isAr ? "تواصل معنا" : "Contact us"}
						</h3>
						<div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
							{/* Phone */}
							<div className="flex items-center gap-2 text-white">
								<i className="fa-solid fa-phone"></i>
								<a href="tel:920005785" className="hover:underline" dir="ltr">
									920005785
								</a>
							</div>
							{/* WhatsApp */}
							<div className="flex items-center gap-2 text-white">
								<i className="fa-brands fa-whatsapp"></i>
								<a
									href="https://wa.me/+966580121025"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline"
								>
									+966580121025
								</a>
							</div>
							{/* Email */}
							<div className="flex items-center gap-2 text-white">
								<i className="fa-solid fa-envelope"></i>
								<a
									href="mailto:contact@mzarapp.com"
									className="hover:underline"
								>
									contact@mzarapp.com
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom row: License text */}
				<div className="border-t border-white/30 pt-4 text-center text-white text-sm md:text-base flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
					<p>
						{isAr
							? "© مرخصة من وزارة السياحة رقم الترخيص 73104705 | تنظيم الرحلات السياحية"
							: "© Licensed by the Ministry of Tourism, license number 73104705 | Licensed Activity: Tour Organization"}
					</p>
          <p>
            {isAr ?  "السجل التجاري : 4031282010" : "CR: 4031282010"}
          </p>
				</div>
			</div>
		</section>
	);
}
