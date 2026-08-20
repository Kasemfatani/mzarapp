"use client";

import styles from "./UmrahPackagesCta.module.css";
import { MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";

export default function UmrahPackagesCta({ lang = "ar" }) {
  const isAr = lang === "ar";
  const WHATSAPP_NUMBER = "966580121025";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? "السلام عليكم، أرغب بالمساعدة في اختيار باقة عمرة مزار وتفاصيل البرامج"
      : "Hello, I need assistance choosing the right Mzar Umrah package and program details"
  )}`;

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.ctaPanel}>
          <div className={styles.ctaCopy}>
            <span className={styles.eyebrow}>
              {isAr ? "هل تحتاج مساعدة؟" : "Need Assistance?"}
            </span>
            <h2>
              {isAr
                ? "نساعدك على اختيار الباقة الأنسب"
                : "We Help You Select the Perfect Package"}
            </h2>
            <p>
              {isAr
                ? "شاركنا موعد السفر وعدد الضيوف ومطار الوصول، وسيقترح فريق مزار الخيار الأقرب لرحلتك."
                : "Share your travel dates, number of guests, and arrival airport, and our team will recommend the ideal option tailored to your journey."}
            </p>
          </div>

          <div className={styles.ctaAction}>
            <a
              href={whatsappUrl}
              className={styles.btnPrimary}
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>{isAr ? "تحدث مع مستشار مزار" : "Chat with Mzar Advisor"}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
