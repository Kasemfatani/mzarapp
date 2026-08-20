import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { getServerLocale } from "@/lib/localeServer";
import UmrahPackagesHero from "@/components/umrah-packages/UmrahPackagesHero";
import UmrahPackagesGrid from "@/components/umrah-packages/UmrahPackagesGrid";
import UmrahPackagesDiffExplainer from "@/components/umrah-packages/UmrahPackagesDiffExplainer";
import UmrahPackagesInclusions from "@/components/umrah-packages/UmrahPackagesInclusions";
import UmrahPackagesCta from "@/components/umrah-packages/UmrahPackagesCta";
import WhatsAppCampaignModal from "@/components/common/WhatsAppCampaignModal";

export const revalidate = 300;

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

  let packages = [];

  try {
    const res = await fetch(`${API_BASE_URL_NEW}/landing/full-experience/list`, {
      headers: { lang },
      next: { revalidate: 300 },
    });

    if (res.ok) {
      const json = await res.json();
      packages = json?.data || [];
    }
  } catch (err) {
    console.error("Error fetching umrah packages list:", err);
  }

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
