import { BarChart3, ChevronRight, Clock, Code, Eye, MessageCircle, Palette, Rocket, TrendingUp, X } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { PageHero } from "@/components/site/service-page";
import { btnLight, CheckList, CtaBand, cardClass, ProcessColumns, Section, SectionHeader, SplitSection, StatCard } from "@/components/site/blocks";
import { Faq } from "@/components/seo/faq";
import { whatsappLink } from "@/lib/seo/oferta";

const datos = [
  { icon: Clock, value: "50", unit: "ms", title: "Es todo lo que tarda alguien en decidir si confía en tu negocio con solo ver tu sitio web.", source: "Behaviour & Information Technology / Stanford Web Credibility" },
  { icon: Eye, value: "#1", unit: "", title: "El diseño es el factor que la gente usa primero para juzgar si tu negocio es creíble, antes de leer una sola palabra.", source: "Stanford Web Credibility Research" },
  { icon: TrendingUp, value: "+", unit: "Ventas", title: "Las pequeñas empresas con un sitio web bien hecho reportan más ventas que las que improvisan.", source: "Clutch, 2024" },
  { icon: BarChart3, value: "27", unit: "%", title: "De crecimiento esperado en el comercio digital de México este año. El mercado ya se está moviendo.", source: "AMVO / Statista" },
];

const proceso = [
  { icon: MessageCircle, title: "Platicamos de tu negocio", description: "Antes de diseñar una sola línea, entendemos qué haces, a quién le vendes y qué quieres que la gente sienta al ver tu marca." },
  { icon: Palette, title: "Diseñamos tu sitio a la medida", description: "Nada de plantillas. Creamos un diseño original pensado específicamente para tu negocio y tu industria." },
  { icon: Code, title: "Construimos con tecnología moderna", description: "Desarrollamos tu sitio con las mismas herramientas que usan las marcas grandes: rápido, seguro y listo para crecer contigo." },
  { icon: Rocket, title: "Lo lanzamos y te acompañamos", description: "Tu sitio sale al mundo con 3 meses de soporte incluido, por si necesitas ajustes mientras te acostumbras a tu nueva presencia digital." },
];

const servicioDirecto = [
  "Diseño 100% original, pensado para tu marca, cero plantillas",
  "Construido con tecnología moderna, no con “armadores” automáticos",
  "Cada palabra y cada sección con un propósito: que confíen en ti",
  "Listo para que Google te encuentre desde el primer día",
];

const siEsParaTi = [
  "Tu negocio ya tiene resultados, pero tu presencia digital no lo demuestra",
  "Te urge verte profesional, no solo “tener algo en internet”",
  "Quieres un sitio que puedas mostrar con orgullo, no del que tengas que disculparte",
  "Entiendes que una buena imagen digital es inversión, no gasto",
];

const noEsParaTi = [
  "Buscas la opción más barata posible, sin importar el resultado",
  "Quieres que “se vea bien” usando una plantilla gratuita",
  "Apenas estás validando una idea y no necesitas presencia formal todavía",
];

const faqs = [
  { q: "¿Ya tengo un dominio, lo puedo usar?", a: "Sí, sin problema. Conectamos tu sitio nuevo al dominio que ya tienes, o te ayudamos a conseguir uno si todavía no tienes." },
  { q: "¿Qué incluyen los 3 meses de soporte?", a: "Ajustes de contenido, corrección de errores y cambios menores de diseño durante los primeros 3 meses después de la entrega, sin costo adicional." },
  { q: "¿Puedo pedir cambios después de que el sitio esté listo?", a: "Claro. Después del periodo de soporte incluido, ofrecemos planes de mantenimiento mensual para que tu sitio siga actualizado y funcionando bien." },
  { q: "¿En verdad lo entregan en 2-3 semanas?", a: "Sí. Usamos tecnología moderna y un proceso eficiente que nos permite mantener el mismo nivel de calidad que agencias que tardan el doble, sin sacrificar diseño ni atención a detalle." },
  { q: "¿Qué pasa si no me gusta el diseño inicial?", a: "Antes de programar nada, te mostramos el diseño completo para tu aprobación. Ajustamos lo necesario hasta que estés conforme, así no hay sorpresas a mitad del proyecto." },
];

const waLink = whatsappLink("Hola, me interesa el Sitio Corporativo de $7,000");

