import type { MenuItem } from '@fluva/core';
import { formatPrice } from '@fluva/core';
import { Badge, Picture, cx } from '@fluva/ui';

export function MenuItemCard({ item }: { item: MenuItem }) {
  const soldOut = item.status === 'sold_out';
  return (
    <article className={cx('flex overflow-hidden rounded-lg border border-[#e3d4bb]', soldOut ? 'bg-[#f6f2ea]' : 'bg-white')}>
      <div className="w-28 shrink-0 sm:w-36">
        {item.photo ? (
          <Picture photo={item.photo} sizes="144px" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full min-h-32 flex-col items-center justify-center gap-1 bg-sand-light p-2">
            <img src="/brand/uvas.webp" alt="" width={144} height={140} className="h-14 w-auto mix-blend-multiply" />
            <span className="text-center text-[10px] font-bold tracking-wider text-ink-soft">FOTO PENDIENTE</span>
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className={cx('font-display text-[26px] leading-none', soldOut ? 'text-ink-soft' : 'text-primary')}>{item.name}</h3>
          {soldOut ? <Badge tone="muted">AGOTADO</Badge> : item.featured ? <Badge tone="accent">★ DESTACADO</Badge> : null}
        </div>
        <p className="text-sm leading-snug text-ink-soft">{item.description ?? 'Descripción por confirmar'}</p>
        {item.sides && <p className="text-xs text-ink"><strong>Acompañamiento:</strong> {item.sides}</p>}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-1">
          <span className="text-xs text-ink-soft">
            Alérgenos: {item.allergens === null ? 'por confirmar' : item.allergens.length ? item.allergens.join(', ') : 'no declara'}
          </span>
          <span className="text-sm font-bold text-primary">{formatPrice(item.priceCLP)}</span>
        </div>
      </div>
    </article>
  );
}
