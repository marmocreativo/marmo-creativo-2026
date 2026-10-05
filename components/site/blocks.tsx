import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Check, ChevronRight } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

/* Bloques reutilizables del design system (docs/design-system.md) */

export const btnDark =
  "inline-flex items-center justify-center gap-3 bg-foreground text-background px-7 py-4 text-base font-medium hover:opacity-90 transition-opacity";
export const btnLight =
  "inline-flex items-center justify-center gap-3 bg-white text-black px-7 py-4 text-base font-medium hover:bg-white/90 transition-colors";
export const btnOutlineLight =
  "inline-flex items-center justify-center gap-3 border border-white/70 px-7 py-4 text-base font-medium hover:bg-white hover:text-black transition-colors";

export type Bg = "bg-white" | "bg-neutral-100";

export function Section({
  bg,
  id,
  children,
}: {
  bg: Bg;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`relative py-20 md:py-28 overflow-hidden ${bg}`}>
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  );
}

export function SectionHeader({ title, text }: { title: React.ReactNode; text?: React.ReactNode }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 md:mb-16 items-end">
      <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground">{title}</h2>
      {text && <p className="text-lg text-muted-foreground leading-relaxed">{text}</p>}
    </div>
  );
}

/** Texto a la izquierda (sticky) y contenido a la derecha. */
export function SplitSection({
  bg,
  id,
  title,
  text,
  extra,
  children,
}: {
  bg: Bg;
  id?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Section bg={bg} id={id}>
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-6">{title}</h2>
          {text && <p className="text-lg text-muted-foreground leading-relaxed">{text}</p>}
          {extra}
        </div>
        <div>{children}</div>
      </div>
    </Section>
  );
}

export const cardClass =
  "rounded-xl border border-border bg-white p-6 md:p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all";

export function IconCard({
  icon: Icon,
  title,
  description,
  footer,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className={cardClass}>
      <Icon className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
      <h3 className="text-xl font-light text-foreground mb-2">{title}</h3>
      {description && <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>}
      {footer}
    </div>
  );
}

export function StatCard({ value, title, description }: { value: string; title: string; description?: string }) {
  return (
    <div className={cardClass}>
      <div className="text-5xl md:text-6xl font-light text-foreground">{value}</div>
      <h3 className="mt-4 text-xl font-light text-foreground">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>}
    </div>
  );
}

export function CheckList({ items, tone = "dark" }: { items: string[]; tone?: "dark" | "muted" }) {
  return (
    <ul className="space-y-4">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3">
          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
          <span className={tone === "muted" ? "text-muted-foreground" : "text-foreground"}>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProcessColumns({
  steps,
}: {
  steps: { title: string; description?: string; day?: string; icon: LucideIcon }[];
}) {
  return (
    <>
      <div className="border-t border-border" />
      <div
        className={`grid ${steps.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"} md:divide-x divide-border`}
      >
        {steps.map((s, i) => (
          <div key={s.title} className="py-10 md:px-8 first:md:pl-0 last:md:pr-0">
            <span className="text-xs text-muted-foreground">0{i + 1}</span>
            <s.icon className="mt-8 w-7 h-7 text-primary" strokeWidth={1.5} />
            <h3 className="mt-6 text-xl font-light leading-snug text-foreground">{s.title}</h3>
            {s.description && <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.description}</p>}
            {s.day && <p className="mt-3 text-sm text-muted-foreground">{s.day}</p>}
          </div>
        ))}
      </div>
    </>
  );
}

export type Plan = {
  name: string;
  badge?: string;
  price: string;
  unit?: string;
  note?: string;
  lead?: string;
  items?: string[];
  cta: string;
  href: string;
  external?: boolean;
  featured?: boolean;
};

export function PlansTable({ plans, cols = 3 }: { plans: Plan[]; cols?: 3 | 4 }) {
  return (
    <div
      className={`grid ${
        cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"
      } gap-px rounded-xl border border-foreground/80 bg-foreground/80 overflow-hidden`}
    >
      {plans.map((p) => (
        <div key={p.name} className="flex flex-col bg-white">
          <div className="flex items-center gap-3 bg-neutral-100 border-b border-foreground/80 px-6 py-5 min-h-[76px]">
            <h3 className="text-xl font-light text-foreground">{p.name}</h3>
            {p.badge && (
              <span className="rounded-full bg-primary text-white text-xs font-semibold px-3 py-1">{p.badge}</span>
            )}
          </div>

          <div className="flex flex-col flex-1 px-6 py-6">
            <div className={`font-light text-foreground ${p.price.length > 9 ? "text-3xl" : "text-5xl"}`}>
              {p.price}
              {p.unit && <span className="ml-2 text-base text-muted-foreground">{p.unit}</span>}
            </div>
            {p.note && <p className="mt-2 text-xs text-muted-foreground min-h-[32px]">{p.note}</p>}

            {p.lead && <p className="mt-6 mb-4 text-sm text-foreground">{p.lead}</p>}
            {p.items && (
              <ul className="space-y-3 flex-1">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {!p.items && <div className="flex-1" />}

            {(() => {
              const cls = `mt-8 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium transition-colors ${
                p.featured
                  ? "bg-foreground text-background hover:opacity-90"
                  : "border border-foreground/70 text-foreground hover:bg-foreground hover:text-background"
              }`;
              return p.external ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {p.cta}
                  <ChevronRight className="w-4 h-4" />
                </a>
              ) : (
                <Link href={p.href} className={cls}>
                  {p.cta}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              );
            })()}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CtaBand({
  bg,
  title,
  text,
  priceLabel,
  price,
  cta,
  href,
  notes,
}: {
  bg: Bg;
  title: string;
  text: string;
  priceLabel?: string;
  price?: string;
  cta: string;
  href: string;
  notes?: string[];
}) {
  return (
    <section className={`relative py-20 md:py-24 overflow-hidden ${bg}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-light leading-tight text-foreground mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{text}</p>
          {notes && (
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {notes.map((n) => (
                <li key={n} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  {n}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
          {price && (
            <div className="text-left lg:text-right">
              {priceLabel && (
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">{priceLabel}</p>
              )}
              <p className="text-3xl font-light text-foreground">{price}</p>
            </div>
          )}
          <a href={href} target="_blank" rel="noopener noreferrer" className={`${btnDark} justify-between gap-6`}>
            <span className="inline-flex items-center gap-2">
              <SiWhatsapp className="w-4 h-4" />
              {cta}
            </span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
