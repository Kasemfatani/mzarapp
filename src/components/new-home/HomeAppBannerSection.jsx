"use client";

import styles from "./HomeAppBannerSection.module.css";
import { Play, Check } from "lucide-react";

export default function HomeAppBannerSection({ lang = "ar" }) {
  const isAr = lang === "ar";
  const APP_DOWNLOAD_URL = "https://onelink.to/yb2xky";

  const benefits = isAr
    ? ["7 لغات", "مرشد صوتي", "يعمل دون إنترنت"]
    : ["7 Languages", "Audio Guide", "Works Offline"];

  return (
    <section className={styles.appSection} id="app">
      <div className={styles.container}>
        <div className={styles.appBanner}>
          <div className={styles.appBannerContent}>
            <span className={styles.eyebrow}>
              {isAr ? "تطبيق مزار" : "Mzar App"}
            </span>
            <h2 className={styles.title}>
              {isAr ? "قصص المكان ترافقك أينما ذهبت" : "The Stories of the Place Accompany You Everywhere"}
            </h2>
            <p className={styles.subtitle}>
              {isAr
                ? "دليلك الصوتي الذكي لاكتشاف الحكاية في كل محطة."
                : "Your smart audio guide to discover the story at every landmark."}
            </p>

            {/* Benefits Badges */}
            <div className={styles.appBenefits}>
              {benefits.map((b, i) => (
                <span key={i}>
                  <Check className="w-3.5 h-3.5 text-[#e7ce8d]" />
                  {b}
                </span>
              ))}
            </div>

            {/* Store Badges */}
            <div className={styles.storeBadges}>
              <a
                href={APP_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.storeBadge}
              >
                <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"></path> </g></svg>
                <div className={styles.badgeText}>
                  <small>{isAr ? "حمّل من" : "Download on the"}</small>
                  <b>App Store</b>
                </div>
              </a>

              <a
                href={APP_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.storeBadge}
              >
                <Play className="w-5 h-5 fill-current text-[#315f4c]" />
                <div className={styles.badgeText}>
                  <small>{isAr ? "متوفر على" : "Get it on"}</small>
                  <b>Google Play</b>
                </div>
              </a>
            </div>
          </div>

          {/* App Phone Visual + QR */}
          <div className={styles.appSide} aria-hidden="true">
            <div className={styles.appPhone}>
              <div className={styles.appPhoneTop}>
                <span>{isAr ? "مزار" : "Mzar"}</span>
                <i></i>
              </div>
              <div className={styles.appPhonePlace}>
                <small>{isAr ? "محطة قريبة منك" : "Nearby Station"}</small>
                <b>{isAr ? "جبل النور" : "Jabal Al-Nour"}</b>
                <span>{isAr ? "استمع إلى القصة" : "Listen to the Story"}</span>
              </div>
              <div className={styles.appPhoneWave}>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
            <span className={styles.appQr}>QR</span>
          </div>
        </div>
      </div>
    </section>
  );
}
