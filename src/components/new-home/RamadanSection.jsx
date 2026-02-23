"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { RamadanCard } from "./RamadanCard";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import Loading from "@/app/loading";
import styles from "./QuickCategories.module.css";
import { usePathname } from "next/navigation";

export default function RamadanSection({ lang, isSaudi = true }) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const isAr = lang === "ar";
	const pathname = usePathname();
	const showLink = !(
		pathname === "/all-trips" || pathname?.startsWith("/all-trips/")
	);

	useEffect(() => {
		const fetchRamadanPackages = async () => {
			try {
				const res = await fetch(
					`${API_BASE_URL_NEW}/landing/home/ramadan-packages`,
					{
						headers: { lang },
					},
				);
				const json = await res.json();
				if (json?.data) {
					setData(json.data);
				}
			} catch (error) {
				console.error("Failed to fetch Ramadan packages", error);
			} finally {
				setLoading(false);
			}
		};

		fetchRamadanPackages();
	}, []);

	if (loading) {
		return <Loading />;
	}

	if (!data || data.length === 0) return null;

	return (
		<section className="py-10 bg-[#FAFAFA]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
					<div>
						<div className="text-[#867957] text-sm font-bold mb-3 flex items-center gap-3">
							<span className="w-10 h-[2px] bg-[#867957]"></span>
							{isAr ? "اكتشف تجاربنا" : "Discover our experiences"}
						</div>
						<h2 className="text-3xl md:text-4xl font-bold text-[#004B40]">
							{isAr
								? "تجارب ليالي رمضان "
								: "Ramadan Nights Experiences"}
						</h2>
					</div>

					{showLink && (
						<Link
							href="/all-trips"
							className="text-[#004B40] font-bold flex items-center gap-2 hover:text-[#867957] transition-colors"
						>
							{isAr ? "عرض كافة التجارب" : "View all experiences"}
							{isAr ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
						</Link>
					)}
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
							<RamadanCard {...tour} isAr={isAr} isSaudi={isSaudi} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
