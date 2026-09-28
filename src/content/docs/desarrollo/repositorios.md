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

Hoy viven juntos en el monorepo `ui-library`; se separan en un repo por paquete.

| Repo y carpeta      | Paquete              | Antes                                |
| ------------------- | -------------------- | ------------------------------------ |
| `inzumer-ui-lib`    | `@inzumer/ui-lib`    | `@inzumer/ui-library`                |
| `inzumer-ui-tokens` | `@inzumer/ui-tokens` | `@inzumer/tokens`                    |
| `inzumer-prettier`  | `@inzumer/prettier`  | `@inzumer/prettier-config` (privado) |
| `inzumer-eslint`    | `@inzumer/eslint`    | `@inzumer/eslint-config` (privado)   |
| `inzumer-tsconfig`  | `@inzumer/tsconfig`  | `@inzumer/tsconfig` (privado)        |
| `inzumer-ci`        | —                    | Workflows reutilizables de Actions   |

Detalle y orden de la migración en la
[sugerencia 08](/milimon-docs/sugerencias/08-calidad-y-tests/#repositorios-y-paquetes-decidido-2026-09-27).

## Esta documentación

- Las páginas de **Arquitectura, Cómo funciona, Guías y Desarrollo** se escriben acá.
- **Plan y Sugerencias** se generan en el build desde `milimon-frontend-web/docs` (rama `dev`) con
  `scripts/sync-docs.mjs`: se editan allá, no acá.
- Los diagramas son bloques ` ```mermaid ` dentro del Markdown; se dibujan en el navegador y
  siguen el modo claro u oscuro.
- `pnpm dev` levanta el sitio en local (lee `../milimon/docs`, o `DOCS_SOURCE`); `pnpm build`
  falla si hay enlaces internos rotos.
