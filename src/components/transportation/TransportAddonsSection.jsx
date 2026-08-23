"use client";

import styles from "./TransportAddonsSection.module.css";
import { Baby, Accessibility, LayoutTemplate, MapPin } from "lucide-react";

export default function TransportAddonsSection({ lang = "ar" }) {
  const isAr = lang === "ar";

  const addons = [
    {
      icon: <Baby className="w-5 h-5" />,
      title: isAr ? "كرسي أطفال" : "Child Safety Seat",
      desc: isAr ? "حسب الفئة العمرية والتوفر" : "Available upon request by age",
    },
    {
      icon: <Accessibility className="w-5 h-5" />,
      title: isAr ? "كرسي متحرك" : "Wheelchair Assistance",
      desc: isAr ? "مساعدة إضافية لكبار السن" : "Extra mobility support on demand",
    },
    {
      icon: <LayoutTemplate className="w-5 h-5" />,
      title: isAr ? "لوحة استقبال خاصة" : "Personalized Signboard",
      desc: isAr ? "باسم الضيف أو المجموعة" : "With guest or group name",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: isAr ? "توقف إضافي مجدول" : "Additional Stopover",
      desc: isAr ? "إضافة محطة خاصة إلى مسارك" : "Add custom stops along your route",
    },
  ];

  return (
    <section className={styles.addonsSection}>
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "تجهيزات حسب الاحتياج" : "Customizable Add-Ons"}
          </span>
          <h2 className={styles.title}>
            {isAr
              ? "تفاصيل صغيرة تجعل الطريق أسهل وأكثر راحة"
              : "Thoughtful Details Making Your Journey Smoother"}
          </h2>
        </div>

        {/* Addons Grid */}
        <div className={styles.addonsGrid}>
          {addons.map((item, index) => (
            <article key={index} className={styles.addonCard}>
              <div className={styles.addonIcon}>{item.icon}</div>
              <div className={styles.addonInfo}>
                <b>{item.title}</b>
                <small>{item.desc}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
