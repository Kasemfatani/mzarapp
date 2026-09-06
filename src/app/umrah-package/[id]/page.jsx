import { notFound } from "next/navigation";
import { getServerLocale } from "@/lib/localeServer";
import { getUmrahPackageByIdOrSlug, getAllUmrahPackages } from "@/data/umrahPackagesData";
import UmrahPackageDetailHero from "@/components/umrah-package-detail/UmrahPackageDetailHero";
import UmrahPackageDetailMainLayout from "@/components/umrah-package-detail/UmrahPackageDetailMainLayout";
import RelatedPackagesSection from "@/components/umrah-package-detail/RelatedPackagesSection";
import UmrahPackageMobileBottomBar from "@/components/umrah-package-detail/UmrahPackageMobileBottomBar";
import WhatsAppBookingRedirect from "@/components/common/WhatsAppBookingRedirect";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { id } = params;
  const lang = getServerLocale();
  const isAr = lang === "ar";
  const siteUrl = "https://www.mzarapp.com";
  const pkg = getUmrahPackageByIdOrSlug(id);

  if (pkg) {
    const title = `${isAr ? pkg.name : pkg.nameEn} (${isAr ? pkg.duration : pkg.durationEn}) | ${isAr ? "مزار" : "Mzar"}`;
    const description = isAr
      ? `${pkg.description} تفاصيل باقة ${pkg.name} والأسعار والبرنامج اليومي (${pkg.duration}) والجولات المشمولة في مكة والمدينة.`
      : `${pkg.descriptionEn} Complete ${pkg.nameEn} (${pkg.durationEn}) details, daily itinerary, pricing, and inclusions in Makkah & Madinah.`;

    return {
      title,
      description,
      alternates: {
        canonical: `${siteUrl}/${lang}/umrah-package/${pkg.slug}`,
        languages: {
          ar: `${siteUrl}/ar/umrah-package/${pkg.slug}`,
          en: `${siteUrl}/en/umrah-package/${pkg.slug}`,
        },
      },
      openGraph: {
        title,
        description,
        url: `${siteUrl}/${lang}/umrah-package/${pkg.slug}`,
        siteName: isAr ? "تطبيق مزار" : "MzarApp",
        images: [
          {
            url: `${siteUrl}/share.png`,
            width: 1200,
            height: 630,
            alt: isAr ? pkg.name : pkg.nameEn,
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

  return {
    title: isAr ? "تفاصيل باقة العمرة | مزار" : "Umrah Package Details | Mzar",
    description: isAr
      ? "تفاصيل باقات عمرة مزار المتكاملة والأسعار والخدمات المشمولة وخيارات الحجز."
      : "Comprehensive Mzar Umrah package details, pricing, and itinerary inclusions.",
  };
}

export default async function UmrahPackageDetailPage({ params }) {
  const { id } = params;
  const resolvedLocale = getServerLocale();
  const lang = resolvedLocale === "ar" ? "ar" : "en";
  const isAr = lang === "ar";
  const siteUrl = "https://www.mzarapp.com";

  const packageData = getUmrahPackageByIdOrSlug(id);

  if (!packageData) {
    notFound();
  }

  const allPackages = getAllUmrahPackages();

  // JSON-LD Product & TouristTrip Schema
  const tripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: isAr ? packageData.name : packageData.nameEn,
    description: isAr ? packageData.description : packageData.descriptionEn,
    touristType: ["Pilgrims", "Families", "Individuals"],
    provider: {
      "@type": "Organization",
      name: "Mzar | مزار",
      url: "https://www.mzarapp.com",
      telephone: "+966920005785",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "SAR",
      lowPrice: packageData.pricing?.madinah?.standard || 1579,
      highPrice: packageData.pricing?.jeddah?.plus || 4582,
      offerCount: "4",
      availability: "https://schema.org/InStock",
    },
    itinerary: (packageData.itinerary || []).map((step, idx) => ({
      "@type": "City",
      name: isAr ? step.title : step.titleEn,
      description: isAr ? `اليوم ${step.day}: ${step.title}` : `Day ${step.dayEn}: ${step.titleEn}`,
    })),
  };

  // JSON-LD BreadcrumbList Schema
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
      {
        "@type": "ListItem",
        position: 3,
        name: isAr ? packageData.name : packageData.nameEn,
        item: `${siteUrl}/${lang}/umrah-package/${packageData.slug}`,
      },
    ],
  };

  return (
    <div className={lang === "en" ? "ltr" : "rtl"}>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <UmrahPackageDetailHero lang={lang} packageData={packageData} />
      <UmrahPackageDetailMainLayout lang={lang} packageData={packageData} />
      <RelatedPackagesSection
        lang={lang}
        currentPackageSlug={packageData.slug}
        packagesList={allPackages}
      />
      <UmrahPackageMobileBottomBar lang={lang} packageData={packageData} />
      <WhatsAppBookingRedirect />
    </div>
  );
}
