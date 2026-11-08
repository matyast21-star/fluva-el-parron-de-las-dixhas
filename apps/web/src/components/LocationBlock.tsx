import type { ReactNode } from 'react';
import { business } from '@clients/el-parron';
import { mapsEmbedUrl, mapsSearchUrl, telHref } from '@fluva/core';
import { Pending, cx } from '@fluva/ui';
import { IconClock, IconInstagram, IconMail, IconPhone, IconPin } from './icons';

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 text-primary">{icon}</span>
      <div>
        <dt className="font-bold">{label}</dt>
        <dd className="text-ink-soft">{children}</dd>
      </div>
    </div>
  );
}

export function LocationBlock({ className, showMap = true }: { className?: string; showMap?: boolean }) {
  const tel = telHref(business.phone);
  const a = business.address;
  return (
    <div className={cx('grid gap-10 md:grid-cols-2', className)}>
      <dl className="grid content-start gap-6 text-[15px] leading-relaxed">
        <Row icon={<IconPin />} label="Dirección">
          {a.street}, {a.city}, {a.region}
          <br />
          <a className="font-semibold text-primary underline underline-offset-4" href={mapsSearchUrl(business.mapsQuery)} target="_blank" rel="noopener noreferrer">
            Cómo llegar
          </a>
        </Row>
        <Row icon={<IconClock />} label="Horario">
          {business.openingHoursText ? (
            <>
              {business.openingDaysText ? `${business.openingDaysText}, ` : ''}
              {business.openingHoursText}
              {!business.openingDaysText && <Pending className="mt-1 block w-fit">Días de atención por confirmar</Pending>}
            </>
          ) : (
            <Pending>Horario de atención por confirmar</Pending>
          )}
        </Row>
        <Row icon={<IconPhone />} label={business.whatsapp ? 'Teléfono y WhatsApp' : 'Teléfono'}>
          {tel ? <a className="text-primary underline underline-offset-4" href={tel}>{business.phone}</a> : <Pending>Número por confirmar</Pending>}
          {tel && business.contactPerson && <> · atiende {business.contactPerson}</>}
        </Row>
        {business.email && (
          <Row icon={<IconMail />} label="Correo">
            <a className="break-all text-primary underline underline-offset-4" href={`mailto:${business.email}`}>{business.email}</a>
          </Row>
        )}
        {business.instagram && (
          <Row icon={<IconInstagram />} label="Instagram">
            <a className="text-primary underline underline-offset-4" href={business.instagram.url} target="_blank" rel="noopener noreferrer">{business.instagram.handle}</a>
          </Row>
        )}
      </dl>
      {showMap && (
        <div className="min-h-80 overflow-hidden rounded-md border border-sand bg-sand">
          <iframe
            title={`Mapa: ${business.name}, ${a.street}, ${a.city}`}
            src={mapsEmbedUrl(business.mapsQuery)}
            className="h-full min-h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  );
}
