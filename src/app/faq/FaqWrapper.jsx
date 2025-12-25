"use client";

import { useState } from 'react';
import { Hero } from '@/components/faq/Hero';
import { CategoryTabs } from '@/components/faq/CategoryTabs';
import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { TrustReinforcement } from '@/components/faq/TrustReinforcement';
import { SupportCTA } from '@/components/faq/SupportCTA';
import { FinalCTA } from '@/components/faq/FinalCTA';


export default function FaqWrapper({ lang }) {
	const isAr = lang === "ar";

	const categories = [
		{ id: "all", label: isAr ? "الكل" : "All" },
		{ id: "booking-payment", label: isAr ? "الحجز والدفع" : "Booking & Payment" },
		{ id: "tours", label: isAr ? "الرحلات والجولات" : "Tours & Trips" },
		{ id: "cancellation", label: isAr ? "الإلغاء والاسترجاع" : "Cancellation & Refund" },
		{ id: "meetup-transport", label: isAr ? "نقاط التجمع والتنقل" : "Meetup & Transport" },
		{ id: "guides-services", label: isAr ? "المرشدين والخدمات" : "Guides & Services" },
		{ id: "support", label: isAr ? "المشاكل والدعم الفني" : "Support & Technical Issues" },
	];

	const faqs = [
		// BOOKING & PAYMENT
		{
			id: "1",
			category: "booking-payment",
			question:  isAr ? "كيف يمكنني حجز رحلة عبر مزار ؟" : "How can I book a trip through Mzar?",
			answer:
				isAr ? "اختر الرحلة المناسبة من صفحة الرحلات، حدّد التاريخ وعدد الأشخاص، ثم أكمل عملية الدفع بسهولة عبر البوابة الإلكترونية الآمنة. ستصلك رسالة تأكيد فورية على بريدك الإلكتروني ورقم جوالك." : "Choose the suitable trip from the tours page, select the date and number of people, then complete the payment easily through the secure online gateway. You will receive an instant confirmation message on your email and phone number.",
		},
		{
			id: "2",
			category: "booking-payment",
			question: isAr ? "هل الحجز فوري؟" : "Is the booking instant?",
			answer:
				isAr ? "نعم، جميع الرحلات المتاحة على منصة مزار تتيح تأكيدًا فوريًا بعد إتمام عملية الدفع. ستحصل على تفاصيل الحجز كاملة في الحال." : "Yes, all available trips on the Mzar platform offer instant confirmation after completing the payment. You will receive full booking details immediately.",
		},
		{
			id: "3",
			category: "booking-payment",
			question: isAr ? "ما طرق الدفع المتوفرة؟" : "What payment methods are available?",
			answer:
				isAr ? "نوفر طرق دفع متعددة تشمل: بطاقات مدى، فيزا، ماستر كارد، Apple Pay، والدفع الإلكتروني الآمن عبر بوابات معتمدة." : "We offer multiple payment methods including Mada cards, Visa, MasterCard, Apple Pay, and secure electronic payment through approved gateways.",
		},
		{
			id: "4",
			category: "booking-payment",
			question: isAr ? "هل يمكنني الحجز لأكثر من شخص؟" : "Can I book for more than one person?",
			answer:
				isAr ? "نعم، يمكنك تحديد عدد الأشخاص أثناء عملية الحجز، سواء كنت تحجز لعائلتك أو لمجموعة. نوفر خصومات خاصة للمجموعات الكبيرة." : "Yes, you can specify the number of people during the booking process, whether you are booking for your family or a group. We offer special discounts for large groups.",
		},

		// CANCELLATION & REFUND
		{
			id: "5",
			category: "cancellation",
			question: isAr ? "هل يمكنني إلغاء الحجز؟" : "Can I cancel my booking?",
			answer:
				isAr ? "نعم، يمكنك إلغاء الحجز مجانًا قبل موعد الرحلة بـ 24 ساعة على الأقل حسب سياسة الإلغاء المحددة لكل رحلة. يُرجى مراجعة تفاصيل سياسة الإلغاء في صفحة الحجز." : "Yes, you can cancel your booking for free at least 24 hours before the trip according to the cancellation policy specified for each trip. Please review the cancellation policy details on the booking page.",
		},
		{
			id: "6",
			category: "cancellation",
			question: isAr ? "متى يتم استرجاع المبلغ؟" : "When is the refund processed?",
			answer:
				isAr ? "يتم استرجاع المبلغ خلال 5–7 أيام عمل عبر نفس وسيلة الدفع التي استخدمتها. ستصلك رسالة تأكيد فور معالجة طلب الاسترجاع." : "The refund is processed within 5–7 business days through the same payment method you used. You will receive a confirmation message once the refund request is processed.",
		},
		{
			id: "7",
			category: "cancellation",
			question: isAr ? "ما هي سياسة الاسترجاع في حالة الإلغاء المتأخر؟" : "What is the refund policy for late cancellations?",
			answer:
				isAr ? "في حالة الإلغاء قبل موعد الرحلة بأقل من 24 ساعة، قد يتم خصم رسوم إدارية تصل إلى 50% من قيمة الحجز. الإلغاء في يوم الرحلة لا يشمل استرجاع المبلغ." : "In case of cancellation less than 24 hours before the trip, an administrative fee of up to 50% of the booking value may be deducted. Cancellation on the day of the trip does not include a refund.",
		},

		// TOURS & TRIPS
		{
			id: "8",
			category: "tours",
			question: isAr ? "هل الجولات مناسبة للعائلات؟" : "Are the tours suitable for families?",
			answer:
				isAr ? "نعم، معظم الجولات على منصة مزار مصممة لتناسب العائلات والأفراد من جميع الأعمار. يُوضّح ذلك في تفاصيل كل رحلة مع الإشارة لأي متطلبات خاصة." : "Yes, most tours on the Mzar platform are designed to suit families and individuals of all ages. This is clarified in the details of each trip with any special requirements noted.",
		},
		{
			id: "9",
			category: "tours",
			question: isAr ? "هل يوجد مرشدون معتمدون؟" : "Are there certified guides?",
			answer:
				isAr ? "جميع المرشدين في مزار معتمدون من الجهات الرسمية وذوو خبرة واسعة في المجال السياحي والروحاني. نحرص على تقديم تجربة احترافية وممتعة." : "All guides at Mzar are certified by official authorities and have extensive experience in the tourism and spiritual fields. We strive to provide a professional and enjoyable experience.",
		},
		{
			id: "10",
			category: "tours",
			question: isAr ? "ما مدة الجولات المتوفرة؟" : "What is the duration of the available tours?",
			answer:
				isAr ? "تتراوح مدة الجولات بين نصف يوم إلى عدة أيام حسب نوع البرنامج. جميع التفاصيل متوفرة في صفحة كل جولة مع مسار الرحلة والأنشطة المتضمنة." : "The duration of the tours ranges from half a day to several days depending on the program type. All details are available on each tour page with the itinerary and included activities.",
		},

		// MEETUP & TRANSPORT
		{
			id: "11",
			category: "meetup-transport",
			question: isAr ? "من أين تنطلق الرحلات؟" : "Where do the trips depart from?",
			answer:
				isAr ? "تنطلق معظم الرحلات من نقاط تجمع محددة في مكة المكرمة والمدينة المنورة. ستحصل على موقع نقطة الانطلاق الدقيق عبر خرائط GPS في رسالة التأكيد." : "Most trips depart from designated gathering points in Mecca and Medina. You will receive the exact departure location via GPS maps in the confirmation message.",
		},
		{
			id: "12",
			category: "meetup-transport",
			question: isAr ? "هل يشمل الحجز خدمة النقل؟" : "Does the booking include transportation service?",
			answer:
				isAr ? "نعم، معظم رحلاتنا تشمل خدمة النقل المريح من نقطة التجمع وإليها. يتم توضيح ذلك في تفاصيل كل رحلة." : "Yes, most of our trips include comfortable transportation service from and to the gathering point. This is clarified in the details of each trip.",
		},
		{
			id: "13",
			category: "meetup-transport",
			question: isAr ? "ماذا أفعل إذا تأخرت عن موعد الانطلاق؟" : "What should I do if I am late for the departure time?",
			answer:
				isAr ? "يُرجى التواصل مع المرشد مباشرة عبر الرقم المتوفر في رسالة التأكيد. نحاول قدر الإمكان الانتظار، لكن يُفضل الوصول قبل 15 دقيقة من موعد الانطلاق." : "Please contact the guide directly via the number provided in the confirmation message. We try to wait as much as possible, but it is preferable to arrive 15 minutes before the departure time.",
		},

		// GUIDES & SERVICES
		{
			id: "14",
			category: "guides-services",
			question: isAr ? "هل يتحدث المرشدون اللغة الإنجليزية؟" : "Do the guides speak English?",
			answer:
				isAr ? "نعم، نوفر مرشدين يتحدثون العربية والإنجليزية. يمكنك تحديد اللغة المفضلة عند الحجز." : "Yes, we provide guides who speak Arabic and English. You can specify your preferred language when booking.",
		},
		{
			id: "15",
			category: "guides-services",
			question: isAr ? "هل يمكنني التواصل مع المرشد قبل الرحلة؟" : "Can I contact the guide before the trip?",
			answer:
				isAr ? "نعم، ستتلقى معلومات التواصل مع المرشد قبل موعد الرحلة بـ 24 ساعة على الأقل لأي استفسارات أو ترتيبات خاصة." : "Yes, you will receive the guide's contact information at least 24 hours before the trip for any inquiries or special arrangements.",
		},
		{
			id: "16",
			category: "guides-services",
			question: isAr ? "ماذا يتضمن برنامج الرحلة؟" : "What does the trip itinerary include?",
			answer:
				isAr ? "كل رحلة تتضمن برنامج مفصل يشمل: الأماكن المزارة، مدة كل موقع، وجبات الطعام (إن وُجدت)، النقل، والأنشطة الإضافية. جميع التفاصيل متوفرة في صفحة الحجز." : "Each trip includes a detailed itinerary covering: places visited, duration at each site, meals (if any), transportation, and additional activities. All details are available on the booking page.",
		},

		// SUPPORT & TECHNICAL
		{
			id: "17",
			category: "support",
			question: isAr ? "ماذا أفعل إذا تأخر المرشد؟" : "What should I do if the guide is late?",
			answer:
				isAr ? "يمكنك التواصل مباشرة مع المرشد عبر الرقم المتوفر، أو مع فريق الدعم من خلال الدردشة المباشرة أو الاتصال على خدمة العملاء." : "You can contact the guide directly via the provided number, or reach out to the support team through live chat or by calling customer service.",
		},
		{
			id: "18",
			category: "support",
			question: isAr ? "كيف يمكنني التواصل مع فريق الدعم؟" : "How can I contact the support team?",
			answer:
				isAr ? "يمكنك التواصل معنا عبر الدردشة المباشرة في التطبيق، أو عبر البريد الإلكتروني support@Mzar.sa، أو الاتصال على +966 50 123 4567." : "You can contact us via live chat in the app, by email at support@Mzar.sa, or by calling +966 50 123 4567.",
		},
		{
			id: "19",
			category: "support",
			question: isAr ? "هل يمكنني تعديل تفاصيل الحجز؟" : "Can I modify my booking details?",
			answer:
				isAr ? "نعم، يمكنك تعديل التاريخ أو عدد الأشخاص قبل موعد الرحلة بـ 48 ساعة على الأقل من خلال التواصل مع فريق الدعم." : "Yes, you can modify the date or number of people at least 48 hours before the trip by contacting the support team.",
		},
		{
			id: "20",
			category: "support",
			question: isAr ? "ماذا أفعل في حالة الطوارئ أثناء الرحلة؟" : "What should I do in case of an emergency during the trip?",
			answer:
				isAr ? "في حالة الطوارئ، تواصل مباشرة مع المرشد المرافق أو اتصل بخط الطوارئ على الرقم المتوفر في رسالة التأكيد." : "In case of an emergency, contact the accompanying guide directly or call the emergency line at the number provided in the confirmation message.",
		},
	];

	const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} isAr={isAr} />
			<CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
				isAr={isAr}
      />
			<FAQAccordion faqs={faqs} activeCategory={activeCategory} searchQuery={searchQuery} isAr={isAr} />
			<TrustReinforcement isAr={isAr} />
			<SupportCTA isAr={isAr} />
			<FinalCTA isAr={isAr} />
		</div>
	);
}
