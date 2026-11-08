/**
 * @fluva/ui — componentes genéricos y reutilizables FLUVA.
 * Usan solo tokens semánticos (primary, secondary, surface, sand, accent, ink),
 * definidos por el tema de cada cliente.
 */
import type { ReactNode } from 'react';
import type { Photo } from '@fluva/core';

export function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ');
}

interface PictureProps {
  photo: Photo;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/** Imagen responsive: WebP con respaldo JPG, dimensiones fijas para evitar saltos. */
export function Picture({ photo, className, sizes = '100vw', priority = false }: PictureProps) {
  const big = Math.min(photo.width, 1600);
  const small = Math.min(800, big);
  return (
    <picture>
      <source type="image/webp" srcSet={`${photo.src}-800.webp ${small}w, ${photo.src}-1600.webp ${big}w`} sizes={sizes} />
      <img
        src={`${photo.src}-1600.jpg`}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={className}
      />
    </picture>
  );
}

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  id?: string;
}

/** Encabezado de sección: frase decorativa (script) + título destacado (display). */
export function SectionHeading({ kicker, title, as = 'h2', align = 'left', tone = 'light', id }: SectionHeadingProps) {
  const H = as;
  return (
    <div className={cx(align === 'center' && 'text-center')}>
      {kicker && (
        <p className={cx('font-script text-4xl leading-tight', tone === 'light' ? 'text-secondary-dark' : 'text-accent-light')}>{kicker}</p>
      )}
      <H
        id={id}
        className={cx(
          'font-display font-normal leading-none tracking-wide',
          as === 'h1' ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl',
          tone === 'light' ? 'text-primary' : 'text-surface',
        )}
      >
        {title}
      </H>
    </div>
  );
}

/** Aviso visible de dato pendiente de confirmación. Nunca se oculta un dato faltante con uno inventado. */
export function Pending({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx('inline-block rounded bg-sand-light px-2 py-1 text-sm text-ink-soft', className)}>
      {children}
    </span>
  );
}

type BadgeTone = 'ok' | 'muted' | 'accent';
const badgeTone: Record<BadgeTone, string> = {
  ok: 'bg-[#e7edda] text-secondary-dark',
  muted: 'bg-[#ece6e8] text-[#5b4a50] line-through',
  accent: 'bg-[#f5ead0] text-[#6d5313]',
};

export function Badge({ tone, children }: { tone: BadgeTone; children: ReactNode }) {
  return (
    <span className={cx('inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide', badgeTone[tone])}>
      {children}
    </span>
  );
}
