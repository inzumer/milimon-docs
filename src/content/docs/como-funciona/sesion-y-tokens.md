---
title: Sesión y tokens
description: Access token corto, refresh token de un solo uso y qué pasa si alguien lo roba.
sidebar:
  order: 2
---

| Token             | Dura    | Para qué                                     | Dónde se guarda                       |
| ----------------- | ------- | -------------------------------------------- | ------------------------------------- |
| **Access token**  | 15 min  | Autoriza cada pedido a `/me` y `/admin`      | Dispositivo (`milimon:auth`)          |
| **Refresh token** | 30 días | Pide un access token nuevo, **una sola vez** | Dispositivo; en la base, solo su hash |

## Renovación

```mermaid
sequenceDiagram
  participant S as Sitio
  participant A as API
  participant D as Base de datos

  S->>S: ¿Vence en menos de 1 minuto?
  alt Sí
    S->>A: POST /auth/refresh { refreshToken }
    A->>D: Busca el hash
    alt Válido y sin usar
      A->>D: Lo marca como usado y guarda uno nuevo
      A-->>S: access + refresh nuevos
    else Ya usado (posible robo)
      A->>D: Revoca todas las sesiones de la persona
      A-->>S: 401
      S->>S: Cierra la sesión: "Tu sesión venció"
    end
  end
  S->>A: Pedido con Authorization: Bearer access
```

- Varios pedidos a la vez comparten **una sola renovación**.
- Errores temporales (408, 429, 5xx) se reintentan hasta **3 veces** con espera creciente; útil
  cuando Render está despertando.
- **Cerrar sesión** revoca el refresh token en la API y borra la sesión del dispositivo; los datos
  quedan en la cuenta.

## Estados de la sesión

```mermaid
stateDiagram-v2
  [*] --> Invitado
  Invitado --> Activa: inicia sesión
  Activa --> Activa: renueva el access token
  Activa --> Invitado: cierra sesión
  Activa --> Vencida: refresh inválido o reutilizado
  Vencida --> Invitado: aviso "volvé a iniciar sesión"
  Activa --> [*]: borra la cuenta
```
