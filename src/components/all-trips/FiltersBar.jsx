"use client";

import { useState, useEffect } from "react";
import {
	MapPin,
	Ticket,
	Clock,
	Calendar,
	Users,
	SlidersHorizontal,
	RotateCcw,
	ChevronDown,
	X,
	Star,
	Search,
} from "lucide-react";

export function FiltersBar({ totalResults, lang, filters, onFiltersChange }) {
	const isAr = lang === "ar";
	const [isScrolled, setIsScrolled] = useState(false);
	const [searchQuery, setSearchQuery] = useState(filters.search_text || "");

	useEffect(
		() => setSearchQuery(filters.search_text || ""),
		[filters.search_text]
	);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const hasActiveFilters = () => {
		const f = filters;
		return (
			(f.search_text && f.search_text.trim() !== "") ||
			!!f.city_id ||
			!!f.type ||
			!!f.duration ||
			f.rating != null ||
			f.start_price != null ||
			(f.seats && f.seats !== 1)
		);
	};

	const resetFilters = () => {
		onFiltersChange({
			search_text: "",
			city_id: null,
			type: null,
			duration: "",
			rating: null,
			start_price: null,
			seats: 1,
		});
		setSearchQuery("");
	};

	const clearFilter = (filterName) => {
		const next = {
			...filters,
			[filterName]:
				filterName === "seats"
					? 1
					: filterName === "rating"
					? null
					: filterName === "start_price"
					? null
					: filterName === "city_id" || filterName === "type"
					? null
					: "",
		};
		onFiltersChange(next);
	};

	return (
		<div className="bg-white border-b border-[#E2E8F0]">
			{/* Search Bar Section */}
			<div className="max-w-7xl mx-auto px-6 pt-6 pb-4">
				<div className="relative ">
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onBlur={() =>
							onFiltersChange({ ...filters, search_text: searchQuery })
						}
						placeholder={isAr ? "ابحث عن رحلة..." : "Search for a trip..."}
						className="w-full h-[50px] bg-white border border-[#E2E8F0] rounded-[28px] px-6 pl-14 text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0097A7] focus:border-transparent transition-all shadow-md"
					/>
					<div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
						<Search className="w-5 h-5 text-[#0097A7]" strokeWidth={2} />
					</div>
				</div>
			</div>

			{/* Filters Bar Section */}
			<div
				className={`sticky top-0 z-40 bg-white transition-all duration-300 `}
			>
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center gap-3 flex-wrap">
						{/* City (id-based) */}
						<FilterDropdown
							label={isAr ? "المدينة" : "City"}
							icon={<MapPin className="w-4 h-4" />}
							options={
								isAr
									? [
											{ id: 1, label: "مكة المكرمة" },
											{ id: 2, label: "المدينة المنورة" },
									  ]
									: [
											{ id: 1, label: "Mecca" },
											{ id: 2, label: "Medina" },
									  ]
							}
							value={filters.city_id}
							onChange={(id) => onFiltersChange({ ...filters, city_id: id })}
							onClear={() => clearFilter("city_id")}
						/>

						{/* Tour Type (id-based) */}
						<FilterDropdown
							label={isAr ? "نوع الجولة" : "Tour Type"}
							icon={<Ticket className="w-4 h-4" />}
							options={
								isAr
									? [
											{ id: 1, label: "الرحلات الإثرائية" },
											{ id: 2, label: "جولات الحرمين" },
											{ id: 3, label: "حافلة الجولات الإثرائية" },
									  ]
									: [
											{ id: 1, label: "Enriching Trips" },
											{ id: 2, label: "Haram Tours" },
											{ id: 3, label: "Enriching Trips Bus" },
									  ]
							}
							value={filters.type}
							onChange={(id) => onFiltersChange({ ...filters, type: id })}
							onClear={() => clearFilter("type")}
						/>

						{/* Start Price (min price) */}
						<StartPriceFilter
							value={filters.start_price}
							onChange={(val) =>
								onFiltersChange({ ...filters, start_price: val })
							}
							onClear={() => clearFilter("start_price")}
							isAr={isAr}
						/>

						{/* Duration (send ranges like "1-2", "2-3") */}
						<DurationFilter
							value={filters.duration}
							onChange={(val) => onFiltersChange({ ...filters, duration: val })}
							onClear={() => clearFilter("duration")}
							isAr={isAr}
						/>

						{/* Rating */}
						<RatingFilter
							value={filters.rating}
							onChange={(value) =>
								onFiltersChange({ ...filters, rating: value })
							}
							onClear={() => clearFilter("rating")}
							isAr={isAr}
						/>

						{/* Date (optional; not sent to API per provided query, keep local or remove) */}
						{/* <DateFilter
							value={filters.date || ""}
							onChange={(value) => onFiltersChange({ ...filters, date: value })}
							onClear={() => clearFilter("date")}
							isAr={isAr}
						/> */}

						{/* Guests -> seats */}
						<GuestsFilter
							value={filters.seats}
							onChange={(value) =>
								onFiltersChange({ ...filters, seats: value })
							}
							onClear={() => clearFilter("seats")}
							isAr={isAr}
						/>

						<div className="flex-1" />

						<button className="px-4 py-2 bg-[#F1F5F9] border border-[#CBD5E1] rounded-[14px] flex items-center gap-2 hover:bg-[#E2E8F0] transition-colors whitespace-nowrap">
							<span className="text-sm text-[#0F172A]">
								{isAr ? "تصفية متقدمة" : "Advanced Filters"}
							</span>
							<SlidersHorizontal className="w-4 h-4 text-[#006064]" />
						</button>

						{hasActiveFilters() && (
							<button
								onClick={resetFilters}
								className="px-4 py-2 flex items-center gap-2 text-[#0097A7] hover:bg-[#F1F5F9] rounded-[14px] transition-colors whitespace-nowrap"
							>
								<span
									className="text-sm"
									style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 500 }}
								>
									{isAr ? "إعادة التعيين" : "Reset"}
								</span>
								<RotateCcw className="w-4 h-4" />
							</button>
						)}
					</div>
				</div>

				{/* Results Counter */}
				<div className="max-w-7xl mx-auto px-6 py-2">
					<div className="inline-flex items-center bg-[#E0F7FA] rounded-[18px] px-4 py-1.5">
						<span
							className="text-sm text-[#006064]"
							style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 500 }}
						>
							{isAr ? "عدد النتائج: " : "Results Count: "}
							<span className="font-semibold">
								{totalResults} {isAr ? "رحلة" : "Trips"}
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

