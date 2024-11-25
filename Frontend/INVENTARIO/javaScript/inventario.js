// URL base de la API
const API_URL = 'http://localhost:3000/productos';

// Función para agregar productos al inventario
export async function agregarProducto(producto) {
    producto.description = producto.description || "Descripción no disponible"; // Valor por defecto si no se proporciona
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        });
        if (!response.ok) {
            throw new Error('Error al agregar el producto');
        }
        console.log('Producto agregado con éxito');
    } catch (error) {
        console.error(error);
    }
}

// Función para modificar un producto por su ID
export async function modificarProducto(id, nuevosDatos) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevosDatos),
        });
        if (!response.ok) {
            throw new Error('Error al modificar el producto');
        }
        console.log('Producto modificado con éxito');
    } catch (error) {
        console.error(error);
    }
}

// Función para eliminar un producto por su ID
export async function eliminarProducto(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
        console.log('Producto eliminado con éxito');
    } catch (error) {
        console.error(error);
    }
}

// Función para obtener todos los productos
export async function obtenerInventario() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error(error);
        return [];
    }
}
