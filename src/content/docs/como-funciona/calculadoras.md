---
title: Calculadoras
description: De la fórmula pura a la pantalla, el desarrollo de la cuenta y el historial.
sidebar:
  order: 4
---

Cada fórmula (desperdicio, factor de desperdicio, merma de cocción, costo de receta, precio de
carta, punto de equilibrio, reglas de Omnes…) se escribe **una sola vez** y de ahí salen el menú,
su página y la calculadora.

```mermaid
flowchart LR
  formula["Fórmula pura<br/>src/utils/formulas"] --> registry["registry.ts<br/>id, campos, unidades"]
  textos["Textos es/en<br/>src/i18n/formulas/&lt;id&gt;"] --> pagina
  registry --> pagina["Página de la fórmula<br/>/formulas/&lt;id&gt;"]
  registry --> general["Calculadora general<br/>/calculator?tool=&lt;id&gt;"]
  registry --> menu[Menú]
  pagina --> isla["Isla de la calculadora"]
  general --> isla
  isla --> borrador[("Últimos valores<br/>store drafts")]
  isla --> resultado["Resultado + desarrollo<br/>de la cuenta paso a paso"]
  resultado -- Guardar --> historial[("Historial<br/>hasta 15")]
  historial -- Abrir en la calculadora --> isla
```

## Cómo se calcula

1. La persona escribe los valores; los campos aceptan coma o punto según el idioma y solo números.
2. La fórmula pura recibe números y devuelve el resultado y cada paso intermedio.
3. El resultado se muestra con la **moneda elegida** (solo cambia el símbolo, no convierte).
4. "Probar este ejemplo" carga el ejemplo propio del sitio (el café de barrio).

## Calidad

- Cada fórmula tiene tests con ejemplos resueltos **a mano**, no con el propio código.
- Los ejemplos, números y textos son propios; el material del curso es solo referencia de conceptos.
