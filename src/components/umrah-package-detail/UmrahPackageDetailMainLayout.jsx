"use client";

import styles from "./UmrahPackageDetailMainLayout.module.css";
import { Check, MessageCircle } from "lucide-react";

export default function UmrahPackageDetailMainLayout({ lang = "ar", packageData = {} }) {
  const isAr = lang === "ar";
  const WHATSAPP_NUMBER = "966580121025";
  //console.log("packageData",packageData);
  const {
    name = "",
    duration = "",
    starting_price_per_person = 0,
    included_experiences = [],
    accommodations = [],
  } = packageData;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? `السلام عليكم، أود حجز ${name} بتفاصيلها وتأكيد التوفر`
      : `Hello, I would like to book ${name} and confirm availability`
  )}`;

  // Default core inclusions to combine with accommodation titles
  // comment out for now
  // const coreServices = isAr
  //   ? [
  //       "تنقلات خاصة ومريحة طوال أيام البرنامج",
  //       "مرشد صوتي تفاعلي ذكي بـ 7 لغات عالمية",
  //       "ضيافة واستقبال ومياه معدنية متوفرة دائمًا",
  //       "دعم مباشر عبر واتساب على مدار الساعة",
  //     ]
  //   : [
  //       "Private and comfortable transfers throughout the itinerary",
  //       "Interactive smart audio guide in 7 international languages",
  //       "Complimentary hospitality, reception, and mineral water",
  //       "24/7 dedicated direct WhatsApp support",
  //     ];

   const coreServices = [];

  // Combine accommodation titles with core services
  const allIncludedServices = [
    ...accommodations.map((acc) => acc.title).filter(Boolean),
    ...coreServices,
  ];

  return (
    <section className={styles.mainSection}>
      <div className={styles.container}>
        <div className={styles.detailLayout}>
          {/* Left Column: Content */}
          <div className={styles.contentColumn}>
            {/* 1. Included Experiences */}
            {included_experiences.length > 0 && (
              <div className={styles.detailBlock}>
                <h2 className={styles.blockTitle}>
                  {isAr ? "التجارب والجولات المشمولة" : "Included Experiences & Tours"}
                </h2>
                <div className={styles.experienceGrid}>
                  {included_experiences.map((exp, index) => (
                    <article key={exp.id || index} className={styles.experienceCard}>
                      <span className={styles.experienceNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className={styles.experienceName}>{exp.name}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Included Services */}
            { allIncludedServices.length > 0 && (
              <div className={styles.detailBlock}>
              <h2 className={styles.blockTitle}>
                {isAr ? "الخدمات المشمولة" : "Included Services"}
              </h2>
              <ul className={styles.servicesChecklist}>
                {allIncludedServices.map((service, index) => (
                  <li key={index} className={styles.checklistItem}>
                    <Check className={`w-4 h-4 ${styles.checkIcon}`} />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            )}
            

            {/* 3. Booking Policy */}
            <div className={styles.policyBox}>
              <b>{isAr ? "سياسة الحجز" : "Booking Policy"}</b>
              <p>
                {isAr
                  ? "يتم الحجز عبر واتساب مزار ويؤكد بعد سداد كامل القيمة. جولات الحرمين تتطلب حجزًا مسبقًا قبل يومين لإصدار التصاريح. التعديل والإلغاء متاح قبل 24 ساعة على الأقل، وتطبق السياسات التفصيلية الموضحة قبل الدفع."
                  : "Bookings are arranged via Mzar WhatsApp and confirmed upon full payment. Haramain tours require 2 days advance booking for permit issuance. Modification and cancellation are available up to 24 hours prior."}
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Purchase Sidebar (Desktop) */}
          <div className={styles.sidebarColumn}>
            <aside className={styles.purchasePanel} id="purchase">
              <span className={styles.purchaseEyebrow}>
                {isAr ? "أكمل الحجز" : "Complete Booking"}
              </span>
              <h3 className={styles.purchaseTitle}>{name}</h3>

              <div className={styles.purchaseSummary}>
                {duration && (
                  <div className={styles.summaryRow}>
                    <span>{isAr ? "المدة" : "Duration"}:</span>
                    <strong>{duration}</strong>
                  </div>
                )}
                <div className={styles.summaryRow}>
                  <span>{isAr ? "السعر الابتدائي" : "Starting Rate"} :</span>
                  <em>
                    {starting_price_per_person?.toLocaleString()}{" "}
                    {isAr ? "ر.س / فرد" : "SAR / person"}
                  </em>
                </div>
              </div>

              <a
                href={whatsappUrl}
                className={styles.btnPurchaseWhatsapp}
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>{isAr ? "الشراء عبر واتساب" : "Book via WhatsApp"}</span>
              </a>

              <small className={styles.purchaseNote}>
                {isAr
                  ? "سيؤكد فريق مزار التوفر والسعر النهائي وخيارات الغرف قبل الدفع."
                  : "Mzar team will verify availability, final rates, and room options before payment."}
              </small>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
