"use client";

import styles from "./UmrahPackagesDiffExplainer.module.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function UmrahPackagesDiffExplainer({ lang = "ar" }) {
  const isAr = lang === "ar";

  return (
    <section className={styles.explainerSection}>
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "الفرق ببساطة" : "Simply the Difference"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "الأساسية أم بلس؟" : "Standard or Plus?"}
          </h2>
        </div>

        {/* 2-Card Explainer Grid */}
        <div className={styles.versionExplainer}>
          {/* Card 1: Standard */}
          <article className={styles.explainerCard}>
            <span className={styles.versionIcon}>01</span>
            <h3>{isAr ? "الباقة الأساسية" : "Standard Package"}</h3>
            <p>
              {isAr
                ? "تشمل النقل والجولات والإرشاد والخدمات المشتركة في البرنامج، ولا تشمل الإقامة."
                : "Includes comprehensive transfers, guided tours, audio guidance, and hospitality; hotel accommodation is not included."}
            </p>
            <a href="#packages" className={styles.explainerLink}>
              <span>{isAr ? "اختر المدة المناسبة" : "Choose Your Duration"}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </a>
          </article>

          {/* Card 2: Plus */}
          <article className={`${styles.explainerCard} ${styles.explainerCardPlus}`}>
            <span className={styles.versionIcon}>+</span>
            <h3>{isAr ? "باقة بلس" : "Plus Package"}</h3>
            <p>
              {isAr
                ? "كل خدمات الباقة الأساسية، بالإضافة إلى الإقامة في فندق 4 نجوم وتوزيع غرفة ثلاثية."
                : "All benefits of the Standard package, plus 4-star hotel lodging in triple room occupancy."}
            </p>
            <a href="#packages" className={styles.explainerLink}>
              <span>{isAr ? "قارن خيارات بلس" : "Compare Plus Options"}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
