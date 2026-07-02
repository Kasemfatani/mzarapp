"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Flag from "react-world-flags";

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	style: ["normal", "italic"],
	display: "swap",
});

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	display: "swap",
});

const DURATION_MS = 2200;

export default function UmrahTrustSection() {
	const rootRef = useRef(null);
	const [hasStarted, setHasStarted] = useState(false);
	const [stats, setStats] = useState({
		guests: 0,
		nationalities: 0,
		landmarks: 0,
		rating: 0,
	});

	const guestFlagCodes = [
		"GB",
		"US",
		"CA",
		"AU",
		"FR",
		"DE",
		"NL",
		"TR",
		"MY",
		"PK",
		"ID",
		"ZA",
		"NG",
		"EG",
		"AE",
	];

	useEffect(() => {
		const node = rootRef.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setHasStarted(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.25 },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!hasStarted) return;

		const start = performance.now();
		let rafId;

		const step = (now) => {
			const t = Math.min((now - start) / DURATION_MS, 1);
			const eased = 1 - Math.pow(1 - t, 3);

			setStats({
				guests: Math.floor(20000 * eased),
				nationalities: Math.floor(51 * eased),
				landmarks: Math.floor(120 * eased),
				rating: Number((4.9 * eased).toFixed(1)),
			});

			if (t < 1) rafId = requestAnimationFrame(step);
		};

		rafId = requestAnimationFrame(step);
		return () => cancelAnimationFrame(rafId);
	}, [hasStarted]);

	return (
		<section
			ref={rootRef}
			id="plan-journey"
			className={`${dmSans.className} bg-[#FAF8F2] px-5 py-20 sm:px-8 md:px-12 lg:px-16`}
		>
			<div className="mx-auto max-w-[1160px]">
				<div className="mb-12 text-center sm:mb-14">
					<span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#867957]">
						Trusted & Licensed
					</span>
					<h2
						className={`${cormorant.className} text-[32px] leading-[1.15] text-[#2E4A3E] sm:text-[42px] md:text-[48px]`}
					>
						Trusted by Travelers from{" "}
						<span className="italic text-[#3D6753]">51+ Countries</span>
					</h2>
				</div>

				<div className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#867957]">
					Statistics
				</div>

				<div className="mb-8 grid grid-cols-2 gap-3 sm:mb-10 sm:gap-4 lg:grid-cols-4 lg:gap-[18px]">
					<StatCard
						value={`+${stats.guests.toLocaleString()}`}
						label="Guests Served"
					/>
					<StatCard
						value={`+${stats.nationalities.toLocaleString()}`}
						label="Nationalities Reached"
					/>
					<StatCard
						value={`+${stats.landmarks.toLocaleString()}`}
						label="Historical & Cultural Landmarks"
					/>
					<StatCard
						value={`${stats.rating.toFixed(1)}`}
						label="Guest Satisfaction Rating"
					/>
				</div>

				<div className="rounded-[14px] border border-[#E6E1D7] bg-white px-5 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:px-8">
					<div className="grid justify-items-center gap-5 md:grid-cols-3 md:gap-6">
						<PartnerRow
							logo={
								<Image
									src="/conf/2.svg"
									alt="Saudi Ministry of Tourism logo"
									width={84}
									height={36}
									className="h-9 w-auto object-contain"
								/>
							}
							title="Saudi Ministry of Tourism"
							subtitle="Licensed tour operator"
						/>
						<PartnerRow
							logo={
								<Image
									src="/conf/royal-commission.png"
									alt="Royal Commission logo"
									width={110}
									height={36}
									className="h-9 w-auto object-contain"
								/>
							}
							title="Royal Commission for Makkah City"
							subtitle="Official heritage Partner"
						/>
						<PartnerRow
							logo={
								<Image
									src="/path/exclusive-logo.png"
									alt="Alharamain logo"
									width={92}
									height={36}
									className="h-9 w-auto object-contain"
								/>
							}
							title="Alharamain"
							subtitle="Exclusive Partner"
						/>
					</div>
				</div>

				<div className="mt-8 text-center">
					<div className="mb-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#C9C2B7]">
						Our guests travel from
					</div>
					<div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
						{guestFlagCodes.map((code) => (
							<Flag
								key={code}
								code={code}
								alt={code}
								className="h-5 w-auto rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.15)] sm:h-6"
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function StatCard({ value, label }) {
	return (
		<div className="rounded-[14px] border border-[#E6E1D7] bg-white px-3 py-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:px-5 sm:py-8">
			<div className="mb-1 text-[28px] leading-none text-[#2E4A3E] sm:text-[34px]">
				{value}
			</div>
			<div className="text-[12px] leading-[1.4] text-[#6B665F] sm:text-[13px]">
				{label}
			</div>
		</div>
	);
}

function PartnerRow({ logo, title, subtitle }) {
	return (
		<div className="flex w-full max-w-[340px] items-center justify-center gap-3 sm:gap-4">
			{logo}
			<div className="text-left">
				<p className="text-[14px] font-medium leading-[1.25] text-[#2E4A3E]">
					{title}
				</p>
				<p className="mt-1 text-[12px] leading-[1.35] text-[#867957]">
					{subtitle}
				</p>
			</div>
		</div>
	);
}
