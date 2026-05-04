export default function getBus(isAr) {
	return {
		id: 10,
		title: isAr
			? "تجربة زيارة معالم مكة التاريخية في رحلة تشاركية "
			: "Shared Tour Experience to Visit Makkah Historical Landmarks",
		description: isAr
			? "انضم إلى حافلة الجولات الإثرائية في رحلة إلى معالم مكة التاريخية، واستمع إلى القصص بلغتك وشاهدها تنبض بالحياة من خلال الواقع المعزز ودليلنا الصوتي الذكي. "
			: "Join the enriching tour bus on a journey to Makkah's historical landmarks, listen to stories in your language, and see them come to life through augmented reality and our smart audio guide.",
		image: "/trip-detail/water-bottles.webp",
		capacity: 45,
		duration: isAr ? "5 ساعات" : "5 hours",
		rating: 4.8,
		reviewCount: 812,
		price: 69,
		availability: isAr
			? "متاحة يوميا"
			: "Available daily",
		times: isAr ? "7:00 ص - 12:00 م , 4:00 م - 9:00 م" : "7:00 AM - 12:00 PM , 4:00 PM - 9:00 PM",
		meetingPoint: isAr ? " 5 محطات" : "5 Stations",
		highlights: [
			{
				icon: "shield",
				title: isAr ? "حجز إلكتروني فوري عبر تطبيق مزار" : "Instant Electronic Booking via Mzar App",
				detail: isAr ? "" : "",
			},
      {
				icon: "calendar",
				title: isAr
					? "دليل صوتي ذكي ب6 لغات"
					: "Smart Audio Guide in 6 Languages",
				detail: isAr
					? ""
					: "",
			},
			{
				icon: "users",
				title: isAr ? "الفئة" : "Category",
				detail: isAr ? "متاحة للجميع" : "Available for everyone",
			},
			{
				icon: "map-pin",
				title: isAr ? "تفاعل" : "Interaction",
				detail: isAr
					? "شاشات مرئية، واقع معزز، تحقق ذكي من الوجهة"
					: "Visible screens, augmented reality, smart destination verification",
			},
			
			{
				icon: "globe",
				title: isAr ? "اللغات المتاحة" : "Available Languages",
				detail: isAr
					? "العربية، الإنجليزية، الفرنسية، التركية، الأردية، المالاوية"
					: "Arabic, English, French, Turkish, Urdu, Malay",
			},
			{
				icon: "shield",
				title: isAr ? "جولات معتمدة" : "Certified Tours",
				detail: isAr
					? "مرخصة من الهيئة الملكية لمدينة مكة المكرمة والمشاعر المقدسة"
					: "Official permit from the Royal Commission for Makkah City and Holy Sites",
			},
			
		],
		about: {
			desc: isAr
				? "رحلة تجمع بين الراحة والمعرفة، تنقلك إلى قلب تاريخ بروح الحاضر. انطلق معنا في جولة تعريفية بأسعار اقتصادية لزيارة أبرز معالم مكة التاريخية والثقافية عبر رحلة ميدانية آمنة ومريحة. تجربة فريدة لأول مرة في مكة المكرمة تروي لك القصص بلغتك وتُعيد الحياة للأماكن بتقنيات الواقع المعزز والدليل الصوتي الذكي، تمزج بين الإيمان، والتراث، والتقنية. "
				: "A journey that combines comfort and knowledge, taking you to the heart of history with a contemporary spirit. Join us on an introductory tour at economical prices to visit the most prominent historical and cultural landmarks of Makkah through a safe and comfortable field trip. A unique experience for the first time in Makkah that tells you stories in your language and brings places to life with augmented reality technologies and a smart audio guide, blending faith, heritage, and technology.",
			list: isAr
				? [
						"باصات حديثة مكيّفة ومريحة.",
						"محتوى موثّق تاريخياً.",
						"رحلة تشاركية تمنحك نظرة جديدة إلى تاريخ مكة ومعالمها الخالدة. ",
						
				  ]
				: [
						"Modern, air-conditioned, and comfortable buses.",
						"Historically documented content.",
						"A participatory journey that gives you a new perspective on the history of Makkah and its immortal landmarks.",
						
				  ],
		},
		included: isAr
			? [
					"مرشد سياحي معتمد مرافق طوال الجولة ",
					"سماعات لاسلكية للاستماع للمرشد والترجمة الفورية",
					"وصول حصري لعدد من المواقع داخل المسجد الحرام",
					"ضيافة سعودية (القهوة والتمر)",
			  ]
			: [
					"Certified tour guide accompanying you throughout the tour",
					"Wireless headphones for listening to the guide and simultaneous translation",
					"Exclusive access to a number of sites inside the Masjid al-Haram",
					"Saudi hospitality (coffee and dates)",
			  ],
		notIncluded: isAr
			? ["النقل بالمركبات", "المشتريات والهدايا الشخصية  ", "وجبات الطعام"]
			: ["Transportation by vehicles", "Personal purchases and gifts", "Meals"],
		busStops: true,
    
		timelineImg: isAr ? '/tour-bus/map-ar.webp' : '/tour-bus/map-en.webp',
    mapLocations: [
			{ lat: 21.4225, lng: 39.8262, name: isAr ? "المسجد الحرام" : "Masjid al-Haram" }, // Masjid al-Haram
			{ lat: 21.3891, lng: 39.8579, name: isAr ? "برج الساعة" : "Abraj Al Bait" }, // Abraj Al Bait
			{ lat: 21.4267, lng: 39.8256, name: isAr ? "جبل النور" : "Jabal al-Nour" }, // Jabal al-Nour
			{ lat: 21.4187, lng: 39.8937, name: isAr ? "جبل ثور" : "Jabal Thawr" }, // Jabal Thawr
			{ lat: 21.4225, lng: 39.8262, name: isAr ? "المسجد الحرام" : "Masjid al-Haram" }, // Masjid al-Haram
			{ lat: 21.3891, lng: 39.8579, name: isAr ? "برج الساعة" : "Abraj Al Bait" }, // Abraj Al Bait
		],
		mapTitle : isAr ? "مواقع محطات الباصات" : "Bus Station Locations",
   
	};
}
