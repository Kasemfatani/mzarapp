"use client";

import Link from "next/link";
import styles from "./RelatedPackagesSection.module.css";
import { ArrowLeft, ArrowRight, MapPin, Sparkles } from "lucide-react";

export default function RelatedPackagesSection({
  lang = "ar",
  currentPackageSlug = null,
  packagesList = [],
}) {
  const isAr = lang === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  // Filter out current package
  const otherPackages = packagesList.filter(
    (pkg) => pkg.slug !== currentPackageSlug
  );

  if (otherPackages.length === 0) return null;

  return (
    <section className={styles.relatedSection}>
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "خيارات أخرى" : "Other Options"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "قارن بباقات مزار الأخرى" : "Compare with Other Mzar Packages"}
          </h2>
        </div>

        {/* Compact Related Packages Grid */}
        <div className={styles.relatedGrid}>
          {otherPackages.map((pkg) => {
            const startStandard = pkg.pricing?.madinah?.standard?.toLocaleString() || "—";
            const startPlus = pkg.pricing?.madinah?.plus?.toLocaleString() || "—";

            return (
              <Link
                key={pkg.slug}
                href={`/umrah-package/${pkg.slug}`}
                className={styles.relatedCard}
              >
                {/* Top Meta */}
                <div className={styles.cardTop}>
                  <span className={styles.cardDurationBadge}>
                    {isAr ? pkg.duration : pkg.durationEn}
                  </span>
                  {pkg.tag && (
                    <span className={styles.cardTag}>
                      <Sparkles className="w-3 h-3 inline-block me-1" />
                      {isAr ? pkg.tag : pkg.tagEn}
                    </span>
                  )}
                </div>

                <h3 className={styles.cardTitle}>{isAr ? pkg.name : pkg.nameEn}</h3>

                <p className={styles.cardStay}>
                  <MapPin className="w-3.5 h-3.5 text-[#aa9256] shrink-0" />
                  <span>
                    {isAr ? pkg.makkahNights : pkg.makkahNightsEn} · {isAr ? pkg.madinahNights : pkg.madinahNightsEn}
                  </span>
                </p>

                {/* Compact Dual Pricing */}
                <div className={styles.cardPriceBox}>
                  <div className={styles.priceCol}>
                    <small>{isAr ? "الأساسية" : "Standard"}</small>
                    <strong>{startStandard} <em>{isAr ? "ر.س" : "SAR"}</em></strong>
                  </div>
                  <div className={styles.priceDivider} />
                  <div className={`${styles.priceCol} ${styles.priceColPlus}`}>
                    <small>{isAr ? "بلس (مع إقامة)" : "Plus (With Hotel)"}</small>
                    <strong>{startPlus} <em>{isAr ? "ر.س" : "SAR"}</em></strong>
                  </div>
                </div>

                {/* Action Link */}
                <div className={styles.cardAction}>
                  <span>{isAr ? "عرض التفاصيل والأسعار" : "View Details & Pricing"}</span>
                  <ArrowIcon className={`w-4 h-4 ${styles.cardArrow}`} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
