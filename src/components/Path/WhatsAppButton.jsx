"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function WhatsAppButton({ name }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState("en");
  const [gclid, setGclid] = useState("");

  useEffect(() => {
    setLang(localStorage.getItem("lang") || "en");
    const urlGclid = searchParams.get("gclid");
    if (urlGclid) {
      localStorage.setItem("gclid", urlGclid);
      setGclid(urlGclid);
    } else {
      setGclid(localStorage.getItem("gclid") || "");
    }
  }, [searchParams]);

  if (pathname !== "/path") return null;

  const text =
    lang === "en"
      ? `I am interested in ${name}.${gclid ? ` Discount code (${gclid})` : ""}`
      : `أنا مهتم بـ ${name}.${gclid ? ` رمز الخصم (${gclid})` : ""}`;

  return (
    <a
      href={`https://wa.me/+966580121025?text=${encodeURIComponent(text)}`}
      className="fixed-what"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  );
}