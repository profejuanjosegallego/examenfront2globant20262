const test = require('node:test');
const assert = require('node:assert/strict');

const { filtrarProductos } = require('../assets/js/app.js');

test('filtra productos disponibles y por búsqueda', () => {
  const productos = [
    { id: 1, nombre: 'Laptop Pro', categoria: 'computadores', disponible: true },
    { id: 2, nombre: 'Mouse Gamer', categoria: 'periféricos', disponible: false },
    { id: 3, nombre: 'Teclado Mecánico', categoria: 'periféricos', disponible: true }
  ];

  assert.deepEqual(
    filtrarProductos(productos, { mostrarSoloDisponibles: true, textoBusqueda: '' }),
    [productos[0], productos[2]]
  );

  assert.deepEqual(
    filtrarProductos(productos, { mostrarSoloDisponibles: false, textoBusqueda: 'periféricos' }),
    [productos[1], productos[2]]
  );

  assert.deepEqual(
    filtrarProductos(productos, { mostrarSoloDisponibles: true, textoBusqueda: 'laptop' }),
    [productos[0]]
  );
});
