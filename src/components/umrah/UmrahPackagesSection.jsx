"use client";

import { useRef, useState } from "react";
import {
	Cormorant_Garamond,
	DM_Sans,
	Noto_Naskh_Arabic,
} from "next/font/google";

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

const notoNaskh = Noto_Naskh_Arabic({
	subsets: ["arabic"],
	weight: ["400", "600"],
	display: "swap",
});

const packages = [
	{
		id: "seerah",
		chip: "Already have hotels",
		chipTitle: "Seerah",
		tag: "Best for Hotel-Ready Travelers",
		accommodationIncluded: false,
		days: "5 Days",
		title: "Seerah Umrah Experience",
		arabic: "عمرة السيرة",
		description:
			"Walk through the story of the Prophet ﷺ. Ideal for travelers who already have hotels.",
		price: "SAR 5,387",
		features: [
			"Private airport pickup and drop-off",
			"Guided Makkah heritage route",
			"Multilingual audio storytelling",
			"Dedicated local support concierge",
		],
	},
	{
		id: "mashaer",
		chip: "Best first choice",
		chipTitle: "Mashaer",
		tag: "Most Popular",
		accommodationIncluded: true,
		days: "5 Days",
		title: "Mashaer Umrah Experience",
		arabic: "عمرة المشاعر",
		description:
			"A complete first-time Umrah package with guided experiences and hotel comfort in Makkah and Madinah.",
		price: "SAR 7,699",
		featured: true,
		features: [
			"4-star hotel stay in both cities",
			"Grand Mosque guided experience",
			"Private transfer Makkah to Madinah",
			"Family-friendly paced itinerary",
		],
	},
	{
		id: "landmarks",
		chip: "More exploration",
		chipTitle: "Landmarks",
		tag: "Best for Explorers",
		accommodationIncluded: false,
		days: "8 Days",
		title: "Landmarks Umrah Experience",
		arabic: "عمرة المعالم",
		description:
			"Discover beyond the ordinary with enriched journeys across Makkah, Madinah, Jeddah, and Taif.",
		price: "SAR 6,737",
		features: [
			"Historic Jeddah discovery walk",
			"Taif mountain and rose route",
			"Wadi Dhi Tuwa experience",
			"Extended heritage-focused itinerary",
		],
	},
	{
		id: "noor",
		chip: "Most complete",
		chipTitle: "Noor",
		tag: "Best for Families",
		accommodationIncluded: true,
		days: "8 Days",
		title: "Noor Umrah Experience",
		arabic: "عمرة النور",
		description:
			"The ultimate MZAR journey combining premium comfort, spiritual depth, and broader exploration.",
		price: "SAR 8,855",
		features: [
			"Premium curated private transport",
			"Priority advisor planning support",
			"All core guided mosque experiences",
			"Expanded city-to-city exploration",
		],
	},
];

function PackageChipButton({ pkg, isActive, onClick }) {
	const isNoor = pkg.id === "noor";
	const activeClass = isActive
		? "border-[#3D6753] bg-[#F1F7F4] shadow-[0_10px_28px_rgba(61,103,83,0.12)]"
		: isNoor
			? "border-[#2E4A3E] bg-[#2E4A3E]"
			: "border-[#E6E1D7] bg-white";
	const titleColor = isNoor && !isActive ? "text-white" : "text-[#2E4A3E]";
	const chipColor = isNoor && !isActive ? "text-[#E7D3B0]" : "text-[#867957]";

	return (
		<button
			type="button"
			onClick={onClick}
			className={`rounded-[12px] border p-4 text-left transition-all duration-300 ${activeClass}`}
		>
			<div
				className={`mb-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${chipColor}`}
			>
				{pkg.chip}
			</div>
			<div className={`text-[15px] font-semibold ${titleColor}`}>
				{pkg.chipTitle}
			</div>
		</button>
	);
}

function CheckIcon({ dark = false }) {
	return (
		<span
			className={`mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
				dark ? "bg-white/20 text-[#E7D3B0]" : "bg-[#EAF3EE] text-[#3D6753]"
			}`}
		>
			<svg
				width="9"
				height="9"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M20 6L9 17l-5-5" />
			</svg>
		</span>
	);
}

