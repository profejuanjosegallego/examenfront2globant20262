## Cómo he construído el proyecto:

1. Primero organicé los archivos en carpetas para que todo quede claro:
   - `techStore/src/html/` para las páginas HTML.
   - `techStore/src/css/` para los estilos.
   - `techStore/src/js/` para el código JavaScript.
   - `techStore/assets/data/` para los datos de los productos en formato JSON (importante, ya que luego hice el arreglo de productos en un archivo javaScript).

2. Después escribí la página del catálogo (`index.html`). Aquí quería que el usuario vea todos los productos, pueda filtrar por categoría y buscar por nombre.
   - Cada producto se muestra con su nombre, precio, stock y categoría.
   - El diseño usa clases sencillas y responsivas para que funcione bien en pantalla grande y en móvil. (Me costó).

3. Agregué una página de compra (`compra.html`). En esta página el usuario puede:
   - Ver la información detallada del producto.
   - Completar un formulario con su nombre, correo, teléfono, dirección y ciudad.
   - Elegir cantidad, método de pago y tipo de envío.
   - Guardar un borrador o agregar el producto al carrito.
   - Confirmar la compra desde la misma página.

4. También creé una página de carrito (`carrito.html`) que muestra los productos añadidos:
   - El carrito guarda información en `localStorage` para que el usuario no la pierda al recargar.
   - Se puede cambiar la cantidad de cada producto o eliminarlo.
   - Hay un botón para confirmar la compra de todo el carrito.

5. Para los datos de los productos usé archivos JSON en `assets/data/`.
   - Separé los productos en dos categorías: `electronics` y `electrodomestics` (electrónicos y electrodomésticos).
   - Cada archivo incluye propiedades como `id`, `nombre`, `categoria`, `marca`, `precio`, `stock`, `imagen` y atributos extra que añadí para incluír un poco más de variedad en las descripciones.
   - Son un total de 120. 10 Productos para cada una de las 12 categorías.

6. En JavaScript estructuré el proyecto en módulos para que el código no quede mezclado:
   - `products.js` carga los datos desde los JSON, normaliza los productos y aplica ajustes de stock.
   - `cart-utils.js` maneja el carrito en `localStorage`: agregar, actualizar, eliminar y calcular totales. (Me tardó menos de lo que pensaba, porque lo más difícil fue products, compra y carrito).
   - `compra.js` controla la vista de compra, valida el formulario y administra el botón de agregar al carrito.
   - `carrito.js` controla la página del carrito y confirma la compra.
   - `app.js` controla la página de catálogo y muestra avisos cuando se vuelve del carrito o de una compra.

## Por qué tomé estas decisiones

- Organicé el código en varios archivos porque eso hace más fácil entender y corregir cada funcionalidad por separado. Además, me gusta trabajar con un Json aparte aprovechando que aprendí la clase pasada el cómo exportar e importar.
- Guardar datos en `localStorage` ayuda a simular un comportamiento real de tienda sin servidor, porque el usuario puede recargar la página y seguir viendo su carrito. Además de que como no hay un back se puede mantener la información así únicamente de forma demostrativa.
- Validé el formulario antes de permitir agregar al carrito o confirmar la compra. Si no se llena bien, el usuario recibe un mensaje y no puede avanzar.
No funciona con un Tray como otros E-Commerces porque no me dió para desarrollar uno (tristemente).
- Hice que el stock se actualice cuando se confirma una compra. Esto evita que se agreguen más productos de los que hay disponibles.
- Cuando una compra se confirma, el usuario vuelve al catálogo y ve una notificación clarita. Eso mejora la experiencia y muestra que la acción se realizó.