---
title: Borrado de cuenta
description: Borrar la cuenta desde el sitio o desde Facebook, y qué se borra.
sidebar:
  order: 8
---

## Desde el sitio

```mermaid
sequenceDiagram
  actor P as Persona
  participant S as Tu cuenta
  participant A as API
  participant D as Base de datos

  P->>S: "Borrar mi cuenta"
  S->>P: ¿Seguro? No se puede deshacer
  P->>S: "Sí, borrar todo"
  S->>A: DELETE /me
  A->>D: Lee email e idioma del perfil
  A->>D: Borra la cuenta (en cascada: identidades, sesiones,<br/>valores, historial y cambios de su rol)
  A-)P: Mail "Tu cuenta fue eliminada" (idioma del perfil)
  A-->>S: 204
  S->>S: Cierra la sesión y avisa
```

## Desde Facebook

Meta exige un **callback de borrado de datos**: cuando alguien quita la app desde Facebook, Meta
llama a `POST /auth/facebook/data-deletion` con un pedido firmado.

```mermaid
sequenceDiagram
  participant M as Meta
  participant A as API
  participant D as Base de datos

  M->>A: signed_request (firmado con el secreto de la app)
  A->>A: Verifica la firma
  A->>D: Borra la cuenta vinculada a esa identidad de Facebook
  A-)A: Mail "Tu cuenta fue eliminada" a la persona
  A-->>M: URL de estado + código de confirmación
```

El mail de confirmación sale igual en los dos caminos (ver [Mails](/milimon-docs/como-funciona/mails/)).

- Lo que queda: en la agenda y el registro de roles, "quién hizo el cambio" pasa a `null`.
- Los datos del **dispositivo** (valores, historial local) quedan hasta que la persona los borre o
  limpie el navegador.
