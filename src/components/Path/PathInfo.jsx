"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// REMOVE static import to avoid early bind and duplicate instances
// import { Fancybox } from "@fancyapps/ui";
import { motion } from "framer-motion";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
// import img1 from "/public/Thaw.webp";
import img2 from "/public/conf/10.png";
// import sar from "/public/sar.png";
// import Offer from "./Offer";
// import LazyExplore from "../home/LazyExplore";
import LazyPathExtra from "./LazyPathExtra";
import StarRating from "./StarRating.jsx";
// import ExpandableDescription from "./ExpandableDescription";
// import PathOffer from "./PathOffer";
import { useSearchParams } from "next/navigation";

export default function PathInfo(props) {
	// destructure props correctly
	const { data: initialData = {}, lang, whatsappText } = props;

	const searchParams = useSearchParams();
	const [pathId, setPathId] = useState(searchParams.get("id"));

	// REMOVE this earlier bind; we’ll do one dynamic bind below
	// useEffect(() => {
	//   Fancybox.bind("[data-fancybox]", {});
	//   return () => Fancybox.destroy();
	// }, []);

	// use local state initialized from props.data
	let [data, setData] = useState(initialData);
	const [language, setLanguage] = useState(lang || "en");

	// console.log('data is ', data);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setLanguage(localStorage.getItem("lang") || lang || "en");
		}
	}, [lang]);
	// console.log("check rating_api", data.rating_api);

	// Single dynamic import + delegated bind, with CSS fallback
	useEffect(() => {
		let unbind;
		let destroyed = false;

		(async () => {
			// Ensure CSS is present (pin to v5)
			const cssHref =
				"https://cdn.jsdelivr.net/npm/@fancyapps/ui@5/dist/fancybox/fancybox.css";
			if (!document.querySelector(`link[href="${cssHref}"]`)) {
				const link = document.createElement("link");
				link.rel = "stylesheet";
				link.href = cssHref;
				link.crossOrigin = "anonymous";
				document.head.appendChild(link);
			}

			const { Fancybox } = await import("@fancyapps/ui");
			if (destroyed) return;

			// Delegated binding
			unbind = Fancybox.bind("[data-fancybox]", {
				// options if needed
			});
		})();

		return () => {
			destroyed = true;
			try {
				if (unbind) unbind();
			} catch {}
		};
	}, []);

	return (
		<>
			<div className="container m-auto path">
				<div className="flex flex-col md:flex-row justify-between items-start">
					<div className="mb-2 md:mb-0">
						<div className="flex flex-col md:flex-row gap-3 md:gap-6">
							<h1 className="text-5xl font-bold">{data.name}</h1>
							{data.most_ordered && (
								<div className="inline-flex items-center gap-2 px-3 py-1 mb-2 bg-[var(--main-bg)] rounded-lg  font-semibold  w-fit text-[var(--second-bg)]">
									<span role="img" aria-label="fire">
										🔥
									</span>
									{language === "ar" ? "الاكثر طلبا" : "Most Ordered"}
								</div>
							)}
						</div>
						<p className="mt-2 text-sm text-gray-500 font-semibold w-full md:w-[70%]">
							{data.short_description ? data.short_description : ""}
						</p>
						{data.rating_api && Number(data.rating_api) > 0 ? (
							<div className="mt-4">
								<StarRating
									rating={Number(data.rating_api).toFixed(1)}
									outOf={1}
									language={language}
								/>
							</div>
						) : null}
					</div>
					<div className="free-auth border-t md:border-0 pt-4 md:pt-0">
						<Link
							href="https://book.nusuk.sa/sa-ar/organizer/shrk-mz-r-laol-llsfr-o-lsy-h"
							className="auth"
						>
							<Image
								src={img2}
								alt={`${data.name} image`}
								width={200}
								height={200}
							></Image>
							<h4>
								{language === "en" ? "Verified by nusuk" : " معتمد من نسك"}{" "}
							</h4>
							<i className="fa-solid fa-arrow-up"></i>
						</Link>
						<div className="free-col">
							<i className="fa-regular fa-calendar"></i>
							<h4>
								{language === "en" ? "Free cancellation" : "الغاء الحجز مجانا"}
							</h4>
						</div>
					</div>
				</div>
				<br />

				{/* New image grid display */}
				{data?.package_images?.length > 0 && (
					<div className="w-[90%] mx-auto mb-8">
						{/* Mobile: one row, horizontal scroll, one image per view */}
						<div className="md:hidden grid grid-flow-col auto-cols-[100%] gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar">
							{data.package_images.map((img, idx) => (
								<a
									key={`m-${idx}`}
									href={img.image}
									data-fancybox="path-img-mobile"
									className="relative rounded-xl overflow-hidden aspect-[4/3] snap-start"
								>
									<Image
										src={img.image}
										alt={`${data.name} image`}
										fill
										className="object-cover"
										sizes="100vw"
										priority={idx === 0}
									/>
									{/* Show all photos button sits on top of the first image (mobile) */}
									{idx === 0 && (
										<button
											type="button"
											className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-white transition"
											onClick={(e) => {
												e.preventDefault();
												window.Fancybox?.open(
													data.package_images.map((x) => ({
														src: x.image,
														type: "image",
													}))
												);
											}}
										>
											{language === "ar" ? "عرض كل الصور" : "Show all photos"}
										</button>
									)}
								</a>
							))}
						</div>

						{/* Desktop/Tablet: 5 cols x 2 rows with big 2x2 on the left */}
						<div className="hidden md:grid grid-cols-5 grid-rows-2 gap-3">
							{/* Big main image (2 cols x 2 rows) */}
							<div className="relative rounded-xl overflow-hidden col-span-2 row-span-2 aspect-[4/3]">
								<a href={data.package_images[0].image} data-fancybox="path-img">
									<Image
										src={data.package_images[0].image}
										alt={`${data.name} image`}
										fill
										className="object-cover"
										sizes="(max-width: 1024px) 60vw, 720px"
										priority
									/>
									<button
										type="button"
										className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-white transition"
										onClick={(e) => {
											e.preventDefault();
											window.Fancybox?.open(
												data.package_images.map((x) => ({
													src: x.image,
													type: "image",
												}))
											);
										}}
									>
										{language === "ar" ? "عرض كل الصور" : "Show all photos"}
									</button>
								</a>
							</div>

							{/* Right panel: continuous horizontal scroll of small images (2 rows, auto columns). */}
							<div className="col-span-3 row-span-2 overflow-x-auto no-scrollbar">
								<div
									className="
      grid grid-rows-2 grid-flow-col
      gap-3 snap-x snap-mandatory
      auto-cols-[calc((100%-(0.75rem*2))/3)]
    "
								>
									{(() => {
										// All images after the first (big) one
										const extra = data.package_images.slice(1);

										// If less than 6 small images, duplicate from start to fill 6 cells (3 cols x 2 rows)
										const needFill = Math.max(0, 6 - extra.length);
										const visibleFill =
											needFill > 0
												? extra.concat(extra.slice(0, needFill))
												: extra;

										// Render all when >6 (scrolls); otherwise exactly 6 (some duplicated to fill the grid)
										const smallList = extra.length > 6 ? extra : visibleFill;

										return smallList.map((img, idx) => (
											<a
												key={`small-${idx + 1}`}
												href={img.image}
												data-fancybox="path-img"
												className="relative rounded-xl overflow-hidden aspect-[4/3] snap-start"
											>
												<Image
													src={img.image}
													alt={`${data.name} image`}
													fill
													className="object-cover"
													sizes="(max-width: 1280px) 33vw, 240px"
													priority={idx < 2}
												/>
											</a>
										));
									})()}
								</div>
							</div>
						</div>
					</div>
				)}
				{/* end of images grid */}

				{/* what is include */}
				<section>
					<h3 className="text-2xl mb-4 text-center md:text-start">
						{language === "en" ? "Included/Excluded" : "تتضمن الرحلة"}
					</h3>
					<div className="w-[90%] mx-auto facilities">
						<div
							className=" flex md:flex-wrap flex-col md:flex-row justify-center md:justify-around items-center gap-4 md:gap-0
						"
						>
							{data.services.map((facility, index) => (
								<div className="facility-cont" key={index}>
									<Image
										src={facility.image}
										alt={`${data.name} image`}
										width={200}
										height={200}
									/>
									<p>{facility.name}</p>
								</div>
							))}
						</div>
						<div className="px-4 py-2 mt-6 bg-[var(--second-bg)] rounded-lg text-white flex flex-col md:flex-row gap-2 md:gap-0">
							<div className="flex-1 md:border-e">
								<p className="text-center">
									{language === "en" ? "Trip duration:" : "مدة الرحلة:"}
								</p>
								<h4 className="text-xl font-bold text-center">
									{data.duration}
								</h4>
							</div>
							<div className="flex-1 border-t md:border-t-0 pt-2 md:pt-0 ">
								<p className="text-center">
									{language === "en"
										? "Best time to visit"
										: "وقت الزيارة المفضل"}{" "}
								</p>
								<h4 className="text-xl font-bold text-center">
									{data.best_visit_time}
								</h4>
							</div>
						</div>
					</div>
				</section>

				{/* overview / description */}
				<br />
				<br />
				{/* description and offer are loaded lazily via LazyPathExtra */}
				<LazyPathExtra
					data={data}
					language={language}
					pathId={pathId}
					whatsappText={whatsappText}
				/>

				
			</div>
			{/* {(pathId == 47 || pathId == 49 || pathId == 45) && (
				<div className="mb-10">
					<LazyExplore />
				</div>
			)} */}

			{/* Mobile booking bar  */}
				<div className="md:hidden fixed bottom-0 w-full bg-[var(--main-bg)] p-4 border-t border-t-gray-300 z-10 flex justify-between items-center">
					<div className="flex flex-col">
						<p className="mb-1 text-sm text-black font-semibold">
							{language === "en" ? "From" : "من"}
						</p>
						<div className="flex items-baseline gap-2">
							<span className="text-base font-bold text-[#7B7154]">
								{data.starting_price?.toFixed(2)}{" "}
								{language === "ar" ? "ر.س" : "SAR"}
							</span>
							<span className="text-sm  line-through text-gray-400 font-bold">
								{(data.original_price
									? Number(data.original_price)
									: Number(data.starting_price) * 1.25
								).toFixed(2)}
							</span>
						</div>
						<p className="mt-1 text-sm text-black font-semibold">
							{language === "en"
								? "Per group up to 4 persons"
								: "لكل مجموعة حتى 4 شخص"}
						</p>
					</div>
					{whatsappText ? (
						<a
							href={`https://wa.me/+966580121025?text=${encodeURIComponent(
								whatsappText
							)}`}
							className="book-link-whatsapp "
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
							<span className="!text-[12px]">
								{language === "en"
									? "Book now via WhatsApp"
									: "احجز الآن عبر واتساب"}
							</span>
						</a>
					) : (
						<Link href={`/book-path?id=${pathId}`} className="book-link !px-8">
							{language === "en" ? "Book Now" : "احجز الآن"}
						</Link>
					)}
				</div>
		</>
	);
}
