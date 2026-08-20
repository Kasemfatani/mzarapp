"use client";

import { useMemo } from "react";
import styles from "./UmrahPackagesGrid.module.css";
import { Check } from "lucide-react";

/**
 * Dynamically group any package items from the API.
 * Automatically handles 2, 3, 4, or any number of packages added to the API in the future.
 */
export function groupPackages(packagesList = [], isAr = true) {
  if (!Array.isArray(packagesList) || packagesList.length === 0) return [];

  const groups = new Map();

  packagesList.forEach((pkg) => {
    // Check if this item is a "Plus" variant
    const isPlus =
      pkg.name?.includes("بلس") ||
      pkg.name?.toLowerCase().includes("plus");

    // Clean base name: remove "بلس", "Plus", "plus"
    const baseName = pkg.name
      ? pkg.name
          .replace(/بلس/g, "")
          .replace(/plus/gi, "")
          .trim()
      : `Package-${pkg.id}`;

    const groupKey = baseName.toLowerCase();

    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        baseName,
        standard: null,
        plus: null,
      });
    }

    const currentGroup = groups.get(groupKey);
    if (isPlus) {
      currentGroup.plus = pkg;
    } else {
      currentGroup.standard = pkg;
    }
  });

  return Array.from(groups.values()).map((group) => {
    const mainPkg = group.standard || group.plus;

    // Extract days number (e.g. "8" or "5") from features or duration string
    let days = "";
    if (mainPkg?.features?.[0]?.title) {
      const match = mainPkg.features[0].title.match(/\d+/);
      if (match) days = match[0];
    }
    if (!days && mainPkg?.duration) {
      const match = mainPkg.duration.match(/\d+/);
      if (match) days = match[0];
    }

    return {
      baseName: group.baseName,
      days: days || (isAr ? "متكامل" : "Full"),
      duration: mainPkg?.duration || "",
      features: mainPkg?.features || [],
      standard: group.standard,
      plus: group.plus,
    };
  });
}

export default function UmrahPackagesGrid({ lang = "ar", packages = [] }) {
  const isAr = lang === "ar";
  const WHATSAPP_NUMBER = "966580121025";

  const groupedCards = useMemo(() => {
    return groupPackages(packages, isAr);
  }, [packages, isAr]);

  const getWhatsappUrl = (pkgName) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      isAr
        ? `السلام عليكم، أود الاستفسار والحجز في ${pkgName}`
        : `Hello, I would like to inquire and book ${pkgName}`
    )}`;
  };

  return (
    <section className={styles.packagesSection} id="packages">
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "باقات عمرة مزار" : "Mzar Umrah Packages"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "ابدأ بالمدة المناسبة لرحلتك" : "Start with the Ideal Duration for Your Journey"}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? "السعر المعروض هو أقل سعر للفرد من مطار المدينة، وعلى أساس حجز 3 أشخاص."
              : "Displayed price is the starting rate per person from Madinah airport, based on a 3-person booking."}
          </p>
        </div>

        {/* Packages Grid */}
        {groupedCards.length === 0 ? (
          <div className={styles.emptyState}>
            {isAr ? "لا توجد باقات متاحة حالياً" : "No packages available currently"}
          </div>
        ) : (
          <div className={styles.packagesGrid}>
            {groupedCards.map((card, index) => (
              <article key={index} className={styles.packageCard}>
                {/* Card Top */}
                <div className={styles.packageTop}>
                  <div className={styles.durationBadge}>
                    <b>{card.days}</b>
                    <span>{isAr ? "أيام" : "Days"}</span>
                  </div>

                  <div className={styles.packageHeader}>
                    <h3 className={styles.packageTitle}>{card.baseName}</h3>
                    {card.duration && (
                      <p className={styles.packageDurationDesc}>{card.duration}</p>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <div className={styles.featuresList}>
                  {card.features.map((feature, fIndex) => (
                    <div key={fIndex} className={styles.featureItem}>
                      {feature.image ? (
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className={styles.featureIcon}
                          loading="lazy"
                        />
                      ) : (
                        <span className={styles.featureFallbackIcon}>
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                      <span>{feature.title}</span>
                    </div>
                  ))}
                </div>

                {/* Package Variants Action Buttons */}
                <div className={styles.packageVariants}>
                  {/* Standard Variant Button */}
                  {card.standard && (
                    <a
                      href={getWhatsappUrl(card.standard.name)}
                      className={styles.variantButton}
                    >
                      <span className={styles.variantTitle}>{card.standard.name}</span>
                      <strong className={styles.variantPrice}>
                        {isAr ? "من " : "From "}
                        {card.standard.starting_price_per_person?.toLocaleString()}{" "}
                        {isAr ? "ر.س" : "SAR"}
                      </strong>
                      <small className={styles.variantSubtitle}>
                        {isAr ? "نقل وجولات" : "Transfers & Tours"}
                      </small>
                    </a>
                  )}

                  {/* Plus Variant Button */}
                  {card.plus && (
                    <a
                      href={getWhatsappUrl(card.plus.name)}
                      className={`${styles.variantButton} ${styles.variantPlus}`}
                    >
                      <span className={styles.variantTitle}>{card.plus.name}</span>
                      <strong className={styles.variantPrice}>
                        {isAr ? "من " : "From "}
                        {card.plus.starting_price_per_person?.toLocaleString()}{" "}
                        {isAr ? "ر.س" : "SAR"}
                      </strong>
                      <small className={styles.variantSubtitle}>
                        {isAr ? "مع إقامة 4 نجوم" : "With 4-Star Hotel"}
                      </small>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
