---
title: Ramas y releases
description: Gitflow, el release automático semanal y el backport a dev.
sidebar:
  order: 9
---

## Ramas

```mermaid
gitGraph
  commit id: "main"
  branch dev
  checkout dev
  commit id: "dev"
  branch feature/agenda
  checkout feature/agenda
  commit id: "feat: agenda"
  checkout dev
  merge feature/agenda
  branch release/1.2.0
  checkout release/1.2.0
  commit id: "chore(release): 1.2.0"
  checkout main
  merge release/1.2.0 tag: "v1.2.0"
  checkout dev
  merge main id: "backport"
```

- `feature/*` sale de `dev` y vuelve con un PR (merge `--no-ff`).
- `main` solo recibe `release/*` y `hotfix/*`, y es lo que se publica.
- Commits y títulos de PR con **Conventional Commits** (`feat`, `fix`, `docs`, `ci`…).

## Release automático (hora de Madrid)

```mermaid
flowchart LR
  vie([Viernes 12:00]) --> cambios{¿dev tiene cambios<br/>desde el último tag?}
  cambios -- no --> cerrar[Cierra PRs de release viejos]
  cambios -- sí --> version[Versión por commits:<br/>feat → minor · ! → major · resto → patch]
  version --> rama[release/X.Y.Z + PR a main]
  rama --> ci1[CI completo]
  ci1 --> lun([Lunes 12:00 API · 12:30 sitio])
  lun --> ci2[CI de nuevo] --> merge[Fusiona a main]
  merge --> tag[Tag vX.Y.Z + GitHub Release]
  tag --> backport[Backport a dev<br/>PR fusionado solo]
  tag --> deploy[Deploy: Pages / Render]
```

- Si hay conflicto en el backport, el PR queda abierto para resolverlo a mano.
- Con `RELEASE_AUTO_MERGE=false` (variable del repo), el lunes no se fusiona solo: el PR queda para
  revisarlo, y al fusionarlo a mano igual se hacen el tag, el release y el backport.
- **Dependabot** abre PRs los días 1 y 15 de cada mes.
- Se puede lanzar cualquier paso a mano desde **Actions** (el viernes permite forzar el tipo de versión).
