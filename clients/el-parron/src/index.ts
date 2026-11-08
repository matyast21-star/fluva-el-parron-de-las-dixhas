/**
 * Configuración y contenido propio de El Parrón de las Dichas.
 * Todo dato marcado como null o `pending: true` está pendiente de confirmación
 * por el restaurante y se muestra en el sitio como "por confirmar".
 */
import type { BusinessInfo, MenuCategory, Photo } from '@fluva/core';

export const business: BusinessInfo = {
  name: 'El Parrón de las Dichas',
  legalTagline: 'Restaurante de comida típica chilena y centro de eventos',
  description:
    'Restaurante familiar de cocina tradicional chilena con terraza entre flores y parras, salón para eventos y celebraciones en Las Dichas, Casablanca.',
  cuisine: ['Chilena', 'Cocina tradicional'],
  address: {
    street: 'Ruta F-840, sector Las Dichas',
    locality: 'Las Dichas',
    city: 'Casablanca',
    region: 'Región de Valparaíso',
    country: 'CL',
  },
  // Teléfono oficial confirmado por el cliente el 2026-11-07 (el de Instagram no es el oficial).
  phone: '+56 9 9750 6058',
  whatsapp: true,
  contactPerson: 'Victoria Neira',
  email: 'elparrondelasdichas@gmail.com',
  instagram: { handle: '@_elparrondelasdichas', url: 'https://www.instagram.com/_elparrondelasdichas/' },
  facebookUrl: null,
  googleReviewUrl: null,
  openingHoursText: null,
  mapsQuery: 'Ruta F-840 Las Dichas, Casablanca, Valparaíso, Chile',
};

const img = (name: string) => `/img/${name}`;

export const photos = {
  terrazaJardin: { src: img('terraza-jardin'), width: 960, height: 939, alt: 'Terraza con mesas de madera, manteles tejidos y flores colgantes', real: true },
  terrazaPasillo: { src: img('terraza-pasillo'), width: 939, height: 960, alt: 'Pasillo de la terraza techada con banderines chilenos', real: true },
  salonEvento: { src: img('salon-evento'), width: 1600, height: 901, alt: 'Salón interior con vigas de madera durante un evento con música en vivo', real: true },
  platoCocina: { src: img('plato-cocina'), width: 1080, height: 1440, alt: 'Fuente de greda con carnes al horno y papas, junto a ensalada surtida', real: true },
  ruedasCarreta: { src: img('ruedas-carreta'), width: 1600, height: 838, alt: 'Ruedas de carreta antiguas y fardo de paja', real: true },
} satisfies Record<string, Photo>;

export const history = {
  yearsApprox: 70,
  lead:
    'Desde hace cerca de setenta años, El Parrón de las Dichas recibe a quienes recorren el valle de Casablanca con la cocina de siempre: cazuelas, carnes a la cacerola y pollos asados, servidos con la calidez de una casa de campo.',
  /** El texto completo (fechas, nombres de la familia) lo entregará el restaurante. */
  pending: true,
};

export const facilities = [
  { id: 'terraza', name: 'Terraza bajo el parrón', text: 'Techada, rodeada de jardín y flores.', photo: photos.terrazaPasillo },
  { id: 'jardin', name: 'Terraza jardín', text: 'Mesas al aire libre entre vegetación.', photo: photos.terrazaJardin },
  { id: 'salon', name: 'Salón interior', text: 'Madera y ladrillo, con escenario para música en vivo.', photo: photos.salonEvento },
  { id: 'rincones', name: 'Rincones campestres', text: 'Detalles de campo para fotografiarse.', photo: photos.ruedasCarreta },
];

export const eventTypes = [
  'Cumpleaños',
  'Aniversarios',
  'Almuerzos empresariales',
  'Celebraciones familiares',
  'Eventos musicales',
  'Paseos de adultos mayores',
  'Almuerzos grupales',
  'Eventos privados',
];

/**
 * Carta inicial de referencia. Productos sujetos a confirmación.
 * Precios, descripciones y alérgenos en null: NO se inventan.
 */
const item = (id: string, name: string, extra: Partial<MenuCategory['items'][number]> = {}) => ({
  id,
  name,
  description: null,
  priceCLP: null,
  status: 'available' as const,
  allergens: null,
  ...extra,
});

export const menu: MenuCategory[] = [
  {
    id: 'cocina-chilena',
    name: 'Cocina chilena',
    items: [
      item('cazuela', 'Cazuela', { featured: true }),
      item('arrollado', 'Arrollado chileno'),
      item('carne-cacerola', 'Carne a la cacerola', { featured: true }),
      item('guatitas', 'Guatitas a la italiana'),
    ],
  },
  {
    id: 'carnes',
    name: 'Carnes',
    items: [
      item('costillar', 'Costillar', { featured: true }),
      item('chuletas', 'Chuletas'),
      item('lomo-pobre', 'Lomo a lo pobre'),
    ],
  },
  { id: 'aves', name: 'Aves', items: [item('pollo-asado', 'Pollo asado', { featured: true }), item('pollo-arvejado', 'Pollo arvejado')] },
  { id: 'pescados', name: 'Pescados', items: [item('pescado-frito', 'Pescado frito')] },
  { id: 'acompanamientos', name: 'Acompañamientos', items: [item('arroz', 'Arroz'), item('pure', 'Puré'), item('papas-mayo', 'Papas mayo')] },
  { id: 'once', name: 'Once', items: [item('empanadas', 'Empanadas'), item('sandwiches', 'Sándwiches'), item('queque', 'Queque')] },
];
