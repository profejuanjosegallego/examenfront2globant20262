<<<<<<< HEAD
# TechStore

Proyecto de catálogo de productos.

## Estructura del proyecto

- index.html
- css/styles.css
- js/app.js
- data/productos.js
- img/

## Funcionalidades

- Muestra 50 productos desde un arreglo JSON.
- Renderiza tarjetas dinámicas con imagen, nombre, categoría, marca, precio, stock y disponibilidad.
- Permite buscar productos por nombre.
- Filtra por categoría.
- Muestra solo productos disponibles.
- Botón flotante para volver al inicio.

## Pagina

https://SaraMassiel.github.io/examenfront2globant20262/
=======
# Examen práctico de Front-End

## Manipulación del DOM y renderizado dinámico de datos

---

## Información general

* **Duración máxima:** 3 horas
* **Modalidad:** Individual
* **Tecnologías permitidas:**

  * HTML5
  * CSS3
  * JavaScript
  * Herramientas de inteligencia artificial generativa
* **Entrega:** Repositorio de GitHub
* **Tema principal:** Manipulación del DOM y carga dinámica de información
* **Valor:** 100 puntos
* **Puntos adicionales:** Hasta 10 puntos

---

# Caso empresarial

## TechStore: catálogo digital de productos tecnológicos

La empresa **TechStore** comercializa productos tecnológicos como computadores, periféricos, dispositivos móviles, accesorios y componentes.

Actualmente, la empresa administra su inventario mediante documentos y hojas de cálculo. Esta situación dificulta la consulta rápida de los productos disponibles y la presentación organizada de la información.

La empresa requiere una aplicación web que permita visualizar su catálogo de productos de forma dinámica.

Para resolver esta necesidad, deberás desarrollar una interfaz web utilizando **HTML, CSS y JavaScript**, en la cual se cargue un conjunto de productos almacenados en formato JSON.

La información no debe escribirse directamente en el HTML. Todos los productos deberán generarse y mostrarse dinámicamente utilizando JavaScript y manipulación del DOM.

---

# Objetivo del examen

Construir una aplicación web que permita:

1. Presentar información general de la empresa.
2. Cargar un conjunto de 50 productos desde un arreglo de objetos JSON.
3. Recorrer el arreglo utilizando JavaScript.
4. Crear elementos HTML dinámicamente.
5. Mostrar los productos en una tabla o en un sistema de tarjetas.
6. Aplicar estilos CSS para construir una interfaz clara, organizada y funcional.
7. Implementar al menos una interacción utilizando eventos del DOM.

---

# Requerimientos

## 1. Estructura del proyecto

El proyecto deberá contener como mínimo la siguiente estructura:

```text
techstore/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── data/
│   └── productos.js
├── img/
│   └── recursos-del-proyecto
└── README.md
```

También se permite utilizar una estructura diferente, siempre que los archivos estén organizados correctamente.

---

## 2. Interfaz gráfica

La aplicación deberá incluir como mínimo las siguientes secciones:

### Encabezado

Debe contener:

* Nombre de la empresa.
* Logotipo, ícono o elemento visual relacionado.
* Título del catálogo.
* Menú de navegación básico o enlaces internos.

### Sección principal

Debe contener:

* Una descripción breve de la empresa.
* Un título para el catálogo.
* Un contador que indique la cantidad de productos cargados.
* Un espacio donde se mostrarán dinámicamente los productos.

### Pie de página

Debe contener:

* Nombre del estudiante.
* Grupo.
* Año.
* Nombre de la institución o programa académico.

---

## 3. Creación del conjunto de datos

Utiliza un agente de inteligencia artificial para generar un arreglo JSON con exactamente **50 productos tecnológicos**.

Cada producto deberá tener como mínimo los siguientes 10 atributos:

```javascript
{
  id: 1,
  nombre: "Teclado mecánico RGB",
  categoria: "Periféricos",
  marca: "Logitech",
  precio: 289900,
  stock: 15,
  proveedor: "Distribuciones Tech SAS",
  fechaIngreso: "2026-07-15",
  disponible: true,
  imagen: "https://..."
}
```

Los 10 atributos obligatorios son:

1. `id`
2. `nombre`
3. `categoria`
4. `marca`
5. `precio`
6. `stock`
7. `proveedor`
8. `fechaIngreso`
9. `disponible`
10. `imagen`

Los productos deben tener información variada y coherente.

No se aceptarán 50 productos completamente idénticos en los que solamente cambie el número del identificador.

---

## Condiciones:

