// src/components/package-detail/mockData.js
export function getPackageDetailMockData(isAr = false) {
	const t = isAr
		? {
				badge: "توفر محدود",
				title: "الخلوة الروحانية التنفيذية",
				duration: "12 يومًا",
				rating: "4.9 تقييم",
				group: "الحد الأقصى 15 شخصًا",
				descriptionTitle: "التجربة",
				description:
					"عِش تجربة عمرة تجمع بين السكينة والراحة الراقية. صُممت هذه الرحلة بعناية لتمنحك وقتًا أعمق للتعبد مع خدمات ضيافة متكاملة وإرشاد موثوق.",
				includedExperiences: "التجارب المشمولة",
				timelineTitle: "الجدول الزمني",
				accommodationsTitle: "الإقامة الفاخرة",
				featuresTitle: "ما يشمله العرض",
				startingFrom: "ابتداءً من",
				perPerson: "للشخص",
				allInclusive: "شامل بالكامل",
				basePackage: "الباقة الأساسية",
				luxurySurcharge: "إضافة الفخامة",
				taxesFees: "الضرائب والرسوم",
				included: "مشمول",
				bookNow: "احجز الباقة الآن",
				noCard: "لا حاجة إلى بطاقة ائتمان للحجز المبدئي. المقاعد محدودة.",
				totalPrice: "السعر الإجمالي",
				day: "اليوم",
				availabilityNote: "مقاعد محدودة للموسم القادم",
			}
		: {
				badge: "Limited Availability",
				title: "Executive Spiritual Retreat",
				duration: "12 Days",
				rating: "4.9 Rating",
				group: "Max 15 people",
				descriptionTitle: "The Experience",
				description:
					"Experience Umrah with unparalleled serenity. This curated retreat combines spiritual devotion with premium concierge service, ensuring every detail of your journey is handled with grace.",
				includedExperiences: "Included Experiences",
				timelineTitle: "Journey Timeline",
				accommodationsTitle: "Luxury Accommodations",
				featuresTitle: "What's Included",
				startingFrom: "Starting from",
				perPerson: "per person",
				allInclusive: "All Inclusive",
				basePackage: "Base Package",
				luxurySurcharge: "Luxury Surcharge",
				taxesFees: "Taxes & Fees",
				included: "Included",
				bookNow: "Book Package Now",
				noCard: "No credit card required to reserve. Limited spots available.",
				totalPrice: "Total Price",
				day: "Day",
				availabilityNote: "Limited spots for the upcoming season",
			};

	return {
		t,
		price: 3450,
		heroImage:
			"https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1600&auto=format&fit=crop",
		experiences: [
			{
				id: 1,
				title: isAr ? "جولة الحرم" : "Haram Tour",
				description: isAr
					? "جولة خاصة بإرشاد متخصص داخل نطاق الحرم."
					: "Private guided walk through key Haram landmarks.",
				image:
					"https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1200&auto=format&fit=crop",
			},
			{
				id: 2,
				title: isAr ? "الزيارات التاريخية" : "Ziyarat",
				description: isAr
					? "زيارة مواقع تاريخية مختارة في مكة والمدينة."
					: "Curated historical site visits in Makkah and Madinah.",
				image:
					"https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1200&auto=format&fit=crop",
			},
			{
				id: 3,
				title: isAr ? "جلسات روحانية" : "Spiritual Sessions",
				description: isAr
					? "جلسات إيمانية يومية مع وقت للتأمل الشخصي."
					: "Daily guided reflections with dedicated personal devotion time.",
				image:
					"https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1200&auto=format&fit=crop",
			},
			{
				id: 4,
				title: isAr ? "تنقلات خاصة" : "Private Transfers",
				description: isAr
					? "تنقلات مريحة ومخططة طوال مدة الرحلة."
					: "Comfort-first private transfers across the itinerary.",
				image:
					"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
			},
		],
		timeline: [
			{
				id: "01",
				title: isAr ? "الوصول والترحيب" : "Arrival & Welcome",
				description: isAr
					? "استقبال خاص في جدة ثم انتقال إلى الفندق مع جلسة تعريفية."
					: "VIP arrival in Jeddah with private transfer and welcome briefing.",
			},
			{
				id: "02-05",
				title: isAr ? "تجربة مكة" : "Makkah Experience",
				description: isAr
					? "أداء العمرة بإرشاد يومي مع برامج إيمانية."
					: "Guided Umrah rites with daily spiritual programming.",
			},
			{
				id: "06",
				title: isAr ? "الانتقال إلى المدينة" : "Journey to Madinah",
				description: isAr
					? "رحلة قطار الحرمين السريع ثم تسجيل دخول الفندق."
					: "Haramain high-speed rail transfer and hotel check-in.",
			},
		],
		accommodations: [
			{
				id: 1,
				name: "Conrad Makkah",
				subtitle: isAr ? "إطلالة مباشرة على الحرم" : "Haram Front View Suite",
				image:
					"https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
			},
			{
				id: 2,
				name: "The Oberoi Madinah",
				subtitle: isAr
					? "موقع قريب من المسجد النبوي"
					: "Prophetic Mosque Proximity",
				image:
					"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop",
			},
		],
		features: [
			{
				id: 1,
				label: isAr ? "إفطار يومي" : "Daily Breakfast",
				icon: "restaurant",
			},
			{ id: 2, label: isAr ? "واي فاي مجاني" : "Free WiFi", icon: "wifi" },
			{ id: 3, label: isAr ? "مرشد محلي" : "Local Guide", icon: "mapPin" },
			{ id: 4, label: isAr ? "تأمين سفر" : "Travel Insurance", icon: "shield" },
			{
				id: 5,
				label: isAr ? "تذاكر مشمولة" : "Tickets Included",
				icon: "ticket",
			},
			{
				id: 6,
				label: isAr ? "إضافات اختيارية" : "Experience Add-ons",
				icon: "plusCircle",
			},
		],
	};
}
