export default function getTuwa(isAr) {
	return {
		id: 47,
		title: isAr
			? "تجربة زيارة معالم وادي ذي طوى"
			: "Experience the Visit to the Landmarks of Wadi Dhi Tuwa ",
		description: isAr
			? "مسار طوى رحلة إيمانية تاريخية، نتنقل فيها بين أبرز المعالم النبوية والتاريخية في مكة المكرمة. "
			: "Tuwa Tour ــ a spiritual and historical journey that takes you through some of the most significant Prophetic and historical sites in Makkah Al-Mukarramah.",
		image: "/trip-detail/water-bottles.webp",
		capacity: 45,
		duration: isAr ? "4 ساعات" : "4 hours",
		rating: 4.7,
		reviewCount: 412,
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
				? "نأخذكم في رحلة إيمانية تاريخية، نتنقل فيها بين أبرز المعالم النبوية في مكة المكرمة: بئر طوى، مسجد الإجابة، مسجد الجن، مسجد الشجرة، وريع الحجون."
				: "We take you on a spiritual and historical journey as we move between the most prominent Prophetic landmarks in Makkah: Tuwa Well, Al-Ijabah Mosque, Jinn Mosque, Ash Shajarah Mosque and Al-Hajun Valley. ",
			list: isAr
				? [
						"بئر طوى ــ البئر التي كان يغتسل منها النبي ﷺ.",
						"مسجد الإجابة ــ موضع نزل فيه الرسول ﷺ.",
						"مسجد الجن ــ موضع لقاء النبي ﷺ بالجن ودعوتهم إلى الإسلام.",
						"مسجد الشجرة ــ موضع شجرة كانت لها مع رسول الله ﷺ قصة.",
						"ريع الحجون ــ موقع تاريخي وقعت فيه أحداث تاريخية هامة.",
						"وفي نهاية الرحلة يمكنكم زيارة حي حراء الثقافي والاستمتاع بجولة معرفية وإثرائية بين جنبات متاحفه.",
						"في هذه الرحلة نسير بكم بين آثار نبوية تبعد أمتاراً قليلة عن المسجد الحرام، لكل وجهة منها قصة، تصنع الذكرى وتثري التجربة.",
				  ]
				: [
						"Tuwa Well ــ The well from which the Prophet ﷺ used to bathe.",
						"Al-Ijabah Mosque ــ A location where the Messenger ﷺ stayed.",
						"Jinn Mosque ــ The site where the Prophet ﷺ met the jinn and invited them to Islam.",
						"Ash Shajarah Mosque ــ The site of a tree that had a story with the Messenger of Allah ﷺ.",
						"Al-Hajun ــ A historical area where important early Islamic events took place.",
						"At the end of the journey, you may visit the Hira Cultural District and enjoy an informative, enriching tour of its museums.",
						"On this journey, we guide you through Prophetic traces located just a short distance from Al-Masjid Al-Haram, each destination holding a story that enriches your experience.",
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
