"use client";


import HeroSection from "@/components/all-trips/HeroSection";
import { FiltersBar } from "@/components/all-trips/FiltersBar";
import { TripsGrid } from "@/components/all-trips/TripsGrid";
import { SeoContent } from "@/components/all-trips/SeoContent";
import { useEffect, useMemo, useState } from "react";


const ALL_TRIPS = (isAr) => [
  {
    id: 45,
    title: isAr ? 'تجربة زيارة المشاعر المقدسة ' : 'Holy Sites Visit Experience ',
    description: isAr ? 'جولة إيمانية عبر المشاعر المقدسة ابتداءً من عرفات مروراً بمزدلفة ومن ثم منى وانتهاءً بجبل النور' : 'Faithful tour through the holy sites starting from Arafat, passing through Muzdalifah, then Mina, and ending at Jabal al-Nour',
    image: 'https://images.unsplash.com/photo-1676200928665-8b97df7ab979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZWNjYSUyMHBpbGdyaW1hZ2V8ZW58MXx8fHwxNzY0NzU0MTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'مكة المكرمة' : 'Mecca',
    badge: isAr ? 'الأكثر طلبًا' : 'Most Popular',
    capacity: 45,
    duration: isAr ? " 4 ساعات" :  "4 hours",
    rating: 4.7,
    reviewCount: 512,
    price:  89,
  },
  {
    id: 2,
    title:  isAr ? 'تجربة زيارة بداية الوحي' : 'Revelation Beginning Visit Experience',
    description: isAr ? 'جولة تاريخية وإثرائية نتقفى فيها أثر رسول الله ﷺ في مهبط الوحي الأول ' : 'A historical and enriching tour tracing the footsteps of the Prophet Muhammad (PBUH) at the site of the first revelation',
    image: 'https://images.unsplash.com/photo-1667454872134-c25973237138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZWRpbmElMjBtb3NxdWV8ZW58MXx8fHwxNzY0NzU0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'المدينة المنورة' : 'Medina',
    badge: isAr ? 'متاح هذا الأسبوع' : 'Available This Week',
    capacity: 45,
    duration: isAr ? "3 ساعات" : "3 hours",
    rating: 4.7,
    reviewCount: 387,
    price: 89,
  },
  {
    id: 47,
    title:  isAr ? 'تجربة زيارة معالم وادي ذي طوى' : 'Wadi Thuwwa Landmarks Visit Experience',
    description: isAr ? 'تجربة فريدة لاستكشاف جمال الصحراء العربية مع مرشد محلي' : 'A unique experience to explore the beauty of the Arabian desert with a local guide',
    image: 'https://images.unsplash.com/photo-1547235001-d703406d3f17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY0Njk4ODU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'مكة المكرمة' : 'Mecca',
    capacity: 45,
    duration: isAr ? "4 ساعات" : "4 hours",
    rating: 4.5,
    reviewCount: 234,
    price: 89,
  },
  {
    id: 4,
    title: isAr ? 'تجربة زيارة دروب الهجرة الأولى' : 'First Migration Routes Visit Experience',
    description: isAr ? 'جولة تاريخية إلى دار الهجرة الأول حيث نزل رسول الله ﷺ في المدينة المنورة' : 'A historical tour to the first migration house where the Prophet Muhammad (PBUH) settled in Medina',
    image: 'https://images.unsplash.com/photo-1575379972263-2f15a5c78236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGNpdHklMjB0b3VyfGVufDF8fHx8MTc2NDc1NDE4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'المدينة المنورة' : 'Medina',
    badge: isAr ? 'الأكثر طلبًا' : 'Most Popular',
    capacity: 45,
    duration: isAr ? " ساعتين و 5 دقائق" : "2 hours and 5 minutes",
    rating: 4.8,
    reviewCount: 678,
    price: 89,
  },
  {
    id: 74,
    title: isAr ? 'تجربة زيارة آثار غزوة أحد ' : 'Uhud Battle Sites Visit Experience',
    description: isAr ? 'جولة تاريخية إلى موقع غزوة أُحد، إحدى أهم غزوات النبي ﷺ وموقع استشهاد سيد الشهداء حمزة بن عبدالمطلب' : 'A historical tour to the site of the Battle of Uhud, one of the most important battles of the Prophet (PBUH) and the site of the martyrdom of the Master of Martyrs, Hamza ibn Abdul-Muttalib',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMHRyYXZlbHxlbnwxfHx8fDE3NjQ3NTQxODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'المدينة المنورة' : 'Medina',
    capacity: 45,
    duration: isAr ? "3 ساعات" : "3 hours",
    rating: 4.8,
    reviewCount: 445,
    price: 89,
  },
  ///still did not complete
  {
    id: 6,
    title:  isAr ? 'التجربة المتكاملة لاستكشاف مكة' : 'Comprehensive Mecca Exploration Experience',
    description: isAr ? 'رحلة تاريخية تشمل زيارة جميع معالم مكة المكرمة التاريخية والإثرائية وجولة إثرائية داخل المسجد الحرام' : 'A historical journey that includes visiting all the historical and enriching landmarks of Mecca and an enriching tour inside the Grand Mosque',
    image: 'https://images.unsplash.com/photo-1724398915427-edc535c546fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGhlcml0YWdlfGVufDF8fHx8MTc2NDc1NDE4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'مكة المكرمة' : 'Mecca',
    badge: isAr ? 'متاح هذا الأسبوع' : 'Available This Week',
    capacity: 10,
    duration: isAr ? "5 ساعات" : "5 hours",
    rating: 4.8,
    reviewCount: 289,
    price: 399,
  },
  ///still did not complete
  {
    id: 7,
    title:  isAr ? 'التجربة المتكاملة لاستكشاف المدينة' : 'Comprehensive Medina Exploration Experience',
    description: isAr ? 'رحلة تاريخية تشمل زيارة جميع معالم المدينة المنورة التاريخية والإثرائية وجولة إثرائية داخل المسجد النبوي' : 'A historical journey that includes visiting all the historical and enriching landmarks of Medina and an enriching tour inside the Prophet’s Mosque',
    image: 'https://images.unsplash.com/photo-1724398915427-edc535c546fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGhlcml0YWdlfGVufDF8fHx8MTc2NDc1NDE4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'المدينة المنورة' : 'Medina',
    badge: isAr ? 'متاح هذا الأسبوع' : 'Available This Week',
    capacity: 10,
    duration: isAr ? "5 ساعات" : "5 hours",
    rating: 4.8,
    reviewCount: 289,
    price: 299,
  },
  {
    id: 8,
    title:  isAr ? 'تجربة إثرائية داخل المسجد الحرام' : 'Enriching Experience Inside the Grand Mosque',
    description: isAr ? 'جولة نقف فيها أمام الكعبة المشرفة للتعرف على تاريخ بنائها ونزور فيها أهم معالم المسجد الحرام التاريخية' : 'A tour where we stand before the Holy Kaaba to learn about its construction history and visit the most important historical landmarks of the Grand Mosque',
    image: 'https://images.unsplash.com/photo-1724398915427-edc535c546fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGhlcml0YWdlfGVufDF8fHx8MTc2NDc1NDE4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'مكة المكرمة' : 'Mecca',
    badge: isAr ? 'متاح هذا الأسبوع' : 'Available This Week',
    capacity: 20,
    duration: isAr ? "90 دقيقة" : "90 minutes",
    rating: 4.9,
    reviewCount: 289,
    price: 99,
  },
  {
    id: 9,
    title:  isAr ? 'تجربة إثرائية داخل المسجد النبوي ' : 'Enriching Experience Inside the Prophet’s Mosque',
    description: isAr ? 'جولة نتعرف فيها على أبرز معالم المسجد النبوي الشريف حيث عبق السيرة النبوية' : 'A tour where we learn about the most prominent landmarks of the Noble Prophet’s Mosque, where the fragrance of the prophetic biography lingers',
    image: 'https://images.unsplash.com/photo-1724398915427-edc535c546fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGhlcml0YWdlfGVufDF8fHx8MTc2NDc1NDE4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'المدينة المنورة' : 'Medina',
    badge: isAr ? 'متاح هذا الأسبوع' : 'Available This Week',
    capacity: 20,
    duration: isAr ? "90 دقيقة" : "90 minutes",
    rating: 4.9,
    reviewCount: 289,
    price: 99,
  },
  {
    id: 10,
    title:  isAr ? 'تجربة زيارة معالم مكة في رحلة تشاركية' : 'Shared Mecca Landmarks Visit Experience',
    description: isAr ? 'استكشف معالم مكة المكرمة مع حافلة الجولات الإثرائية بشكل آمن ومريح' : 'Explore the landmarks of Mecca with the enriching tours bus in a safe and comfortable way',
    image: 'https://images.unsplash.com/photo-1724398915427-edc535c546fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGhlcml0YWdlfGVufDF8fHx8MTc2NDc1NDE4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'مكة المكرمة' : 'Mecca',
    badge: isAr ? 'متاح هذا الأسبوع' : 'Available This Week',
    capacity: 45,
    duration: isAr ? "2 ساعات" : "2 hours",
    rating: 4.8,
    reviewCount: 289,
    price: 69,
  },
  {
    id: 11,
    title:  isAr ? 'تجربة بإطلالة مهيبة على الحرم المكي ' : 'Majestic View Experience of the Grand Mosque',
    description: isAr ? 'جولة زيارة متحف الساعة والشرفة ومعرض السيرة النبوية في برج الساعة' : 'A tour visiting the Clock Museum, the balcony, and the Prophetic Biography Exhibition in the Clock Tower',
    image: 'https://images.unsplash.com/photo-1724398915427-edc535c546fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGhlcml0YWdlfGVufDF8fHx8MTc2NDc1NDE4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'مكة المكرمة' : 'Mecca',
    
    capacity: 20,
    duration: isAr ? "5 ساعات" : "5 hours",
    rating: 4.8,
    reviewCount: 289,
    price: 309,
  },
];

