import { map } from "zod";

export default function getShow(isAr) {
	return {
		id: 11,
		title: isAr
			? "تجربة بإطلالة مهيبة على الحرم المكي"
			: "A Majestic View Experience Over Al-Masjid Al-Haram",
		description: isAr
			? "تجربة بإطلالة مهيبة على المسجد الحرام تمنحك لحظات فريدة تتجلى فيها عظمة المكان وجمال البناء "
			: "An elevated experience overlooking Al-Masjid Al-Haram, offering rare moments where the grandeur of the sacred site and the beauty of its architecture come together in a truly inspiring view.",
		image: "/trip-detail/water-bottles.webp",
		capacity: 20,
		duration: isAr ? "ساعتان" : "2 hours",
		rating: 4.8,
		reviewCount: 712,
		price: 309,
		availability: isAr ? "متاح يوميًا" : "Available daily",
		times: isAr
			? "7:00 ص - 12:00 م , 4:00 م - 9:00 م"
			: "7:00 AM - 12:00 PM , 4:00 PM - 9:00 PM",
		meetingPoint: isAr ? "برج الساعة" : "The Clock Tower",
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
				? "تبدأ رحلتك في متحف السيرة النبوية حيث يعرض تفاصيل حياة الرسول ﷺ بأسلوب تفاعلي مبهر، ومن ثم تصعد إلى متحف الساعة الذي يشرح تاريخ الزمن وأضخم ساعة في العالم، والتعرف على سيرة علماء الفلك المسلمين وأدوات قياس الزمن القديمة، وما أن تصل إلى الشرفة حتى تنكشف أمامك مكة في منظر يمنح الزائر شعوراً لا يُوصف، حيث يستمتع بإطلالة مهيبة على الحرم المكي من قلب برج الساعة، مدعومة بتجربة الواقع المعزّز تتعرف فيها على تاريخ المسجد الحرام والمعالم التاريخية حوله كأنك تعيشها على الحقيقة، تُثري لحظاتك وتُقرّبك أكثر إلى قدسية المكان. رحلة تجمع العلم والإيمان في لحظات لا تُنسى."
				: "Your journey begins at the Prophetic Biography Museum, where the life of the Messenger of Allah ﷺ is presented through an immersive and interactive experience. You will then ascend to the Clock Tower Museum, which explores the history of time, the world’s largest clock, and the legacy of Muslim astronomers and their historical time-measurement instruments. Upon reaching Veranda (the Observation Deck), Makkah unfolds before you in a breathtaking scene that evokes an indescribable sense of awe. From the heart of the Clock Tower, enjoy a majestic panoramic view of Al-Masjid Al-Haram, enhanced by an Augmented Reality experience that brings the history of the Grand Mosque and its surrounding landmarks vividly to life, allowing you to experience them as if you were witnessing history firsthand. A journey that brings together knowledge and faith in unforgettable moments. ",
			list: isAr ? [] : [],
		},
		included: isAr
			? [
					"تذكرة دخول إلى متحف السيرة النبوية",
					"تذكرة دخول إلى متحف الساعة",
					"تذكرة دخول إلى الشرفة (الأعلى في مكة)",
			  ]
			: [
					"Admission ticket to the Prophetic Biography Museum",
					"Admission ticket to the Clock Tower Museum",
					"Admission ticket to the Veranda (Observation Deck - the highest viewpoint in Makkah)",
			  ],
		notIncluded: isAr
			? [
					"خدمة التوصيل",
					"وجبات الطعام والمشروبات",
					"المشتريات والهدايا الشخصية",
					"مرشد سياحي مرافق",
			  ]
			: [
					"Transportation service",
					"Meals and drinks",
					"Personal purchases and souvenirs",
					"Accompanying tour guide",
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
