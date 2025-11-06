"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import part1 from "/public/conf/1.png";
import part2 from "/public/conf/2.svg";
import part3 from "/public/conf/9.png";
import part4 from "/public/conf/4.svg";
import part6 from "/public/conf/6.png";
import part5 from "/public/conf/5.png";
import part8 from "/public/conf/8.webp";
import part7 from "/public/conf/7.png";
import part9 from "/public/conf/10.svg";
import part10 from "/public/conf/12.webp";
import part11 from "/public/conf/11.svg";
import part12 from "/public/conf/anjum.png";
import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import img1 from "/public/bg.webp";
import Link from "next/link";

export default function Parteners() {
	const [language, setLanguage] = useState("en"); // Default language is 'en'
	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang"));
			// Define the headers with the selected language
			const headers = {
				lang: localStorage.getItem("lang"), // Change language dynamically based on state
			};
		}
	}, []);

	const ReviewCard = ({ img }) => {
		return (
			<figure className={cn()}>
				<div className="part-cont">
					<Image
						src={img}
						alt="Mazar"
						width={200}
						height={200}
						loading="lazy"
					/>
				</div>
			</figure>
		);
	};
	let parts = [
		{ img: part1.src },
		{ img: part2 },
		{ img: part3 },
		{ img: part4 },
		{ img: part6 },
		{ img: part5 },
		{ img: part7 },
		{ img: part8 },
		{ img: part9 },
		{ img: part10 },
		{ img: part11 },
		{ img: part12 },
	];

	return (
		<div>
			<div
				className="parteners"
				style={{ direction: language === "en" ? "ltr" : "rtl" }}
			>
				<h2 className="text-center">
					{language === "en"
						? "with the support and cooperation of our success partners"
						: "بدعم وتعاون مع شركاء النجاح "}
				</h2>
				<p className="text-center w-[75%] mx-auto">
					{language === "en"
						? "the enriched tours were presented in collaboration with the Royal Commission for Makkah City and the Holy Sites, supported by the Ministry of Tourism and a number of hotels and tourism entities, to ensure a distinguished and safe experience."
						: "قدَّم الجولات الإثرائية بالتعاون مع الهيئة الملكية لمدينة مكة والمشاعر المقدسة وبدعم من وزارة السياحة وعدد من الفنادق والجهات السياحية، لضمان تجربة راقية وآمنة. "}
				</p>
				<br />
				<div className="parts-cont">
					<div className="partss" style={{ direction: "ltr" }}>
						<div className="relative flex  w-full flex-col items-center gap-4 justify-center overflow-hidden  ">
							<Marquee pauseOnHover className="[--duration:20s]">
								{parts.map((review, index) => (
									<ReviewCard key={index} {...review} />
								))}
							</Marquee>
						</div>
					</div>
				</div>
			</div>

            <div className="w-full overflow-hidden mb-10">
				<div
					className="relative min-h-[320px] flex flex-col items-center justify-center text-center"
					style={{
						backgroundImage: `url(${img1.src})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{/* Black overlay */}
					<div className="absolute inset-0 bg-black/70" aria-hidden="true" />
					<div className="relative z-10 flex flex-col items-center justify-center py-12 px-4">
						<h2 className="text-xl md:text-2xl font-extrabold text-white mb-2 max-w-2xl">
							{language === "ar" ? (
								<>انطلق في رحلتك الإثرائية اليوم </>
							) : (
								<>
                                Start your enriched journey today
								</>
							)}
						</h2>
						<p className="text-lg  text-white mb-8 max-w-2xl">
							{language === "ar" ? (
								<>اكتشف القصص التي لم تسمعها من قبل، في رحلة تجمع بين الأصالة والتقنية. احجز الآن وكن جزءًا من تجربة لا تُنسى. </>
							) : (
								<>Discover stories you've never heard before, on a journey that blends authenticity with technology. Book now and be part of an unforgettable experience.</>
							)}
						</p>

						<Link
							href="/book-tour"
							className="book-link text-lg md:text-xl max-w-xs w-full"
							style={{ fontWeight: 700 }}
						>
							{language === "en" ? "Book Now" : "حجز الآن"}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
