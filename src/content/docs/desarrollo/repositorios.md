---
title: Repositorios
description: Qué hay en cada repositorio y la convención de nombres.
sidebar:
  order: 1
---

| Repositorio                                                       | Contenido                                          | Nombre futuro       |
| ----------------------------------------------------------------- | -------------------------------------------------- | ------------------- |
| [`inzumer/milimon`](https://github.com/inzumer/milimon)           | El sitio (Astro + React)                           | `milimon-web`       |
| `inzumer/api-milimon` (privado)                                   | La API (NestJS + Postgres)                         | `milimon-backend`   |
| [`inzumer/milimon-docs`](https://github.com/inzumer/milimon-docs) | Este sitio de documentación (Starlight)            | —                   |
| [`inzumer/ui-library`](https://github.com/inzumer/ui-library)     | `@inzumer/ui-library`, `@inzumer/tokens` y configs | Un repo por paquete |

## Convención de nombres

- Todo lo de Milimon usa el prefijo **`milimon-`**: `milimon-web`, `milimon-backend`,
  `milimon-docs`, `milimon-e2e`, `milimon-emails`, `milimon-cms`.
- Los paquetes compartidos de `@inzumer` van a tener un repo cada uno: `inzumer-ui-lib`,
  `inzumer-ui-tokens`, `inzumer-prettier`, `inzumer-eslint`, `inzumer-tsconfig` e `inzumer-ci`
  (workflows reutilizables).
- Renombrar el sitio mueve GitHub Pages a `/milimon-web`: conviene hacerlo junto con el dominio
  propio. Detalle en la [sugerencia 08](/milimon-docs/sugerencias/08-calidad-y-tests/).

## Esta documentación

- Las páginas de **Arquitectura, Cómo funciona, Guías y Desarrollo** se escriben acá.
- **Plan y Sugerencias** se generan en el build desde `milimon/docs` (rama `dev`) con
  `scripts/sync-docs.mjs`: se editan allá, no acá.
- Los diagramas son bloques ` ```mermaid ` dentro del Markdown; se dibujan en el navegador y
  siguen el modo claro u oscuro.
- `pnpm dev` levanta el sitio en local (lee `../milimon/docs`); `pnpm build` falla si hay enlaces
  internos rotos.
