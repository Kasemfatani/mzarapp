"use client";

import styles from "./UmrahPackagesInclusions.module.css";
import { CheckCircle2, XCircle, Info } from "lucide-react";

export default function UmrahPackagesInclusions({ lang = "ar" }) {
  const isAr = lang === "ar";

  const inclusions = isAr
    ? [
        "خدمات النقل المحددة لكل باقة والنقل بين مكة المكرمة والمدينة المنورة",
        "جميع الجولات الإثرائية الموضحة داخل البرنامج",
        "جولة المسجد الحرام وجولة المسجد النبوي المعرفية",
        "مرافق متمرس خلال المسارات الخارجية ومرشد سياحي مرخص",
        "الإرشاد الرقمي الصوتي والنصي عبر تطبيق مزار بـ 7 لغات",
        "دعم مباشر عبر واتساب على مدار الساعة، مياه وضيافة، وضريبة القيمة المضافة",
        "في باقات بلس: إقامة في فندق 4 نجوم مع نقل ترددي للحرم حسب الفندق",
      ]
    : [
        "Dedicated transportation for each package and intercity transfer between Makkah & Madinah",
        "All cultural and historical tours specified in the program",
        "Insightful guided tours inside Masjid Al-Haram and the Prophet's Mosque",
        "Licensed tour guide and accompanying team during external historical trails",
        "Multilingual smart audio guidance via Mzar app in 7 languages",
        "24/7 direct WhatsApp support, complimentary water & hospitality, and 15% VAT included",
        "In Plus packages: 4-star hotel accommodation with shuttle service to the Haram",
      ];

  const exclusions = isAr
    ? [
        "تذاكر الطيران الدولية والمحلية، رسوم التأشيرة، والتأمين الطبي",
        "شرائح الاتصال والبيانات، والوجبات اليومية غير المحددة",
        "تذاكر دخول المتاحف والمعارض غير المذكورة في البرنامج",
        "المصروفات الشخصية والمشتريات الخاصة",
        "أي خدمة أو جولة إضافية غير مدرجة صراحة في تفاصيل الباقة",
      ]
    : [
        "International & domestic flight tickets, visa fees, and medical insurance",
        "SIM cards, data plans, and daily meals not explicitly specified",
        "Entry tickets to museums or exhibitions not mentioned in the itinerary",
        "Personal expenses and personal shopping",
        "Any additional service or optional tour not explicitly listed in the package details",
      ];

  return (
    <section className={styles.inclusionsSection}>
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "وضوح قبل الدفع" : "Clarity Before Booking"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "ما تشمله جميع الباقات" : "What All Packages Include"}
          </h2>
        </div>

        {/* 2-Card Inclusions Grid */}
        <div className={styles.includedGrid}>
          {/* Inclusions Card */}
          <article className={`${styles.includedCard} ${styles.cardInclude}`}>
            <div className={styles.cardHeader}>
              <span className={styles.headerIcon}>
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <h3>{isAr ? "مشمول في الباقة" : "Included"}</h3>
            </div>
            <ul className={styles.list}>
              {inclusions.map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <CheckCircle2 className={`w-4 h-4 ${styles.checkIcon}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Exclusions Card */}
          <article className={`${styles.includedCard} ${styles.cardExclude}`}>
            <div className={styles.cardHeader}>
              <span className={styles.headerIcon}>
                <XCircle className="w-5 h-5" />
              </span>
              <h3>{isAr ? "غير مشمول" : "Not Included"}</h3>
            </div>
            <ul className={styles.list}>
              {exclusions.map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <XCircle className={`w-4 h-4 ${styles.xIcon}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* Price Note Notice */}
        <div className={styles.catalogNote}>
          <span className={styles.noteBadge}>
            <Info className="w-4 h-4 inline-block me-1" />
            {isAr ? "معلومة السعر" : "Pricing Note"}
          </span>
          <span>
            {isAr
              ? "الأسعار للفرد الواحد، مقدّرة على 3 أشخاص، وتشمل الضريبة. تختلف باختلاف العدد ومطار المغادرة، وتخضع للتوفر."
              : "Prices are per person, based on 3 people sharing, and include tax. They vary depending on the group size and departure airport, and are subject to availability."}
          </span>
        </div>
      </div>
    </section>
  );
}
