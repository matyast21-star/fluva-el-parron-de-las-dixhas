import { menu, photos } from '@clients/el-parron';
import { visibleItems } from '@fluva/core';
import { Picture, SectionHeading } from '@fluva/ui';
import { MenuItemCard } from '../components/MenuItemCard';
import { ContactActions } from '../components/ContactActions';

export function Carta() {
  const categories = menu.map((c) => ({ ...c, items: visibleItems(c.items) })).filter((c) => c.items.length);
  return (
    <>
      <section className="bg-primary text-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-[1.4fr_1fr] md:px-6">
          <div>
            <SectionHeading as="h1" kicker="Sabores de campo" title="Nuestra carta" tone="dark" />
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#f0e2d6]">
              Cocina tradicional chilena. Los productos son una referencia inicial: precios, descripciones y alérgenos se están confirmando con la cocina.
            </p>
          </div>
          <figure className="hidden md:block">
            <Picture photo={photos.platoCocina} priority sizes="40vw" className="aspect-[4/3] w-full border-4 border-surface object-cover" />
            <figcaption className="mt-2 text-xs text-[#e9d6c8]">Desde nuestra cocina</figcaption>
          </figure>
        </div>
      </section>

      <nav aria-label="Categorías de la carta" className="sticky top-[65px] z-30 border-b border-sand bg-surface/95 backdrop-blur md:top-[81px]">
        <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 md:px-6">
          {categories.map((c) => (
            <li key={c.id} className="shrink-0">
              <a href={`#${c.id}`} className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full border border-sand bg-white px-5 text-sm font-semibold text-primary hover:border-primary">
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 md:px-6">
        {categories.map((c) => (
          <section key={c.id} id={c.id} aria-labelledby={`h-${c.id}`} className="scroll-mt-40">
            <div className="mb-5 flex items-center gap-3">
              <h2 id={`h-${c.id}`} className="font-display text-4xl text-primary">{c.name}</h2>
              <img src="/brand/hoja.webp" alt="" width={80} height={80} className="size-7" />
            </div>
            {c.note && <p className="-mt-2 mb-5 text-ink-soft">{c.note}</p>}
            <ul className="grid gap-4 md:grid-cols-2">
              {c.items.map((it) => (
                <li key={it.id}><MenuItemCard item={it} /></li>
              ))}
            </ul>
          </section>
        ))}
        <section aria-label="Consultas" className="rounded-lg bg-sand-light p-6 md:p-8">
          <h2 className="font-display text-3xl text-primary">¿Consultas sobre un plato o alérgenos?</h2>
          <p className="mt-2 text-ink-soft">Escríbanos antes de su visita y le contamos el menú del día.</p>
          <ContactActions className="mt-5" message="Hola, quisiera consultar por la carta de El Parrón de las Dichas." />
        </section>
      </div>
    </>
  );
}
