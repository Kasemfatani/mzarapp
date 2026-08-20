"use client";

import styles from "./UmrahPackageMobileBottomBar.module.css";
import { MessageCircle } from "lucide-react";

export default function UmrahPackageMobileBottomBar({ lang = "ar", packageData = {} }) {
  const isAr = lang === "ar";
  const WHATSAPP_NUMBER = "966580121025";

  const {
    name = "",
    starting_price_per_person = 0,
  } = packageData;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? `السلام عليكم، أود حجز ${name} بتفاصيلها`
      : `Hello, I would like to book ${name}`
  )}`;

  return (
    <div className={styles.mobileBar}>
      <div className={styles.priceInfo}>
        <small>{isAr ? "سعر الفرد يبدأ من" : "Starting per person"}</small>
        <strong>
          {starting_price_per_person?.toLocaleString()}
          <em>{isAr ? "ر.س" : "SAR"}</em>
        </strong>
      </div>

      <a
        href={whatsappUrl}
        className={styles.btnMobileWhatsapp}
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>{isAr ? "احجز عبر واتساب" : "Book on WhatsApp"}</span>
      </a>
    </div>
  );
}
