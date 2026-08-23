"use client";

import styles from "./TransportHero.module.css";
import { Check, Sparkles, ArrowDown } from "lucide-react";

export default function TransportHero({ lang = "ar" }) {
  const isAr = lang === "ar";

  const trustBadges = isAr
    ? ["تتبع موعد الرحلة", "سائقون محترفون", "دعم مباشر", "مركبات مكيفة"]
    : ["Flight Tracking", "Professional Drivers", "Direct Support", "Air-Conditioned"];

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          {/* Main Hero Copy */}
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <a href="/">{isAr ? "الرئيسية" : "Home"}</a>
              <span>/</span>
              <span>{isAr ? "خدمات التنقل" : "Transportation Services"}</span>
            </nav>

            <span className={styles.eyebrow}>
              {isAr ? "من الوصول حتى المغادرة" : "From Arrival to Departure"}
            </span>

            <h1 className={styles.title}>
              {isAr ? (
                <>
                  تنقّل براحة،
                  <br />
                  ونحن نهتم بالطريق
                </>
              ) : (
                "Travel in Comfort, We Care for the Journey"
              )}
            </h1>

            <p className={styles.subtitle}>
              {isAr
                ? "استقبال من المطار وتنقل خاص بين مكة والمدينة وجدة، بمركبات تناسب الأفراد والعائلات والمجموعات."
                : "Airport reception and private transfers between Makkah, Madinah, and Jeddah with premium vehicles tailored for individuals, families, and groups."}
            </p>

            {/* Action Buttons */}
            <div className={styles.heroActions}>
              <a href="#fleet" className={styles.btnPrimary}>
                <span>{isAr ? "استعرض المركبات" : "Explore Fleet"}</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <a href="#transport-services" className={styles.btnLight}>
                <span>{isAr ? "تعرّف على خدماتنا" : "Our Services"}</span>
              </a>
            </div>

            {/* Trust Strip */}
            <div className={styles.trustRow}>
              {trustBadges.map((badge, index) => (
                <div key={index} className={styles.trustItem}>
                  <Check className="w-4 h-4 text-[#ead494]" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrival Card */}
          <aside className={styles.arrivalCard}>
            <div className={styles.arrivalIcon}>
              <Sparkles className="w-6 h-6" />
            </div>
            <small>{isAr ? "خدمة متكاملة" : "Complete Service"}</small>
            <strong>{isAr ? "من المطار إلى وجهتك" : "From Airport to Destination"}</strong>

            <div className={styles.arrivalRoute}>
              <span>{isAr ? "وصول" : "Arrival"}</span>
              <div className={styles.routeLine} />
              <span>{isAr ? "استقبال" : "Reception"}</span>
              <div className={styles.routeLine} />
              <span>{isAr ? "انطلاق" : "Departure"}</span>
            </div>

            <p className={styles.arrivalDesc}>
              {isAr
                ? "بيانات السائق ورقم اللوحة ونقطة اللقاء تصلك قبل الموعد بوقت كافٍ."
                : "Driver contact, vehicle plate details, and meeting point are shared well in advance."}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
