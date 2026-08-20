"use client";

import styles from "./TransportFleetSection.module.css";
import { Users, Briefcase, Wind, MessageCircle } from "lucide-react";

export default function TransportFleetSection({ lang = "ar" }) {
  const isAr = lang === "ar";
  const WHATSAPP_NUMBER = "966580121025";

  const vehicles = [
    {
      id: "sedan",
      category: isAr ? "اقتصادية" : "Economy",
      title: isAr ? "سيدان اقتصادية" : "Economy Sedan",
      description: isAr
        ? "خيار عملي للأفراد والأزواج والتنقلات الخفيفة والمريحة."
        : "Practical and reliable choice for solo travelers, couples, and light airport transfers.",
      image:
        "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=700&q=80",
      recommended: false,
      specs: [
        { icon: <Users className="w-3.5 h-3.5" />, text: isAr ? "3 مسافرين" : "3 Passengers" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: isAr ? "2 حقيبتان" : "2 Bags" },
        { icon: <Wind className="w-3.5 h-3.5" />, text: isAr ? "مكيّفة بالكامل" : "Air-Conditioned" },
      ],
    },
    {
      id: "family",
      category: isAr ? "عائلية" : "Family SUV",
      title: isAr ? "مركبة عائلية" : "Family SUV",
      description: isAr
        ? "مساحة مريحة وفارهة للعائلة مع مرونة وسعة أكبر للحقائب."
        : "Spacious, comfortable ride designed for families with generous luggage room.",
      image:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=700&q=80",
      recommended: true,
      ribbon: isAr ? "الأنسب للعائلات" : "Best for Families",
      specs: [
        { icon: <Users className="w-3.5 h-3.5" />, text: isAr ? "7 مسافرين" : "7 Passengers" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: isAr ? "6 حقائب" : "6 Bags" },
        { icon: <Wind className="w-3.5 h-3.5" />, text: isAr ? "مساحة واسعة" : "Spacious Cabin" },
      ],
    },
    {
      id: "minibus",
      category: isAr ? "مجموعة صغيرة" : "Small Group",
      title: isAr ? "حافلة صغيرة" : "Minibus",
      description: isAr
        ? "مناسبة للعائلات الممتدة والمجموعات الصغيرة والرحلات المشتركة."
        : "Ideal for extended families, small tour groups, and shared group transfers.",
      image:
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=700&q=80",
      recommended: false,
      specs: [
        { icon: <Users className="w-3.5 h-3.5" />, text: isAr ? "18 مسافرًا" : "18 Passengers" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: isAr ? "15 حقيبة" : "15 Bags" },
        { icon: <Wind className="w-3.5 h-3.5" />, text: isAr ? "مقاعد مريحة" : "Reclining Seats" },
      ],
    },
    {
      id: "coach",
      category: isAr ? "مجموعات" : "Tour Coach",
      title: isAr ? "حافلة سياحية" : "Luxury Tour Coach",
      description: isAr
        ? "حل متكامل ومريح للحملات والمجموعات الكبيرة والبرامج السياحية."
        : "Full-sized luxury coach solution for large groups, delegations, and Umrah delegations.",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80",
      recommended: false,
      specs: [
        { icon: <Users className="w-3.5 h-3.5" />, text: isAr ? "49 مسافرًا" : "49 Passengers" },
        { icon: <Briefcase className="w-3.5 h-3.5" />, text: isAr ? "40 حقيبة" : "40 Bags" },
        { icon: <Wind className="w-3.5 h-3.5" />, text: isAr ? "تخزين سفلي" : "Underfloor Luggage" },
      ],
    },
  ];

  const getWhatsappUrl = (vehicleTitle) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      isAr
        ? `السلام عليكم، أود الاستفسار وحجز ${vehicleTitle} لخدمة النقل`
        : `Hello, I would like to inquire about booking the ${vehicleTitle} for transportation`
    )}`;
  };

  return (
    <section className={styles.fleetSection} id="fleet">
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "أسطول يناسب رحلتك" : "Fleet Tailored for You"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "مركبات بمساحات وتجهيزات متنوعة" : "Vehicles with Diverse Capacities & Amenities"}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? "استعرض الفئات المتاحة واختر السعة المناسبة لعدد المسافرين والحقائب."
              : "Browse available categories and select the ideal capacity for your passengers and luggage."}
          </p>
        </div>

        {/* 4-Vehicle Grid */}
        <div className={styles.fleetGrid}>
          {vehicles.map((v) => (
            <article
              key={v.id}
              className={`${styles.vehicleCard} ${
                v.recommended ? styles.cardRecommended : ""
              }`}
            >
              {v.ribbon && <span className={styles.recommendedRibbon}>{v.ribbon}</span>}

              {/* Photo Box */}
              <div className={styles.vehicleImageBox}>
                <img
                  src={v.image}
                  alt={v.title}
                  className={styles.vehicleImg}
                  loading="lazy"
                />
                <span className={styles.categoryTag}>{v.category}</span>
              </div>

              {/* Title & Desc */}
              <h3 className={styles.vehicleTitle}>{v.title}</h3>
              <p className={styles.vehicleDescription}>{v.description}</p>

              {/* Specs Badges */}
              <div className={styles.specsRow}>
                {v.specs.map((spec, sIdx) => (
                  <span key={sIdx} className={styles.specBadge}>
                    <span className={styles.specIcon}>{spec.icon}</span>
                    <span>{spec.text}</span>
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className={styles.cardAction}>
                <a
                  href={getWhatsappUrl(v.title)}
                  className={styles.btnBookVehicle}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{isAr ? "طلب هذه الفئة" : "Request This Class"}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
