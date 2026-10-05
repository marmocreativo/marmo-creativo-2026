"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Testimonial = {
  image: string;
  company: string;
  name: string;
  quote: string;
};

export function TestimonialsSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 8000);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const t = items[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div key={index} className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 md:gap-16 items-center animate-in fade-in duration-500">
        <div className="relative aspect-square w-full max-w-md mx-auto md:mx-0 overflow-hidden rounded-2xl bg-white border border-border">
          <Image src={t.image} alt={t.company} fill className="object-cover" sizes="(min-width: 768px) 40vw, 90vw" />
        </div>

        <div>
          <blockquote className="text-2xl md:text-4xl font-light leading-snug text-foreground">
            “{t.quote}”
          </blockquote>
          <p className="mt-8 text-base font-medium text-foreground">{t.name}</p>
          <p className="text-sm text-muted-foreground">{t.company}</p>
        </div>
      </div>

      <div className="mt-12 grid gap-4" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item, i) => (
          <button
            key={item.company}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ver testimonio de ${item.company}`}
            className="group py-3"
          >
            <span
              className={`block h-0.5 transition-colors ${
                i === index ? "bg-foreground" : "bg-border group-hover:bg-foreground/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}