"use client";

import styles from "./SanctuaryToursSection.module.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SanctuaryToursSection({ lang = "ar" }) {
  const isAr = lang === "ar";

  return (
    <section className={styles.toursSection} id="tours">
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "اختر وجهتك" : "Choose Your Destination"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "تجربتان بروح مكانين" : "Two Experiences in Two Holy Sanctuaries"}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? "كل جولة صُممت لتكشف قصص المكان ومعالمه بلغة واضحة وتجربة منظمة."
              : "Each tour is designed to unveil sacred historical landmarks through clear storytelling and structured guidance."}
          </p>
        </div>

        {/* 2-Tour Cards Grid */}
        <div className={styles.tourGrid}>
          {/* Card 1: Grand Mosque (Al-Haram) */}
          <article className={styles.tourCard} id="haram-tour">
            <div className={`${styles.tourPhoto} ${styles.haramPhoto}`}>
              <span className={styles.cityBadge}>
                {isAr ? "مكة المكرمة" : "Makkah Al-Mukarramah"}
              </span>
              <span className={styles.tourNumber}>01</span>
            </div>

            <div className={styles.cardBody}>
              <span className={styles.cardEyebrow}>
                {isAr ? "جولة الحرم المكي" : "Grand Mosque Tour"}
              </span>
              <h3 className={styles.cardTitle}>
                {isAr ? "جولة المسجد الحرام الإثرائية" : "The Grand Mosque Enriching Tour"}
              </h3>
              <p className={styles.cardDescription}>
                {isAr
                  ? "رحلة معرفية تتتبع تاريخ أول بيت وعمارة المسجد الحرام، وتكشف للزائر تفاصيل المعالم التي يمر بها بعين مختلفة."
                  : "A spiritual learning journey tracing the architectural history of the first House of Worship, revealing the deeper meaning of its sacred landmarks."}
              </p>

              {/* Highlights */}
              <div className={styles.highlightsRow}>
                <span className={styles.highlightChip}>
                  {isAr ? "تاريخ وعمارة الحرم" : "History & Architecture"}
                </span>
                <span className={styles.highlightChip}>
                  {isAr ? "الصفا والمروة" : "Safa & Marwa"}
                </span>
                <span className={styles.highlightChip}>
                  {isAr ? "الساحات والمعالم" : "Courtyards & Landmarks"}
                </span>
              </div>

              {/* Facts Grid */}
              <div className={styles.factsGrid}>
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>{isAr ? "المدة" : "Duration"}</span>
                  <span className={styles.factValue}>{isAr ? "90 دقيقة" : "90 Minutes"}</span>
                </div>
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>{isAr ? "اللغات" : "Languages"}</span>
                  <span className={styles.factValue}>{isAr ? "7 لغات عالمية" : "7 Languages"}</span>
                </div>
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>{isAr ? "النوع" : "Type"}</span>
                  <span className={styles.factValue}>{isAr ? "إثرائية مع مرشد" : "Guided Tour"}</span>
                </div>
              </div>

              {/* Action Button linking to /trip-detail/88 */}
              <div className={styles.cardActions}>
                <a href="/trip-detail/88" className={styles.btnCardPrimary}>
                  <span>{isAr ? "استكشف جولة المسجد الحرام" : "Explore Grand Mosque Tour"}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </a>
              </div>
            </div>
          </article>

          {/* Card 2: Prophet's Mosque (Al-Nabawi) */}
          <article className={styles.tourCard} id="nabawi-tour">
            <div className={`${styles.tourPhoto} ${styles.nabawiPhoto}`}>
              <span className={styles.cityBadge}>
                {isAr ? "المدينة المنورة" : "Madinah Al-Munawwarah"}
              </span>
              <span className={styles.tourNumber}>02</span>
            </div>

            <div className={styles.cardBody}>
              <span className={styles.cardEyebrow}>
                {isAr ? "جولة الحرم النبوي" : "Prophet's Mosque Tour"}
              </span>
              <h3 className={styles.cardTitle}>
                {isAr ? "جولة المسجد النبوي الإثرائية" : "The Prophet's Mosque Enriching Tour"}
              </h3>
              <p className={styles.cardDescription}>
                {isAr
                  ? "تجربة تتناول تاريخ عمارة المسجد النبوي ومعالمه وقصصه، وتربط الزائر بالمكان وسيرته بأسلوب معرفي قريب."
                  : "An insightful exploration of the Prophet's Mosque architecture and historic stories, connecting visitors with its sacred heritage."}
              </p>

              {/* Highlights */}
              <div className={styles.highlightsRow}>
                <span className={styles.highlightChip}>
                  {isAr ? "عمارة المسجد النبوي" : "Prophet's Mosque Architecture"}
                </span>
                <span className={styles.highlightChip}>
                  {isAr ? "الساحات والقباب" : "Courtyards & Domes"}
                </span>
                <span className={styles.highlightChip}>
                  {isAr ? "المعالم التاريخية" : "Historic Landmarks"}
                </span>
              </div>

              {/* Facts Grid */}
              <div className={styles.factsGrid}>
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>{isAr ? "المدة" : "Duration"}</span>
                  <span className={styles.factValue}>{isAr ? "90 دقيقة" : "90 Minutes"}</span>
                </div>
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>{isAr ? "الإرشاد" : "Guidance"}</span>
                  <span className={styles.factValue}>{isAr ? "مرشد مرخص" : "Licensed Guide"}</span>
                </div>
                <div className={styles.factItem}>
                  <span className={styles.factLabel}>{isAr ? "التوقيت" : "Schedule"}</span>
                  <span className={styles.factValue}>{isAr ? "مسائية" : "Evening"}</span>
                </div>
              </div>

              {/* Action Button linking to /trip-detail/87 */}
              <div className={styles.cardActions}>
                <a
                  href="/trip-detail/87"
                  className={`${styles.btnCardPrimary} ${styles.btnNabawi}`}
                >
                  <span>{isAr ? "استكشف جولة المسجد النبوي" : "Explore Prophet's Mosque Tour"}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
