"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FullPackageCard } from "./FullPackageCard";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import Loading from "@/app/loading";
import styles from "./QuickCategories.module.css";
import { usePathname } from "next/navigation";

export default function FullPackageSection({ lang, isSaudi = true }) {
	const isAr = lang === "ar";
	const dummyData = [
		{
			id: 101,
			image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800",
			name: isAr ? "باقة مكة المكرمة الشاملة" : "Full Makkah Experience",
			city: isAr ? "مكة المكرمة" : "Makkah",
			short_description: isAr ? "استمتع برحلة متكاملة تشمل زيارة المشاعر المقدسة والمساجد التاريخية." : "Enjoy a complete journey including visits to holy sites and historical mosques.",
			start_price: 1200,
			duration: isAr ? "3 أيام" : "3 Days",
			is_available: true,
		},
		{
			id: 102,
			image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800",
			name: isAr ? "رحلة المدينة المنورة الإثرائية" : "Enriching Madinah Tour",
			city: isAr ? "المدينة المنورة" : "Madinah",
			short_description: isAr ? "اكتشف معالم المدينة المنورة وتاريخ المسجد النبوي الشريف." : "Discover the landmarks of Madinah and the history of Al-Masjid An-Nabawi.",
			start_price: 950,
			duration: isAr ? "2 يوم" : "2 Days",
			is_available: true,
		},
		{
			id: 103,
			image: "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?w=800",
			name: isAr ? "باقة مزار الذهبية" : "Mzar Golden Package",
			city: isAr ? "مكة والمدينة" : "Makkah & Madinah",
			short_description: isAr ? "تجربة فاخرة تجمع بين روحانية مكة وجمال المدينة المنورة." : "A luxury experience combining the spirituality of Makkah and the beauty of Madinah.",
			start_price: 2500,
			duration: isAr ? "5 أيام" : "5 Days",
			is_available: true,
		},
		{
			id: 104,
			image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
			name: isAr ? "جولة المعالم الإسلامية" : "Islamic Landmarks Tour",
			city: isAr ? "جدة ومكة" : "Jeddah & Makkah",
			short_description: isAr ? "رحلة عبر الزمن لاستكشاف الجذور العميقة للتاريخ الإسلامي." : "A journey through time to explore the deep roots of Islamic history.",
			start_price: 800,
			duration: isAr ? "1 يوم" : "1 Day",
			is_available: false,
		},
	];

	const [data, setData] = useState(dummyData);
	const [loading, setLoading] = useState(false);
	const pathname = usePathname();
	// const showLink = !(
	// 	pathname === "/all-trips" || pathname?.startsWith("/all-trips/")
	// );

	// useEffect(() => {
	// 	const fetchPackages = async () => {
	// 		try {
	// 			const res = await fetch(
	// 				`${API_BASE_URL_NEW}/landing/home/ramadan-packages`,
	// 				{
	// 					headers: { lang },
	// 				},
	// 			);
	// 			const json = await res.json();
	// 			if (json?.data) {
	// 				setData(json.data);
	// 			}
	// 		} catch (error) {
	// 			console.error("Failed to fetch Ramadan packages", error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchPackages();
	// }, []);

	if (loading) {
		return <Loading />;
	}

	if (!data || data.length === 0) return null;

	return (
		<section className="py-10 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
					<div>
						<div className="text-[#867957] text-sm font-bold mb-3 flex items-center gap-3">
							<span className="w-10 h-[2px] bg-[#867957]"></span>
							{isAr ? "اكتشف تجاربنا الكاملة" : "Discover our full experiences"}
						</div>
						<h2 className="text-3xl md:text-4xl font-bold text-[#004B40]">
							{isAr
								? " تجاربنا المميزة"
								: "Our Premium Packages"}
						</h2>
					</div>

					{/* {showLink && (
						<Link
							href="/all-trips"
							className="text-[#004B40] font-bold flex items-center gap-2 hover:text-[#867957] transition-colors"
						>
							{isAr ? "عرض كافة التجارب" : "View all experiences"}
							{isAr ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
						</Link>
					)} */}
				</div>

				{/* Tours Slider */}
				<Swiper
					modules={[Autoplay]}
					autoplay={{
						delay: 3500,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					loop={data.length > 3}
					spaceBetween={24}
					slidesPerView={1.1}
					breakpoints={{
						640: { slidesPerView: 1.2 },
						768: { slidesPerView: 2.2 },
						1024: { slidesPerView: 3 },
					}}
					className={`pb-4 ${styles.quickCategories}`}
				>
					{data.map((tour, index) => (
						<SwiperSlide key={tour.id ?? index} className="h-auto">
							<FullPackageCard {...tour} isAr={isAr} isSaudi={isSaudi} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
