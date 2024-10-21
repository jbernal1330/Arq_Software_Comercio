import { obtenerInventario } from './inventario.js';

// Filtrar productos según el término de búsqueda
document.getElementById('buscarProducto').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const productos = obtenerInventario();
  
  const resultados = productos.filter(p => 
    p.name.toLowerCase().includes(searchTerm) || 
    p.category.toLowerCase().includes(searchTerm)
  );

  renderResultados(resultados); // Renderizar los productos filtrados
});

// Renderiza los productos en la tabla
function renderResultados(productos) {
  const tbody = document.querySelector('.tabla-productos tbody');
  tbody.innerHTML = ''; // Limpia la tabla antes de volver a llenarla

  productos.forEach(product => {
    const row = `
      <tr>
        <td>${product.name}</td>
        <td>${product.description ? product.description : 'Descripción no disponible'}</td> <!-- Descripción después del nombre -->
        <td>${product.stock}</td>
        <td>${product.price}</td>
        <td>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
        <td>${product.id}</td>
        <td><button class="btn-visualizar" data-id="${product.id}">Visualizar</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  // Asegúrate de que el botón "Visualizar" esté funcionando
  document.querySelectorAll('.btn-visualizar').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = parseInt(this.getAttribute('data-id'));
      const producto = obtenerInventario().find(p => p.id === id);

      // Rellenar los campos del formulario con los detalles del producto
      document.getElementById('nombre').value = producto.name;
      document.getElementById('descripcion').value = producto.description;
      document.getElementById('cantidad').value = producto.stock;
      document.getElementById('precio').value = producto.price;
      document.getElementById('tipo').value = producto.category;
      document.getElementById('id').value = producto.id;
    });
  });
}

// Obtener y mostrar todos los productos al cargar la página
const productos = obtenerInventario();
renderResultados(productos);

// Mostrar el inventario en la consola para depuración
console.log(productos);

// Llamar a la función renderResultados al cargar la página para mostrar todos los productos
renderResultados(obtenerInventario());
