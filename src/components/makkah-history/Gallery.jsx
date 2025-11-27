"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Link from "next/link";

const img1 = "/gallery/20.webp";
const img2 = "/gallery/2.webp";
const img3 = "/gallery/4.webp";
const img4 = "/gallery/5.png";
const img5 = "/gallery/6.png";


export default function Gallery({ lang = "en" }) {
	
	const isAr = lang === "ar";

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
					Thumbs: false, // Disable the thumbnail bar
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
		<div className="container mx-auto mt-10">
			<h2 className="text-center text-3xl font-semibold mb-3">{isAr ? "رحلتك في صور" : "Your Journey in Pictures"}</h2>
			<p className="text-center text-gray-500 mb-8">{isAr ? "شاهد لحظات الزوار كما لو كنت معهم." : "See visitors moments as if you were with them."}</p>
			<section id="photos" className="">
				<div className="grid  md:grid-cols-5 md:grid-rows-2  gap-3 md:h-[550px]">
					<div className="md:col-span-2 md:row-span-1">
						<a href={img1} data-fancybox="previw">
							<img
								src={img1}
								alt="Mazar"
								className="w-full h-full object-cover"
								loading="lazy"
								draggable={false}
							/>
						</a>
					</div>
					<div className="md:col-span-1 md:row-span-1">
						<a href={img2} data-fancybox="previw">
							<img
								src={img2}
								alt="Mazar"
								className="w-full h-full object-cover"
								loading="lazy"
								draggable={false}
							/>
						</a>
					</div>
					<div className="md:col-span-2 md:row-span-2">
						<a href={img3} data-fancybox="previw">
							<img
								src={img3}
								alt="Mazar"
								className="w-full h-full object-cover"
								loading="lazy"
								draggable={false}
							/>
						</a>
					</div>
					<div className="md:col-span-2 md:row-span-1">
						<a href={img4} data-fancybox="previw">
							<img
								src={img4}
								alt="Mazar"
								className="w-full h-full object-cover"
								loading="lazy"
								draggable={false}
							/>
						</a>
					</div>
					<div className="md:col-span-1 md:row-span-1">
						<a href={img5} data-fancybox="previw">
							<img
								src={img5}
								alt="Mazar"
								className="w-full h-full object-cover"
								loading="lazy"
								draggable={false}
							/>
						</a>
					</div>
					
				</div>
			</section>
		</div>
	);
}
