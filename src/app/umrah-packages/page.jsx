import { getServerLocale } from "@/lib/localeServer";
import { getAllUmrahPackages } from "@/data/umrahPackagesData";
import UmrahPackagesHero from "@/components/umrah-packages/UmrahPackagesHero";
import UmrahPackagesGrid from "@/components/umrah-packages/UmrahPackagesGrid";
import UmrahPackagesDiffExplainer from "@/components/umrah-packages/UmrahPackagesDiffExplainer";
import UmrahPackagesInclusions from "@/components/umrah-packages/UmrahPackagesInclusions";
import UmrahPackagesCta from "@/components/umrah-packages/UmrahPackagesCta";
import WhatsAppCampaignModal from "@/components/common/WhatsAppCampaignModal";

export const revalidate = 3600;

export async function generateMetadata() {
  const lang = getServerLocale();
  const isAr = lang === "ar";
  const siteUrl = "https://www.mzarapp.com";

  const title = isAr
    ? "باقات عمرة مزار المتكاملة | باقات 7 و10 و14 ليلة مع جولات الحرمين"
    : "Mzar Comprehensive Umrah Packages | 7, 10 & 14 Nights with Heritage Tours";

  const description = isAr
    ? "قارن باقات السيرة والمشاعر والنور الأساسية وبلس، واطّلع على جداول الرحلات والأسعار والخدمات المشمولة في مكة والمدينة وجدة والطائف."
    : "Compare Al-Seerah, Al-Mashaer, and Al-Noor Standard and Plus packages with comprehensive pricing, itineraries, and instant booking.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/umrah-packages`,
      languages: {
        ar: `${siteUrl}/ar/umrah-packages`,
        en: `${siteUrl}/en/umrah-packages`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${lang}/umrah-packages`,
      siteName: isAr ? "تطبيق مزار" : "MzarApp",
      images: [
        {
          url: `${siteUrl}/share.png`,
          width: 1200,
          height: 630,
          alt: isAr ? "باقات عمرة مزار المتكاملة" : "Mzar Comprehensive Umrah Packages",
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

export default async function UmrahPackagesPage() {
  const resolvedLocale = getServerLocale();
  const lang = resolvedLocale === "ar" ? "ar" : "en";
  const isAr = lang === "ar";
  const siteUrl = "https://www.mzarapp.com";
  const packages = getAllUmrahPackages();

  // JSON-LD ItemList Schema
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isAr ? "باقات عمرة مزار المتكاملة" : "Mzar Comprehensive Umrah Packages",
    description: isAr
      ? "قائمة باقات العمرة الإثرائية في مكة المكرمة والمدينة المنورة."
      : "List of enriching Umrah packages in Makkah and Madinah.",
    itemListElement: packages.map((pkg, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: isAr ? pkg.name : pkg.nameEn,
        description: isAr ? pkg.description : pkg.descriptionEn,
        url: `${siteUrl}/${lang}/umrah-package/${pkg.slug}`,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "SAR",
          lowPrice: pkg.pricing?.madinah?.standard || 1579,
          highPrice: pkg.pricing?.jeddah?.plus || 4582,
          offerCount: "4",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  // BreadcrumbList Schema
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
        name: isAr ? "باقات العمرة" : "Umrah Packages",
        item: `${siteUrl}/${lang}/umrah-packages`,
      },
    ],
  };

  return (
    <div className={lang === "en" ? "ltr" : "rtl"}>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <UmrahPackagesHero lang={lang} />
      <UmrahPackagesGrid lang={lang} packages={packages} />
      <UmrahPackagesDiffExplainer lang={lang} />
      <UmrahPackagesInclusions lang={lang} />
      <UmrahPackagesCta lang={lang} />
      <WhatsAppCampaignModal />
    </div>
  );
}
