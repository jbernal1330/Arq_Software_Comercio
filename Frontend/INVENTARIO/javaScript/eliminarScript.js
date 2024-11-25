import { eliminarProducto, obtenerInventario } from './inventario.js';

// Cargar productos al iniciar la página
window.onload = async function() {
  const productos = await obtenerInventario();
  renderResultados(productos);
};

// Filtrar productos mientras se escribe en el campo de búsqueda
document.getElementById('buscarProducto').addEventListener('input', async function () {
  const searchTerm = this.value.toLowerCase();
  const productos = await obtenerInventario();
  const resultados = productos.filter(p => p.name.toLowerCase().includes(searchTerm));

  renderResultados(resultados);
});

// Renderiza los productos en la tabla
async function renderResultados(productos) {
  const tbody = document.querySelector('.tabla-productos tbody');
  tbody.innerHTML = ''; // Limpiar la tabla anterior

  if (productos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7">No se encontraron productos.</td></tr>';
  } else {
    productos.forEach(product => {
      const row = `
        <tr>
          <td>${product.name}</td>
          <td>${product.description || 'Descripción no disponible'}</td>
          <td>${product.stock}</td>
          <td>${product.price}</td>
          <td>${product.category || ''}</td>
          <td>${product.id}</td>
          <td><button class="btn-eliminar" data-id="${product.id}">Eliminar</button></td>
        </tr>
      `;
      tbody.innerHTML += row;
    });

    // Asignar evento click a los botones de eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', async function () {
        const id = parseInt(this.getAttribute('data-id'));
        await eliminarProducto(id);
        alert("Producto eliminado.");
        const productosActualizados = await obtenerInventario();
        renderResultados(productosActualizados);
      });
    });
  }
}
