"use client";

import { useEffect, useRef, useState } from "react";

export default function RegistrationFrame() {
  const frame = useRef(null);
  const [height, setHeight] = useState(1400);

  useEffect(() => {
    const onMessage = (event) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frame.current?.contentWindow
      ) return;

      if (event.data?.type === "diyafah-athar-success") {
        frame.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (event.data?.type !== "diyafah-athar-height") return;

      const nextHeight = Number(event.data.height);
      if (Number.isFinite(nextHeight) && nextHeight > 0 && nextHeight < 10000) {
        setHeight(nextHeight);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <main style={{ width: "100%" }}>
      <iframe
        ref={frame}
        src="/hajj-con/diyafah-athar-standalone.html"
        title="تسجيل مبادرة ضيافة وأثر"
        style={{ display: "block", width: "100%", height, border: 0 }}
      />
    </main>
  );
}
