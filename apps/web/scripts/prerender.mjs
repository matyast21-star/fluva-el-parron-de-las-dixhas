// Prerenderiza cada ruta pública a HTML estático (SEO y carga rápida) y genera robots.txt y sitemap.xml.
// Uso: se ejecuta al final de `npm run build`. Requiere VITE_SITE_URL para URLs absolutas (canonical, sitemap).
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssr = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const site = (process.env.VITE_SITE_URL || '').replace(/\/+$/, '') || null;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function page(meta, html) {
  const canonical = site ? `${site}${meta.path === '/' ? '' : meta.path}` : null;
  const seo = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    canonical ? `<link rel="canonical" href="${canonical}" />` : '',
    canonical ? `<meta property="og:url" content="${canonical}" />` : '',
    meta.path === '/404' ? '<meta name="robots" content="noindex" />' : '',
  ].filter(Boolean).join('\n    ');
  const images = site ? [`${site}/og-image.jpg`] : [];
  const ld = JSON.stringify(ssr.restaurantJsonLd(ssr.business, site, images)).replace(/</g, '\\u003c');
  return template
    .replace(/<!--seo-->[\s\S]*<!--\/seo-->/, seo)
    .replace('<!--jsonld-->', meta.path === '/' ? `<script type="application/ld+json">${ld}</script>` : '')
    .replace('<!--app-->', html);
}

for (const meta of ssr.routes) {
  const out = meta.path === '/' ? join(dist, 'index.html') : join(dist, meta.path.slice(1), 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page(meta, ssr.render(meta.path)));
  console.log('prerender', meta.path);
}
writeFileSync(join(dist, '404.html'), page(ssr.notFoundMeta, ssr.render('/__no_existe__')));

const indexable = ssr.routes.map((r) => r.path);
writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n${site ? `\nSitemap: ${site}/sitemap.xml\n` : ''}`,
);
if (site) {
  const urls = indexable.map((p) => `  <url><loc>${site}${p === '/' ? '/' : p}</loc></url>`).join('\n');
  writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
} else {
  console.warn('VITE_SITE_URL no definido: se omite sitemap.xml y la URL canónica.');
}
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
