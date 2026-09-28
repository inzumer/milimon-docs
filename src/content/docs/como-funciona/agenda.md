---
title: Agenda de publicaciones
description: Cómo se planifica lo que se publica y qué controla la API.
sidebar:
  order: 6
---

La agenda (`/es/admin/agenda`) es **compartida** entre editores y admins: qué se publica, cuándo,
de qué tipo y en qué estado está.

```mermaid
sequenceDiagram
  actor E as Editor o admin
  participant S as Agenda (sitio)
  participant A as API
  participant D as Base de datos

  E->>S: Abre la agenda
  S->>A: GET /me (¿sigue teniendo rol?)
  S->>A: GET /admin/agenda?from=2026-10-01&to=2026-10-31
  A->>D: Publicaciones del mes, por fecha
  A-->>S: Lista
  E->>S: "Nueva publicación" (fecha, tipo, estado, título, notas)
  S->>S: Valida fecha y título
  S->>A: POST /admin/agenda
  A->>A: RolesGuard: editor o admin (leído de la base)
  A->>D: Guarda con quién la creó
  A-->>S: Publicación
  S->>S: Recarga el mes y avisa "Listo"
```

| Campo   | Valores                                                                |
| ------- | ---------------------------------------------------------------------- |
| Tipo    | Receta, Reseña, Guía, Artículo, Redes                                  |
| Estado  | Planificada → En preparación → Publicada                               |
| Límites | Título hasta 160 caracteres, notas hasta 1000, rango de hasta 400 días |

- Editar (`PATCH`) guarda **quién hizo el último cambio**; borrar pide confirmación.
- Si a alguien le quitan el rol mientras la tiene abierta, el siguiente cambio responde 403 y el
  sitio lo explica.
- El **ritmo sugerido** (1 receta por semana, 1 reseña cada 15 días, 1 guía y 1 artículo por mes)
  se muestra arriba como referencia.
