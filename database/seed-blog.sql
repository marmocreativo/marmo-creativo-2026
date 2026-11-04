-- Borradores del blog (generado por scripts/blog-a-sql.mjs desde docs/blog/*.md). No editar a mano.
-- Quedan sin publicar: revísalos y publícalos desde /admin/articulos.
-- Requiere la tabla articulos (database/migracion-blog.sql).

USE marmo_creativo;
SET NAMES utf8mb4;

INSERT INTO articulos (titulo, slug, resumen, categoria, contenido, publicado) VALUES
('¿Cuánto cuesta una página web en México en 2026?', 'cuanto-cuesta-una-pagina-web-en-mexico', 'Precios reales de páginas web en México: landing, sitio corporativo, WordPress, tienda en línea y a la medida. Qué incluye cada una y qué cobros extra revisar.', 'paginas-web', 'Si buscas "cuánto cuesta una página web", seguramente ya viste cotizaciones de $1,500 pesos y otras de $150,000. Las dos pueden ser honestas: lo que cambia es **qué estás comprando**. Esta guía te explica los rangos reales en México, qué incluye cada uno y en qué fijarte para no pagar de más ni quedarte con un sitio que no te sirve.

## Respuesta corta: los rangos de precio

Estos son los precios que manejamos en Marmo Creativo, que sirven como referencia de mercado para un trabajo hecho por una persona o estudio pequeño (no una agencia grande):

| Tipo de sitio | Precio de referencia | Para quién es |
|---|---|---|
| Página de una sola sección (Express) | Desde $3,500 MXN | Negocios locales que necesitan aparecer en Google ya |
| Landing page a la medida | Desde $5,000 MXN | Promocionar un servicio o campaña |
| Sitio corporativo | Desde $7,000 MXN | Empresas con varios servicios o secciones |
| Sitio en WordPress | Desde $8,000 MXN | Quien quiere editar su propio contenido |
| Tienda en línea (WooCommerce) | Desde $20,000 MXN | Vender productos con pagos y envíos |
| Sistema o CMS a la medida | Se cotiza según alcance | Procesos que ninguna plantilla resuelve |

Los precios de otras empresas varían, pero si ves algo muy por debajo de estos rangos, pregunta qué se está dejando fuera; si ves algo muy por encima, pregunta qué justifica la diferencia.

## Qué hace que una página cueste más o menos

El precio depende de cinco cosas:

1. **Cantidad de secciones o páginas.** Una página con inicio, servicios y contacto toma mucho menos tiempo que un sitio de diez páginas.
2. **Diseño a la medida o plantilla.** Adaptar una plantilla a tu marca es más rápido (y barato) que diseñar todo desde cero. Para muchos negocios locales, la plantilla bien adaptada funciona perfecto.
3. **Funciones especiales.** Tienda en línea, reservas, áreas de clientes, multiidioma o integraciones con otros sistemas suben el costo porque requieren programación.
4. **Quién te da los textos y las fotos.** Si ya los tienes, el proyecto avanza rápido. Si hay que redactarlos o producirlos, es otro trabajo.
5. **Tiempo de entrega.** Entregar en días en lugar de semanas exige un proceso ya armado; por eso los paquetes de entrega rápida se basan en plantillas por giro.

## Cobros que se olvidan: hosting y dominio

Aquí es donde más sorpresas hay. Una página web necesita **dominio** (tunegocio.com) y **hosting** (el espacio donde vive el sitio), y se pagan cada año.

- Nuestra referencia: **$1,500 MXN al año** por hosting más dominio .com, o **$2,000 MXN** si lo quieres .com.mx o .mx.
- Algunos paquetes lo incluyen el primer año; otros no. **Pregúntalo siempre antes de aceptar la cotización.**
- El dominio debe estar **a tu nombre**. Si queda a nombre de quien hizo la página y se pelean, puedes perder tu dirección web.

## Mensualidades: cuándo sí y cuándo no

Hay dos modelos y ninguno es malo por sí mismo:

- **Pago único:** pagas el desarrollo una vez y solo renuevas hosting y dominio al año. Es lo más común para páginas informativas.
- **Renta mensual:** pagas una cuota mensual y el sitio "es de la agencia" mientras la pagues. Si dejas de pagar, desaparece. Conviene solo si entiendes que estás rentando.

Aparte existe el **mantenimiento** (actualizaciones, copias de seguridad, seguridad), que es recomendable sobre todo en WordPress y tiendas en línea. Cuesta desde $800 MXN al mes, según el tamaño del sitio.

## Señales de que una cotización es mala

- No dice qué incluye ni qué **no** incluye.
- No especifica cuántas rondas de cambios tienes.
- No menciona que la página se verá bien en celular (hoy la mayoría de tus visitas llegan desde ahí).
- Te piden el 100% por adelantado sin ningún contrato ni comprobante.
- No te dan acceso a tu propio dominio ni a tus archivos.

## ¿Cuál necesito yo?

- **Negocio local** (consultorio, taller, estética, despacho) que quiere aparecer en Google y recibir WhatsApps: con una **página express** suele bastar.
- **Quieres promocionar algo específico** (un curso, un servicio, una campaña): una **landing page**.
- **Empresa con varios servicios** y que necesita transmitir confianza: un **sitio corporativo**.
- **Vas a publicar contenido seguido** y quieres editarlo tú: **WordPress**.
- **Vas a vender en línea**: una **tienda con WooCommerce**.
- **Tu operación es muy particular** (cotizadores, sistemas internos, portales de clientes): un **desarrollo a la medida**.

Si dudas entre dos, probablemente puedes empezar con el más sencillo y crecer después. Es más barato crecer un sitio bueno que rehacer uno mal planeado.

## Preguntas frecuentes

### ¿Puedo pagar en parcialidades?
Depende de la empresa. En proyectos grandes como tiendas en línea es común dividir el pago en etapas; en paquetes de precio fijo suele ser un pago único.

### ¿Cuánto tarda en estar lista?
Una página express puede estar en 72 horas hábiles si ya tienes tu información lista. Un sitio corporativo toma de 3 a 4 semanas y los proyectos a medida de 4 a 6 semanas o más.

### ¿Necesito pagar algo cada mes?
No necesariamente. Con pago único solo renuevas dominio y hosting una vez al año. El mantenimiento mensual es opcional (aunque conveniente en WordPress y tiendas).

### ¿El precio incluye que salga en Google?
Una página bien hecha y optimizada se puede indexar, pero **posicionarse bien toma tiempo y trabajo continuo**; nadie serio te promete el primer lugar por un precio fijo. Lo que sí puede incluirse es la configuración básica y tu perfil de Google Maps.

## Siguiente paso

Revisa los [paquetes y precios](/precios) para ver qué incluye cada uno, o [cuéntanos de tu negocio](/empezar) y te decimos cuál te conviene, sin compromiso.', 0),
('CMS a la medida vs WordPress: cuál te conviene', 'cms-a-la-medida-vs-wordpress', 'CMS a la medida vs WordPress: diferencias en costo, velocidad, seguridad y mantenimiento, y cómo decidir cuál conviene según tu negocio.', 'paginas-web', 'Casi todos los sitios que ves en internet usan un **CMS** (sistema de gestión de contenido): la herramienta que te permite cambiar textos, fotos y productos sin tocar código. La pregunta es cuál: **WordPress**, que es el más popular, o un **CMS desarrollado a la medida** para tu negocio.

No hay una respuesta universal. Esta guía te ayuda a decidir con criterios claros.

## Qué es WordPress

WordPress es un CMS de código abierto con miles de plantillas ("temas") y extensiones ("plugins"). Su gran ventaja es que ya existe casi todo: blog, tienda (WooCommerce), formularios, reservas, SEO. Por eso es la opción más rápida y económica para la mayoría de los sitios.

**Se adapta bien a:** sitios informativos, blogs, tiendas pequeñas y medianas, y negocios que necesitan editar contenido seguido.

## Qué es un CMS a la medida

Es un sistema construido **desde cero para las reglas de tu negocio**: solo trae lo que necesitas, con un panel de administración hecho a tu forma de trabajar. No hay plugins de terceros que se desactualicen ni funciones que nunca usarás.

**Se adapta bien a:** procesos particulares (cotizadores, catálogos con reglas complejas, portales para clientes o distribuidores), integraciones con otros sistemas, o cuando el rendimiento y el control importan mucho.

## Comparativa directa

| Criterio | WordPress | CMS a la medida |
|---|---|---|
| Costo inicial | Menor | Mayor |
| Tiempo de desarrollo | Rápido | Más lento (se diseña desde cero) |
| Flexibilidad | Alta, pero limitada por los plugins | Total: hace exactamente lo que necesitas |
| Velocidad | Depende de cuántos plugins uses | Normalmente más ligero |
| Seguridad | Requiere actualizar siempre; es un objetivo frecuente de ataques | Menos expuesto, al no ser una plataforma masiva |
| Mantenimiento | Actualizaciones constantes de núcleo, tema y plugins | Menos piezas externas; mantenimiento enfocado en tu código |
| Dependencia | Cualquier desarrollador de WordPress puede tomarlo | Depende de quien lo programó (pide acceso al código) |
| Panel de administración | Genérico y completo | Simple y hecho a tu medida |

## Cuándo elegir WordPress

- Tu presupuesto es limitado y necesitas salir pronto.
- Lo que quieres existe como plantilla o plugin probado.
- Vas a publicar contenido con frecuencia (blog, noticias).
- Quieres poder contratar a cualquier otro desarrollador en el futuro sin atarte a uno.

## Cuándo conviene un CMS a la medida

- Tu proceso de negocio no encaja en ninguna plantilla (por ejemplo, un cotizador con reglas propias).
- Los plugins que necesitas se acumulan y el sitio se vuelve lento o frágil.
- Te preocupa la seguridad de los datos de clientes.
- Necesitas conectar tu sitio con otros sistemas (inventarios, facturación, CRM).
- Quieres un panel donde tu equipo capture solo lo necesario, sin aprender un sistema complicado.

## Un criterio práctico

Hazte tres preguntas:

1. **¿Mi necesidad existe ya como plugin o plantilla?** Si sí, usa WordPress.
2. **¿Cuántas piezas externas necesitaría para lograrlo?** Si son más de cinco o seis, empieza a pensar en una solución a la medida.
3. **¿Qué pasa si esta función falla un día?** Si afecta directamente tus ventas u operación, el control total vale la pena.

## Errores comunes al decidir

- **Elegir a la medida "porque suena más profesional".** Si una plantilla resuelve tu caso, es la opción más sensata.
- **Elegir WordPress y llenarlo de plugins para todo.** Cada plugin añade riesgo y peso.
- **No pedir el código ni los accesos.** Con cualquier opción, el sitio y sus archivos deben ser tuyos.
- **No presupuestar mantenimiento.** Todo sitio necesita cuidado, solo cambia el tipo.

## Preguntas frecuentes

### ¿Un CMS a la medida es más caro?
Al inicio, sí. A cambio, evitas licencias, plugins de pago y parches constantes. En proyectos con funciones muy particulares, suele salir más barato que forzar WordPress a hacer algo para lo que no fue pensado.

### ¿Puedo empezar con WordPress y migrar después?
Sí, y es una estrategia válida: validas tu idea con algo rápido y, si el negocio crece y la herramienta queda chica, migras a una solución a la medida con los contenidos que ya tienes.

### ¿Cuánto cuesta cada opción?
Un sitio en WordPress parte desde $8,000 MXN en nuestros servicios. Un CMS a la medida se cotiza según el alcance, porque depende de las funciones que necesites.

## Siguiente paso

Conoce cómo trabajamos [sitios en WordPress](/paginas-web/wordpress) y [CMS a la medida](/paginas-web/cms-custom). Si no sabes cuál necesitas, [platícanos tu caso](/empezar) y te recomendamos con honestidad, aunque eso signifique que la opción más barata es la correcta.', 0),
('Cómo elegir quién haga tu página web en Guadalajara', 'como-elegir-quien-haga-tu-pagina-web-en-guadalajara', 'Qué preguntar antes de contratar tu página web en Guadalajara: señales de alerta, qué debe incluir la cotización y cómo comparar agencias y freelancers.', 'seo-local', 'Guadalajara tiene uno de los ecosistemas de tecnología y emprendimiento más fuertes de México, y eso se nota en la oferta: hay agencias grandes, estudios pequeños, freelancers y hasta "primos que saben de computadoras". Elegir mal cuesta tiempo y dinero. Esta guía te da criterios concretos para decidir.

## 1. Define primero qué necesitas

Antes de pedir cotizaciones, ten claro en una hoja:

- **Objetivo:** ¿quieres que te llamen, que te escriban por WhatsApp, que te compren en línea o solo tener presencia?
- **Contenido:** ¿ya tienes logo, textos y fotos?
- **Funciones:** ¿necesitas tienda, reservas, formulario, blog?
- **Fecha:** ¿tienes un evento o lanzamiento que marque la prisa?

Con esto, las cotizaciones se pueden comparar. Sin esto, cada propuesta describe algo distinto.

## 2. Tipos de proveedor y cuándo conviene cada uno

| Proveedor | Ventajas | A tener en cuenta |
|---|---|---|
| Agencia grande | Equipo completo, procesos formales | Precios altos; el proyecto pequeño puede pasar a segundo plano |
| Estudio pequeño | Trato directo, precios accesibles, flexibilidad | Verifica que respalden el trabajo después de entregar |
| Freelancer | El más económico, comunicación directa | Si desaparece, dependes de su disponibilidad |
| Constructores (Wix, etc.) | Bajo costo inicial | Menos control y personalización; el sitio vive en su plataforma |

Para la mayoría de los negocios locales, un **estudio pequeño con precios claros** da el mejor equilibrio entre costo, trato y resultado.

## 3. Qué revisar en su portafolio

- **Que los proyectos sean reales y puedas abrirlos.** Entra a los sitios, navega desde tu celular y fíjate si cargan rápido.
- **Que haya variedad de giros**, o al menos algo parecido a lo tuyo.
- **Que los sitios se vean bien en celular.** Hoy la mayor parte del tráfico viene de ahí.
- Mira nuestro [portafolio](/portafolio) como ejemplo de lo que deberías poder ver de cualquier proveedor.

## 4. Preguntas que debes hacer antes de contratar

1. ¿Qué incluye exactamente el precio y qué **no**?
2. ¿El **dominio y el hosting** quedan a mi nombre?
3. ¿Cuánto cuesta renovarlos el segundo año?
4. ¿Cuántas **rondas de cambios** incluye?
5. ¿En cuánto tiempo la entregan, y desde cuándo cuenta ese plazo?
6. ¿Me entregan los accesos y los archivos al terminar?
7. ¿Qué pasa si tengo un problema después de la entrega?
8. ¿La página estará optimizada para Google (velocidad, títulos, celular)?

Un buen proveedor responde todo esto sin rodeos y por escrito.

## 5. Señales de alerta

- **Precio muy bajo sin explicación** (por ejemplo, "página completa por $999").
- **Garantizan el primer lugar en Google.** Nadie puede garantizarlo; Google decide, no la agencia.
- **Piden pago total por adelantado** sin contrato ni comprobante.
- **No te dan acceso a tu dominio**, o lo registran a su nombre.
- **No tienen ejemplos que puedas visitar.**
- **Te mandan una plantilla genérica** sin adaptarla a tu marca.

## 6. Lo que sí influye para que tu negocio aparezca en Google Maps y búsquedas locales

Un buen proveedor debería, como mínimo, ayudarte con:

- Tu **perfil de Google Maps** (nombre, dirección, horario, fotos, categoría).
- Que tu página mencione tu **ciudad y zonas** donde trabajas (por ejemplo, Zapopan, Tlaquepaque, Providencia o Centro).
- **Velocidad de carga** y diseño responsivo.
- Un **botón de WhatsApp** y datos de contacto claros.

Si quieres ver cómo planteamos esto, revisa nuestra página de [diseño de páginas web en Guadalajara](/pagina-web/guadalajara).

## 7. ¿Importa que sean "de Guadalajara"?

Tener cerca a tu proveedor ayuda a reunirte y a conocer tu mercado, pero hoy casi todo el trabajo se coordina por videollamada y WhatsApp. Lo importante es que **conozcan cómo busca tu cliente local** y que **respondan rápido**, no el código postal.

## Preguntas frecuentes

### ¿Cuánto debería pagar por una página web en Guadalajara?
Depende de lo que necesites. Como referencia, una página express para un negocio local parte desde $3,500 MXN y un sitio corporativo desde $7,000 MXN. Mira la guía completa de [cuánto cuesta una página web en México](/blog/cuanto-cuesta-una-pagina-web-en-mexico).

### ¿Es mejor un freelancer o un estudio?
Si el proyecto es sencillo, ambos funcionan. Un estudio ofrece más continuidad; un freelancer, a veces, menor costo. Lo decisivo es que haya contrato, accesos a tu nombre y respaldo posterior.

### ¿Qué necesito para empezar?
Tu logo, los textos de tus servicios, algunas fotos y tus datos de contacto. Si algo te falta, un buen proveedor te dice cómo conseguirlo.

## Siguiente paso

Si estás comparando opciones, [cuéntanos tu proyecto](/empezar) y te enviamos una propuesta clara, con precio fijo y todo por escrito, para que la compares con cualquier otra.', 0),
('Tu página web en 72 horas: qué necesitas para tenerla lista', 'pagina-web-en-72-horas-que-necesitas', 'Cómo tener una página web profesional en 72 horas hábiles: qué incluye una página express y qué información (logo, textos, fotos) debes preparar.', 'paginas-web', '"Página web en 72 horas" suena a exageración, pero con el proceso correcto es perfectamente realista. La clave no es trabajar a las prisas: es **llegar con la información lista** y partir de una base bien diseñada. Aquí te explicamos cómo funciona y qué debes preparar.

## ¿Cómo es posible entregar tan rápido?

Hay dos razones:

1. **Plantillas por giro.** En lugar de diseñar desde cero, se adapta una estructura ya probada para tu tipo de negocio (abogados, estéticas, consultorios, talleres, etc.) con tu logo, colores, textos y fotos.
2. **Proceso ordenado.** Todo parte de un formulario de información (brief). Cuando llega completo, no hay idas y vueltas que retrasen el proyecto.

Lo que sí **no** es posible en tres días: sistemas complejos, tiendas en línea o diseños completamente originales. Para eso hay otros paquetes con plazos más largos.

## Qué incluye una página express

Una página express típica incluye:

- Una página profesional de una sola sección, **adaptada a celular**.
- Botón de **WhatsApp** y formulario de contacto.
- Alta u **optimización de tu perfil de Google Maps**.
- Hosting y dominio .com el **primer año**.
- Certificado de seguridad (el candadito de "https").
- Una ronda de cambios.

Si necesitas más secciones, galería o un blog básico, existen paquetes más amplios con entrega en unos 5 días. Revisa los detalles en la página de [precios](/precios).

## Cuándo empiezan a contar las 72 horas

Aquí está el detalle que importa: el tiempo corre desde que se tienen **el pago y tu información completa**, y se cuentan **horas hábiles** (días laborales). Si falta algo, un buen proveedor te avisa de inmediato para no perder tiempo.

Por eso, lo mejor que puedes hacer es preparar tu material antes de empezar.

## Checklist: lo que debes tener listo

### Marca
- [ ] **Logo** en buena calidad (idealmente en PNG con fondo transparente o en vectorial).
- [ ] **Colores** de tu marca, si los tienes.

### Textos
- [ ] **Qué haces** en dos o tres frases claras.
- [ ] **Lista de servicios o productos**, con una línea de explicación cada uno.
- [ ] **Por qué elegirte** (años de experiencia, garantía, atención, certificaciones).
- [ ] **Preguntas frecuentes** que te hacen tus clientes.

### Fotos
- [ ] Fotos de tu **local, equipo o trabajos** (con celular y buena luz sirven).
- [ ] Si no tienes, avisa: se pueden proponer imágenes de apoyo.

### Datos de contacto
- [ ] Dirección y **horario**.
- [ ] **WhatsApp** y teléfono.
- [ ] Correo.
- [ ] Redes sociales, si las usas.

### Accesos
- [ ] Si ya tienes **dominio**, a dónde está registrado.
- [ ] Si ya tienes **perfil de Google Maps**, el correo con el que lo administras.

## Qué hacer durante las 72 horas

- **Responde rápido** si te hacen una pregunta; es lo que más acelera.
- **Junta todos tus comentarios en una sola revisión**, en lugar de mandarlos por partes.
- Revisa la página **desde tu celular y desde una computadora**.

## Qué pasa después de la entrega

- Revisas y pides tus **cambios** (según la ronda incluida).
- Aprobada la página, se publica en tu dominio.
- A partir del **segundo año** renuevas hosting y dominio (como referencia, $1,500 MXN al año con .com).
- Si más adelante necesitas crecer, el sitio puede ampliarse con más secciones o servicios.

## Errores comunes que retrasan un proyecto

1. **Mandar el logo como captura de pantalla.** Pide el archivo original.
2. **Textos copiados de otros sitios.** Además de ser un problema legal, Google penaliza el contenido duplicado.
3. **No tener claro qué quieres que haga el visitante** (llamar, escribir, reservar).
4. **Cambiar de opinión a mitad del camino** sobre el giro o los servicios.

## Preguntas frecuentes

### ¿72 horas son corridas o hábiles?
Hábiles, es decir, días laborales. Empiezan al recibir pago e información completa.

### ¿Y si no tengo fotos ni textos?
Podemos ayudarte a ordenar y pulir lo que tengas; la redacción desde cero y las sesiones de foto no están incluidas en el paquete express y se cotizan aparte.

### ¿Qué pasa si no queda lista a tiempo?
En nuestra oferta express, si no está lista en las 72 horas hábiles acordadas, no se paga.

### ¿La página se verá igual que la de mi competencia?
Parte de una plantilla de tu giro, pero se adapta con tu logo, colores, textos y fotos. Si necesitas algo totalmente único, existen opciones de diseño a la medida.

## Siguiente paso

Si quieres tu página lista en 72 horas, empieza llenando el [formulario de inicio](/empezar) o revisa el [paquete Express](/precios).', 0),
('Google Maps para tu negocio: cómo aparecer en búsquedas locales', 'google-maps-para-negocios-locales', 'Cómo crear y optimizar tu perfil de Google Maps: datos, categorías, fotos y reseñas, y cómo conectarlo con tu página web para recibir clientes locales.', 'seo-local', 'Cuando alguien busca "dentista cerca de mí" o "taller mecánico en Puebla", lo primero que ve no son páginas web: es un **mapa con tres negocios destacados**. Si tu negocio no está ahí, pierdes clientes que ya estaban listos para comprar. La buena noticia es que aparecer es gratis; lo que cuesta es hacerlo bien.

## Qué es el perfil de negocio de Google

Es la ficha gratuita que aparece en Google Maps y en el buscador con tu nombre, dirección, horario, teléfono, fotos y reseñas. Antes se llamaba "Google My Business"; hoy se administra como **Perfil de Negocio de Google**.

## Paso 1: crear o reclamar tu perfil

1. Busca el nombre de tu negocio en Google Maps. Si ya existe, **reclámalo**; si no, **créalo**.
2. Inicia sesión con una cuenta de Google que sea **tuya** (no la de tu proveedor ni la de un empleado que podría irse).
3. Verifica el negocio; Google te lo pedirá por alguno de sus métodos (por ejemplo, un código o una videollamada, según el caso).

## Paso 2: llena toda la información

Mientras más completa, mejor. Revisa:

- **Nombre:** el real de tu negocio. No agregues palabras clave extra; Google puede suspender perfiles que lo hagan.
- **Categoría principal:** es lo que más influye. Elige la más específica (por ejemplo, "Abogado laboralista" mejor que "Abogado").
- **Categorías secundarias:** las que de verdad apliquen.
- **Dirección y área de servicio:** si visitas a clientes, indica las zonas donde trabajas.
- **Horario:** incluyendo días festivos.
- **Teléfono, WhatsApp y sitio web.**
- **Descripción:** explica qué haces y para quién, sin exageraciones.
- **Servicios o productos:** con descripción y, si puedes, precios.

## Paso 3: fotos que sí venden

- Fachada y entrada (para que te encuentren).
- Interior y equipo de trabajo.
- Trabajos terminados o productos.
- Un logo y una portada.

Usa fotos reales, con buena luz. Súbelas con frecuencia: un perfil con actividad transmite que el negocio está vivo.

## Paso 4: reseñas

Las reseñas pesan mucho en el resultado, y también en la decisión del cliente.

- **Pídelas** después de un buen servicio, con un enlace directo a tu perfil.
- **Responde todas**, las buenas y las malas, con calma y profesionalismo.
- **Nunca pagues ni inventes reseñas**: va contra las reglas de Google y puede costarte el perfil.

## Paso 5: conecta tu perfil con tu página web

Aquí es donde mucha gente se queda a medias. Tu página y tu perfil se refuerzan entre sí:

- En tu página, pon **el mismo nombre, dirección y teléfono** que en tu perfil (escritos igual).
- Menciona tu **ciudad y zonas** en los textos (por ejemplo, "diseño web en Monterrey").
- Agrega un **mapa** y un botón de **WhatsApp**.
- Asegúrate de que cargue **rápido en celular**.

Tenemos páginas pensadas para esto, como [páginas web en Monterrey](/pagina-web/monterrey), [en Puebla](/pagina-web/puebla) y [en Guadalajara](/pagina-web/guadalajara).

## Errores que te pueden costar el perfil

- Usar una **dirección falsa** o un local que no es tuyo.
- Poner **palabras clave en el nombre** del negocio.
- Duplicar perfiles del mismo negocio.
- Tener datos distintos en la página, el perfil y las redes sociales.

## ¿Cuánto tarda en dar resultados?

No hay una cifra única. Un perfil completo y verificado puede empezar a mostrarse en pocos días, pero **ganar posiciones con constancia** (reseñas, fotos, buena página) toma semanas o meses. Desconfía de quien te prometa "primer lugar garantizado".

## Preguntas frecuentes

### ¿Es gratis?
Crear y administrar el perfil no cuesta. Lo que cobra un proveedor es el trabajo de configurarlo y optimizarlo.

### ¿Necesito página web si ya tengo perfil de Google?
Se recomienda. El perfil te hace visible; la página genera confianza, explica tus servicios con detalle y te da un sitio propio que no depende de una plataforma.

### ¿Y si mi negocio no tiene local?
Puedes crear un perfil de **negocio con área de servicio**, sin mostrar la dirección, y definir las zonas que atiendes.

### ¿Puede encargarse alguien por mí?
Sí. En nuestra página express incluimos el alta u optimización de tu perfil de Google Maps. Mira qué más incluye en [precios](/precios).

## Siguiente paso

Si quieres aparecer en Google Maps y tener una página que convierta esas visitas en clientes, [empieza aquí](/empezar).', 0)
ON DUPLICATE KEY UPDATE
  titulo = VALUES(titulo),
  resumen = VALUES(resumen),
  categoria = VALUES(categoria),
  contenido = VALUES(contenido);
