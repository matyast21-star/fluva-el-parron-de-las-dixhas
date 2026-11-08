import { Link } from 'react-router';
import { business } from '@clients/el-parron';
import { telHref } from '@fluva/core';

export function Footer() {
  const tel = telHref(business.phone);
  return (
    <footer className="bg-primary-dark text-[#e9dccd]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-6">
        <div className="space-y-4">
          <img src="/brand/logo-parron-negativo.webp" alt="El Parrón de las Dichas" width={295} height={126} className="h-20 w-auto" />
          <p className="max-w-xs text-sm leading-relaxed">{business.address.street}, {business.address.city}, {business.address.region}.</p>
        </div>
        <nav aria-label="Pie de página">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <li><Link className="hover:text-white" to="/carta">Carta</Link></li>
            <li><Link className="hover:text-white" to="/reservas">Reservas</Link></li>
            <li><Link className="hover:text-white" to="/eventos">Eventos</Link></li>
            <li><Link className="hover:text-white" to="/historia">Historia</Link></li>
            <li><Link className="hover:text-white" to="/instalaciones">Instalaciones</Link></li>
            <li><Link className="hover:text-white" to="/contacto">Contacto</Link></li>
          </ul>
        </nav>
        <div className="space-y-2 text-sm">
          {tel && <p><a className="hover:text-white" href={tel}>{business.phone}</a></p>}
          {business.email && <p><a className="break-all hover:text-white" href={`mailto:${business.email}`}>{business.email}</a></p>}
          {business.instagram && <p><a className="hover:text-white" href={business.instagram.url} target="_blank" rel="noopener noreferrer">{business.instagram.handle}</a></p>}
        </div>
      </div>
      <div className="border-t border-accent/30">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 md:px-6">
          <p className="text-[13px] text-[#c9b8a8]">© {new Date().getFullYear()} El Parrón de las Dichas</p>
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#c9b8a8]">Desarrollado por</span>
            <img src="/brand/fluva-logo.webp" alt="FLUVA, tecnología que fluye contigo" width={760} height={285} className="h-11 w-auto rounded-md" />
          </div>
        </div>
      </div>
    </footer>
  );
}
