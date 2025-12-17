export default function getQuba(isAr) {
	return {
		id: 73,
		title: isAr
			? "جربة زيارة دروب الهجرة الأولى"
			: "Experience the Visit to the First Migration Paths",
		description: isAr
			? "مسار قباء رحلة تاريخية نسير فيها على خُطى النبي ﷺ وصحابته الكرام، بين المواقع التي شهدت بداية النور في المدينة المنورة."
			: "Quba Tour ــ a historical journey in which we follow the footsteps of the Prophet ﷺ and his noble Companions, moving between the locations that witnessed the dawn of light in Al-Madinah Al-Munawwarah. ",
		image: "/trip-detail/water-bottles.webp",
		capacity: 45,
		duration: isAr ? " ساعتين و 5 دقائق" : "2 hours and 5 minutes",
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
				? "نأخذكم في رحلة تاريخية نسير فيها على خُطى النبي ﷺ وصحابته الكرام، بين المواقع التي شهدت بداية النور في طيبة الطيبة."
				: "We take you on a historical journey, walking in the footsteps of the Prophet ﷺ and his noble Companions, through places that witnessed the beginning of light in the blessed city of Taybah.",
			list: isAr
				? [
						"بئر الفقير ــ البئر التي غرس عندها النبي ﷺ النخيل بيديه الشريفتين.",
						"بئر غرس ــ بئر شرب منها النبي ﷺ.",
						"دار كلثوم بن الهدم ــ أول دار نزل فيها النبي ﷺ عند قدومه المدينة.",
						"دار سعد بن خيثمة ــ موضع اجتماع المهاجرين والأنصار.",
						"مسجد قُباء ــ أول مسجد أُسس على التقوى.",
						"بئر أريس ــ جلس عندها النبي ﷺ وارتبطت بقصة خاتم النبي ﷺ.",
						"بستان المستظل وبئر عذق ــ موضع استراح فيه النبي ﷺ.",
						"وفي ختام المسار، سنزور المساجد السبعة ــ مواقع شهدت قصصا في غزوة الأحزاب.",
						"رحلة تمتزج فيها أنوار النبوة بروح الدعاء، وتُجسّد تحول المدينة إلى منطلق النور والرسالة.",
				  ]
				: [
						"Bir Al-Faqir ــ The well near which the Prophet ﷺ planted palm trees with his blessed hands.",
						"Ghars Well ــ A well from which the Prophet ﷺ drank.",
						"The House of Kulthoom ibn Al-Hedem ــ The first home the Prophet ﷺ stayed in upon arriving in Madinah.",
						"The House of Sa‘d ibn Khaythamah ــ The meeting place of the Muhājirīn and Ansār.",
						"Quba Mosque ــ The first mosque founded upon piety.",
						"Aris Well ــ Where the Prophet ﷺ sat, and which is linked to the story of the Prophet’s ring ﷺ.",
						"Al-Mustazall Garden & ‘Edhq ــ A place where the Prophet ﷺ rested.",
						"At the end of the route, we will visit the Seven Mosques, sites associated with the Battle of the Trench.",
						"A journey where the light of Prophethood meets the spirit of devotion, embodying Madinah as the birthplace of the message.",
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
