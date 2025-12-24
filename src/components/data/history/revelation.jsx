
export default function getRevelation(isAr) {
	return {
		id: 49,
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
				title: isAr ? "نقطة الانطلاق" : "Meeting  Point",
				detail: isAr
					? "السائق يصل إلى موقعك في أي مكان"
					: "Driver arrives at your location anywhere",
			},
			{
				icon: "compass",
				title: isAr ? "تحقق ذكي " : "Smart Verification",
				detail: isAr
					? "تحقق من الوصول للوجهة تلقائياً"
					: "Automatic verification upon arrival at each destination",
			},
			{
				icon: "globe",
				title: isAr ? "محتوى بعدة لغات" : "Multilingual Content",
				detail: isAr
					? "محتوى إثرائي متوفر ب6 لغات عالمية"
					: "Enriching content available in 6 international languages",
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
				title: isAr ? "روايات موثوقة" : "Verified Narratives",
				detail: isAr
					? "قصص إثرائية معتمدة تُحكى لأول مرة"
					: "Authentic enrichment stories shared for the first time",
			},
			{
				icon: "map-pin",
				title: isAr ? "شهادة إتمام الزيارة وفلاتر تصوير" : "Certificate of Completion & Photo Filters",
				detail: isAr
					? "توثيق التجربة وتخليد الذكرى"
					: "Document your experience & preserve the memory ",
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
					"A reliable smart audio and text guide in multiple languages",
					"Safe, comfortable transportation in air-conditioned vehicles ",
					"Access to all sacred sites and locations ",
					"Amenities: Wi-Fi, charging cables, bottled water",
					"Dedicated parking areas near Jabal Al-Rahmah for easy access without walking or effort ",
			  ],
		notIncluded: isAr
			? [
					"المشتريات والهدايا الشخصية.",
					"الوجبات.",
					"تذاكر المتاحف (يمكنك شراؤها عبر التطبيق). ",
			  ]
			: [
					"Personal purchases and souvenirs",
					"Meals",
					"Museum tickets (available for sale through the app)",
			  ],
    mapTitle : isAr ? "الوجهات" : "Destinations",
		
	};
}
