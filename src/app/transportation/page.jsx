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

  return {
    title: isAr
      ? "خدمات التنقل والمطارات | مكة والمدينة وجدة - مزار"
      : "Transportation & Airport Transfers | Makkah, Madinah & Jeddah - Mzar",
    description: isAr
      ? "تعرّف على خدمات التنقل من المطارات وبين مكة والمدينة وجدة، واستعرض أسطول مركبات مزار للأفراد والعائلات والمجموعات."
      : "Discover private airport reception and intercity transfers between Makkah, Madinah, and Jeddah with Mzar's modern fleet.",
  };
}

export default function TransportationPage() {
  const resolvedLocale = getServerLocale();
  const lang = resolvedLocale === "ar" ? "ar" : "en";

  return (
    <div className={lang === "en" ? "ltr" : "rtl"}>
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
