'use client';
import React, { useEffect } from "react";
import Image from "next/image";
import parse from "html-react-parser";

export default function SingleBlog({ data, lang }) {
    useEffect(() => {
        if (data?.structured_data) {
            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.id = "structured-data-script";

            try {
							// Remove any existing script to avoid duplicates
                const existingScript = document.getElementById("structured-data-script");
                if (existingScript) existingScript.remove();

								// Use structured_data directly if it's already an object
                const jsonLd =
                    typeof data.structured_data === "string"
                        ? JSON.stringify(JSON.parse(data.structured_data))
                        : JSON.stringify(data.structured_data);

                script.text = jsonLd;
                document.head.appendChild(script);
            } catch (err) {
                console.error("Error handling structured data JSON:", err);
            }
        }
    }, [data]);

    function formatArabicDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date)) return "Invalid date";
        const arabicFormatter = new Intl.DateTimeFormat("ar-EG", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
        return arabicFormatter.format(date);
    }

    return (
        <div className={`container mx-auto ${lang === "en" ? "ltr" : "rtl"}`}>
            <div className="img-cont">
                <div className="overlay"></div>
                <Image
                    src={data?.image}
                    width={500}
                    height={500}
                    alt="Mazar"
                    className="img"
                />
            </div>
            <div className="date-book mb-3">
                <div className="date">
                    <i className="fa-regular fa-calendar-days"></i>
                    <span className="date-span">
                        {lang === "ar" ? formatArabicDate(data?.date) : data?.date}
                    </span>
                </div>
            </div>
            <div className="toc">
                <h2>{lang === "ar" ? "محتوى المقالة" : "Table of Contents"}</h2>
                <ul>
                    {data.toc.map((item) => (
                        <li key={item.id}>
                            <a href={`#${item.id}`}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <h3 className="title-cont mb-3">{data?.title}</h3>
            <div className="description-cont mb-10">{parse(data?.description)}</div>
        </div>
    );
}