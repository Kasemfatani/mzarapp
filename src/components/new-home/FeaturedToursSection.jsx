"use client";

import { Search, ChevronDown, Calendar, SlidersHorizontal } from "lucide-react";
import { FeaturedToursCard } from "./FeaturedToursCard";
import { useState } from "react";
import Link from "next/link";

export default function FeaturedToursSection({ lang }) {
	const [showAll, setShowAll] = useState(false);

	const isAr = lang === "ar";

	const tours = [
		{
			image:
				"https://images.unsplash.com/photo-1720549973451-018d3623b55a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWFiYSUyMG1ha2thaCUyMG1hc2ppZHxlbnwxfHx8fDE3NjQ0OTUzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
			title: isAr
				? "جولة المسجد الحرام الشاملة"
				: "Comprehensive Masjid al-Haram Tour",
			location: isAr ? "مكة المكرمة" : "Mecca",
			description: isAr
				? "استكشف تاريخ وعمارة المسجد الحرام مع مرشد متخصص، وتعرف على أهم المعالم التاريخية والدينية"
				: "Explore the history and architecture of Masjid al-Haram with a specialized guide, and learn about the most important historical and religious landmarks",
			price: "199",
			rating: 5,
			reviews: 342,
			duration: 4,
			groupSize: 15,
			isPopular: true,
		},
		{
			image:
				"https://images.unsplash.com/photo-1689333532270-7849d33de8aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWRpbmFoJTIwbW9zcXVlJTIwbmFiYXdpfGVufDF8fHx8MTc2NDQ5NTM3NHww&ixlib=rb-4.1.0&q=80&w=1080",
			title: isAr
				? "جولة المسجد النبوي والمعالم التاريخية"
				: "Prophetic Mosque and Historical Sites Tour",
			location: isAr ? "المدينة المنورة" : "Medina",
			description: isAr
				? "زيارة المسجد النبوي الشريف والتعرف على السيرة النبوية من خلال المواقع التاريخية"
				: "Visit the Prophet's Mosque and learn about the prophetic biography through historical sites",
			price: "179",
			rating: 5,
			reviews: 287,
			duration: 5,
			groupSize: 20,
			isPopular: true,
		},
		{
			image:
				"https://images.unsplash.com/photo-1761475878231-32efb0aeff5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBwaWxncmltYWdlJTIwam91cm5leXxlbnwxfHx8fDE3NjQ0OTUzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
			title: isAr
				? "رحلة المعالم الدينية الكاملة"
				: "Complete Religious Sites Tour",
			location: isAr ? "مكة المكرمة" : "Mecca",
			description: isAr
				? "جولة شاملة تشمل غار حراء، جبل النور، مسجد التنعيم وأهم المواقع الإسلامية"
				: "A comprehensive tour including Cave of Hira, Mount Noor, Masjid Al-Taneem, and important Islamic sites",
			price: "249",
			rating: 5,
			reviews: 521,
			duration: 7,
			groupSize: 12,
			isPopular: false,
		},
		{
			image:
				"https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtY2F0ZWdvcnklMjBtb3NxdWUlMjB0b3VyaXN0cyUyMG5hYmF3YXxlbnwxfHx8fDE3NjQ0OTUzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
			title: isAr ? "جولة جبل أحد" : "Mount Uhud Tour",
			location: isAr ? "المدينة المنورة" : "Medina",
			description: isAr
				? "زيارة جبل أحد والتعرف على أحداث غزوة أحد التاريخية مع مرشد متخصص"
				: "Visit Mount Uhud and learn about the historical events of the Battle of Uhud with a specialized guide",
			price: "159",
			rating: 4,
			reviews: 210,
			duration: 3,
			groupSize: 18,
			isPopular: false,
		},
		{
			image:
				"https://images.unsplash.com/photo-1465101046530-73398c7f28ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtY2F0ZWdvciUyMG1vc3F1ZSUyMG5hYmF3YXxlbnwxfHx8fDE3NjQ0OTUzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
			title: isAr ? "جولة مسجد قباء" : "Quba Mosque Tour",
			location: isAr ? "المدينة المنورة" : "Medina",
			description: isAr
				? "زيارة أول مسجد بني في الإسلام والتعرف على تاريخه وأهميته الدينية"
				: "Visit the first mosque built in Islam and learn about its history and religious significance",
			price: "129",
			rating: 4,
			reviews: 180,
			duration: 2,
			groupSize: 25,
			isPopular: false,
		},
		{
			image:
				"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtY2F0ZWdvciUyMG1vc3F1ZSUyMG5hYmF3YXxlbnwxfHx8fDE3NjQ0OTUzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
			title: isAr ? "جولة معالم مكة القديمة" : "Old Mecca Landmarks Tour",
			location: isAr ? "مكة المكرمة" : "Mecca",
			description: isAr
				? "استكشاف معالم مكة القديمة والأسواق التاريخية مع مرشد محلي"
				: "Explore the old landmarks of Mecca and historical markets with a local guide",
			price: "189",
			rating: 5,
			reviews: 300,
			duration: 5,
			groupSize: 10,
			isPopular: false,
		},
	];

	const displayedTours = showAll ? tours : tours.slice(0, 3);

	return (
		<section className="py-20 bg-gradient-to-b from-white to-[#E7D3AF]/10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12">
					<h2 className="text-[#3C6652] mb-3 font-bold">
						{isAr ? "اختر تجربتك  المفضلة" : "Choose Your Preferred Experience"}
					</h2>
					<p className="text-gray-600 text-xl">
						{isAr
							? "تجارب مصممة بعناية لتثري تجربة زيارتك إلى مكة المكرمة والمدينة المنورة "
							: "Carefully designed experiences that enrich your visit to Makkah Al-Mukarramah and Al-Madinah Al-Munawwarah"}
					</p>
				</div>

				{/* Tours Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{displayedTours.map((tour, index) => (
						<FeaturedToursCard key={index} {...tour} isAr={isAr} />
					))}
				</div>

				{/* View All Button */}
				{!showAll && (
					<div className="text-center mt-12">
						<Link
							href="/all-trips"
							className="bg-white border-2 border-[#867957] text-[#867957] px-12 py-4 rounded-xl hover:bg-[#867957] hover:text-white transition-all shadow-md hover:shadow-lg inline-block"
						>
							{isAr ? "عرض جميع التجارب" : "View All Experiences"}
						</Link>
					</div>
				)}
			</div>
		</section>
	);
}
