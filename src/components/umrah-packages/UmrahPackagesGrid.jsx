"use client";

import Link from "next/link";
import styles from "./UmrahPackagesGrid.module.css";
import { Check, ArrowLeft, ArrowRight, MapPin, Sparkles } from "lucide-react";

export default function UmrahPackagesGrid({ lang = "ar", packages = [] }) {
  const isAr = lang === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className={styles.packagesSection} id="packages">
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "باقات عمرة مزار" : "Mzar Umrah Packages"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "ابدأ بالمدة المناسبة لرحلتك" : "Choose the Ideal Duration for Your Journey"}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? "ثلاث باقات متكاملة تجمع مكة والمدينة مع تجارب إثرائية مختارة. اختر المدة واطّلع على تفاصيل الباقة الأساسية وبلس."
              : "Three comprehensive packages combining Makkah & Madinah with curated heritage experiences. Explore full details for Standard & Plus tiers."}
          </p>
        </div>

        {/* Packages Grid */}
        <div className={styles.packagesGrid}>
          {packages.map((pkg) => {
            const startStandard = pkg.pricing?.madinah?.standard?.toLocaleString() || "—";
            const startPlus = pkg.pricing?.madinah?.plus?.toLocaleString() || "—";
            const href = `/umrah-package/${pkg.slug}`;

            return (
              <article key={pkg.id || pkg.slug} className={styles.packageCard}>
                {/* Card Top */}
                <div className={styles.packageTop}>
                  <div className={styles.durationBadge}>
                    <b>{pkg.daysCount || pkg.nightsCount}</b>
                    <span>{isAr ? (pkg.daysCount > 10 ? " يوم" : "أيام") : (pkg.daysCount > 1 ? "days" : "day")}</span>
                  </div>

                  <div className={styles.packageHeader}>
                    {pkg.tag && (
                      <span className={styles.packageTag}>
                        <Sparkles className="w-3 h-3 inline-block me-1" />
                        {isAr ? pkg.tag : pkg.tagEn}
                      </span>
                    )}
                    <h3 className={styles.packageTitle}>
                      {isAr ? pkg.name : pkg.nameEn}
                    </h3>
                    <p className={styles.packageDurationDesc}>
                      {isAr ? pkg.duration : pkg.durationEn}
                    </p>
                  </div>
                </div>

                {/* Route Line Summary */}
                <div className={styles.routeSummary}>
                  <MapPin className="w-4 h-4 text-[#aa9256] shrink-0" />
                  <span>
                    {isAr ? pkg.makkahNights : pkg.makkahNightsEn} · {isAr ? pkg.madinahNights : pkg.madinahNightsEn}
                  </span>
                </div>

                {/* Description */}
                <p className={styles.packageDescription}>
                  {isAr ? pkg.description : pkg.descriptionEn}
                </p>

                {/* Features / Highlights Preview */}
                <div className={styles.featuresList}>
                  <span className={styles.featuresHeading}>
                    {isAr ? "أبرز الجولات والمحطات:" : "Key Highlights & Stops:"}
                  </span>
                  {((isAr ? pkg.highlights : pkg.highlightsEn) || []).map((highlight, fIndex) => (
                    <div key={fIndex} className={styles.featureItem}>
                      <span className={styles.featureIcon}>
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Dual Pricing Preview Box */}
                <div className={styles.pricingPreviewBox}>
                  <div className={styles.priceRow}>
                    <div className={styles.priceMeta}>
                      <span className={styles.tierName}>{isAr ? "الباقة الأساسية" : "Standard Tier"}</span>
                      <small className={styles.tierHint}>{isAr ? "نقل وجولات" : "Transfers & Tours"}</small>
                    </div>
                    <div className={styles.priceValue}>
                      <small>{isAr ? "تبدأ من" : "From"}</small>
                      <strong>{startStandard} <abbr title="Saudi Riyal">{isAr ? "ر.س" : "SAR"}</abbr></strong>
                    </div>
                  </div>

                  <div className={`${styles.priceRow} ${styles.priceRowPlus}`}>
                    <div className={styles.priceMeta}>
                      <span className={styles.tierNamePlus}>{isAr ? "باقة بلس" : "Plus Tier"}</span>
                      <small className={styles.tierHintPlus}>{isAr ? "مع إقامة 4 نجوم" : "With 4-Star Hotel"}</small>
                    </div>
                    <div className={styles.priceValuePlus}>
                      <small>{isAr ? "تبدأ من" : "From"}</small>
                      <strong>{startPlus} <abbr title="Saudi Riyal">{isAr ? "ر.س" : "SAR"}</abbr></strong>
                    </div>
                  </div>
                </div>

                {/* Single Primary Action Button */}
                <div className={styles.cardActions}>
                  <Link href={href} className={styles.btnViewDetails}>
                    <span>{isAr ? "عرض تفاصيل الباقة والأسعار" : "View Package Details & Pricing"}</span>
                    <ArrowIcon className={`w-5 h-5 ${styles.btnArrow}`} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
