import { facilities } from '@clients/el-parron';
import { Picture, SectionHeading } from '@fluva/ui';

export function Instalaciones() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
      <SectionHeading as="h1" kicker="Nuestros espacios" title="Instalaciones" />
      <p className="mt-4 max-w-2xl text-ink-soft">Fotografías reales del restaurante.</p>
      <ul className="mt-10 grid gap-8 md:grid-cols-2">
        {facilities.map((f) => (
          <li key={f.id}>
            <figure>
              <Picture photo={f.photo} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] w-full rounded object-cover" />
              <figcaption className="mt-3">
                <h2 className="font-display text-3xl text-primary">{f.name}</h2>
                <p className="text-ink-soft">{f.text}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
