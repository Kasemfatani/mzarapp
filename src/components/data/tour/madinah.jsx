import { map } from "zod";

export default function getMadinah(isAr) {
	return {
		id: 9,
		title: isAr
			? "تجربة إثرائية داخل المسجد النبوي"
			: "An Enriching Experience Inside Al-Masjid An-Nabawi ",
		description: isAr
			? "جولة نأخذك فيها إلى حيث خطت أقدام النبي ﷺ وصحابته الكرام، لنتعرف على المعالم التاريخية في المسجد النبوي، ونشاهد المعالم النبوية التي ارتبطت بسيرة وحياة النبي ﷺ. "
			: "A guided tour that takes you to the very places where the Prophet Muhammad ﷺ and his noble Companions once walked. ",
		image: "/trip-detail/water-bottles.webp",
		capacity: 20,
		duration: isAr ? "90 دقيقة" : "90 minutes",
		rating: 4.9,
		reviewCount: 712,
		price: 99,
		availability: isAr ? "كل أربعاء" : "Available on Wednesday",
		times: isAr ? "8:30 م" : "8:30 PM",
		meetingPoint: isAr
			? "معرض عمارة المسجد النبوي"
			: "The Architecture of Al-Masjid An-Nabawi Exhibition",
		highlights: [
			{
				icon: "shield",
				title: isAr ? "مرشد سياحي" : "Tour Guide",
				detail: isAr
					? "مرشدون سياحيون معتمدون"
					: "Licensed and certified tour guides",
			},
			{
				icon: "users",
				title: isAr ? "الفئة" : "Category",
				detail: isAr ? "متاحة للرجال فقط" : "Available for men only",
			},
			{
				icon: "map-pin",
				title: isAr ? "تفاعل" : "Interaction",
				detail: isAr
					? "صور، خرائط، ترجمة فورية، واقع معزز"
					: "Photos, maps, instant translation, augmented reality",
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
				title: isAr ? "جولات معتمدة" : "Authorized Tours",
				detail: isAr
					? "تصريح رسمي من الهيئة العامة للعناية بشؤون الحرمين الشريفين"
					: "Official permit issued by the General Authority for the Care of the Affairs of the Two Holy Mosques",
			},
			{
				icon: "calendar",
				title: isAr
					? "شهادة إتمام الزيارة وفلاتر تصوير"
					: "Certificate of Completion & Photo Filters",
				detail: isAr
					? "توثيق التجربة وتخليد الذكرى"
					: "To document the experience and preserve the memory",
			},
		],
		about: {
			desc: isAr
				? "استكشف أعظم معالم الحرم النبوي في رحلة إيمانية تُضيء لك تاريخ المكان وقدسيّته خلال 90 دقيقة فقط. جولة إثرائية شاملة تجعلك ترى معالم المسجد النبوي التاريخية بعيون جديدة وبفهم أعمق، تفتح لك أبواب المعرفة وتعيد تشكيل فهمك لتاريخ هذا المكان المبارك، تم تصميمها لتمنحك تجربة فريدة لا تُنسى، في أقل من ساعتين، تعيش تجربة تجمع بين العمق والإثراء التاريخي للسيرة النبوية، فتتعرف على قصص لم تسمع بها من قبل كما وردت في الروايات الصحيحة، وتشاهد تاريخ بناء المسجد النبوي وأهم المعالم بروح جديدة تماماً."
				: "Explore the greatest landmarks of the Prophet’s Mosque in a spiritually enriching journey that illuminates the sacred history and significance of the place in just 90 minutes. This comprehensive, enriching tour allows you to view the historical landmarks of Al-Masjid An-Nabawi with fresh eyes and a deeper understanding. It opens doors to knowledge and reshapes your perception of this blessed site’s history, thoughtfully designed to offer a truly unforgettable experience in under two hours. You will engage with the depth and historical richness of the Prophetic Seerah, discovering authentic stories as narrated in reliable sources, and exploring the history of the construction of the Prophet’s Mosque and its most significant landmarks with a renewed perspective.",
			list: isAr
				? [
						"معرفة ثرية في كل خطوة.",
						"تنظيم عالٍ وتجربة مريحة.",
						"رؤية جديدة لمعالم المسجد النبوي.",
						"تجربة تثري القلب والعقل، وتمنحك فهماً أعمق لمعاني الزيارة.",
						"تجربة تثري القلب والعقل، وتمنحك فهمًا أعمق لمعاني الحج والعمرة.",
						"هذه ليست مجرد جولة... إنها تجربة لاكتشاف أسرار المكان الذي تهفو إليه القلوب.",
				  ]
				: [
						"Rich knowledge at every step.",
						"High-quality organization and a comfortable experience.",
						"A renewed vision of Al-Masjid An-Nabawi’s landmarks.",
						"An experience suitable for everyone, whether you are a pilgrim, Umrah performer, or visitor.",
						"A journey that enriches both heart and mind, offering deeper insight into the meaning of the visit.",
						"This is not just a tour... It is an experience to uncover the secrets of a place toward which hearts long.",
				  ],
		},
		included: isAr
			? [
					"مرشد سياحي معتمد مرافق طوال الجولة ",
					"سماعات لاسلكية للاستماع للمرشد والترجمة الفورية",
					"وصول حصري لعدد من المواقع داخل المسجد النبوي",
					"ضيافة سعودية (القهوة والتمر)",
			  ]
			: [
					"A licensed professional tour guide accompanying you throughout the tour ",
					"Wireless headsets for clear listening and instant translation",
					"Exclusive access to selected locations inside Al-Masjid An-Nabawi",
					"Saudi hospitality (Arabic coffee and dates)",
			  ],
		notIncluded: isAr
			? ["النقل بالمركبات", "المشتريات والهدايا الشخصية  ", "وجبات الطعام"]
			: [
					"Transportation by vehicles",
					"Personal purchases or souvenirs",
					"Meals",
			  ],
		timeline: [
			{
				time: isAr ? "8:30 م" : "8:30 PM",
				title: isAr ? "التجمع والإنطلاق" : "Gathering and Departure",
				shortDesc: isAr
					? "سيستقبلكم المرشد السياحي عند معرض عمارة المسجد النبوي."
					: "Your tour guide will welcome you at the Architecture of Al-Masjid An-Nabawi Exhibition.",
				fullDesc: isAr
					? "سيتم التعارف وتوزيع السماعات اللاسلكية وشرح برنامج الجولة."
					: "Guests will be introduced to one another, wireless headsets will be distributed, and the tour program will be explained.",
			},
			{
				time: isAr ? "8:50 م" : "8:50 PM",
				title: isAr
					? "المحطة الأولى: معرض عمارة المسجد النبوي الشريف"
					: "First Stop: Architecture of Al-Masjid An-Nabawi Exhibition",
				shortDesc: isAr
					? "معرض عمارة المسجد النبوي."
					: "The Architecture of the Prophet’s Mosque.",
				fullDesc: isAr
					? "جولة نتعرف فيها على تاريخ عمارة المسجد النبوي الشريف في معرض عمارة المسجد النبوي، ثم نقف على مسجد الغمامة ومصليات النبي ﷺ."
					: "A guided visit through the exhibition to explore the architectural history of Al-Masjid An-Nabawi, followed by a stop at Masjid Al-Ghamamah and the prayer areas where the Prophet ﷺ prayed.",
			},
			{
				time: isAr ? "9:10 م" : "9:10 PM",
				title: isAr
					? "المحطة الثانية: ساحات المسجد النبوي"
					: "Second Stop: Courtyards of Al-Masjid An-Nabawi",
				shortDesc: isAr
					? "أهم المعالم المعمارية في المسجد النبوي."
					: "Key architectural features of the Prophet’s Mosque.",
				fullDesc: isAr
					? "نقف في ساحات المسجد النبوي للتعرف على تاريخ عمارة ساحات ومظلات وقبب ومنارات المسجد النبوي الشريف."
					: "We stand in the courtyards of Al-Masjid An-Nabawi to learn about the history of their development, including the courtyards, canopies, domes, and minarets of the mosque.",
			},
			{
				time: isAr ? "9:30 م" : "9:30 PM",
				title: isAr ? "المحطة الثالثة: الحصوات" : "Third Stop: Al-Hasawat",
				shortDesc: isAr
					? "تاريخ العمارة الداخلية للمسجد النبوي الشريف."
					: "The history of the interior architecture of Al-Masjid An-Nabawi.",
				fullDesc: isAr
					? "نجلس وإياكم في الحصوة ونتعرف على تاريخها وتاريخ أسطوانات المسجد النبوي الشريف والعديد من المعالم التاريخية داخل المسجد النبوي الشريف."
					: "We gather at Al-Haswah to learn about its history, the historical columns of the Prophet’s Mosque, and several significant interior landmarks within Al-Masjid An-Nabawi.",
			},
			{
				time: isAr ? "9:50 م" : "9:50 PM",
				title: isAr
					? "المحطة الرابعة: باب السلام"
					: "Fourth Stop: Bab As-Salam (Gate of Peace)",
				shortDesc: isAr
					? "السلام على النبي ﷺ ومعالم الواجهة الشريفة."
					: "Sending greetings upon the Prophet ﷺ and exploring the Noble Façade.",
				fullDesc: isAr
					? "ندخل وإياكم من باب السلام ونتعرف على خوخة أبي بكر الصديق رضي الله عنه ونقف لنشاهد تاريخ محاريب المسجد النبوي، ثم المرور بالروضة الشريفة ثم السلام على النبي ﷺ وصاحبيه، ثم الانتهاء بقصة بقيع الغرقد."
					: "We enter through Bab As-Salam, learn about the small doorway of Abu Bakr As-Siddiq (may Allah be pleased with him), observe the historical prayer niches of the mosque, pass through Ar-Rawdah Ash-Sharifah, and offer salutations to the Prophet ﷺ and his two Companions. The tour concludes with the story of Al-Baqiʿ Al-Gharqad.",
			},
			{
				time: isAr ? "10:10 م" : "10:10 PM",
				title: isAr ? "الانتهاء من الجولة" : "End of the Tour",
				shortDesc: "",
				fullDesc: "",
			},
		],
		mapLocation: {
			lat: 24.467,
			lng: 39.611,
			label: isAr ? "المسجد الحرام" : "Masjid al-Haram",
		},
		mapCenter: { lat: 24.467, lng: 39.611 },
		mapLink: "https://www.google.com/maps/search/?api=1&query=24.467,39.611",
	};
}
