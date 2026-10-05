export type Faq = { q: string; a: string };

export type Giro = {
  slug: string;
  nombre: string; // plural: "dentistas"
  titulo: string; // "Dentistas"
  title: string;
  description: string;
  h1: string;
  intro: string;
  dolores: { titulo: string; texto: string }[];
  secciones: string[];
  faqs: Faq[];
};

export const giros: Giro[] = [
  {
    slug: "dentistas",
    nombre: "dentistas y consultorios dentales",
    titulo: "Dentistas",
    title: "Página Web para Dentistas en 72 Horas desde $3,500 | Marmo Creativo",
    description:
      "Página web para tu consultorio dental con perfil de Google Maps, botón de citas por WhatsApp y precio fijo desde $3,500 MXN. Lista en 72 horas.",
    h1: "Página web para dentistas, lista en 72 horas",
    intro:
      "Cuando alguien tiene dolor de muela o quiere una limpieza, lo primero que hace es buscar en Google y comparar. Si tu consultorio no aparece con fotos, servicios y una forma fácil de agendar, esa persona le llama al que sí.",
    dolores: [
      {
        titulo: "Tus pacientes te buscan antes de llamar",
        texto:
          "Revisan reseñas, ubicación y qué tratamientos ofreces. Una página clara y un perfil de Google completo generan la confianza que se necesita para elegir a un dentista.",
      },
      {
        titulo: "Las citas se pierden por mensajes sin respuesta",
        texto:
          "Con un botón de WhatsApp directo y un horario visible, el paciente agenda en segundos en lugar de desistir.",
      },
      {
        titulo: "Dependes solo de recomendaciones",
        texto:
          "El boca a boca funciona, pero se queda corto. Aparecer en Google Maps te trae pacientes nuevos de tu zona que nunca habían oído de ti.",
      },
    ],
    secciones: [
      "Tratamientos (limpieza, ortodoncia, blanqueamiento, implantes) con descripción simple",
      "Botón de WhatsApp para agendar cita",
      "Mapa, dirección y horarios",
      "Presentación del doctor y su cédula profesional",
      "Preguntas frecuentes de pacientes",
      "Espacio para reseñas y fotos del consultorio",
    ],
    faqs: [
      {
        q: "¿Puedo poner mis precios de tratamientos?",
        a: "Sí, o un “desde” en los tratamientos que quieras. Muchos consultorios prefieren indicar solo la valoración inicial y que el resto se cotice por WhatsApp. Lo decides tú.",
      },
      {
        q: "¿Incluye un sistema de agenda en línea?",
        a: "La Página Express agenda por WhatsApp o formulario. Si quieres una agenda con calendario y recordatorios, lo cotizamos como parte del paquete Plus o como proyecto aparte.",
      },
      {
        q: "¿Qué necesito mandarte para empezar?",
        a: "Logo (si tienes), fotos del consultorio y del equipo, lista de tratamientos, horarios, dirección y tu WhatsApp. Todo se manda en el formulario de inicio.",
      },
    ],
  },
  {
    slug: "restaurantes",
    nombre: "restaurantes y cafeterías",
    titulo: "Restaurantes",
    title: "Página Web para Restaurantes en 72 Horas desde $3,500 | Marmo Creativo",
    description:
      "Página web para tu restaurante o cafetería con menú, ubicación en Google Maps y pedidos por WhatsApp. Precio fijo desde $3,500 MXN en 72 horas.",
    h1: "Página web para restaurantes y cafeterías, en 72 horas",
    intro:
      "La gente busca “dónde comer cerca” desde el celular, casi siempre ya con hambre. Si tu menú, tus horarios y tu ubicación no aparecen rápido, se van al siguiente lugar de la lista.",
    dolores: [
      {
        titulo: "El menú está enterrado en redes sociales",
        texto:
          "Un menú claro y ordenado en tu página se ve mejor en el celular y no depende de que alguien encuentre tu publicación vieja.",
      },
      {
        titulo: "No te encuentran en el mapa",
        texto:
          "Con tu perfil de Google Maps completo (fotos, horarios, teléfono) apareces cuando buscan comida cerca de ellos.",
      },
      {
        titulo: "Los pedidos y reservaciones se complican",
        texto:
          "Un botón de WhatsApp para pedidos o reservaciones evita llamadas perdidas en horas de servicio.",
      },
    ],
    secciones: [
      "Menú por categorías con fotos y precios",
      "Botón de WhatsApp para pedidos o reservaciones",
      "Mapa, horarios y cómo llegar",
      "Galería del lugar y de los platillos",
      "Enlaces a tus redes sociales",
      "Promociones o platillo del día",
    ],
    faqs: [
      {
        q: "¿Puedo actualizar el menú yo mismo?",
        a: "La Página Express incluye una ronda de cambios. Para cambios frecuentes, te damos opciones de mantenimiento mensual o actualizamos el menú por WhatsApp.",
      },
      {
        q: "¿Sirve si ya salgo en apps de entrega?",
        a: "Sí. Tu página es tuya: ahí controlas tu menú, tus precios sin comisión y tu relación con el cliente, y puedes enlazar a las apps si quieres.",
      },
      {
        q: "¿Incluye pedidos en línea con pago?",
        a: "No. La Página Express recibe pedidos y reservaciones por WhatsApp. Una tienda con pago en línea se cotiza como e-commerce.",
      },
    ],
  },
  {
    slug: "abogados",
    nombre: "abogados y despachos jurídicos",
    titulo: "Abogados",
    title: "Página Web para Abogados en 72 Horas desde $3,500 | Marmo Creativo",
    description:
      "Página web profesional para abogados y despachos: áreas de práctica, perfil de Google Maps y contacto directo. Desde $3,500 MXN en 72 horas.",
    h1: "Página web para abogados y despachos, en 72 horas",
    intro:
      "Quien necesita un abogado suele estar bajo presión y no puede arriesgarse a elegir mal. Una página seria, clara y con tus áreas de práctica bien explicadas es parte de la confianza que buscas transmitir.",
    dolores: [
      {
        titulo: "Un cliente potencial desconfía si no te encuentra en línea",
        texto:
          "Antes de llamar, investigan quién eres. Una página profesional con tu experiencia respalda tu credibilidad.",
      },
      {
        titulo: "Tus áreas de práctica no son evidentes",
        texto:
          "Laboral, familiar, penal, mercantil: cada persona busca su caso. Una sección clara por área hace que se identifiquen con tu despacho.",
      },
      {
        titulo: "Los primeros contactos se pierden",
        texto:
          "Un WhatsApp o formulario visible permite que expliquen su situación en el momento en que deciden buscar ayuda.",
      },
    ],
    secciones: [
      "Áreas de práctica con explicación sencilla",
      "Perfil del abogado o del despacho y cédula profesional",
      "Botón de WhatsApp y formulario para primera consulta",
      "Ubicación y horarios de atención",
      "Preguntas frecuentes sobre el proceso",
      "Aviso de privacidad",
    ],
    faqs: [
      {
        q: "¿Debo incluir aviso de privacidad?",
        a: "Si recabas datos personales por formulario, sí es recomendable. Incluimos una sección para tu aviso de privacidad; el texto legal lo debes validar tú o tu asesor.",
      },
      {
        q: "¿Puedo mostrar resultados de casos?",
        a: "Puedes, siempre cuidando la confidencialidad de tus clientes. Muchos despachos prefieren describir tipos de casos atendidos sin datos personales.",
      },
      {
        q: "¿Atienden despachos con varios abogados?",
        a: "Sí. La Página Express presenta al despacho; si necesitas un perfil por abogado, el paquete Express Plus tiene más secciones.",
      },
    ],
  },
  {
    slug: "esteticas",
    nombre: "estéticas, salones y barberías",
    titulo: "Estéticas y Barberías",
    title: "Página Web para Estéticas y Barberías en 72 Horas desde $3,500",
    description:
      "Página web para tu estética, salón o barbería con galería de trabajos, precios y citas por WhatsApp. Desde $3,500 MXN, lista en 72 horas.",
    h1: "Página web para estéticas y barberías, en 72 horas",
    intro:
      "En este giro se vende con los ojos: la gente quiere ver tu trabajo antes de sentarse en tu silla. Tu página es el lugar para mostrar cortes, color y estilo mejor que cualquier publicación que se pierde en el feed.",
    dolores: [
      {
        titulo: "Tu trabajo está disperso en redes",
        texto:
          "Una galería ordenada de antes y después, en un solo lugar, le da a la clienta nueva una idea clara de lo que haces.",
      },
      {
        titulo: "Preguntan precios una y otra vez",
        texto:
          "Con tu lista de servicios y precios visible, ahorras mensajes y llegan clientes que ya saben cuánto cuesta.",
      },
      {
        titulo: "Las citas se acomodan a mano",
        texto:
          "Un botón de WhatsApp con mensaje prellenado (“Quiero cita para corte”) agiliza el agendado.",
      },
    ],
    secciones: [
      "Galería de trabajos (cortes, color, uñas, barba)",
      "Lista de servicios con precios",
      "Botón de WhatsApp para agendar",
      "Horarios, ubicación y mapa",
      "Presentación del equipo",
      "Enlaces a Instagram y Facebook",
    ],
    faqs: [
      {
        q: "¿Puedo mostrar fotos de mis clientes?",
        a: "Sí, siempre que cuentes con su permiso. Te ayudamos a elegir y optimizar las fotos para que la página cargue rápido.",
      },
      {
        q: "¿Se conecta con mi Instagram?",
        a: "Podemos enlazar tu Instagram y mostrar una selección de tus mejores trabajos. La Página Express no incluye un feed en vivo, pero se puede cotizar aparte.",
      },
      {
        q: "¿Tengo que tener local para salir en Google Maps?",
        a: "Con local es lo ideal. Si trabajas a domicilio o desde casa, puedes configurar tu perfil como negocio de área de servicio sin mostrar tu dirección.",
      },
    ],
  },
];

export const getGiro = (slug: string) => giros.find((g) => g.slug === slug);