function PackageBadges({ pkg, dark = false }) {
	const badgeBase = dark
		? "border border-[#E7D3B0]/50 bg-[#E7D3B0]/10 text-[#E7D3B0]"
		: "border border-[#E6E1D7] bg-[#FAF8F2] text-[#867957]";
	const isMostPopular = pkg.tag === "Most Popular" && !dark;

	return (
		<div className="mb-4 flex flex-wrap gap-2">
			{isMostPopular ? (
				<span className="inline-flex items-center gap-1.5 rounded-full border border-[#3D6753] bg-[#3D6753] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
					<svg
						width="10"
						height="10"
						viewBox="0 0 16 16"
						fill="currentColor"
						aria-hidden="true"
					>
						<path d="M8 0L9.8 5.5H16L10.9 8.9L12.7 14.4L8 11L3.3 14.4L5.1 8.9L0 5.5H6.2Z" />
					</svg>
					{pkg.tag}
				</span>
			) : (
				<span
					className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${badgeBase}`}
				>
					{pkg.tag}
				</span>
			)}
			<span
				className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${badgeBase}`}
			>
				{pkg.days}
			</span>
			{pkg.accommodationIncluded ? (
				<span
					className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${badgeBase}`}
				>
					Accommodation Included
				</span>
			) : null}
		</div>
	);
}

function MashaerFeaturedCard({ pkg, isActive }) {
	const activeClass = isActive
		? "ring-2 ring-[#3D6753] ring-offset-2 ring-offset-[#F3EFE6]"
		: "";

	return (
		<article
			id={`pkg-${pkg.id}`}
			className={`mb-6 overflow-hidden rounded-[18px] border-[1.5px] border-[#3D6753] bg-white p-8 shadow-[0_20px_50px_rgba(61,103,83,0.12)] transition-all duration-300 ${activeClass}`}
		>
			<PackageBadges pkg={pkg} />

			<div className="mb-5 flex flex-wrap items-start justify-between gap-4">
				<div>
					<h3
						className={`${cormorant.className} text-[35px] leading-[1.05] text-[#2E4A3E]`}
					>
						{pkg.title}
					</h3>
					<div
						className={`${notoNaskh.className} mt-1 text-[15px] text-[#867957]`}
					>
						{pkg.arabic}
					</div>
				</div>
				<div className="text-right">
					<div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#867957]">
						Starting From
					</div>
					<div className="text-[35px] font-semibold leading-none text-[#2E4A3E]">
						{pkg.price}
					</div>
					<div className="text-[11px] text-[#6B665F]">
						per group of 5 guests
					</div>
				</div>
			</div>

			<p className="mb-5 max-w-[920px] text-[14px] font-light leading-[1.65] text-[#6B665F]">
				{pkg.description}
			</p>

			<ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
				{pkg.features.map((feature) => (
					<li
						key={feature}
						className="flex items-start gap-2.5 text-[13px] text-[#2E4A3E]"
					>
						<CheckIcon />
						<span>{feature}</span>
					</li>
				))}
			</ul>
		</article>
	);
}

function StandardPackageCard({ pkg, isActive }) {
	const activeClass = isActive
		? "ring-2 ring-[#3D6753] ring-offset-2 ring-offset-[#F3EFE6]"
		: "";

	return (
		<article
			id={`pkg-${pkg.id}`}
			className={`rounded-[16px] border border-[#E6E1D7] bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ${activeClass}`}
		>
			<PackageBadges pkg={pkg} />
			<h3
				className={`${cormorant.className} text-[31px] leading-[1.05] text-[#2E4A3E]`}
			>
				{pkg.title}
			</h3>
			<div className={`${notoNaskh.className} mt-1 text-[14px] text-[#867957]`}>
				{pkg.arabic}
			</div>
			<p className="mb-5 mt-3 text-[13px] font-light leading-[1.65] text-[#6B665F]">
				{pkg.description}
			</p>

			<ul className="mb-5 space-y-2">
				{pkg.features.map((feature) => (
					<li
						key={feature}
						className="flex items-start gap-2.5 text-[13px] text-[#2E4A3E]"
					>
						<CheckIcon />
						<span>{feature}</span>
					</li>
				))}
			</ul>

			<div className="text-[12px] text-[#6B665F]">
				<div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#867957]">
					Starting From
				</div>
				<span className="text-[25px] font-semibold text-[#2E4A3E]">
					{pkg.price}
				</span>
				<span className="ml-2">per group of 5 guests</span>
			</div>
		</article>
	);
}

function NoorPackageCard({ pkg, isActive }) {
	const activeClass = isActive
		? "ring-2 ring-[#E7D3B0] ring-offset-2 ring-offset-[#F3EFE6]"
		: "";

	return (
		<article
			id={`pkg-${pkg.id}`}
			className={`relative overflow-hidden rounded-[16px] border border-[#2E4A3E] bg-gradient-to-br from-[#2E4A3E] to-[#3D6753] p-7 shadow-[0_20px_50px_rgba(61,103,83,0.18)] transition-all duration-300 ${activeClass}`}
		>
			<div className="absolute right-4 top-4 rounded-full border border-[#E7D3B0]/40 bg-[#E7D3B0]/15 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#E7D3B0]">
				Premium
			</div>

			<PackageBadges pkg={pkg} dark />
			<h3
				className={`${cormorant.className} text-[31px] leading-[1.05] text-white`}
			>
				{pkg.title}
			</h3>
			<div className={`${notoNaskh.className} mt-1 text-[14px] text-[#E7D3B0]`}>
				{pkg.arabic}
			</div>
			<p className="mb-5 mt-3 text-[13px] font-light leading-[1.65] text-white/85">
				{pkg.description}
			</p>

			<ul className="mb-5 space-y-2">
				{pkg.features.map((feature) => (
					<li
						key={feature}
						className="flex items-start gap-2.5 text-[13px] text-white"
					>
						<CheckIcon dark />
						<span>{feature}</span>
					</li>
				))}
			</ul>

			<div className="text-[12px] text-white/80">
				<div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#E7D3B0]">
					Starting From
				</div>
				<span className="text-[25px] font-semibold text-white">
					{pkg.price}
				</span>
				<span className="ml-2">per group of 5 guests</span>
			</div>
		</article>
	);
}

export default function UmrahPackagesSection() {
	const [activePackageId, setActivePackageId] = useState("mashaer");
	const sectionRef = useRef(null);

	const handleSelectPackage = (packageId) => {
		setActivePackageId(packageId);
		const packageElement = document.getElementById(`pkg-${packageId}`);
		if (packageElement) {
			packageElement.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	const mashaerPackage = packages.find((pkg) => pkg.id === "mashaer");
	const secondaryPackages = packages.filter((pkg) => pkg.id !== "mashaer");

	return (
		<section
			ref={sectionRef}
			className={`${dmSans.className} bg-[#F3EFE6] px-5 py-24 sm:px-8 md:px-12 lg:px-16`}
		>
			<div className="mx-auto max-w-[1200px]">
				<div className="mb-14 text-center">
					<span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#867957]">
						OUR OFFERINGS
					</span>
					<h2
						className={`${cormorant.className} mb-4 text-[32px] leading-[1.14] text-[#2E4A3E] sm:text-[42px] md:text-[52px]`}
					>
						Choose Your <span className="italic text-[#3D6753]">Journey</span>
					</h2>
					<p className="mx-auto max-w-[640px] text-[15px] font-light leading-[1.75] text-[#6B665F]">
						Every package includes exclusive guided experiences and multilingual
						storytelling. Click an option below to jump directly to that
						package.
					</p>
				</div>

				<div className="mb-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{packages.map((pkg) => (
						<PackageChipButton
							key={pkg.id}
							pkg={pkg}
							isActive={activePackageId === pkg.id}
							onClick={() => handleSelectPackage(pkg.id)}
						/>
					))}
				</div>

				{mashaerPackage ? (
					<MashaerFeaturedCard
						pkg={mashaerPackage}
						isActive={activePackageId === mashaerPackage.id}
					/>
				) : null}

				<div className="grid gap-5 lg:grid-cols-3">
					{secondaryPackages.map((pkg) => {
						if (pkg.id === "noor") {
							return (
								<NoorPackageCard
									key={pkg.id}
									pkg={pkg}
									isActive={activePackageId === pkg.id}
								/>
							);
						}

						return (
							<StandardPackageCard
								key={pkg.id}
								pkg={pkg}
								isActive={activePackageId === pkg.id}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}
