"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Shield,
  X,
  CircleCheckBig,
  Code,
  MessageCircle,
  Palette,
  Rocket,
  ChevronDown,
  TrendingUp,
  Eye,
  Award,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

const datos = [
  {
    icon: Clock,
    value: "50",
    unit: "ms",
    title: "Es todo lo que tarda alguien en decidir si confía en tu negocio con solo ver tu sitio web.",
    source: "Behaviour & Information Technology / Stanford Web Credibility",
  },
  {
    icon: Eye,
    value: "#1",
    unit: "",
    title: "El diseño es el factor que la gente usa primero para juzgar si tu negocio es creíble — antes de leer una sola palabra.",
    source: "Stanford Web Credibility Research",
  },
  {
    icon: TrendingUp,
    value: "+",
    unit: "Ventas",
    title: "Las pequeñas empresas con un sitio web bien hecho reportan más ventas que las que improvisan.",
    source: "Clutch, 2024",
  },
  {
    icon: BarChart3,
    value: "27",
    unit: "%",
    title: "De crecimiento esperado en el comercio digital de México este año. El mercado ya se está moviendo.",
    source: "AMVO / Statista",
  },
];

const proceso = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Platicamos de tu negocio",
    description:
      "Antes de diseñar una sola línea, entendemos qué haces, a quién le vendes y qué quieres que la gente sienta al ver tu marca.",
  },
  {
    icon: Palette,
    step: "02",
    title: "Diseñamos tu sitio a la medida",
    description:
      "Nada de plantillas. Creamos un diseño original pensado específicamente para tu negocio y tu industria.",
  },
  {
    icon: Code,
    step: "03",
    title: "Construimos con tecnología moderna",
    description:
      "Desarrollamos tu sitio con las mismas herramientas que usan las marcas grandes — rápido, seguro y listo para crecer contigo.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Lo lanzamos y te acompañamos",
    description:
      "Tu sitio sale al mundo con 3 meses de soporte incluido, por si necesitas ajustes mientras te acostumbras a tu nueva presencia digital.",
  },
];

const siEsParaTi = [
  "Tu negocio ya tiene resultados, pero tu presencia digital no lo demuestra",
  "Te urge verte profesional, no solo \"tener algo en internet\"",
  "Quieres un sitio que puedas mostrar con orgullo, no del que tengas que disculparte",
  "Entiendes que una buena imagen digital es inversión, no gasto",
];

const noEsParaTi = [
  "Buscas la opción más barata posible, sin importar el resultado",
  "Quieres que \"se vea bien\" usando una plantilla gratuita",
  "Apenas estás validando una idea y no necesitas presencia formal todavía",
];

const faqs = [
  {
    question: "¿Ya tengo un dominio, lo puedo usar?",
    answer:
      "Sí, sin problema. Conectamos tu sitio nuevo al dominio que ya tienes, o te ayudamos a conseguir uno si todavía no tienes.",
  },
  {
    question: "¿Qué incluyen los 3 meses de soporte?",
    answer:
      "Ajustes de contenido, corrección de errores y cambios menores de diseño durante los primeros 3 meses después de la entrega, sin costo adicional.",
  },
  {
    question: "¿Puedo pedir cambios después de que el sitio esté listo?",
    answer:
      "Claro. Después del periodo de soporte incluido, ofrecemos planes de mantenimiento mensual para que tu sitio siga actualizado y funcionando bien.",
  },
  {
    question: "¿En verdad lo entregan en 2-3 semanas?",
    answer:
      "Sí. Usamos tecnología moderna y un proceso eficiente que nos permite mantener el mismo nivel de calidad que agencias que tardan el doble, sin sacrificar diseño ni atención a detalle.",
  },
  {
    question: "¿Qué pasa si no me gusta el diseño inicial?",
    answer:
      "Antes de programar nada, te mostramos el diseño completo para tu aprobación. Ajustamos lo necesario hasta que estés conforme, así no hay sorpresas a mitad del proyecto.",
  },
];

