import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { cx } from '@fluva/ui';
import { routes } from '../routes';
import { IconClose, IconMenu, IconCalendar } from './icons';

const navItems = routes.filter((r) => r.nav);

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-surface/95 backdrop-blur">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-surface">
        Saltar al contenido
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 md:px-6">
        <Link to="/" aria-label="El Parrón de las Dichas, inicio" className="shrink-0">
          <img src="/brand/logo-parron.webp" alt="El Parrón de las Dichas — Restaurante" width={810} height={318} className="h-12 w-auto md:h-16" />
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-7 text-[13px] font-semibold uppercase tracking-[0.08em]">
            {navItems.map((r) => (
              <li key={r.path}>
                <NavLink
                  to={r.path}
                  end
                  className={({ isActive }) => cx('border-b-2 pb-1 hover:text-primary', isActive ? 'border-accent text-primary' : 'border-transparent text-ink-soft')}
                >
                  {r.nav}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/reservas" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-surface hover:bg-primary-dark">
            <IconCalendar /> <span>Reservar</span>
          </Link>
          <button
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-xl border border-sand bg-white text-primary lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-movil" aria-label="Menú móvil" className="border-t border-sand bg-surface lg:hidden">
          <ul className="mx-auto grid max-w-6xl px-4 py-2">
            {navItems.map((r) => (
              <li key={r.path}>
                <NavLink
                  to={r.path}
                  end
                  className={({ isActive }) => cx('flex min-h-12 items-center border-b border-sand-light text-base font-semibold', isActive ? 'text-primary' : 'text-ink')}
                >
                  {r.nav}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
