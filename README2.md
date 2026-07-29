Proyecto para TechStore con un panel dinamico para la visualizacion de productos 


Primero se manejo los datos, por medio de cloude para generar los 50 registros de productos varios, se tuvieron que hacer correcciones en las categorias y el formato de fechas, pero la lista final fue un JSon con los productos que cumplen todas las condiciones

Se verifico importo/exporto los datos mostrandolos en consola sin problema 

Se generaron los headers- footer y la informacion "sobre nosotros" dentro de cada seccion, la imagen slogan navbar y la informacion del footer es propia, el cuerpo de la seccion "Sobre nosotros" fue rellenada con una inteligencia artificial

Siguiente se creo el titulo de la seccion de productos, y el codigo para mostrar los productos unicos totales 

Se genero el codigo para mostrar todos los productos con sus imagenes y la informaicon de cada uno, se genero una funcion donde se envian los productos uno pr uno y la funcion se encarga de generar la tarjeta y devolverla poniendola en la columna, funciona llamada: crearTarjetaProducto

Despues se genero el css y los estilos para cada seccion, algunos con el framework de bootstrap otros con css nativo dependiendo de su uso, pues boostrap no existe para eliminar el css sino para complementarlo (tuve que revisar eso)

Se genero el input para buscar, por ende todo el codigo de mostrar se paso como funcion que recibe una lista como parametro, Cuando esta vacio o carga por primera vez la lista que se envia es la lista de productos total, en caso de que se escriba algo en el input el filter genera una nueva lista y esa es la que se enviara para mostrar

Por ultimo se hizo valido los enlaces en la barra de navegacion a cada seccion de la pagina 

Autor: Kevin Balvin 