export const busTripStops = [
	{ ar: "جبل ثور", en: "Jabal Thawr" },
	{ ar: "عرفات", en: "Arafat" },
	{ ar: "جبل الرحمة", en: "Jabal Al Rahmah" },
	{ ar: "مسجد نمرة", en: "Namirah Mosque" },
	{ ar: "خاصرة عين زبيدة", en: "Khasirat Ain Zubaydah" },
	{ ar: "مزدلفة", en: "Muzdalifah" },
	{ ar: "مسجد المشعر الحرام", en: "Al Mashar Al Haram Mosque" },
	{ ar: "منى", en: "Mina" },
	{ ar: "جسر الجمرات", en: "Jamarat Bridge" },
	{ ar: "حي حراء الثقافي", en: "Hira Cultural District" },
];

export const busTripDepartures = [
	{
		id: "fairmont",
		icon: "☾",
		ar: "الجولة المسائية (فندق فيرمونت مكة)",
		en: "Evening tour (Fairmont Hotel)",
		meetingPoint: { ar: "فندق فيرمونت مكة", en: "Fairmont Hotel" },
		meetingHours: { ar: "الجولة المسائية · ٢:٣٠ عصرًا", en: "Evening tour · 2:30 PM" },
		mapUrl: "https://www.google.com/maps/search/?api=1&query=21.417885863054618,39.824727179945164",
		arTime: "٢:٣٠ عصرًا",
		enTime: "2:30 PM",
	},
	{
		id: "anjum",
		icon: "☾",
		ar: "الجولة المسائية (فندق أنجم مكة)",
		en: "Evening tour (Anjum Hotel)",
		meetingPoint: { ar: "فندق أنجم مكة", en: "Anjum Hotel Makkah" },
		meetingHours: { ar: "الجولة المسائية · ٣:٠٠ عصرًا", en: "Evening tour · 3:00 PM" },
		mapUrl: "https://www.google.com/maps/search/?api=1&query=21.42441532155061,39.81894701951807",
		arTime: "٣:٠٠ عصرًا",
		enTime: "3:00 PM",
	},
];

