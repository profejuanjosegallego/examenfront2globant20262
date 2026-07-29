# Cómo hice mi proyecto - TechStore

## Para qué sirve esto

Es una página web donde se pueden ver 50 productos de tecnología. La empresa TechStore vende cosas como laptops, celulares, teclados, componentes para computadora, etc. Yo hice el catálogo para que se pueda buscar por nombre del producto.

## Qué hice paso a paso

### 1. Primero armé la estructura

Hice el HTML con todas las secciones que pedían: un encabezado con el logo y el nombre de la empresa, una parte bonita de introducción con gradientes, la zona donde van los productos y el footer con mis datos.

### 2. Después cree el CSS con ayuda de el modelo MiMo V2.5 free en OpenCode

entonces usé:
- Grid para acomodar las tarjetas en filas
- Flexbox para los detalles dentro de cada tarjeta
- Una paleta de colores uniforme con sombras y transiciones
- Que se vea bien en el celular también con media queries
- Animaciones cuando pasas el mouse por encima

### 3. Los productos

Armé un arreglo con 50 productos. Cada uno tiene 10 items: id, nombre, categoría, marca, precio, stock, proveedor, fecha de ingreso, si está disponible y la imagen. Las imágenes las saqué de internet usando picsum.photos para que siempre carguen.

### 4. Lo de JavaScript

No escribí los 50 productos en el HTML, sino que los cargo con JavaScript. Hice una función que recorre el arreglo con `forEach` y va creando las tarjetas una por una con `createElement`. También hice una función de búsqueda que usa `filter` para encontrar productos por nombre.

## Qué aprendí

- A crear elementos dinámicamente con el DOM
- A usar `forEach` y `filter` que son súper útiles
- A hacer eventos de búsqueda en tiempo real
- A hacer diseños responsive

## Datos del estudiante

- **Nombre**: Mariana Marín
- **Grupo**: Globant  
- **Institución**: CESDE
- **Año**: 2026