export default function EmprendedoresContent() {
  return (
    <>
      <PageHero
        bg="/images/hero_bg.jpg"
        eyebrow="Para el emprendedor exitoso"
        title="Tu idea no nació para verse como cualquier otra."
        intro="Llegaste hasta aquí porque tu negocio funciona. Tus clientes confían en ti, tus resultados hablan por sí solos. Pero si tu página web todavía parece sacada de un constructor gratuito o de una plantilla con IA genérica, le estás mandando al mundo el mensaje equivocado sobre lo que en realidad construiste. Mereces un sitio que se vea tan serio como tú ya eres."
        actions={
          <a
            href={whatsappLink("Hola, quiero que mi marca se vea como se merece")}
            target="_blank"
            rel="noopener noreferrer"
            className={btnLight}
          >
            <SiWhatsapp className="w-4 h-4" />
            Quiero que mi marca se vea como se merece
          </a>
        }
      />

      <SplitSection
        bg="bg-white"
        title="Sitio Corporativo: hecho a tu medida, no a la medida de un theme"
        text="No usamos plantillas. No copiamos diseños de otros sitios y les cambiamos el logo. Cada sección de tu página se piensa, se diseña y se construye específicamente para tu negocio."
      >
        <div className={cardClass}>
          <CheckList items={servicioDirecto} />
        </div>
      </SplitSection>

      <Section bg="bg-neutral-100">
        <SectionHeader
          title="Esto es para ti si..."
          text="Si te identificaste con la primera lista, sigamos hablando."
        />
        <div className="grid md:grid-cols-2 gap-5">
          <div className={cardClass}>
            <h3 className="text-xl font-light text-foreground mb-5">Sí es para ti</h3>
            <CheckList items={siEsParaTi} />
          </div>
          <div className={cardClass}>
            <h3 className="text-xl font-light text-foreground mb-5">No es para ti</h3>
            <ul className="space-y-4">
              {noEsParaTi.map((t) => (
                <li key={t} className="flex items-start gap-3 text-muted-foreground">
                  <X className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section bg="bg-white">
        <SectionHeader
          title="Tu cliente decide si confiar en ti antes de leer una sola palabra"
          text="No es percepción nuestra. Es lo que dice la ciencia del comportamiento."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {datos.map((d) => (
            <div key={d.title} className={cardClass}>
              <d.icon className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
              <div className="text-5xl font-light text-foreground">
                {d.value}
                {d.unit && <span className="ml-1 text-lg text-muted-foreground">{d.unit}</span>}
              </div>
              <p className="mt-4 text-sm text-foreground leading-relaxed">{d.title}</p>
              <p className="mt-3 text-xs text-muted-foreground">Fuente: {d.source}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="bg-neutral-100">
        <SectionHeader title="Cómo se ve el proceso, paso a paso" />
        <ProcessColumns steps={proceso} />
      </Section>

      <SplitSection
        bg="bg-white"
        title="Esto no es teoría. Así le fue a un cliente real."
        text="Capetillo Producciones, dirigida por Alberto Capetillo, llegó con un negocio sólido en el sector audiovisual, pero sin presencia digital que reflejara ese nivel de trabajo. Diseñamos y desarrollamos su sitio web corporativo desde cero, con una sola meta: que su sitio trabajara para ellos, no solo que existiera."
      >
        <p className="text-muted-foreground font-medium mb-5">El resultado, medido directamente en Google Search Console:</p>
        <div className="grid sm:grid-cols-2 gap-5">
          <StatCard value="3,800" title="Clics totales en 16 meses" />
          <StatCard value="242,000" title="Impresiones en Google" />
        </div>
        <p className="mt-8 text-foreground font-medium">De prácticamente cero a un crecimiento sostenido mes con mes.</p>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          No fue suerte. Fue un sitio bien construido, con SEO correcto desde el primer día, haciendo su trabajo todos los días sin que nadie tuviera que estar empujándolo.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">Fuente: Google Search Console, datos propios del proyecto, 16 meses.</p>
      </SplitSection>

      <SplitSection
        bg="bg-neutral-100"
        title="Lo que cuesta verse como lo que realmente eres"
        text="La misma calidad que otras agencias tardan el doble en entregar, porque usamos la tecnología correcta, no porque recortemos en diseño. Sin descuentos falsos, sin letras chiquitas: el precio justo por un trabajo bien hecho."
      >
        <div className="rounded-xl border border-foreground/80 bg-white overflow-hidden">
          <div className="bg-neutral-100 border-b border-foreground/80 px-6 py-5">
            <h3 className="text-xl font-light text-foreground">Sitio Corporativo</h3>
          </div>
          <div className="px-6 py-8">
            <div className="text-5xl font-light text-foreground">
              $7,000<span className="ml-2 text-base text-muted-foreground">MXN</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-primary" />Listo en 2-3 semanas</li>
              <li className="flex items-center gap-3"><Rocket className="w-4 h-4 text-primary" />3 meses de soporte incluido</li>
            </ul>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <SiWhatsapp className="w-4 h-4" />
              Quiero mi Sitio Corporativo
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </SplitSection>

      <Faq items={faqs} />

      <CtaBand
        bg="bg-neutral-100"
        title="Ya construiste algo que vale la pena. Que se vea así."
        text="Cuéntanos de tu negocio. En minutos te decimos exactamente cómo se vería tu nuevo sitio y cuánto tardaríamos en tenerlo listo para que el mundo te vea como ya te ves tú mismo."
        cta="Hablar por WhatsApp"
        href={whatsappLink("Hola, cuéntenme cómo se vería mi sitio")}
      />
    </>
  );
}
