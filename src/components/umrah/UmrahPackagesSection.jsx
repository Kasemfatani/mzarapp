"use client";

import { useRef, useState } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

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

const packages = [
	{
		id: "seerahPlus",
		chip: "Comfort included",
		chipTitle: "Seerah Umrah Plus",
		tag: "Most Comfortable",
		accommodationIncluded: true,
		days: "8 Days",
		title: "Seerah Umrah Plus",
		description:
			"A complete journey that includes accommodation, private transportation, and enriching experiences across Makkah and Madinah, offering a more comfortable and rewarding Umrah experience.",
		price: "SAR 3,006",
		features: [
			"Comfortable 4-Star Hotel Accommodation",
			"A Fully Organized Journey with No Additional Planning Required",
			"Visits to the Landmarks of the Prophet's Seerah",
			"Private Transportation Throughout the Journey",
			"Dedicated Support and Assistance Every Step of the Way",
		],
	},
	{
		id: "seerah",
		chip: "Already have hotels",
		chipTitle: "Seerah Umrah",
		tag: "Best for Hotel-Ready Travelers",
		accommodationIncluded: false,
		days: "5 Days",
		title: "Seerah Umrah",
		description:
			"An enriching journey between Makkah and Madinah that combines performing Umrah with Seerah tours, private transportation, and multilingual audio guidance.",
		price: "SAR 2,323",
		features: [
			"Experience the events of the Prophet's Seerah in their true locations",
			"Listen to the stories of each place in your preferred language",
			"Comfortable private transportation",
			"An experience that combines Umrah and knowledge",
			"Full flexibility in choosing your accommodation",
		],
	},
	{
		id: "mashaerPlus",
		chip: "Most complete",
		chipTitle: "Mashaer Umrah Plus",
		tag: "Best for Discovery",
		accommodationIncluded: true,
		days: "8 Days",
		title: "Mashaer Umrah Plus",
		description:
			"A complete journey that includes accommodation and enriching experiences across Makkah, Madinah, Jeddah, and Taif, offering the perfect balance of comfort, spirituality, and discovery.",
		price: "SAR 3,911",
		features: [
			"Comfortable 4-Star Hotel Accommodation",
			"Explore Four Cities in One Journey",
			"Diverse Enriching, Cultural, and Historical Experiences",
			"Private Transportation Throughout the Journey",
			"A Unique Experience Combining Comfort, Spirituality, and Exploration",
		],
	},
	{
		id: "mashaer",
		chip: "Most popular",
		chipTitle: "Mashaer Umrah",
		tag: "Most Popular",
		accommodationIncluded: false,
		days: "5 Days",
		title: "Mashaer Umrah",
		description:
			"An eight-day journey across Makkah, Madinah, Jeddah, and Taif, combining Umrah with culture, history, and exploration in one enriching experience.",
		price: "SAR 2,756",
		featured: true,
		features: [
			"Explore Four Cities in One Journey",
			"A Unique Combination of Umrah, Culture, and Heritage",
			"Interactive Multilingual Audio Content",
			"Comfortable private transportation",
			"Full flexibility in choosing your accommodation",
		],
	},
];

