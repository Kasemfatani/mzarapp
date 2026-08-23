"use client";

import styles from "./TransportServicesSection.module.css";
import { Plane, ArrowLeftRight, MapPin, Clock, Users, Compass } from "lucide-react";

export default function TransportServicesSection({ lang = "ar" }) {
  const isAr = lang === "ar";

  const services = [
    {
      icon: <Plane className="w-5 h-5" />,
      title: isAr ? "استقبال وتوديع المطارات" : "Airport Transfers",
      desc: isAr
        ? "خدمة مباشرة من وإلى مطار جدة ومطار المدينة مع متابعة حية لمواعيد الرحلات."
        : "Direct transfers to and from Jeddah and Madinah airports with real-time flight tracking.",
    },
    {
      icon: <ArrowLeftRight className="w-5 h-5" />,
      title: isAr ? "بين مكة والمدينة" : "Makkah - Madinah Intercity",
      desc: isAr
        ? "تنقل خاص مباشر ومريح يربط بين العاصمتين المقدستين بأعلى معايير السلامة."
        : "Direct private intercity transport between Makkah and Madinah with total comfort.",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: isAr ? "داخل المدن" : "Intra-City Rides",
      desc: isAr
        ? "تنقلات مرنة ومجدولة داخل مكة المكرمة والمدينة المنورة وجدة."
        : "Flexible scheduled transfers within Makkah, Madinah, and Jeddah.",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: isAr ? "مركبة بالساعة" : "Hourly Private Chauffeur",
      desc: isAr
        ? "سائق محترف ومركبة خاصة تحت تصرفك لمساراتك المخصصة ومحطاتك المتعددة."
        : "Dedicated vehicle and professional chauffeur at your disposal by the hour.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: isAr ? "نقل المجموعات والحملات" : "Group & Delegation Transit",
      desc: isAr
        ? "تنسيق أسطول كامل لنقل حملات العمرة والعائلات الكبيرة والوفود الرسمية."
        : "Full fleet coordination for Umrah campaigns, large family gatherings, and delegations.",
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: isAr ? "نقل الجولات الإثرائية" : "Tour Excursions Transport",
      desc: isAr
        ? "مركبات مجهزة ترافقك في المسارات والمعالم التاريخية بكل يسر وسلاسة."
        : "Dedicated transportation accompanying historical trails and cultural excursions.",
    },
  ];

  return (
    <section className={styles.servicesSection} id="transport-services">
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "خدمات لكل مسار" : "Services for Every Route"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "أكثر من مجرد توصيلة" : "More Than Just a Ride"}
          </h2>
        </div>

        {/* 6-Service Cards Grid */}
        <div className={styles.serviceGrid}>
          {services.map((srv, index) => (
            <article key={index} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{srv.icon}</div>
              <h3 className={styles.serviceTitle}>{srv.title}</h3>
              <p className={styles.serviceDescription}>{srv.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
