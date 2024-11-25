import { obtenerInventario } from './inventario.js';

// Filtrar productos según el término de búsqueda
document.getElementById('buscarProducto').addEventListener('input', async function () {
  const searchTerm = this.value.toLowerCase();

  // Esperar a obtener los productos
  const productos = await obtenerInventario();

  const resultados = productos.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      (p.category && p.category.toLowerCase().includes(searchTerm))
  );

  renderResultados(resultados);
});

// Renderiza los productos en la tabla
async function renderResultados(productos) {
  const tbody = document.querySelector('.tabla-productos tbody');
  tbody.innerHTML = ''; // Limpia la tabla antes de volver a llenarla

  productos.forEach(product => {
    const row = `
      <tr>
        <td>${product.name}</td>
        <td>${product.description || 'Descripción no disponible'}</td>
        <td>${product.stock}</td>
        <td>${product.price}</td>
        <td>${product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : ''}</td>
        <td>${product.id}</td>
        <td><button class="btn-visualizar" data-id="${product.id}">Visualizar</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  // Asignar evento al botón "Visualizar"
  document.querySelectorAll('.btn-visualizar').forEach(btn => {
    btn.addEventListener('click', async function () {
      const id = parseInt(this.getAttribute('data-id'));
      const productos = await obtenerInventario();
      const producto = productos.find(p => p.id === id);

      if (producto) {
        // Rellenar los campos del formulario con los detalles del producto
        document.getElementById('nombre').value = producto.name;
        document.getElementById('descripcion').value = producto.description;
        document.getElementById('cantidad').value = producto.stock;
        document.getElementById('precio').value = producto.price;
        document.getElementById('tipo').value = producto.category || '';
        document.getElementById('id').value = producto.id;
      }
    });
  });
}

// Obtener y mostrar todos los productos al cargar la página
async function init() {
  const productos = await obtenerInventario();
  renderResultados(productos);
}

// Llamar a la función init al cargar la página
init();
