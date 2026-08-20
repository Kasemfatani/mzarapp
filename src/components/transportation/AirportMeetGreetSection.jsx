"use client";

import styles from "./AirportMeetGreetSection.module.css";
import { Check } from "lucide-react";

export default function AirportMeetGreetSection({ lang = "ar" }) {
  const isAr = lang === "ar";

  const benefits = isAr
    ? [
        "متابعة موعد الوصول والتأخير",
        "لوحة استقبال باسم الضيف عند الطلب",
        "مساعدة في تحميل الحقائب",
        "بيانات السائق والمركبة قبل الموعد",
        "نقطة لقاء واضحة ودعم عبر واتساب",
      ]
    : [
        "Flight arrival & delay tracking",
        "Welcome signboard with guest name",
        "Luggage loading assistance",
        "Driver & vehicle info sent in advance",
        "Clear meeting point & WhatsApp support",
      ];

  return (
    <section className={styles.airportSection}>
      <div className={styles.container}>
        {/* Single Enclosed Card */}
        <div className={styles.airportServiceCard}>
          {/* Content (First in DOM / RTL Start) */}
          <div className={styles.airportContent}>
            <span className={styles.eyebrow}>
              {isAr ? "استقبال المطار دون قلق" : "Hassle-Free Airport Reception"}
            </span>

            <h2 className={styles.title}>
              {isAr
                ? "من بوابة الوصول إلى مركبتك بوضوح"
                : "From Arrival Gate to Your Vehicle Seamlessly"}
            </h2>

            <p className={styles.description}>
              {isAr
                ? "نتابع موعد وصول الرحلة ونرسل بيانات السائق ونقطة اللقاء مسبقًا، لتبدأ رحلتك بهدوء."
                : "We track flight arrival times and share driver and meeting point details in advance, so you start your journey with ease."}
            </p>

            {/* 2-Column Benefits Grid */}
            <ul className={styles.benefitsGrid}>
              {benefits.map((benefit, index) => (
                <li key={index} className={styles.benefitPill}>
                  <span>{benefit}</span>
                  <Check className={`w-4 h-4 ${styles.checkIcon}`} />
                </li>
              ))}
            </ul>
          </div>

          {/* Visual with Airplane Wing in Clouds (Second in DOM) */}
          <div className={styles.airportVisual}>
            <span className={styles.flightBadge}>
              {isAr ? "SV 1048 · في الموعد" : "SV 1048 · On Time"}
            </span>

            <div className={styles.meetingSign}>
              <small>{isAr ? "مرحبًا بكم" : "Welcome"}</small>
              <strong>{isAr ? "ضيف مزار" : "Mzar Guest"}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