export default function EmprendedoresContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-20 pt-20 min-h-screen flex items-center text-secondary-foreground overflow-hidden">
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero_bg.jpg')" }}
        />
        <div className="fixed inset-0 bg-black/50 -z-10" />

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="text-center">
            <div className="hidden sm:inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 shrink-0" />
              Para el Emprendedor Exitoso
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Tu idea no nació para
              <br />
              <span className="text-accent">verse como cualquier otra</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-secondary-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Llegaste hasta aquí porque tu negocio funciona. Tus clientes confían en ti, tus
              resultados hablan por sí solos. Pero si tu página web todavía parece sacada de un
              constructor gratuito o de una plantilla con IA genérica, le estás mandando al mundo
              el mensaje equivocado sobre lo que en realidad construiste.
              <br />
              <br />
              <strong className="text-secondary-foreground">
                Mereces un sitio que se vea tan serio como tú ya eres.
              </strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-6 sm:px-10 py-5 sm:py-7 text-sm sm:text-lg font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
                size="lg"
              >
                <a
                  href="https://wa.me/525523995604?text=Hola%2C%20quiero%20que%20mi%20marca%20se%20vea%20como%20se%20merece"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <SiWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  Quiero que mi marca se vea como se merece
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicio directo */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Sitio Corporativo: hecho a tu medida, no a la medida de un theme
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No usamos plantillas. No copiamos diseños de otros sitios y les cambiamos el logo.
              Cada sección de tu página se piensa, se diseña y se construye específicamente para
              tu negocio.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Diseño 100% original, pensado para tu marca — cero plantillas",
              "Construido con tecnología moderna, no con \"armadores\" automáticos",
              "Cada palabra y cada sección con un propósito: que confíen en ti",
              "Listo para que Google te encuentre desde el primer día",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-5 shadow-xl flex items-start gap-3"
              >
                <CircleCheckBig className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-foreground font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quién es esto */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Esto es para ti si...
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-primary/20 bg-white/60 backdrop-blur-xl p-6 shadow-xl">
              <div className="space-y-4">
                {siEsParaTi.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CircleCheckBig className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-foreground font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-white/60 backdrop-blur-xl p-6 shadow-xl">
              <div className="space-y-4">
                {noEsParaTi.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-lg text-primary font-semibold mt-10">
            Si te identificaste con la primera lista, sigamos hablando.
          </p>
        </div>
      </section>

      {/* Datos de respaldo */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Tu cliente decide si confiar en ti antes de leer una sola palabra
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No es percepción nuestra. Es lo que dice la ciencia del comportamiento:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {datos.map((dato) => (
              <div
                key={dato.title}
                className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <dato.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">
                      {dato.value}
                      <span className="text-lg">{dato.unit}</span>
                    </div>
                    <p className="text-foreground font-medium mb-2">{dato.title}</p>
                    <p className="text-xs text-muted-foreground">Fuente: {dato.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de trabajo */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Cómo se ve el proceso, paso a paso
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {proceso.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-primary/20 bg-white/60 backdrop-blur-xl p-6 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-accent mb-1">{item.step}</div>
                    <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Caso de éxito */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Esto no es teoría. Así le fue a un cliente real.
            </h2>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-white/40 backdrop-blur-xl p-8 shadow-2xl">
            <p className="text-foreground leading-relaxed mb-8">
              <strong className="text-primary">Capetillo Producciones</strong>, dirigida por
              Alberto Capetillo, llegó con un negocio sólido en el sector audiovisual — pero sin
              presencia digital que reflejara ese nivel de trabajo. Diseñamos y desarrollamos su
              sitio web corporativo desde cero, con una sola meta: que su sitio trabajara para
              ellos, no solo que existiera.
            </p>

            <p className="text-muted-foreground font-medium mb-6">
              El resultado, medido directamente en Google Search Console:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-1">3,800</div>
                <div className="text-sm text-muted-foreground">clics totales en 16 meses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-1">242,000</div>
                <div className="text-sm text-muted-foreground">impresiones en Google</div>
              </div>
            </div>

            <p className="text-center text-accent font-semibold mb-6">
              De prácticamente cero a un crecimiento sostenido mes con mes
            </p>

            <p className="text-foreground leading-relaxed mb-4">
              No fue suerte. Fue un sitio bien construido, con SEO correcto desde el primer día,
              haciendo su trabajo todos los días sin que nadie tuviera que estar empujándolo.
            </p>

            <p className="text-xs text-muted-foreground">
              Fuente: Google Search Console, datos propios del proyecto, 16 meses.
            </p>
          </div>
        </div>
      </section>

      {/* Precio */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-primary">
            Lo que cuesta verse como lo que realmente eres
          </h2>

          <div className="rounded-2xl border border-primary/20 bg-white/60 backdrop-blur-xl p-8 shadow-2xl">
            <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Sitio Corporativo</h3>
            <div className="text-5xl font-bold text-primary mb-4">$15,000 MXN</div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Listo en 2-3 semanas</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>3 meses de soporte incluido</span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-8">
              La misma calidad que otras agencias tardan el doble en entregar — porque usamos la
              tecnología correcta, no porque recortemos en diseño. Sin descuentos falsos, sin
              letras chiquitas: el precio justo por un trabajo bien hecho.
            </p>

            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-lg font-semibold hover:opacity-90 transition-opacity"
              size="lg"
            >
              <a
                href="https://wa.me/525523995604?text=Hola%2C%20me%20interesa%20el%20Sitio%20Corporativo%20de%20%2415%2C000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="w-5 h-5 mr-2" />
                Quiero mi Sitio Corporativo
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="relative py-20 bg-background bg-cover bg-center bg-fixed overflow-hidden"
        style={{ backgroundImage: "url('/images/body_bg.jpg')" }}
      >
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="rounded-xl border border-primary/20 bg-white/40 backdrop-blur-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left flex justify-between items-center hover:bg-primary/5 transition-colors"
                >
                  <h3 className="font-medium text-foreground pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openFaq === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                  style={{ display: "grid" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative py-20 bg-neutral-100 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="rounded-2xl border border-primary/20 bg-white/60 backdrop-blur-xl p-8 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Ya construiste algo que vale la pena. Que se vea así.
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Cuéntanos de tu negocio. En minutos te decimos exactamente cómo se vería tu nuevo
              sitio — y cuánto tardaríamos en tenerlo listo para que el mundo te vea como ya te
              ves tú mismo.
            </p>

            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-primary to-red-600 border-2 border-primary/40 text-white px-10 py-7 text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <a
                href="https://wa.me/525523995604?text=Hola%2C%20cu%C3%A9ntenme%20c%C3%B3mo%20se%20ver%C3%ADa%20mi%20sitio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp className="mr-2 w-5 h-5" />
                Hablar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}