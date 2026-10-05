import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { whatsappLink } from "@/lib/seo/oferta";

export type ServicePageConfig = {
  heroBg: string;
  eyebrow: string;
  title: string;
  intro: string;
  bullets: string[];
  card: {
    title: string;
    subtitle: string;
    priceLabel: string;
    price: string;
    priceNote?: string;
    note: string;
    cta: string;
    waText: string;
  };
  why: {
    title: string;
    text: string;
    stats: { value: string; title: string; description: string }[];
  };
  extra?: {
    title: string;
    text: string;
    items: { icon: LucideIcon; title: string; description: string }[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: { title: string; day: string; icon: LucideIcon }[];
  };
  cases: {
    title: string;
    text: string;
    items: { image: string; tag: string; title: string; description?: string; url: string }[];
  };
  includes: {
    title: string;
    subtitle: string;
    items: { icon: LucideIcon; title: string; description: string }[];
  };
  cta: { title: string; text: string; priceLabel: string; price: string };
};

export function Eyebrow({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-muted-foreground mb-8">
      <span className="flex h-6 w-6 items-center justify-center bg-foreground text-background">
        <Icon className="w-3.5 h-3.5" />
      </span>
      {children}
    </div>
  );
}

export function PageHero({
  bg,
  eyebrow,
  title,
  intro,
  bullets,
  actions,
  children,
}: {
  bg: string;
  eyebrow: string;
  title: string;
  intro: string;
  bullets?: string[];
  actions?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative -mt-20 text-white overflow-hidden lg:min-h-[88vh] flex items-center">
      <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url('${bg}')` }} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />

      <div className="max-w-7xl w-full mx-auto px-6 pt-36 md:pt-44 pb-16 lg:pb-24 grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-12 lg:gap-20 items-center">
        <div>
          <p className="text-xs sm:text-sm font-medium tracking-wide text-white/80 mb-4 sm:mb-6">{eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08] tracking-tight">{title}</h1>
          <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed">{intro}</p>
          {actions && <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4">{actions}</div>}
          {bullets && (
            <ul className="mt-8 flex flex-col gap-2 text-sm text-white/80">
              {bullets.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary mt-2 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

export function ServicePage({ c }: { c: ServicePageConfig }) {
  const keys = ["why", ...(c.extra ? ["extra"] : []), "process", "cases", "includes", "cta"];
  const bgOf = (k: string) => (keys.indexOf(k) % 2 === 0 ? "bg-white" : "bg-neutral-100");
  const href = whatsappLink(c.card.waText);

  return (
    <>
      <PageHero bg={c.heroBg} eyebrow={c.eyebrow} title={c.title} intro={c.intro} bullets={c.bullets}>
        <div className="bg-white text-foreground p-6 sm:p-8 shadow-2xl">
          <h2 className="text-2xl font-light">{c.card.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{c.card.subtitle}</p>
          <p className="mt-6 text-xs tracking-[0.15em] uppercase text-muted-foreground">{c.card.priceLabel}</p>
          <div
            className={`font-light ${c.card.price.length > 12 ? "text-4xl" : "text-5xl"} ${
              c.card.priceNote ? "" : "mb-4"
            }`}
          >
            {c.card.price}
          </div>
          {c.card.priceNote && <p className="mt-1 mb-4 text-sm text-muted-foreground">{c.card.priceNote}</p>}
          <p className="text-xs text-muted-foreground mb-6">{c.card.note}</p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <SiWhatsapp className="w-4 h-4" />
            {c.card.cta}
          </a>
        </div>
      </PageHero>

      {/* Por qué */}
      <section className={`relative py-20 md:py-28 overflow-hidden ${bgOf("why")}`}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-6">{c.why.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{c.why.text}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {c.why.stats.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-border bg-white p-6 md:p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="text-5xl md:text-6xl font-light text-foreground">{s.value}</div>
                <h3 className="mt-4 text-xl font-light text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra: cuándo lo necesitas */}
      {c.extra && (
        <section className={`relative py-20 md:py-28 overflow-hidden ${bgOf("extra")}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 md:mb-16 items-end">
              <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground">{c.extra.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{c.extra.text}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10 md:gap-12">
              {c.extra.items.map((it) => (
                <div key={it.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10 mb-6">
                    <it.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-light text-foreground mb-2">{it.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{it.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Proceso */}
      <section className={`relative py-20 md:py-28 overflow-hidden ${bgOf("process")}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 md:mb-16 items-end">
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground">{c.process.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{c.process.subtitle}</p>
          </div>
          <div className="border-t border-border" />
          <div className={`grid ${c.process.steps.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"} md:divide-x divide-border`}>
              {c.process.steps.map((s, i) => (
                <div key={s.title} className="py-10 md:px-8 first:md:pl-0 last:md:pr-0">
                  <span className="text-xs text-muted-foreground">0{i + 1}</span>
                  <s.icon className="mt-8 w-7 h-7 text-primary" strokeWidth={1.5} />
                  <h3 className="mt-6 text-xl font-light leading-snug text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{s.day}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Casos */}
      <section className={`relative py-20 md:py-28 overflow-hidden ${bgOf("cases")}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 md:mb-16 items-end">
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground">{c.cases.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{c.cases.text}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.cases.items.map((it) => (
              <a
                key={it.title}
                href={it.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-xl border border-border bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">{it.tag}</span>
                  <h3 className="mt-3 text-xl font-light text-foreground">{it.title}</h3>
                  {it.description && (
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{it.description}</p>
                  )}
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Ver sitio
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Lo que incluye */}
      <section className={`relative py-20 md:py-28 overflow-hidden ${bgOf("includes")}`}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-6">{c.includes.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{c.includes.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {c.includes.items.map((it) => (
              <div
                key={it.title}
                className="rounded-xl border border-border bg-white p-6 md:p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <it.icon className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-light text-foreground mb-2">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`relative py-20 md:py-24 overflow-hidden ${bgOf("cta")}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-light leading-tight text-foreground mb-4">{c.cta.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{c.cta.text}</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
            <div className="text-left lg:text-right">
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">{c.cta.priceLabel}</p>
              <p className="text-3xl font-light text-foreground">{c.cta.price}</p>
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-6 bg-foreground text-background px-7 py-4 text-base font-medium hover:opacity-90 transition-opacity"
            >
              {c.card.cta}
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
