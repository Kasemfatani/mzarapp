"use client";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export default function LazyLoader({ children, rootMargin = "200px" }) {
  // We accept rootMargin as a prop so you can customize it (e.g. "50px" vs "200px")
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin });
  const [shouldLoad, setShouldLoad] = useState(false);

  if (inView && !shouldLoad) setShouldLoad(true);

  return (
    <div ref={ref}>
      {/* If in view, render the children (the sections), otherwise render nothing */}
      {shouldLoad ? children : null}
    </div>
  );
}
