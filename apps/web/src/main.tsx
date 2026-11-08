import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Las páginas vienen prerenderizadas (SEO); si hay HTML, se hidrata.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
