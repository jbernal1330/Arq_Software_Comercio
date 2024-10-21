import { agregarProducto, obtenerInventario } from './inventario.js';

// Cargar inventario desde localStorage al cargar la página
function cargarInventarioDesdeLocalStorage() {
  const inventarioGuardado = localStorage.getItem('inventario');
  if (inventarioGuardado) {
    return JSON.parse(inventarioGuardado); // Convertir de JSON a objeto JavaScript
  }
  return obtenerInventario(); // Si no hay nada en localStorage, usar el inventario original
}

// Guardar inventario en localStorage
function guardarInventarioEnLocalStorage() {
  const inventario = obtenerInventario();
  localStorage.setItem('inventario', JSON.stringify(inventario)); // Convertir el inventario a JSON y guardarlo
  console.log(localStorage.getItem('inventario'));

}

document.getElementById('productoForm').addEventListener('submit', function (e) {
  e.preventDefault();

  let nuevoProducto = {
    id: Date.now(), // Generar un ID único
    name: document.getElementById('nombre').value,
    description: document.getElementById('descripcion').value, // Capturar descripción
    price: parseFloat(document.getElementById('precio').value),
    category: document.getElementById('categoria').value,
    stock: parseInt(document.getElementById('stock').value),  
    image: document.getElementById('imagen').value
  };

  agregarProducto(nuevoProducto);
  guardarInventarioEnLocalStorage();
  alert("Producto agregado exitosamente.");
  document.getElementById('productoForm').reset();
});