1. El id debe ser único y consecutivo.
2. El precio debe ser un número entero sin símbolos de moneda.
3. El stock debe ser un número entero.
4. El atributo disponible debe ser booleano.
5. La fecha debe usar el formato YYYY-MM-DD.
6. Las categorías deben incluir computadores, periféricos, celulares, accesorios, almacenamiento y componentes.
7. Los nombres, marcas, precios y proveedores deben ser variados.
8. La imagen debe contener una URL válida o una imagen de marcador de posición.
9. Entrega únicamente el arreglo de JavaScript.
10. No agregues explicaciones antes ni después del código.
```

El resultado deberá almacenarse en una constante:

```javascript
const productos = [
  // Los 50 productos
];
```

---

# Restricciones sobre el uso de inteligencia artificial

La inteligencia artificial puede utilizarse para:

* Generar el conjunto de datos.
* Consultar errores de sintaxis.
* Solicitar explicaciones sobre métodos de JavaScript.
* Obtener ideas de diseño.
* Crear imágenes o textos de prueba.

---

# Funcionalidades obligatorias

## 1. Recorrido del arreglo

Los productos deberán recorrerse mediante JavaScript utilizando alguna de las siguientes alternativas:

* `for`
* `forEach()`
* `map()`

No se permite escribir manualmente los 50 productos dentro del archivo HTML.

---

## 2. Creación dinámica de elementos

Los elementos utilizados para mostrar los productos deberán crearse o insertarse dinámicamente desde JavaScript.

Se pueden utilizar instrucciones como:

```javascript
document.createElement();
element.textContent;
element.classList.add();
element.appendChild();
element.append();
```

También se permite utilizar:

```javascript
innerHTML;
```

Sin embargo, se valorará especialmente el uso de métodos propios del DOM como:

* `createElement()`
* `textContent`
* `classList`
* `appendChild()`
* `append()`

---

## 3. Visualización de productos

La información podrá mostrarse utilizando una de las siguientes opciones.

### Opción A: tabla dinámica

La tabla deberá mostrar como mínimo:

* ID.
* Nombre.
* Categoría.
* Marca.
* Precio.
* Stock.
* Disponibilidad.

### Opción B: tarjetas dinámicas

Cada tarjeta deberá mostrar como mínimo:

* Imagen.
* Nombre.
* Categoría.
* Marca.
* Precio.
* Stock.
* Disponibilidad.

El uso de tarjetas correctamente diseñadas otorgará puntos adicionales.



## 5. Disponibilidad

El valor booleano de `disponible` no debe mostrarse solamente como `true` o `false`.

Debe transformarse en un texto comprensible para el usuario.


## 6. Contador de productos

La aplicación deberá mostrar la cantidad de productos cargados.

## 7. Evento obligatorio

La aplicación deberá implementar como mínimo un evento del DOM.

Puedes seleccionar una de las siguientes opciones:

* Botón para mostrar los productos.
* Botón para ocultar los productos.
* Campo para buscar productos por nombre.
* Lista para filtrar productos por categoría.
* Botón para ordenar los productos por precio.
* Botón para mostrar solamente productos disponibles.
* Botón para cambiar entre tabla y tarjetas.
* Botón para consultar los detalles de un producto.

---

# Recomendaciones de implementación

## Selección de elementos

## Función para mostrar productos

## Carga inicial


# Entregables

El repositorio de GitHub deberá contener:

1. `index.html`
2. Archivo CSS.
3. Archivo JavaScript.
4. Archivo con los 50 productos.
5. Carpeta de imágenes, cuando sea necesaria.
6. Archivo `README.md`.
7. Enlace funcional de GitHub Pages.

---


# Criterios de evaluación

| Criterio                   | Descripción                                                           | Puntaje |
| -------------------------- | --------------------------------------------------------------------- | ------: |
| Estructura HTML            | Uso correcto de HTML, etiquetas semánticas y organización general     |      10 |
| Diseño CSS                 | Presentación visual, distribución, legibilidad y coherencia           |      15 |
| Conjunto de datos          | Arreglo con 50 productos y mínimo 10 atributos                        |      10 |
| Recorrido del arreglo      | Uso correcto de ciclos o métodos de arreglos                          |      10 |
| Manipulación del DOM       | Creación, modificación e inserción dinámica de elementos              |      20 |
| Renderizado de información | Visualización correcta de los datos en tabla o estructura equivalente |      10 |
| Eventos                    | Implementación funcional de al menos un evento                        |      10 |
| Organización del código    | Uso de funciones, nombres claros y separación de responsabilidades    |       5 |
| Repositorio                | Organización del repositorio, documentación y GitHub Pages            |       5 |
| Funcionamiento general     | La aplicación carga y funciona sin errores críticos                   |       5 |
| **Total**                  |                                                                       | **100** |

---

# Puntos adicionales

Se podrán obtener hasta **10 puntos adicionales**.

| Mejora implementada                                                       | Puntaje adicional |
| ------------------------------------------------------------------------- | ----------------: |
| Mostrar los productos mediante tarjetas dinámicas correctamente diseñadas |                +4 |
| Implementar búsqueda por nombre                                           |                +2 |
| Implementar filtro por categoría o disponibilidad                         |                +2 |
| Implementar diseño adaptable para dispositivos móviles                    |                +2 |
| **Máximo adicional**                                                      |           **+10** |

Los puntos adicionales no reemplazan los requerimientos obligatorios.



>>>>>>> origin/develop
