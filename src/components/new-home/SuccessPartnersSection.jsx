"use client";

import styles from "./SuccessPartnersSection.module.css";

export default function SuccessPartnersSection({ lang = "ar" }) {
  const isAr = lang === "ar";

  const partners = [
    {
      id: "royal-commission",
      logo: "/partners/royal-commission-makkah.svg",
      name: isAr
        ? "الهيئة الملكية لمدينة مكة المكرمة والمشاعر المقدسة"
        : "Royal Commission for Makkah City & Holy Sites",
      role: isAr ? "شريك استراتيجي" : "Strategic Partner",
    },
    {
      id: "al-haramain",
      logo: "/partners/al-haramain.svg",
      name: isAr
        ? "الهيئة العامة للعناية بالحرمين الشريفين"
        : "General Authority for the Care of the Two Holy Mosques",
      role: isAr ? "شريك إثرائي" : "Enrichment Partner",
    },
    {
      id: "ministry-tourism",
      logo: "/partners/ministry-tourism.svg",
      name: isAr ? "وزارة السياحة" : "Ministry of Tourism",
      role: isAr ? "شريك مرخّص" : "Licensed Partner",
    },
  ];

  return (
    <section className={styles.partnersSection} id="partners">
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "شركاء النجاح" : "Success Partners"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "شراكات تصنع تجربة أكثر أثرًا" : "Partnerships Shaping an Impactful Experience"}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? "نفخر بالعمل مع جهات تقود جودة التجربة وخدمة ضيوف مكة المكرمة والحرمين الشريفين."
              : "Proud to collaborate with prestigious entities elevating the visit experience in Makkah and the Two Holy Mosques."}
          </p>
        </div>

        {/* Partners Grid */}
        <div className={styles.partnersGrid}>
          {partners.map((partner) => (
            <article key={partner.id} className={styles.partnerCard}>
              <div className={styles.partnerLogo}>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                />
              </div>
              <div className={styles.partnerInfo}>
                <b>{partner.name}</b>
                <span>{partner.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
