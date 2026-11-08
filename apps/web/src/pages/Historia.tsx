import { history, photos } from '@clients/el-parron';
import { Pending, Picture, SectionHeading } from '@fluva/ui';

export function Historia() {
  return (
    <section className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
      <div>
        <SectionHeading as="h1" kicker="Nuestra historia" title="Cerca de setenta años de tradición familiar" />
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">{history.lead}</p>
        {history.pending && (
          <Pending className="mt-6 block">
            Esta página se completará con la historia que entregue la familia: origen del restaurante, fechas y personas.
          </Pending>
        )}
      </div>
      <div className="grid gap-4">
        <Picture photo={photos.terrazaPasillo} sizes="(min-width: 768px) 50vw, 100vw" className="w-full rounded object-cover" />
        <Picture photo={photos.ruedasCarreta} sizes="(min-width: 768px) 50vw, 100vw" className="w-full rounded object-cover" />
      </div>
    </section>
  );
}
