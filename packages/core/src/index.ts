/**
 * @fluva/core — lógica comercial reutilizable para restaurantes FLUVA.
 * No contiene datos de ningún cliente: esos viven en /clients/<cliente>.
 */

export type ItemStatus = 'available' | 'sold_out' | 'hidden';

export interface Photo {
  src: string;
  alt: string;
  /** true = fotografía real del local; false = ilustración o referencia */
  real: boolean;
  /** Dimensiones de la versión más grande disponible (evita saltos de diseño). */
  width: number;
  height: number;
}

export interface MenuItem {
  id: string;
  name: string;
  /** null = descripción pendiente de confirmar */
  description: string | null;
  /** Precio en pesos chilenos. null = pendiente de confirmar (nunca se inventa). */
  priceCLP: number | null;
  status: ItemStatus;
  featured?: boolean;
  /** null = alérgenos no informados todavía */
  allergens: string[] | null;
  sides?: string;
  photo?: Photo;
}

export interface MenuCategory {
  id: string;
  name: string;
  /** Aclaración visible bajo el título (por ejemplo, días de venta). */
  note?: string;
  items: MenuItem[];
}

/** Días en inglés según schema.org (Monday … Sunday). */
export type SchemaDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface OpeningHoursSpec {
  days: SchemaDay[];
  /** HH:MM */
  opens: string;
  /** HH:MM */
  closes: string;
}

export interface Address {
  street: string;
  locality: string;
  city: string;
  region: string;
  country: string;
}

export interface BusinessInfo {
  name: string;
  legalTagline: string;
  description: string;
  cuisine: string[];
  address: Address;
  /** null mientras no se confirme el número oficial */
  phone: string | null;
  /** true si el número también atiende WhatsApp */
  whatsapp: boolean;
  /** Persona de contacto para reservas y eventos (opcional) */
  contactPerson: string | null;
  email: string | null;
  instagram: { handle: string; url: string } | null;
  facebookUrl: string | null;
  /** Enlace verificado a la ficha de Google para dejar reseñas. null = sin verificar. */
  googleReviewUrl: string | null;
  /** Horario en texto. null = por confirmar. */
  openingHoursText: string | null;
  /** Días de atención en texto. null = por confirmar. */
  openingDaysText: string | null;
  /** Horario estructurado para Google. null = no se publica. */
  openingHoursSpec: OpeningHoursSpec[] | null;
  /** Aviso adicional sobre atención fuera del horario principal. */
  openingNote: string | null;
  mapsQuery: string;
}

const clp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

export const PRICE_PENDING = 'Precio por confirmar';

export function formatPrice(priceCLP: number | null): string {
  if (priceCLP === null || !Number.isFinite(priceCLP) || priceCLP < 0) return PRICE_PENDING;
  return clp.format(priceCLP);
}

/** Productos que el público puede ver (los ocultos no se muestran; los agotados sí, marcados). */
export function visibleItems(items: MenuItem[]): MenuItem[] {
  return items.filter((i) => i.status !== 'hidden');
}

export function featuredItems(menu: MenuCategory[]): MenuItem[] {
  return menu.flatMap((c) => visibleItems(c.items)).filter((i) => i.featured);
}

/** Normaliza un teléfono chileno a formato E.164 (+569XXXXXXXX). Devuelve null si no es válido. */
export function toE164Chile(phone: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  if (/^569\d{8}$/.test(digits)) return `+${digits}`;
  if (/^9\d{8}$/.test(digits)) return `+56${digits}`;
  if (/^56\d{9}$/.test(digits)) return `+${digits}`;
  return null;
}

export function telHref(phone: string | null): string | null {
  const e = toE164Chile(phone);
  return e ? `tel:${e}` : null;
}

export function whatsappHref(phone: string | null, message?: string): string | null {
  const e = toE164Chile(phone);
  if (!e) return null;
  const q = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${e.slice(1)}${q}`;
}

export function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

/**
 * Datos estructurados schema.org/Restaurant.
 * Solo incluye campos confirmados: teléfono y horario se omiten si son null.
 */
export function restaurantJsonLd(b: BusinessInfo, siteUrl: string | null, imageUrls: string[] = []) {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: b.name,
    description: b.description,
    servesCuisine: b.cuisine,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.address.street,
      addressLocality: b.address.city,
      addressRegion: b.address.region,
      addressCountry: b.address.country,
    },
    acceptsReservations: true,
  };
  if (siteUrl) ld.url = siteUrl;
  if (siteUrl) ld.menu = `${siteUrl}/carta`;
  if (imageUrls.length) ld.image = imageUrls;
  const tel = toE164Chile(b.phone);
  if (tel) ld.telephone = tel;
  if (b.email) ld.email = b.email;
  if (b.openingHoursSpec?.length) {
    ld.openingHoursSpecification = b.openingHoursSpec.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.days.map((d) => `https://schema.org/${d}`),
      opens: s.opens,
      closes: s.closes,
    }));
  }
  const same = [b.instagram?.url, b.facebookUrl].filter(Boolean);
  if (same.length) ld.sameAs = same;
  return ld;
}
