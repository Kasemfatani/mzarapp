"use client";

import styles from "./RelatedPackagesSection.module.css";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function RelatedPackagesSection({
  lang = "ar",
  currentPackageId = null,
  packagesList = [],
}) {
  const isAr = lang === "ar";

  // Filter out the current package from the related list
  const otherPackages = packagesList.filter(
    (pkg) => String(pkg.id) !== String(currentPackageId)
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

        {/* Related Packages Grid */}
        <div className={styles.relatedGrid}>
          {otherPackages.map((pkg) => (
            <a
              key={pkg.id}
              href={`/umrah-package/${pkg.id}`}
              className={styles.relatedCard}
            >
              <h3 className={styles.cardTitle}>{pkg.name}</h3>
              {pkg.duration && <p className={styles.cardDuration}>{pkg.duration}</p>}

              <div className={styles.cardPrice}>
                <span>
                  {isAr ? "من " : "From "}
                  {pkg.starting_price_per_person?.toLocaleString()}{" "}
                  {isAr ? "ر.س" : "SAR"}
                </span>
                <span className={styles.viewText}>
                  {isAr ? "التفاصيل ←" : "Details →"}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
