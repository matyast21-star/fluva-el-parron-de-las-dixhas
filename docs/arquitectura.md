# Arquitectura

El documento completo de la Fase 1 (arquitectura, mapa de navegación, modelo de datos Supabase con RLS por rol y estrategia anti doble reserva) está en Claude Docs:
https://claude.ai/artifact/WauG7aAKa6i8PasESvQyTL

Prototipos aprobados: https://claude.ai/artifact/LVpTcmXLJmv6Dm2CKJ1uFg

## Decisiones de la Fase 2

- **Prerender estático** (`apps/web/scripts/prerender.mjs`): cada ruta pública se entrega como HTML completo y luego React la hidrata. Mejora SEO y velocidad en celulares sin necesidad de servidor.
- **Workspaces npm**: `packages/core` y `packages/ui` son genéricos FLUVA; `clients/el-parron` concentra datos y tema del cliente.
- **Tokens semánticos** (`primary`, `secondary`, `surface`, `sand`, `accent`, `ink`) en `clients/el-parron/src/theme.css`.
- **Datos pendientes como `null`**: el sitio muestra "por confirmar" y los datos estructurados omiten el campo. Nunca se inventan precios, horarios ni capacidades.
- La carta vive por ahora en código; en la Fase 3/4 pasa a Supabase con panel de administración.
