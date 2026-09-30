---
title: La API
description: NestJS con Postgres, sus módulos, rutas y capas de seguridad.
sidebar:
  order: 3
---

Repositorio `inzumer/milimon-backend-nest` (privado; antes `api-milimon`). NestJS 12 (ESM) + TypeORM + Postgres.

## Cada pedido pasa por

```mermaid
flowchart LR
  req([Pedido]) --> rid[RequestId<br/>traza]
  rid --> origin[Origin<br/>¿origen permitido?]
  origin --> app[RequestAppId<br/>request-app-id + x-api-key]
  app --> json[JSON only]
  json --> auth{¿Ruta personal?<br/>/me, /admin}
  auth -- sí --> jwt[AuthMiddleware<br/>access token válido]
  auth -- no --> ctrl
  jwt --> roles{¿Pide rol?}
  roles -- sí --> guard[RolesGuard<br/>rol leído de la base]
  roles -- no --> ctrl[Controller + validación DTO]
  guard --> ctrl --> svc[Service] --> db[(Postgres)]
```

Además hay **límite de pedidos por IP** (120 por minuto; 10 para iniciar sesión) y cabeceras de
seguridad con Helmet.

## Rutas

| Módulo        | Rutas                                                                        | Acceso              |
| ------------- | ---------------------------------------------------------------------------- | ------------------- |
| auth          | `POST /auth/google`, `/auth/facebook`, `/auth/refresh`, `/auth/sign-out`     | Cliente (api key)   |
| auth          | `POST /auth/facebook/data-deletion`                                          | Meta (firma propia) |
| user          | `GET /me`, `DELETE /me`, `GET/PUT /me/profile`                               | Sesión              |
| drafts        | `GET /me/drafts`, `PUT/DELETE /me/drafts/:formulaId`                         | Sesión              |
| history       | `GET /me/history`, `PUT/DELETE /me/history/:id`                              | Sesión              |
| saved-recipes | `GET /me/saved-recipes`, `PUT/DELETE /me/saved-recipes/:recipeId`            | Sesión              |
| admin         | `GET /admin/users`, `PATCH /admin/users/:id/role`, `GET /admin/role-changes` | Rol admin           |
| agenda        | `GET/POST /admin/agenda`, `PATCH/DELETE /admin/agenda/:id`                   | Rol editor o admin  |
| health        | `GET /health`                                                                | Público (Render)    |

## Reglas

- Todo lo personal se consulta **siempre con el id del token**, nunca con uno que mande el cliente.
- Esquema solo por **migraciones** escritas a mano y reversibles; corren al arrancar.
- Lo que pertenece a una persona se borra con su cuenta (`ON DELETE CASCADE`); en la agenda y el
  registro de roles, quien hizo el cambio queda en `null`.
- Límites, TTLs y patrones en `src/common/constants`.
