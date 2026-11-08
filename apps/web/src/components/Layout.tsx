import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { useRouteSeo } from '../lib/seo';

export function Layout() {
  useRouteSeo();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="contenido" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
