import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { metaFor } from '../routes';

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (el) el.setAttribute(attr, value);
}

/** Mantiene título y metadatos al navegar en el cliente (el prerender ya los escribe en el HTML). */
export function useRouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = metaFor(pathname);
    document.title = m.title;
    setMeta('meta[name="description"]', 'content', m.description);
    setMeta('meta[property="og:title"]', 'content', m.title);
    setMeta('meta[property="og:description"]', 'content', m.description);
    const site = import.meta.env.VITE_SITE_URL as string | undefined;
    if (site) setMeta('link[rel="canonical"]', 'href', `${site}${m.path === '/' ? '' : m.path}`);
  }, [pathname]);
}
