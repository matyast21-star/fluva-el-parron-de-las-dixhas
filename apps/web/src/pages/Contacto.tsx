import { SectionHeading } from '@fluva/ui';
import { LocationBlock } from '../components/LocationBlock';
import { ContactActions } from '../components/ContactActions';

export function Contacto() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
      <SectionHeading as="h1" kicker="Le esperamos" title="Contacto y ubicación" />
      <ContactActions className="mt-8" message="Hola, quisiera hacer una consulta a El Parrón de las Dichas." />
      <LocationBlock className="mt-10" />
    </div>
  );
}
