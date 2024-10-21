let inventario = JSON.parse(localStorage.getItem('inventario')) || [];


// Función para agregar productos al inventario
// Función para agregar productos al inventario
export function agregarProducto(producto) {
    producto.description = producto.description || "Descripción no disponible"; // Valor por defecto si no se proporciona
    inventario.push(producto);
    localStorage.setItem('inventario', JSON.stringify(inventario));
}


export function modificarProducto(id, nuevosDatos) {
    let inventario = obtenerInventario();

    // Encuentra el producto en el inventario
    let producto = inventario.find(p => p.id === id);

    if (producto) {
        // Actualiza los datos del producto
        Object.assign(producto, nuevosDatos);

        // Guarda el inventario actualizado en localStorage
        localStorage.setItem('inventario', JSON.stringify(inventario));

        // Verificar que los datos se guardaron correctamente
        console.log('Producto modificado:', producto);
    } else {
        console.log('Producto no encontrado con ID:', id);
    }
}



// Función para eliminar un producto por su ID
export function eliminarProducto(id) {
    inventario = inventario.filter(p => p.id !== id);
    localStorage.setItem('inventario', JSON.stringify(inventario)); // Guardar el inventario actualizado en localStorage
}

// Función para obtener todos los productos
export function obtenerInventario() {
    return inventario;
}
