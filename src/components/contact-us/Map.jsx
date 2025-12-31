"use client";

import { MapPin } from 'lucide-react';

export function Map( { isAr }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-12 text-center text-4xl text-[#0d5940] md:text-5xl">
          {isAr ? 'موقعنا' : 'Our Location'}
        </h2>

        <div className="overflow-hidden rounded-3xl shadow-xl">
          {/* Map Container */}
          <div className="relative h-[500px] w-full bg-[#f5f2ed]">
            {/* Placeholder for Google Maps */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3715.8805583216767!2d39.788466899999996!3d21.355206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c20540e9e6d303%3A0x40a85646640cd21d!2si-ESNAAD!5e0!3m2!1sen!2sth!4v1767178816948!5m2!1sen!2sth"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mazah Office Location"
            />

            {/* Office Pin Overlay */}
            {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              <div className="flex flex-col items-center">
                <div className="mb-2 rounded-2xl bg-white px-6 py-3 shadow-lg">
                  <p className="text-xl text-[#0d5940]">مكتب مزار</p>
                </div>
                <MapPin className="h-12 w-12 text-[#c9a961]" fill="#c9a961" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