// Generic Dropdown now supports options with {id, label}
function FilterDropdown({ label, icon, options, value, onChange, onClear }) {
	const [isOpen, setIsOpen] = useState(false);
	const isActive = value != null;

	const selectedLabel = isActive
		? options.find((o) => o.id === value)?.label || label
		: label;

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`flex items-center gap-2 px-4 py-2.5 rounded-[16px] border transition-all whitespace-nowrap ${
					isActive
						? "bg-[#006064] text-white border-[#006064]"
						: "bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#0097A7]"
				}`}
			>
				<div className={isActive ? "text-white" : "text-[#006064]"}>
					{isActive ? (
						<X
							className="w-4 h-4"
							onClick={(e) => {
								e.stopPropagation();
								onClear();
							}}
						/>
					) : (
						icon
					)}
				</div>
				<span className="text-sm">{selectedLabel}</span>
				
				{!isActive && <ChevronDown className="w-4 h-4 text-[#475569]" />}
			</button>

			{isOpen && !isActive && (
				<>
					<div
						className="fixed inset-0 z-10"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute left-0 mt-2 md:w-44 bg-white rounded-xl shadow-lg border border-[#E2E8F0] py-2 z-20">
						{options.map((option) => (
							<button
								key={option.id}
								onClick={() => {
									onChange(option.id);
									setIsOpen(false);
								}}
								className="w-full px-4 py-2 hover:bg-[#F1F5F9] transition-colors text-sm text-[#0F172A]"
							>
								{option.label}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}

// Start Price (min price) Filter
function StartPriceFilter({ value, onChange, onClear, isAr }) {
	const [isOpen, setIsOpen] = useState(false);
	const [tempValue, setTempValue] = useState(value ?? 50);
	const isActive = value != null;

	useEffect(() => {
		if (value != null) setTempValue(value);
	}, [value]);

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`flex items-center gap-2 px-4 py-2.5 rounded-[16px] border transition-all whitespace-nowrap ${
					isActive
						? "bg-[#006064] text-white border-[#006064]"
						: "bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#0097A7]"
				}`}
			>
				<span className="text-sm">
					{isActive
						? `${value} ${isAr ? "ريال+" : "SAR+"}`
						: isAr
						? "الحد الأدنى للسعر"
						: "Start Price"}
				</span>
				{isActive ? (
					<X
						className="w-4 h-4"
						onClick={(e) => {
							e.stopPropagation();
							onClear();
						}}
					/>
				) : (
					<ChevronDown className="w-4 h-4 text-[#475569]" />
				)}
			</button>

			{isOpen && (
				<>
					<div
						className="fixed inset-0 z-10"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute left-0 mt-2 md:w-72 bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-6 z-20">
						<div
							className="text-center mb-4 text-sm text-[#006064]"
							style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 500 }}
						>
							{isAr ? "أقل سعر" : "Minimum price"}: {tempValue}{" "}
							{isAr ? "ريال" : "SAR"}
						</div>
						<input
							type="range"
							min="50"
							max="500"
							step="10"
							value={tempValue}
							onChange={(e) => setTempValue(parseInt(e.target.value))}
							className="w-full accent-[#0097A7]"
						/>
						<div className="flex justify-between text-xs text-[#475569] mt-2">
							<span>50</span>
							<span>500</span>
						</div>
						<button
							onClick={() => {
								onChange(tempValue);
								setIsOpen(false);
							}}
							className="w-full mt-4 px-4 py-2 bg-[#006064] text-white rounded-lg hover:bg-[#004d50] transition-colors"
						>
							{isAr ? "تطبيق" : "Apply"}
						</button>
					</div>
				</>
			)}
		</div>
	);
}

// Duration Filter with ranges like "1-2", "2-3"
function DurationFilter({ value, onChange, onClear, isAr }) {
	const [isOpen, setIsOpen] = useState(false);
	const isActive = !!value;

	const options = [
		{ val: "1-2", labelEn: "1–2 hours", labelAr: "1–2 ساعات" },
		{ val: "2-3", labelEn: "2–3 hours", labelAr: "2–3 ساعات" },
		{ val: "3-4", labelEn: "3–4 hours", labelAr: "3–4 ساعات" },
		{ val: "4-6", labelEn: "4–6 hours", labelAr: "4–6 ساعات" },
	];

	const currentLabel = value
		? (isAr
				? options.find((o) => o.val === value)?.labelAr
				: options.find((o) => o.val === value)?.labelEn) || value
		: isAr
		? "المدة"
		: "Duration";

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`flex items-center gap-2 px-4 py-2.5 rounded-[16px] border transition-all whitespace-nowrap ${
					isActive
						? "bg-[#006064] text-white border-[#006064]"
						: "bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#0097A7]"
				}`}
			>
				<Clock className="w-4 h-4 text-[#006064]" />
				<span className="text-sm">{currentLabel}</span>
				{isActive ? (
					<X
						className="w-4 h-4"
						onClick={(e) => {
							e.stopPropagation();
							onClear();
						}}
					/>
				) : (
					<>
						
						<ChevronDown className="w-4 h-4 text-[#475569]" />
					</>
				)}
			</button>

			{isOpen && !isActive && (
				<>
					<div
						className="fixed inset-0 z-10"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute left-0 mt-2 md:w-44 bg-white rounded-xl shadow-lg border border-[#E2E8F0] py-2 z-20">
						{options.map((opt) => (
							<button
								key={opt.val}
								onClick={() => {
									onChange(opt.val);
									setIsOpen(false);
								}}
								className="w-full px-4 py-2 hover:bg-[#F1F5F9] transition-colors text-sm text-[#0F172A]"
							>
								{isAr ? opt.labelAr : opt.labelEn}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}

// Rating Filter (unchanged behavior, maps to 'rating' param)
function RatingFilter({ value, onChange, onClear, isAr }) {
	const [isOpen, setIsOpen] = useState(false);
	const isActive = value !== null;
	const options = [4, 4.5, 5];

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`flex items-center gap-2 px-4 py-2.5 rounded-[16px] border transition-all whitespace-nowrap ${
					isActive
						? "bg-[#006064] text-white border-[#006064]"
						: "bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#0097A7]"
				}`}
			>
				{isActive ? null : (<Star className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" />) }
				<span className="text-sm">
					{isActive ? `${value}+ ⭐` : isAr ? "التقييم" : "Rating"}
				</span>
				{isActive ? (
					<X
						className="w-4 h-4"
						onClick={(e) => {
							e.stopPropagation();
							onClear();
						}}
					/>
				) : (
					<>
						
						<ChevronDown className="w-4 h-4 text-[#475569]" />
					</>
				)}
			</button>

			{isOpen && !isActive && (
				<>
					<div
						className="fixed inset-0 z-10"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute left-0 mt-2 md:w-40 bg-white rounded-xl shadow-lg border border-[#E2E8F0] py-2 z-20">
						{options.map((rating) => (
							<button
								key={rating}
								onClick={() => {
									onChange(rating);
									setIsOpen(false);
								}}
								className="w-full px-4 py-2 hover:bg-[#F1F5F9] transition-colors flex items-center justify-center gap-2"
							>
								<span className="text-sm text-[#0F172A]">{rating}+</span>
								<Star className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" />
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}

// Date Filter (optional UI-only)
// function DateFilter({ value, onChange, onClear, isAr }) {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const isActive = !!value;

// 	return (
// 		<div className="relative">
// 			<button
// 				onClick={() => setIsOpen(!isOpen)}
// 				className={`flex items-center gap-2 px-4 py-2.5 rounded-[16px] border transition-all whitespace-nowrap ${
// 					isActive
// 						? "bg-[#006064] text-white border-[#006064]"
// 						: "bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#0097A7]"
// 				}`}
// 			>
// 				<span className="text-sm">{value || (isAr ? "التاريخ" : "Date")}</span>
// 				<div className={isActive ? "text-white" : "text-[#0097A7]"}>
// 					{isActive ? (
// 						<X
// 							className="w-4 h-4"
// 							onClick={(e) => {
// 								e.stopPropagation();
// 								onClear();
// 							}}
// 						/>
// 					) : (
// 						<Calendar className="w-4 h-4" />
// 					)}
// 				</div>
// 				{!isActive && <ChevronDown className="w-4 h-4 text-[#475569]" />}
// 			</button>

// 			{isOpen && !isActive && (
// 				<>
// 					<div
// 						className="fixed inset-0 z-10"
// 						onClick={() => setIsOpen(false)}
// 					/>
// 					<div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-4 z-20">
// 						<input
// 							type="date"
// 							onChange={(e) => {
// 								onChange(e.target.value);
// 								setIsOpen(false);
// 							}}
// 							className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent"
// 						/>
// 					</div>
// 				</>
// 			)}
// 		</div>
// 	);
// }

// Guests -> seats
function GuestsFilter({ value, onChange, onClear, isAr }) {
	const [isOpen, setIsOpen] = useState(false);
	const [tempValue, setTempValue] = useState(value || 1);
	const isActive = (value || 1) !== 1;

	useEffect(() => {
		setTempValue(value || 1);
	}, [value]);

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`flex items-center gap-2 px-4 py-2.5 rounded-[16px] border transition-all whitespace-nowrap ${
					isActive
						? "bg-[#006064] text-white border-[#006064]"
						: "bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#0097A7]"
				}`}
			>
				<span className="text-sm">
					{isActive
						? `${value} ${isAr ? "أشخاص" : "people"}`
						: isAr
						? "عدد الأشخاص"
						: "Number of Guests"}
				</span>
				<div className={isActive ? "text-white" : "text-[#006064]"}>
					{isActive ? (
						<X
							className="w-4 h-4"
							onClick={(e) => {
								e.stopPropagation();
								onClear();
							}}
						/>
					) : (
						<Users className="w-4 h-4" />
					)}
				</div>
				{!isActive && <ChevronDown className="w-4 h-4 text-[#475569]" />}
			</button>

			{isOpen && (
				<>
					<div
						className="fixed inset-0 z-10"
						onClick={() => setIsOpen(false)}
					/>
					<div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-4 z-20">
						<div className="flex items-center justify-between mb-4">
							<button
								onClick={() => setTempValue(Math.max(1, tempValue - 1))}
								className="w-8 h-8 bg-[#F1F5F9] rounded-full flex items-center justify-center text-[#006064] hover:bg-[#E2E8F0]"
							>
								−
							</button>
							<span
								className="text-lg"
								style={{ fontFamily: "Tajawal, sans-serif", fontWeight: 500 }}
							>
								{tempValue}
							</span>
							<button
								onClick={() => setTempValue(Math.min(10, tempValue + 1))}
								className="w-8 h-8 bg-[#F1F5F9] rounded-full flex items-center justify-center text-[#006064] hover:bg-[#E2E8F0]"
							>
								+
							</button>
						</div>
						<button
							onClick={() => {
								onChange(tempValue);
								setIsOpen(false);
							}}
							className="w-full px-4 py-2 bg-[#006064] text-white rounded-lg hover:bg-[#004d50] transition-colors"
						>
							{isAr ? "تطبيق" : "Apply"}
						</button>
					</div>
				</>
			)}
		</div>
	);
}
