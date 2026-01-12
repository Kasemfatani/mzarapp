"use client";

import { useState } from "react";
import { Hero } from "@/components/faq/Hero";
import { CategoryTabs } from "@/components/faq/CategoryTabs";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
// import { TrustReinforcement } from "@/components/faq/TrustReinforcement";
// import { SupportCTA } from "@/components/faq/SupportCTA";
// import { FinalCTA } from "@/components/faq/FinalCTA";
import LazyBottomSections from "@/components/faq/LazyBottomSections";



export default function FaqWrapper({ lang }) {
	const isAr = lang === "ar";

	const categories = [
		{ id: "all", label: isAr ? "الكل" : "All" },
		{ id: "mzar", label: isAr ? "عن مزار والتطبيق" : "About Mzar & the App" },
		{
			id: "booking-payment",
			label: isAr ? "الحجز والدفع" : "Booking & Payment",
		},
		{ id: "tours", label: isAr ? "الرحلات والجولات" : "Tours & Trips" },
		{
			id: "guides-services",
			label: isAr ? "المرشدون والخدمة الميدانية" : "Guides & Field Service",
		},
		{
			id: "support",
			label: isAr ? "الدعم والطوارئ" : "Support & Emergencies",
		},
		// {
		// 	id: "cancellation",
		// 	label: isAr ? "الإلغاء والاسترجاع" : "Cancellation & Refund",
		// },
		// {
		// 	id: "meetup-transport",
		// 	label: isAr ? "نقاط التجمع والتنقل" : "Meetup & Transport",
		// },
	];

	const faqs = [
		// About Mzar
		{
			id: "1",
			category: "mzar",
			question: isAr ? "ما هو تطبيق مزار؟" : "What is Mzar app?",
			answer: isAr
				? "تطبيق مزار هو منصة رقمية متخصصة في التجارب الإثرائية التاريخية والثقافية، تتيح للمستخدم استكشاف المعالم الدينية والتاريخية في مكة المكرمة والمدينة المنورة من خلال جولات ميدانية ذكية وتفاعلية."
				: "Mzar is a digital platform specializing in historical, cultural, and enrichment experiences. It enables users to explore religious and historical landmarks in Makkah and Madinah through smart, interactive guided tours.",
		},
		{
			id: "2",
			category: "mzar",
			question: isAr
				? "كيف يمكنني تحميل تطبيق مزار؟"
				: "How can I download Mzar app?",
			answer: isAr
				? "يمكنك تحميل التطبيق مباشرة من متجر App Store أو Google Play عبر البحث عن كلمة Mzar وتثبيته على جهازك أو من خلال الرابط التالي: https://onelink.to/yb2xky"
				: "You can download the app directly from the App Store or Google Play by searching for Mzar, or via the following link: https://onelink.to/yb2xky",
		},
		{
			id: "3",
			category: "mzar",
			question: isAr
				? "كيف أستفيد من التطبيق في تخطيط رحلتي؟"
				: "How can I use the app to plan my trip?",
			answer: isAr
				? "بعد تثبيت التطبيق، يمكنك تصفح التجارب المتاحة واختيار التجربة التي تناسب وقتك واهتماماتك، ثم حجزها والدفع إلكترونياً بسهولة."
				: "After installing the app, you can browse available experiences, choose the one that fits your schedule and interests, then book and pay easily online.",
		},
		{
			id: "4",
			category: "mzar",
			question: isAr
				? "هل يقدم التطبيق معلومات عن المعالم التي تتم زيارتها؟"
				: "Does the app provide information about the sites being visited?",
			answer: isAr
				? "نعم، يقدم مزار محتوى معرفي شامل عن كل وجهة يتم زيارتها، يشمل التاريخ، الأهمية، والموقع الجغرافي، والعديد من القصص الموثوقة."
				: "Yes. Mzar offers comprehensive, reliable enrichment content for every destination, including history, significance, geographic location, and authenticated stories.",
		},
		{
			id: "5",
			category: "mzar",
			question: isAr
				? "هل يوفر التطبيق وسائل نقل؟"
				: "Does the app provide transportation?",
			answer: isAr
				? "نعم، يمكنك اختيار وسيلة النقل المناسبة ضمن التجارب المتاحة، سواء كانت حافلات سياحية أو سيارات مريحة خاصة."
				: "Yes. You can select the suitable transportation option within the available experiences, whether tourist buses or comfortable private vehicles.",
		},
		{
			id: "6",
			category: "mzar",
			question: isAr
				? "هل يقدم التطبيق إرشاداً صوتياً ونصياً؟"
				: "Does the app offer audio and text guidance?",
			answer: isAr
				? "بكل تأكيد، يوفر مزار تجارب بإرشاد صوتي ونصي بـ 6 لغات عالمية لسهولة فهم التجربة لجميع الزوار."
				: "Absolutely. Mzar provides audio and text guidance in 6 international languages, making the experience accessible to all visitors.",
		},
		// Booking & Payment
		{
			id: "7",
			category: "booking-payment",
			question: isAr
				? "كيف يمكنني حجز تجربة عبر مزار؟"
				: "How can I book an experience through Mzar?",
			answer: isAr
				? "اختر التجربة المناسبة من صفحة التجارب، حدّد التاريخ وعدد الأشخاص، ثم أكمل عملية الدفع بأمان عبر البوابة الإلكترونية. ستصلك رسالة تأكيد فورية على بريدك الإلكتروني ورقم جوالك."
				: "Select your desired experience from the Experiences page, choose the date and number of participants, then complete the payment securely through the online gateway. You will receive instant confirmation via email and SMS.",
		},
		{
			id: "8",
			category: "booking-payment",
			question: isAr ? "هل الحجز فوري؟" : "Is booking instant?",
			answer: isAr
				? "نعم، يتم تأكيد الحجز تلقائياً بمجرد إتمام عملية الدفع بنجاح."
				: "Yes. Your booking is confirmed automatically once payment is successfully completed.",
		},
		{
			id: "9",
			category: "booking-payment",
			question: isAr
				? "ماهي طرق الدفع المتوفرة؟"
				: "What payment methods are available?",
			answer: isAr
				? "يدعم مزار جميع وسائل الدفع الإلكتروني المعتمدة، بما في ذلك بطاقات الائتمان، Apple Pay وغيرها."
				: "Mzar supports all approved electronic payment methods, including credit cards, Apple Pay, and others.",
		},
		{
			id: "10",
			category: "booking-payment",
			question: isAr
				? "هل يمكنني الحجز لأكثر من شخص؟"
				: "Can I book for more than one person?",
			answer: isAr
				? "نعم، يمكنك حجز التجربة لك ولعائلتك أو أصدقائك من خلال نفس العملية، مع تحديد عدد الأشخاص قبل الدفع."
				: "Yes. You can book for yourself, family, or friends in one reservation by selecting the number of participants before payment.",
		},
		{
			id: "11",
			category: "booking-payment",
			question: isAr
				? "هل يمكنني تعديل تفاصيل الحجز؟"
				: "Can I modify my booking details?",
			answer: isAr
				? "يمكنك تعديل الموعد أو عدد المشاركين قبل موعد التجربة بمدة لا تقل عن ساعتين، عبر التواصل مع فريق الدعم."
				: "Yes. You can modify the date or number of participants at least 2 hours before the experience by contacting the support team.",
		},
		{
			id: "12",
			category: "booking-payment",
			question: isAr ? "هل يمكنني إلغاء الحجز؟" : "Can I cancel my booking?",
			answer: isAr
				? "نعم، يمكنك الإلغاء بسهولة عبر التطبيق قبل ساعتين من موعد التجربة دون رسوم."
				: "Yes. You can cancel easily through the app up to 2 hours before the experience with no fees.",
		},
		{
			id: "13",
			category: "booking-payment",
			question: isAr
				? "متى يتم استرجاع المبلغ؟"
				: "When will the refund be processed?",
			answer: isAr
				? "يتم استرجاع المبلغ خلال 3 إلى 14 يوم عمل حسب البنك أو وسيلة الدفع المستخدمة."
				: "Refunds are processed within 3 to 14 business days, depending on your bank or payment provider.",
		},
		{
			id: "14",
			category: "booking-payment",
			question: isAr
				? "ما هي سياسة الإلغاء المتأخر؟"
				: "What is the late cancellation policy?",
			answer: isAr
				? "إذا تم الإلغاء قبل أقل من ساعتين من موعد التجربة، يتم خصم 25% من قيمة الحجز، وبعد انطلاق التجربة لا يُسترد المبلغ."
				: "If cancellation occurs less than 2 hours before the experience, 25% of the booking amount will be deducted. After the experience has started, the amount is non-refundable.",
		},
		// Experiences
		{
			id: "15",
			category: "tours",
			question: isAr
				? "هل التجارب مناسبة للعائلات؟"
				: "Are the experiences suitable for families?",
			answer: isAr
				? "نعم، جميع التجارب مُصمّمة لتناسب العائلات والفئات المختلفة من الزوار، وتشمل محطات آمنة ومريحة."
				: "Yes. All experiences are designed to suit families and different visitor groups, with safe and comfortable stops.",
		},
		{
			id: "16",
			category: "tours",
			question: isAr
				? "ما مدة التجارب المتوفرة؟"
				: "What is the duration of the experiences?",
			answer: isAr
				? "تتراوح المدة بين ساعة ونصف إلى أربع ساعات حسب نوع المسار وعدد الوجهات المشمولة في التجربة."
				: "Durations range from 1.5 to 4 hours, depending on the tour and number of destinations.",
		},
		{
			id: "17",
			category: "tours",
			question: isAr
				? "من أين تنطلق التجارب؟"
				: "Where do the experiences start?",
			answer: isAr
				? "تختلف نقطة الانطلاق بحسب نوع التجربة: في معظم الجولات، يصل السائق إليك مباشرة في موقعك أو فندقك المحدد عند الحجز لتبدأ رحلتك براحة تامة. أما بعض الجولات الخاصة مثل باص الجولات الإثرائية، فلها محطات تجمع محددة موضحة في تفاصيل الجولة."
				: "Departure points vary by experience: In most tours, the driver will pick you up directly from your location or hotel. Some special tours, such as Enrichment Tours Bus, have designated gathering points listed in the experience details.",
		},
		{
			id: "18",
			category: "tours",
			question: isAr
				? "هل يشمل الحجز خدمة النقل؟"
				: "Does the booking include transportation?",
			answer: isAr
				? "نعم، في معظم التجارب، تشمل الخدمة وسائل نقل مريحة وآمنة من وإلى نقطة التجمع."
				: "Yes. Most experiences include comfortable and safe transportation to and from the meeting point.",
		},
		{
			id: "19",
			category: "tours",
			question: isAr
				? "ماذا أفعل إذا تأخرت عن موعد الانطلاق؟"
				: "What if I arrive late?",
			answer: isAr
				? "نوصي بالوصول قبل الموعد بـ15 دقيقة. في حال التأخير، يرجى التواصل فوراً مع فريق الدعم لمعرفة إمكانية الانضمام أو إعادة الجدولة."
				: "We recommend arriving 15 minutes early. If you are late, please contact support immediately to check availability for joining or rescheduling.",
		},
		{
			id: "20",
			category: "tours",
			question: isAr
				? "هل يتضمن الحجز برنامج التجربة؟"
				: "Does the booking include an experience itinerary?",
			answer: isAr
				? "نعم، يحتوي كل حجز على برنامج تفصيلي للمحطات والمعالم المدرجة ضمن التجربة."
				: "Yes. Each booking includes a detailed itinerary outlining all stops and landmarks included in the experience.",
		},
		// Drivers & Guides
		{
			id: "21",
			category: "guides-services",
			question: isAr ? "هل يوجد مرشدون معتمدون؟" : "Are the guides certified?",
			answer: isAr
				? "نعم، جميع المرشدين في مزار مرخصون ومعتمدون من الجهات الرسمية، ويتلقون تدريباً متخصصاً لتقديم تجربة معرفية آمنة وثرية."
				: "Yes. All Mzar guides are officially licensed and certified, and receive specialized training to deliver a safe and enriching experience.",
		},
		{
			id: "22",
			category: "guides-services",
			question: isAr
				? "هل يتحدث المرشدون اللغة الإنجليزية؟"
				: "Do the guides speak English?",
			answer: isAr
				? "نعم، يتحدث المرشدون أكثر من لغة، والتطبيق نفسه يدعم 6 لغات لتسهيل التواصل مع جميع الزوار."
				: "Yes. Guides speak multiple languages, and the app itself supports 6 languages.",
		},
		{
			id: "23",
			category: "guides-services",
			question: isAr
				? "ماذا أفعل إذا تأخر المرشد؟"
				: "What if the guide is late?",
			answer: isAr
				? "في حال تأخر المرشد عن الموعد المحدد، سيتم إشعارك فوراً عبر التطبيق أو الرسائل النصية، مع متابعة الدعم الفني للحالة حتى بدء الجولة."
				: "If the guide is delayed, you will be notified immediately via the app or SMS, and support will follow up until the tour begins.",
		},
		{
			id: "24",
			category: "guides-services",
			question: isAr
				? "كيف يمكنني التواصل مع السائق من خلال التطبيق؟"
				: "How can I communicate with the driver?",
			answer: isAr
				? "التطبيق يوفر واجهة تواصل (Live Chat) سلسة مع السائق، حيث يمكنك التحدث معه بلغتك المفضلة."
				: "The app provides a seamless Live Chat feature, allowing you to communicate with the driver in your preferred language.",
		},
		// Support & Emergencies
		{
			id: "25",
			category: "support",
			question: isAr
				? "كيف يمكنني التواصل مع فريق الدعم؟"
				: "How can I contact the support team?",
			answer: isAr
				? "يمكنك التواصل معنا على مدار الساعة عبر:\nالبريد الإلكتروني: info@mzarapp.com\nأو عبر الواتساب: +966580121025"
				: "Support is available 24/7 via:\nEmail: info@mzarapp.com\nWhatsApp: +966580121025",
		},
		{
			id: "26",
			category: "support",
			question: isAr
				? "ماذا أفعل في حالة الطوارئ أثناء الرحلة؟"
				: "What should I do in case of an emergency during the trip?",
			answer: isAr
				? "في حال حدوث أي طارئ، تواصل مباشرة مع السائق أو المنظم في الموقع، أو استخدم خيار “الطوارئ” في التطبيق ليتم توجيه الدعم المناسب فوراً."
				: "Contact the driver or on-site organizer immediately, or use the Emergency option in the app to receive instant assistance.",
		},
	];

	const [searchQuery, setSearchQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState("all");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				isAr={isAr}
			/>
			<CategoryTabs
				categories={categories}
				activeCategory={activeCategory}
				onCategoryChange={setActiveCategory}
				isAr={isAr}
			/>
			<FAQAccordion
				faqs={faqs}
				activeCategory={activeCategory}
				searchQuery={searchQuery}
				isAr={isAr}
			/>
			<LazyBottomSections isAr={isAr} />
			{/* <TrustReinforcement isAr={isAr} />
			<SupportCTA isAr={isAr} />
			<FinalCTA isAr={isAr} /> */}
		</div>
	);
}
