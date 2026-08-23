"use client";

import styles from "./SanctuaryExperienceSteps.module.css";

export default function SanctuaryExperienceSteps({ lang = "ar" }) {
  const isAr = lang === "ar";

  const steps = [
    {
      num: "01",
      title: isAr ? "لقاء وترحيب" : "Meet & Welcome",
      desc: isAr
        ? "تعريف بالمرشد وطبيعة الجولة وتجهيز وسائل الاستماع الحديثة."
        : "Introduction by the certified guide and setup of smart audio receiver equipment.",
    },
    {
      num: "02",
      title: isAr ? "مدخل تاريخي" : "Historical Context",
      desc: isAr
        ? "سياق تاريخي موجز يساعدك على فهم المكان قبل اكتشاف تفاصيله."
        : "Brief historical introduction providing key background before exploring the landmarks.",
    },
    {
      num: "03",
      title: isAr ? "اكتشاف المعالم" : "Landmark Exploration",
      desc: isAr
        ? "محطات منتقاة تروي قصص العمارة والأحداث المرتبطة بقدسية المكان."
        : "Curated stops unveiling architectural history and sacred stories of the sanctuary.",
    },
    {
      num: "04",
      title: isAr ? "محتوى يرافقك" : "Ongoing Digital Content",
      desc: isAr
        ? "استكمل المعرفة عبر المحتوى الصوتي والنصي الثري في تطبيق مزار."
        : "Continue exploring in-depth audio and text stories anytime via the Mzar app.",
    },
  ];

  return (
    <section className={styles.stepsSection}>
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "رحلة منظمة" : "Structured Journey"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "ما الذي ستعيشه في الجولة؟" : "What You Will Experience on the Tour"}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? "تجربة متوازنة تجمع حضور المرشد بالمحتوى الرقمي، من لحظة اللقاء حتى نهاية الجولة."
              : "A balanced spiritual journey combining personal guide expertise with digital narration from start to finish."}
          </p>
        </div>

        {/* Steps Grid */}
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <article key={index} className={styles.stepCard}>
              <span className={styles.stepNumber}>{step.num}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
