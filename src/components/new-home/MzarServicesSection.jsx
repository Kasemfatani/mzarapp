"use client";

import { useState } from "react";
import styles from "./MzarServicesSection.module.css";
import { 
  Moon, 
  Landmark, 
  Compass, 
  Car, 
  Users, 
  Star, 
  Globe, 
  Headphones, 
  ArrowLeft, 
  ArrowRight,
  MessageCircle
} from "lucide-react";

export default function MzarServicesSection({ lang = "ar" }) {
  const isAr = lang === "ar";
  const [selectedNeed, setSelectedNeed] = useState("all");

  const WHATSAPP_NUMBER = "966580121025";
  const whatsappHelpUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? "مرحبًا مزار، أحتاج مساعدتكم في اختيار الخدمة المناسبة"
      : "Hello Mzar, I need your help choosing the right service"
  )}`;

  const filters = [
    { id: "all", label: isAr ? "عرض جميع الخدمات" : "Show All Services" },
    { id: "complete", label: isAr ? "أبحث عن رحلة متكاملة" : "Looking for a Full Package" },
    { id: "short", label: isAr ? "أريد جولة قصيرة" : "Want a Short Tour" },
    { id: "transport", label: isAr ? "أحتاج وسيلة نقل" : "Need Transportation" },
    { id: "family", label: isAr ? "أبحث عن نشاط عائلي" : "Looking for Family Activity" },
  ];

  const services = [
    {
      id: "umrah",
      isMain: true,
      badge: isAr ? "الخدمة الأشمل" : "Most Comprehensive",
      label: isAr ? "رحلة متكاملة" : "Complete Package",
      icon: <Moon className="w-6 h-6" />,
      needs: ["complete", "family"],
      title: isAr ? "باقات العمرة المتكاملة" : "Comprehensive Umrah Packages",
      description: isAr
        ? "برامج واضحة لمدة 7 أو 10 أو 14 ليلة تجمع التنقل والجولات، مع خيار الإقامة ضمن باقات بلس."
        : "Structured 7, 10, or 14-night programs combining transport and guided tours, with lodging options in Plus packages.",
      facts: isAr 
        ? ["3 مدد", "نقل", "جولات", "أساسية وبلس"]
        : ["3 Durations", "Transport", "Tours", "Basic & Plus"],
      linkText: isAr ? "استكشف باقات العمرة" : "Explore Umrah Packages",
      href: "/umrah-packages",
    },
    {
      id: "tours",
      isMain: false,
      visualClass: styles.serviceVisualSanctuaries,
      label: isAr ? "معرفة إيمانية" : "Spiritual Insight",
      icon: <Landmark className="w-5 h-5" />,
      needs: ["short", "family"],
      title: isAr ? "جولات الحرمين" : "Two Holy Mosques Tours",
      description: isAr
        ? "جولات معرفية قصيرة داخل الحرم المكي والمسجد النبوي."
        : "Short educational and insightful guided tours inside Masjid Al-Haram and the Prophet's Mosque.",
      facts: isAr 
        ? ["90 دقيقة", "7 لغات"]
        : ["90 Minutes", "7 Languages"],
      linkText: isAr ? "احجز جولتك" : "Book Your Tour",
      href: "/holy-sanctuaries-tours",
    },
    {
      id: "trails",
      isMain: false,
      visualClass: styles.serviceVisualTrails,
      label: isAr ? "اكتشف القصة" : "Discover the Story",
      icon: <Compass className="w-5 h-5" />,
      needs: ["short", "family"],
      title: isAr ? "مسارات تاريخية وإثرائية" : "Historical & Cultural Trails",
      description: isAr
        ? "مكتبة مسارات في أربع مدن، مدعومة بمرشد مزار الصوتي متعدد اللغات."
        : "A rich library of trails across 4 cities, supported by Mzar's multilingual smart audio guide.",
      facts: isAr 
        ? ["10 مسارات", "مرشد صوتي"]
        : ["10 Trails", "Audio Guide"],
      linkText: isAr ? "استكشف المسارات" : "Explore Trails",
      href: "/all-trips?type=1",
    },
    {
      id: "transport",
      isMain: false,
      visualClass: styles.serviceVisualTransport,
      label: isAr ? "تنقل مطمئن" : "Reliable Transfer",
      icon: <Car className="w-5 h-5" />,
      needs: ["transport", "complete"],
      title: isAr ? "خدمات النقل" : "Transportation Services",
      description: isAr
        ? "استقبال المطارات، النقل بين المدن، ومركبات للأفراد والعائلات والمجموعات."
        : "Airport pick-up, intercity transfers, and premium vehicles for individuals, families, and groups.",
      facts: isAr 
        ? ["1 - 49 راكبًا", "فئات متنوعة"]
        : ["1 - 49 Passengers", "Diverse Fleet"],
      linkText: isAr ? "استعرض المركبات" : "View Vehicles",
      href: "/transportation",
    },
  ];

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
    <section className={styles.servicesSection} id="services">
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "خدمات مزار" : "Mzar Services"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "كل ما تحتاجه لرحلة متكاملة" : "Everything You Need for a Complete Journey"}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? "اختر تجربة شاملة، أو اجمع الخدمات التي تناسب برنامج زيارتك."
              : "Choose a comprehensive experience, or combine services that match your visit schedule."}
          </p>
        </div>

        {/* Need Filters Chips */}
        <div className={styles.needFilters} aria-label={isAr ? "اختر حسب حاجتك" : "Filter by need"}>
          {filters.map((filter) => {
            const isActive = selectedNeed === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                className={`${styles.needChip} ${isActive ? styles.needChipActive : ""}`}
                onClick={() => setSelectedNeed(filter.id)}
                aria-pressed={isActive}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* New 4-Column Showcase Grid */}
        <div className={styles.servicesShowcase}>
          {services.map((service) => {
            const matches = selectedNeed === "all" || service.needs.includes(selectedNeed);
            const isFeatured = matches && selectedNeed !== "all";
            const isMuted = !matches;

            const tileClasses = [
              styles.serviceTile,
              service.isMain ? styles.serviceTileMain : "",
              isFeatured ? styles.serviceTileFeatured : "",
              isMuted ? styles.serviceTileMuted : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <a
                key={service.id}
                href={service.href}
                className={tileClasses}
                data-badge={service.badge}
                onClick={(e) => {
                  if (service.href === "#") {
                    e.preventDefault();
                  }
                }}
              >
                {/* Visual Image Header for non-main tiles */}
                {!service.isMain && (
                  <span className={`${styles.serviceVisual} ${service.visualClass}`} aria-hidden="true">
                    <span className={styles.serviceVisualOverlay} />
                  </span>
                )}

                {/* Service Label Tag */}
                <span className={styles.serviceLabel}>{service.label}</span>

                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.tileTitle}>{service.title}</h3>
                <p className={styles.tileDescription}>{service.description}</p>
                
                <div className={styles.serviceFacts}>
                  {service.facts.map((fact, i) => (
                    <span key={i} className={styles.factTag}>
                      {fact}
                    </span>
                  ))}
                </div>

                <span className={styles.cardLink}>
                  <span>{service.linkText}</span>
                  <span className={styles.cardLinkArrow}>
                    {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </span>
                </span>
              </a>
            );
          })}
        </div>

        {/* Service Helper Card ("لست متأكدًا من الخدمة المناسبة؟") */}
        <div className={styles.serviceHelper}>
          <div className={styles.helperText}>
            <h3>
              {isAr ? "لست متأكدًا من الخدمة المناسبة؟" : "Not sure which service is right for you?"}
            </h3>
            <p>
              {isAr
                ? "أخبرنا عن مدينتك وعدد الضيوف ومدة الزيارة، وسنقترح لك التجربة الأنسب."
                : "Tell us your city, number of guests, and visit duration, and we'll suggest the ideal experience."}
            </p>
          </div>
          <div className={styles.helperActions}>
            <a
              className={styles.btnPrimary}
              href={whatsappHelpUrl}
            >
              <MessageCircle className="w-5 h-5" />
              <span>{isAr ? "ساعدني في الاختيار" : "Help Me Choose"}</span>
            </a>
            <a className={styles.btnOutline} href="/all-trips">
              {isAr ? "عرض التجارب المتاحة" : "Explore Experiences"}
            </a>
          </div>
        </div>

        {/* Statistics Metric Strip (Extracted from #popular) */}
        <div className={styles.metricStrip}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.metricItem}>
              <div className={styles.metricIcon}>{stat.icon}</div>
              <strong className={styles.metricNumber}>{stat.number}</strong>
              <span className={styles.metricLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
