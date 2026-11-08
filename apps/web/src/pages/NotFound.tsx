import { Link } from 'react-router';
import { SectionHeading } from '@fluva/ui';

export function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <SectionHeading as="h1" kicker="Ups" title="Esta página no existe" align="center" />
      <Link to="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-primary px-7 font-bold text-surface">Volver al inicio</Link>
    </section>
  );
}
