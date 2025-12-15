
export default function getRevelation(isAr) {
	return {
		id: 2,
		title: isAr
			? "تجربة زيارة بداية الوحي "
			: "Revelation Beginning Visit Experience",
		description: isAr
			? "مسار حراء رحلة إيمانية تاريخية، نتقفى فيها أثر رسول الله ﷺ من جبل ثور منطلق الهجرة حتى موطن النور ونزول القرآن. "
			: "Hira Path is a spiritual and historical journey, tracing the footsteps of the Messenger of Allah ﷺ from Mount Thawr, the starting point of the migration, to the abode of light and the revelation of the Quran.",
		image: "/trip-detail/water-bottles.webp",
		capacity: 45,
		duration: isAr ? " ساعتان و 30 دقيقة" : "2 hours and 30 minutes",
		rating: 4.7,
		reviewCount: 512,
		price: 89,
		availability: isAr ? "متاحة يومياً" : "Available daily",
		times: isAr ? " 6:00 ص - 5:00 م" : " 6:00 AM - 5:00 PM",
		meetingPoint: "-",
		highlights: [
			{
				icon: "map-pin",
				title: isAr ? "نقطة الانطلاق" : "Starting Point",
				detail: isAr
					? "السائق يصل إلى موقعك في أي مكان"
					: "Driver arrives at your location anywhere",
			},
			{
				icon: "compass",
				title: isAr ? "تحقق ذكي " : "Smart Tracking",
				detail: isAr
					? "تحقق من الوصول للوجهة تلقائياً"
					: "Smart destination arrival verification",
			},
			{
				icon: "globe",
				title: isAr ? "محتوى بعدة لغات" : "Multilingual Content",
				detail: isAr
					? "محتوى إثرائي متوفر ب6 لغات عالمية"
					: "Enriching content available in 6 global languages",
			},
			{
				icon: "calendar",
				title: isAr ? "حجز مرن" : "Flexible Booking",
				detail: isAr
					? "إلغاء مجاني حتى 24 ساعة قبل الموعد"
					: "Free cancellation up to 24 hours before the appointment",
			},
			{
				icon: "shield",
				title: isAr ? "روايات موثوقة" : "Trusted Narrations",
				detail: isAr
					? "قصص إثرائية معتمدة تُحكى لأول مرة"
					: "Accredited enriching stories told for the first time",
			},
		],
		about: {
			desc: isAr
				? "نأخذكم في رحلة تاريخية وإثرائية، نتقفى فيها أثر رسول الله ﷺ من منطلق الهجرة جبل ثور حتى موطن النور ونزول القرآن بجبل حراء. "
				: "We take you on a historical and enriching journey, tracing the footsteps of the Messenger of Allah ﷺ from the starting point of the migration, Mount Thawr, to the abode of light and the revelation of the Quran at Mount Hira.",
			list: isAr
				? [
						"جبل ثور ــ الجبل الذي آوى النبي ﷺ وصاحبه أبو بكر رضي الله عنه في الغار ثلاث ليالٍ أثناء الهجرة.",
						"مسجد البيعة ــ حيث بايع الأنصار النبي ﷺ بيعتي العقبة الأولى والثانية.",
						"وادي إبراهيم عليه السلام ــ وادٍ مبارك ارتبط بسيرة خليل الله إبراهيم وماء زمزم.",
						"جبل النور وغار حراء ــ حيث نزل الوحي لأول مرة وبدأت الرسالة. ",
						"وفي نهاية الرحلة يمكنكم زيارة حي حراء الثقافي والاستمتاع بجولة معرفية وإثرائية بين جنبات متاحفه.",
            "في هذه الرحلة نمزج بين مشاعر القلوب، وتجسيد الحاضر، وإثراء التجربة. ",
				  ]
				: [
						"Mount Thawr — The mountain that the Prophet ﷺ and his companion Abu Bakr (may Allah be pleased with him) took refuge in the cave for three nights during the migration.",
						"Masjid al-Bay'ah — Where the Ansar pledged allegiance to the Prophet ﷺ in the first and second pledges of Aqabah.",
						"Wadi Ibrahim — A blessed valley associated with the story of the Friend of Allah Ibrahim and the Zamzam water.",
						"Jabal al-Noor and Hira Cave — Where the revelation first descended and the message began.",
						"At the end of the journey, you can visit the cultural district of Hira and enjoy an informative and enriching tour among its museums.",
						"In this journey, we blend the feelings of the heart, embodying the present, and enriching the experience.",
				  ],
		},
		included: isAr
			? [
					"مرشد ذكي صوتي ونصي موثوق وبعدة لغات.",
					"نقل آمن ومريح عبر مركبات مكيفة.",
					"دخول جميع المواقع والأماكن المقدسة. ",
					"وسائل الراحة: واي فاي، كيابل الشحن، مياه معدنية.",
					"مواقف مهيأة بجوار جبل الرحمة تسهل لك الوصول بدون مشي ومشقة. ",
			  ]
			: [
					"Smart audio and text guide in multiple languages.",
					"Comfortable and safe transportation via air-conditioned vehicles.",
					"Entry to all holy sites and places",
					"Comfort amenities: Wi-Fi, charging cables, mineral water.",
					"Parking facilities near Jabal al-Rahma for easy access without walking or hardship.",
			  ],
		notIncluded: isAr
			? [
					"المشتريات والهدايا الشخصية.",
					"الوجبات.",
					"تذاكر المتاحف (يمكنك شراؤها عبر التطبيق). ",
			  ]
			: [
					"Personal purchases and gifts",
					"Meals",
					"Museum tickets (can be purchased through the app).",
			  ],
    mapLocations: [
			{ lat: 21.4225, lng: 39.8262, label: isAr ? "المسجد الحرام" : "Masjid al-Haram" }, 
		],
    mapCenter: { lat: 21.4225, lng: 39.8262 },
    mapLink:"https://www.google.com/maps/search/?api=1&query=21.4225,39.8262",
		
	};
}
