"use client";

import styles from "./SanctuariesHero.module.css";
import { ArrowDown, Check } from "lucide-react";

export default function SanctuariesHero({ lang = "ar" }) {
  const isAr = lang === "ar";

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroLayout}>
          {/* Left / Main Hero Copy */}
          <div className={styles.heroCopy}>
            {/* Breadcrumbs */}
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <a href="/">{isAr ? "الرئيسية" : "Home"}</a>
              <span>/</span>
              <span>{isAr ? "جولات الحرمين" : "Holy Sanctuaries Tours"}</span>
            </nav>

            <span className={styles.eyebrow}>
              {isAr ? "معرفة تلامس القلب" : "Knowledge That Touches the Heart"}
            </span>

            <h1 className={styles.title}>
              {isAr ? (
                <>
                  جولتان إثرائيتان
                  <br />
                  لاكتشاف قصص الحرمين
                </>
              ) : (
                "Two Enriching Tours to Discover the Stories of the Two Holy Mosques"
              )}
            </h1>

            <p className={styles.subtitle}>
              {isAr
                ? "شاهد المسجد الحرام والمسجد النبوي بمنظور أعمق، عبر محتوى تاريخي موثوق يقدمه مرشدون سياحيون مرخصون وتدعمه تجربة رقمية متعددة اللغات."
                : "Experience the Grand Mosque and the Prophet's Mosque from a deeper perspective, with authentic historical insights led by licensed guides and multilingual audio narration."}
            </p>

            {/* Action Buttons */}
            <div className={styles.heroActions}>
              <a href="#haram-tour" className={styles.btnPrimary}>
                <span>{isAr ? "المسجد الحرام" : "Grand Mosque"}</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <a href="#nabawi-tour" className={styles.btnSecondary}>
                <span>{isAr ? "المسجد النبوي" : "Prophet's Mosque"}</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

            {/* Proof Badges */}
            <div className={styles.proofBadges}>
              <div className={styles.proofItem}>
                <span className={styles.proofHighlight}>90</span>
                <span>{isAr ? "دقيقة لكل جولة" : "Minutes per tour"}</span>
              </div>
              <div className={styles.proofItem}>
                <span className={styles.proofHighlight}>7</span>
                <span>{isAr ? "لغات عالمية" : "Languages"}</span>
              </div>
              <div className={styles.proofItem}>
                <Check className="w-4 h-4 text-[#ead494]" />
                <span>{isAr ? "مرشدون مرخصون" : "Licensed Guides"}</span>
              </div>
            </div>
          </div>

          {/* Right Layered Visual Preview */}
          <aside className={styles.heroArt} aria-hidden="true">
            <div className={styles.artCardMakkah}>
              <small>{isAr ? "المسجد الحرام" : "Masjid Al-Haram"}</small>
              <b>{isAr ? "قصص ومعالم" : "Stories & Landmarks"}</b>
            </div>

            <div className={styles.artCardMadinah}>
              <small>{isAr ? "المسجد النبوي" : "Prophet's Mosque"}</small>
              <b>{isAr ? "معرفة تلامس القلب" : "Enriching Insight"}</b>
            </div>

            <div className={styles.artBadge}>
              <span>90</span>
              <small>{isAr ? "دقيقة" : "Min"}</small>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
