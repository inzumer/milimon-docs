---
title: Convenciones
description: Lo que no se negocia al trabajar en el sitio y la API.
sidebar:
  order: 2
---

Las reglas completas están en el `CLAUDE.md` de cada repo; este es el resumen.

## Sitio

- **Rutas** en inglés e iguales en los dos idiomas; textos en `src/i18n/<carpeta>/{es,en}.json`
  con las mismas claves.
- **Ubicación**: componentes en `src/components` (atoms, molecules, organisms), hooks en
  `src/hooks`, fórmulas y helpers puros en `src/utils`, valores ajustables en `src/constants`,
  integraciones externas en `src/services`. Imports con alias (`@components`, `@utils`…).
- **Texto** con `RichText` de la librería (nunca `<p>` o `<h*>` sueltos); colores solo con
  variables CSS; claro y oscuro siempre.
- **Cada input** con label visible y placeholder descriptivo; **cada elemento interactivo** con un
  id de `trackingId`.
- **Estado** persistido solo por los stores de zustand; analítica solo por `track()`.
- **Tests**: todos los títulos empiezan con `should…`; cobertura mínima del 90 %.
- `pnpm validate` = typecheck + lint + tests con cobertura + build.

## API

- Un módulo por dominio con `dto/`, `entities/`, controller, service y barrel.
- Esquema solo por migraciones escritas a mano y reversibles.
- Todo lo personal va con `AuthMiddleware` y consultas por el id del token.
- `npm run validate`; los e2e necesitan Postgres (`docker compose up -d`).

## Todos los repos

- **Conventional Commits** en commits y títulos de PR; PRs con la plantilla completa.
- Gitflow: `feature/*` → `dev` → `release/*` → `main`, con releases automáticos
  (ver [Ramas y releases](/milimon-docs/como-funciona/releases/)).
- Dependencias en su última versión compatible y `audit` limpio.