export default function TourPage({ lang }) {

	const isAr = lang === "ar";

	// Client-side only state (Next 13/14 pages run server-first; gate with useEffect if needed)
	const [filters, setFilters] = useState({
		searchQuery: "",
		city: "",
		tourType: "",
		priceRange: [50, 500],
		duration: "",
		rating: null,
		date: "",
		guests: 1,
	});

	// Load initial filters from URL (optional)
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const parseNum = (v) => (v ? Number(v) : undefined);
		setFilters((prev) => ({
			...prev,
			searchQuery: params.get("q") || "",
			city: params.get("city") || "",
			tourType: params.get("type") || "",
			priceRange: [
				parseNum(params.get("min")) ?? 50,
				parseNum(params.get("max")) ?? 500,
			],
			duration: params.get("dur") || "",
			rating: params.get("rating") ? Number(params.get("rating")) : null,
			date: params.get("date") || "",
			guests: params.get("guests") ? Number(params.get("guests")) : 1,
		}));
	}, []);

	// Update URL when filters change (optional)
	useEffect(() => {
		const params = new URLSearchParams();
		if (filters.searchQuery) params.set("q", filters.searchQuery);
		if (filters.city) params.set("city", filters.city);
		if (filters.tourType) params.set("type", filters.tourType);
		if (filters.priceRange[0] !== 50)
			params.set("min", String(filters.priceRange[0]));
		if (filters.priceRange[1] !== 500)
			params.set("max", String(filters.priceRange[1]));
		if (filters.duration) params.set("dur", filters.duration);
		if (filters.rating != null) params.set("rating", String(filters.rating));
		if (filters.date) params.set("date", filters.date);
		if (filters.guests !== 1) params.set("guests", String(filters.guests));
		const next = `${window.location.pathname}?${params.toString()}`;
		window.history.replaceState({}, "", next);
	}, [filters]);

	const allTrips = useMemo(() => ALL_TRIPS(isAr), [lang]);

	// Filtering logic
	const filteredTrips = useMemo(() => {
		const q = filters.searchQuery.trim().toLowerCase();
		return allTrips.filter((t) => {
			const matchesSearch =
				!q ||
				t.title.toLowerCase().includes(q) ||
				t.description.toLowerCase().includes(q) ||
				t.city.toLowerCase().includes(q);

			const inCity = !filters.city || t.city === filters.city;
			const inType =
				!filters.tourType || (t.type ? t.type === filters.tourType : true);
			const inPrice =
				t.price >= filters.priceRange[0] && t.price <= filters.priceRange[1];

			const inDuration =
				!filters.duration || t.duration.includes(filters.duration);
			const inRating = filters.rating == null || t.rating >= filters.rating;
			const dateOk = !filters.date || true; // if trips have date, compare here
			const guestsOk =
				!filters.guests || (t.capacity ? t.capacity >= filters.guests : true);

			return (
				matchesSearch &&
				inCity &&
				inType &&
				inPrice &&
				inDuration &&
				inRating &&
				dateOk &&
				guestsOk
			);
		});
	}, [allTrips, filters]);

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<HeroSection lang={lang} />
			<FiltersBar
				totalResults={filteredTrips.length}
				lang={lang}
				filters={filters}
				onFiltersChange={setFilters}
			/>
			<TripsGrid lang={lang} trips={filteredTrips} />
			<SeoContent lang={lang} />
		</div>
	);
}
