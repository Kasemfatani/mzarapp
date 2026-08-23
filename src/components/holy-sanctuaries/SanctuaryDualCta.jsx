"use client";

import styles from "./SanctuaryDualCta.module.css";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";

export default function SanctuaryDualCta({ lang = "ar" }) {
  const isAr = lang === "ar";
  const WHATSAPP_NUMBER = "966580121025";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? "السلام عليكم، أرغب بالمساعدة في اختيار إحدى جولات الحرمين الإثرائية"
      : "Hello, I would like assistance choosing one of the Holy Sanctuaries enriching tours"
  )}`;

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.dualCtaCard}>
          {/* Left / Copy */}
          <div className={styles.ctaCopy}>
            <span className={styles.eyebrow}>
              {isAr ? "ابدأ رحلة المعرفة" : "Begin Your Sacred Journey"}
            </span>
            <h2 className={styles.title}>
              {isAr ? "أي الحرمين ستكتشف أولًا؟" : "Which Holy Mosque Will You Explore First?"}
            </h2>
            <p className={styles.subtitle}>
              {isAr
                ? "اختر جولتك، وسيساعدك فريق مزار في معرفة المواعيد والتوفر وطريقة الحجز."
                : "Select your preferred tour, and our team will guide you with schedules, availability, and instant confirmation."}
            </p>
          </div>

          {/* Right / Actions */}
          <div className={styles.ctaActions}>
            <a href="/trip-detail/88" className={styles.btnPrimary}>
              <span>{isAr ? "جولة المسجد الحرام" : "Grand Mosque Tour"}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </a>

            <a
              href="/trip-detail/87"
              className={`${styles.btnPrimary} ${styles.btnNabawi}`}
            >
              <span>{isAr ? "جولة المسجد النبوي" : "Prophet's Mosque Tour"}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </a>

            <a
              href={whatsappUrl}
              className={styles.textLink}
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{isAr ? "أحتاج مساعدة في الاختيار ←" : "Need help choosing? →"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
