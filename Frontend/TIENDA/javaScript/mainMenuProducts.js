(async function() {
  let cart = [];
  let totalPrice = 0;

  const API_GATEWAY_URL = 'http://localhost:8080'; // URL base del gateway

  // Función para obtener el inventario desde el gateway
  async function obtenerInventario() {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/api/inventario`);
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

  async function consultarProducto(productId) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/api/inventario/${productId}`);
      if (!response.ok) {
        throw new Error('Error al consultar el producto');
      }
      const product = await response.json();
      console.log('Detalles del producto:', product);
      return product;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function enviarOrden(order) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/api/ordenes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        throw new Error('Error al enviar la orden');
      }
      console.log('Orden enviada con éxito');
    } catch (error) {
      console.error(error);
    }
  }

  async function procesarPago(paymentData) {
    try {
      const response = await fetch(`${API_GATEWAY_URL}/api/pagos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      if (!response.ok) {
        throw new Error('Error al procesar el pago');
      }
      console.log('Pago procesado con éxito');
    } catch (error) {
      console.error(error);
    }
  }

  const products = await obtenerInventario();
  // Mostrar todos los productos al cargar la página
  renderProducts(products);

  function renderProducts(productList) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    productList.forEach(product => {
      // Crear el elemento de la tarjeta del producto
      const productCard = document.createElement('div');
      productCard.classList.add('card');

      // Agregar evento de clic para consultar el producto
      productCard.addEventListener('click', async function() {
        const detalles = await consultarProducto(product.id);
        console.log('Detalles del producto mostrados en el modal:', detalles);
      });

      // Crear y configurar la imagen del producto
      const productImage = document.createElement('img');
      productImage.src = product.image || '../images/default-product.jpg'; // Ruta a imagen por defecto
      productImage.alt = product.name;

      // Crear y configurar el nombre del producto
      const productName = document.createElement('h3');
      productName.textContent = product.name;

      // Crear y configurar el precio del producto
      const productPrice = document.createElement('p');
      productPrice.textContent = `$${product.price}`;

      // Añadir elementos a la tarjeta del producto
      productCard.appendChild(productImage);
      productCard.appendChild(productName);
      productCard.appendChild(productPrice);

      // Añadir la tarjeta al contenedor de productos
      productGrid.appendChild(productCard);
    });
  }

  // Función para filtrar productos por categoría
  function filterProducts(category) {
    const filteredProducts = products.filter(product =>
        product.category && product.category.toLowerCase() === category.toLowerCase()
    );
    renderProducts(filteredProducts);
  }

  window.filterProducts = filterProducts;

  // Función para expandir el producto en el modal
  function expandProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      // Actualizar los datos del modal con la información del producto
      document.getElementById('modal-name').innerText = product.name;
      document.getElementById('modal-price').innerText = `$${product.price}`;
      document.getElementById('modal-description').innerText = product.description || 'Descripción no disponible';
      document.getElementById('modal-img').src = product.image || '../images/default-product.jpg';
      document.getElementById('modal-stock').innerText = `Stock disponible: ${product.stock}`;

      // Reiniciar la cantidad a 1
      document.getElementById('quantity-number').innerText = '1';

      // Mostrar el modal
      document.getElementById('modal').classList.remove('hidden');

      // Asocia el evento "click" al botón de "Añadir al carrito" dentro del modal
      document.getElementById('add-to-cart').addEventListener('click', function() {
        const productId = document.getElementById('modal-id').value;
        const quantity = parseInt(document.getElementById('quantity-number').innerText);
        const product = products.find(p => p.id === productId);

        if (product) {
          cart.push({ id: productId, name: product.name, quantity, price: product.price });
          console.log('Producto agregado al carrito:', product);
          enviarOrden({ productId, quantity }); // Enviar orden al microservicio de órdenes
        }
      });
    }
  }


  // Hacer expandProduct accesible globalmente si es necesario
  window.expandProduct = expandProduct;

  // Añadir el evento de clic al botón de cierre del modal
  document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('modal').classList.add('hidden');
  });

  // Opcional: Cerrar el modal al hacer clic fuera del contenido
  document.getElementById('modal').addEventListener('click', function (event) {
    if (event.target.id === 'modal') {
      this.classList.add('hidden');
    }
  });

  // Función para actualizar la interfaz del carrito y mostrar el precio total
  function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = ''; // Limpiar el carrito
    totalPrice = 0; // Reiniciar el total

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      // Crear elementos DOM para el carrito
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');

      const itemInfo = document.createElement('div');
      itemInfo.classList.add('item-info');

      const itemName = document.createElement('span');
      itemName.classList.add('item-name');
      itemName.textContent = `${item.name} (x${item.quantity})`;

      const itemPrice = document.createElement('span');
      itemPrice.classList.add('item-price');
      itemPrice.textContent = `$${itemTotal.toFixed(2)}`;

      itemInfo.appendChild(itemName);
      itemInfo.appendChild(itemPrice);

      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-item');
      removeButton.textContent = 'Eliminar';
      removeButton.addEventListener('click', function(event) {
        removeFromCart(item.id, event);
      });

      cartItem.appendChild(itemInfo);
      cartItem.appendChild(removeButton);

      cartItems.appendChild(cartItem);
    });

    // Mostrar el precio total
    document.getElementById('cart-total-price').innerText = `Total: $${totalPrice.toFixed(2)}`;
  }

  // Función para eliminar un producto del carrito
  function removeFromCart(productId, event) {
    event.stopPropagation();
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
  }

  // Hacer removeFromCart accesible globalmente si es necesario
  window.removeFromCart = removeFromCart;

  // Función para mostrar u ocultar el carrito
  function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('open');
  }

  // Hacer toggleCart accesible globalmente
  window.toggleCart = toggleCart;

  // Evento para el botón de refrescar productos
  document.getElementById('refresh-btn').addEventListener('click', () => {
    renderProducts(products);
  });

  // Lógica para incrementar y decrementar la cantidad
  document.getElementById('increase-quantity').addEventListener('click', () => {
    const quantityElem = document.getElementById('quantity-number');
    let quantity = parseInt(quantityElem.innerText);
    quantityElem.innerText = ++quantity;
  });

  document.getElementById('decrease-quantity').addEventListener('click', () => {
    const quantityElem = document.getElementById('quantity-number');
    let quantity = parseInt(quantityElem.innerText);
    if (quantity > 1) {
      quantityElem.innerText = --quantity;
    }
  });

  // Cerrar la barra lateral del carrito al hacer clic fuera
  document.addEventListener('click', function (event) {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartIcon = document.querySelector('.cart-icon');
    const isClickInsideCart = cartSidebar.contains(event.target);
    const isClickOnCartIcon = cartIcon.contains(event.target);

    if (!isClickInsideCart && !isClickOnCartIcon && cartSidebar.classList.contains('open')) {
      cartSidebar.classList.remove('open');
    }
  });

  // Función para mostrar el mensaje de éxito con transición suave
  function showSuccessMessage() {
    const message = document.getElementById('success-message');
    message.classList.remove('hidden');
    message.style.opacity = '1';

    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => {
        message.classList.add('hidden');
      }, 500);
    }, 2000);
  }

  // Mostrar formulario de pago al hacer clic en "Proceder al pago"
  document.getElementById('checkout-button').addEventListener('click', function() {
    const paymentData = { cart, totalPrice };
    procesarPago(paymentData); // Enviar datos al microservicio de pagos
  });

  // Procesar el pago y generar factura
  function processPayment() {
    const form = document.getElementById('payment-form');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (name && email) {
      form.style.display = 'none';
      generateInvoice(name, email);
    } else {
      alert('Por favor ingresa tu nombre y correo electrónico');
    }
  }

  // Hacer processPayment accesible globalmente
  window.processPayment = processPayment;

  // Función para generar la factura en PDF
  function generateInvoice(name, email) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Aquí agregarías el código para generar la factura

    // Guardar la factura como PDF
    doc.save("factura.pdf");
  }

  // Función para cerrar el formulario de pago
  function closePaymentForm() {
    document.getElementById('payment-form').style.display = 'none';
  }

  // Hacer closePaymentForm accesible globalmente
  window.closePaymentForm = closePaymentForm;

})();
