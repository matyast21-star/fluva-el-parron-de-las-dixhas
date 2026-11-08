import { formatPrice, PRICE_PENDING, toE164Chile, whatsappHref, telHref, restaurantJsonLd, visibleItems, type BusinessInfo, type MenuItem } from '@fluva/core';

describe('formatPrice', () => {
  it('muestra "por confirmar" cuando no hay precio (nunca inventa uno)', () => {
    expect(formatPrice(null)).toBe(PRICE_PENDING);
    expect(formatPrice(-1)).toBe(PRICE_PENDING);
  });
  it('formatea pesos chilenos sin decimales', () => {
    expect(formatPrice(12990)).toMatch(/\$\s?12\.990/);
  });
});

describe('teléfonos chilenos', () => {
  it('normaliza el número oficial a E.164', () => {
    expect(toE164Chile('+56 9 9750 6058')).toBe('+56997506058');
    expect(toE164Chile('9 9750 6058')).toBe('+56997506058');
  });
  it('rechaza números inválidos', () => {
    expect(toE164Chile('123')).toBeNull();
    expect(toE164Chile(null)).toBeNull();
    expect(telHref(null)).toBeNull();
  });
  it('arma el enlace de WhatsApp con mensaje', () => {
    expect(whatsappHref('+56 9 9750 6058', 'Hola')).toBe('https://wa.me/56997506058?text=Hola');
  });
});

describe('visibleItems', () => {
  const base: Omit<MenuItem, 'id' | 'status'> = { name: 'x', description: null, priceCLP: null, allergens: null };
  it('oculta productos ocultos y deja los agotados', () => {
    const items: MenuItem[] = [
      { ...base, id: 'a', status: 'available' },
      { ...base, id: 'b', status: 'hidden' },
      { ...base, id: 'c', status: 'sold_out' },
    ];
    expect(visibleItems(items).map((i) => i.id)).toEqual(['a', 'c']);
  });
});

describe('restaurantJsonLd', () => {
  const b: BusinessInfo = {
    name: 'R', legalTagline: '', description: 'd', cuisine: ['Chilena'],
    address: { street: 's', locality: 'l', city: 'c', region: 'r', country: 'CL' },
    phone: null, whatsapp: false, contactPerson: null, email: null, instagram: null, facebookUrl: null,
    googleReviewUrl: null, openingHoursText: null, openingDaysText: null, mapsQuery: 'q',
  };
  it('omite teléfono y URL si no están confirmados', () => {
    const ld = restaurantJsonLd(b, null);
    expect(ld).not.toHaveProperty('telephone');
    expect(ld).not.toHaveProperty('url');
    expect(ld['@type']).toBe('Restaurant');
  });
  it('incluye el teléfono confirmado', () => {
    expect(restaurantJsonLd({ ...b, phone: '+56 9 9750 6058' }, 'https://x.cl').telephone).toBe('+56997506058');
  });
});
