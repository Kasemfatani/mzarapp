export default function getUhud(isAr) {
	return {
		id: 74,
		title: isAr
			? "تجربة زيارة آثار غزوة أحد"
			: "Experience the Visit to the Sites of the Battle of Uhud",
		description: isAr
			? "مسار أحد جولة تاريخية إلى موقع غزوة أُحد، إحدى أهم غزوات النبي ﷺ وموقع استشهاد سيد الشهداء حمزة بن عبدالمطلب"
			: "Uhud Tour ــ a historical trip to the site of the Battle of Uhud, one of the most significant battles of the Prophet ﷺ and the place where the Master of Martyrs Hamzah ibn ‘Abd al-Muttalib (رضي الله عنه) was martyred. ",
		image: "/trip-detail/water-bottles.webp",
		capacity: 45,
		duration: isAr ? "3 ساعات" : "3 hours",
		rating: 4.8,
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
				title: isAr
					? "شهادة إتمام الزيارة وفلاتر تصوير"
					: "Certificate of Completion & Photo Filters",
				detail: isAr
					? "توثيق التجربة وتخليد الذكرى"
					: "Document your experience & preserve the memory ",
			},
		],
		about: {
			desc: isAr
				? "نأخذكم في رحلة مهيبة إلى موقع غزوة أُحد، إحدى أهم غزوات النبي ﷺ وموقع استشهاد سيد الشهداء حمزة بن عبدالمطلب وشهداء أحد رضوان الله عليهم."
				: "We take you on a profound journey to the site of the Battle of Uhud ــ one of the most important battles of the Prophet ﷺ and the place where the Master of Martyrs, Hamzah ibn ‘Abd al-Muttalib (رضي الله عنه), along with the martyrs of Uhud (رضي الله عنهم), fell.",
			list: isAr
				? [
						"مسجد المستراح ــ موضع استراحة ودعاء النبي ﷺ.",
						"مسجد الدرع ــ حيث ارتدى ﷺ درعه الشريف.",
						"جبل الرماة ومقبرة الشهداء ــ ميدان البطولة ومثوى الصحابة رضي الله عنهم.",
						"مسجد الفسح ــ موضع دعاء النبي ﷺ بالنصر والثبات.",
						'جبل أُحد ــ حيث قال ﷺ: "أُحد جبلٌ يحبّنا ونحبّه".',
						"نختم بمسجد القبلتين ــ حيث نزل أمر الله بتحويل القبلة.",
						"رحلة تُجسّد دروس الصبر والإيمان على أرض أُحد المباركة.",
				  ]
				: [
						"Al-Mustarah Mosque ــ Where the Prophet ﷺ rested and supplicated.",
						"Masjid Al-Dira’ (The Armor Mosque) ــ Where the Prophet ﷺ put on his blessed armor.",
						"Jabal al-Rumah (The Archers’ Mount) & the Graveyard of the Martyrs ــ The field of courage and the resting place of the noble Companions.",
						"Al-Fath Mosque ــ Where the Prophet ﷺ prayed for victory and steadfastness.",
						"Mount Uhud ــ About which the Prophet ﷺ said: “Uhud is a mountain that loves us, and we love it.”",
						"We conclude with Al-Qiblatain Mosque ــ The site where Allah commanded the change of the Qiblah.",
						"A journey that embodies the lessons of patience and faith on the blessed grounds of Uhud.",
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
		mapTitle: isAr ? "الوجهات" : "Destinations",
	};
}
