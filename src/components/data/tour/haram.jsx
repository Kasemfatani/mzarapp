import { map } from "zod";

export default function getHaram(isAr) {
	return {
		id: 8,
		title: isAr
			? "تجربة إثرائية داخل المسجد الحرام"
			: "An Enrichment Experience Inside Al-Masjid Al-Haram",
		description: isAr
			? "جولة نقف فيها أمام للكعبة المشرفة للتعرف على تاريخ بنائها ونزور فيها أهم معالم المسجد الحرام التاريخية. "
			: "A guided tour where you stand before the holy Kaaba to explore the history of its construction and visit the most important historical landmarks of Al-Masjid Al-Haram. ",
		image: "/trip-detail/water-bottles.webp",
		capacity: 20,
		duration: isAr ? "90 دقيقة" : "90 minutes",
		rating: 4.9,
		reviewCount: 712,
		price: 99,
		availability: isAr
			? "كل أحد، ثلاثاء، وأربعاء"
			: "Available on Sunday, Tuesday, and Wednesday",
		times: isAr ? "8:30 م" : "8:30 PM",
		meetingPoint: isAr ? "بوابة الملك عبدالله" : "King Abdullah Gate",
		highlights: [
			{
				icon: "shield",
				title: isAr ? "مرشد سياحي" : "Tour Guide",
				detail: isAr ? "مرشدون سياحيون معتمدون" : "Licensed and certified tour guides",
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
				? "استكشف أعظم معالم الحرم في رحلة إيمانية تُضيء لك تاريخ المكان وقدسيّته خلال 90 دقيقة فقط. جولة إثرائية شاملة تجعلك ترى معالم المسجد الحرام التاريخية بعيون جديدة وبفهم أعمق، تفتح لك أبواب المعرفة وتعيد تشكيل فهمك لتاريخ هذا المكان المبارك، تم تصميمها لتمنحك تجربة فريدة لا تُنسى داخل الحرم المكي، في أقل من ساعتين، تعيش تجربة تجمع بين العمق والإثراء التاريخي، فتتعرف على قصص لم تسمع بها من قبل، وتشاهد تاريخ بناء الكعبة المشرفة وأهم معالم المسجد الحرام بروح جديدة تماماً."
				: "Explore the greatest landmarks of the Haram in a 90-minute spiritual journey that illuminates the history and sanctity of the place. A comprehensive enriching tour that allows you to see the historical landmarks of the Holy Mosque with new eyes and deeper understanding, opening doors of knowledge and reshaping your understanding of the history of this blessed place. It is designed to provide you with a unique and unforgettable experience inside the Masjid al-Haram, in less than two hours, where you live an experience that combines depth and historical enrichment, learning stories you have never heard before, and witnessing the history of the construction of the Kaaba and the most important landmarks of the Holy Mosque with a completely new spirit.",
			list: isAr
				? [
						"معرفة ثرية في كل خطوة.",
						"تنظيم عالٍ وتجربة مريحة.",
						"رؤية جديدة لمعالم الحرم المكي.",
						"تجربة تناسب الجميع سواءً كنت حاجاً، معتمراً، أو زائراً. ",
						"تجربة تثري القلب والعقل، وتمنحك فهمًا أعمق لمعاني الحج والعمرة.",
						"هذه ليست مجرد جولة... إنها تجربة لاكتشاف أسرار المكان الذي تهفو إليه القلوب.",
				  ]
				: [
						"Rich knowledge at every step.",
						"High organization and a comfortable experience.",
						"A new perspective on the landmarks of the Haram.",
						"An experience suitable for everyone, whether you are a pilgrim, Umrah performer, or visitor.",
						"An experience that enriches the heart and mind, giving you a deeper understanding of the meanings of Hajj and Umrah.",
						"This is not just a tour... it is an experience to discover the secrets of the place your heart longs for.",
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
					"Saudi hospitality (Arabic coffee and dates)",
			  ],
		notIncluded: isAr
			? ["النقل بالمركبات", "المشتريات والهدايا الشخصية  ", "وجبات الطعام"]
			: ["Transportation by vehicles", "Personal purchases or souvenirs", "Meals"],
		timeline: [
			{
				time: isAr ? "8:50 م" : "8:50 PM",
				title: isAr
					? "المحطة الأولى : معرض أول بيت"
					: "First Stop: The First House Exhibition",
				shortDesc: isAr
					? "معرض يحكي قصة بناء الكعبة المشرفة."
					: "An exhibition that tells the story of the construction of the Kaaba.",
				fullDesc: isAr
					? "نشاهد وإياكم عروضاً تفاعلية تحكي قصة بناء الكعبة وما يرتبط بها من قطع وأدوات نادرة. "
					: "We watch with you interactive presentations that tell the story of the construction of the Kaaba and the rare pieces and tools associated with it.",
			},
			{
				time: isAr ? "9:10 م" : "9:10 PM",
				title: isAr
					? " المحطة الثانية : عمارة المسجد الحرام "
					: "Second Stop: Architecture of the Holy Mosque",
				shortDesc: isAr
					? "ساحات باب الملك فهد رحمه الله."
					: "The courtyards of King Fahd Gate, may Allah have mercy on him.",
				fullDesc: isAr
					? "نتعرف فيها على قصة عمارة المسجد الحرام وتاريخ بناء ومنارات وأبواب الحرم المكي الشريف."
					: "We learn about the story of the architecture of the Masjid al-Haram and the history of the construction of the minarets and gates of the Holy Mosque.",
			},
			{
				time: isAr ? "9:30 م" : "9:30 PM",
				title: isAr
					? "المحطة الثالثة : قصة بناء الكعبة المشرفة"
					: "Third Stop: The Story of the Construction of the Kaaba",
				shortDesc: isAr
					? "الوقوف أمام الكعبة المشرفة."
					: "Standing before the Kaaba.",
				fullDesc: isAr
					? "نتعرف فيها على قصة بناء الكعبة المشرفة منذ بناء الملائكة الأول حتى البناء الحالي الأخير للكعبة، ونستكشف الآيات البينات التي ارتبطت بالكعبة من الحجر الأسود والركن اليماني والحطيم ومقام إبراهيم عليه السلام."
					: "We learn about the story of the construction of the Kaaba from the first construction by the angels to the current last construction of the Kaaba, and we explore the clear verses associated with the Kaaba, including the Black Stone, the Yemeni Corner, Al-Hatim, and the Station of Ibrahim (peace be upon him).",
			},
			{
				time: isAr ? "9:50 م" : "9:50 PM",
				title: isAr
					? "المحطة الرابعة: الصفا والمروة"
					: "Fourth Stop: Safa and Marwah",
				shortDesc: isAr
					? "الوقوف أمام المسعى وقصة الصفا والمروة"
					: "Standing before the Sa’i and the story of Safa and Marwah",
				fullDesc: isAr
					? "نتعرف فيها على قصة زمزم وسعي هاجر أم إسماعيل عليهما السلام، وكل ما يرتبط بالصفا والمروة، والانتهاء بباب السلام الذي كان يدخل منه النبي ﷺ إلى الحرم."
					: "We learn about the story of Zamzam and the Sa’i of Hagar, the mother of Ishmael (peace be upon them), everything related to Safa and Marwah, ending at the Gate of Peace through which the Prophet ﷺ used to enter the sanctuary.",
			},
			{
				time: isAr ? "10:10 م" : "10:10 PM",
				title: isAr ? "الانتهاء من الجولة" : "Tour Conclusion",
				shortDesc: isAr ? "" : "",
				fullDesc: isAr ? "" : "",
			},
		],
		mapLocation: { lat: 21.4225, lng: 39.8262, label: isAr ? "المسجد الحرام" : "Masjid al-Haram" }, 
    mapCenter: { lat: 21.4225, lng: 39.8262 },
    mapLink:"https://www.google.com/maps/search/?api=1&query=21.4225,39.8262",
	};
}
