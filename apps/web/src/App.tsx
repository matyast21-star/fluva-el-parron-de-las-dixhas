import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Carta } from './pages/Carta';
import { Historia } from './pages/Historia';
import { Instalaciones } from './pages/Instalaciones';
import { Eventos } from './pages/Eventos';
import { Contacto } from './pages/Contacto';
import { Reservas } from './pages/Reservas';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="carta" element={<Carta />} />
        <Route path="historia" element={<Historia />} />
        <Route path="instalaciones" element={<Instalaciones />} />
        <Route path="eventos" element={<Eventos />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="reservas" element={<Reservas />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
