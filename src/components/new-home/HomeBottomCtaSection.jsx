"use client";

import styles from "./HomeBottomCtaSection.module.css";
import stylesNumbers from "./MzarServicesSection.module.css";
import { MessageCircle, Compass, ArrowLeft, ArrowRight, Users, Star, Globe, Headphones } from "lucide-react";

export default function HomeBottomCtaSection({ lang = "ar" }) {
  const isAr = lang === "ar";
  const WHATSAPP_NUMBER = "966580121025";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? "مرحبًا مزار، أود التحدث معكم بخصوص رحلتي القادمة واختيار التجربة الأنسب"
      : "Hello Mzar, I would like to consult with you about my upcoming trip and choose the best experience"
  )}`;

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      number: "+10,000",
      label: isAr ? "زائر سعيد" : "Happy Visitors",
    },
    {
      icon: <Star className="w-6 h-6" />,
      number: "4.9 / 5",
      label: isAr ? "متوسط التقييم" : "Average Rating",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      number: "7",
      label: isAr ? "لغات عالمية" : "Global Languages",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      number: "24/7",
      label: isAr ? "دعم متواصل" : "Continuous Support",
    },
  ];

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.ctaPanel}>
          <div className={styles.ctaCopy}>
            <span className={styles.ctaKicker}>
              <span className={styles.ctaKickerIcon}>✦</span>
              {isAr ? "خطوتك التالية" : "Your Next Step"}
            </span>
            <h2>
              {isAr ? "رحلتك القادمة تبدأ بخطوة" : "Your Next Journey Begins with a Single Step"}
            </h2>
            <p>
              {isAr
                ? "دع فريق مزار يساعدك في اختيار التجربة الأنسب لك ولعائلتك."
                : "Let our team help you choose the ideal experience tailored for you and your family."}
            </p>
          </div>

          <div className={styles.ctaActions}>
            <div className={styles.heroActions}>
              <a href="/all-trips" className={styles.btnPrimary}>
                <Compass className="w-5 h-5" />
                <span>{isAr ? "استكشف التجارب" : "Explore Experiences"}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>

              <a
                href={whatsappUrl}
                className={styles.btnLight}
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>{isAr ? "تحدث معنا" : "Chat with Us"}</span>
              </a>
            </div>
            <small className={styles.ctaMicroNote}>
              {isAr
                ? "فريق مزار معك من التخطيط إلى نهاية الرحلة"
                : "The Mzar team is with you from planning to trip completion"}
            </small>
          </div>
        </div>

        {/* Statistics Metric Strip (Extracted from #popular) */}
        <div className={stylesNumbers.metricStrip}>
          {stats.map((stat, idx) => (
            <div key={idx} className={stylesNumbers.metricItem}>
              <div className={stylesNumbers.metricIcon}>{stat.icon}</div>
              <strong className={stylesNumbers.metricNumber}>{stat.number}</strong>
              <span className={stylesNumbers.metricLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
