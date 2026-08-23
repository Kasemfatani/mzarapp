"use client";

import styles from "./SanctuaryWhyMzarSection.module.css";
import { Sparkles, BadgeCheck, Globe, Clock, Users, MessageCircle } from "lucide-react";

export default function SanctuaryWhyMzarSection({ lang = "ar" }) {
  const isAr = lang === "ar";

  const features = [
    {
      featured: true,
      icon: <Sparkles className="w-6 h-6" />,
      title: isAr ? "محتوى موثوق" : "Authentic Content",
      desc: isAr
        ? "مادة تاريخية وثقافية مصممة لتقديم المعلومة بوضوح وعمق دون إطالة."
        : "Curated historical and religious insights designed to deliver depth and spiritual clarity.",
    },
    {
      featured: false,
      icon: <BadgeCheck className="w-6 h-6" />,
      title: isAr ? "مرشدون مرخصون" : "Licensed Guides",
      desc: isAr
        ? "مرشدون سياحيون مؤهلون ومعتمدون لقيادة التجربة والإجابة عن أسئلة الزوار."
        : "Officially certified tour guides qualified to lead the journey and engage with guests.",
    },
    {
      featured: false,
      icon: <Globe className="w-6 h-6" />,
      title: isAr ? "سبع لغات عالمية" : "7 Global Languages",
      desc: isAr
        ? "محتوى رقمي صوتي ونصي ذكي يساعد أفراد العائلة على الاستماع بلغتهم المفضلة."
        : "Smart digital audio and text guide enabling international visitors to listen in their native tongue.",
    },
    {
      featured: false,
      icon: <Clock className="w-6 h-6" />,
      title: isAr ? "تنظيم دقيق وواضح" : "Seamless Organization",
      desc: isAr
        ? "نقاط لقاء واضحة وجداول زمنية محددة لتبدأ الجولة وتنتهي بأعلى درجات الراحة."
        : "Defined meeting spots and punctual schedules ensuring a smooth, stress-free experience.",
    },
    {
      featured: false,
      icon: <Users className="w-6 h-6" />,
      title: isAr ? "مناسبة للجميع" : "Suitable for All",
      desc: isAr
        ? "تجربة ملائمة للأفراد والعائلات والمجموعات من مختلف الأعمار والاهتمامات."
        : "Comfortably tailored for individuals, families, and tour groups of all backgrounds.",
    },
    {
      featured: false,
      icon: <MessageCircle className="w-6 h-6" />,
      title: isAr ? "دعم مباشر على مدار الساعة" : "24/7 Direct Support",
      desc: isAr
        ? "فريق مزار متاح عبر واتساب لمساعدتك والإجابة عن كافة استفساراتك قبل وأثناء الجولة."
        : "Mzar's dedicated team is readily available via WhatsApp before, during, and after your tour.",
    },
  ];

  return (
    <section className={styles.whySection}>
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "لماذا مزار؟" : "Why Mzar?"}
          </span>
          <h2 className={styles.title}>
            {isAr
              ? "ليست زيارة عابرة، بل تجربة تبقى معك"
              : "More Than a Visit — A Lasting Spiritual Memory"}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? "نصمم رحلة معرفية موثوقة تحترم قدسية المكان ووقت الزائر واحتياجاته."
              : "We craft an authentic educational journey honoring the sanctity of the Holy Sanctuaries and the needs of our guests."}
          </p>
        </div>

        {/* Feature Grid */}
        <div className={styles.featureGrid}>
          {features.map((item, index) => (
            <article
              key={index}
              className={`${styles.featureCard} ${
                item.featured ? styles.featuredCard : ""
              }`}
            >
              <span className={styles.featureIcon}>{item.icon}</span>
              <h3 className={styles.featureTitle}>{item.title}</h3>
              <p className={styles.featureDescription}>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
