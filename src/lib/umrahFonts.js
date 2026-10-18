import localFont from "next/font/local";

const cormorant = localFont({
  src: [
    { path: "../assets/fonts/cormorant-normal-latin.woff2", weight: "300 600", style: "normal" },
    { path: "../assets/fonts/cormorant-italic-latin.woff2", weight: "300 600", style: "italic" },
  ],
  variable: "--umrah-font-heading",
  display: "swap",
});

const dmSans = localFont({
  src: "../assets/fonts/dm-sans-latin.woff2",
  weight: "300 600",
  variable: "--umrah-font-body",
  display: "swap",
});

const notoNaskh = localFont({
  src: "../assets/fonts/noto-naskh-arabic.woff2",
  weight: "400 600",
  variable: "--umrah-font-arabic",
  display: "swap",
});

// Keep the existing font calls in the Umrah sections while serving bundled files.
export const Cormorant_Garamond = () => cormorant;
export const DM_Sans = () => dmSans;
export const Noto_Naskh_Arabic = () => notoNaskh;
