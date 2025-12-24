import { map } from "zod";

export default function getFullMadinnah(isAr) {
	return {
		id: 7,
		title: isAr
			? "التجربة المتكاملة لاستكشاف المدينة "
			: "The Complete Experience of Exploring Madinah",
		description: isAr
			? "رحلة تاريخية تشمل زيارة جميع معالم المدينة المنورة التاريخية والإثرائية وجولة إثرائية داخل المسجد النبوي"
			: "A historical journey that includes visits to all of Madinah’s historical and enrichment landmarks, along with a unique enrichment tour inside Al-Masjid An-Nabawi.",
		image: "/trip-detail/water-bottles.webp",
		capacity: 20,
		duration: isAr ? "90 دقيقة" : "90 minutes",
		rating: 4.9,
		reviewCount: 512,
		price: 299,
		availability: isAr
			? "كل أحد، ثلاثاء، وأربعاء"
			: "Available on Sunday, Tuesday, and Wednesday",
		times: isAr ? "8:30 م" : "8:30 PM",
		meetingPoint: isAr ? "بوابة الملك عبدالله" : "King Abdullah Gate",
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
				? "رحلة تجمع بين روح المكان وعمق التاريخ النبوي في دار الهجرة."
				: "A journey that brings together the spirit of the place and the depth of Prophetic history in the City of Hijrah (Migration).",
			list: isAr
				? [
						"نأخذكم في تجربة متكاملة على مدار يومين لزيارة جميع مسارات المدينة المنورة التاريخية والإثرائية، للتعرف على المعالم الدينية والتاريخية والثقافية، عبر مسارات مصممة بعناية فائقة (مسار قباء - مسار أحد) تثري تجربتك وتغذي معرفتك.",
						"وجولة إثرائية فريدة داخل المسجد النبوي لاستكشاف أسرار المسجد النبوي كما لم تعرفها من قبل، نتعرف فيها على أقدس المعالم وأعظم القصص، وقصة بناء المسجد النبوي ونحن نقف أمام هيبته وجلاله.",
						"استمتع بالمميزات والخدمات الحصرية لتجعل رحلتك مزيج من الإيمان والمعرفة والراحة.",
						"كل ذلك لتعيش تجربة إيمانية ومعرفية متكاملة مع مزار.",
						"رحلة واحدة تعيش فيها المدينة بكل تفاصيلها.",
				  ]
				: [
						"We take you on a fully integrated two-day experience to explore all of Madinah’s historical and enrichment routes, discovering its religious, historical, and cultural landmarks through carefully designed itineraries (Quba Tour and Uhud Tour) that enrich your experience and deepen your knowledge.",
						"This is complemented by a unique enrichment tour inside Al-Masjid An-Nabawi, where you will uncover its secrets as you have never known them before. You will explore the most sacred landmarks and the greatest stories, including the story of the construction of Al-Masjid An-Nabawi, as you stand in awe of its majesty and reverence.",
						"Enjoy exclusive features and services designed to make your journey a harmonious blend of faith, knowledge, and comfort.",
						"All of this comes together to offer you a complete spiritual and educational experience with Mzar.",
						"One journey - through which you experience Madinah in all its depth and detail.",
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
			: [
					"Transportation by vehicles",
					"Personal purchases or souvenirs",
					"Meals",
			  ],
		
		mapLocation: {
			lat: 21.4225,
			lng: 39.8262,
			label: isAr ? "المسجد الحرام" : "Masjid al-Haram",
		},
		mapCenter: { lat: 21.4225, lng: 39.8262 },
		mapLink: "https://www.google.com/maps/search/?api=1&query=21.4225,39.8262",
	};
}
