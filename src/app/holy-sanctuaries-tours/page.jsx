import { getServerLocale } from "@/lib/localeServer";
import SanctuariesHero from "@/components/holy-sanctuaries/SanctuariesHero";
import SanctuaryLicenseCard from "@/components/holy-sanctuaries/SanctuaryLicenseCard";
import SanctuaryToursSection from "@/components/holy-sanctuaries/SanctuaryToursSection";
import SanctuaryExperienceSteps from "@/components/holy-sanctuaries/SanctuaryExperienceSteps";
import SanctuaryWhyMzarSection from "@/components/holy-sanctuaries/SanctuaryWhyMzarSection";
import SanctuaryDualCta from "@/components/holy-sanctuaries/SanctuaryDualCta";
import WhatsAppCampaignModal from "@/components/common/WhatsAppCampaignModal";

export const revalidate = 300;

export async function generateMetadata() {
  const lang = getServerLocale();
  const isAr = lang === "ar";

  return {
    title: isAr
      ? "جولات الحرمين الإثرائية | المسجد الحرام والمسجد النبوي - مزار"
      : "Holy Sanctuaries Enriching Tours | Grand Mosque & Prophet's Mosque - Mzar",
    description: isAr
      ? "تعرّف على جولتي المسجد الحرام والمسجد النبوي الإثرائيتين، واكتشف مزايا التجربة مع مرشدي مزار المرخصين والمحتوى متعدد اللغات."
      : "Discover the enriching tours of the Grand Mosque and the Prophet's Mosque with certified guides and multilingual smart audio narration.",
  };
}

export default function HolySanctuariesToursPage() {
  const resolvedLocale = getServerLocale();
  const lang = resolvedLocale === "ar" ? "ar" : "en";

  return (
    <div className={lang === "en" ? "ltr" : "rtl"}>
      <SanctuariesHero lang={lang} />
      <SanctuaryLicenseCard lang={lang} />
      <SanctuaryToursSection lang={lang} />
      <SanctuaryExperienceSteps lang={lang} />
      <SanctuaryWhyMzarSection lang={lang} />
      <SanctuaryDualCta lang={lang} />
      <WhatsAppCampaignModal />
    </div>
  );
}
