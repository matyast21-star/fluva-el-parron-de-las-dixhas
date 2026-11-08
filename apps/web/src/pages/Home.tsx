import { Link } from 'react-router';
import { business, eventTypes, facilities, history, menu, photos } from '@clients/el-parron';
import { featuredItems, formatPrice } from '@fluva/core';
import { Pending, Picture, SectionHeading } from '@fluva/ui';
import { ContactActions } from '../components/ContactActions';
import { IconStar } from '../components/icons';
import { LocationBlock } from '../components/LocationBlock';

const btnLight = 'inline-flex min-h-13 items-center justify-center rounded-full px-7 text-[15px] font-bold';

export function Home() {
  const featured = featuredItems(menu).slice(0, 4);
  return (
    <>
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-[#3a2a1f] md:min-h-[640px]">
        <Picture photo={photos.terrazaJardin} priority sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_40%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgb(42_8_22/0.92)] via-[rgb(42_8_22/0.55)] to-[rgb(42_8_22/0.1)] md:bg-gradient-to-r md:from-[rgb(42_8_22/0.88)] md:via-[rgb(42_8_22/0.55)] md:to-transparent" />
        <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-24 md:px-6 md:pb-20">
          <div className="max-w-xl text-surface">
            <p className="font-script text-4xl text-accent-light md:text-5xl">Bienvenidos al parrón</p>
            <h1 className="mt-2 font-display text-5xl leading-[0.95] md:text-7xl">Cocina chilena de campo, a la sombra de las parras</h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed md:text-lg">
              Almuerzos caseros, terraza entre flores y un salón para celebrar en familia. {business.address.street}, {business.address.city}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/carta" className={`${btnLight} bg-surface text-primary hover:bg-white`}>Ver la carta</Link>
              <Link to="/reservas" className={`${btnLight} bg-accent text-ink hover:bg-accent-light`}>Reservar una mesa</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="historia" aria-labelledby="h-historia" className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
        <div className="relative">
          <Picture photo={photos.terrazaPasillo} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-square w-full rounded object-cover shadow-[14px_14px_0_var(--color-sand)]" />
          <div className="absolute -bottom-4 left-4 border border-accent bg-primary px-6 py-4 text-center text-surface">
            <div className="font-display text-5xl leading-none text-accent-light">≈ {history.yearsApprox}</div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em]">años de historia</div>
          </div>
        </div>
        <div>
          <SectionHeading id="h-historia" kicker="Nuestra historia" title="Una mesa familiar en el corazón de Las Dichas" />
          <p className="mt-6 leading-relaxed text-ink-soft">{history.lead}</p>
          {history.pending && <Pending className="mt-4">Historia completa por redactar con la familia.</Pending>}
          <Link to="/historia" className="mt-6 inline-flex min-h-12 items-center font-bold text-primary underline decoration-accent decoration-2 underline-offset-4">Conocer la historia</Link>
        </div>
      </section>

      <section aria-labelledby="h-platos" className="paper-pattern py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading id="h-platos" kicker="De nuestra cocina" title="Platos destacados" align="center" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((it) => (
              <li key={it.id} className="overflow-hidden rounded-md border border-[#e3d4bb] bg-white">
                <div className="flex h-52 flex-col items-center justify-center gap-2 bg-sand-light">
                  <img src="/brand/uvas.webp" alt="" width={144} height={140} className="h-24 w-auto mix-blend-multiply" />
                  <span className="text-[11px] font-bold tracking-[0.12em] text-ink-soft">FOTO PENDIENTE</span>
                </div>
                <div className="p-5">
                  <h3 className="mt-1 font-display text-3xl text-primary">{it.name}</h3>
                  <p className="mt-2 text-sm font-bold text-primary">{formatPrice(it.priceCLP)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link to="/carta" className="inline-flex min-h-12 items-center rounded-full border-2 border-primary px-7 font-bold text-primary hover:bg-primary hover:text-surface">Ver la carta completa</Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="h-inst" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="h-inst" kicker="Nuestros espacios" title="Instalaciones" />
          <p className="max-w-md text-ink-soft">Terraza techada rodeada de jardín, salón interior de madera y ladrillo, y rincones campestres.</p>
        </div>
        <ul className="mt-10 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:auto-rows-[250px] lg:grid-cols-3">
          {facilities.map((f, i) => (
            <li key={f.id} className={`relative overflow-hidden rounded ${i === 0 ? 'lg:row-span-2' : ''} ${i === 3 ? 'lg:col-span-2' : ''}`}>
              <Picture photo={f.photo} sizes="(min-width: 1024px) 33vw, 100vw" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgb(30_8_16/0.85)] to-transparent px-5 pb-4 pt-12">
                <h3 className="font-display text-2xl tracking-wide text-surface">{f.name}</h3>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="h-eventos" className="bg-primary text-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:px-6 md:py-24">
          <div>
            <SectionHeading id="h-eventos" kicker="Celebre con nosotros" title="Eventos y celebraciones" tone="dark" />
            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {eventTypes.slice(0, 6).map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <img src="/brand/hoja.webp" alt="" width={80} height={80} className="size-5 rounded-full" />
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/eventos" className="mt-8 inline-flex min-h-13 items-center rounded-full bg-accent px-7 font-bold text-ink hover:bg-accent-light">Cotizar mi evento</Link>
          </div>
          <Picture photo={photos.salonEvento} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[16/11] w-full border-[6px] border-surface object-cover" />
        </div>
      </section>

      <section aria-labelledby="h-opiniones" className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6">
        <SectionHeading id="h-opiniones" kicker="Su opinión nos importa" title="Opiniones" align="center" />
        <p className="mt-6 leading-relaxed text-ink-soft">
          Si nos visitó, nos ayuda mucho que cuente su experiencia en Google, sea cual sea su evaluación.
        </p>
        {business.googleReviewUrl ? (
          <a href={business.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-sand bg-white px-6 font-semibold text-primary">
            <span className="text-accent"><IconStar /></span> Dejar una reseña en Google
          </a>
        ) : (
          <Pending className="mt-6">Enlace a la ficha de Google pendiente de verificación.</Pending>
        )}
      </section>

      <section aria-labelledby="h-contacto" className="bg-sand-light">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
          <SectionHeading id="h-contacto" kicker="Le esperamos" title="Ubicación y contacto" />
          <LocationBlock className="mt-10" />
          <ContactActions className="mt-8" message="Hola, quisiera consultar por una reserva en El Parrón de las Dichas." />
        </div>
      </section>
    </>
  );
}
