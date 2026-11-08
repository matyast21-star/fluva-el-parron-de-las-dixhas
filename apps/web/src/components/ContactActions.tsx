import { telHref, whatsappHref } from '@fluva/core';
import { business } from '@clients/el-parron';
import { cx } from '@fluva/ui';
import { IconPhone, IconWhatsapp } from './icons';

/** Botones de llamada y WhatsApp. Solo se muestran si el número está confirmado. */
export function ContactActions({ message, className, tone = 'light' }: { message?: string; className?: string; tone?: 'light' | 'dark' }) {
  const tel = telHref(business.phone);
  const wa = business.whatsapp ? whatsappHref(business.phone, message) : null;
  if (!tel && !wa) return null;
  const btn = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-bold transition-colors';
  return (
    <div className={cx('flex flex-wrap gap-3', className)}>
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer" className={cx(btn, 'bg-secondary-dark text-white hover:bg-secondary')}>
          <IconWhatsapp /> Escribir por WhatsApp
        </a>
      )}
      {tel && (
        <a href={tel} className={cx(btn, tone === 'light' ? 'border-2 border-primary text-primary hover:bg-primary hover:text-surface' : 'border-2 border-surface text-surface hover:bg-surface hover:text-primary')}>
          <IconPhone /> Llamar
        </a>
      )}
    </div>
  );
}
