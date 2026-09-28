---
title: Datos
description: Modelo de la base de datos y qué queda en el dispositivo.
sidebar:
  order: 4
---

## Base de datos (Postgres)

```mermaid
erDiagram
  app_user ||--o{ identity : "inicia sesión con"
  app_user ||--o{ refresh_token : "tiene sesiones"
  app_user ||--o{ calculator_draft : "últimos valores"
  app_user ||--o{ history_entry : "cálculos guardados"
  app_user ||--o{ role_change : "cambios de su rol"
  app_user |o--o{ agenda_entry : "crea / edita"

  app_user {
    uuid id PK
    string name
    string email
    string role "user | editor | admin"
    string currency
    string locale "es | en"
    string color_scheme "light | dark"
  }
  identity {
    uuid id PK
    uuid user_id FK
    string provider "google | facebook"
    string subject "id en el proveedor"
  }
  refresh_token {
    uuid id PK
    uuid user_id FK
    string token_hash "SHA-256, nunca el token"
    timestamp expires_at
    timestamp revoked_at
  }
  calculator_draft {
    uuid user_id PK
    string formula_id PK
    json draft
  }
  history_entry {
    uuid user_id PK
    string id PK
    string formula_id
    json draft
    json result
    string currency
  }
  role_change {
    uuid id PK
    uuid user_id FK
    uuid changed_by_id FK
    string from_role
    string to_role
    string reason "bootstrap | admin"
  }
  agenda_entry {
    uuid id PK
    date date
    string kind "recipe | review | guide | article | social"
    string status "planned | in-progress | published"
    string title
    text notes
  }
```

- Una persona puede tener **Google y Facebook** vinculados: se unen por el email verificado.
- De los refresh tokens se guarda solo el **hash**; cada uno se usa una vez.
- Al borrar la cuenta se borra todo lo suyo; en `role_change` y `agenda_entry`, quien hizo el cambio
  queda en `null`.

## En el dispositivo (localStorage)

| Clave                  | Contenido                                                     |
| ---------------------- | ------------------------------------------------------------- |
| `milimon:settings`     | Moneda, idioma, tema y consentimiento de analítica            |
| `milimon:calculations` | Últimos valores de cada calculadora                           |
| `milimon:history`      | Cálculos guardados (hasta 15)                                 |
| `milimon:auth`         | Access token, refresh token, vencimiento y datos de la cuenta |

En `sessionStorage`, `milimon:account-synced` marca que en esta pestaña ya se sincronizó al
iniciar sesión.
