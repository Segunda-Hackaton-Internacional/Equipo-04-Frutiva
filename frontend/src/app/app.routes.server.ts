// app.routing.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'detalles-producto/:id',
    renderMode: RenderMode.Client   // esta ruta SOLO en cliente
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender  // todas las demás SSG
  }
];
