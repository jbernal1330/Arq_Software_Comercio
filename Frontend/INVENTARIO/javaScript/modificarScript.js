import { modificarProducto, obtenerInventario } from './inventario.js';

document.getElementById('productoForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevenir que se recargue la página

  // Obtén el ID del producto que se está modificando
  const id = parseInt(document.getElementById('id').value);

  // Crear el objeto con los nuevos datos del producto
  const nuevosDatos = {
    name: document.getElementById('nombre').value,
    stock: parseInt(document.getElementById('cantidad').value),
    price: parseFloat(document.getElementById('precio').value),
    category: document.getElementById('tipo').value,
    description: document.getElementById('descripcion').value // Actualizar la descripción
  };

  // Verifica los nuevos datos antes de modificarlos
  console.log('Nuevos datos:', nuevosDatos);

  // Llama a la función para modificar el producto en el inventario
  modificarProducto(id, nuevosDatos);

  // Verifica si el producto ha sido modificado en localStorage
  console.log('Inventario actualizado:', obtenerInventario());

  // Muestra un mensaje de éxito
  alert("Producto modificado exitosamente.");

  // Refresca la tabla para mostrar los productos actualizados
  renderResultados(obtenerInventario());
});

function renderResultados(productos) {
  const tbody = document.querySelector('.tabla-productos tbody');
  tbody.innerHTML = ''; // Limpia la tabla antes de volver a llenarla

  if (productos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7">No se encontraron productos.</td></tr>';
  } else {
    productos.forEach(product => {
      const row = `
        <tr>
          <td>${product.name}</td>
          <td>${product.description ? product.description : 'Descripción no disponible'}</td> <!-- Mostrar descripción -->
          <td>${product.stock}</td>
          <td>${product.price}</td>
          <td>${product.category}</td>
          <td>${product.id}</td>
          <td><button class="btn-visualizar" data-id="${product.id}">Visualizar</button></td>
        </tr>
      `;
      tbody.innerHTML += row;
    });

    // Asegúrate de que el botón "Visualizar" funcione correctamente
    document.querySelectorAll('.btn-visualizar').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = parseInt(this.getAttribute('data-id'));
        const producto = obtenerInventario().find(p => p.id === id);

        // Rellenar los campos del formulario con los detalles del producto
        document.getElementById('nombre').value = producto.name;
        document.getElementById('descripcion').value = producto.description; // Mostrar descripción
        document.getElementById('cantidad').value = producto.stock;
        document.getElementById('precio').value = producto.price;
        document.getElementById('tipo').value = producto.category;
        document.getElementById('id').value = producto.id;
      });
    });
  }
}

// Llamar a la función para mostrar todos los productos al cargar la página
renderResultados(obtenerInventario());
