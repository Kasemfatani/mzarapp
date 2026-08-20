"use client";

import styles from "./SanctuaryLicenseCard.module.css";
import { Check } from "lucide-react";

export default function SanctuaryLicenseCard({ lang = "ar" }) {
  const isAr = lang === "ar";

  return (
    <section className={styles.licenseSection}>
      <div className={styles.container}>
        <div className={styles.licenseCard}>
          {/* Official Logo SVG */}
          <div className={styles.authorityLogoWrapper}>
            <img
              src="/partners/al-haramain.svg"
              alt={
                isAr
                  ? "شعار الهيئة العامة للعناية بشؤون المسجد الحرام والمسجد النبوي"
                  : "General Authority for the Care of the Two Holy Mosques Logo"
              }
              className={styles.authorityLogo}
              loading="lazy"
            />
          </div>

          {/* License Information */}
          <div className={styles.licenseInfo}>
            <span className={styles.eyebrow}>
              {isAr ? "اعتماد رسمي" : "Official Accreditation"}
            </span>
            <h2 className={styles.title}>
              {isAr
                ? "جولات مرخّصة للعناية بالحرمين"
                : "Licensed Tours for the Care of the Two Holy Mosques"}
            </h2>
            <p className={styles.description}>
              {isAr
                ? "هذه الجولة مرخّصة من الهيئة العامة للعناية بشؤون المسجد الحرام والمسجد النبوي، ومزار شريك مرخّص لتقديم تجربة معرفية منظمة لضيوف الحرمين."
                : "This tour is officially accredited by the General Authority for the Care of the Grand Mosque and the Prophet's Mosque, with Mzar as a certified partner providing structured educational experiences."}
            </p>
          </div>

          {/* Verification Badge */}
          <div className={styles.licenseMark}>
            <Check className="w-5 h-5 text-[#315f4c]" />
            <small>{isAr ? "شريك مرخّص" : "Certified"}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
