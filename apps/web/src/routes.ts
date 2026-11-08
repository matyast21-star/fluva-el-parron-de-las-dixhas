/** Rutas públicas con sus metadatos SEO. Se usan en el cliente, en el prerender y en el sitemap. */
export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  nav?: string;
}

const brand = 'El Parrón de las Dichas';

export const routes: RouteMeta[] = [
  {
    path: '/',
    nav: 'Inicio',
    title: `${brand} | Restaurante de comida chilena en Casablanca`,
    description:
      'Restaurante familiar de cocina tradicional chilena en Las Dichas, Casablanca. Terraza entre parras, salón para eventos y almuerzos caseros.',
  },
  { path: '/carta', nav: 'Carta', title: `Carta | ${brand}`, description: 'Carta de cocina chilena: cazuela, arrollado, carne a la cacerola, costillar, lomo a lo pobre, pollo asado y más.' },
  { path: '/historia', nav: 'Historia', title: `Historia | ${brand}`, description: 'Cerca de setenta años de tradición familiar en el sector Las Dichas, Casablanca.' },
  { path: '/instalaciones', nav: 'Instalaciones', title: `Instalaciones | ${brand}`, description: 'Terraza techada entre flores, terraza jardín, salón interior con escenario y rincones campestres.' },
  { path: '/eventos', nav: 'Eventos', title: `Eventos y celebraciones | ${brand}`, description: 'Cumpleaños, aniversarios, almuerzos de empresa, paseos de adultos mayores y eventos musicales en Casablanca.' },
  { path: '/contacto', nav: 'Contacto', title: `Contacto y ubicación | ${brand}`, description: 'Ruta F-840, sector Las Dichas, Casablanca. Teléfono, WhatsApp, correo e Instagram.' },
  { path: '/reservas', title: `Reservas | ${brand}`, description: 'Reserve su mesa en El Parrón de las Dichas por WhatsApp o teléfono.' },
];

export const notFoundMeta: RouteMeta = { path: '/404', title: `Página no encontrada | ${brand}`, description: 'La página que busca no existe.' };

export function metaFor(pathname: string): RouteMeta {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return routes.find((r) => r.path === clean) ?? notFoundMeta;
}
