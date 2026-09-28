---
title: Roles
description: Usuario, editor y admin; el primer admin y cómo cambia un rol.
sidebar:
  order: 5
---

| Rol         | Puede                                                                        |
| ----------- | ---------------------------------------------------------------------------- |
| **Usuario** | Usar el sitio y su cuenta (todas las personas empiezan así)                  |
| **Editor**  | Lo anterior + **Gestión del sitio**: agenda, guía de fotos, sugerencias, CMS |
| **Admin**   | Lo anterior + ver cuentas y cambiar roles                                    |

La **fuente de verdad es la base de datos**: la API vuelve a leer el rol en cada pedido de
administración, así que un cambio aplica en el momento.

## El primer admin

```mermaid
flowchart TD
  entra([Inicia sesión]) --> verificado{¿Email verificado<br/>por el proveedor?}
  verificado -- no --> usuario[Queda como usuario]
  verificado -- sí --> lista{¿Está en<br/>BOOTSTRAP_ADMIN_EMAILS?}
  lista -- no --> usuario
  lista -- sí --> historial{¿Tiene algún cambio<br/>de rol registrado?}
  historial -- sí --> base[Manda la base:<br/>no se toca]
  historial -- no --> admin[Pasa a admin<br/>y se registra 'bootstrap']
```

Sacar un email de la variable **no le quita el rol a nadie**: desde el primer cambio, todo se
maneja desde el panel.

## Cambiar un rol

```mermaid
sequenceDiagram
  actor Ad as Admin
  participant P as Panel de gestión
  participant A as API
  participant D as Base de datos

  Ad->>P: Elige el rol nuevo de una cuenta
  P->>Ad: Confirmación en un diálogo
  Ad->>P: Confirma
  P->>A: PATCH /admin/users/:id/role
  A->>D: Transacción: bloquea a los admins y a la cuenta
  alt Es su propio rol
    A-->>P: 400 "No podés cambiar tu propio rol"
  else Quitaría el último admin
    A-->>P: 409 "Tiene que quedar al menos una cuenta admin"
  else Válido
    A->>D: Cambia el rol y registra quién, a quién, de qué a qué y cuándo
    A-->>P: Cuenta actualizada
  end
```

- En el sitio, el menú **Gestión del sitio** y el zócalo **Modo gestión** aparecen solo para
  editores y admins.
