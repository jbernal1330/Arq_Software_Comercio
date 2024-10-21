import { eliminarProducto, obtenerInventario } from './inventario.js';

// Cargar productos al iniciar la página
window.onload = function() {
  const productos = obtenerInventario();
  renderResultados(productos); // Renderizar todos los productos al cargar la página
};

// Filtrar productos mientras se escribe en el campo de búsqueda
document.getElementById('buscarProducto').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const productos = obtenerInventario();
  const resultados = productos.filter(p => p.name.toLowerCase().includes(searchTerm));

  renderResultados(resultados);
});

// Renderiza los productos en la tabla
function renderResultados(productos) {
  const tbody = document.querySelector('.tabla-productos tbody');
  tbody.innerHTML = ''; // Limpiar la tabla anterior

  productos.forEach(product => {
    const row = `
      <tr>
        <td>${product.name}</td>
        <td>${product.description ? product.description : 'Descripción no disponible'}</td> <!-- Nueva columna de descripción -->
        <td>${product.stock}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>${product.id}</td>
        <td><button class="btn-eliminar" data-id="${product.id}">Eliminar</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  // Asignar evento click a los botones de eliminar
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = parseInt(this.getAttribute('data-id'));
      eliminarProducto(id); // Llamar a la función para eliminar el producto
      alert("Producto eliminado.");
      renderResultados(obtenerInventario()); // Refrescar la tabla después de eliminar
    });
  });
}
