import { agregarProducto, obtenerInventario } from './inventario.js';

// Cargar productos desde el backend al iniciar la página
async function cargarInventarioDesdeBackend() {
  const inventario = await obtenerInventario();
  console.log('Inventario cargado:', inventario);
}

// Guardar producto en el backend
document.getElementById('productoForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  let nuevoProducto = {
    name: document.getElementById('nombre').value,
    description: document.getElementById('descripcion').value,
    price: parseFloat(document.getElementById('precio').value),
    stock: parseInt(document.getElementById('stock').value),
    category: document.getElementById('categoria').value,
    image: document.getElementById('imagen').value // Capturando la URL de la imagen
  };

  // Llamar a la API para agregar el producto
  await agregarProducto(nuevoProducto);
  alert("Producto agregado exitosamente.");

  // Limpiar el formulario
  document.getElementById('productoForm').reset();

  // Actualizar el inventario en la página
  cargarInventarioDesdeBackend();
});

// Cargar inventario inicial
cargarInventarioDesdeBackend();
