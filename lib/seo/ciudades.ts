import type { Faq } from "./giros";

export type Ciudad = {
  slug: string;
  nombre: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  contexto: string;
  zonas: string[];
  faqs: Faq[];
};

export const ciudades: Ciudad[] = [
  {
    slug: "ciudad-de-mexico",
    nombre: "Ciudad de México",
    title: "Diseño de Páginas Web en CDMX · Listas en 72 h desde $3,500",
    description:
      "Páginas web para negocios en la Ciudad de México: listas en 72 horas, con perfil de Google Maps y precio fijo desde $3,500 MXN.",
    h1: "Diseño de páginas web en Ciudad de México",
    intro:
      "En la Ciudad de México la competencia por la atención en Google es enorme: hay un negocio de casi todo en cada colonia. Si tu página no carga rápido en el celular y no aparece en el mapa de tu zona, te pierdes frente a quien sí.",
    contexto:
      "Marmo Creativo opera desde la Ciudad de México, así que conocemos de primera mano cómo busca el cliente aquí: por colonia, desde el celular y comparando rápido. Por eso armamos páginas pensadas para aparecer en búsquedas por alcaldía y zona.",
    zonas: [
      "Cuauhtémoc, Roma, Condesa y Centro",
      "Benito Juárez y Del Valle",
      "Coyoacán y Tlalpan",
      "Miguel Hidalgo y Polanco",
      "Iztapalapa, Gustavo A. Madero y el oriente de la ciudad",
    ],
    faqs: [
      {
        q: "¿Tienen oficina en CDMX?",
        a: "Trabajamos en la Ciudad de México, pero la atención es por WhatsApp y videollamada para ahorrarte traslados. El precio y el tiempo de entrega son los mismos para toda la república.",
      },
      {
        q: "¿Mi página aparecerá en Google cuando busquen mi alcaldía?",
        a: "Optimizamos tu página y tu perfil de Google Maps con tu zona, pero el posicionamiento depende de la competencia y toma semanas. No prometemos un lugar específico en los resultados.",
      },
      {
        q: "¿Puedo atender a clientes de toda el área metropolitana?",
        a: "Sí. Configuramos tu perfil como negocio local o de área de servicio, según cómo trabajes.",
      },
    ],
  },
  {
    slug: "guadalajara",
    nombre: "Guadalajara",
    title: "Diseño de Páginas Web en Guadalajara · Listas en 72 h desde $3,500",
    description:
      "Páginas web para negocios en Guadalajara y Zona Metropolitana: listas en 72 horas, con Google Maps incluido. Desde $3,500 MXN, precio fijo.",
    h1: "Diseño de páginas web en Guadalajara",
    intro:
      "Guadalajara tiene un ecosistema fuerte de negocios locales, servicios profesionales y emprendimientos creativos. En una ciudad con tantas opciones, tener una página clara y encontrable marca la diferencia entre ser descubierto o pasar desapercibido.",
    contexto:
      "Atendemos negocios de Guadalajara y su zona metropolitana de forma 100% remota. Armamos tu página con tu información y la dejamos lista para que tus clientes te encuentren por zona y servicio.",
    zonas: [
      "Guadalajara centro, Americana y Providencia",
      "Zapopan y Andares",
      "Tlaquepaque y Tonalá",
      "Tlajomulco de Zúñiga",
    ],
    faqs: [
      {
        q: "¿Tienen oficina en Guadalajara?",
        a: "No, atendemos en línea por WhatsApp y videollamada. Es la razón por la que podemos mantener un precio fijo y entregar en 72 horas, igual que a cualquier otra ciudad.",
      },
      {
        q: "¿Atienden negocios de Zapopan, Tlaquepaque o Tonalá?",
        a: "Sí, toda la zona metropolitana. En tu perfil de Google puedes indicar los municipios donde das servicio.",
      },
      {
        q: "¿Puedo registrar un dominio .com.mx?",
        a: "Sí. Con .com.mx o .mx la Página Express suma $500 MXN y la renovación es de $2,000 MXN al año.",
      },
    ],
  },
  {
    slug: "monterrey",
    nombre: "Monterrey",
    title: "Diseño de Páginas Web en Monterrey · Listas en 72 h desde $3,500",
    description:
      "Páginas web para negocios en Monterrey y su zona metropolitana: listas en 72 horas con Google Maps. Precio fijo desde $3,500 MXN.",
    h1: "Diseño de páginas web en Monterrey",
    intro:
      "Monterrey es una ciudad de servicios profesionales, industria y comercio donde se valora la formalidad. Una página sólida y rápida comunica que tu negocio es serio antes de que el cliente te escriba.",
    contexto:
      "Trabajamos con negocios de Monterrey y el área metropolitana de manera remota. Te acompañamos desde que mandas tu información hasta que tu página y tu perfil de Google están en línea.",
    zonas: [
      "Monterrey centro y Mitras",
      "San Pedro Garza García",
      "San Nicolás de los Garza",
      "Guadalupe, Apodaca y Santa Catarina",
    ],
    faqs: [
      {
        q: "¿Tienen oficina en Monterrey?",
        a: "No, todo se hace en línea por WhatsApp y videollamada, con el mismo precio y tiempo de entrega que en el resto del país.",
      },
      {
        q: "Ya existe alguien que ofrece páginas en 72 horas en Monterrey, ¿en qué se diferencian?",
        a: "Nuestra propuesta incluye el alta u optimización de tu perfil de Google Maps, el primer año de hosting y dominio, y una garantía clara: si no está lista en 72 horas hábiles, no la pagas.",
      },
      {
        q: "¿Puedo tener un sitio más grande para mi empresa?",
        a: "Sí. Además de la Página Express, hacemos sitios corporativos, e-commerce y software a la medida.",
      },
    ],
  },
  {
    slug: "puebla",
    nombre: "Puebla",
    title: "Diseño de Páginas Web en Puebla · Listas en 72 h desde $3,500",
    description:
      "Páginas web para negocios en Puebla: listas en 72 horas con perfil de Google Maps. Precio fijo desde $3,500 MXN, hosting y dominio el primer año.",
    h1: "Diseño de páginas web en Puebla",
    intro:
      "Puebla combina turismo, gastronomía, comercio y una industria creciente. Para un negocio local, aparecer en Google cuando alguien busca “cerca de mí” puede ser lo que atrae al cliente que viene de paso o al vecino que busca algo nuevo.",
    contexto:
      "Atendemos a negocios poblanos en línea. Adaptamos la plantilla de tu giro a tu marca y te ayudamos a configurar tu presencia en Google para que te encuentren por zona.",
    zonas: [
      "Centro Histórico de Puebla",
      "Angelópolis y Lomas de Angelópolis",
      "La Paz y Cholula",
      "San Andrés y San Pedro Cholula",
    ],
    faqs: [
      {
        q: "¿Tienen oficina en Puebla?",
        a: "No, trabajamos 100% en línea por WhatsApp y videollamada. El precio y el tiempo de entrega son los mismos que en cualquier otra ciudad.",
      },
      {
        q: "Mi negocio es turístico o gastronómico, ¿sirve la Página Express?",
        a: "Sí. Para restaurantes y cafeterías tenemos una plantilla con menú, ubicación y pedidos o reservaciones por WhatsApp.",
      },
      {
        q: "¿Atienden negocios de Cholula y la zona metropolitana?",
        a: "Sí. En tu perfil de Google puedes indicar tu zona de servicio.",
      },
    ],
  },
];

export const getCiudad = (slug: string) => ciudades.find((c) => c.slug === slug);
