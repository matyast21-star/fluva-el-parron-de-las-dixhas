# El Parrón de las Dichas — Plataforma digital

Sitio web y sistema de gestión para **El Parrón de las Dichas**, restaurante de comida típica chilena y centro de eventos en Ruta F-840, sector Las Dichas, Casablanca.

Desarrollado por **FLUVA**, *tecnología que fluye contigo*.

## Estado por fases

| Fase | Contenido | Estado |
| --- | --- | --- |
| 1 | Diseño, prototipos, arquitectura y modelo de datos | Aprobada (2026-11-07) |
| 2 | Sitio público: Inicio, Carta, Historia, Instalaciones, Eventos, Contacto, Reservas, SEO | **Construida en este repositorio** |
| 3 | Reservas visuales tipo cine con Supabase | Pendiente |
| 4 | FLUVA POS | Pendiente |
| 5 | Eventos: cotizador, calendario, abonos | Pendiente |
| 6 | Reseñas, promociones y marketing | Pendiente |
| 7 | Pruebas finales y producción | Pendiente |

### Qué funciona hoy (Fase 2)

- Sitio público responsive de 7 páginas, prerenderizado a HTML estático (bueno para Google y para carga rápida en celulares).
- Carta con las categorías y productos de referencia. **Sin precios inventados:** muestran "Precio por confirmar".
- Botones de llamada y WhatsApp al número oficial (+56 9 9750 6058, atiende Victoria Neira).
- Solicitud de cotización de eventos: valida los datos y abre WhatsApp con el mensaje listo. No guarda datos personales en el sitio.
- Reservas: por ahora por WhatsApp o teléfono. El plano interactivo llega en la Fase 3.
- SEO: título y descripción por página, Open Graph, datos estructurados `Restaurant`, `robots.txt` y `sitemap.xml` (este último requiere `VITE_SITE_URL`).

### Datos pendientes del restaurante

Aparecen en el sitio como "por confirmar"; se editan en `clients/el-parron/src/index.ts`:

- Horario de atención (`openingHoursText`)
- Precios, descripciones, alérgenos y fotos de cada plato (`menu`)
- Enlace verificado a la ficha de Google para reseñas (`googleReviewUrl`)
- Historia completa de la familia (`history`)
- Dominio definitivo del sitio (`VITE_SITE_URL`)

## Estructura

```
apps/web/               Sitio público (React 19, TypeScript, Vite, Tailwind CSS 4, React Router 7)
  src/pages/            Una página por ruta
  src/components/       Encabezado, pie, bloques de contacto, tarjeta de plato
  src/routes.ts         Rutas y metadatos SEO (también usados por el prerender)
  scripts/prerender.mjs Genera HTML estático, robots.txt y sitemap.xml
  public/img/           Fotos reales optimizadas (WebP + JPG)
  public/brand/         Logos y elementos gráficos de la marca
packages/core/          Lógica reutilizable FLUVA (precios, teléfonos, datos estructurados)
packages/ui/            Componentes reutilizables FLUVA (usan tokens semánticos de color)
clients/el-parron/      Todo lo propio del cliente: datos del negocio, carta, textos, tema visual
docs/                   Documentación técnica
```

Para otro restaurante se crea `clients/<nuevo>` con su tema y datos; `packages/*` no cambia.

## Requisitos

- Node.js 20 o superior y npm 10.

## Comandos

```bash
npm install          # instalar dependencias (desde la raíz)
npm run dev          # servidor de desarrollo en http://localhost:5173
npm test             # pruebas (Vitest + Testing Library)
npm run typecheck    # revisión de tipos TypeScript
npm run build        # compila y prerenderiza en apps/web/dist
```

Para compilar con la URL definitiva (canonical y sitemap):

```bash
VITE_SITE_URL=https://www.su-dominio.cl npm run build
```

## Despliegue en Cloudflare Pages

1. Conectar este repositorio en Cloudflare → Workers & Pages → Create → Pages.
2. Build command: `npm run build`
3. Build output directory: `apps/web/dist`
4. Variables de entorno: `VITE_SITE_URL` con el dominio definitivo, `NODE_VERSION=22`.

`public/_headers` agrega cabeceras de seguridad y caché. Las rutas inexistentes muestran `404.html`.

El despliegue a producción se hace solo con autorización expresa del cliente.

## Seguridad

- No hay claves en el código. `.env` está ignorado por git; ver `.env.example`.
- La clave `service_role` de Supabase nunca irá al navegador (Fase 3 en adelante: solo en Edge Functions).
- El sitio no almacena datos de tarjetas ni datos personales en esta fase.
