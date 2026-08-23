"use client";

import { useState } from "react";
import styles from "./UmrahPackageDetailMainLayout.module.css";
import { commonInclusions } from "@/data/umrahPackagesData";
import { 
  Check, 
  X, 
  MessageCircle, 
  MapPin, 
  Sparkles, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  Building2, 
  Plane 
} from "lucide-react";

export default function UmrahPackageDetailMainLayout({ lang = "ar", packageData = {} }) {
  const isAr = lang === "ar";
  const WHATSAPP_NUMBER = "966580121025";

  const {
    name = "",
    nameEn = "",
    duration = "",
    durationEn = "",
    pricing = {},
    routeStops = [],
    comparison = [],
    itinerary = [],
    experiences = [],
    transfers = [],
  } = packageData;

  // Selected state for the sticky sidebar calculation
  const [selectedTier, setSelectedTier] = useState("standard"); // 'standard' | 'plus'
  const [selectedAirport, setSelectedAirport] = useState("madinah"); // 'madinah' | 'jeddah'

  // Calculate current price
  const currentPrice = pricing[selectedAirport]?.[selectedTier] || 0;
  const tierLabel = isAr
    ? selectedTier === "plus" ? `${name} بلس` : `${name} (الأساسية)`
    : selectedTier === "plus" ? `${nameEn} (Plus)` : `${nameEn} (Standard)`;

  const airportLabel = isAr
    ? selectedAirport === "madinah" ? "مطار المدينة" : "مطار جدة"
    : selectedAirport === "madinah" ? "Madinah Airport" : "Jeddah Airport";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? `السلام عليكم، أود حجز ${tierLabel} - المغادرة من (${airportLabel}). أرجو تأكيد التوفر والمواعيد.`
      : `Hello, I would like to book ${tierLabel} - Departure from (${airportLabel}). Please confirm availability and dates.`
  )}`;

  const standardInclusions = isAr ? commonInclusions.standard : commonInclusions.standardEn;
  const plusBonus = isAr ? commonInclusions.plusBonus : commonInclusions.plusBonusEn;
  const excludedItems = isAr ? commonInclusions.excluded : commonInclusions.excludedEn;
  const bookingPolicyText = isAr ? commonInclusions.bookingPolicy.ar : commonInclusions.bookingPolicy.en;

  return (
    <section className={styles.mainSection}>
      <div className={styles.container}>
        <div className={styles.detailLayout}>
          {/* Left Column: Comprehensive Content */}
          <div className={styles.contentColumn}>
            
            {/* 1. Journey Route Map */}
            {routeStops.length > 0 && (
              <div className={styles.detailBlock}>
                <div className={styles.blockHeading}>
                  <span className={styles.blockEyebrow}>
                    {isAr ? "ملخص الرحلة" : "Journey Summary"}
                  </span>
                  <h2 className={styles.blockTitle}>
                    {isAr ? "مسار متكامل من الوصول حتى التوديع" : "Complete Route from Arrival to Departure"}
                  </h2>
                </div>

                <div className={styles.journeyRouteBox}>
                  {routeStops.map((stop, index) => (
                    <div key={index} className={styles.routeItem}>
                      <div className={`${styles.routePoint} ${stop.isMajor ? styles.routePointMajor : ""}`}>
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{isAr ? stop.name : stop.nameEn}</span>
                      </div>
                      {index < routeStops.length - 1 && (
                        <div className={styles.routeConnector}>
                          <span className={styles.routeLine} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Package Comparison & Pricing Table */}
            <div className={styles.detailBlock}>
              <div className={styles.blockHeading}>
                <span className={styles.blockEyebrow}>
                  {isAr ? "مقارنة الفئات والأسعار" : "Tiers & Pricing Comparison"}
                </span>
                <h2 className={styles.blockTitle}>
                  {isAr
                    ? `${name} و${name} بلس — مقارنة الخدمات والأسعار`
                    : `${nameEn} Standard vs Plus — Inclusions & Rates`}
                </h2>
              </div>

              {/* Comparison Matrix Table */}
              <div className={styles.comparisonTableWrapper}>
                <table className={styles.comparisonTable}>
                  <thead>
                    <tr>
                      <th>{isAr ? "الخدمة / الميزة" : "Feature / Service"}</th>
                      <th className={styles.thStandard}>{isAr ? "الباقة الأساسية" : "Standard Tier"}</th>
                      <th className={styles.thPlus}>{isAr ? "باقة بلس (+)" : "Plus Tier (+)"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, index) => (
                      <tr key={index}>
                        <td className={styles.featureCell}>
                          <strong>{isAr ? row.feature : row.featureEn}</strong>
                        </td>
                        <td className={styles.standardCell}>
                          <span>{isAr ? row.standard : row.standardEn}</span>
                        </td>
                        <td className={styles.plusCell}>
                          <span>{isAr ? row.plus : row.plusEn}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Dual Airport Pricing Matrix , comment out for now*/}
              {/* <div className={styles.pricingMatrixBox}>
                <h3 className={styles.matrixHeading}>
                  {isAr ? "الأسعار للفرد الواحد بحسب مطار المغادرة (شامل الضريبة)" : "Rate Per Person by Departure Airport (VAT Included)"}
                </h3>

                <div className={styles.matrixGrid}>
                  
                  <div className={styles.matrixCard}>
                    <div className={styles.matrixCardHeader}>
                      <Plane className="w-4 h-4 text-[#315f4c]" />
                      <h4>{isAr ? "المغادرة من مطار المدينة المنورة" : "Departure: Madinah Airport"}</h4>
                    </div>
                    <div className={styles.matrixCardBody}>
                      <div className={styles.matrixPriceItem}>
                        <span>{isAr ? "الأساسية:" : "Standard:"}</span>
                        <strong>{pricing.madinah?.standard?.toLocaleString()} {isAr ? "ر.س" : "SAR"}</strong>
                      </div>
                      <div className={`${styles.matrixPriceItem} ${styles.matrixPriceItemPlus}`}>
                        <span>{isAr ? "بلس (مع إقامة):" : "Plus (With Hotel):"}</span>
                        <strong>{pricing.madinah?.plus?.toLocaleString()} {isAr ? "ر.س" : "SAR"}</strong>
                      </div>
                    </div>
                  </div>

                  
                  <div className={styles.matrixCard}>
                    <div className={styles.matrixCardHeader}>
                      <Plane className="w-4 h-4 text-[#7f2637]" />
                      <h4>{isAr ? "المغادرة من مطار جدة" : "Departure: Jeddah Airport"}</h4>
                    </div>
                    <div className={styles.matrixCardBody}>
                      <div className={styles.matrixPriceItem}>
                        <span>{isAr ? "الأساسية:" : "Standard:"}</span>
                        <strong>{pricing.jeddah?.standard?.toLocaleString()} {isAr ? "ر.س" : "SAR"}</strong>
                      </div>
                      <div className={`${styles.matrixPriceItem} ${styles.matrixPriceItemPlus}`}>
                        <span>{isAr ? "بلس (مع إقامة):" : "Plus (With Hotel):"}</span>
                        <strong>{pricing.jeddah?.plus?.toLocaleString()} {isAr ? "ر.س" : "SAR"}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <small className={styles.matrixNotice}>
                  {isAr
                    ? "الأسعار مقدّرة على أساس 3 أشخاص بغرفة ثلاثية، وتختلف بحسب التواريخ وتوفر المقاعد والغرف."
                    : "Prices calculated on 3 persons triple occupancy basis, subject to dates and availability."}
                </small>
              </div> */}
            </div>

            {/* 3. Daily Itinerary (البرنامج اليومي من الكتيب) */}
            {/* Note: Kept modular so it can be easily commented out if requested */}
            {/* {itinerary.length > 0 && (
              <div className={styles.detailBlock}>
                <div className={styles.blockHeading}>
                  <span className={styles.blockEyebrow}>
                    {isAr ? "الجدول الزمني" : "Schedule"}
                  </span>
                  <h2 className={styles.blockTitle}>
                    {isAr ? "البرنامج اليومي للرحلة" : "Daily Journey Itinerary"}
                  </h2>
                </div>

                <div className={styles.itineraryTimeline}>
                  {itinerary.map((item, index) => (
                    <div key={index} className={styles.timelineItem}>
                      <div className={styles.timelineDayBadge}>
                        <small>{isAr ? "اليوم" : "Day"}</small>
                        <b>{isAr ? item.day : item.dayEn}</b>
                      </div>
                      <div className={styles.timelineContent}>
                        <h4 className={styles.timelineTitle}>{isAr ? item.title : item.titleEn}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* 4. Included Experiences & Tours */}
            {experiences.length > 0 && (
              <div className={styles.detailBlock}>
                <div className={styles.blockHeading}>
                  <span className={styles.blockEyebrow}>
                    {isAr ? "الجولات المشمولة" : "Included Tours"}
                  </span>
                  <h2 className={styles.blockTitle}>
                    {isAr ? "التجارب والجولات الإثرائية المشمولة" : "Included Experiences & Heritage Tours"}
                  </h2>
                </div>

                <div className={styles.experienceGrid}>
                  {experiences.map((exp, index) => (
                    <article key={index} className={styles.experienceCard}>
                      <div className={styles.experienceCardTop}>
                        <span className={styles.experienceNumber}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {exp.badge && (
                          <span className={styles.experienceBadge}>
                            <Clock className="w-3 h-3 inline-block me-1" />
                            {isAr ? exp.badge : exp.badgeEn}
                          </span>
                        )}
                      </div>
                      <h3 className={styles.experienceName}>{isAr ? exp.title : exp.titleEn}</h3>
                      <p className={styles.experienceDesc}>{isAr ? exp.desc : exp.descEn}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Inclusions & Exclusions Checklist */}
            <div className={styles.detailBlock}>
              <div className={styles.blockHeading}>
                <span className={styles.blockEyebrow}>
                  {isAr ? "الوضوح والشفافية" : "Clarity & Inclusions"}
                </span>
                <h2 className={styles.blockTitle}>
                  {isAr ? "ما تشمله الباقة وما لا تشمله" : "What is Included & Excluded"}
                </h2>
              </div>

              <div className={styles.inclusionsGrid}>
                {/* Inclusions Card */}
                <div className={styles.inclusionCard}>
                  <div className={styles.inclusionCardHeader}>
                    <Check className="w-5 h-5 text-[#315f4c]" />
                    <h3>{isAr ? "الخدمات المشمولة في الباقة" : "Included Services"}</h3>
                  </div>
                  <ul className={styles.inclusionList}>
                    {standardInclusions.map((item, idx) => (
                      <li key={idx}>
                        <Check className="w-4 h-4 text-[#315f4c] shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {plusBonus.map((item, idx) => (
                      <li key={`plus-${idx}`} className={styles.plusInclusionItem}>
                        <Sparkles className="w-4 h-4 text-[#7f2637] shrink-0 mt-1" />
                        <span><b>{isAr ? "في باقة بلس فقط: " : "Plus Tier Only: "}</b>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions Card */}
                <div className={`${styles.inclusionCard} ${styles.exclusionCard}`}>
                  <div className={styles.inclusionCardHeader}>
                    <X className="w-5 h-5 text-[#884242]" />
                    <h3>{isAr ? "الخدمات غير المشمولة" : "Excluded Services"}</h3>
                  </div>
                  <ul className={styles.inclusionList}>
                    {excludedItems.map((item, idx) => (
                      <li key={idx}>
                        <X className="w-4 h-4 text-[#a34444] shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 6. Booking Policy */}
            <div className={styles.policyBox}>
              <div className={styles.policyHeader}>
                <ShieldCheck className="w-5 h-5 text-[#315f4c]" />
                <b>{isAr ? "سياسة وشروط الحجز" : "Booking Policy & Terms"}</b>
              </div>
              <p>{bookingPolicyText}</p>
            </div>

          </div>

          {/* Right Column: Sticky Interactive Booking Sidebar (Desktop) */}
          <div className={styles.sidebarColumn}>
            <aside className={styles.purchasePanel} id="purchase">
              <span className={styles.purchaseEyebrow}>
                {isAr ? "أكمل حجزك مع مزار" : "Complete Your Booking"}
              </span>
              <h3 className={styles.purchaseTitle}>{isAr ? name : nameEn}</h3>

              {/* Tier Selector Buttons */}
              <div className={styles.selectorSection}>
                <label className={styles.selectorLabel}>
                  {isAr ? "اختر فئة الباقة:" : "Select Package Tier:"}
                </label>
                <div className={styles.tierButtonGroup}>
                  <button
                    type="button"
                    onClick={() => setSelectedTier("standard")}
                    className={`${styles.btnTier} ${selectedTier === "standard" ? styles.btnTierActive : ""}`}
                  >
                    <b>{isAr ? "الأساسية" : "Standard"}</b>
                    <small>{isAr ? "نقل وجولات" : "Tours & Transfers"}</small>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTier("plus")}
                    className={`${styles.btnTier} ${styles.btnTierPlus} ${selectedTier === "plus" ? styles.btnTierPlusActive : ""}`}
                  >
                    <b>{isAr ? "بلس (+)" : "Plus (+)"}</b>
                    <small>{isAr ? "مع إقامة 4 نجوم" : "With 4-Star Hotel"}</small>
                  </button>
                </div>
              </div>

              {/* Airport Selector */}
              <div className={styles.selectorSection}>
                <label className={styles.selectorLabel}>
                  {isAr ? "مطار المغادرة:" : "Departure Airport:"}
                </label>
                <div className={styles.airportButtonGroup}>
                  <button
                    type="button"
                    onClick={() => setSelectedAirport("madinah")}
                    className={`${styles.btnAirport} ${selectedAirport === "madinah" ? styles.btnAirportActive : ""}`}
                  >
                    {isAr ? "مطار المدينة المنورة" : "Madinah Airport"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAirport("jeddah")}
                    className={`${styles.btnAirport} ${selectedAirport === "jeddah" ? styles.btnAirportActive : ""}`}
                  >
                    {isAr ? "مطار جدة" : "Jeddah Airport"}
                  </button>
                </div>
              </div>

              {/* Price Summary */}
              <div className={styles.purchaseSummary}>
                <div className={styles.summaryRow}>
                  <span>{isAr ? "المدة" : "Duration"}:</span>
                  <strong>{isAr ? duration : durationEn}</strong>
                </div>
                <div className={styles.summaryRow}>
                  <span>{isAr ? "الفئة المختارة" : "Selected Tier"}:</span>
                  <strong>{tierLabel}</strong>
                </div>
                <div className={styles.summaryRow}>
                  <span>{isAr ? "السعر للفرد" : "Rate Per Person"}:</span>
                  <em className={selectedTier === "plus" ? styles.pricePlusColor : ""}>
                    {currentPrice.toLocaleString()} {isAr ? "ر.س" : "SAR"}
                  </em>
                </div>
              </div>

              {/* Single WhatsApp Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPurchaseWhatsapp}
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>{isAr ? "الشراء والتأكيد عبر واتساب" : "Book & Confirm via WhatsApp"}</span>
              </a>

              <small className={styles.purchaseNote}>
                {isAr
                  ? "سيقوم مستشار مزار بتأكيد التوفر وتنسيق المواعيد وتفاصيل الفندق قبل السداد."
                  : "Mzar travel consultant will verify availability, dates, and hotel details before payment."}
              </small>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
