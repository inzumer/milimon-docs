---
title: Repositorios
description: Qué hay en cada repositorio y la convención de nombres.
sidebar:
  order: 1
---

## Convención de nombres

- **Milimon:** `milimon-<área>-<tecnología>`, para que el nombre diga qué es y con qué está hecho.
- **Paquetes compartidos:** un repo `inzumer-<nombre>` por paquete, publicado en npm como
  `@inzumer/<nombre>`.
- Las **carpetas locales** se llaman igual que el repo.

## Milimon

| Repositorio                                                               | Contenido                                      | Estado              |
| ------------------------------------------------------------------------- | ---------------------------------------------- | ------------------- |
| [`milimon-frontend-web`](https://github.com/inzumer/milimon-frontend-web) | El sitio (Astro + React)                       | Antes `milimon`     |
| `milimon-backend-nest` (privado)                                          | La API (NestJS + Postgres)                     | Antes `api-milimon` |
| [`milimon-docs`](https://github.com/inzumer/milimon-docs)                 | Este sitio de documentación (Starlight)        | Existe              |
| `milimon-e2e-playwright`                                                  | Tests e2e y auditorías (a11y, SEO, Lighthouse) | A crear             |
| `milimon-emails-react`                                                    | Plantillas de emails (React Email)             | A crear             |
| `milimon-cms-keystatic`                                                   | El CMS, si termina separado                    | A crear             |

- El deploy del sitio toma la ruta base del **nombre del repo**, así que renombrarlo solo mueve la
  URL (a `/milimon-frontend-web`) en el siguiente deploy. Con el dominio propio deja de depender del
  nombre.
- El servicio de la API en Render se llama igual que el repo:
  `https://milimon-backend-nest.onrender.com`.

## Paquetes `@inzumer`

Un repo por paquete (`inzumer-<nombre>`), publicados en npm desde su propio repo con Changesets.

| Repo y carpeta       | Paquete               | Qué es                             |
| -------------------- | --------------------- | ---------------------------------- |
| `inzumer-ui-library` | `@inzumer/ui-library` | Componentes y Storybook            |
| `inzumer-tokens`     | `@inzumer/tokens`     | Tokens, temas y preset de Tailwind |
| `inzumer-prettier`   | `@inzumer/prettier`   | Config de Prettier                 |
| `inzumer-eslint`     | `@inzumer/eslint`     | Config de ESLint                   |
| `inzumer-tsconfig`   | `@inzumer/tsconfig`   | Configs de TypeScript              |
| `inzumer-ci`         | —                     | Workflows reutilizables de Actions |

`ui-library` y `tokens` mantienen su nombre de npm. Publicar: merge del PR "Version Packages";
Actions publica con trusted publishing de npm (sin tokens guardados).

Detalle y orden de la migración en la
[sugerencia 08](/milimon-docs/sugerencias/08-calidad-y-tests/#repositorios-y-paquetes-decidido-2026-09-27).

## Esta documentación

- Las páginas de **Arquitectura, Cómo funciona, Guías y Desarrollo** se escriben acá.
- **Plan y Sugerencias** se generan en el build desde `milimon-frontend-web/docs` (rama `dev`) con
  `scripts/sync-docs.mjs`: se editan allá, no acá.
- Los diagramas son bloques ` ```mermaid ` dentro del Markdown; se dibujan en el navegador y
  siguen el modo claro u oscuro.
- `pnpm dev` levanta el sitio en local (lee `../milimon-frontend-web/docs`, o `DOCS_SOURCE`); `pnpm build`
  falla si hay enlaces internos rotos.
