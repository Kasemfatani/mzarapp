"use client";
import React, { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import Paths from "../components/home/Paths";
import About from "../components/home/About";
import GenSection from "../components/home/GenSection";
import AppExplore from "../components/home/AppExplore";
import Explore from "../components/home/Explore";
import SemiAbout from "../components/home/SemiAbout";
import Gallery from "../components/home/Gallery";
import Content from "../components/home/Content";
import Latest from "../components/home/Latest";
import Confiemed from "../components/home/Confirmed";
import DownloadAppSection from "../components/home/DownloadAppSection.jsx";

import NewDestinations from "../components/home/NewDestinations";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import parse from 'html-react-parser';

export default function Home() {
    const [lang, setLang] = useState("en");
    const [showPopup, setShowPopup] = useState(false);
    const [checkedStorage, setCheckedStorage] = useState(false);
    const [adData, setAdData] = useState<any>(null);

    const popupKey =
        lang === "ar"
            ? "homepage_popup_dismissed_ar"
            : "homepage_popup_dismissed";

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("lang") === "ar") setLang("ar");
            else if (localStorage.getItem("lang") === "en") setLang("en");

            // Fetch ad data
            axios
                .get(`${API_BASE_URL}/landing/home/ads`, {
                    headers: { lang : localStorage.getItem("lang")},
                })
                .then((response) => {
                    setAdData(response.data);
                    if (localStorage.getItem(popupKey) !== "1") {
                        setShowPopup(true);
                    }
                    setCheckedStorage(true);
                })
                .catch(() => {
                    setCheckedStorage(true);
                });
        }
    }, [lang]);

    const handleDismiss = () => {
        setShowPopup(false);
        localStorage.setItem(popupKey, "1");
    };

    return (
        <>
            {checkedStorage && adData && (
                <Dialog open={showPopup}>
                    <DialogContent className="p-0 bg-white rounded-2xl shadow-2xl overflow-visible">
                        <img
                            src="/popup-new.png"
                            alt="New"
                            className="absolute left-0 top-0 w-20 h-20 z-10 -translate-x-[8px] -translate-y-[8px]"
                            style={{ pointerEvents: "none" }}
                        />
                        <img
                            src={adData.image}
                            alt="New Trip"
                            className="rounded-t-2xl w-full h-56 object-cover pt-5 px-5"
                        />
                        <div className="p-6 text-center" dir={lang === "ar" ? "rtl" : "ltr"}>
                            <h2 className="text-2xl font-semibold mb-2">
                                {adData.title}
                            </h2>
                            {adData.description &&
                                <p className="text-gray-600 text-center mb-1">{parse(adData.description)}
														 		</p>
														}
                            <div className="flex gap-4 justify-center mt-4">
                                <Button
                                    variant="outline"
                                    className="flex-1 border-cyan-400 text-cyan-500"
                                    onClick={handleDismiss}
                                >
                                    {lang === "ar" ? "إغلاق" : "Dismiss"}
                                </Button>
                                <Button
                                    className="flex-1 bg-cyan-500 bg-gradient-to-r from-[#025AB4] via-[#1AC5BD] to-[#87DCB5] text-white"
                                    onClick={handleDismiss}
                                    asChild
                                >
                                    <a href={`/path?id=${adData.package_id}`}>
                                        {lang === "ar" ? "عرض التفاصيل" : "View Details"}
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
            <main>
                <Hero />
                <SemiAbout />
                <Confiemed />
                <Paths />
                <DownloadAppSection />
                <Explore />
                <Gallery />
                <NewDestinations />
                <About />
                <AppExplore />
                <Content />
                <GenSection />
                <Latest />
            </main>
        </>
    );
}
