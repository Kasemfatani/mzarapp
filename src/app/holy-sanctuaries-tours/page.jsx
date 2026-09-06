import { getServerLocale } from "@/lib/localeServer";
import SanctuariesHero from "@/components/holy-sanctuaries/SanctuariesHero";
import SanctuaryLicenseCard from "@/components/holy-sanctuaries/SanctuaryLicenseCard";
import SanctuaryToursSection from "@/components/holy-sanctuaries/SanctuaryToursSection";
import SanctuaryExperienceSteps from "@/components/holy-sanctuaries/SanctuaryExperienceSteps";
import SanctuaryWhyMzarSection from "@/components/holy-sanctuaries/SanctuaryWhyMzarSection";
import SanctuaryDualCta from "@/components/holy-sanctuaries/SanctuaryDualCta";
import WhatsAppBookingRedirect from "@/components/common/WhatsAppBookingRedirect";

export const revalidate = 300;

export async function generateMetadata() {
  const lang = getServerLocale();
  const isAr = lang === "ar";
  const siteUrl = "https://www.mzarapp.com";

  const title = isAr
    ? "جولات الحرمين الإثرائية | جولة المسجد الحرام وجولة المسجد النبوي - مزار"
    : "Holy Sanctuaries Enriching Tours | Grand Mosque & Prophet's Mosque Guided Tours - Mzar";

  const description = isAr
    ? "تعرّف على جولتي المسجد الحرام والمسجد النبوي الإثرائيتين، واكتشف المعالم التاريخية برفقة مرشدين مرخصين من الهيئة العامة للعناية بالحرمين ومحتوى صوتي بـ 7 لغات."
    : "Discover guided enriching tours of the Grand Mosque in Makkah and the Prophet's Mosque in Madinah with certified guides and 7-language smart audio narration.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/holy-sanctuaries-tours`,
      languages: {
        ar: `${siteUrl}/ar/holy-sanctuaries-tours`,
        en: `${siteUrl}/en/holy-sanctuaries-tours`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${lang}/holy-sanctuaries-tours`,
      siteName: isAr ? "تطبيق مزار" : "MzarApp",
      images: [
        {
          url: `${siteUrl}/share.png`,
          width: 1200,
          height: 630,
          alt: isAr ? "جولات الحرمين الإثرائية" : "Holy Sanctuaries Enriching Tours",
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

export default function HolySanctuariesToursPage() {
  const resolvedLocale = getServerLocale();
  const lang = resolvedLocale === "ar" ? "ar" : "en";
  const isAr = lang === "ar";
  const siteUrl = "https://www.mzarapp.com";

  // Structured Data JSON-LD
  const toursSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isAr ? "جولات الحرمين الإثرائية" : "Holy Sanctuaries Enriching Tours",
    description: isAr
      ? "جولات إثرائية مصرحة في المسجد الحرام والمسجد النبوي."
      : "Authorized guided tours in the Grand Mosque and Prophet's Mosque.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "TouristTrip",
          name: isAr ? "جولة المسجد الحرام الإثرائية" : "Grand Mosque Guided Heritage Tour",
          description: isAr
            ? "جولة مسائية لمدة 90 دقيقة داخل المسجد الحرام برفقة مرشد سياحي مرخص للتعرف على تاريخ وعمارة ومعالم الحرم المكي."
            : "90-minute evening tour inside the Grand Mosque with a licensed guide to discover its history and architecture.",
          provider: {
            "@type": "Organization",
            name: "Mzar | مزار",
            url: siteUrl,
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "TouristTrip",
          name: isAr ? "جولة المسجد النبوي الإثرائية" : "Prophet's Mosque Guided Heritage Tour",
          description: isAr
            ? "جولة مسائية لمدة 90 دقيقة في رحاب المسجد النبوي الشريف برفقة مرشد مرخص للتعرف على معالم المسجد والروضة الشريفة."
            : "90-minute tour in the Prophet's Mosque with a certified guide exploring iconic landmarks and history.",
          provider: {
            "@type": "Organization",
            name: "Mzar | مزار",
            url: siteUrl,
          },
        },
      },
    ],
  };

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
        name: isAr ? "جولات الحرمين" : "Holy Sanctuaries Tours",
        item: `${siteUrl}/${lang}/holy-sanctuaries-tours`,
      },
    ],
  };

  return (
    <div className={lang === "en" ? "ltr" : "rtl"}>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toursSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SanctuariesHero lang={lang} />
      <SanctuaryLicenseCard lang={lang} />
      <SanctuaryToursSection lang={lang} />
      <SanctuaryExperienceSteps lang={lang} />
      <SanctuaryWhyMzarSection lang={lang} />
      <SanctuaryDualCta lang={lang} />
      <WhatsAppBookingRedirect />
    </div>
  );
}
