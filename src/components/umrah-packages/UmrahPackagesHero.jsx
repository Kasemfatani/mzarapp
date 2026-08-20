"use client";

import styles from "./UmrahPackagesHero.module.css";
import { Check, MessageCircle, ArrowDown } from "lucide-react";

export default function UmrahPackagesHero({ lang = "ar" }) {
  const isAr = lang === "ar";
  const WHATSAPP_NUMBER = "966580121025";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? "السلام عليكم، أرغب بالمساعدة في اختيار باقة عمرة مزار الأنسب لي"
      : "Hello, I would like assistance choosing the most suitable Mzar Umrah package"
  )}`;

  const trustItems = isAr
    ? ["الأسعار للفرد", "شاملة ضريبة القيمة المضافة", "دعم واتساب 24/7", "حجز أون لاين "]
    : ["Prices per Person", "VAT Included", "WhatsApp Support", "Online Booking"];

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <a href="/">{isAr ? "الرئيسية" : "Home"}</a>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span>{isAr ? "باقات العمرة" : "Umrah Packages"}</span>
        </nav>

        {/* Eyebrow */}
        <span className={styles.eyebrow}>
          {isAr ? "باقات واضحة. رحلة مطمئنة." : "Clear Packages. A Serene Journey."}
        </span>

        {/* Heading */}
        <h1 className={styles.title}>
          {isAr
            ? "اختر رحلة العمرة الأقرب لوقتك واحتياجك"
            : "Choose the Umrah Journey Tailored to Your Time & Needs"}
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          {isAr
            ? "برامج متكاملة تجمع مكة والمدينة مع تجارب إثرائية مختارة. اختر المدة، ثم قارن بين الباقة الأساسية وبلس."
            : "Comprehensive programs combining Makkah and Madinah with curated spiritual experiences. Select your duration, then choose between Standard and Plus."}
        </p>

        {/* Hero Actions */}
        <div className={styles.heroActions}>
          <a href="#packages" className={styles.btnPrimary}>
            <span>{isAr ? "استعرض الباقات" : "Explore Packages"}</span>
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href={whatsappUrl}
            className={styles.btnSecondary}
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span>{isAr ? "ساعدني في الاختيار" : "Help Me Choose"}</span>
          </a>
        </div>

        {/* Trust Row */}
        <div className={styles.trustRow}>
          {trustItems.map((item, index) => (
            <div key={index} className={styles.trustItem}>
              <Check className={`w-4 h-4 ${styles.checkIcon}`} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
