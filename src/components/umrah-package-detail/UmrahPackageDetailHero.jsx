"use client";

import styles from "./UmrahPackageDetailHero.module.css";
import { MessageCircle } from "lucide-react";

export default function UmrahPackageDetailHero({ lang = "ar", packageData = {} }) {
  const isAr = lang === "ar";
  const WHATSAPP_NUMBER = "966580121025";

  const {
    name = isAr ? "باقة العمرة" : "Umrah Package",
    description = "",
    starting_price_per_person = 0,
    features = [],
  } = packageData;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? `السلام عليكم، أود حجز ${name} والاستفسار عن تفاصيل البرنامج`
      : `Hello, I would like to book ${name} and inquire about program details`
  )}`;

  // Feature titles as chips
  const featureChips = features.map((f) => f.title).filter(Boolean);

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <a href="/">{isAr ? "الرئيسية" : "Home"}</a>
          <span>/</span>
          <a href="/umrah-packages">{isAr ? "باقات العمرة" : "Umrah Packages"}</a>
          <span>/</span>
          <span className={styles.currentBreadcrumb}>{name}</span>
        </nav>

        <div className={styles.heroGrid}>
          {/* Main Content */}
          <div className={styles.heroContent}>
            {/* <span className={styles.eyebrow}>
              {isAr ? "باقة عمرة متكاملة" : "Comprehensive Umrah Package"}
            </span> */}

            <h1 className={styles.title}>{name}</h1>

            {description && <p className={styles.description}>{description}</p>}

            {/* Feature Chips */}
            <div className={styles.detailChips}>
              {featureChips.map((chipText, index) => (
                <span key={index} className={styles.chip}>
                  {chipText}
                </span>
              ))}
              <span className={styles.chip}>
                {isAr ? "الحد الأدنى للتسعير: 3 أشخاص" : "Min pricing: 3 persons"}
              </span>
            </div>

            {/* Single Action Button */}
            <div className={styles.heroActions}>
              <a
                href={whatsappUrl}
                className={styles.btnWhatsapp}
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>{isAr ? "احجز عبر واتساب" : "Book via WhatsApp"}</span>
              </a>
            </div>
          </div>

          {/* Price Card (Single price per person) */}
          <aside className={styles.priceCard}>
            <small>{isAr ? "يبدأ سعر الفرد من" : "Starting price per person from"}</small>
            <strong className={styles.priceAmount}>
              {starting_price_per_person?.toLocaleString()}
              <em>{isAr ? "ر.س" : "SAR"}</em>
            </strong>
            <span className={styles.vatNotice}>
              {isAr ? "شامل ضريبة القيمة المضافة" : "VAT Included"}
            </span>
            <small className={styles.priceFooterNote}>
              {isAr
                ? "الأسعار مقدّرة على أساس 3 أشخاص وتخضع للتوفر."
                : "Prices calculated on a 3-person triple basis, subject to availability."}
            </small>
          </aside>
        </div>
      </div>
    </section>
  );
}