export const busTripCopy = {
	ar: {
		breadcrumb: ["الرئيسية", "التجارب", "الجولات الإثرائية في مكة"],
		badge: "مكة المكرمة · رحلة تشاركية",
		eyebrow: "الجولات الإثرائية مع مزار",
		title: "اكتشف معالم مكة… بلغتك",
		heroDescription: "إرشاد سياحي صوتي بلغتك، يروي لك حكاية كل معلم على الطريق.",
		languages: "العربية · الإنجليزية · الفرنسية · التركية · الملايو",
		book: "احجز جولتك",
		sponsorLabel: "هذه المبادرة برعاية",
		sponsorAlt: "الهيئة الملكية لمدينة مكة المكرمة والمشاعر المقدسة",
		carrierLabel: "الشريك الناقل",
		carrierAlt: "مجموعة مزايا",
		guidanceEyebrow: "لكل معلم حكاية… اسمعها بلغتك",
		guidanceTitle: "إرشاد سياحي صوتي بلغتك",
		guidanceDescription:
			"استمع إلى حكايات معالم مكة بإرشاد سياحي صوتي بلغتك، ضمن رحلة جماعية منظمة ونقل مريح.",
		itineraryEyebrow: "رحلتك، محطة بمحطة",
		itineraryTitle: "وجهات الجولة",
		itineraryDescription:
			"اختر نقطة التجمع للاطلاع على موعد الانطلاق ومسار الجولة.",
		meetingEyebrow: "بداية رحلتك من هنا",
		meetingTitle: "نقاط التجمع والانطلاق",
		meetingDescription: "اختر نقطة التجمع الأنسب لك؛ يختلف موعد الانطلاق حسب الفندق.",
		viewMap: "عرض الموقع على الخريطة",
		factsEyebrow: "",
		factsTitle: "تجربة متكاملة، وحجز بسيط",
		facts: [
			{ value: "٥ ساعات", label: "مدة التجربة" },
			{ value: "حافلة مكيّفة", label: "نقل مريح" },
			{ value: "الأطفال مجانًا", label: "دون ١٢ سنة" },
		],
		faqEyebrow: "",
		faqTitle: "أسئلة قبل الرحلة",
		faqs: [
			{
				question: "متى تنطلق الجولة ومن أين؟",
				answer:
					"تنطلق الجولات المسائية بتوقيت مكة الساعة ٢:٣٠ عصرًا من فندق فيرمونت مكة، أو الساعة ٣:٠٠ عصرًا من فندق أنجم مكة. اختر نقطة التجمع المناسبة عند الحجز.",
			},
			{
				question: "هل يتوفر الإرشاد الصوتي بلغتي؟",
				answer:
					"يوفر مزار إرشادًا سياحيًا صوتيًا بالعربية والإنجليزية والفرنسية والتركية والملايو، للتعرف على المعالم وقصصها.",
			},
			{
				question: "هل الأطفال مجانًا؟",
				answer:
					"الأطفال دون ١٢ سنة مجانًا ولا يلزم إدخال عددهم. عدّاد الحجز مخصص للبالغين فقط.",
			},
			{
				question: "ما طرق الدفع وهل توجد رسوم نقدية؟",
				answer:
					"يمكن الدفع أونلاين دون رسوم نقدية، أو الدفع نقدًا مع إضافة ٥ ريالات مرة واحدة على كامل الحجز، وليس لكل شخص.",
			},
			{
				question: "ما سياسة الإلغاء؟",
				answer: "عرض سياسة الإلغاء المعتمدة",
			},
		],
		bookingEyebrow: "ابدأ حجزك",
		bookingTitle: "احجز جولتك الإثرائية",
		bookingDescription:
			"اختر الموعد ونقطة التجمع، ثم أكمل بيانات الحجز. تفاصيل التوفر والسعر تظهر في النموذج.",
		bookingUnavailable:
			"تعذر تحميل خيارات الحجز الآن. يرجى تحديث الصفحة للمحاولة مرة أخرى.",
		bookMobile: "احجز الآن",
		mobilePriceFrom: "ابتداءً من",
		itineraryLabel: "محطة",
	},
	en: {
		breadcrumb: ["Home", "Experiences", "Makkah Sightseeing Bus tour"],
		badge: "Makkah · Shared tour",
		eyebrow: "Mzar enrichment tours",
		title: "Makkah Sightseeing Bus tour",
		heroDescription:
			"Explore Makkah with audio guidance in your language. Choose a 2:30 PM departure from Fairmont Hotel or 3:00 PM from Anjum Hotel.",
		languages: "Arabic · English · French · Turkish · Malay",
		book: "Book your tour",
		sponsorLabel: "This initiative is sponsored by",
		sponsorAlt: "Royal Commission for Makkah City and Holy Sites",
		carrierLabel: "Transport partner",
		carrierAlt: "Mazaya Group",
		guidanceEyebrow: "Every landmark has a story. Hear it in your language.",
		guidanceTitle: "Audio tour guidance in your language",
		guidanceDescription:
			"Listen to the stories of Makkah’s landmarks with audio tour guidance in your language, on an organized shared bus tour.",
		itineraryEyebrow: "Your journey, stop by stop",
		itineraryTitle: "Tour itinerary",
		itineraryDescription:
			"Choose a meeting point to see its departure time and tour route.",
		meetingEyebrow: "Your journey starts here",
		meetingTitle: "Meeting & departure points",
		meetingDescription: "Choose your preferred meeting point; departure time depends on the hotel.",
		viewMap: "View location on map",
		factsEyebrow: "",
		factsTitle: "A complete experience. A simple booking.",
		facts: [
			{ value: "5 hours", label: "Tour duration" },
			{ value: "Air-conditioned bus", label: "Comfortable bus" },
			{ value: "Kids go free", label: "Under 12" },
		],
		faqEyebrow: "",
		faqTitle: "Before you travel",
		faqs: [
			{
				question: "When and where does the tour depart?",
				answer:
					"The evening tours depart at 2:30 PM from Fairmont Hotel and 3:00 PM from Anjum Hotel, Makkah time. Choose the matching meeting point when booking.",
			},
			{
				question: "Is audio guidance available in my language?",
				answer:
					"Mzar offers audio tour guidance in Arabic, English, French, Turkish, and Malay to help you discover the landmarks and their stories.",
			},
			{
				question: "Are children free?",
				answer:
					"Children under 12 are free and do not need to be counted in the booking. The guest counter is for adults only.",
			},
			{
				question: "How can I pay? Is there a cash fee?",
				answer:
					"Pay online with no cash fee, or pay in cash with a one-time SAR 5 fee for the whole booking, not per person.",
			},
			{
				question: "What is the cancellation policy?",
				answer: "View the cancellation policy",
			},
		],
		bookingEyebrow: "Start your booking",
		bookingTitle: "Book your Makkah sightseeing bus tour",
		bookingDescription:
			"Choose a date and meeting point, then complete your booking details. Current availability and pricing appear in the form.",
		bookingUnavailable:
			"Booking options could not be loaded. Refresh the page to try again.",
		bookMobile: "Book now",
		mobilePriceFrom: "Starting from",
		itineraryLabel: "Stop",
	},
};

