import { notFound } from "next/navigation";
import { getServerLocale } from "@/lib/localeServer";
import { getUmrahPackageByIdOrSlug, getAllUmrahPackages } from "@/data/umrahPackagesData";
import UmrahPackageDetailHero from "@/components/umrah-package-detail/UmrahPackageDetailHero";
import UmrahPackageDetailMainLayout from "@/components/umrah-package-detail/UmrahPackageDetailMainLayout";
import RelatedPackagesSection from "@/components/umrah-package-detail/RelatedPackagesSection";
import UmrahPackageMobileBottomBar from "@/components/umrah-package-detail/UmrahPackageMobileBottomBar";
import WhatsAppCampaignModal from "@/components/common/WhatsAppCampaignModal";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { id } = params;
  const lang = getServerLocale();
  const isAr = lang === "ar";
  const pkg = getUmrahPackageByIdOrSlug(id);

  if (pkg) {
    return {
      title: `${isAr ? pkg.name : pkg.nameEn} | ${isAr ? "مزار" : "Mzar"}`,
      description: isAr
        ? `${pkg.description} تفاصيل باقة ${pkg.name} والأسعار والبرنامج اليومي والجولات المشمولة وخيارات الحجز.`
        : `${pkg.descriptionEn} Complete ${pkg.nameEn} details, daily itinerary, pricing, and inclusions.`,
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

  const packageData = getUmrahPackageByIdOrSlug(id);

  if (!packageData) {
    notFound();
  }

  const allPackages = getAllUmrahPackages();

  return (
    <div className={lang === "en" ? "ltr" : "rtl"}>
      <UmrahPackageDetailHero lang={lang} packageData={packageData} />
      <UmrahPackageDetailMainLayout lang={lang} packageData={packageData} />
      <RelatedPackagesSection
        lang={lang}
        currentPackageSlug={packageData.slug}
        packagesList={allPackages}
      />
      <UmrahPackageMobileBottomBar lang={lang} packageData={packageData} />
      <WhatsAppCampaignModal />
    </div>
  );
}
