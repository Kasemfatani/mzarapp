"use client";

import styles from "./TransportFinalCta.module.css";
import { MessageCircle, ArrowDown } from "lucide-react";

export default function TransportFinalCta({ lang = "ar" }) {
  const isAr = lang === "ar";
  const WHATSAPP_NUMBER = "966580121025";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? "السلام عليكم، أرغب بترتيب خدمة نقل خاصة مع مزار"
      : "Hello, I would like to arrange private transportation services with Mzar"
  )}`;

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.ctaPanel}>
          {/* Left Copy */}
          <div className={styles.ctaCopy}>
            <span className={styles.eyebrow}>
              {isAr ? "هل خط سيرك جاهز؟" : "Is Your Itinerary Ready?"}
            </span>
            <h2 className={styles.title}>
              {isAr
                ? "دعنا نرتّب تنقلك براحة ووضوح"
                : "Let Us Coordinate Your Journey with Ease & Clarity"}
            </h2>
            <p className={styles.subtitle}>
              {isAr
                ? "أرسل لنا وجهتك وموعد الوصول وعدد الضيوف، وسيساعدك فريق مزار في اختيار المركبة والخدمة الأنسب."
                : "Share your arrival date, destination, and passenger count, and our team will recommend the perfect vehicle class."}
            </p>
          </div>

          {/* Right Actions */}
          <div className={styles.ctaActions}>
            <a
              href={whatsappUrl}
              className={styles.btnPrimary}
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>{isAr ? "اطلب خدمة النقل عبر واتساب" : "Request Transport on WhatsApp"}</span>
            </a>
            <a href="#fleet" className={styles.btnLight}>
              <span>{isAr ? "استعرض أسطول المركبات" : "View Fleet Options"}</span>
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