function PackageChipButton({ pkg, isActive, onClick }) {
	const activeClass = isActive
		? "border-[#2E4A3E] bg-gradient-to-br from-[#2E4A3E] to-[#3D6753] shadow-[0_16px_34px_rgba(61,103,83,0.22)]"
		: "border-[#E6E1D7] bg-white";
	const titleColor = isActive ? "text-white" : "text-[#2E4A3E]";
	const chipColor = isActive ? "text-[#E7D3B0]" : "text-[#867957]";

	return (
		<button
			type="button"
			onClick={onClick}
			className={`rounded-[12px] border p-4 text-left transition-all duration-300 ${activeClass}`}
		>
			<div
				className={`mb-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${chipColor}`}
			>
				{/* {pkg.chip} */}
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
	const isMostPopular = pkg.tag === "Most Popular";

	return (
		<div className="mb-4 flex flex-wrap gap-2">
			{/* {isMostPopular ? (
				<span
					className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${
						dark
							? "border border-[#E7D3B0]/50 bg-[#E7D3B0]/15 text-[#E7D3B0]"
							: "border border-[#3D6753] bg-[#3D6753] text-white"
					}`}
				>
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
			)} */}
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
	const isDark = isActive;
	const activeClass = isActive
		? "ring-2 ring-[#E7D3B0] ring-offset-2 ring-offset-[#F3EFE6]"
		: "";

	return (
		<article
			id={`pkg-${pkg.id}`}
			className={`mb-6 overflow-hidden rounded-[18px] border-[1.5px] p-8 shadow-[0_20px_50px_rgba(61,103,83,0.12)] transition-all duration-300 ${
				isDark
					? "border-[#2E4A3E] bg-gradient-to-br from-[#2E4A3E] to-[#3D6753]"
					: "border-[#3D6753] bg-white"
			} ${activeClass}`}
		>
			<PackageBadges pkg={pkg} dark={isDark} />

			<div className="mb-5 flex flex-wrap items-start justify-between gap-4">
				<div>
					<h3
						className={`${cormorant.className} text-[35px] leading-[1.05] ${
							isDark ? "text-white" : "text-[#2E4A3E]"
						}`}
					>
						{pkg.title}
					</h3>
				</div>
				<div className="text-right">
					<div
						className={`text-[10px] font-semibold uppercase tracking-[0.08em] ${
							isDark ? "text-[#E7D3B0]" : "text-[#867957]"
						}`}
					>
						Starting From
					</div>
					<div
						className={`text-[35px] font-semibold leading-none ${
							isDark ? "text-white" : "text-[#2E4A3E]"
						}`}
					>
						{pkg.price}
					</div>
					<div
						className={`text-[11px] ${isDark ? "text-white/80" : "text-[#6B665F]"}`}
					>
						per guest
					</div>
				</div>
			</div>

			<p
				className={`mb-5 max-w-[920px] text-[14px] font-light leading-[1.65] ${
					isDark ? "text-white/85" : "text-[#6B665F]"
				}`}
			>
				{pkg.description}
			</p>

			<ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
				{pkg.features.map((feature) => (
					<li
						key={feature}
						className={`flex items-start gap-2.5 text-[13px] ${
							isDark ? "text-white" : "text-[#2E4A3E]"
						}`}
					>
						<CheckIcon dark={isDark} />
						<span>{feature}</span>
					</li>
				))}
			</ul>
		</article>
	);
}

function StandardPackageCard({ pkg, isActive }) {
	const isDark = isActive;
	const activeClass = isActive
		? "ring-2 ring-[#E7D3B0] ring-offset-2 ring-offset-[#F3EFE6]"
		: "";

	return (
		<article
			id={`pkg-${pkg.id}`}
			className={`rounded-[16px] border p-7 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ${
				isDark
					? "border-[#2E4A3E] bg-gradient-to-br from-[#2E4A3E] to-[#3D6753]"
					: "border-[#E6E1D7] bg-white"
			} ${activeClass}`}
		>
			<PackageBadges pkg={pkg} dark={isDark} />
			<h3
				className={`${cormorant.className} text-[31px] leading-[1.05] ${
					isDark ? "text-white" : "text-[#2E4A3E]"
				}`}
			>
				{pkg.title}
			</h3>
			<p
				className={`mb-5 mt-3 text-[13px] font-light leading-[1.65] ${
					isDark ? "text-white/85" : "text-[#6B665F]"
				}`}
			>
				{pkg.description}
			</p>

			<ul className="mb-5 space-y-2">
				{pkg.features.map((feature) => (
					<li
						key={feature}
						className={`flex items-start gap-2.5 text-[13px] ${
							isDark ? "text-white" : "text-[#2E4A3E]"
						}`}
					>
						<CheckIcon dark={isDark} />
						<span>{feature}</span>
					</li>
				))}
			</ul>

			<div
				className={`text-[12px] ${isDark ? "text-white/80" : "text-[#6B665F]"}`}
			>
				<div
					className={`text-[10px] font-semibold uppercase tracking-[0.08em] ${
						isDark ? "text-[#E7D3B0]" : "text-[#867957]"
					}`}
				>
					Starting From
				</div>
				<span
					className={`text-[25px] font-semibold ${isDark ? "text-white" : "text-[#2E4A3E]"}`}
				>
					{pkg.price}
				</span>
				<span className="ml-2">per guest</span>
			</div>
		</article>
	);
}

export default function UmrahPackagesSection() {
	const [activePackageId, setActivePackageId] = useState("seerahPlus");
	const sectionRef = useRef(null);

	const handleSelectPackage = (packageId) => {
		setActivePackageId(packageId);
		const packageElement = document.getElementById(`pkg-${packageId}`);
		if (packageElement) {
			packageElement.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	const mashaerPackage = packages.find((pkg) => pkg.id === "seerahPlus");
	const secondaryPackages = packages.filter((pkg) => pkg.id !== "seerahPlus");

	return (
		<section
			id="umrah-packages"
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
						Choose Your Journey
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
					{secondaryPackages.map((pkg) => (
						<StandardPackageCard
							key={pkg.id}
							pkg={pkg}
							isActive={activePackageId === pkg.id}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
