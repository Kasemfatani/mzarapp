"use client";

import { useEffect } from "react";

export default function SyncLangFromSlug({ lang }: { lang: "ar" | "en" }) {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const nextLang = lang === "ar" ? "ar" : "en";

        // localStorage
        localStorage.setItem("lang", nextLang);

        // 2) cookie (same pattern as Header_new)
        const oneYear = 60 * 60 * 24 * 365;
        const isHTTPS = window.location.protocol === "https:";
        document.cookie = `lang=${nextLang}; path=/; max-age=${oneYear}; samesite=lax${
            isHTTPS ? "; secure" : ""
        }`;

        // 3) keep <html lang="..."> in sync on client
        document.documentElement.lang = nextLang;

        // IMPORTANT: notify header/footer immediately
        window.dispatchEvent(new Event("langchange"));
    }, [lang]);

    return null;
}