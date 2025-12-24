// Remove lucide-react imports from data files (keep data pure)
// import { MapPin, Users, Compass, Globe, Calendar, Shield } from "lucide-react";

export function getPaths(isAr) {
	return {
		45: {
			id: 45,
			title: isAr
				? "تجربة زيارة المشاعر المقدسة"
				: "Experience Visiting the Holy Sites",
			description: isAr
				? "مسار المشاعر رحلة إيمانية تاريخية عبر المشاعر المقدسة ابتداءً من عرفات مروراً بمزدلفة ومن ثم منى وانتهاءً بجبل النور وحي حراء الثقافي. "
				: "The Holy Sites Path is a spiritual and historical journey through the holy sites starting from Arafat, passing through Muzdalifah, then Mina, and ending at Jabal al-Noor and the cultural district of Hira.",
			image: "",
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
					title: isAr ? "نقطة الانطلاق" : "Starting Point",
					detail: isAr
						? "ساحة الحرم المكي - مدخل الملك عبدالعزيز"
						: "Al-Haram Square - King Abdulaziz Entrance",
				},
				{
					icon: "compass",
					title: isAr ? "تحقق ذكي " : "Smart Tracking",
					detail: isAr
						? "تحقق من الوصول للوجهة تلقائياً"
						: "Smart destination arrival verification",
				},
				{
					icon: "globe",
					title: isAr ? "محتوى بعدة لغات" : "Multilingual Content",
					detail: isAr
						? "محتوى إثرائي متوفر ب6 لغات عالمية"
						: "Enriching content available in 6 global languages",
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
					title: isAr ? "روايات موثوقة" : "Trusted Narrations",
					detail: isAr
						? "قصص إثرائية معتمدة تُحكى لأول مرة"
						: "Accredited enriching stories told for the first time",
				},
			],
			about: {
				desc: isAr
					? "نأخذكم في رحلة إيمانية تاريخية، نسير فيها معكم عبر المشاعر المقدسة ابتداءً من عرفات مروراً بمزدلفة ومن ثم منى وانتهاءً بجبل النور وحي حراء الثقافي."
					: "We take you on a spiritual and historical journey, walking with you through the holy sites starting from Arafat, passing through Muzdalifah, then Mina, and ending at Jabal al-Noor and the cultural district of Hira.",
				list: isAr
					? [
							"عرفات ــ ثلاث وجهات رئيسية: جبل الرحمة ومسجد نمرة وخاصرة عين زبيدة.",
							"مزدلفة ــ وفيها مسجد المشعر الحرام.",
							"منى ــ حيث نطوف بكم بين: جسر الجمرات ومسجد الخيف.",
							"وفي نهاية الرحلة يمكنكم زيارة جبل النور وحي حراء الثقافي، والاستمتاع بجولة معرفية وإثرائية بين جنبات متاحفه.",
							"في هذه الرحلة نمزج بين السير في أراضي المشاعر والتحليق في سموّ المشاعر، وإثراء التجربة. ",
					  ]
					: [
							"Arafat — Three main destinations: Jabal al-Rahma, Namira Mosque, and the Zubaida Spring Basin.",
							"Muzdalifah — Home to the Sacred Mosque of Muzdalifah.",
							"Mina — Where we tour between: the Jamarat Bridge and Al-Khaif Mosque.",
							"At the end of the journey, you can visit Jabal al-Noor and the cultural district of Hira, and enjoy an informative and enriching tour among its museums.",
							"In this journey, we blend walking through the lands of the holy sites with soaring in the heights of spirituality, enriching the experience.",
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
						"Smart audio and text guide in multiple languages.",
						"Comfortable and safe transportation via air-conditioned vehicles.",
						"Entry to all holy sites and places",
						"Comfort amenities: Wi-Fi, charging cables, mineral water.",
						"Parking facilities near Jabal al-Rahma for easy access without walking or hardship.",
				  ],
			notIncluded: isAr
				? [
						"المشتريات والهدايا الشخصية.",
						"الوجبات.",
						"تذاكر المتاحف (يمكنك شراؤها عبر التطبيق). ",
				  ]
				: [
						"Personal purchases and gifts",
						"Meals",
						"Museum tickets (can be purchased through the app).",
				  ],
		},
		// ...more paths
	};
}
