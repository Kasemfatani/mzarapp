"use client";

import { useState } from "react";
import styles from "./HomeFaqSection.module.css";
import { ChevronDown, HelpCircle, ArrowLeft, ArrowRight } from "lucide-react";

export default function HomeFaqSection({ lang = "ar" }) {
  const isAr = lang === "ar";
  const [openIndexes, setOpenIndexes] = useState([0]); // first item open by default

  const faqs = [
    {
      question: isAr
        ? "هل يمكن تخصيص الباقة أو الجولة؟"
        : "Can packages or tours be customized?",
      answer: isAr
        ? "نعم، يمكن تعديل النقل والجولات وعدد الضيوف وبعض الخدمات الإضافية بحسب توفرها بالتواصل المباشر مع فريق الدعم."
        : "Yes, transportation, guided tours, group sizes, and optional add-ons can be customized based on availability by contacting our support team.",
    },
    {
      question: isAr
        ? "ما هي سياسة الإلغاء والاسترجاع؟"
        : "What is the cancellation and refund policy?",
      answer: isAr
        ? "تختلف حسب التجربة المختارة، وتظهر السياسة بوضوح كامل قبل تأكيد الحجز. معظم الجولات تتيح الإلغاء المجاني حتى 24 ساعة قبل الموعد."
        : "Cancellation policies vary by experience and are clearly displayed before booking. Most tours offer free cancellation up to 24 hours prior.",
    },
    {
      question: isAr
        ? "هل المرشد الصوتي متاح بعدة لغات؟"
        : "Is the audio guide available in multiple languages?",
      answer: isAr
        ? "نعم، يتوفر المحتوى بسبع لغات عالمية تشمل العربية، والإنجليزية، والفرنسية، والتركية، والأردية، والملايو، والروسية."
        : "Yes, our audio guide content is available in 7 global languages including Arabic, English, French, Turkish, Urdu, Malay, and Russian.",
    },
    {
      question: isAr
        ? "كيف أحصل على تأكيد الحجز وتفاصيل النقطة؟"
        : "How do I receive my booking confirmation and meeting details?",
      answer: isAr
        ? "يصلك التأكيد فورًا عبر البريد الإلكتروني ورسائل الواتساب، وتظهر جميع تفاصيل الرحلة ونقطة اللقاء داخل تطبيق مزار."
        : "You will receive an instant confirmation via email and WhatsApp, with complete meeting points and trip details stored directly in the Mzar app.",
    },
  ];

  const toggleIndex = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "كل ما تحتاج معرفته قبل الحجز" : "Everything You Need to Know Before Booking"}
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div
                key={index}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`${styles.faqToggleIcon} ${
                      isOpen ? styles.faqToggleIconOpen : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>
                {isOpen && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Link below FAQ to /faq page */}
        <div className={styles.faqAction}>
          <a href="/faq" className={styles.btnFaqLink}>
            <HelpCircle className="w-5 h-5" />
            <span>{isAr ? "عرض جميع الأسئلة الشائعة" : "View All FAQs"}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </a>
        </div>
      </div>
    </section>
  );
}
