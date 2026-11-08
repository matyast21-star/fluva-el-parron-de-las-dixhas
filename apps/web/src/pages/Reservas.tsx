import { business, photos } from '@clients/el-parron';
import { Picture, SectionHeading } from '@fluva/ui';
import { ContactActions } from '../components/ContactActions';

export function Reservas() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
      <div>
        <SectionHeading as="h1" kicker="Le guardamos su mesa" title="Reservas" />
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Para reservar, escríbanos por WhatsApp o llámenos indicando el día, la hora aproximada, la cantidad de personas y si prefiere terraza o salón.
          {business.contactPerson && <> Le atiende {business.contactPerson}.</>}
        </p>
        <ContactActions className="mt-8" message="Hola, quisiera reservar una mesa en El Parrón de las Dichas. Día: … Hora: … Personas: … Terraza o salón: …" />
        <p className="mt-8 rounded-lg bg-sand-light p-4 text-sm text-ink-soft">
          Muy pronto podrá elegir su mesa directamente en el plano del restaurante, desde esta misma página.
        </p>
      </div>
      <Picture photo={photos.terrazaJardin} sizes="(min-width: 768px) 50vw, 100vw" className="w-full rounded object-cover" />
    </section>
  );
}
