# milimon-docs

Documentación de [Milimon](https://github.com/inzumer/milimon-frontend-web): cómo funciona la app, flujos con
diagramas, arquitectura, guías para quien gestiona el sitio, el plan y las sugerencias.

**Sitio:** https://inzumer.github.io/milimon-docs/ (después, `docs.<dominio>`).

## Cómo está armado

- [Starlight](https://starlight.astro.build/) (Astro), en español, con la paleta de Milimon.
- Diagramas con [Mermaid](https://mermaid.js.org/): bloques ` ```mermaid ` en el Markdown,
  dibujados en el navegador y en el tema claro u oscuro.
- `src/content/docs/`: las páginas propias (Arquitectura, Cómo funciona, Guías, Desarrollo).
- **Plan y Sugerencias** no se escriben acá: `scripts/sync-docs.mjs` los copia en cada build desde
  `milimon-frontend-web/docs` (local: `../milimon-frontend-web/docs` o `DOCS_SOURCE`; CI: la rama `dev` de
  `inzumer/milimon-frontend-web`).

## Comandos

| Comando                            | Qué hace                                                 |
| ---------------------------------- | -------------------------------------------------------- |
| `pnpm dev`                         | Sincroniza y levanta el sitio en local                   |
| `pnpm build`                       | Sincroniza y genera `dist/` (falla si hay enlaces rotos) |
| `pnpm format`                      | Prettier                                                 |
| `node --test "scripts/*.test.mjs"` | Tests del script de sincronización                       |

## Publicación

`.github/workflows/deploy.yml` publica en GitHub Pages con cada push a `main`, una vez por día
(para tomar los cambios de `milimon/docs`) y a mano desde Actions. Los PRs a `main` solo validan.
