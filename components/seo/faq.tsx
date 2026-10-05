import { Plus } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { whatsappLink } from "@/lib/seo/oferta";

export function Faq({
  items,
    title = "Lo que más nos preguntan",
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((i) => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        }}
      />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm text-muted-foreground mb-5">Preguntas frecuentes</p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight text-foreground mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            ¿Tienes otra duda? Escríbenos y te respondemos directo.
          </p>
          <a
            href={whatsappLink("Hola, tengo una duda sobre mi página web")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary underline underline-offset-4"
          >
            Preguntar por WhatsApp
          </a>
        </div>

        <div className="border-t border-border">
          {items.map((i) => (
            <details key={i.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg md:text-xl font-light text-foreground [&::-webkit-details-marker]:hidden">
                {i.q}
                <Plus className="w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="pb-6 pr-10 text-muted-foreground leading-relaxed">{i.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
