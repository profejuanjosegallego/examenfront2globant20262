## Generado/Logorado

En este proyecto se trabajo una tienda tecnologia la cual el deber del desarrolador es poder mostrar de manera correcta los productos

La solucion tecnica que se encontro fue la siguiente: 

* Mediante un javaScript se crearon dos funciones/metood que hacian o lo siguiente:
- Para el metodo mostrarProductos() : Se utilizo un forEach para recorrer el arreglo Json llamado products.js que se comportaba como base de datos mokeada para simular estos productos, este metodo recibia como variable global productos llamado (Lista) mediante el Script en el index para acceder a estos datos,  dentro de este metodo mostrarProductos() encontraremos el forEach que recorrerir el arreglo para agregar tarjetas dentro de un contenedor general estas tarjetas estan constituidas por un cuerpo(titulo, categoria, marca, precio, stock, estado) y una imagen 
- Para el metodo buscarProductos() : Este metodo utilizamos principalmente el texto y el resultado, tomamos validaciones en el texto y filtramos en el resultado para luego de esto retornar y mostrar el resultado deseado
- Para finalizar este JavaScript llamamos con un addEventListener los productos buscados y filtrados y el metodo mostrarProducto() para poder ver reflejados estos cambios 

# Gracias por tanto, perdon por tan poco 