import { obtenerInventario } from '../../INVENTARIO/javaScript/inventario.js';


console.log(obtenerInventario());


let cart = [];
let totalPrice = 0;

const products = obtenerInventario();

function renderProducts(productList) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; 
    productList.forEach(product => {
        const productCard = `
            <div class="card" onclick="expandProduct(${product.id})">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });
}

// Function to filter products by category
// Function to filter products by category
function filterProducts(category) {
  // Asegúrate de que las categorías sean exactas
  const filteredProducts = obtenerInventario().filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
  renderProducts(filteredProducts);
}
// Ejemplo de cómo filtrar los productos de la categoría "celular"
filterProducts('celular');

// Ejemplo para "televisor"
filterProducts('televisor');

// Ejemplo para "lavadora"
filterProducts('lavadora');

// Ejemplo para "accesorio"
filterProducts('accesorio');

// Ejemplo para "electromésticos"
filterProducts('electromésticos');


window.filterProducts = filterProducts;


// Show all products on page load
renderProducts(products);

// Function to expand the product in the modal
function expandProduct(productId) {
  const product = obtenerInventario().find(p => p.id === productId);
  if (product) {
    // Actualizar los datos del modal con la información del producto
    document.getElementById('modal-name').innerText = product.name;
    document.getElementById('modal-price').innerText = `$${product.price}`;
    document.getElementById('modal-description').innerText = product.description;
    document.getElementById('modal-img').src = product.image;

    // Mostrar el modal
    document.getElementById('modal').classList.remove('hidden');

    // Asocia el evento "click" al botón de "Añadir al carrito" dentro del modal
    document.getElementById('add-to-cart').onclick = function() {
      const quantity = parseInt(document.getElementById('quantity-number').innerText);
      const cartItem = cart.find(item => item.id === productId);

      // Verificar si el artículo ya está en el carrito
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          quantity: quantity
        });
      }

      updateCartUI(); // Actualizar la interfaz del carrito y el total
      showSuccessMessage(); // Mostrar el mensaje de éxito
    };
  }
}


window.expandProduct = expandProduct;

// Close the modal when clicking outside the box
document.getElementById('modal').addEventListener('click', function (event) {
  const modalContent = document.querySelector('.modal-content');
  if (!modalContent.contains(event.target)) {
    document.getElementById('modal').classList.add('hidden');
  }
});

// Function to update the cart UI and show the total price
function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartItems.innerHTML = ''; // Clear cart display
  totalPrice = 0; // Reset total

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    const cartItem = `
      <div class="cart-item">
        <div class="item-info">
          <span class="item-name">${item.name} (x${item.quantity})</span>
          <span class="item-price">$${itemTotal.toFixed(2)}</span>
        </div>
        <button class="remove-item" onclick="removeFromCart(${item.id}, event)">Eliminar</button>
      </div>
    `;
    cartItems.innerHTML += cartItem;
  });

  // Display the total price of all items
  document.getElementById('cart-total-price').innerText = `Total: $${totalPrice.toFixed(2)}`;
}


// Function to add product to the cart
document.getElementById('add-to-cart').addEventListener('click', () => {
  const productId = parseInt(document.querySelector('.modal-content').getAttribute('data-product-id'));
  const product = products.find(p => p.id === productId);
  const quantity = parseInt(document.getElementById('quantity-number').innerText);

  // Verificar si el artículo ya está en el carrito
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('$', '')),
      quantity: quantity
    });
  }

  updateCartUI(); // Actualizar la interfaz del carrito y el total
  showSuccessMessage(); // Mostrar el mensaje de éxito
});

// Remove product from cart without closing sidebar
function removeFromCart(productId, event) {
  // Prevent the event from bubbling up (which may close the sidebar)
  event.stopPropagation();

  // Filter out the product from the cart
  cart = cart.filter(item => item.id !== productId);

  // Update the cart UI and total
  updateCartUI();
}

window.removeFromCart = removeFromCart;

// Make sure this function is not causing the sidebar to close
function toggleCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.classList.toggle('open');
}

window.toggleCart = toggleCart;


// Add event listener for the refresh button to show all products
document.getElementById('refresh-btn').addEventListener('click', () => {
  renderProducts(products); // Render all products when refresh is clicked
});

// Quantity increase and decrease logic
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

// Cerrar la barra lateral solo si el clic no es en un botón de eliminar
document.addEventListener('click', function (event) {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartIcon = document.querySelector('.cart-icon');
  const isClickInsideCart = cartSidebar.contains(event.target);
  const isClickOnCartIcon = cartIcon.contains(event.target);

  // Check if the click occurred outside the cart and not on the cart icon
  if (!isClickInsideCart && !isClickOnCartIcon && cartSidebar.classList.contains('open')) {
    cartSidebar.classList.remove('open');
  }
});
// Función para mostrar el mensaje de éxito con transición suave
function showSuccessMessage() {
  const message = document.getElementById('success-message');
  message.classList.remove('hidden');
  message.style.opacity = '1';  // Hacer que el mensaje sea completamente visible

  // Desvanecer el mensaje después de 2 segundos
  setTimeout(() => {
    message.style.opacity = '0';  // Desvanecer
    setTimeout(() => {
      message.classList.add('hidden');
    }, 500);  // Espera a que termine la transición
  }, 2000);
}

// Show payment form when 'Proceder al pago' is clicked
document.getElementById('checkout-button').addEventListener('click', function () {
  document.getElementById('payment-form').style.display = 'block';
});

// Hide payment form after processing payment
function processPayment() {
  const form = document.getElementById('payment-form');
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (name && email) {
    form.style.display = 'none';
    generateInvoice(name, email);
  } else {
    alert('Please enter your name and email');
  }
}

window.processPayment = processPayment;

// Example of a function to generate a PDF invoice
function generateInvoice(name, email) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Set document margins and initial positioning
  const leftMargin = 15;
  let yPosition = 20;

  // Add company name and invoice header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text("E-lovers", leftMargin, yPosition);

  // Add invoice number and date
  doc.setFontSize(12);
  doc.text(`Factura #: INV-001`, 150, yPosition);
  doc.text(`Fecha: ${new Date().toISOString().slice(0, 10)}`, 150, yPosition + 5);

  yPosition += 15; // Move down after the header

  // Add buyer info section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("Facturado a:", leftMargin, yPosition);
  yPosition += 7;
  doc.setFont('helvetica', 'normal');
  doc.text(name, leftMargin, yPosition);
  yPosition += 5;
  doc.text(email, leftMargin, yPosition);

  yPosition += 10; // Move down before listing items

  // Add payment details section
  doc.setFont('helvetica', 'bold');
  doc.text("Detalles de pago:", leftMargin, yPosition);
  yPosition += 7;
  doc.setFont('helvetica', 'normal');
  doc.text("Método de pago: Tarjeta de crédito", leftMargin, yPosition);
  yPosition += 5;
  doc.text(`Fecha de vencimiento: ${new Date().toISOString().slice(0, 10)}`, leftMargin, yPosition);

  yPosition += 10; // Move down before the product table

  // Add product table header
  doc.setFont('helvetica', 'bold');
  doc.text("Descripción", leftMargin, yPosition);
  doc.text("Cantidad", 100, yPosition);
  doc.text("Precio unitario", 130, yPosition);
  doc.text("Total", 170, yPosition);

  yPosition += 7;

  doc.setLineWidth(0.5);
  doc.line(leftMargin, yPosition, 195, yPosition); // Horizontal line under the table header
  yPosition += 5;

  // Add product rows
  doc.setFont('helvetica', 'normal');
  cart.forEach(item => {
      const itemTotal = item.price * item.quantity;

      doc.text(item.name, leftMargin, yPosition);
      doc.text(`${item.quantity}`, 110, yPosition, { align: 'right' });
      doc.text(`$${item.price.toFixed(2)}`, 140, yPosition, { align: 'right' });
      doc.text(`$${itemTotal.toFixed(2)}`, 180, yPosition, { align: 'right' });

      yPosition += 7;
  });

  // Move down and add the total price
  yPosition += 5;
  doc.line(leftMargin, yPosition, 195, yPosition); // Horizontal line above the total
  yPosition += 10;
  doc.setFont('helvetica', 'bold');
  doc.text(`Total: $${totalPrice.toFixed(2)}`, 180, yPosition, { align: 'right' });

  // Add a footer with thanks message
  yPosition += 20;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(12);
  doc.text("¡Gracias por comprar con E-lovers!", leftMargin, yPosition);

  // Save the invoice as PDF
  doc.save("factura.pdf");
}

// Function to close the payment form
function closePaymentForm() {
  document.getElementById('payment-form').style.display = 'none';
}

window.closePaymentForm = closePaymentForm;