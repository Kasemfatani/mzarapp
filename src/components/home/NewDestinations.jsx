"use client";
import React from "react";
import Link from "next/link";

export default function NewDestinations() {
  return (
    <section
      className="relative flex flex-col items-center justify-center py-20"
      style={{
        backgroundImage:
          "url('/NewDestinations-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: 350,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="/NewDestinations-img.png"
            alt="New"
            className="w-16 h-16"
            style={{ objectFit: "contain" }}
          />
          <h2 className="text-3xl md:text-4xl font-bold text-white ">
            Explore new destinations starting
          </h2>
        </div>
        <p className="text-white text-center text-lg md:text-xl mb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
        </p>
        <Link
          href="#"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          View Tours
        </Link>
      </div>
    </section>
  );
}