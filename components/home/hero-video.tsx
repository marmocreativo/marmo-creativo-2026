"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 768px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

// En móvil solo se muestra el póster: evita descargar 2.6 MB de video.
export function HeroVideo() {
  const show = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );

  if (!show) return null;

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster="/images/hero_bg.jpg"
      className="absolute inset-0 -z-20 w-full h-full object-cover"
    >
      <source src="/images/hero_video.mp4" type="video/mp4" />
    </video>
  );
}
