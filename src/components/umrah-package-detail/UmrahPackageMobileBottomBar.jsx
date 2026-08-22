"use client";

import styles from "./UmrahPackageMobileBottomBar.module.css";
import { MessageCircle } from "lucide-react";

export default function UmrahPackageMobileBottomBar({ lang = "ar", packageData = {} }) {
  const isAr = lang === "ar";
  const WHATSAPP_NUMBER = "966580121025";

  const {
    name = "",
    nameEn = "",
    duration = "",
    durationEn = "",
    pricing = {},
  } = packageData;

  const pkgTitle = isAr ? name : nameEn;
  const startPrice = pricing.madinah?.standard?.toLocaleString() || "—";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? `السلام عليكم، أود حجز ${name} (${duration}) والاستفسار عن الأسعار`
      : `Hello, I would like to book ${nameEn} (${durationEn}) and inquire about rates`
  )}`;

  return (
    <div className={styles.mobileBar}>
      <div className={styles.priceInfo}>
        <small>{isAr ? "سعر الفرد يبدأ من" : "Rate per person from"}</small>
        <strong>
          {startPrice}
          <em>{isAr ? "ر.س" : "SAR"}</em>
        </strong>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btnMobileWhatsapp}
      >
        <MessageCircle className="w-4 h-4 text-[#25D366]" />
        <span>{isAr ? "احجز عبر واتساب" : "Book via WhatsApp"}</span>
      </a>
    </div>
  );
}
