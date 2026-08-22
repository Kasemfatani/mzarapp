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

  return {
    title: isAr
      ? "باقات عمرة مزار المتكاملة | 7 و10 و14 ليلة"
      : "Mzar Comprehensive Umrah Packages | 7, 10 & 14 Nights",
    description: isAr
      ? "قارن باقات السيرة والمشاعر والنور الأساسية وبلس، واطّلع على المدة والخدمات والأسعار ثم احجز أون لاين أو عبر واتساب."
      : "Compare Al-Seerah, Al-Mashaer, and Al-Noor Standard and Plus packages with comprehensive pricing, itineraries, and instant booking.",
  };
}

export default async function UmrahPackagesPage() {
  const resolvedLocale = getServerLocale();
  const lang = resolvedLocale === "ar" ? "ar" : "en";
  const packages = getAllUmrahPackages();

  return (
    <div className={lang === "en" ? "ltr" : "rtl"}>
      <UmrahPackagesHero lang={lang} />
      <UmrahPackagesGrid lang={lang} packages={packages} />
      <UmrahPackagesDiffExplainer lang={lang} />
      <UmrahPackagesInclusions lang={lang} />
      <UmrahPackagesCta lang={lang} />
      <WhatsAppCampaignModal />
    </div>
  );
}
