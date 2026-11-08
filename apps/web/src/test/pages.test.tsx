import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { App } from '../App';
import { routes } from '../routes';
import { buildEventMessage, validateEvent } from '../pages/Eventos';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('rutas públicas', () => {
  it.each(routes.map((r) => r.path))('%s tiene un único h1 y el pie FLUVA', (path) => {
    renderAt(path);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByAltText(/FLUVA/)).toBeInTheDocument();
  });

  it('una ruta inexistente muestra la página 404', () => {
    renderAt('/no-existe');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/no existe/i);
  });
});

describe('carta', () => {
  it('muestra todas las categorías y ningún precio inventado', () => {
    renderAt('/carta');
    for (const c of ['Durante la semana', 'Cocina chilena', 'Carnes', 'Aves', 'Pescados', 'Acompañamientos', 'Once']) {
      expect(screen.getByRole('heading', { level: 2, name: c })).toBeInTheDocument();
    }
    expect(screen.queryByText(/\$\s?\d/)).toBeNull();
    expect(screen.getAllByText('Precio por confirmar').length).toBeGreaterThan(10);
  });
});

describe('contacto', () => {
  it('muestra el teléfono oficial con llamada y WhatsApp', () => {
    renderAt('/contacto');
    const main = screen.getByRole('main');
    expect(within(main).getByRole('link', { name: '+56 9 9750 6058' })).toHaveAttribute('href', 'tel:+56997506058');
    expect(within(main).getByRole('link', { name: /WhatsApp/ })).toHaveAttribute('href', expect.stringContaining('https://wa.me/56997506058'));
    expect(within(main).getByText(/Victoria Neira/)).toBeInTheDocument();
  });
  it('muestra días y horario confirmados', () => {
    renderAt('/contacto');
    const main = screen.getByRole('main');
    expect(within(main).getByText(/Sábados y domingos, 12:00 a 18:00/)).toBeInTheDocument();
    expect(within(main).queryByText('Días de atención por confirmar')).toBeNull();
    expect(within(main).getByText(/Durante la semana vendemos empanadas/)).toBeInTheDocument();
  });
});

describe('cotización de eventos', () => {
  const ok = { type: 'Cumpleaños', date: '2999-01-10', guests: '40', name: 'Ana', notes: '' };
  it('valida campos obligatorios', () => {
    const e = validateEvent({ type: '', date: '', guests: '0', name: '', notes: '' });
    expect(Object.keys(e).sort()).toEqual(['date', 'guests', 'name', 'type']);
    expect(validateEvent(ok)).toEqual({});
  });
  it('rechaza fechas pasadas', () => {
    expect(validateEvent({ ...ok, date: '2000-01-01' }).date).toBeTruthy();
  });
  it('arma el mensaje de WhatsApp', () => {
    expect(buildEventMessage({ ...ok, notes: 'Con torta' })).toContain('Invitados aproximados: 40\nNombre: Ana\nComentarios: Con torta');
  });
});
