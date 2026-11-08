import { useState, type FormEvent } from 'react';
import { business, eventTypes, photos } from '@clients/el-parron';
import { whatsappHref } from '@fluva/core';
import { Picture, SectionHeading } from '@fluva/ui';
import { ContactActions } from '../components/ContactActions';

interface Draft {
  type: string;
  date: string;
  guests: string;
  name: string;
  notes: string;
}

export function buildEventMessage(d: Draft): string {
  const lines = [
    'Hola, quisiera cotizar un evento en El Parrón de las Dichas.',
    `Tipo de evento: ${d.type}`,
    `Fecha tentativa: ${d.date}`,
    `Invitados aproximados: ${d.guests}`,
    `Nombre: ${d.name}`,
  ];
  if (d.notes.trim()) lines.push(`Comentarios: ${d.notes.trim()}`);
  return lines.join('\n');
}

function todayISO() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
}

export function validateEvent(d: Draft): Partial<Record<keyof Draft, string>> {
  const e: Partial<Record<keyof Draft, string>> = {};
  if (!d.type) e.type = 'Elija el tipo de evento.';
  if (!d.date) e.date = 'Indique una fecha tentativa.';
  else if (d.date < todayISO()) e.date = 'La fecha no puede ser anterior a hoy.';
  const n = Number(d.guests);
  if (!d.guests || !Number.isInteger(n) || n < 1 || n > 500) e.guests = 'Indique un número de invitados entre 1 y 500.';
  if (d.name.trim().length < 2) e.name = 'Indique su nombre.';
  return e;
}

const field = 'mt-1 block min-h-12 w-full rounded-lg border border-sand bg-white px-3 text-base text-ink';

export function Eventos() {
  const [d, setD] = useState<Draft>({ type: '', date: '', guests: '', name: '', notes: '' });
  const [errors, setErrors] = useState<ReturnType<typeof validateEvent>>({});
  const set = (k: keyof Draft) => (ev: { target: { value: string } }) => setD((p) => ({ ...p, [k]: ev.target.value }));
  const canSend = business.whatsapp && whatsappHref(business.phone) !== null;

  function submit(ev: FormEvent) {
    ev.preventDefault();
    const e = validateEvent(d);
    setErrors(e);
    if (Object.keys(e).length) return;
    const href = whatsappHref(business.phone, buildEventMessage(d));
    if (href) window.open(href, '_blank', 'noopener');
  }

  return (
    <>
      <section className="relative isolate flex min-h-[360px] items-end overflow-hidden bg-primary-dark">
        <Picture photo={photos.salonEvento} priority sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgb(42_8_23/0.92)] to-[rgb(42_8_23/0.3)]" />
        <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-24 md:px-6">
          <SectionHeading as="h1" kicker="Celebre en el parrón" title="Eventos y celebraciones" tone="dark" />
          <p className="mt-3 max-w-2xl text-surface">Cumpleaños, aniversarios, almuerzos de empresa, paseos de adultos mayores, música en vivo y eventos privados.</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[1fr_1.2fr] md:px-6">
        <section aria-labelledby="h-tipos">
          <h2 id="h-tipos" className="font-display text-4xl text-primary">Tipos de evento</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {eventTypes.map((t) => (
              <li key={t} className="flex min-h-12 items-center gap-3 rounded-lg border border-sand bg-white px-4">
                <img src="/brand/hoja.webp" alt="" width={80} height={80} className="size-5" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink-soft">
            Menús grupales, tarifas y servicios adicionales se cotizan según la fecha y la cantidad de invitados.
          </p>
          <p className="mt-3 text-ink-soft">
            Los días de evento a veces también se ofrecen empanadas y parrilladas.
          </p>
        </section>

        <section aria-labelledby="h-cotizar" className="rounded-xl border border-[#e3d4bb] bg-white p-6 md:p-8">
          <h2 id="h-cotizar" className="font-display text-4xl text-primary">Solicite su cotización</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Complete los datos y se abrirá WhatsApp con su mensaje listo para enviar{business.contactPerson ? ` a ${business.contactPerson}` : ''}.
          </p>
          {canSend ? (
            <form onSubmit={submit} noValidate className="mt-6 grid gap-4">
              <label className="text-sm font-semibold">
                Tipo de evento
                <select className={field} value={d.type} onChange={set('type')} aria-invalid={!!errors.type} aria-describedby={errors.type ? 'e-type' : undefined}>
                  <option value="">Elija una opción</option>
                  {eventTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
                {errors.type && <span id="e-type" className="mt-1 block text-sm text-[#a33434]">{errors.type}</span>}
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Fecha tentativa
                  <input type="date" className={field} value={d.date} onChange={set('date')} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'e-date' : undefined} />
                  {errors.date && <span id="e-date" className="mt-1 block text-sm text-[#a33434]">{errors.date}</span>}
                </label>
                <label className="text-sm font-semibold">
                  Invitados
                  <input type="number" inputMode="numeric" min={1} max={500} className={field} value={d.guests} onChange={set('guests')} aria-invalid={!!errors.guests} aria-describedby={errors.guests ? 'e-guests' : undefined} />
                  {errors.guests && <span id="e-guests" className="mt-1 block text-sm text-[#a33434]">{errors.guests}</span>}
                </label>
              </div>
              <label className="text-sm font-semibold">
                Su nombre
                <input type="text" autoComplete="name" className={field} value={d.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} />
                {errors.name && <span id="e-name" className="mt-1 block text-sm text-[#a33434]">{errors.name}</span>}
              </label>
              <label className="text-sm font-semibold">
                Comentarios (opcional)
                <textarea rows={3} maxLength={600} className={`${field} py-2`} value={d.notes} onChange={set('notes')} placeholder="Menú de interés, música, decoración, horario…" />
              </label>
              <button type="submit" className="min-h-14 rounded-full bg-secondary-dark px-6 text-base font-bold text-white hover:bg-secondary">
                Enviar por WhatsApp
              </button>
              <p className="text-xs text-ink-soft">Sus datos no se guardan en este sitio: se envían solo en el mensaje de WhatsApp que usted decide mandar.</p>
            </form>
          ) : (
            <ContactActions className="mt-6" />
          )}
        </section>
      </div>
    </>
  );
}
