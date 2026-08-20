import { notFound } from "next/navigation";
import { API_BASE_URL_NEW } from "@/lib/apiConfig";
import { getServerLocale } from "@/lib/localeServer";
import UmrahPackageDetailHero from "@/components/umrah-package-detail/UmrahPackageDetailHero";
import UmrahPackageDetailMainLayout from "@/components/umrah-package-detail/UmrahPackageDetailMainLayout";
import RelatedPackagesSection from "@/components/umrah-package-detail/RelatedPackagesSection";
import UmrahPackageMobileBottomBar from "@/components/umrah-package-detail/UmrahPackageMobileBottomBar";
import WhatsAppCampaignModal from "@/components/common/WhatsAppCampaignModal";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { id } = params;
  const lang = getServerLocale();
  const isAr = lang === "ar";

  try {
    const res = await fetch(`${API_BASE_URL_NEW}/landing/full-experience/details?id=${id}`, {
      headers: { lang },
      next: { revalidate: 300 },
    });

    if (res.ok) {
      const json = await res.json();
      const pkg = json?.data;
      if (pkg?.name) {
        return {
          title: `${pkg.name} | ${isAr ? "مزار" : "Mzar"}`,
          description: pkg.description || (isAr ? "تفاصيل باقة العمرة والأسعار والخدمات المشمولة" : "Umrah package details, pricing, and inclusions"),
        };
      }
    }
  } catch (e) {
    // fallback
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

  const [detailsRes, listRes] = await Promise.all([
    fetch(`${API_BASE_URL_NEW}/landing/full-experience/details?id=${id}`, {
      headers: { lang },
      next: { revalidate: 300 },
    }).catch(() => null),
    fetch(`${API_BASE_URL_NEW}/landing/full-experience/list`, {
      headers: { lang },
      next: { revalidate: 300 },
    }).catch(() => null),
  ]);

  if (!detailsRes || !detailsRes.ok) {
    notFound();
  }

  const detailsJson = await detailsRes.json();
  const packageData = detailsJson?.data;

  if (!packageData || !packageData.id) {
    notFound();
  }

  const listJson = listRes?.ok ? await listRes.json().catch(() => null) : null;
  const allPackages = listJson?.data || [];

  return (
    <div className={lang === "en" ? "ltr" : "rtl"}>
      <UmrahPackageDetailHero lang={lang} packageData={packageData} />
      <UmrahPackageDetailMainLayout lang={lang} packageData={packageData} />
      <RelatedPackagesSection
        lang={lang}
        currentPackageId={id}
        packagesList={allPackages}
      />
      <UmrahPackageMobileBottomBar lang={lang} packageData={packageData} />
      <WhatsAppCampaignModal />
    </div>
  );
}
