
export default function getMashair(isAr) {
	return {
		id: 45,
		title: isAr
			? "تجربة زيارة المشاعر المقدسة"
			: "Experience Visiting the Holy Sites",
		description: isAr
			? "مسار المشاعر رحلة إيمانية تاريخية عبر المشاعر المقدسة ابتداءً من عرفات مروراً بمزدلفة ومن ثم منى وانتهاءً بجبل النور وحي حراء الثقافي. "
			: "Masha’er Tour – A spiritual and historical journey across the Holy Sites, beginning from ‘Arafat, passing through Muzdalifah, then Mina, and ending at Jabal Al-Noor & the Hira Cultural District.",
		image: "/trip-detail/water-bottles.webp",
		capacity: 45,
		duration: isAr ? "4 ساعات" : "4 hours",
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
				? "نأخذكم في رحلة إيمانية تاريخية، نسير فيها معكم عبر المشاعر المقدسة ابتداءً من عرفات مروراً بمزدلفة ومن ثم منى وانتهاءً بجبل النور وحي حراء الثقافي."
				: "We take you on a spiritual and historical journey, walking with you through the Holy Sites ــ beginning from ‘Arafat, passing through Muzdalifah, then Mina, and ending at Al-Noor Mountain and Hira Cultural District.",
			list: isAr
				? [
						"عرفات ــ ثلاث وجهات رئيسية: جبل الرحمة ومسجد نمرة وخاصرة عين زبيدة.",
						"مزدلفة ــ وفيها مسجد المشعر الحرام.",
						"منى ــ حيث نطوف بكم بين: جسر الجمرات ومسجد الخيف.",
						"وفي نهاية الرحلة يمكنكم زيارة جبل النور وحي حراء الثقافي، والاستمتاع بجولة معرفية وإثرائية بين جنبات متاحفه.",
						"في هذه الرحلة نمزج بين السير في أراضي المشاعر والتحليق في سموّ المشاعر، وإثراء التجربة. ",
				  ]
				: [
						"Arafat ــ Three main destinations: Jabal Al-Rahmah (Mount of Mercy), Namira Mosque, and the Zubaida Spring",
						"Muzdalifah ــ which includes Al-Mash’ar Al-Haram Mosque.",
						"Mina ــ where we take you between Jamarat Bridge and Al-Khaif Mosque.",
						"At the end of the journey, you can visit Al-Noor Mountain and Hira Cultural District, and explore its knowledge-rich museums.",
						"In this journey, we combine walking through the lands of the Holy Sites with soaring in the essence of the sacred experience, enriching your journey throughout.",
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
