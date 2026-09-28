---
title: Sincronización
description: Del modo invitado a la cuenta, y cómo viajan los cambios.
sidebar:
  order: 3
---

La interfaz siempre lee de los **stores locales** (rápido y sin conexión). Con sesión iniciada, la
cuenta es la fuente de verdad y los cambios se suben solos.

## Al iniciar sesión

```mermaid
flowchart TD
  inicio([Inicia sesión]) --> yaSync{¿Ya se sincronizó<br/>en esta pestaña?}
  yaSync -- sí --> restaurada[restored:<br/>sigue con lo local]
  yaSync -- no --> perfil{¿La cuenta<br/>tiene perfil?}
  perfil -- sí --> bajar[Baja perfil, valores y cálculos<br/>y reemplaza lo local]
  perfil -- no --> datos{¿El dispositivo tiene datos?<br/>valores, cálculos o<br/>moneda distinta de ARS}
  datos -- no --> crear[created:<br/>lo local pasa a ser el perfil]
  datos -- sí --> preguntar[needs-migration:<br/>se le pregunta a la persona]
  preguntar -- Importar --> subir[Sube todo lo local a la cuenta]
  preguntar -- Empezar de cero --> limpio[Cuenta vacía,<br/>se descarta lo local]
  bajar --> escuchar
  crear --> escuchar
  subir --> escuchar
  limpio --> escuchar
  restaurada --> escuchar
  escuchar([Escucha cambios locales])
```

## Mientras la sesión está abierta

```mermaid
sequenceDiagram
  participant UI as Calculadora / preferencias
  participant St as Stores (zustand)
  participant Sy as Sincronización
  participant A as API

  UI->>St: Cambia un valor
  St-->>Sy: Aviso de cambio
  Sy->>Sy: Espera 800 ms (junta cambios seguidos)
  Sy->>A: PUT /me/profile · /me/drafts/:formula · /me/history/:id
  Note over Sy,A: Si falla se reintenta, sin bloquear la UI
```

- **Moneda, idioma y tema** → perfil. **Valores de cada calculadora** → borradores.
  **Cálculos guardados** → historial (hasta 15).
- Al **cerrar sesión**, el dispositivo vuelve al modo invitado sin los datos de la cuenta.
