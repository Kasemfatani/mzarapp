"use client";

import styles from "./UmrahPackageDetailHero.module.css";
import { MessageCircle, Calendar, MapPin, Users, Sparkles } from "lucide-react";

export default function UmrahPackageDetailHero({ lang = "ar", packageData = {} }) {
  const isAr = lang === "ar";
  const WHATSAPP_NUMBER = "966580121025";

  const {
    name = isAr ? "باقة العمرة" : "Umrah Package",
    nameEn = "Umrah Package",
    kicker = "",
    kickerEn = "",
    description = "",
    descriptionEn = "",
    duration = "",
    durationEn = "",
    makkahNights = "",
    makkahNightsEn = "",
    madinahNights = "",
    madinahNightsEn = "",
    pricingBase = "",
    pricingBaseEn = "",
    pricing = {},
  } = packageData;

  const pkgTitle = isAr ? name : nameEn;
  const pkgKicker = isAr ? kicker : kickerEn;
  const pkgDesc = isAr ? description : descriptionEn;

  const startMadinahStandard = pricing.madinah?.standard?.toLocaleString() || "—";
  const startMadinahPlus = pricing.madinah?.plus?.toLocaleString() || "—";
  const startJeddahStandard = pricing.jeddah?.standard?.toLocaleString() || "—";
  const startJeddahPlus = pricing.jeddah?.plus?.toLocaleString() || "—";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? `السلام عليكم، أود حجز ${name} (${duration}) والاستفسار عن توفر المقاعد والأسعار`
      : `Hello, I would like to book ${nameEn} (${durationEn}) and confirm availability and rates`
  )}`;

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <a href="/">{isAr ? "الرئيسية" : "Home"}</a>
          <span>/</span>
          <a href="/umrah-packages">{isAr ? "باقات العمرة" : "Umrah Packages"}</a>
          <span>/</span>
          <span className={styles.currentBreadcrumb}>{pkgTitle}</span>
        </nav>

        <div className={styles.heroGrid}>
          {/* Main Content */}
          <div className={styles.heroContent}>
            {pkgKicker && (
              <span className={styles.eyebrow}>
                <Sparkles className="w-3.5 h-3.5 inline-block me-1.5 text-[#aa9256]" />
                {pkgKicker}
              </span>
            )}

            <h1 className={styles.title}>{pkgTitle}</h1>

            {pkgDesc && <p className={styles.description}>{pkgDesc}</p>}

            {/* Feature Chips */}
            <div className={styles.detailChips}>
              <span className={styles.chip}>
                <Calendar className="w-3.5 h-3.5 inline-block me-1 text-[#315f4c]" />
                {isAr ? duration : durationEn}
              </span>
              <span className={styles.chip}>
                <MapPin className="w-3.5 h-3.5 inline-block me-1 text-[#315f4c]" />
                {isAr ? makkahNights : makkahNightsEn}
              </span>
              <span className={styles.chip}>
                <MapPin className="w-3.5 h-3.5 inline-block me-1 text-[#315f4c]" />
                {isAr ? madinahNights : madinahNightsEn}
              </span>
              <span className={styles.chip}>
                <Users className="w-3.5 h-3.5 inline-block me-1 text-[#315f4c]" />
                {isAr ? pricingBase : pricingBaseEn}
              </span>
            </div>

            {/* Hero CTA */}
            <div className={styles.heroActions}>
              <a
                href={whatsappUrl}
                className={styles.btnWhatsapp}
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>{isAr ? "احجز واستفسر عبر واتساب" : "Inquire & Book via WhatsApp"}</span>
              </a>
            </div>
          </div>

          {/* Pricing Overview Card */}
          <aside className={styles.priceCard}>
            <span className={styles.priceCardKicker}>
              {isAr ? "الأسعار للفرد (شامل الضريبة)" : "Rate Per Person (VAT Included)"}
            </span>

            <div className={styles.mainStartingPrice}>
              <small>{isAr ? "يبدأ من" : "Starting from"}</small>
              <strong className={styles.priceAmount}>
                {startMadinahStandard}
                <em>{isAr ? "ر.س" : "SAR"}</em>
              </strong>
            </div>

            <div className={styles.airportBreakdown}>
              <div className={styles.airportRow}>
                <span className={styles.airportName}>
                  {isAr ? "المغادرة من مطار المدينة:" : "From Madinah Airport:"}
                </span>
                <div className={styles.airportRates}>
                  <span>{isAr ? "الأساسية: " : "Standard: "}<b>{startMadinahStandard} {isAr ? "ر.س" : "SAR"}</b></span>
                  <span>{isAr ? "بلس: " : "Plus: "}<b>{startMadinahPlus} {isAr ? "ر.س" : "SAR"}</b></span>
                </div>
              </div>

              <div className={styles.airportRow}>
                <span className={styles.airportName}>
                  {isAr ? "المغادرة من مطار جدة:" : "From Jeddah Airport:"}
                </span>
                <div className={styles.airportRates}>
                  <span>{isAr ? "الأساسية: " : "Standard: "}<b>{startJeddahStandard} {isAr ? "ر.س" : "SAR"}</b></span>
                  <span>{isAr ? "بلس: " : "Plus: "}<b>{startJeddahPlus} {isAr ? "ر.س" : "SAR"}</b></span>
                </div>
              </div>
            </div>

            <small className={styles.priceFooterNote}>
              {isAr
                ? "الأسعار مقدّرة على أساس 3 أشخاص بغرفة ثلاثية وتخضع لتوفر المقاعد."
                : "Prices based on 3 persons triple occupancy, subject to availability."}
            </small>
          </aside>
        </div>
      </div>
    </section>
  );
}
