import { getServerLocale } from "@/lib/localeServer";
import TransportHero from "@/components/transportation/TransportHero";
import TransportFleetSection from "@/components/transportation/TransportFleetSection";
import AirportMeetGreetSection from "@/components/transportation/AirportMeetGreetSection";
import TransportServicesSection from "@/components/transportation/TransportServicesSection";
import TransportAddonsSection from "@/components/transportation/TransportAddonsSection";
import TransportFinalCta from "@/components/transportation/TransportFinalCta";
import TransportFaqSection from "@/components/transportation/TransportFaqSection";
import WhatsAppCampaignModal from "@/components/common/WhatsAppCampaignModal";

export const revalidate = 300;

export async function generateMetadata() {
  const lang = getServerLocale();
  const isAr = lang === "ar";
  const siteUrl = "https://www.mzarapp.com";

  const title = isAr
    ? "خدمات التنقل والمطارات | مكة والمدينة وجدة - أسطول مركبات مزار"
    : "Transportation & Airport Transfers | Makkah, Madinah & Jeddah - Mzar Fleet";

  const description = isAr
    ? "خدمات الاستقبال من مطار جدة والمدينة والتنقل الخاص بين مكة والمدينة وجدة، مع أسطول مركبات حديث ومكيف وسائقين محترفين للأفراد والعائلات والمجموعات."
    : "Private airport transfers from Jeddah and Madinah airports, intercity holy cities transfers with modern air-conditioned sedans, GMCs, and buses.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/transportation`,
      languages: {
        ar: `${siteUrl}/ar/transportation`,
        en: `${siteUrl}/en/transportation`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${lang}/transportation`,
      siteName: isAr ? "تطبيق مزار" : "MzarApp",
      images: [
        {
          url: `${siteUrl}/share.png`,
          width: 1200,
          height: 630,
          alt: isAr ? "خدمات التنقل والمطارات من مزار" : "Mzar Transportation and Airport Transfers",
        },
      ],
      locale: isAr ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/share.png`],
    },
  };
}

export default function TransportationPage() {
  const resolvedLocale = getServerLocale();
  const lang = resolvedLocale === "ar" ? "ar" : "en";
  const isAr = lang === "ar";
  const siteUrl = "https://www.mzarapp.com";

  // TaxiService / Transport Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: isAr ? "خدمات مزار للتنقل والاستقبال بالمطارات" : "Mzar Transportation & Airport Meet & Greet",
    description: isAr
      ? "خدمات نقل واستقبال خاص من مطارات جدة والمدينة والتنقل بين مكة المكرمة والمدينة المنورة."
      : "Private airport transfers and intercity transportation across Makkah, Madinah, and Jeddah.",
    provider: {
      "@type": "Organization",
      name: "Mzar | مزار",
      url: siteUrl,
      telephone: "+966920005785",
    },
    areaServed: ["Makkah", "Madinah", "Jeddah"],
    serviceType: ["Airport Transfer", "Intercity Holy Cities Transportation", "Private Chauffeur"],
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isAr
          ? "ماذا يحدث عند تأخر وصول الطائرة عن الموعد المحدد؟"
          : "What happens if our flight arrival is delayed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isAr
            ? "يتابع فريق العمليات رحلتكم بدقة عبر نظام تتبع الرحلات المباشر، ويتم تحديث وقت حضور السائق تلقائيًا ليتطابق مع موعد هبوط الطائرة الفعلي دون أي قلق."
            : "Our operations team monitors your flight live and adjusts the driver's pickup schedule automatically according to your actual touchdown time.",
        },
      },
      {
        "@type": "Question",
        name: isAr
          ? "أين وكيف ألتقي بالسائق عند الخروج من صالة المطار؟"
          : "Where and how do I meet the driver at the airport?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isAr
            ? "تصلك رسالة عبر واتساب مسبقًا تتضمن اسم ورقم هاتف السائق ورقم لوحة المركبة بالإضافة إلى تحديد دقيق لنقطة الالتقاء داخل صالة الوصول أو عند البوابة المحددة."
            : "You will receive a WhatsApp notification in advance with the driver's contact, vehicle details, and the designated meeting point inside the arrival hall.",
        },
      },
      {
        "@type": "Question",
        name: isAr
          ? "هل تتوفر لديكم مركبات تتسع للمجموعات الكبيرة وحملات العمرة؟"
          : "Are there vehicles suitable for large groups and Umrah campaigns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isAr
            ? "نعم، يتضمن أسطول مزار حافلات صغيرة تتسع لـ 18 راكبًا وحافلات سياحية VIP تتسع لـ 49 راكبًا مجهزة بمساحات تخزين سفلية واسعة لتلبية احتياجات كافة المجموعات."
            : "Yes, our fleet includes 18-passenger minibuses and 49-seater VIP luxury coaches equipped with ample luggage compartments.",
        },
      },
      {
        "@type": "Question",
        name: isAr
          ? "هل يمكن طلب تجهيزات خاصة مثل كراسي الأطفال أو كراسي ذوي الإعاقة؟"
          : "Can we request special amenities like child seats or wheelchairs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isAr
            ? "بكل تأكيد، يمكنكم طلب كراسي الأطفال، كراسي كبار السن وذوي الإعاقة، أو لوحات الاستقبال الخاصة عند التواصل مع فريق الدعم أثناء ترتيب الحجز."
            : "Certainly, child safety seats, wheelchair assistance, or personalized signboards can be easily arranged upon request during booking.",
        },
      },
    ],
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isAr ? "الرئيسية" : "Home",
        item: `${siteUrl}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isAr ? "خدمات التنقل" : "Transportation",
        item: `${siteUrl}/${lang}/transportation`,
      },
    ],
  };

  return (
    <div className={lang === "en" ? "ltr" : "rtl"}>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <TransportHero lang={lang} />
      <TransportFleetSection lang={lang} />
      <AirportMeetGreetSection lang={lang} />
      <TransportServicesSection lang={lang} />
      <TransportAddonsSection lang={lang} />
      <TransportFinalCta lang={lang} />
      <TransportFaqSection lang={lang} />
      <WhatsAppCampaignModal />
    </div>
  );
}
